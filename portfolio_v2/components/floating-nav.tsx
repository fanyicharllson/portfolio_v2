"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  const handleNavClick = (href: string) => {
    if (isMobile) {
      setIsOpen(false)
    }
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Animated background glow */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-emerald-500/30 rounded-3xl blur-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Main navbar container */}
              <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "conic-gradient(from 0deg, transparent, #06b6d4, transparent, #0ea5e9, transparent)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <div className="absolute inset-[1px] bg-slate-900/90 backdrop-blur-2xl rounded-3xl" />

                {isMobile ? (
                  <div className="relative px-6 py-4 flex items-center justify-between min-w-[280px]">
                    <Link href="/" className="font-bold text-xl flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Sparkles className="h-5 w-5 text-cyan-400" />
                      </motion.div>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        Shine
                      </span>
                      <span className="text-white">KKA</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-2xl w-12 h-12 relative overflow-hidden group"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <AnimatePresence mode="wait">
                        {isOpen ? (
                          <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <X className="h-5 w-5 relative z-10" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Menu className="h-5 w-5 relative z-10" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </div>
                ) : (
                  <div className="relative px-8 py-4 flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl flex items-center gap-2 mr-8">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Sparkles className="h-5 w-5 text-cyan-400" />
                      </motion.div>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        Shine
                      </span>
                      <span className="text-white">KKA</span>
                    </Link>

                    <div className="flex items-center gap-1">
                      {navItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <button
                            onClick={() => handleNavClick(item.href)}
                            className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-all duration-300 rounded-2xl group overflow-hidden"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 rounded-2xl"
                              transition={{ duration: 0.3 }}
                            />
                            <span className="relative z-10">{item.name}</span>
                            <motion.div
                              className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full group-hover:left-0"
                              transition={{ duration: 0.3 }}
                            />
                          </button>
                        </motion.div>
                      ))}

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                        className="ml-4"
                      >
                        <Button
                          size="sm"
                          className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 border-0 rounded-2xl font-semibold px-6 py-2 text-sm group"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                          />
                          <span className="relative z-10">Resume</span>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu content */}
            <div className="relative flex flex-col items-center justify-center h-full px-6">
              <motion.div
                className="space-y-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="relative block px-8 py-4 text-3xl font-medium text-white hover:text-cyan-400 transition-all duration-300 group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-2xl"
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10">{item.name}</span>
                    </button>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: navItems.length * 0.1 + 0.2, duration: 0.3 }}
                  className="pt-8"
                >
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 border-0 rounded-2xl font-semibold px-8 py-4 text-lg">
                    Resume
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
