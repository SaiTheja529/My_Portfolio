import Image from "next/image";
import Link from "next/link";

import { LayerStack } from "@/components/sub/agentic-rag";
import { TiltCard } from "@/components/sub/tilt-card";
import type { Layer } from "@/constants";

type ProjectCardProps = {
  slug: string;
  /** Screenshot; when absent, the 3D architecture stack is shown instead. */
  src?: string;
  badge: string;
  previewLayers?: ReadonlyArray<Layer>;
  title: string;
  tagline: string;
  description: string;
  tags: ReadonlyArray<string>;
  /** Put the image on the right on desktop. */
  reverse?: boolean;
};

export const ProjectCard = ({
  slug,
  src,
  badge,
  previewLayers,
  title,
  tagline,
  description,
  tags,
  reverse = false,
}: ProjectCardProps) => {
  return (
    <TiltCard max={6} className="w-full max-w-6xl">
      <Link
        href={`/projects/${slug}`}
        className={`group relative flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} overflow-hidden rounded-3xl border border-[#7042f88b] bg-[#03001499] shadow-[0_0_40px_#7042f833] backdrop-blur-md transition-shadow hover:shadow-[0_0_60px_#7042f866]`}
      >
        <div className="relative overflow-hidden bg-[#0f1115] md:w-[64%]">
          {src ? (
            <Image
              src={src}
              alt={`${title} home page screenshot`}
              width={1920}
              height={1022}
              sizes="(min-width: 768px) 64vw, 100vw"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="relative flex h-full min-h-[280px] items-center justify-center bg-[radial-gradient(ellipse_at_center,#2a1066_0%,#0a0620_70%)]">
              <LayerStack compact layers={previewLayers} />
              <span className="absolute bottom-3 left-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                Architecture
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-center gap-3 p-6 md:p-8">
          <span className="w-fit rounded-full border border-[#7042f88b] px-3 py-1 text-xs uppercase tracking-widest text-cyan-400">
            {badge}
          </span>
          <h3 className="text-3xl font-semibold text-white">
            {title}
          </h3>
          <p className="text-[#b49bff]">{tagline}</p>
          <p className="text-sm leading-relaxed text-gray-300">{description}</p>

          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-[#7042f81f] px-2.5 py-1 text-xs text-gray-300"
              >
                {tag}
              </li>
            ))}
          </ul>

          <span className="mt-2 inline-flex items-center gap-2 font-medium text-white">
            View full case study
            <span className="transition-transform group-hover:translate-x-1.5">
              →
            </span>
          </span>
        </div>
      </Link>
    </TiltCard>
  );
};
