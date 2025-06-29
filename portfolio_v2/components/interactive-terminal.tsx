"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal } from "lucide-react"

interface Command {
  input: string
  output: string[]
  type: "success" | "error" | "info"
}

export function InteractiveTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: {
      output: [
        "Available commands:",
        "  help          - Show this help message",
        "  about         - Learn about Shine",
        "  skills        - View technical skills",
        "  projects      - List recent projects",
        "  contact       - Get contact information",
        "  resume        - Download resume",
        "  clear         - Clear terminal",
        "  whoami        - Current user info",
        "  ls            - List directory contents",
        "  cat <file>    - Display file contents",
      ],
      type: "info" as const,
    },
    about: {
      output: [
        "👨‍💻 Shine Kyaw Kyaw Aung",
        "🚀 Full-Stack Developer & Tech Innovator",
        "📍 Based in Myanmar",
        "💡 Passionate about creating digital solutions",
        "🎯 3+ years of professional experience",
        "🌟 Specialized in React, Next.js, and modern web technologies",
      ],
      type: "success" as const,
    },
    skills: {
      output: [
        "🔧 Technical Skills:",
        "  Frontend: React, Next.js, TypeScript, Tailwind CSS",
        "  Backend: Node.js, Python, PostgreSQL, MongoDB",
        "  Tools: Git, Docker, AWS, Vercel",
        "  Languages: JavaScript (92%), TypeScript (88%), Python (80%)",
        "  Frameworks: React (95%), Next.js (90%), Node.js (85%)",
      ],
      type: "success" as const,
    },
    projects: {
      output: [
        "📂 Recent Projects:",
        "  1. E-commerce Platform - Next.js, Stripe, Prisma",
        "  2. Task Management App - React, Firebase, Redux",
        "  3. AI Content Generator - OpenAI API, Node.js",
        "  4. Fitness Tracker - React Native, D3.js",
        "  5. Weather Dashboard - React, Chart.js",
        "  6. Portfolio Website - Next.js, Framer Motion",
      ],
      type: "success" as const,
    },
    contact: {
      output: [
        "📧 Contact Information:",
        "  Email: hello@example.com",
        "  LinkedIn: linkedin.com/in/shinekyawkyawaung",
        "  GitHub: github.com/shinekyawkyawaung",
        "  Status: Available for opportunities",
        "  Response Time: Usually within 24 hours",
      ],
      type: "success" as const,
    },
    resume: {
      output: ["📄 Resume download initiated...", "✅ Resume.pdf downloaded successfully!", "📊 Total downloads: 247"],
      type: "success" as const,
    },
    whoami: {
      output: [
        "guest@shine-portfolio:~$ whoami",
        "You are: Visitor",
        "Access Level: Guest",
        "Session: Active",
        "Location: Portfolio Terminal",
      ],
      type: "info" as const,
    },
    ls: {
      output: [
        "📁 Directory Contents:",
        "  projects/     - My development projects",
        "  skills/       - Technical expertise",
        "  experience/   - Work history",
        "  education/    - Academic background",
        "  contact/      - Get in touch",
        "  README.md     - About this portfolio",
      ],
      type: "info" as const,
    },
    clear: {
      output: [],
      type: "info" as const,
    },
  }

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    setIsTyping(true)

    // Add input to history
    const newCommand: Command = {
      input: cmd,
      output: [],
      type: "info",
    }

    if (trimmedCmd === "clear") {
      setHistory([])
      setIsTyping(false)
      return
    }

    if (trimmedCmd.startsWith("cat ")) {
      const filename = trimmedCmd.substring(4)
      newCommand.output = [`cat: ${filename}: File not found`, "Available files: README.md, package.json, .env"]
      newCommand.type = "error"
    } else if (commands[trimmedCmd as keyof typeof commands]) {
      const command = commands[trimmedCmd as keyof typeof commands]
      newCommand.output = command.output
      newCommand.type = command.type
    } else {
      newCommand.output = [`Command '${cmd}' not found.`, "Type 'help' for available commands."]
      newCommand.type = "error"
    }

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setHistory((prev) => [...prev, newCommand])
    setIsTyping(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput("")
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history, isTyping])

  useEffect(() => {
    // Welcome message
    const welcomeCommand: Command = {
      input: "",
      output: [
        "🚀 Welcome to Shine's Interactive Terminal!",
        "Type 'help' to see available commands.",
        "Explore my portfolio through the command line!",
      ],
      type: "success",
    }
    setHistory([welcomeCommand])
  }, [])

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/50 shadow-2xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-60"></div>

        {/* Terminal Header */}
        <div className="relative flex items-center justify-between p-3 sm:p-4 border-b border-slate-700/50 bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Terminal className="h-4 w-4" />
              <span className="text-xs sm:text-sm font-medium">shine@portfolio:~</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="hidden sm:inline">Online</span>
            </div>
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="relative h-64 sm:h-80 md:h-96 overflow-y-auto p-3 sm:p-4 font-mono text-xs sm:text-sm bg-slate-900/50"
        >
          <AnimatePresence>
            {history.map((command, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                {command.input && (
                  <div className="flex items-center gap-2 text-cyan-400 mb-2 flex-wrap">
                    <span className="text-emerald-400 text-xs sm:text-sm">guest@shine-portfolio:~$</span>
                    <span className="break-all">{command.input}</span>
                  </div>
                )}
                <div
                  className={`ml-2 sm:ml-4 ${
                    command.type === "error"
                      ? "text-red-400"
                      : command.type === "success"
                        ? "text-emerald-400"
                        : "text-slate-300"
                  }`}
                >
                  {command.output.map((line, lineIndex) => (
                    <motion.div
                      key={lineIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: lineIndex * 0.05 }}
                      className="mb-1 break-words"
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-slate-400 flex-wrap"
            >
              <span className="text-emerald-400 text-xs sm:text-sm">guest@shine-portfolio:~$</span>
              <div className="flex items-center gap-1">
                <span>Processing</span>
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="flex gap-1"
                >
                  <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-emerald-400 font-mono text-xs sm:text-sm">guest@shine-portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-cyan-400 outline-none font-mono placeholder-slate-500 text-xs sm:text-sm"
              placeholder="Type a command... (try 'help')"
              autoFocus
            />
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="w-2 h-4 bg-cyan-400"
            />
          </form>
        </div>

        {/* Quick Commands */}
        <div className="relative p-3 sm:p-4 border-t border-slate-700/50 bg-slate-800/30">
          <div className="flex flex-wrap gap-2">
            {["help", "about", "skills", "projects", "contact"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd)
                  inputRef.current?.focus()
                }}
                className="px-2 sm:px-3 py-1 text-xs rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-cyan-400 transition-colors border border-slate-600/50"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
