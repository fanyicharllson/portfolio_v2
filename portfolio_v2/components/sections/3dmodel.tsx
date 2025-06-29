import React from "react";
import { Floating3DModels } from "../floating-3d-models";
import { SectionHeading } from "../section-heading";

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
