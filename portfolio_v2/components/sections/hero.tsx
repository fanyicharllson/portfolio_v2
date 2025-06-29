import { motion } from "framer-motion";
import React from "react";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Code,
  Github,
  Globe,
  Linkedin,
  Mail,
  Sparkles,
  Star,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { CreativeHero } from "../creative-hero";
import dynamic from "next/dynamic";
const ClientOnlyParticles = dynamic(() => import("./client-only-particles"), {
  ssr: false,
});

interface HeroSectionProps {
  isClient: boolean;
  isLoaded: boolean;
  particles: {
    left: number;
    top: number;
    duration: number;
    delay: number;
  }[];
}

const handleNavigation = (href: string) => {
  const element = document.querySelector(href);

  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function HeroSection({
  isClient,
  isLoaded,
  particles,
}: HeroSectionProps) {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated background particles */}
        <div className="absolute inset-0 z-0">
          {isClient && isLoaded && (
            <ClientOnlyParticles particles={particles} />
          )}
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          <motion.div
            className="space-y-8 lg:space-y-10 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-block">
              <motion.div
                className="relative px-4 sm:px-6 py-3 sm:py-3 text-sm font-semibold rounded-3xl bg-slate-800/60 backdrop-blur-2xl border border-cyan-400/40 mb-6 sm:mb-8 overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
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
              </motion.div>
            </div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2 }}
            >
              <span className="block text-slate-200 mb-2">Creating</span>
              <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 relative"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Digital Magic
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                </motion.div>
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-slate-300 max-w-[580px] leading-relaxed font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Transforming complex problems into elegant, scalable applications
              with cutting-edge technologies and innovative design principles
              that captivate users.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 pt-6 sm:pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <Button
                className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 via-blue-600 to-emerald-500 hover:from-emerald-500 hover:via-blue-600 hover:to-cyan-500 border-0 px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-2xl shadow-2xl"
                onClick={() => handleNavigation("#projects")}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  <Code className="mr-3 h-5 w-5" />
                  View Projects
                  <motion.div
                    className="ml-3"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </span>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-slate-600 text-slate-200 hover:text-white hover:border-cyan-400 hover:bg-cyan-400/10 px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-2xl backdrop-blur-md relative overflow-hidden group"
                onClick={() => handleNavigation("#contact")}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center">
                  <Mail className="mr-3 h-5 w-5" />
                  Get In Touch
                </span>
              </Button>
            </motion.div>

            <motion.div
              className="flex gap-4 sm:gap-6 pt-6 sm:pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1 }}
            >
              {[
                {
                  icon: Github,
                  href: "https://github.com/fanyicharllson",
                  label: "GitHub",
                  color: "hover:bg-slate-700",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/fanyi-charllson-ab19492b8/",
                  label: "LinkedIn",
                  color: "hover:bg-blue-600",
                },
                {
                  icon: Twitter,
                  href: "#",
                  label: "Twitter",
                  color: "hover:bg-cyan-500",
                },
                {
                  icon: Globe,
                  href: "#",
                  label: "Website",
                  color: "hover:bg-emerald-500",
                },
              ].map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-2xl bg-slate-800/60 backdrop-blur-md border border-slate-600/50 text-slate-300 hover:text-white transition-all duration-300 hover:border-transparent ${social.color} w-14 h-14 sm:w-16 sm:h-16 relative overflow-hidden group`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <social.icon className="h-6 w-6 sm:h-7 sm:w-7 relative z-10" />
                      <span className="sr-only">{social.label}</span>
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <CreativeHero />
          </motion.div>
        </div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.div
            className="w-8 sm:w-10 h-14 sm:h-16 rounded-full border-2 border-cyan-400/50 flex justify-center items-start p-2 cursor-pointer backdrop-blur-sm relative overflow-hidden group"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{
                y: [0, 20, 0],
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          <motion.p
            className="text-xs text-slate-400 mt-3 text-center font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Discover Magic
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
