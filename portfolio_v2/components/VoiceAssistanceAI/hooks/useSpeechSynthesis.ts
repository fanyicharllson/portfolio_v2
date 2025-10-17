// hooks/useSpeechSynthesis.ts
import { useState, useRef, useEffect, useCallback } from "react";

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speak = useCallback(
    async (text: string): Promise<void> => {
      if (!audioEnabled || !synthRef.current) return;

      return new Promise((resolve) => {
        if (synthRef.current) {
          // Cancel any ongoing speech
          synthRef.current.cancel();

          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 0.9;
          utterance.pitch = 1;
          utterance.volume = 0.8;

          utterance.onstart = () => {
            setIsSpeaking(true);
          };

          utterance.onend = () => {
            setIsSpeaking(false);
            currentUtteranceRef.current = null;
            resolve();
          };

          utterance.onerror = () => {
            setIsSpeaking(false);
            currentUtteranceRef.current = null;
            resolve();
          };

          currentUtteranceRef.current = utterance;
          synthRef.current.speak(utterance);
        } else {
          resolve();
        }
      });
    },
    [audioEnabled]
  );

  const cancel = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
    }
  }, []);

  const toggleAudio = useCallback(() => {
    setAudioEnabled((prev) => !prev);
    if (synthRef.current && isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, [isSpeaking]);

  return {
    isSpeaking,
    audioEnabled,
    speak,
    cancel,
    toggleAudio,
    isSupported: typeof window !== "undefined" && "speechSynthesis" in window,
  };
}
