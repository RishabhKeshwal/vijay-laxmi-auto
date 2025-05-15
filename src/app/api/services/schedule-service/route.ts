import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "@/lib/dbConnect";
import Service from "@/modals/Services";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const {
      name,
      contact,
      company,
      model,
      serviceType,
      preferredDate,
      preferredTime,
      notes,
    } = await req.json();

    // Validation
    if (
      !name ||
      !contact ||
      !company ||
      !model ||
      !serviceType ||
      !preferredDate ||
      !preferredTime
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contact)) {
      return NextResponse.json(
        { error: "Contact number must be exactly 10 digits." },
        { status: 400 }
      );
    }

    const date = new Date(preferredDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (isNaN(date.getTime()) || date < now) {
      return NextResponse.json(
        { error: "Preferred date must be a valid future date." },
        { status: 403 }
      );
    }

    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(preferredTime)) {
      return NextResponse.json(
        { error: "Time must be in HH:MM format (24-hour)." },
        { status: 400 }
      );
    }

    // ✅ Match schema fields
    const service = new Service({
      name: name.trim(),
      contact,
      company: company.trim(), // <-- ✅ fixed this
      model: model.trim(),
      serviceType: serviceType.trim(),
      preferredDate: date,
      preferredTime,
      notes: notes?.trim() || "",
    });

    await service.save();

    return NextResponse.json(
      { message: "Service scheduled successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error scheduling service:", error.message || error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
