import React from "react";
import { GlassmorphicCard } from "../glassmorphic-card";
import { ContactForm } from "../contact-form";
import { SectionHeading } from "../section-heading";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <>
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
                      fanyicharllson@gmail.com
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
                      linkedin.com/in/fanyicharllson
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
                      github.com/fanyicharllson
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
    </>
  );
}
