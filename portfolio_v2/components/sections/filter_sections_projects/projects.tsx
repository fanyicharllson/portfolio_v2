"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { ProjectFilters, type ProjectCategory } from "./project-filters";
import { ProjectGrid, type Project } from "./project-grid";
import { Pagination } from "./pagination";

// Mock data - replace with your actual data from dashboard
const mockProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform built with Next.js, Stripe, and Prisma.",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "web",
    featured: true,
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates.",
    tags: ["React", "Firebase", "Tailwind CSS", "Redux"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "web",
  },
  {
    id: "3",
    title: "AI Content Generator",
    description:
      "An AI-powered content generation tool using OpenAI's GPT models.",
    tags: ["Next.js", "OpenAI API", "Node.js", "MongoDB"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "saas",
  },
  {
    id: "4",
    title: "Fitness Tracker",
    description:
      "A mobile-first fitness tracking application with data visualization.",
    tags: ["React Native", "TypeScript", "D3.js", "Firebase"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "mobile",
  },
  {
    id: "5",
    title: "Weather Dashboard",
    description:
      "A beautiful weather dashboard with forecasts and historical data.",
    tags: ["React", "Weather API", "Chart.js", "Styled Components"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "web",
  },
  {
    id: "6",
    title: "Portfolio Website",
    description: "This portfolio website built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "web",
  },
  {
    id: "7",
    title: "Android Banking App",
    description:
      "Secure mobile banking application with biometric authentication.",
    tags: ["Kotlin", "Android", "Room", "Retrofit"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "android",
  },
  {
    id: "8",
    title: "Microservice API Gateway",
    description: "Scalable API gateway for microservices architecture.",
    tags: ["Node.js", "Docker", "Kubernetes", "Redis"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "microservice",
  },
  {
    id: "9",
    title: "SaaS Analytics Platform",
    description: "Real-time analytics dashboard for SaaS businesses.",
    tags: ["React", "D3.js", "PostgreSQL", "Express"],
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "saas",
  },
];

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
