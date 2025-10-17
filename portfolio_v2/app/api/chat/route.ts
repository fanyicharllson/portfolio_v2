/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio-context";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Build conversation history
    let conversationContext = PORTFOLIO_CONTEXT + "\n\nConversation:\n";

    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        conversationContext += `${
          msg.role === "user" ? "User" : "Assistant"
        }: ${msg.content}\n`;
      });
    }

    conversationContext += `User: ${message}\nAssistant:`;

    // Generate response
    const result = await model.generateContent(conversationContext);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      response: text,
      success: true,
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
