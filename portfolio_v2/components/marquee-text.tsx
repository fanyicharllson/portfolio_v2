"use client";

import {
  Code,
  Zap,
  Sparkles,
  Rocket,
  Heart,
  Star,
  Computer,
} from "lucide-react";

export default function MarqueeText() {
  const marqueeItems = [
    { icon: Code, text: "Full-Stack Architect" },
    { icon: Computer, text: "Software Architect" },
    { icon: Code, text: "Builder & CTO-Minded Software Architect" },
    { icon: Zap, text: "Problem Solver" },
    { icon: Sparkles, text: "UI/UX Enthusiast" },
    { icon: Rocket, text: "Innovation Driven" },
    { icon: Heart, text: "Passionate Creator" },
    { icon: Star, text: "Quality Focused" },
    { icon: Code, text: "Clean Code Advocate" },
    { icon: Zap, text: "Fast Learner" },
  ];

  return (
    <section className="py-24 sm:py-32">
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border-y border-cyan-500/20 py-4">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>

        {/* Marquee content - duplicated for seamless loop */}
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set */}
          {marqueeItems.map((item, index) => (
            <div
              key={`first-${index}`}
              className="inline-flex items-center mx-8 text-cyan-300/80 hover:text-cyan-300 transition-colors duration-300"
            >
              <item.icon className="w-5 h-5 mr-3" strokeWidth={2} />
              <span className="text-lg font-medium">{item.text}</span>
              <span className="mx-8 text-cyan-500/40">•</span>
            </div>
          ))}

          {/* Second set for seamless loop */}
          {marqueeItems.map((item, index) => (
            <div
              key={`second-${index}`}
              className="inline-flex items-center mx-8 text-cyan-300/80 hover:text-cyan-300 transition-colors duration-300"
            >
              <item.icon className="w-5 h-5 mr-3" strokeWidth={2} />
              <span className="text-lg font-medium">{item.text}</span>
              <span className="mx-8 text-cyan-500/40">•</span>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            animation: marquee 10s linear infinite;
          }

          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}
