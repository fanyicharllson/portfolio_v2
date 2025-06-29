import React from "react";
import { SectionHeading } from "../section-heading";
import { SkillBadge } from "../skill-badge";

export default function Skill() {
  return (
    <>
      <section id="skills" className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Technical Skills"
            subtitle="Technologies I master"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-16 sm:mt-20">
            <SkillBadge name="JavaScript" level={92} />
            <SkillBadge name="TypeScript" level={88} />
            <SkillBadge name="React" level={95} />
            <SkillBadge name="Next.js" level={90} />
            <SkillBadge name="Node.js" level={85} />
            <SkillBadge name="Python" level={80} />
            <SkillBadge name="Tailwind CSS" level={93} />
            <SkillBadge name="GraphQL" level={78} />
            <SkillBadge name="PostgreSQL" level={75} />
            <SkillBadge name="AWS" level={70} />
            <SkillBadge name="Docker" level={68} />
            <SkillBadge name="Git" level={90} />
          </div>
        </div>
      </section>
    </>
  );
}
