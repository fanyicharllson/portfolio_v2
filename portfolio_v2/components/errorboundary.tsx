"use client";

import React from "react";
import { toast } from "sonner";

export class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("3D Model Error:", error, info);

    toast.error(
      "⚠️ 3D model failed to load due to network issues! Please Check your network Connection or Reload the browser.",
      {
        duration: 7000,
      }
    );
  }

  render() {
    // Render children anyway — don't block the UI
    return this.props.children;
  }
}
