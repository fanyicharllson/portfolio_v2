import React from "react";
import dynamic from "next/dynamic";
import { SectionHeading } from "../section-heading";

// The 3D model relies on react-three-fiber/three.js, which is a heavy,
// WebGL-only dependency. Load it only on the client, only when this
// section is reached, instead of bundling it into the initial page load.
const Floating3DModels = dynamic(
  () => import("../floating-3d-models").then((mod) => mod.Floating3DModels),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 relative rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-slate-700/50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

export default function ThreeDModel() {
  return (
    <>
      <section className="py-24 sm:py-32 relative">
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="3D Showcase"
            subtitle="Interactive technology visualization"
          />

          <div className="mt-16 sm:mt-20">
            <Floating3DModels />
          </div>
        </div>
      </section>
    </>
  );
}
