import React from "react";
import { GlassmorphicCard } from "../glassmorphic-card";
import { Button } from "../ui/button";
import { SectionHeading } from "../section-heading";
import Image from "next/image";

export default function About() {
  return (
    <>
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
                  src="/me_01.jpg"
                  alt="Fanyi Charllson"
                  className="w-full h-full object-cover object-center"
                  width={500}
                  height={300}
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
                  I&apos;m a Builder & CTO-Minded Software Architect with a deep
                  passion for crafting full-stack systems — from idea to
                  deployment. I specialize in architecting scalable
                  applications, building with modern tools like React, Next.js,
                  Spring Boot, and orchestrating the entire dev flow across
                  frontend, backend, and infrastructure.
                </p>
                <p className="text-base sm:text-lg text-slate-300 mt-4 sm:mt-6 leading-relaxed">
                  My journey into tech has been hands-on, ambitious, and deeply
                  rooted in real-world problem solving. I&apos;ve designed and
                  delivered everything from microservice SaaS platforms to
                  JavaFX desktop systems and even UE5 game logic — all with
                  intentional design and clean, maintainable code.
                </p>
                <p className="text-base sm:text-lg text-slate-300 mt-4 sm:mt-6 leading-relaxed">
                  Beyond coding, I&apos;m constantly exploring new technologies,
                  refining system design patterns, contributing to developer
                  communities, and building products that make an impact. I
                  believe in shipping fast, learning fast, and scaling smart.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10">
                  <div className="space-y-2">
                    <div className="text-sm text-slate-500 font-medium">
                      Name
                    </div>
                    <div className="font-semibold text-slate-200">
                      Fanyi Charllson Fanyi
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-slate-500 font-medium">
                      Email
                    </div>
                    <div className="font-semibold text-slate-200">
                      fanyicharllson@gmail.com
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-slate-500 font-medium">
                      Location
                    </div>
                    <div className="font-semibold text-slate-200">
                      Cameroon, Yaounde
                    </div>
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
    </>
  );
}
