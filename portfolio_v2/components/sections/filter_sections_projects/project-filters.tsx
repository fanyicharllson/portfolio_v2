"use client"

import { motion } from "framer-motion"
import { Smartphone, Globe, Server, Layers, Code, Sparkles } from "lucide-react"

export type ProjectCategory = "all" | "web" | "mobile" | "saas" | "microservice" | "android" | "other"

interface ProjectFiltersProps {
  activeCategory: ProjectCategory
  onCategoryChange: (category: ProjectCategory) => void
  projectCounts: Record<ProjectCategory, number>
}

const categories = [
  {
    id: "all" as ProjectCategory,
    label: "All Projects",
    icon: Sparkles,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "web" as ProjectCategory,
    label: "Web Apps",
    icon: Globe,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "mobile" as ProjectCategory,
    label: "Mobile Apps",
    icon: Smartphone,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: "saas" as ProjectCategory,
    label: "SaaS",
    icon: Layers,
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: "microservice" as ProjectCategory,
    label: "Microservices",
    icon: Server,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "android" as ProjectCategory,
    label: "Android",
    icon: Smartphone,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "other" as ProjectCategory,
    label: "Others",
    icon: Code,
    gradient: "from-slate-500 to-gray-600",
  },
]

export function ProjectFilters({ activeCategory, onCategoryChange, projectCounts }: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
      {categories.map((category, index) => {
        const isActive = activeCategory === category.id
        const count = projectCounts[category.id] || 0

        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`relative group px-4 sm:px-6 py-3 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 ${
              isActive
                ? "text-white shadow-2xl"
                : "text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Active background gradient */}
            {isActive && (
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-2xl`}
                layoutId="activeCategory"
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              />
            )}

            {/* Hover glow effect */}
            <div
              className={`absolute -inset-1 bg-gradient-to-r ${category.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
            />

            <div className="relative flex items-center gap-2 sm:gap-3">
              <category.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>{category.label}</span>
              {count > 0 && (
                <motion.span
                  className={`px-2 py-1 text-xs rounded-full font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-700/50 text-slate-300 group-hover:bg-slate-600/50"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.2, duration: 0.2 }}
                >
                  {count}
                </motion.span>
              )}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
