"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Download, X, Rocket, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";

interface HeroTitleSectionProps {
  onDownloadClick?: () => void;
}

export function HeroTitleSection({ onDownloadClick }: HeroTitleSectionProps) {
  const [showThankYou, setShowThankYou] = useState(false);

  const handleDownload = () => {
    setShowThankYou(true);
    onDownloadClick?.();
    setTimeout(() => {
      setShowThankYou(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative pt-20 sm:pt-32">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Main title and CTA */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Status badge */}
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="relative px-4 sm:px-6 py-3 sm:py-3 text-sm font-semibold rounded-3xl bg-slate-800/60 backdrop-blur-2xl border border-cyan-400/40 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-emerald-500/10"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                    <motion.div
                      className="w-3 h-3 bg-emerald-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(16, 185, 129, 0.7)",
                          "0 0 0 10px rgba(16, 185, 129, 0)",
                          "0 0 0 0 rgba(16, 185, 129, 0.7)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="text-xs sm:text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-cyan-400" />
                      Builder & CTO-Minded Software Architect
                    </span>
                  </span>
                </div>
              </motion.div>

              {/* Main headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Innovative Software
                  </span>
                  <br />
                  <span className="text-white">That Transforms Ideas</span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-xl">
                  Explore cutting-edge applications across mobile, web, and
                  enterprise platforms. Every project is a testament to
                  innovation and excellence.
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-semibold transition-all duration-300 group shadow-lg hover:shadow-cyan-500/50"
              >
                <Download className="h-5 w-5 group-hover:animate-bounce" />
                <span>Download Now</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Beta info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-sm text-slate-400 pt-4"
              >
                <Zap className="h-4 w-4 text-yellow-400" />
                <span>Public Beta - Under active development</span>
              </motion.div>
            </motion.div>

            {/* Right side - Visual showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hidden md:flex items-center justify-center relative h-96"
            >
              {/* Animated card showcase */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-80 h-96 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl border border-slate-600/50 p-8 backdrop-blur-xl shadow-2xl"
              >
                <div className="h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <div className="space-y-3">
                      <div className="h-3 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg w-3/4" />
                      <div className="h-3 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg w-1/2" />
                      <div className="h-3 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg w-2/3" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-10 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg w-1/3 transition-colors" />
                    <div className="h-10 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg w-1/3 transition-colors" />
                  </div>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-lg border border-cyan-500/30 backdrop-blur-xl"
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Thank You Modal */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-cyan-500/30 p-8 max-w-md mx-4 shadow-2xl"
            >
              <button
                onClick={() => setShowThankYou(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="space-y-6 text-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-6xl"
                >
                  🎉
                </motion.div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Thank You!</h2>
                  <p className="text-slate-400">Your download is starting...</p>
                </div>

                <div className="space-y-4 py-4 px-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                  <div className="flex items-center gap-3 justify-center text-slate-300">
                    <Rocket className="h-5 w-5 text-cyan-400 animate-pulse" />
                    <span className="text-sm font-medium">
                      This app is in Public Beta
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    We&apos;re actively developing new features and
                    improvements. Your feedback helps us build better products.
                  </p>
                </div>

                <div className="space-y-3 text-left">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    What&apos;s coming soon
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      Enhanced performance & stability
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      Advanced features & customization
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      Community & support improvements
                    </li>
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowThankYou(false)}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg font-semibold transition-all"
                >
                  Got it, thanks!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
