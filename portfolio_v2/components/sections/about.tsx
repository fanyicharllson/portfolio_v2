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
    </>
  );
}
