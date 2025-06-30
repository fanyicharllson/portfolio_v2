import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Save the contact message to the database
    await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Contact form submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error! Please try again later.",
      }),
      {
        status: 500,
      }
    );
  }
}
