"use client";
import { FloatingNav } from "@/components/floating-nav";
import { ScrollProgress } from "@/components/scroll-progress";
import { MagneticCursor } from "@/components/magnetic-cursor";
import { ThemeToggle } from "@/components/theme-toggle";
import { SoundEffects } from "@/components/sound-effects";
import { LoadingScreen } from "@/components/loading-screen";
import { useState, useEffect } from "react";
import Footer from "@/components/sections/footer";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";
import About from "@/components/sections/about";
import GithubStats from "@/components/sections/githubStats";
import ThreeDModel from "@/components/sections/3dmodel";
import Terminal from "@/components/sections/terminal";
import Stats from "@/components/sections/stats";
import HeroSection from "@/components/sections/hero";
import BackgroundEffect from "@/components/sections/backgroundEffect";
import Projects from "@/components/sections/filter_sections_projects/projects";
import Skills from "@/components/sections/skill_slider/skills";
import MessageMeOnWhatsApp from "@/components/chat-whatsapp";
import { VoiceAssistant } from "@/components/ai/voice-assistance";
import { BackgroundMusic } from "@/components/music/background-music";

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<
    { left: number; top: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Mark as client-side
    setIsClient(true);

    // Generate particles only on client
    setParticles(
      Array.from({ length: 8 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 2,
      }))
    );

    // Set loaded after a short delay to ensure critical components are rendered
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      {/* Magical background effects */}
      <BackgroundEffect isClient={isClient} />

      <LoadingScreen />
      <MagneticCursor />
      <ScrollProgress />
      <FloatingNav />
      <ThemeToggle />
      <SoundEffects />
      <MessageMeOnWhatsApp />
      <BackgroundMusic/>

      {/* Enhanced Hero Section */}
      <HeroSection
        isClient={isClient}
        isLoaded={isLoaded}
        particles={particles}
      />
      {/* Enhanced Stats Section */}
      <Stats />
      {/* Interactive Terminal Section */}
      <Terminal />
      {/* 3D Models Section */}
      <ThreeDModel />
      {/* GitHub Stats Section */}
      <GithubStats />
      {/* About Section */}
      <About />
      {/* Skills Section */}
      <Skills />
      {/* Projects Section */}
      <Projects />
      {/* Experience Section */}
      <Experience />
      {/* Contact Section */}
      <Contact />
      {/* Footer */}
      <Footer />

      {/* Voice ai */}
      <VoiceAssistant
        onCommand={(command) => {
          console.log("Voice command received:", command);
          // You can add additional command handling here
        }}
      />
    </div>
  );
}
