// app/api/services/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import Service from "@/modals/Services";
import { authOptions } from "../../auth/[...nextauth]/route";
import { UserRole } from "@/types/type";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized: Please sign in" },
        { status: 401 }
      );
    }

    const userRole = session.user.role as UserRole;

    // Connect to DB
    await dbConnect();

    const services = await Service.find()
      .select(
        "name contact company model serviceType status preferredDate preferredTime createdAt updatedAt"
      )
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        services,
        role: userRole,
        canWrite: userRole === UserRole.ADMIN, // for frontend logic if needed
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in get-services API:", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to retrieve services. Please try again later." },
      { status: 500 }
    );
  }
}
