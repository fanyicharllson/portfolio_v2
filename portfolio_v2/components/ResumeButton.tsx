"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useResumeDownload } from "@/hooks/useResumeDownload";
import { Download, Loader2 } from "lucide-react";

interface ResumeButtonProps {
  resumeUrl?: string;
  fileName?: string;
  variant?: "default" | "gradient" | "outline";
  size?: "sm" | "lg";
  showIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ResumeButton: React.FC<ResumeButtonProps> = ({
  resumeUrl,
  fileName,
  variant = "gradient",
  size = "sm",
  showIcon = true,
  className = "",
  children,
}) => {
  const { downloadResume, isDownloading, error } = useResumeDownload(
    resumeUrl,
    fileName
  );

  const getButtonClasses = () => {
    const baseClasses =
      "relative overflow-hidden border-0 font-semibold group cursor-pointer transition-all duration-300";

    const sizeClasses = {
      sm: "px-6 py-2 text-sm rounded-2xl",
      md: "px-8 py-3 text-base rounded-2xl",
      lg: "px-10 py-4 text-lg rounded-3xl",
    };

    const variantClasses = {
      default: "bg-blue-600 hover:bg-blue-700 text-white",
      gradient:
        "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white",
      outline:
        "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  };

  const handleClick = async () => {
    if (isDownloading) return;
    await downloadResume();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.3 }}
      className="ml-4"
    >
      <Button
        size={size}
        className={getButtonClasses()}
        onClick={handleClick}
        disabled={isDownloading}
        title={error || "Download and view resume"}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />

        <span className="relative z-10 flex items-center gap-2">
          {isDownloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              {showIcon && <Download className="w-4 h-4" />}
              {children || "Resume"}
            </>
          )}
        </span>
      </Button>

      {error && (
        <div className="absolute top-full mt-2 left-0 bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded text-xs">
          {error}
        </div>
      )}
    </motion.div>
  );
};
