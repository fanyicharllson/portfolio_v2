import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio-context";

interface ChatHistoryMessage {
  role: string;
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key not configured" },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: PORTFOLIO_CONTEXT },
    ];

    if (history && Array.isArray(history)) {
      (history as ChatHistoryMessage[]).forEach((msg) => {
        messages.push({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content,
        });
      });
    }

    messages.push({ role: "user", content: message });

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages,
    });

    const text = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({
      response: text,
      success: true,
    });
  } catch (error) {
    console.error("Groq API error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
