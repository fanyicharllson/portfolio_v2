"use client";

import Link from "next/link";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Code,
  Zap,
  Globe,
  Sparkles,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { SkillBadge } from "@/components/skill-badge";
import { Timeline } from "@/components/timeline";
import { ContactForm } from "@/components/contact-form";
import { CreativeHero } from "@/components/creative-hero";
import { FloatingNav } from "@/components/floating-nav";
import { ScrollProgress } from "@/components/scroll-progress";
import { SectionHeading } from "@/components/section-heading";
import { GlassmorphicCard } from "@/components/glassmorphic-card";
import { InteractiveTerminal } from "@/components/interactive-terminal";
import { MagneticCursor } from "@/components/magnetic-cursor";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubStats } from "@/components/github-stats";
import { Floating3DModels } from "@/components/floating-3d-models";
import { SoundEffects } from "@/components/sound-effects";
import { motion } from "framer-motion";
import { LoadingScreen } from "@/components/loading-screen";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Portfolio() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoaded, setIsLoaded] = useState(false);

  const [particles, setParticles] = useState<
    { left: number; top: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    // Set loaded after a short delay to ensure critical components are rendered
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only run on client
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      {/* Magical background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <LoadingScreen />
      <MagneticCursor />
      <ScrollProgress />
      <FloatingNav />
      <ThemeToggle />
      <SoundEffects />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated background particles */}
        <div className="absolute inset-0 z-0">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: particle.delay,
              }}
            />
          ))}
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
                    Full-Stack Developer & Tech Innovator
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
              <Button className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 via-blue-600 to-emerald-500 hover:from-emerald-500 hover:via-blue-600 hover:to-cyan-500 border-0 px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-2xl shadow-2xl">
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
                  href: "https://github.com",
                  label: "GitHub",
                  color: "hover:bg-slate-700",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/shinekyawkyawaung/",
                  label: "LinkedIn",
                  color: "hover:bg-blue-600",
                },
                {
                  icon: Twitter,
                  href: "https://twitter.com",
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

      {/* Enhanced Stats Section */}
      <section className="py-20 sm:py-24 relative">
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              {
                number: "50+",
                label: "Projects Completed",
                icon: Code,
                color: "from-cyan-500 to-blue-600",
              },
              {
                number: "3+",
                label: "Years Experience",
                icon: Zap,
                color: "from-blue-500 to-purple-600",
              },
              {
                number: "25+",
                label: "Happy Clients",
                icon: Globe,
                color: "from-emerald-500 to-teal-600",
              },
              {
                number: "100%",
                label: "Success Rate",
                icon: Star,
                color: "from-yellow-500 to-orange-600",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative mb-4">
                  <motion.div
                    className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-r ${stat.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-full h-full rounded-3xl bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                      <stat.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                  </motion.div>
                </div>
                <motion.h3
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-slate-400 font-semibold text-sm sm:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Rest of sections remain the same but with enhanced spacing and effects */}
      {/* Interactive Terminal Section */}
      <section className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
          <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Interactive Terminal"
            subtitle="Try the command line interface"
          />

          <div className="mt-16 sm:mt-20">
            <InteractiveTerminal />
          </div>
        </div>
      </section>

      {/* 3D Models Section */}
      <section className="py-24 sm:py-32 relative">
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="3D Showcase"
            subtitle="Interactive technology visualization"
          />

          <div className="mt-16 sm:mt-20">
            <Floating3DModels />
          </div>
        </div>
      </section>

      {/* GitHub Stats Section */}
      <section className="py-24 sm:py-32 relative">
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Development Activity"
            subtitle="Live GitHub statistics"
          />

          <div className="mt-16 sm:mt-20">
            <GitHubStats />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
          <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="About Me"
            subtitle="My background and journey"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mt-16 sm:mt-20">
            <div className="relative">
              <div className="absolute -inset-4 sm:-inset-6 rounded-2xl bg-gradient-to-r from-cyan-500/15 to-blue-500/15 blur-2xl opacity-80"></div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-2xl">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Shine Kyaw Kyaw Aung"
                  className="w-full h-full object-cover"
                  width={600}
                  height={400}
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-sm font-semibold text-cyan-100">
                      Ready for new challenges
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <GlassmorphicCard>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  I`&apos;m a passionate software engineer with experience
                  building web applications and digital products. I specialize
                  in frontend development with React and Next.js, but I`&apos;m
                  also comfortable working with backend technologies.
                </p>
                <p className="text-base sm:text-lg text-slate-300 mt-4 sm:mt-6 leading-relaxed">
                  My journey in tech started with a strong foundation in
                  software development. I`&apos;ve worked with various companies
                  to create intuitive, performant, and accessible digital
                  experiences.
                </p>
                <p className="text-base sm:text-lg text-slate-300 mt-4 sm:mt-6 leading-relaxed">
                  When I`&apos;m not coding, you can find me exploring new
                  technologies, contributing to open-source projects, and
                  staying up-to-date with the latest industry trends.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10">
                  <div className="space-y-2">
                    <div className="text-sm text-slate-500 font-medium">
                      Name
                    </div>
                    <div className="font-semibold text-slate-200">
                      Shine Kyaw Kyaw Aung
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-slate-500 font-medium">
                      Email
                    </div>
                    <div className="font-semibold text-slate-200">
                      hello@example.com
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-slate-500 font-medium">
                      Location
                    </div>
                    <div className="font-semibold text-slate-200">Myanmar</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-slate-500 font-medium">
                      Status
                    </div>
                    <div className="font-semibold text-emerald-400">
                      Available
                    </div>
                  </div>
                </div>

                <div className="mt-8 sm:mt-10">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-xl">
                    Download Resume
                  </Button>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Technical Skills"
            subtitle="Technologies I master"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-16 sm:mt-20">
            <SkillBadge name="JavaScript" level={92} />
            <SkillBadge name="TypeScript" level={88} />
            <SkillBadge name="React" level={95} />
            <SkillBadge name="Next.js" level={90} />
            <SkillBadge name="Node.js" level={85} />
            <SkillBadge name="Python" level={80} />
            <SkillBadge name="Tailwind CSS" level={93} />
            <SkillBadge name="GraphQL" level={78} />
            <SkillBadge name="PostgreSQL" level={75} />
            <SkillBadge name="AWS" level={70} />
            <SkillBadge name="Docker" level={68} />
            <SkillBadge name="Git" level={90} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Featured Projects"
            subtitle="Recent work showcase"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mt-16 sm:mt-20">
            <ProjectCard
              title="E-commerce Platform"
              description="A full-stack e-commerce platform built with Next.js, Stripe, and Prisma."
              tags={["Next.js", "TypeScript", "Prisma", "Stripe"]}
              image="/placeholder.svg?height=400&width=600"
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
            <ProjectCard
              title="Task Management App"
              description="A collaborative task management application with real-time updates."
              tags={["React", "Firebase", "Tailwind CSS", "Redux"]}
              image="/placeholder.svg?height=400&width=600"
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
            <ProjectCard
              title="AI Content Generator"
              description="An AI-powered content generation tool using OpenAI's GPT models."
              tags={["Next.js", "OpenAI API", "Node.js", "MongoDB"]}
              image="/placeholder.svg?height=400&width=600"
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
            <ProjectCard
              title="Fitness Tracker"
              description="A mobile-first fitness tracking application with data visualization."
              tags={["React Native", "TypeScript", "D3.js", "Firebase"]}
              image="/placeholder.svg?height=400&width=600"
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
            <ProjectCard
              title="Weather Dashboard"
              description="A beautiful weather dashboard with forecasts and historical data."
              tags={["React", "Weather API", "Chart.js", "Styled Components"]}
              image="/placeholder.svg?height=400&width=600"
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
            <ProjectCard
              title="Portfolio Website"
              description="This portfolio website built with Next.js and Tailwind CSS."
              tags={["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"]}
              image="/placeholder.svg?height=400&width=600"
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Professional Journey"
            subtitle="Career milestones"
          />

          <div className="mt-16 sm:mt-20">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Let's Connect"
            subtitle="Ready to collaborate"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mt-16 sm:mt-20">
            <GlassmorphicCard>
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-cyan-100">
                Contact Information
              </h3>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">
                      Email
                    </div>
                    <div className="font-semibold text-slate-200">
                      hello@example.com
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">
                      LinkedIn
                    </div>
                    <div className="font-semibold text-slate-200">
                      linkedin.com/in/shinekyawkyawaung
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-emerald-400/30 flex items-center justify-center">
                    <Github className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">
                      GitHub
                    </div>
                    <div className="font-semibold text-slate-200">
                      github.com/shinekyawkyawaung
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-700/50">
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-cyan-100">
                  Current Status
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-slate-300 text-sm sm:text-base">
                    Open to new opportunities and collaborations
                  </span>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-12 sm:py-16 bg-slate-900/50 backdrop-blur-sm">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/"
              className="font-bold text-xl sm:text-2xl flex items-center gap-2"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Sparkles className="h-5 w-5 text-cyan-400" />
              </motion.div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Shine
              </span>
              <span className="text-slate-200">KKA</span>
            </Link>
            <p className="text-sm text-slate-500 mt-2 sm:mt-3 font-medium">
              © {new Date().getFullYear()} Shine Kyaw Kyaw Aung. All rights
              reserved.
            </p>
          </div>
          <div className="flex gap-3 sm:gap-5">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 hover:bg-slate-700 text-slate-400 hover:text-white hover:border-cyan-400/50 w-10 h-10 sm:w-12 sm:h-12"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/in/shinekyawkyawaung/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 hover:bg-blue-600 text-slate-400 hover:text-white hover:border-blue-400/50 w-10 h-10 sm:w-12 sm:h-12"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 hover:bg-cyan-500 text-slate-400 hover:text-white hover:border-cyan-400/50 w-10 h-10 sm:w-12 sm:h-12"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <Link href="mailto:hello@example.com">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 hover:bg-emerald-500 text-slate-400 hover:text-white hover:border-emerald-400/50 w-10 h-10 sm:w-12 sm:h-12"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
