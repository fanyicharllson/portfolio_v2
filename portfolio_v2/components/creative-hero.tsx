"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CreativeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let devicePixelRatio: number;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      devicePixelRatio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;

      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      // Update mouse position for image effect
      setMousePosition({
        x: (e.clientX - rect.left - rect.width / 2) / 12,
        y: (e.clientY - rect.top - rect.height / 2) / 12,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Enhanced Particle class with magical effects
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      distance: number;
      angle: number;
      velocity: number;
      opacity: number;
      pulse: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 4 + 1;
        this.density = Math.random() * 40 + 15;
        this.distance = 0;
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 0.4 + 0.1;
        this.opacity = Math.random() * 0.8 + 0.4;
        this.pulse = Math.random() * Math.PI * 2;

        // Magical color palette
        const colors = [
          "rgba(6, 182, 212, 0.9)", // cyan
          "rgba(14, 165, 233, 0.9)", // sky blue
          "rgba(59, 130, 246, 0.9)", // blue
          "rgba(16, 185, 129, 0.8)", // emerald
          "rgba(34, 197, 94, 0.8)", // green
          "rgba(168, 85, 247, 0.7)", // violet
          "rgba(236, 72, 153, 0.6)", // pink
          "rgba(251, 191, 36, 0.7)", // amber
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Pulsing effect
        this.pulse += 0.05;
        const pulseFactor = Math.sin(this.pulse) * 0.3 + 1;

        // Calculate distance between mouse and particle
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);

        const forceDirectionX = dx / this.distance;
        const forceDirectionY = dy / this.distance;

        const maxDistance = 120;
        const force = (maxDistance - this.distance) / maxDistance;

        if (this.distance < maxDistance) {
          const directionX = forceDirectionX * force * this.density * 0.6;
          const directionY = forceDirectionY * force * this.density * 0.6;

          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Enhanced floating animation
          this.angle += this.velocity;
          const floatX = Math.sin(this.angle) * 0.5;
          const floatY = Math.cos(this.angle * 0.8) * 0.3;

          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx / 25 + floatX;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy / 25 + floatY;
          }
        }

        this.size = (Math.random() * 4 + 1) * pulseFactor;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;

        // Main particle with glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        ctx.shadowBlur = 5;
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, "1)");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Create magical particle grid
    const particlesArray: Particle[] = [];
    const gridSize = 35;

    function init() {
      particlesArray.length = 0;

      if (!canvas) return;

      const canvasWidth = canvas.width / devicePixelRatio;
      const canvasHeight = canvas.height / devicePixelRatio;

      const numX = Math.floor(canvasWidth / (gridSize * 1.2));
      const numY = Math.floor(canvasHeight / (gridSize * 1.2));

      for (let y = 0; y < numY; y++) {
        for (let x = 0; x < numX; x++) {
          const posX =
            x * gridSize * 1.2 + gridSize / 2 + Math.random() * 12 - 6;
          const posY =
            y * gridSize * 1.2 + gridSize / 2 + Math.random() * 12 - 6;
          particlesArray.push(new Particle(posX, posY));
        }
      }
    }

    init();

    // Enhanced animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse following
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      // Draw magical connections
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Enhanced connections with gradient magic
        if (i % 3 === 0) {
          for (let j = i; j < particlesArray.length; j += 3) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 50) {
              ctx.save();
              const gradient = ctx.createLinearGradient(
                particlesArray[i].x,
                particlesArray[i].y,
                particlesArray[j].x,
                particlesArray[j].y
              );

              const opacity = 0.4 - distance / 125;
              gradient.addColorStop(0, `rgba(6, 182, 212, ${opacity})`);
              gradient.addColorStop(
                0.5,
                `rgba(168, 85, 247, ${opacity * 0.8})`
              );
              gradient.addColorStop(1, `rgba(14, 165, 233, ${opacity})`);

              ctx.beginPath();
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1.5;
              ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
              ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="w-full h-[400px] sm:h-[480px] md:h-[550px] relative overflow-hidden rounded-3xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {/* Magical Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Enhanced floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-8 sm:top-16 left-8 sm:left-16 w-20 sm:w-28 h-20 sm:h-28 border-2 border-cyan-400/30 rounded-2xl backdrop-blur-sm"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            borderColor: [
              "rgba(6, 182, 212, 0.3)",
              "rgba(168, 85, 247, 0.5)",
              "rgba(6, 182, 212, 0.3)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-12 sm:bottom-24 right-6 sm:right-12 w-18 sm:w-24 h-18 sm:h-24 rounded-3xl backdrop-blur-sm"
          style={{
            background:
              "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2))",
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            rotate: [0, 180, 360],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/5 w-12 sm:w-16 h-12 sm:h-16 border-3 border-emerald-400/40 rounded-full backdrop-blur-sm"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
            borderColor: [
              "rgba(16, 185, 129, 0.4)",
              "rgba(236, 72, 153, 0.6)",
              "rgba(16, 185, 129, 0.4)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Image Container with WOW effects */}
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
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 150,
          }}
        >
          {/* Multiple layered glow rings */}
          <motion.div
            className="absolute -inset-8 sm:-inset-10 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(6, 182, 212, 0.3), rgba(168, 85, 247, 0.2), transparent)",
            }}
            animate={{
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 1 : 0.6,
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 0.5 },
              opacity: { duration: 0.5 },
              rotate: {
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            }}
          />

          <motion.div
            className="absolute -inset-6 sm:-inset-8 rounded-full blur-2xl"
            style={{
              background:
                "conic-gradient(from 0deg, #06b6d4, #a855f7, #0ea5e9, #10b981, #06b6d4)",
            }}
            animate={{
              scale: isHovered ? 1.15 : 1,
              rotate: isHovered ? 180 : 0,
            }}
            transition={{ duration: 0.8 }}
          />

          <motion.div
            className="absolute -inset-4 sm:-inset-6 rounded-full blur-xl"
            style={{
              background:
                "linear-gradient(45deg, rgba(59, 130, 246, 0.4), rgba(236, 72, 153, 0.3))",
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? -90 : 0,
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Enhanced Image container */}
          <motion.div
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm shadow-2xl"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Magical animated border */}
            <motion.div
              className="absolute inset-0 rounded-full p-1"
              style={{
                background:
                  "conic-gradient(from 0deg, #06b6d4, #a855f7, #0ea5e9, #10b981, #ec4899, #06b6d4)",
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div className="w-full h-full rounded-full bg-slate-900" />
            </motion.div>

            {/* Inner image container */}
            <div className="absolute inset-2 rounded-full overflow-hidden bg-slate-900">
              <motion.img
                src="/placeholder.svg?height=400&width=400"
                alt="Profile"
                className="w-full h-full object-cover"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.8 }}
              />

              {/* Magical overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

              {/* Floating magical particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: [
                      "#06b6d4",
                      "#a855f7",
                      "#10b981",
                      "#ec4899",
                      "#0ea5e9",
                      "#f59e0b",
                    ][i],
                    top: `${20 + i * 12}%`,
                    left: `${15 + i * 15}%`,
                  }}
                  animate={{
                    y: [-8, 8, -8],
                    x: [-4, 4, -4],
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Enhanced status indicator */}
          <motion.div
            className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl bg-slate-900/70 backdrop-blur-md border border-cyan-400/40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <motion.div
              className="w-3 h-3 rounded-full"
              style={{
                background: "radial-gradient(circle, #10b981, #059669)",
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [1, 0.6, 1],
                boxShadow: [
                  "0 0 0 0 rgba(16, 185, 129, 0.7)",
                  "0 0 0 8px rgba(16, 185, 129, 0)",
                  "0 0 0 0 rgba(16, 185, 129, 0.7)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <span className="text-xs sm:text-sm font-semibold text-cyan-100">
              Available
            </span>
          </motion.div>

          {/* Enhanced floating tech icons */}
          <motion.div
            className="absolute -top-6 sm:-top-8 -left-6 sm:-left-8 w-12 sm:w-14 h-12 sm:h-14 rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
            }}
            animate={{
              y: [-4, 4, -4],
              rotate: [-5, 5, -5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            ⚡
          </motion.div>

          <motion.div
            className="absolute -bottom-4 sm:-bottom-6 -right-8 sm:-right-10 w-14 sm:w-16 h-14 sm:h-16 rounded-3xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
            }}
            animate={{
              x: [-4, 4, -4],
              rotate: [5, -5, 5],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            🚀
          </motion.div>

          <motion.div
            className="absolute top-1/3 -right-8 sm:-right-12 w-10 sm:w-12 h-10 sm:h-12 rounded-2xl flex items-center justify-center text-white text-sm sm:text-lg font-bold shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #a855f7, #7c3aed)",
            }}
            animate={{
              y: [-3, 3, -3],
              x: [-2, 2, -2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            💻
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced corner decorations */}
      <motion.div
        className="absolute top-4 sm:top-6 left-4 sm:left-6 w-20 sm:w-24 h-20 sm:h-24 border-l-3 border-t-3 border-cyan-400/40 rounded-tl-3xl"
        animate={{
          borderColor: [
            "rgba(6, 182, 212, 0.4)",
            "rgba(168, 85, 247, 0.6)",
            "rgba(6, 182, 212, 0.4)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-20 sm:w-24 h-20 sm:h-24 border-r-3 border-b-3 border-blue-400/40 rounded-br-3xl"
        animate={{
          borderColor: [
            "rgba(59, 130, 246, 0.4)",
            "rgba(236, 72, 153, 0.6)",
            "rgba(59, 130, 246, 0.4)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </motion.div>
  );
}
