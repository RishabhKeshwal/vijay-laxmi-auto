import NextAuth from "next-auth";
import { UserRole } from "@/types/type";

declare module "next-auth" {
  interface User {
    id: string; // ✅ Ensure id is a string
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: UserRole;
  }

  interface Session {
    user: User; // ✅ Ensure session user has id as a string
  }

  interface JWT {
    id: string; // ✅ Ensure id in JWT is a string
    role: UserRole;
  }
}
