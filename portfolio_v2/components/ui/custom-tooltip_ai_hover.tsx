import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import React from "react";

export default function CustomTooltip({
  showTooltip,
}: {
  showTooltip: boolean;
}) {
  return (
    <>
      {/* Custom Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute bottom-full right-0 mb-3 pointer-events-none"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Tooltip content */}
              <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl px-4 py-3 shadow-2xl min-w-[280px]">
                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-sm"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2), rgba(6, 182, 212, 0.2))",
                      "linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))",
                      "linear-gradient(45deg, rgba(236, 72, 153, 0.2), rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      <Zap className="h-4 w-4 text-white" />
                    </motion.div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100 text-sm">
                          Charlson&apos;s AI Assistant
                        </span>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          <Sparkles className="h-3 w-3 text-cyan-400" />
                        </motion.div>
                      </div>
                      <p className="text-xs text-slate-400">
                        Powered by advanced AI
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      <span>Voice conversation ready</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      <span>Portfolio navigation</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                      <span>Real-time AI responses</span>
                    </div>
                  </div>

                  {/* Call to action */}
                  <div className="text-center">
                    <motion.div
                      className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      Click to start conversation
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Tooltip arrow */}
              <div className="absolute top-full right-6 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-slate-800/95"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
