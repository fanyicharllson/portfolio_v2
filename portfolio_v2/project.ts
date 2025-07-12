import { Project } from "./components/sections/filter_sections_projects/project-grid";

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "CharityHub",
    description:
      "A modern charity and donation platform empowering users to support verified causes, track their impact, and give back effortlessly.",
    tags: ["React", "SupaBase", "Tailwind CSS", "Next.js"],
    image: "/CharityHub.jpg",
    demoUrl: "https://charityhub-rho.vercel.app",
    repoUrl: "https://github.com/fanyicharllson/CharityHub",
    category: "web",
  },
  {
    id: "2",
    title: "ProTrack",
    description:
      "A web application that helps developers track, plan and organize thier Projects.",
    tags: ["Next.js", "PostgreSQL", "Chart.js", "Styled Components"],
    image: "/protrack.jpg",
    demoUrl: "https://pro-track-dev.vercel.app",
    repoUrl: "https://github.com/fanyicharllson/ProTrack",
    category: "web",
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "This portfolio website built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    image: "/portfolio.jpg",
    demoUrl: "#",
    repoUrl: "https://github.com/fanyicharllson/portfolio_v2",
    category: "web",
  },
  {
    id: "4",
    title: "SaaS NjangiHub Platform",
    description: "A saas application for managing Njangi, secure payment...",
    tags: ["React", "Express", "MongoDB", "Node.js", "BullMq"],
    image: "/njangiHub.jpg",
    demoUrl: "https://njangihub.loopos.org/",
    repoUrl: "https://github.com/eminentbit/njangihub",
    category: "saas",
  },
];
