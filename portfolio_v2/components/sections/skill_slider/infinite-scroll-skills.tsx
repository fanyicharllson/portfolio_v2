"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Skill {
  name: string;
  level: number;
  icon?: string;
  category?: string;
  color?: string;
}

interface InfiniteScrollSkillsProps {
  skills: Skill[];
  speed?: number;
}

export function InfiniteScrollSkills({
  skills,
  speed = 50,
}: InfiniteScrollSkillsProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Triple the skills for seamless infinite scroll
  const extendedSkills = [...skills, ...skills, ...skills];

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full">
      {/* Control button */}
      <div className="flex justify-center mb-6">
        <Button
          variant="ghost"
          onClick={togglePlayPause}
          className="px-6 py-3 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-700/60 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all duration-200"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pause Animation
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Play Animation
            </>
          )}
        </Button>
      </div>

      {/* Main scrolling container */}
      <div
        className="relative overflow-hidden rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-800/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-800/90 to-transparent z-10 pointer-events-none" />

        {/* Scrolling skills container */}
        <motion.div
          ref={scrollRef}
          className="flex gap-6 sm:gap-8 will-change-transform"
          animate={{
            x:
              isPlaying && !isHovered
                ? [0, -(skills.length * (320 + 32))]
                : undefined,
          }}
          transition={{
            duration: skills.length * (100 / speed), // Adjust speed based on number of skills
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            width: `${extendedSkills.length * (320 + 32)}px`, // 320px card width + 32px gap
          }}
        >
          {extendedSkills.map((skill, index) => (
            <motion.div
              key={`${skill.name}-${index}`}
              className="flex-shrink-0 w-[320px]"
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-xl bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 p-6 h-full transition-all duration-300 hover:border-cyan-500/50 group cursor-pointer">
                {/* Animated background */}
                <motion.div
                  className="absolute -inset-1 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      skill.color ||
                      "linear-gradient(45deg, rgba(6, 182, 212, 0.15), rgba(14, 165, 233, 0.15))",
                  }}
                />

                <div className="relative">
                  {/* Skill header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{skill.icon || "⚡"}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors duration-300">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {skill.category || "Technology"}
                      </p>
                    </div>
                  </div>

                  {/* Progress section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-300">
                        Proficiency
                      </span>
                      <motion.span
                        className="text-lg font-bold text-cyan-400"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-3 w-full bg-slate-700/50 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                          background:
                            skill.color ||
                            "linear-gradient(90deg, #06b6d4, #3b82f6, #10b981)",
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1.5,
                          delay: 0.3,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                      />

                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                        animate={{ x: [-32, 320] }}
                        transition={{
                          duration: 2.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                          delay: Math.random() * 2,
                        }}
                      />
                    </div>

                    {/* Skill level indicator */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`h-2 flex-1 rounded-full ${
                            i < Math.floor(skill.level / 20)
                              ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                              : "bg-slate-700/50"
                          }`}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.1, duration: 0.2 }}
                          viewport={{ once: true }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Info text */}
      <div className="text-center mt-4">
        <p className="text-sm text-slate-400">
          {isHovered ? "Hover to pause • " : ""}
          {skills.length} technologies and growing
        </p>
      </div>
    </div>
  );
}
