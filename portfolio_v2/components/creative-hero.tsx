"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function CreativeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 12;
    const y = (e.clientY - rect.top - rect.height / 2) / 12;

    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const heroElement = imageRef.current;
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      if (heroElement) observer.unobserve(heroElement);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2); // Limit DPR for performance

    // Optimized canvas setup
    const setCanvasDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    setCanvasDimensions();

    // Reduced particle system for better performance
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      opacity: number;
      angle: number;
      velocity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 1; // Smaller particles
        this.density = Math.random() * 20 + 10; // Reduced density
        this.opacity = Math.random() * 0.6 + 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 0.02 + 0.01; // Slower movement

        // Simplified color palette
        const colors = [
          "rgba(6, 182, 212, 0.7)",
          "rgba(14, 165, 233, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.6)",
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouseX: number, mouseY: number) {
        // Simplified physics
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          const force = (80 - distance) / 80;
          this.x -= (dx / distance) * force * 2;
          this.y -= (dy / distance) * force * 2;
        } else {
          // Simple return to base position
          this.x += (this.baseX - this.x) * 0.02;
          this.y += (this.baseY - this.y) * 0.02;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Reduced particle count
    const particlesArray: Particle[] = [];
    const gridSize = 50; // Larger grid for fewer particles

    function init() {
      particlesArray.length = 0;
      if (!canvas) return;
      const canvasWidth = canvas.width / devicePixelRatio;
      const canvasHeight = canvas.height / devicePixelRatio;
      const numX = Math.floor(canvasWidth / gridSize);
      const numY = Math.floor(canvasHeight / gridSize);

      for (let y = 0; y < numY; y++) {
        for (let x = 0; x < numX; x++) {
          const posX = x * gridSize + gridSize / 2;
          const posY = y * gridSize + gridSize / 2;
          particlesArray.push(new Particle(posX, posY));
        }
      }
    }

    init();

    let mouseX = 0;
    let mouseY = 0;
    let lastTime = 0;

    // Optimized animation loop with frame limiting
    const animate = (currentTime: number) => {
      if (currentTime - lastTime < 16) {
        // Limit to ~60fps
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles (reduced frequency)
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mouseX, mouseY);
        particlesArray[i].draw();

        // Simplified connections (every 4th particle)
        if (i % 4 === 0) {
          for (let j = i + 4; j < particlesArray.length; j += 4) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 60) {
              ctx.save();
              ctx.globalAlpha = 0.1;
              ctx.strokeStyle = "rgba(6, 182, 212, 0.5)";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
              ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Throttled mouse tracking
    let mouseTimeout: NodeJS.Timeout;
    const updateMouse = (e: MouseEvent) => {
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }, 10);
    };

    window.addEventListener("mousemove", updateMouse, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(mouseTimeout);
    };
  }, [isVisible, handleMouseMove]);

  return (
    <motion.div
      className="w-full h-[400px] sm:h-[480px] md:h-[550px] relative overflow-hidden rounded-3xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Optimized Canvas Background */}
      {isVisible && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      )}

      {/* Simplified floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-8 sm:top-16 left-8 sm:left-16 w-20 sm:w-28 h-20 sm:h-28 border-2 border-cyan-400/30 rounded-2xl"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-12 sm:bottom-24 right-6 sm:right-12 w-18 sm:w-24 h-18 sm:h-24 rounded-3xl bg-gradient-to-r from-blue-500/15 to-emerald-500/15"
          animate={{ y: [-5, 5, -5], rotate: [0, 180, 360] }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Image Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          ref={imageRef}
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 100 }}
        >
          {/* Simplified glow effects */}
          <motion.div
            className="absolute -inset-6 rounded-full blur-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
            animate={{
              scale: isHovered ? 1.1 : 1,
              opacity: isHovered ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Image container */}
          <motion.div
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Simplified animated border */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 p-1"
              animate={{ rotate: 360 }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div className="w-full h-full rounded-full bg-slate-900" />
            </motion.div>

            {/* Inner image */}
            <div className="absolute inset-2 rounded-full overflow-hidden bg-slate-900">
              <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/me.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={500}
                  height={400}
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

              {/* Reduced floating particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: ["#06b6d4", "#a855f7", "#10b981"][i],
                    top: `${30 + i * 20}%`,
                    left: `${20 + i * 25}%`,
                  }}
                  animate={{
                    y: [-4, 4, -4],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Simplified status indicator */}
          <motion.div
            className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-cyan-400/40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <span className="text-xs font-semibold text-cyan-100">
              Available
            </span>
          </motion.div>

          {/* Simplified tech icons */}
          <motion.div
            className="absolute -top-6 -left-6 w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-lg font-bold shadow-xl"
            animate={{ y: [-2, 2, -2] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            ⚡
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -right-8 w-14 h-14 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-xl"
            animate={{ x: [-2, 2, -2] }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            🚀
          </motion.div>
        </motion.div>
      </div>

      {/* Simplified corner decorations */}
      <div className="absolute top-4 left-4 w-20 h-20 border-l-3 border-t-3 border-cyan-400/40 rounded-tl-3xl" />
      <div className="absolute bottom-4 right-4 w-20 h-20 border-r-3 border-b-3 border-blue-400/40 rounded-br-3xl" />
    </motion.div>
  );
}
