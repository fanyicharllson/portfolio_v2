"use client";

import { Project, ProjectCategory } from "@/types/software";
import { useQuery } from "@tanstack/react-query";

const API_BASE = "/api/projects";
const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export function useAllProjects() {
  return useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}`);
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      return response.json();
    },
    staleTime: STALE_TIME,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useProjectCounts() {
  return useQuery<Record<ProjectCategory, number>, Error>({
    queryKey: ["projectCounts"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/counts`);
      if (!response.ok) {
        throw new Error("Failed to fetch project counts");
      }
      return response.json();
    },
    staleTime: STALE_TIME,
    retry: 2,
  });
}

export function useFeaturedProjects() {
  return useQuery<Project[], Error>({
    queryKey: ["featuredProjects"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}?featured=true`);
      if (!response.ok) {
        throw new Error("Failed to fetch featured projects");
      }
      return response.json();
    },
    staleTime: STALE_TIME,
    retry: 2,
  });
}
