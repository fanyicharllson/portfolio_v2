"use client";

import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  Calendar,
  Code,
  Trophy,
  AlertCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  languages: { name: string; percentage: number; color: string }[];
  recentActivity: { type: string; repo: string; date: string }[];
}

interface GitHubStatsProps {
  username: string;
}

const fetchGitHubStats = async (username: string): Promise<GitHubStats> => {
  const response = await fetch(`/api/github?username=${username}`);

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub stats");
  }

  return response.json();
};

export function GitHubStats({ username }: GitHubStatsProps) {
  const {
    data: stats,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["github-stats", username],
    queryFn: () => fetchGitHubStats(username),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: !!username, // Only run query if username is provided
  });

  // Error state
  if (error) {
    return (
      <motion.div
        className="w-full max-w-4xl mx-auto p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-md border border-red-500/50 p-8">
          <div className="flex items-center justify-center flex-col gap-4 h-48">
            <AlertCircle className="h-12 w-12 text-red-400" />
            <div className="text-center">
              <h3 className="text-xl font-semibold text-red-400 mb-2">
                Failed to load GitHub stats
              </h3>
              <p className="text-slate-400 mb-4">
                {error instanceof Error ? error.message : "An error occurred"}
              </p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <motion.div
        className="w-full max-w-4xl mx-auto p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-8">
          <div className="flex items-center justify-center flex-col gap-4 h-48">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full"
            />
            <p className="text-slate-400">
              Loading GitHub stats for {username}...
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!stats) return null;

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-md border border-slate-700/50">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-60"></div>

        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900/60 flex items-center justify-center">
                <Github className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-100">
                  GitHub Activity
                </h3>
                <Link
                  href={`https://github.com/${username}`}
                  className="text-slate-400 cursor-pointer"
                >
                  @{username}
                </Link>
              </div>
            </div>
            <button
              onClick={() => refetch()}
              className="px-3 py-2 bg-slate-700/50 hover:bg-slate-700/70 text-slate-300 rounded-lg transition-colors text-sm cursor-pointer"
            >
              Refresh
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: Code,
                label: "Repositories",
                value: stats.totalRepos,
                color: "text-cyan-400",
              },
              {
                icon: Star,
                label: "Stars Earned",
                value: stats.totalStars,
                color: "text-yellow-400",
              },
              {
                icon: GitFork,
                label: "Forks",
                value: stats.totalForks,
                color: "text-emerald-400",
              },
              {
                icon: Trophy,
                label: "Commits",
                value: stats.totalCommits,
                color: "text-blue-400",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-4 rounded-xl bg-slate-900/40 border border-slate-700/30"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/60 flex items-center justify-center">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  className={`text-2xl font-bold ${stat.color} mb-1`}
                >
                  {stat.value.toLocaleString()}
                </motion.div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Language Stats */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <Code className="h-5 w-5 text-cyan-400" />
                Top Languages
              </h4>
              <div className="space-y-3">
                {stats.languages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-slate-300 font-medium">
                          {lang.name}
                        </span>
                      </div>
                      <span className="text-slate-400 text-sm">
                        {lang.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: lang.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-cyan-400" />
                Recent Activity
              </h4>
              <div className="space-y-3">
                {stats.recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-700/30"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Code className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-slate-300 font-medium capitalize">
                        {activity.type} on {activity.repo}
                      </div>
                      <div className="text-slate-500 text-sm">
                        {activity.date}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
