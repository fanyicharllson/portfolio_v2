// hooks/useSpeechSynthesis.ts
import { useState, useRef, useEffect, useCallback } from "react";

// Ranked by how natural/pleasant they sound, best first. Edge's "Online
// (Natural)" voices are genuine neural TTS and sound dramatically better
// than the classic robotic ones - free, no API key, built into the browser.
const PREFERRED_VOICE_NAMES = [
  "Microsoft Aria Online (Natural) - English (United States)",
  "Microsoft Jenny Online (Natural) - English (United States)",
  "Microsoft Sonia Online (Natural) - English (United Kingdom)",
  "Google UK English Female",
  "Google US English",
  "Samantha",
  "Victoria",
  "Microsoft Zira - English (United States)",
];

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;

  for (const preferredName of PREFERRED_VOICE_NAMES) {
    const match = voices.find((v) => v.name === preferredName);
    if (match) return match;
  }

  // Fall back to any English voice whose name suggests a female voice.
  const femaleHeuristic = voices.find(
    (v) =>
      v.lang.startsWith("en") &&
      /female|aria|jenny|sonia|samantha|victoria|zira|susan|karen/i.test(
        v.name
      )
  );
  if (femaleHeuristic) return femaleHeuristic;

  // Last resort: any English voice at all.
  return voices.find((v) => v.lang.startsWith("en")) || voices[0];
}

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() ?? [];
        if (voices.length > 0) {
          selectedVoiceRef.current = pickBestVoice(voices);
        }
      };

      loadVoices();
      // Chrome loads voices asynchronously - getVoices() is often empty
      // on the first call until this event fires.
      synthRef.current.addEventListener("voiceschanged", loadVoices);

      return () => {
        synthRef.current?.removeEventListener("voiceschanged", loadVoices);
        synthRef.current?.cancel();
      };
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
          // Only cancel when something is actually queued/playing - an
          // unconditional cancel() right before speak() is a known cause
          // of the "AI voice takes a moment to start" delay in Chrome,
          // since cancel() briefly leaves the engine in a busy state.
          if (synthRef.current.speaking || synthRef.current.pending) {
            synthRef.current.cancel();
          }
          // Chrome can leave the engine in a "paused" state after a period
          // of inactivity, which silently delays the next speak() call.
          synthRef.current.resume();

          const utterance = new SpeechSynthesisUtterance(text);
          if (selectedVoiceRef.current) {
            utterance.voice = selectedVoiceRef.current;
          }
          utterance.rate = 1;
          utterance.pitch = 1.05;
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
