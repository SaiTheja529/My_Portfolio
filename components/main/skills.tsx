"use client";

import { SkillCard } from "@/components/sub/skill-card";
import { SkillText } from "@/components/sub/skill-text";
import { SKILL_GROUPS } from "@/constants";

export const Skills = () => {
  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
    >
      <SkillText />

      <div className="flex flex-col gap-10 items-center px-6 mt-4 z-[10]">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col items-center gap-4">
            <h3 className="text-sm uppercase tracking-[0.25em] text-cyan-400/90">
              {group.title}
            </h3>
            <div className="flex flex-row flex-wrap justify-center gap-4">
              {group.skills.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  index={i}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};
