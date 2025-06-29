import React from "react";
import { SectionHeading } from "../section-heading";
import { InteractiveTerminal } from "../interactive-terminal";

export default function Terminal() {
  return (
    <>
      <section className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
          <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Interactive Terminal"
            subtitle="Try the command line interface"
          />

          <div className="mt-16 sm:mt-20">
            <InteractiveTerminal />
          </div>
        </div>
      </section>
    </>
  );
}
