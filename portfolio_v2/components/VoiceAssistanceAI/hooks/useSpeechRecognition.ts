/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useSpeechRecognition.ts
import { useState, useRef, useEffect, useCallback } from "react";

interface UseSpeechRecognitionProps {
  onFinalTranscript: (transcript: string) => void;
  onError?: (error: string) => void;
}

export function useSpeechRecognition({
  onFinalTranscript,
  onError,
}: UseSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isProcessingRef = useRef(false);
  const hasStartedRef = useRef(false);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Only initialize once
    if (isInitializedRef.current) return;
    
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      isInitializedRef.current = true;

      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onstart = () => {
          console.log("✅ Speech recognition active - speak now!");
          hasStartedRef.current = true;
          setIsListening(true);
          setCurrentTranscript("");
        };

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + " ";
            } else {
              interimTranscript += transcript;
            }
          }

          // Show interim results
          if (interimTranscript) {
            setCurrentTranscript(interimTranscript);
            console.log("🎤 Hearing:", interimTranscript);
          }

          // Process final results
          if (finalTranscript.trim() && !isProcessingRef.current) {
            isProcessingRef.current = true;
            const finalText = finalTranscript.trim();
            console.log("✅ Captured:", finalText);
            setCurrentTranscript(finalText);

            // Small delay before processing
            setTimeout(() => {
              onFinalTranscript(finalText);
              setCurrentTranscript("");
              isProcessingRef.current = false;
            }, 300);
          }
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.log("⚠️ Recognition error:", event.error);

          if (event.error === "no-speech") {
            console.log("💡 No speech detected. Try speaking louder or closer to mic.");
            setIsListening(false);
            setCurrentTranscript("");
            hasStartedRef.current = false;
            isProcessingRef.current = false;
            return;
          }

          if (event.error === "aborted") {
            console.log("🔄 Recognition was aborted - this might be due to rapid start/stop");
            setIsListening(false);
            setCurrentTranscript("");
            hasStartedRef.current = false;
            isProcessingRef.current = false;
            return;
          }

          if (event.error === "not-allowed") {
            onError?.(
              "Microphone access denied. Please allow microphone in browser settings."
            );
          } else if (event.error === "network") {
            onError?.("Network error occurred. Check your internet connection.");
          } else {
            onError?.(`Speech recognition error: ${event.error}`);
          }

          setIsListening(false);
          setCurrentTranscript("");
          hasStartedRef.current = false;
          isProcessingRef.current = false;
        };

        recognitionRef.current.onend = () => {
          console.log("🛑 Recognition session ended");
          setIsListening(false);
          hasStartedRef.current = false;
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, [onFinalTranscript, onError]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      console.error("❌ Speech recognition not supported");
      return;
    }

    if (isListening) {
      console.log("⏸️ Already listening...");
      return;
    }

    if (hasStartedRef.current) {
      console.log("⏸️ Recognition already started, waiting...");
      return;
    }

    console.log("🎙️ Initializing microphone...");
    setCurrentTranscript("");
    isProcessingRef.current = false;

    try {
      recognitionRef.current.start();
      console.log("🎤 Microphone ready - start speaking!");
    } catch (error: any) {
      if (error?.message?.includes("already started")) {
        console.log("⚠️ Recognition already running. Stopping first...");
        try {
          recognitionRef.current.stop();
          // Wait longer before restarting to avoid conflicts
          setTimeout(() => {
            try {
              if (recognitionRef.current && !hasStartedRef.current) {
                recognitionRef.current.start();
                console.log("🔄 Restarted microphone successfully");
              }
            } catch (e) {
              console.error("❌ Failed to restart:", e);
            }
          }, 1000); // Increased delay
        } catch (e) {
          console.error("❌ Failed to stop:", e);
        }
      } else {
        console.error("❌ Failed to start recognition:", error?.message ?? error);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && (isListening || hasStartedRef.current)) {
      console.log("⏹️ Stopping microphone...");
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error("Error stopping recognition:", error);
      }

      // Reset states immediately to prevent conflicts
      setIsListening(false);
      setCurrentTranscript("");
      hasStartedRef.current = false;
      isProcessingRef.current = false;
    }
  }, [isListening]);

  return {
    isListening,
    currentTranscript,
    startListening,
    stopListening,
    isSupported:
      typeof window !== "undefined" && "webkitSpeechRecognition" in window,
  };
}
