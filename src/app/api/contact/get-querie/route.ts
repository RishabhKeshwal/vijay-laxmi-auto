import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/modals/Contact";
import { authOptions } from "../../auth/[...nextauth]/route"; // Adjust path if needed
import { UserRole } from "@/types/type"; // Role type (ADMIN, USER, etc.)

// GET: Fetch all contact queries (Admin only)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized: Please sign in" },
        { status: 401 }
      );
    }

    // Only allow admin
    if (session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    await dbConnect();

    // Fetch all queries, sorted by most recent
    const queries = await Contact.find()
      .select("name email phone message createdAt")
      .sort({ createdAt: -1 });

    return NextResponse.json({ queries }, { status: 200 });
  } catch (error) {
    console.error("Error in get-querie API:", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to fetch queries. Please try again later." },
      { status: 500 }
    );
  }
}
