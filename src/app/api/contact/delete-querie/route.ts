import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Contact from "@/modals/Contact";
import { authenticate } from "@/middlewares/auth";

export async function DELETE(request: Request) {
  try {
    await connectDB();

    const user = await authenticate(request);
    if (user instanceof NextResponse) return user;

    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized: Admin access only" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Query ID is required" },
        { status: 400 }
      );
    }

    const deletedQuery = await Contact.findByIdAndDelete(id);
    if (!deletedQuery) {
      return NextResponse.json(
        { message: "Query not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Query deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting query:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
