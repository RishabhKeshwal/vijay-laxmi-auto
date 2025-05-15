import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/modals/Contact";

// POST /api/contact
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { name, email, phone, message } = await req.json();

    // Basic validations
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields (name, email, phone, message) are required" },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!/^\+?[1-9]\d{1,14}$/.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 500) {
      return NextResponse.json(
        { error: "Message must be between 10 and 500 characters" },
        { status: 400 }
      );
    }

    // Save contact with default status: "Pending"
    const contact = new Contact({
      name,
      email,
      phone,
      message,
      status: "Pending",
    });

    await contact.save();

    return NextResponse.json(
      { message: "Your message has been sent successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in send-message API:", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to send message: " + (error as Error).message },
      { status: 500 }
    );
  }
}
