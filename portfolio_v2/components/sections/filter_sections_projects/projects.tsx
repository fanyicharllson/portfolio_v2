/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/projects/index.tsx
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { ProjectFilters, type ProjectCategory } from "./project-filters";
import { Pagination } from "./pagination";
import { mockProjects } from "@/project";
import { ProjectGrid } from "./project-grid";
import { useAllProjects, useProjectCounts } from "@/hooks/useProjects";
import { AlertCircle, RefreshCw } from "lucide-react";

const PROJECTS_PER_PAGE = 6;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ React Query hooks - These replace your data fetching logic
  const {
    data: allProjects = mockProjects,
    isLoading: isLoadingProjects,
    isError: hasProjectsError,
    error: projectsError,
    refetch: refetchProjects,
    isFetching: isFetchingProjects,
  } = useAllProjects();

  const {
    data: projectCounts,
    isLoading: isLoadingCounts,
    isFetching: isFetchingCounts,
    refetch: reducerProjectCounts,
  } = useProjectCounts();

  // Combined loading state
  const isLoading = isLoadingProjects || isLoadingCounts;
  const isFetching = isFetchingProjects || isFetchingCounts;

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    const ensureDemoUrl = (project: any) => ({
      ...project,
      demoUrl: project.demoUrl ?? "",
    });

    if (activeCategory === "all") {
      return allProjects.map(ensureDemoUrl);
    }
    return allProjects
      .filter((project) => project.category === activeCategory)
      .map(ensureDemoUrl);
  }, [activeCategory, allProjects]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE
  );

  // Use project counts from React Query or calculate as fallback
  const finalProjectCounts = useMemo(() => {
    if (projectCounts) {
      return projectCounts;
    }

    // Fallback calculation if API is not available
    const counts: Record<ProjectCategory, number> = {
      all: allProjects.length,
      web: 0,
      mobile: 0,
      saas: 0,
      microservice: 0,
      android: 0,
      other: 0,
    };

    allProjects.forEach((project) => {
      counts[project.category]++;
    });

    return counts;
  }, [projectCounts, allProjects]);

  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to projects section
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle retry on error
  const handleRetry = () => {
    refetchProjects();
    reducerProjectCounts();
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

        {/* Error State - with retry button */}
        {hasProjectsError && (
          <motion.div
            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <div>
                  <p className="font-medium">
                    Oops so sorry!😥 Unable to load Charllson&apos;s projects,
                    showing cached data...{" "}
                  </p>
                  <p className="text-sm text-red-300">
                    {projectsError?.message ||
                      "Error fetching from database. Showing cached data."}
                  </p>
                </div>
              </div>
              {/* Retry button */}
              <button
                onClick={handleRetry}
                disabled={isFetchingProjects}
                className="flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    isFetchingProjects ? "animate-spin" : ""
                  }`}
                />
                <span className="text-sm">Retry</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Loading State - show skeleton or spinner */}
        {isLoading && (
          <motion.div
            className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-blue-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="h-5 w-5" />
              </motion.div>
              <p>Loading Charllson&apos;s projects!😎 Give me a sec... </p>
            </div>
          </motion.div>
        )}

        {/* Refetching indicator - subtle notification while background refresh happens */}
        {!isLoading && isFetching && (
          <motion.div
            className="mb-4 p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 text-sm flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="h-3 w-3" />
            </motion.div>
            Refreshing Charllson&apos;s projects...
          </motion.div>
        )}

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
            projectCounts={finalProjectCounts}
          />
        </motion.div>

        {/* Refetch btn for user to manually refetch project */}
        <div>
          {/* Retry button */}
          <button
            onClick={handleRetry}
            disabled={isFetchingProjects}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg transition-colors disabled:opacity-50 cursor-pointer hover:from-cyan-600 hover:to-blue-700 mb-6"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetchingProjects ? "animate-spin" : ""}`}
            />
            <span className="text-xs">Reload Charllson&apos;s projects</span>
          </button>
        </div>

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
        {!isLoading && filteredProjects.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Empty state */}
        {!isLoading && filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-slate-400">
              No projects found in the{" "}
              <span className="text-cyan-400 font-medium capitalize">
                {activeCategory}
              </span>{" "}
              category.
            </p>
          </motion.div>
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
