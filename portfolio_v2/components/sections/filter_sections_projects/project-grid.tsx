"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import type { ProjectCategory } from "./project-filters";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  repoUrl: string;
  category: ProjectCategory;
  featured?: boolean;
}

interface ProjectGridProps {
  projects: Project[];
  isLoading?: boolean;
}

export function ProjectGrid({ projects, isLoading }: ProjectGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="h-96 rounded-xl bg-slate-800/50 border border-slate-700/50 animate-pulse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <motion.div
        className="text-center py-16 sm:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
          <motion.div
            className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
        <h3 className="text-xl font-semibold text-slate-300 mb-2">
          No projects found
        </h3>
        <p className="text-slate-500">
          Try selecting a different category or check back later.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
      layout
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              layout: { duration: 0.3 },
            }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              demoUrl={project.demoUrl}
              repoUrl={project.repoUrl}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
