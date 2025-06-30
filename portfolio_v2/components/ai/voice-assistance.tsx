/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageCircle,
  X,
  Loader2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CustomTooltip from "../ui/custom-tooltip_ai_hover";
type SpeechRecognition = typeof window extends {
  webkitSpeechRecognition: infer T;
}
  ? T
  : any;

interface VoiceAssistantProps {
  onCommand?: (command: string) => void;
}

export function VoiceAssistant({ onCommand }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onstart = () => {
          setIsListening(true);
        };

        recognitionRef.current.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setTranscript(transcript);

          if (event.results[current].isFinal) {
            handleVoiceCommand(transcript);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
          toast({
            title: "Voice Recognition Error",
            description:
              "Please try again or check your microphone permissions.",
            variant: "destructive",
          });
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    // Initialize speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("");
      setResponse("");
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleVoiceCommand = async (command: string) => {
    setIsProcessing(true);

    try {
      // Process the command with AI
      const aiResponse = await processWithAI(command);
      setResponse(aiResponse);

      // Speak the response if audio is enabled
      if (audioEnabled && aiResponse) {
        await speakResponse(aiResponse);
      }

      // Execute portfolio commands
      executePortfolioCommand(command);

      onCommand?.(command);
    } catch (error) {
      console.error("Error processing voice command:", error);
      const errorMessage =
        "Sorry, I couldn't process that command. Please try again.";
      setResponse(errorMessage);

      if (audioEnabled) {
        await speakResponse(errorMessage);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const processWithAI = async (input: string): Promise<string> => {
    // This would integrate with OpenAI API or similar
    // For demo purposes, using local processing
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return "Hello! I'm Charllson's AI assistant. I can help you navigate the portfolio, tell you about projects, or answer questions about Charllson's skills and experience.";
    }

    if (lowerInput.includes("project") || lowerInput.includes("work")) {
      return "Charllson has worked on various exciting projects including e-commerce platforms, AI applications, and mobile apps. Would you like me to show you a specific project?";
    }

    if (lowerInput.includes("skill") || lowerInput.includes("technology")) {
      return "Charllson is proficient in React, Next.js, TypeScript, Python, and many other modern technologies. The skills section shows detailed proficiency levels.";
    }

    if (
      lowerInput.includes("contact") ||
      lowerInput.includes("hire") ||
      lowerInput.includes("email")
    ) {
      return "You can contact Charllson through the contact form, email, or LinkedIn. Charllson is currently available for new opportunities!";
    }

    if (
      lowerInput.includes("experience") ||
      lowerInput.includes("background")
    ) {
      return "Charllson has over 3 years of professional experience in full-stack development, working with various companies and technologies.";
    }

    if (
      lowerInput.includes("navigate") ||
      lowerInput.includes("show") ||
      lowerInput.includes("go to")
    ) {
      if (lowerInput.includes("project")) {
        scrollToSection("projects");
        return "Navigating to the projects section.";
      }
      if (lowerInput.includes("skill")) {
        scrollToSection("skills");
        return "Navigating to the skills section.";
      }
      if (lowerInput.includes("about")) {
        scrollToSection("about");
        return "Navigating to the about section.";
      }
      if (lowerInput.includes("contact")) {
        scrollToSection("contact");
        return "Navigating to the contact section.";
      }
    }

    return (
      "I understand you said: " +
      input +
      ". How can I help you explore Charllson's portfolio?"
    );
  };

  const speakResponse = async (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (synthRef.current) {
        // Cancel any ongoing speech
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          setIsSpeaking(false);
          resolve();
        };
        utterance.onerror = () => {
          setIsSpeaking(false);
          resolve();
        };

        synthRef.current.speak(utterance);
      } else {
        resolve();
      }
    });
  };

  const executePortfolioCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();

    if (
      lowerCommand.includes("show projects") ||
      lowerCommand.includes("view projects")
    ) {
      scrollToSection("projects");
    } else if (
      lowerCommand.includes("show skills") ||
      lowerCommand.includes("view skills")
    ) {
      scrollToSection("skills");
    } else if (
      lowerCommand.includes("show about") ||
      lowerCommand.includes("about me")
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
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (synthRef.current && isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <>
      {/* Floating Voice Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip */}
        <CustomTooltip showTooltip={showTooltip} />

        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 shadow-2xl border-0 group relative overflow-hidden cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <span className="relative z-10 flex flex-col items-center justify-center gap-1">
            <Zap className="h-10 w-10 text-white" />
            <span className="text-white font-bold text-xs mt-1">Ask AI</span>
          </span>

          {/* Pulse effect when listening */}
          {isListening && (
            <motion.div
              className="absolute inset-0 border-2 border-white/50 rounded-full"
              animate={{ scale: [1, 1.5], opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </Button>
      </motion.div>

      {/* Voice Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="relative w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      Charllson&apos;s AI Assistant
                    </h3>
                    <p className="text-sm text-slate-400">
                      Ask me about Charllson&apos;s portfolio
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleAudio}
                    className="w-8 h-8 rounded-xl"
                  >
                    {audioEnabled ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-xl"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mb-6">
                <div
                  className={`flex items-center gap-3 p-3 rounded-2xl ${
                    isListening
                      ? "bg-red-500/20 border border-red-500/30"
                      : isProcessing
                      ? "bg-yellow-500/20 border border-yellow-500/30"
                      : isSpeaking
                      ? "bg-blue-500/20 border border-blue-500/30"
                      : "bg-slate-800/50 border border-slate-700/50"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isListening
                        ? "bg-red-500 animate-pulse"
                        : isProcessing
                        ? "bg-yellow-500 animate-pulse"
                        : isSpeaking
                        ? "bg-blue-500 animate-pulse"
                        : "bg-slate-500"
                    }`}
                  />
                  <span className="text-sm font-medium">
                    {isListening
                      ? "Listening..."
                      : isProcessing
                      ? "Processing..."
                      : isSpeaking
                      ? "Speaking..."
                      : "Ready to help"}
                  </span>
                </div>
              </div>

              {/* Transcript Display */}
              {transcript && (
                <div className="mb-4 p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <p className="text-sm text-slate-300">
                    <span className="text-slate-500">You said:</span> &quot;
                    {transcript}&quot;
                  </p>
                </div>
              )}

              {/* Response Display */}
              {response && (
                <div className="mb-6 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                  <p className="text-sm text-slate-200">
                    <span className="text-purple-400 font-medium">AI:</span>{" "}
                    {response}
                  </p>
                </div>
              )}

              {/* Voice Controls */}
              <div className="flex gap-3">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing || isSpeaking}
                  className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                    isListening
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : isListening ? (
                    <>
                      <MicOff className="h-4 w-4 mr-2" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" />
                      Start Listening
                    </>
                  )}
                </Button>
              </div>

              {/* Quick Commands */}
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <p className="text-xs text-slate-500 mb-3 font-medium">
                  Try saying:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Show projects",
                    "Tell me about skills",
                    "Go to contact",
                    "Show experience",
                  ].map((command) => (
                    <button
                      key={command}
                      onClick={() => handleVoiceCommand(command)}
                      className="text-xs p-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-colors border border-slate-700/30 hover:border-slate-600/50"
                    >
                      &quot;{command}&quot;
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
