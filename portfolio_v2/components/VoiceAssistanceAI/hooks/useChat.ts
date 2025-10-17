// hooks/useChat.ts
import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { Message } from "@/types/chat";
import { scrollToSection } from "@/lib/navigation";

interface SendMessageParams {
  message: string;
  history: Message[];
}

interface ChatResponse {
  response: string;
  success: boolean;
}

const sendChatMessage = async ({
  message,
  history,
}: SendMessageParams): Promise<ChatResponse> => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      history: history.slice(-10), // Keep last 10 messages for context
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get AI response");
  }

  return response.json();
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const mutation = useMutation({
    mutationFn: sendChatMessage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (data, variables) => {
      const aiMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    },
    onError: () => {
      const errorMessage: Message = {
        role: "assistant",
        content:
          "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    },
  });

  const sendMessage = useCallback(
    (message: string, onCommand?: (cmd: string) => void) => {
      if (!message.trim()) return;

      // Add user message
      const userMessage: Message = {
        role: "user",
        content: message.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Execute portfolio navigation commands
      executePortfolioCommand(message);
      onCommand?.(message);

      // Send to AI
      mutation.mutate({ message: message.trim(), history: messages });
    },
    [messages, mutation]
  );

  return {
    messages,
    sendMessage,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}

function executePortfolioCommand(command: string) {
  const lowerCommand = command.toLowerCase();

  if (
    lowerCommand.includes("show projects") ||
    lowerCommand.includes("view projects") ||
    lowerCommand.includes("see projects")
  ) {
    scrollToSection("projects");
  } else if (
    lowerCommand.includes("show skills") ||
    lowerCommand.includes("view skills")
  ) {
    scrollToSection("skills");
  } else if (
    lowerCommand.includes("show about") ||
    lowerCommand.includes("about you")
  ) {
    scrollToSection("about");
  } else if (
    lowerCommand.includes("contact") ||
    lowerCommand.includes("get in touch")
  ) {
    scrollToSection("contact");
  } else if (lowerCommand.includes("top") || lowerCommand.includes("home")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
