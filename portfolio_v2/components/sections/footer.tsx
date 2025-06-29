import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail, Sparkles, Twitter } from "lucide-react";
// import Image from "next/image";

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-12 sm:py-16 bg-slate-900/50 backdrop-blur-sm">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8">
          <div>
            {/* <div>
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={48}
                priority
                className="h-12 w-auto"
              />
            </div> */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 ">
                FANYI
              </span>
              <span className="text-slate-200">CF</span>
            </Link>
            <p className="text-sm text-slate-500 mt-2 sm:mt-3 font-medium">
              © {new Date().getFullYear()} Fanyi Charllson Fanyi. All rights
              reserved.
            </p>
          </div>
          <div className="flex gap-3 sm:gap-5">
            <Link
              href="https://github.com/fanyicharllson"
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
              href="https://www.linkedin.com/in/fanyi-charllson-ab19492b8/"
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
              href="#"
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
            <Link href="mailto:fanyicharllson@gmail.com">
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
    </>
  );
}
