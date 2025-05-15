// middlewares/auth.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import User from "@/modals/User";

// This function authenticates any user using the JWT token from NextAuth
export async function authenticate(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token || !token.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findOne({ email: token.email });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 401 });
  }

  // Return user object for role-based checks (e.g., admin/user)
  return {
    _id: user.id.toString(),
    email: user.email,
    role: user.role, // e.g., "admin", "user"
  };
}

// Role guard function for admin-only access
export async function isAdmin(request: NextRequest) {
  const user = await authenticate(request);

  // If the response is a NextResponse (error), return false
  if ("status" in user) return false;

  return user.role === "admin";
}
