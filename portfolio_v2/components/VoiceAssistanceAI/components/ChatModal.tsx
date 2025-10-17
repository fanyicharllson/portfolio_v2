"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Send,
  Sparkles,
  MessageCircle,
  Loader2,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isLoading: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  currentTranscript: string;
  audioEnabled: boolean;
  onSendMessage: (message: string) => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onToggleAudio: () => void;
  onSpeak: (text: string) => void;
  onCancelSpeech: () => void;
}

export function ChatModal({
  isOpen,
  onClose,
  messages,
  isLoading,
  isListening,
  isSpeaking,
  currentTranscript,
  audioEnabled,
  onSendMessage,
  onStartListening,
  onStopListening,
  onToggleAudio,
  onSpeak,
}: ChatModalProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, currentTranscript]);

  const handleSendMessage = () => {
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickSuggestions = [
    "Who is Fanyi Charllson?",
    "Show me Charllson's projects",
    "What skills does Charllson have?",
    "How can I contact Charllson?",
    "Can Charllson build apps?",
    "How experienced is Charllson?"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-2xl h-[600px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Charllson&apos;s AI Assistant
                  </h3>
                  <p className="text-xs text-slate-400">Powered by Gemini AI</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onToggleAudio}
                  className="w-9 h-9 rounded-xl hover:bg-slate-700/50 flex items-center justify-center transition-colors"
                  title={audioEnabled ? "Disable voice" : "Enable voice"}
                >
                  {audioEnabled ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl hover:bg-slate-700/50 flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Voice/Speaking Status Indicator */}
            {(isListening || isSpeaking || isLoading) && (
              <div className="px-4 pt-3">
                <div
                  className={`flex items-center gap-3 p-3 rounded-2xl ${
                    isListening
                      ? "bg-red-500/20 border border-red-500/30"
                      : isSpeaking
                      ? "bg-green-500/20 border border-green-500/30"
                      : "bg-yellow-500/20 border border-yellow-500/30"
                  }`}
                >
                  <div className="relative flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isListening
                          ? "bg-red-500"
                          : isSpeaking
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      } animate-pulse`}
                    />
                    {isListening && (
                      <>
                        <motion.div
                          className="absolute w-3 h-3 rounded-full bg-red-500"
                          animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute w-3 h-3 rounded-full bg-red-500"
                          animate={{
                            scale: [1, 2.5, 1],
                            opacity: [0.6, 0, 0.6],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0.3,
                          }}
                        />
                      </>
                    )}
                    {isSpeaking && (
                      <>
                        <motion.div
                          className="absolute w-2 h-4 bg-green-500/60 rounded-full ml-4"
                          animate={{ scaleY: [1, 1.5, 0.8, 1.5, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute w-2 h-4 bg-green-500/40 rounded-full ml-7"
                          animate={{ scaleY: [1, 0.8, 1.5, 1, 0.8] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                        />
                        <motion.div
                          className="absolute w-2 h-4 bg-green-500/60 rounded-full ml-10"
                          animate={{ scaleY: [1, 1.5, 1, 0.8, 1.5] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                        />
                      </>
                    )}
                  </div>
                  <span className="text-sm font-medium flex-1">
                    {isListening
                      ? "🎤 Listening to your voice..."
                      : isSpeaking
                      ? "🔊 AI is speaking..."
                      : "⏳ AI is thinking..."}
                  </span>
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                    <MessageCircle className="h-8 w-8 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">
                    Hi! I&apos;m Charllson&apos;s AI Assistant 😎
                  </h4>
                  <p className="text-sm text-slate-400 mb-6 max-w-md">
                    Ask me anything about Charllson&apos;s skills, projects,
                    experience, or navigate through the portfolio!
                  </p>
                  <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                    {quickSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => onSendMessage(suggestion)}
                        className="text-xs p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all border border-slate-700/30 hover:border-purple-500/30 cursor-pointer"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-slate-800/50 border border-slate-700/50 text-slate-200"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p
                        className={`text-xs ${
                          message.role === "user"
                            ? "text-white/70"
                            : "text-slate-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {message.role === "assistant" && audioEnabled && (
                        <button
                          onClick={() => onSpeak(message.content)}
                          disabled={isSpeaking}
                          className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                          title="Read this message"
                        >
                          <Volume2 className="h-3 w-3" />
                          {isSpeaking ? "Reading..." : "Read"}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                      <span className="text-sm text-slate-400">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentTranscript && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-end"
                >
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-2xl p-3 max-w-[80%]">
                    <p className="text-sm text-slate-300">
                      {currentTranscript}
                    </p>
                    <p className="text-xs text-purple-400 mt-1 flex items-center gap-1">
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        🎤
                      </motion.span>
                      Listening...
                    </p>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      isListening
                        ? "Listening..."
                        : "Type your message or use voice..."
                    }
                    disabled={isLoading || isListening}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50"
                  />
                </div>

                <button
                  onClick={isListening ? onStopListening : onStartListening}
                  disabled={isLoading || isSpeaking}
                  className={`w-12 h-12 rounded-2xl transition-all flex items-center justify-center relative overflow-hidden cursor-pointer ${
                    isListening
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-slate-700 hover:bg-slate-600"
                  } disabled:opacity-50`}
                  title={isListening ? "Stop listening" : "Start voice input"}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-5 w-5 relative z-10" />
                      <motion.div
                        className="absolute inset-0 bg-red-400/30"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </>
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading || isListening}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer"
                  title="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
