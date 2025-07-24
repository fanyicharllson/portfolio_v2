export const downloadFile = async (
  url: string,
  fileName: string,
  openInNewTab: boolean = true
): Promise<void> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    // Create and trigger download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    window.URL.revokeObjectURL(downloadUrl);

    // Optionally open in new tab for viewing
    if (openInNewTab) {
      window.open(url, "_blank");
    }
  } catch (error) {
    console.error("File download failed:", error);
    throw error;
  }
};
