import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messageId, question, response, rating } = body;

    if (
      !messageId ||
      typeof messageId !== "string" ||
      !response ||
      typeof response !== "string" ||
      (rating !== "up" && rating !== "down")
    ) {
      return NextResponse.json(
        { error: "Invalid feedback payload." },
        { status: 400 }
      );
    }

    await prisma.chatFeedback.upsert({
      where: { messageId },
      create: {
        messageId,
        question: typeof question === "string" ? question : "",
        response,
        rating,
      },
      update: {
        rating,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving chat feedback:", error);
    return NextResponse.json(
      { error: "Internal Server Error! Please try again later." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { messageId } = body;

    if (!messageId || typeof messageId !== "string") {
      return NextResponse.json(
        { error: "messageId is required." },
        { status: 400 }
      );
    }

    await prisma.chatFeedback.deleteMany({ where: { messageId } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error removing chat feedback:", error);
    return NextResponse.json(
      { error: "Internal Server Error! Please try again later." },
      { status: 500 }
    );
  }
}
