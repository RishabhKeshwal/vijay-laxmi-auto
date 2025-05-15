// app/api/services/delete-service/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/middlewares/auth";
import Service from "@/modals/Services";
import dbConnect from "@/lib/dbConnect";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const admin = await isAdmin(request);
  if (!admin) {
    return NextResponse.json({ message: "Admins only" }, { status: 403 });
  }

  try {
    const deleted = await Service.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
