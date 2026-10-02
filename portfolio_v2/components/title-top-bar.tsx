"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface TitleTopBarProps {
  text: string;
  onPress?: () => void;
}

function TitleTopBar({ text, onPress }: TitleTopBarProps) {
  return (
    <div className="block">
      <motion.div
        className="relative px-4 sm:px-6 py-3 sm:py-3 text-sm font-semibold rounded-3xl bg-slate-800/60 backdrop-blur-2xl border border-cyan-400/40 mb-6 sm:mb-8 overflow-hidden cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        onClick={onPress}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-emerald-500/10 animate-sweep-linear"
          style={
            {
              "--sweep-from": "-100%",
              "--sweep-to": "100%",
              animationDuration: "3s",
            } as CSSProperties
          }
        />
        <span className="relative z-10 flex items-center gap-2 sm:gap-3">
          <div
            className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse-scale"
            style={
              {
                "--pulse-from": 1,
                "--pulse-to": 1.5,
                "--opacity-from": 1,
                "--opacity-to": 0.5,
                animationDuration: "2s",
                boxShadow: "0 0 0 4px rgba(16, 185, 129, 0.25)",
              } as CSSProperties
            }
          />
          <span className="text-xs sm:text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            {text}
          </span>
        </span>
      </motion.div>
    </div>
  );
}

export default TitleTopBar;
