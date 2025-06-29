/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function SoundEffects() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context
    if (typeof window !== "undefined") {
      const ctx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      setAudioContext(ctx);
    }
  }, []);

  const playSound = useCallback(
    (frequency: number, duration = 100, type: OscillatorType = "sine") => {
      if (!soundEnabled || !audioContext) return;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration / 1000
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    },
    [soundEnabled, audioContext]
  );

  useEffect(() => {
    if (!soundEnabled) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.closest("button")) {
        playSound(800, 150, "sine");
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.tagName === "A" ||
        target.closest("a")
      ) {
        playSound(600, 50, "sine");
      }
    };

    const handleScroll = () => {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.25 && scrollPercent < 0.26) {
        playSound(400, 200, "triangle");
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("mouseover", handleHover);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mouseover", handleHover);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [soundEnabled, audioContext, playSound]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      playSound(1000, 200, "sine");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.3 }}
      className="fixed top-16 sm:top-24 right-4 sm:right-6 z-50"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSound}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-800/60 backdrop-blur-md border border-slate-600/50 text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-300 hover:scale-110"
      >
        <motion.div
          key={soundEnabled ? "on" : "off"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {soundEnabled ? (
            <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </motion.div>
        <span className="sr-only">Toggle sound effects</span>
      </Button>
    </motion.div>
  );
}
