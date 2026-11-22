"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { FaBalanceScale, FaBrain, FaChartBar, FaCodeBranch } from "react-icons/fa";

import { TiltCard } from "@/components/sub/tilt-card";

const SIGNALS = [
  "Change size",
  "File breadth",
  "Structural impact",
  "Test & docs updates",
];
const AI_EVAL = [
  "Feature impact",
  "Code quality",
  "Maintainability",
  "Risk handling",
];
const OUTPUTS = ["Score", "Confidence indicator", "Reasoning"];

const Chip = ({ children, color }: { children: ReactNode; color: string }) => (
  <li
    className="rounded-lg border px-3 py-1.5 text-sm text-gray-100"
    style={{
      borderColor: `${color}77`,
      background: `${color}18`,
      boxShadow: `0 0 14px ${color}33`,
      transform: "translateZ(34px)",
    }}
  >
    {children}
  </li>
);

const Panel = ({
  icon: Icon,
  eyebrow,
  title,
  color,
  items,
  depth,
  delay,
}: {
  icon: typeof FaBrain;
  eyebrow: string;
  title: string;
  color: string;
  items: ReadonlyArray<string>;
  depth: number;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: 20 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, delay }}
    style={{ perspective: 1200 }}
  >
    <TiltCard max={9}>
      <div
        className="rounded-3xl border bg-[#03001499] p-6 backdrop-blur-md"
        style={{
          borderColor: `${color}88`,
          boxShadow: `0 0 50px ${color}2e, inset 0 0 24px ${color}14`,
          transform: `translateZ(${depth}px)`,
        }}
      >
        <div
          className="flex items-center gap-3"
          style={{ transform: "translateZ(48px)" }}
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl border"
            style={{ color, borderColor: `${color}77`, background: `${color}14` }}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color }}>
              {eyebrow}
            </p>
            <h4 className="text-lg font-semibold text-white">{title}</h4>
          </div>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {items.map((item) => (
            <Chip key={item} color={color}>
              {item}
            </Chip>
          ))}
        </ul>
      </div>
    </TiltCard>
  </motion.div>
);

/**
 * The unique idea of Effort Analyzer, as a 3D diagram:
 * measurable signals + AI judgment -> one explainable score.
 */
export const HybridScoring = () => {
  return (
    <div className="flex flex-col gap-14">
      {/* Why not commits / LOC */}
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
        <TiltCard max={6}>
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 opacity-80">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Traditional metrics
            </p>
            <h4 className="mt-1 text-xl font-semibold text-gray-300">
              Output volume
            </h4>
            <p className="mt-2 text-gray-500">
              Commit counts and lines of code — easy to measure, but blind to
              how hard the work actually was.
            </p>
          </div>
        </TiltCard>
        <div
          className="flex items-center justify-center text-3xl text-[#b49bff] md:rotate-0"
          aria-hidden
        >
          <span className="rotate-90 md:rotate-0">→</span>
        </div>
        <TiltCard max={6}>
          <div className="h-full rounded-2xl border border-cyan-400/50 bg-cyan-400/[0.06] p-6 shadow-[0_0_40px_#22d3ee33]">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
              Effort Analyzer
            </p>
            <h4 className="mt-1 text-xl font-semibold text-white">
              Context-aware effort
            </h4>
            <p className="mt-2 text-gray-300">
              Architectural thinking, debugging, risk mitigation and
              maintainability — the work raw code size can&apos;t show.
            </p>
          </div>
        </TiltCard>
      </div>

      {/* Hybrid model diagram */}
      <div className="relative">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Panel
            icon={FaCodeBranch}
            eyebrow="Deterministic"
            title="Signals from the code"
            color="#2dd4bf"
            items={SIGNALS}
            depth={20}
            delay={0}
          />
          <Panel
            icon={FaBrain}
            eyebrow="AI-assisted"
            title="Evaluation of the change"
            color="#b49bff"
            items={AI_EVAL}
            depth={20}
            delay={0.15}
          />
        </div>

        {/* Animated beams into the score (desktop) */}
        <svg
          aria-hidden
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-0 top-full hidden h-24 w-full md:block"
        >
          <path
            d="M25 0 C25 30, 50 25, 50 60"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="6 6"
            className="beam"
          />
          <path
            d="M75 0 C75 30, 50 25, 50 60"
            fill="none"
            stroke="#b49bff"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="6 6"
            className="beam"
          />
        </svg>
      </div>

      <div className="mx-auto w-full max-w-xl md:mt-10">
        <Panel
          icon={FaBalanceScale}
          eyebrow="The result"
          title="An explainable effort score"
          color="#22d3ee"
          items={OUTPUTS}
          depth={50}
          delay={0.3}
        />
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-gray-500">
          <FaChartBar aria-hidden /> Transparent by design — you see why, not
          just a number.
        </p>
      </div>

      {/* Provider fallback */}
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
          AI analysis with a fallback
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="rounded-full border border-[#7042f88b] bg-[#7042f81a] px-4 py-2 text-gray-200">
            Analysis request
          </span>
          <span className="text-[#b49bff]" aria-hidden>→</span>
          <span className="rounded-full border border-cyan-400/60 bg-cyan-400/10 px-4 py-2 text-cyan-200">
            Gemini
          </span>
          <span className="text-gray-500" aria-hidden>
            ⤷ if unavailable
          </span>
          <span className="rounded-full border border-amber-300/60 bg-amber-300/10 px-4 py-2 text-amber-200">
            Grok
          </span>
          <span className="text-[#b49bff]" aria-hidden>→</span>
          <span className="rounded-full border border-[#7042f88b] bg-[#7042f81a] px-4 py-2 text-gray-200">
            Score + reasoning
          </span>
        </div>
      </div>
    </div>
  );
};
