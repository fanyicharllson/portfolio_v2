"use client";

import { motion } from "framer-motion";
import { Sparkles, Code2, Zap, Star } from "lucide-react";

export default function ImageTitleBanner() {
  return (
    <div>
      {/* Enhanced Title Banner */}
      <div className="inline-block">
        <motion.div
          className="relative px-6 sm:px-8 py-4 sm:py-5 text-sm font-bold rounded-2xl bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-emerald-900/80 backdrop-blur-3xl border border-gradient-to-r border-purple-400/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-emerald-500/20 opacity-60"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2), rgba(236, 72, 153, 0.2), rgba(16, 185, 129, 0.2))",
                "linear-gradient(90deg, rgba(6, 182, 212, 0.2), rgba(236, 72, 153, 0.2), rgba(16, 185, 129, 0.2), rgba(168, 85, 247, 0.2))",
                "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(16, 185, 129, 0.2), rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2))",
                "linear-gradient(180deg, rgba(16, 185, 129, 0.2), rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2), rgba(236, 72, 153, 0.2))",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatDelay: 1,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex items-center gap-3 sm:gap-4">
            {/* Animated Status Indicator */}
            <motion.div
              className="relative flex items-center justify-center"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <motion.div
                className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(16, 185, 129, 0.8)",
                    "0 0 0 8px rgba(16, 185, 129, 0.1)",
                    "0 0 0 0 rgba(16, 185, 129, 0.8)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>

            {/* Enhanced Text Content */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Floating Icons */}
              <motion.div
                className="flex items-center gap-1"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-4 w-4 text-purple-400" />
                <Code2 className="h-4 w-4 text-cyan-400" />
                <Zap className="h-4 w-4 text-yellow-400" />
              </motion.div>

              {/* Main Text */}
              <motion.span
                className="text-sm sm:text-base font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                I&apos;M{" "}
                <motion.span
                  className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-extrabold"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  FANYI CHARLLSON
                </motion.span>{" "}
                ✨
              </motion.span>

              {/* Role Badge */}
              <motion.div
                className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
              >
                <Star className="h-3 w-3 text-yellow-400" />
                <span className="text-xs font-semibold text-purple-200">
                  Software Architect
                </span>
              </motion.div>
            </div>
          </div>

          {/* Corner Decorations */}
          <motion.div
            className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1 left-1 w-2 h-2 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full opacity-60"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
