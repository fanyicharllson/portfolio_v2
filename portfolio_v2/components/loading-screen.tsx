"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Previously this was a fake setInterval that always took a fixed
    // 2.5s no matter how fast (or slow) the page actually was. Instead,
    // track real readiness: creep the bar up while waiting, jump to 100%
    // as soon as the page has actually finished loading, and fall back to
    // a hard cap so a slow network can't block the screen forever.
    if (document.readyState === "complete") {
      setProgress(100);
      const doneTimer = setTimeout(() => setIsComplete(true), 200);
      return () => clearTimeout(doneTimer);
    }

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      clearInterval(creepInterval);
      clearTimeout(capTimer);
      setProgress(100);
      setTimeout(() => setIsComplete(true), 300);
    };

    // Creep toward 90% while we wait, so it still reads as "loading"
    // instead of a frozen 0%.
    const creepInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + (90 - prev) * 0.15 : prev));
    }, 100);

    // Hard cap so a slow connection never blocks the page indefinitely.
    const capTimer = setTimeout(finish, 2500);

    window.addEventListener("load", finish);

    return () => {
      clearInterval(creepInterval);
      clearTimeout(capTimer);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (isComplete) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-24 h-24 mb-8"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-full">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-cyan-500/30"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-t-transparent border-blue-500"
            animate={{ rotate: -360 }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-cyan-400">{Math.round(progress)}%</span>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
      <motion.p
        className="mt-4 text-slate-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Loading Charllson&apos;s amazing portfolio...
      </motion.p>
    </motion.div>
  );
}
