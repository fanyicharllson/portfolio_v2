"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { ChatModal } from "./components/ChatModal";
import { useChat } from "./hooks/useChat";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";

interface VoiceAssistantProps {
  onCommand?: (command: string) => void;
}

export function VoiceAssistant({ onCommand }: VoiceAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const lastSpokenMessageRef = useRef<string>("");

  const { messages, sendMessage, isLoading } = useChat();

  const { isListening, currentTranscript, startListening, stopListening } =
    useSpeechRecognition({
      onFinalTranscript: (transcript) => {
        console.log("Processing transcript:", transcript);
        sendMessage(transcript, onCommand);
      },
      onError: (error) => {
        console.error("Speech recognition error:", error);
      },
    });

  const { isSpeaking, speak, cancel, audioEnabled, toggleAudio } =
    useSpeechSynthesis();

  // Auto-speak AI responses when they arrive (only once per message)
  useEffect(() => {
    if (messages.length > 0 && audioEnabled) {
      const lastMessage = messages[messages.length - 1];

      // Check if this is a new assistant message that we haven't spoken yet
      if (
        lastMessage.role === "assistant" &&
        lastMessage.content !== lastSpokenMessageRef.current &&
        !isSpeaking
      ) {
        console.log("Speaking new message:", lastMessage.content);
        lastSpokenMessageRef.current = lastMessage.content;
        speak(lastMessage.content);
      }
    }
  }, [messages, audioEnabled, speak, isSpeaking]);

  // Reset last spoken message when audio is disabled
  useEffect(() => {
    if (!audioEnabled) {
      lastSpokenMessageRef.current = "";
    }
  }, [audioEnabled]);

  // Cancel speech when closing modal
  const handleClose = () => {
    cancel();
    stopListening();
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating AI Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full mb-2 right-0 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl border border-slate-700"
            >
              Ask Charllson&apos;s AI Assistant
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 shadow-2xl rounded-full relative overflow-hidden transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative z-10 flex flex-col items-center justify-center gap-1">
            <Zap className="h-6 w-6 text-white" />
            <span className="text-white font-bold text-[10px]">Ask AI</span>
          </span>

          {isListening && (
            <motion.div
              className="absolute inset-0 border-2 border-white/50 rounded-full"
              animate={{ scale: [1, 1.5], opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </button>
      </motion.div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isOpen}
        onClose={handleClose}
        messages={messages}
        isLoading={isLoading}
        isListening={isListening}
        isSpeaking={isSpeaking}
        currentTranscript={currentTranscript}
        audioEnabled={audioEnabled}
        onSendMessage={(message) => sendMessage(message, onCommand)}
        onStartListening={startListening}
        onStopListening={stopListening}
        onToggleAudio={toggleAudio}
        onSpeak={speak}
        onCancelSpeech={cancel}
      />
    </>
  );
}
