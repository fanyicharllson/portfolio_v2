import React from "react";
import { GitHubStats } from "../github-stats";
import { SectionHeading } from "../section-heading";

export default function GithubStats() {
  return (
    <>
      <section className="py-24 sm:py-32 relative">
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Development Activity"
            subtitle="Live GitHub statistics"
          />

          <div className="mt-16 sm:mt-20">
            <GitHubStats username="fanyicharllson" />
          </div>
        </div>
      </section>
    </>
  );
}
