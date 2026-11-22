import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20 scroll-mt-20"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="flex w-full flex-col items-center gap-10 px-6 md:px-10">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            src={project.image}
            badge={project.badge}
            previewLayers={project.previewLayers}
            title={project.title}
            tagline={project.tagline}
            description={project.summary}
            reverse={i % 2 === 1}
            tags={project.stack.slice(0, 4).map((tech) => tech.name)}
          />
        ))}
      </div>
    </section>
  );
};
