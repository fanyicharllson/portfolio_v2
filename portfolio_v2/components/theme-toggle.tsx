"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"

type Theme = "light" | "dark" | "system"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem("theme") as Theme) || "dark"
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement

    if (newTheme === "light") {
      root.classList.remove("dark")
      root.style.setProperty("--bg-primary", "255 255 255")
      root.style.setProperty("--text-primary", "15 23 42")
    } else if (newTheme === "dark") {
      root.classList.add("dark")
      root.style.setProperty("--bg-primary", "15 23 42")
      root.style.setProperty("--text-primary", "248 250 252")
    } else {
      // System theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        root.classList.add("dark")
        root.style.setProperty("--bg-primary", "15 23 42")
        root.style.setProperty("--text-primary", "248 250 252")
      } else {
        root.classList.remove("dark")
        root.style.setProperty("--bg-primary", "255 255 255")
        root.style.setProperty("--text-primary", "15 23 42")
      }
    }
  }

  const toggleTheme = () => {
    const themes: Theme[] = ["light", "dark", "system"]
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]

    setTheme(nextTheme)
    localStorage.setItem("theme", nextTheme)
    applyTheme(nextTheme)
  }

  if (!mounted) return null

  const icons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  }

  const Icon = icons[theme]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-800/60 backdrop-blur-md border border-slate-600/50 text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-300 hover:scale-110"
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
