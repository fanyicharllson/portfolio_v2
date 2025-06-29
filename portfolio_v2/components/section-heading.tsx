"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="inline-block">
          <div className="relative px-4 py-2 text-sm font-semibold rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-cyan-400/30 mb-4">
            <span className="relative z-10">{subtitle}</span>
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></span>
          </div>
        </div>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="w-32 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 rounded-full mx-auto mt-8"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      />
    </div>
  )
}
