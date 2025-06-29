"use client";

import { SectionHeading } from "@/components/section-heading";
import { InfiniteScrollSkills } from "./infinite-scroll-skills";
import { motion } from "framer-motion";

const skills = [
  {
    name: "JavaScript",
    level: 92,
    icon: "🟨",
    category: "Programming Language",
    color: "linear-gradient(45deg, #f7df1e, #f0db4f)",
  },
  {
    name: "TypeScript",
    level: 88,
    icon: "🔷",
    category: "Programming Language",
    color: "linear-gradient(45deg, #3178c6, #2d79c7)",
  },
  {
    name: "React",
    level: 95,
    icon: "⚛️",
    category: "Frontend Framework",
    color: "linear-gradient(45deg, #61dafb, #21d4fd)",
  },
  {
    name: "Next.js",
    level: 90,
    icon: "▲",
    category: "Full-Stack Framework",
    color: "linear-gradient(45deg, #000000, #333333)",
  },
  {
    name: "Node.js",
    level: 85,
    icon: "🟢",
    category: "Backend Runtime",
    color: "linear-gradient(45deg, #339933, #68cc68)",
  },
  {
    name: "Python",
    level: 80,
    icon: "🐍",
    category: "Programming Language",
    color: "linear-gradient(45deg, #3776ab, #ffd343)",
  },
  {
    name: "Tailwind CSS",
    level: 93,
    icon: "🎨",
    category: "CSS Framework",
    color: "linear-gradient(45deg, #06b6d4, #0ea5e9)",
  },
  {
    name: "GraphQL",
    level: 78,
    icon: "📊",
    category: "Query Language",
    color: "linear-gradient(45deg, #e10098, #ff6b9d)",
  },
  {
    name: "PostgreSQL",
    level: 75,
    icon: "🐘",
    category: "Database",
    color: "linear-gradient(45deg, #336791, #4a90a4)",
  },
  {
    name: "AWS",
    level: 70,
    icon: "☁️",
    category: "Cloud Platform",
    color: "linear-gradient(45deg, #ff9900, #ffb84d)",
  },
  {
    name: "Docker",
    level: 68,
    icon: "🐳",
    category: "DevOps Tool",
    color: "linear-gradient(45deg, #2496ed, #0db7ed)",
  },
  {
    name: "Git",
    level: 90,
    icon: "📝",
    category: "Version Control",
    color: "linear-gradient(45deg, #f05032, #f14e32)",
  },
  {
    name: "MongoDB",
    level: 82,
    icon: "🍃",
    category: "Database",
    color: "linear-gradient(45deg, #47a248, #4db33d)",
  },
  {
    name: "Vue.js",
    level: 75,
    icon: "💚",
    category: "Frontend Framework",
    color: "linear-gradient(45deg, #4fc08d, #42b883)",
  },
  {
    name: "Firebase",
    level: 85,
    icon: "🔥",
    category: "Backend Service",
    color: "linear-gradient(45deg, #ffca28, #ffc107)",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 relative">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Technical Skills"
          subtitle="Technologies I master"
        />

        <motion.div
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <InfiniteScrollSkills skills={skills} speed={15} />
        </motion.div>

        {/* Additional info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Continuously learning and adapting to new technologies. Each skill
            represents countless hours of practice, real-world projects, and
            ongoing improvement.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
