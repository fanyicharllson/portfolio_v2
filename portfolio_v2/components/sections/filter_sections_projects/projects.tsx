"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { ProjectFilters, type ProjectCategory } from "./project-filters";
import { Pagination } from "./pagination";
import { mockProjects } from "@/project";
import { ProjectGrid } from "./project-grid";

const PROJECTS_PER_PAGE = 6;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return mockProjects;
    }
    return mockProjects.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE
  );

  // Calculate project counts for each category
  const projectCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      all: mockProjects.length,
      web: 0,
      mobile: 0,
      saas: 0,
      microservice: 0,
      android: 0,
      other: 0,
    };

    mockProjects.forEach((project) => {
      counts[project.category]++;
    });

    return counts;
  }, []);

  const handleCategoryChange = (category: ProjectCategory) => {
    setIsLoading(true);
    setActiveCategory(category);
    setCurrentPage(1);

    // Simulate loading delay for smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to projects section
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
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
          title="Featured Projects"
          subtitle="Showcasing innovation across platforms"
        />

        {/* Project Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16"
        >
          <ProjectFilters
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            projectCounts={projectCounts}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <ProjectGrid projects={paginatedProjects} isLoading={isLoading} />
        </motion.div>

        {/* Pagination */}
        {!isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Results summary */}
        {!isLoading && filteredProjects.length > 0 && (
          <motion.div
            className="text-center mt-8 text-slate-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            Showing {startIndex + 1}-
            {Math.min(startIndex + PROJECTS_PER_PAGE, filteredProjects.length)}{" "}
            of {filteredProjects.length} projects
            {activeCategory !== "all" && (
              <span className="ml-1">
                in{" "}
                <span className="text-cyan-400 font-medium capitalize">
                  {activeCategory}
                </span>
              </span>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
