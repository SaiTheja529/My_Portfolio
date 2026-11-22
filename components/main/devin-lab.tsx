"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";

import { LayerExplorer } from "@/components/sub/agentic-rag";
import { AgentPrism, Relay } from "@/components/sub/agent-stack";
import { Reveal, SectionTitle } from "@/components/sub/section";
import { TiltCard } from "@/components/sub/tilt-card";
import {
  COMBINED,
  DEVIN_LAYERS,
  DIFFERENT,
  DOCS,
  DOCS_READ_DATE,
  DOC_LINKS,
  TOOLS,
} from "@/constants/devin";

const TrinityCanvas = dynamic(
  () => import("@/components/sub/trinity-scene").then((m) => m.TrinityCanvas),
  { ssr: false }
);

const Card = ({
  title,
  text,
  icon: Icon,
  color,
  href,
}: {
  title: string;
  text: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  href: string;
}) => (
  <TiltCard max={11} className="h-full">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-3 rounded-2xl border bg-[#03001499] p-6 backdrop-blur-md transition-shadow hover:shadow-[0_0_44px_var(--glow)]"
      style={
        {
          borderColor: `${color}77`,
          boxShadow: `inset 0 0 22px ${color}12`,
          "--glow": `${color}55`,
        } as React.CSSProperties
      }
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl border"
        style={{
          color,
          borderColor: `${color}66`,
          background: `${color}14`,
          transform: "translateZ(40px)",
        }}
      >
        <Icon className="h-6 w-6" />
      </span>
      <h3
        className="text-lg font-semibold text-white"
        style={{ transform: "translateZ(24px)" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-400">{text}</p>
      <span
        className="mt-auto flex items-center gap-1.5 pt-2 text-xs font-medium"
        style={{ color }}
      >
        From the docs <FaExternalLinkAlt className="h-2.5 w-2.5" />
      </span>
    </a>
  </TiltCard>
);

export const DevinLab = () => {
  const [merged, setMerged] = useState(false);

  return (
    <main className="relative w-full pb-24 pt-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-28 px-6 md:px-10">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section>
          <Link
            href="/"
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
              <div className="Welcome-box w-fit border border-[#7042f88b] px-[7px] py-[8px] opacity-[0.9] max-md:!w-auto">
                <SparklesIcon className="mr-[10px] h-5 w-5 shrink-0 text-[#b49bff]" />
                <span className="Welcome-text text-[13px]">
                  What I&apos;m working with right now
                </span>
              </div>
              <h1 className="text-5xl font-bold leading-tight md:text-7xl">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${TOOLS.devin.color}, #22d3ee)`,
                  }}
                >
                  Devin
                </span>
                <span className="block text-2xl font-medium text-gray-300 md:text-3xl">
                  and the agent stack around it
                </span>
              </h1>
              <p className="max-w-xl text-lg text-gray-400">
                What makes Devin different from tools like Claude Code and
                GitHub Copilot — and what becomes possible when you combine
                all three. Everything below is summarised from the official
                docs, with a link on every claim.
              </p>
              <div className="mt-1 flex flex-wrap gap-4">
                <a
                  href={DOCS.devin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-white"
                >
                  Official Devin docs <FaExternalLinkAlt className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#together"
                  className="rounded-lg border border-[#7042f88b] px-6 py-2.5 text-gray-200 transition hover:bg-[#7042f81f]"
                >
                  Jump to “better together”
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex min-w-0 flex-col gap-4"
            >
              <div className="relative h-[340px] overflow-hidden rounded-3xl border border-[#7042f855] bg-gradient-to-b from-[#7042f81f] to-transparent md:h-[440px]">
                <TrinityCanvas merged={merged} />
              </div>
              <button
                onClick={() => setMerged((m) => !m)}
                aria-pressed={merged}
                className="mx-auto rounded-full border px-7 py-2.5 font-medium text-white transition-all"
                style={{
                  borderColor: merged ? "#22d3eeaa" : "#7042f8aa",
                  background: merged ? "#22d3ee26" : "#7042f826",
                  boxShadow: merged ? "0 0 34px #22d3ee55" : "0 0 24px #7042f855",
                }}
              >
                {merged ? "↺ Separate them" : "✦ Combine them"}
              </button>
            </motion.div>
          </div>
        </section>

        {/* ── What makes Devin different ──────────────────── */}
        <section>
          <SectionTitle eyebrow="From the official docs" title="What Makes Devin Different" />
          <p className="mx-auto -mt-6 mb-10 max-w-3xl text-center text-gray-400">
            Devin describes itself as “an autonomous AI software engineer that
            can write, run and test code.” The difference is where it lives and
            how you work with it.
          </p>
          <LayerExplorer
            layers={DEVIN_LAYERS}
            initial="workspace"
            hint="Hover or tap a layer of Devin's setup to pull it out"
          />

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DIFFERENT.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 0.08}>
                <Card {...d} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <TiltCard max={5} className="mx-auto mt-16 max-w-3xl">
              <div className="rounded-3xl border border-[#8b5cf6aa] bg-gradient-to-br from-[#8b5cf62e] to-[#03001499] p-8 text-center shadow-[0_0_60px_#8b5cf644] md:p-10">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                  Scope it well
                </p>
                <p
                  className="mt-3 text-2xl font-semibold text-white md:text-3xl"
                  style={{ transform: "translateZ(30px)" }}
                >
                  “If you can do it in three hours, Devin can most likely do it.”
                </p>
                <p className="mt-4 text-gray-300">
                  Devin&apos;s own guidance: give it tasks with clear success
                  criteria and verifiable outcomes — test suites, CI checks —
                  and break large work into focused sessions.{" "}
                  <a
                    href="https://docs.devin.ai/essential-guidelines/when-to-use-devin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 underline underline-offset-4"
                  >
                    When to use Devin ↗
                  </a>
                </p>
              </div>
            </TiltCard>
          </Reveal>
        </section>

        {/* ── Prism ───────────────────────────────────────── */}
        <section>
          <SectionTitle eyebrow="Three agents, three homes" title="Where Each One Lives" />
          <AgentPrism />
        </section>

        {/* ── Better together ─────────────────────────────── */}
        <section id="together" className="scroll-mt-24">
          <SectionTitle eyebrow="My take, built on documented features" title="Better Together" />
          <p className="mx-auto -mt-6 mb-12 max-w-3xl text-center text-gray-400">
            This is Harness Engineering across vendors: share the context, share
            the tools, then hand work to whichever agent is best placed for it.
            The workflow below is my suggestion — each step uses a capability
            the tools&apos; own docs describe.
          </p>
          <Relay />

          <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COMBINED.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.08}>
                <Card {...c} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Official docs ───────────────────────────────── */}
        <section>
          <SectionTitle eyebrow="Go to the source" title="Official Documentation" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {DOC_LINKS.map(({ tool, home, tagline, links }, i) => {
              const t = TOOLS[tool];
              return (
                <Reveal key={tool} delay={i * 0.1}>
                  <TiltCard max={8} className="h-full">
                    <div
                      className="flex h-full flex-col gap-5 rounded-3xl border bg-[#03001499] p-7 backdrop-blur-md"
                      style={{
                        borderColor: `${t.color}88`,
                        boxShadow: `0 0 44px ${t.color}26, inset 0 0 24px ${t.color}10`,
                      }}
                    >
                      <div style={{ transform: "translateZ(36px)" }}>
                        <a
                          href={home}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-2xl font-semibold text-white"
                        >
                          {t.name}
                          <FaExternalLinkAlt
                            className="h-3.5 w-3.5 opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                            style={{ color: t.color }}
                          />
                        </a>
                        <p className="text-sm text-gray-500">{tagline}</p>
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {links.map((l) => (
                          <li key={l.href}>
                            <a
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block rounded-md border px-2.5 py-1 text-xs text-gray-200 transition hover:bg-white/10"
                              style={{ borderColor: `${t.color}66` }}
                            >
                              {l.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-gray-500">
            Summarised from each tool&apos;s official documentation (read{" "}
            {DOCS_READ_DATE}). These products change quickly and Devin&apos;s
            own docs note they may be out of date in places — treat the linked
            pages as the source of truth. This is an independent, personal
            write-up, not affiliated with Cognition, Anthropic or GitHub.
          </p>
        </section>
      </div>
    </main>
  );
};
