"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function MagneticCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let lastTime = 0
    const throttleDelay = 10 // ms

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime < throttleDelay) return

      lastTime = now
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Throttle the cursor variant check to improve performance
      if (now % 50 === 0) {
        updateCursorVariant(e)
      }
    }

    const updateCursorVariant = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setCursorVariant("button")
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setCursorVariant("input")
      } else {
        setCursorVariant("default")
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: "rgba(6, 182, 212, 0.3)",
      border: "2px solid rgba(6, 182, 212, 0.8)",
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: "rgba(14, 165, 233, 0.2)",
      border: "2px solid rgba(14, 165, 233, 1)",
    },
    input: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 12,
      scale: 1,
      backgroundColor: "rgba(16, 185, 129, 0.3)",
      border: "2px solid rgba(16, 185, 129, 0.8)",
    },
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={variants[cursorVariant as keyof typeof variants]}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Trailing cursor - only render when visible for performance */}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-50"
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.3 }}
        />
      )}
    </>
  )
}
