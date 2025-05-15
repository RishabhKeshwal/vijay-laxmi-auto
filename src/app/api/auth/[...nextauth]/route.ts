import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/modals/User";
import { UserRole, IUser } from "@/types/type";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("⚠️ Please provide both email and password.");
        }

        // Connect to the database
        await dbConnect();

        // Find user and include password & role field
        const user = await User.findOne({ email: credentials.email })
          .select("+password role") // ✅ Ensure role is included
          .lean();

        if (!user) {
          throw new Error("❌ No user found with this email.");
        }

        // Validate password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("❌ Invalid password.");
        }

        // Update lastLogin timestamp
        await User.updateOne(
          { email: credentials.email },
          { lastLogin: new Date() }
        );

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role as UserRole, // ✅ Ensure correct role assignment
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt" as SessionStrategy, // ✅ Explicitly typed
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        await dbConnect();
        const user = await User.findById(token.sub);
        if (user) {
          session.user = {
            id: user._id as string,
            email: user.email,
            name: user.name,
            role: user.role, // Ensure this is set
          };
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
