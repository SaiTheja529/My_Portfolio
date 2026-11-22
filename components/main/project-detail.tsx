"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaLock } from "react-icons/fa";

import { AgenticRagShowcase } from "@/components/sub/agentic-rag";
import { HybridScoring } from "@/components/sub/hybrid-scoring";
import { MicroservicesShowcase } from "@/components/sub/microservices";
import { Reveal, SectionTitle } from "@/components/sub/section";
import { TiltCard } from "@/components/sub/tilt-card";
import { PROJECTS } from "@/constants";

// WebGL scene is browser-only.
const CityScene = dynamic(
  () => import("@/components/sub/city-scene").then((m) => m.CityScene),
  { ssr: false }
);
const ServicesCanvas = dynamic(
  () => import("@/components/sub/services-scene").then((m) => m.ServicesCanvas),
  { ssr: false }
);
const RagScene = dynamic(
  () => import("@/components/sub/rag-scene").then((m) => m.RagScene),
  { ssr: false }
);
const ScoreScene = dynamic(
  () => import("@/components/sub/score-scene").then((m) => m.ScoreScene),
  { ssr: false }
);

/** Browser-style frame so screenshots read as a live product. */
const BrowserFrame = ({
  src,
  alt,
  url,
  priority,
}: {
  src: string;
  alt: string;
  url: string;
  priority?: boolean;
}) => (
  <div className="overflow-hidden rounded-2xl border border-[#7042f88b] bg-[#0f1115] shadow-[0_30px_80px_-20px_#7042f8aa]">
    <div className="flex items-center gap-2 border-b border-white/10 bg-[#16191f] px-4 py-2.5">
      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
      <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      <span className="ml-3 flex-1 truncate rounded-md bg-black/30 px-3 py-1 text-xs text-gray-400">
        {url}
      </span>
    </div>
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={1022}
      priority={priority}
      sizes="(min-width: 1024px) 60vw, 100vw"
      className="h-auto w-full select-none"
      draggable={false}
    />
  </div>
);

export const ProjectDetail = ({ slug }: { slug: string }) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const gallery = project?.gallery ?? [];
  const total = gallery.length;
  const isOpen = lightbox !== null;
  const close = () => setLightbox(null);
  const step = (dir: 1 | -1) =>
    setLightbox((i) => (i === null ? i : (i + dir + total) % total));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? i : (i + 1) % total));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? i : (i - 1 + total) % total));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, total]);

  if (!project) return null;
  const host = project.live
    ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "";

  return (
    <main className="relative w-full pt-28 pb-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-28 px-6 md:px-10">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section>
          <Link
            href="/#projects"
            className="mb-10 inline-flex items-center gap-2 text-gray-400 transition hover:text-white"
          >
            <FaArrowLeft /> Back to portfolio
          </Link>

          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-5"
            >
              <div className="Welcome-box w-fit border border-[#7042f88b] px-[7px] py-[8px] opacity-[0.9]">
                <SparklesIcon className="mr-[10px] h-5 w-5 text-[#b49bff]" />
                <span className="Welcome-text text-[13px]">{project.badge}</span>
              </div>
              <h1 className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-7xl">
                {project.title}
              </h1>
              <p className="text-xl text-gray-200">{project.tagline}</p>
              <p className="max-w-xl text-gray-400">{project.summary}</p>

              {project.live || project.github ? (
                <div className="mt-2 flex flex-wrap gap-4">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="button-primary inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-white"
                    >
                      Live demo <FaExternalLinkAlt className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-lg border border-[#7042f88b] px-6 py-2.5 text-gray-200 transition hover:bg-[#7042f81f]"
                    >
                      <FaGithub /> Source code
                    </a>
                  )}
                </div>
              ) : (
                project.linksNote && (
                  <p className="mt-2 flex max-w-xl items-start gap-3 rounded-xl border border-[#7042f855] bg-[#7042f812] px-4 py-3 text-sm text-gray-300">
                    <FaLock className="mt-0.5 shrink-0 text-[#b49bff]" aria-hidden />
                    {project.linksNote}
                  </p>
                )
              )}
            </motion.div>

            {/* Interactive 3D city */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative h-[340px] min-w-0 md:h-[440px]"
            >
              <div className="absolute inset-0 rounded-3xl border border-[#7042f855] bg-gradient-to-b from-[#7042f81f] to-transparent" />
              {project.scene === "score" ? (
                <ScoreScene />
              ) : project.scene === "rag" ? (
                <RagScene />
              ) : project.scene === "services" ? (
                <ServicesCanvas />
              ) : (
                <CityScene />
              )}
              <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs text-gray-400 backdrop-blur">
                Drag to rotate
              </span>
            </motion.div>
          </div>
        </section>

        {/* ── Hero screenshot / stats ─────────────────────────── */}
        {project.image && (
          <Reveal>
            <TiltCard max={7} className="mx-auto w-full max-w-5xl">
              <BrowserFrame
                src={project.image}
                alt={`${project.title} home page`}
                url={host}
                priority
              />
            </TiltCard>
          </Reveal>
        )}

        {project.stats && (
          <Reveal>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {project.stats.map(({ value, label }, i) => (
                <li
                  key={label}
                  className={i === project.stats!.length - 1 ? "col-span-2 md:col-span-1" : ""}
                >
                  <TiltCard max={14}>
                    <div className="rounded-2xl border border-[#7042f88b] bg-[#03001499] px-4 py-6 text-center shadow-[inset_0_0_20px_#a48fff1f] backdrop-blur-md">
                      <p
                        className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent"
                        style={{ transform: "translateZ(40px)" }}
                      >
                        {value}
                      </p>
                      <p
                        className="mt-1 text-sm text-gray-400"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        {label}
                      </p>
                    </div>
                  </TiltCard>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* ── Overview ────────────────────────────────────────── */}
        <section>
          <SectionTitle eyebrow="The idea" title="Overview" />
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-gray-300">
              {project.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 20)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Unique idea (3D) ────────────────────────────────── */}
        {project.showcase === "hybrid-scoring" && (
          <section>
            <SectionTitle
              eyebrow="The unique idea"
              title="Hybrid Effort Scoring"
            />
            <HybridScoring />
          </section>
        )}
        {project.showcase === "agentic-rag" && <AgenticRagShowcase />}
        {project.showcase === "microservices" && <MicroservicesShowcase />}

        {/* ── Key features ────────────────────────────────────── */}
        <section>
          <SectionTitle eyebrow="What it does" title="Key Features" />
          {project.features.every((f) => f.image) ? (
            <div className="flex flex-col gap-24">
              {project.features.map(
                ({ title, description, image, alt, icon: Icon, accent }, i) => (
                  <Reveal key={title}>
                    <div
                      className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 ${
                        i % 2 ? "md:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <span
                            className="flex h-12 w-12 items-center justify-center rounded-xl border"
                            style={{
                              color: accent,
                              borderColor: `${accent}66`,
                              background: `${accent}14`,
                              boxShadow: `0 0 24px ${accent}44`,
                            }}
                          >
                            <Icon className="h-6 w-6" aria-hidden />
                          </span>
                          <span className="font-mono text-sm text-gray-500">
                            0{i + 1}
                          </span>
                        </div>
                        <h3 className="text-3xl font-semibold text-white">
                          {title}
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-400">
                          {description}
                        </p>
                      </div>

                      <TiltCard max={9}>
                        <div style={{ transform: "translateZ(30px)" }}>
                          <BrowserFrame
                            src={image ?? project.image ?? ""}
                            alt={alt ?? title}
                            url={host}
                          />
                        </div>
                      </TiltCard>
                    </div>
                  </Reveal>
                )
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {project.features.map(
                ({ title, description, icon: Icon, accent }, i) => (
                  <Reveal key={title} delay={(i % 3) * 0.08}>
                    <TiltCard max={10} className="h-full">
                      <div
                        className="flex h-full flex-col gap-4 rounded-2xl border bg-[#03001499] p-7 backdrop-blur-md"
                        style={{
                          borderColor: `${accent}66`,
                          boxShadow: `inset 0 0 22px ${accent}14, 0 0 30px ${accent}1f`,
                        }}
                      >
                        <span
                          className="flex h-12 w-12 items-center justify-center rounded-xl border"
                          style={{
                            color: accent,
                            borderColor: `${accent}66`,
                            background: `${accent}14`,
                            transform: "translateZ(40px)",
                          }}
                        >
                          <Icon className="h-6 w-6" aria-hidden />
                        </span>
                        <h3
                          className="text-xl font-semibold text-white"
                          style={{ transform: "translateZ(24px)" }}
                        >
                          {title}
                        </h3>
                        <p className="leading-relaxed text-gray-400">
                          {description}
                        </p>
                      </div>
                    </TiltCard>
                  </Reveal>
                )
              )}
            </div>
          )}
        </section>

        {/* ── Principle ───────────────────────────────────────── */}
        <Reveal>
          <TiltCard max={5} className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl border border-[#7042f88b] bg-gradient-to-br from-[#7042f82e] to-[#03001499] p-10 text-center shadow-[0_0_60px_#7042f844] md:p-14">
              <FaLock
                className="mx-auto mb-5 h-8 w-8 text-[#b49bff]"
                style={{ transform: "translateZ(50px)" }}
                aria-hidden
              />
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-400">
                {project.principle.label}
              </p>
              <h3 className="text-2xl font-semibold text-white md:text-4xl">
                {project.principle.title}
              </h3>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-300">
                {project.principle.body}
              </p>
            </div>
          </TiltCard>
        </Reveal>

        {/* ── Tech stack ──────────────────────────────────────── */}
        <section>
          <SectionTitle eyebrow="Built with" title="Technology Stack" />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
            {project.stack.map(({ name, icon: Icon }, i) => (
              <Reveal key={name} delay={i * 0.05}>
                <TiltCard max={16}>
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#7042f88b] bg-[#03001499] p-6 shadow-[inset_0_0_18px_#a48fff1f] backdrop-blur-md">
                    <Icon
                      className="h-10 w-10 text-[#b49bff]"
                      style={{ transform: "translateZ(40px)" }}
                      aria-hidden
                    />
                    <span
                      className="text-center text-gray-200"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      {name}
                    </span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-14 text-center text-sm uppercase tracking-[0.25em] text-gray-500">
              {project.learnedLabel ?? "What building it taught me"}
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-3">
              {project.learned.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[#7042f88b] bg-[#7042f81a] px-4 py-2 text-gray-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ── Gallery ─────────────────────────────────────────── */}
        {gallery.length > 0 && (
        <section>
          <SectionTitle eyebrow="Screenshots" title="Gallery" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map(({ src, caption }, i) => (
              <Reveal key={src} delay={(i % 3) * 0.08}>
                <TiltCard max={12}>
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    className="group block w-full cursor-zoom-in text-left"
                    aria-label={`Enlarge: ${caption}`}
                  >
                    <div
                      className="overflow-hidden rounded-xl border border-[#7042f88b] bg-[#0f1115] shadow-[0_20px_50px_-20px_#7042f8aa]"
                      style={{ transform: "translateZ(24px)" }}
                    >
                      <Image
                        src={src}
                        alt={caption}
                        width={1920}
                        height={1022}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                        draggable={false}
                      />
                    </div>
                    <p className="mt-3 text-sm text-gray-400">{caption}</p>
                  </button>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>
        )}

        {/* ── Feedback CTA ────────────────────────────────────── */}
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-semibold text-white">
              {project.cta.title}
            </h2>
            <p className="text-gray-400">{project.cta.body}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="button-primary inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-white"
                >
                  Try the live demo <FaExternalLinkAlt className="h-3.5 w-3.5" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#7042f88b] px-6 py-2.5 text-gray-200 transition hover:bg-[#7042f81f]"
                >
                  <FaGithub /> View on GitHub
                </a>
              )}
              {!project.live && !project.github && (
                <Link
                  href="/#projects"
                  className="button-primary inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-white"
                >
                  <FaArrowLeft /> See my other projects
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && gallery[lightbox] && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot viewer"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/85 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, rotateX: 15 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.9 }}
              style={{ perspective: 1200 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] max-w-6xl overflow-hidden rounded-xl border border-[#7042f88b] shadow-[0_0_80px_#7042f888]"
            >
              <Image
                src={gallery[lightbox].src}
                alt={gallery[lightbox].caption}
                width={1920}
                height={1022}
                className="h-auto max-h-[80vh] w-auto object-contain"
              />
            </motion.div>
            <p className="text-gray-300" onClick={(e) => e.stopPropagation()}>
              {gallery[lightbox].caption}
              <span className="ml-3 text-sm text-gray-500">
                {lightbox + 1} / {gallery.length}
              </span>
            </p>
            <div
              className="flex gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                className="rounded-lg border border-[#7042f88b] px-4 py-2 text-gray-200 hover:bg-[#7042f81f]"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={close}
                className="rounded-lg border border-[#7042f88b] px-4 py-2 text-gray-200 hover:bg-[#7042f81f]"
              >
                Close (Esc)
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="rounded-lg border border-[#7042f88b] px-4 py-2 text-gray-200 hover:bg-[#7042f81f]"
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
