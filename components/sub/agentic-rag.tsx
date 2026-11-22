"use client";

import { useState, type ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  FaChair,
  FaClipboardCheck,
  FaClipboardList,
  FaExclamationTriangle,
  FaFilter,
  FaKey,
  FaLock,
  FaPlane,
  FaSearch,
  FaTicketAlt,
  FaUserLock,
  FaUserSecret,
  FaUsers,
} from "react-icons/fa";

import { Reveal, SectionTitle } from "@/components/sub/section";
import { TiltCard } from "@/components/sub/tilt-card";
import { ARCH_LAYERS, type Layer } from "@/constants";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────
 *  3D layered architecture stack (CSS 3D, no WebGL)
 * ────────────────────────────────────────────────────────────── */

export const LayerStack = ({
  activeId,
  compact = false,
  layers = ARCH_LAYERS,
}: {
  activeId?: string | null;
  compact?: boolean;
  layers?: ReadonlyArray<Layer>;
}) => {
  const n = layers.length;
  const gap = compact ? 38 : 60;
  const w = compact ? 250 : 270;
  const h = compact ? 156 : 172;

  return (
    <div
      aria-hidden
      className={cn(
        "relative w-full",
        compact ? "h-[330px]" : "h-[300px] sm:h-[440px]"
      )}
      style={{ perspective: compact ? 900 : 1400 }}
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(58deg) rotateZ(-38deg) ${
            compact ? "" : "scale(var(--stack-scale, 1))"
          }`,
        }}
      >
        {layers.map((layer, i) => {
          const active = activeId === layer.id;
          const z = (n - 1 - i - (n - 1) / 2) * gap;
          return (
            <div
              key={layer.id}
              className="absolute rounded-2xl border backdrop-blur-sm transition-all duration-500"
              style={{
                width: w,
                height: h,
                left: -w / 2,
                top: -h / 2,
                transform: `translate3d(${active ? (compact ? 0 : 70) : 0}px, 0, ${z}px)`,
                borderColor: `${layer.color}${active || compact ? "dd" : "88"}`,
                background: `linear-gradient(135deg, ${layer.color}${
                  active ? "55" : "26"
                }, ${layer.color}10)`,
                boxShadow: active
                  ? `0 0 46px ${layer.color}99`
                  : `0 0 20px ${layer.color}33`,
              }}
            >
              <div className="grid h-full grid-cols-7 content-center justify-items-center gap-y-3 p-4">
                {Array.from({ length: 21 }).map((_, d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: layer.color,
                      opacity: active ? 0.95 : 0.35 + ((d * 7) % 5) * 0.1,
                    }}
                  />
                ))}
              </div>
              <span
                className="absolute left-3 top-2 font-mono text-[10px] tracking-widest"
                style={{ color: layer.color }}
              >
                0{i + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const LayerExplorer = ({
  layers,
  initial,
  hint = "Hover or tap a layer to pull it out of the stack",
}: {
  layers: ReadonlyArray<Layer>;
  initial: string;
  hint?: string;
}) => {
  const [active, setActive] = useState<string>(initial);
  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
      <div className="min-w-0 [--stack-scale:0.7] sm:[--stack-scale:1]">
        <LayerStack activeId={active} layers={layers} />
        <p className="mt-2 text-center text-xs text-gray-500">{hint}</p>
      </div>

      <ol className="flex flex-col gap-3">
        {layers.map((layer, i) => {
          const isActive = active === layer.id;
          return (
            <li key={layer.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(layer.id)}
                onFocus={() => setActive(layer.id)}
                onClick={() => setActive(layer.id)}
                aria-pressed={isActive}
                className="w-full rounded-2xl border bg-[#03001499] p-4 text-left backdrop-blur-md transition-all duration-300"
                style={{
                  borderColor: `${layer.color}${isActive ? "ee" : "44"}`,
                  boxShadow: isActive ? `0 0 34px ${layer.color}44` : "none",
                  transform: isActive ? "translateX(6px)" : "none",
                }}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-mono text-xs"
                    style={{ color: layer.color }}
                  >
                    0{i + 1}
                  </span>
                  <span className="text-lg font-semibold text-white">
                    {layer.title}
                  </span>
                  <span className="text-sm text-gray-500">
                    {layer.subtitle}
                  </span>
                </div>
                {isActive && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border px-2.5 py-1 text-xs text-gray-100"
                        style={{
                          borderColor: `${layer.color}66`,
                          background: `${layer.color}18`,
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {isActive && layer.href && (
                  <a
                    href={layer.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 inline-block text-xs underline underline-offset-4"
                    style={{ color: layer.color }}
                  >
                    Official docs ↗
                  </a>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────
 *  Five agentic patterns
 * ────────────────────────────────────────────────────────────── */

const PATTERNS = [
  { name: "Chain", color: "#b49bff", text: "Break a task into sequential steps, each one feeding the next." },
  { name: "Routing", color: "#38bdf8", text: "Classify the request and send it down the right specialist path." },
  { name: "Parallelization", color: "#2dd4bf", text: "Run independent sub-tasks at the same time, then combine the results." },
  { name: "Orchestrator-Worker", color: "#facc15", text: "An orchestrator plans the work and delegates sub-tasks to worker agents." },
  { name: "Evaluator-Optimizer", color: "#f472b6", text: "One step critiques the draft and the answer is refined until it holds up." },
];

const Patterns = () => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
    {PATTERNS.map(({ name, color, text }, i) => (
      <Reveal
        key={name}
        delay={i * 0.07}
        className={cn(
          "lg:col-span-2",
          // centre the last two cards on desktop
          i === 3 && "lg:col-start-2",
          i === 4 && "lg:col-start-4"
        )}
      >
        <TiltCard max={12} className="h-full">
          <div
            className="flex h-full flex-col gap-3 rounded-2xl border bg-[#03001499] p-6 backdrop-blur-md"
            style={{
              borderColor: `${color}77`,
              boxShadow: `inset 0 0 22px ${color}14, 0 0 30px ${color}22`,
            }}
          >
            <span
              className="font-mono text-sm"
              style={{ color, transform: "translateZ(30px)" }}
            >
              0{i + 1}
            </span>
            <h3
              className="text-xl font-semibold text-white"
              style={{ transform: "translateZ(40px)" }}
            >
              {name}
            </h3>
            <p
              className="text-sm leading-relaxed text-gray-400"
              style={{ transform: "translateZ(20px)" }}
            >
              {text}
            </p>
          </div>
        </TiltCard>
      </Reveal>
    ))}
  </div>
);

/* ──────────────────────────────────────────────────────────────
 *  "Grounded answers only" decision flow
 * ────────────────────────────────────────────────────────────── */

export const FlowStep = ({
  icon: Icon,
  title,
  detail,
  color,
}: {
  icon: IconType;
  title: string;
  detail: string;
  color: string;
}) => (
  <TiltCard max={10} className="h-full flex-1">
    <div
      className="flex h-full flex-col gap-2 rounded-2xl border bg-[#03001499] p-5 backdrop-blur-md"
      style={{ borderColor: `${color}77`, boxShadow: `0 0 28px ${color}22` }}
    >
      <Icon
        className="h-6 w-6"
        style={{ color, transform: "translateZ(36px)" }}
        aria-hidden
      />
      <h4 className="font-semibold text-white" style={{ transform: "translateZ(22px)" }}>
        {title}
      </h4>
      <p className="text-sm text-gray-400">{detail}</p>
    </div>
  </TiltCard>
);

export const Arrow = () => (
  <span
    className="flex items-center justify-center text-2xl text-[#b49bff]"
    aria-hidden
  >
    <span className="rotate-90 md:rotate-0">→</span>
  </span>
);

const Outcome = ({
  tag,
  icon: Icon,
  title,
  detail,
  color,
}: {
  tag: string;
  icon: IconType;
  title: string;
  detail: ReactNode;
  color: string;
}) => (
  <TiltCard max={8} className="h-full">
    <div
      className="relative h-full rounded-2xl border p-6 backdrop-blur-md"
      style={{
        borderColor: `${color}99`,
        background: `linear-gradient(135deg, ${color}1f, #03001499)`,
        boxShadow: `0 0 40px ${color}2e`,
      }}
    >
      <span
        className="absolute -top-3 left-5 rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-black"
        style={{ background: color, transform: "translateZ(40px)" }}
      >
        {tag}
      </span>
      <Icon
        className="h-7 w-7"
        style={{ color, transform: "translateZ(40px)" }}
        aria-hidden
      />
      <h4 className="mt-3 text-xl font-semibold text-white">{title}</h4>
      <p className="mt-2 text-gray-300">{detail}</p>
    </div>
  </TiltCard>
);

const GroundedFlow = () => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-col items-stretch gap-3 md:flex-row">
      <FlowStep
        icon={FaUsers}
        title="Question"
        detail="From a passenger, staff member or admin"
        color="#38bdf8"
      />
      <Arrow />
      <FlowStep
        icon={FaUserSecret}
        title="PII redaction"
        detail="Applied before anything reaches the LLM"
        color="#f472b6"
      />
      <Arrow />
      <FlowStep
        icon={FaFilter}
        title="Audience-filtered retrieval"
        detail="MariaDB vector search · cosine similarity ≥ 0.5"
        color="#2dd4bf"
      />
      <Arrow />
      <FlowStep
        icon={FaSearch}
        title="Grounded context found?"
        detail="The decision that defines the system"
        color="#b49bff"
      />
    </div>

    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Outcome
        tag="Yes"
        icon={FaClipboardCheck}
        color="#2dd4bf"
        title="Answer with a citation"
        detail="Every answer names its source — document, section, page, or tool timestamp."
      />
      <Outcome
        tag="No"
        icon={FaExclamationTriangle}
        color="#facc15"
        title="Refuse and escalate"
        detail="A strict refusal-and-escalation contract: no guessing, the case goes to a human."
      />
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────
 *  Four-layer RBAC
 * ────────────────────────────────────────────────────────────── */

const GATES = [
  { title: "Endpoint", text: "Each API endpoint admits only the roles allowed to call it.", color: "#38bdf8" },
  { title: "Agent", text: "Each role reaches only the agents it is permitted to use.", color: "#b49bff" },
  { title: "Vector retrieval", text: "An audience filter limits which documents retrieval can return.", color: "#2dd4bf" },
  { title: "Tool allow-list", text: "Agents may call only the tools allowed for that role.", color: "#facc15" },
];

const Security = () => (
  <div className="flex flex-col gap-10">
    <TiltCard max={6}>
      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        style={{ transformStyle: "preserve-3d" }}
      >
        {GATES.map(({ title, text, color }, i) => (
          <div
            key={title}
            className="rounded-2xl border bg-[#03001499] p-6 backdrop-blur-md"
            style={{
              borderColor: `${color}88`,
              boxShadow: `0 0 30px ${color}26, inset 0 0 20px ${color}12`,
              transform: `translateZ(${24 + i * 14}px)`,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl border"
                style={{ color, borderColor: `${color}77`, background: `${color}14` }}
              >
                <FaLock aria-hidden />
              </span>
              <span className="font-mono text-sm" style={{ color }}>
                Layer {i + 1}
              </span>
            </div>
            <h4 className="mt-4 text-lg font-semibold text-white">{title}</h4>
            <p className="mt-2 text-sm text-gray-400">{text}</p>
          </div>
        ))}
      </div>
    </TiltCard>

    <div className="flex flex-col items-center gap-4">
      <ul className="flex flex-wrap justify-center gap-3">
        {["Passenger", "Airline Staff", "Admin"].map((role) => (
          <li
            key={role}
            className="flex items-center gap-2 rounded-full border border-[#7042f88b] bg-[#7042f81a] px-4 py-2 text-gray-100"
          >
            <FaUserLock className="text-[#b49bff]" aria-hidden /> {role}
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap justify-center gap-3 text-sm text-gray-300">
        {[
          "JWT (HS256)",
          "BCrypt",
          "Pre-LLM PII redaction",
          "Append-only audit trail",
        ].map((chip) => (
          <li
            key={chip}
            className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5"
          >
            {chip}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────
 *  Live operational tools
 * ────────────────────────────────────────────────────────────── */

const TOOLS: Array<{ name: string; icon: IconType; color: string }> = [
  { name: "Flight search", icon: FaPlane, color: "#38bdf8" },
  { name: "PNR lookup", icon: FaTicketAlt, color: "#b49bff" },
  { name: "Booking creation", icon: FaClipboardList, color: "#2dd4bf" },
  { name: "Seat selection", icon: FaChair, color: "#facc15" },
  { name: "Check-in & flight status", icon: FaClipboardCheck, color: "#f472b6" },
  { name: "Case escalation", icon: FaExclamationTriangle, color: "#fb923c" },
];

const Tools = () => (
  <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
    {TOOLS.map(({ name, icon: Icon, color }, i) => (
      <Reveal key={name} delay={(i % 3) * 0.07}>
        <TiltCard max={14}>
          <div
            className="flex flex-col items-center gap-3 rounded-2xl border bg-[#03001499] p-6 text-center backdrop-blur-md"
            style={{ borderColor: `${color}77`, boxShadow: `0 0 26px ${color}22` }}
          >
            <Icon
              className="h-9 w-9"
              style={{ color, transform: "translateZ(44px)" }}
              aria-hidden
            />
            <span
              className="text-gray-100"
              style={{ transform: "translateZ(24px)" }}
            >
              {name}
            </span>
          </div>
        </TiltCard>
      </Reveal>
    ))}
    <p className="col-span-2 flex items-center justify-center gap-2 text-center text-sm text-gray-500 md:col-span-3">
      <FaKey aria-hidden /> Every tool is restricted by role — enforced by the
      tool allow-list.
    </p>
  </div>
);

/* ──────────────────────────────────────────────────────────────
 *  Composite showcase
 * ────────────────────────────────────────────────────────────── */

export const AgenticRagShowcase = () => (
  <>
    <section>
      <SectionTitle eyebrow="Under the hood" title="Layered Architecture" />
      <LayerExplorer layers={ARCH_LAYERS} initial="patterns" />
    </section>

    <section>
      <SectionTitle eyebrow="Agentic RAG" title="Five Agentic Patterns" />
      <Patterns />
    </section>

    <section>
      <SectionTitle eyebrow="Zero hallucination" title="How a Grounded Answer Is Built" />
      <GroundedFlow />
    </section>

    <section>
      <SectionTitle eyebrow="Security & governance" title="Four-Layer RBAC" />
      <Security />
    </section>

    <section>
      <SectionTitle eyebrow="Role-restricted" title="Live Operational Tools" />
      <Tools />
    </section>
  </>
);
