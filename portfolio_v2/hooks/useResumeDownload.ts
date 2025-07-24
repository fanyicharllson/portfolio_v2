"use client";
import { useState, useCallback } from "react";

interface DownloadState {
  isDownloading: boolean;
  error: string | null;
}

interface UseResumeDownloadReturn {
  downloadResume: () => Promise<void>;
  isDownloading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useResumeDownload = (
  resumeUrl?: string,
  fileName?: string
): UseResumeDownloadReturn => {
  const [state, setState] = useState<DownloadState>({
    isDownloading: false,
    error: null,
  });

  const downloadResume = useCallback(async () => {

    const defaultResumeUrl = resumeUrl || "/my_cv.pdf";
    const defaultFileName = fileName || "Fanyi_Charllson_Resume.pdf";

    setState({ isDownloading: true, error: null });

    try {
      // Fetch the resume file
      const response = await fetch(defaultResumeUrl);

      if (!response.ok) {
        throw new Error(`Failed to download resume: ${response.statusText}`);
      }

      // Get the blob data
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = defaultFileName;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Open in new tab for viewing
      window.open(defaultResumeUrl, "_blank");
    } catch (error) {
      console.error("Resume download failed:", error);
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Download failed",
      }));
    } finally {
      setState((prev) => ({ ...prev, isDownloading: false }));
    }
  }, [resumeUrl, fileName]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    downloadResume,
    isDownloading: state.isDownloading,
    error: state.error,
    clearError,
  };
};
