"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Skill {
  name: string;
  level: number;
  icon?: string;
  category?: string;
}

interface SkillCarouselProps {
  skills: Skill[];
}

export function SkillCarousel({ skills }: SkillCarouselProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills, ...skills];

  useEffect(() => {
    if (isPlaying && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % skills.length);
      }, 3000); // Move every 3 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isHovered, skills.length]);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + skills.length) % skills.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % skills.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full">
      {/* Main carousel container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-800/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-800/80 to-transparent z-10 pointer-events-none" />

        {/* Skills container */}
        <motion.div
          className="flex gap-6 sm:gap-8"
          animate={{
            x: `calc(-${currentIndex * (280 + 32)}px)`, // 280px card width + 32px gap
          }}
          transition={{
            type: "tween",
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          {duplicatedSkills.map((skill, index) => (
            <motion.div
              key={`${skill.name}-${index}`}
              className="flex-shrink-0 w-[280px]"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative overflow-hidden rounded-xl bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 p-6 h-full transition-all duration-300 hover:border-cyan-500/50 group">
                {/* Animated background gradient */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-emerald-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(14, 165, 233, 0.1), rgba(16, 185, 129, 0.1))",
                      "linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1), rgba(14, 165, 233, 0.1))",
                      "linear-gradient(45deg, rgba(14, 165, 233, 0.1), rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                <div className="relative">
                  {/* Skill icon/emoji */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">{skill.icon || "⚡"}</span>
                  </div>

                  {/* Skill name */}
                  <h3 className="text-xl font-bold mb-4 text-slate-100 group-hover:text-cyan-300 transition-colors duration-300">
                    {skill.name}
                  </h3>

                  {/* Progress bar */}
                  <div className="relative h-3 w-full bg-slate-700/50 rounded-full overflow-hidden mb-3">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 1.5,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                    />
                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                      animate={{ x: [-32, 280] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        delay: 1,
                      }}
                    />
                  </div>

                  {/* Skill level */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400 font-medium">
                      {skill.category || "Technology"}
                    </span>
                    <motion.span
                      className="text-lg font-bold text-cyan-400"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Control buttons */}
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            className="w-8 h-8 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:bg-slate-700/80 text-slate-300 hover:text-white"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="w-10 h-10 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-700/60 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all duration-200"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Dots indicator */}
        <div className="flex gap-2">
          {skills.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 w-8"
                  : "bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="w-10 h-10 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-700/60 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all duration-200"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 text-center">
        <span className="text-sm text-slate-400">
          {currentIndex + 1} of {skills.length} skills
        </span>
      </div>
    </div>
  );
}
