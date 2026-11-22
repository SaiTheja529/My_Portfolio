"use client";

import { useEffect, useState } from "react";

import { PRISM, RELAY, TOOLS, type ToolId } from "@/constants/devin";

/* ───────────────────────────────────────────────────────────────
 *  4-sided 3D prism: Devin · Claude Code · Copilot · Together
 * ─────────────────────────────────────────────────────────────── */

export const AgentPrism = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % PRISM.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  const go = (i: number) => setIndex((i + PRISM.length) % PRISM.length);
  const active = PRISM[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="flex flex-col items-center gap-8"
    >
      {/* tabs */}
      <div role="tablist" aria-label="Choose an agent" className="flex flex-wrap justify-center gap-3">
        {PRISM.map((face, i) => {
          const on = i === index;
          return (
            <button
              key={face.id}
              role="tab"
              aria-selected={on}
              onClick={() => setIndex(i)}
              className="rounded-full border px-5 py-2 text-sm font-medium transition-all"
              style={{
                borderColor: `${face.color}${on ? "ff" : "66"}`,
                background: on ? `${face.color}33` : "transparent",
                color: on ? "#fff" : "#9ca3af",
                boxShadow: on ? `0 0 26px ${face.color}66` : "none",
              }}
            >
              {face.name}
            </button>
          );
        })}
      </div>

      {/* prism */}
      <div
        className="relative [--h:640px] [--w:300px] sm:[--h:430px] sm:[--w:640px]"
        style={{ perspective: 1800, width: "var(--w)", height: "var(--h)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(calc(var(--w) / -2)) rotateY(${-index * 90}deg)`,
            transition: "transform 0.95s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {PRISM.map((face, i) => (
            <div
              key={face.id}
              aria-hidden={i !== index}
              className="absolute inset-0 flex flex-col gap-4 overflow-hidden rounded-3xl border p-6 backdrop-blur-md sm:p-9"
              style={{
                transform: `rotateY(${i * 90}deg) translateZ(calc(var(--w) / 2))`,
                backfaceVisibility: "hidden",
                borderColor: `${face.color}aa`,
                background: `linear-gradient(145deg, ${face.color}26, rgba(3,0,20,0.88) 60%)`,
                boxShadow: `0 0 60px ${face.color}44, inset 0 0 40px ${face.color}14`,
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ background: face.color, boxShadow: `0 0 16px ${face.color}` }}
                />
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">{face.name}</h3>
              </div>

              <dl className="flex flex-col gap-3.5 text-sm sm:text-[15px]">
                {[
                  ["Lives in", face.lives],
                  ["You work with it by", face.how],
                  ["Shines at", face.best],
                ].map(([label, text]) => (
                  <div key={label}>
                    <dt
                      className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: face.color }}
                    >
                      {label}
                    </dt>
                    <dd className="mt-1 leading-relaxed text-gray-200">{text}</dd>
                  </div>
                ))}
              </dl>

              {face.href.startsWith("http") && (
                <a
                  href={face.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={i === index ? 0 : -1}
                  className="mt-auto w-fit text-sm font-medium underline underline-offset-4"
                  style={{ color: face.color }}
                >
                  Official docs ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <button
          onClick={() => go(index - 1)}
          aria-label="Previous"
          className="rounded-full border border-white/15 px-4 py-1.5 text-gray-300 hover:bg-white/5"
        >
          ←
        </button>
        <span aria-live="polite">
          {index + 1} / {PRISM.length} · {active.name}
        </span>
        <button
          onClick={() => go(index + 1)}
          aria-label="Next"
          className="rounded-full border border-white/15 px-4 py-1.5 text-gray-300 hover:bg-white/5"
        >
          →
        </button>
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────────────────────────
 *  Coverflow "relay": the combined workflow, step by step
 * ─────────────────────────────────────────────────────────────── */

const toolColor = (t: ToolId) => TOOLS[t].color;

export const Relay = () => {
  const [a, setA] = useState(0);
  const n = RELAY.length;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setA((v) => Math.min(n - 1, v + 1));
    if (e.key === "ArrowLeft") setA((v) => Math.max(0, v - 1));
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 overflow-x-clip" onKeyDown={onKey}>
      <div
        className="relative w-full [--o:92px] sm:[--o:250px]"
        style={{ perspective: 1400, height: 400 }}
      >
        {RELAY.map((step, k) => {
          const d = k - a;
          const abs = Math.abs(d);
          const focus = d === 0;
          return (
            <div
              key={step.title}
              onClick={() => setA(k)}
              className="absolute left-1/2 top-0 w-[260px] cursor-pointer sm:w-[320px]"
              style={{
                transform: `translateX(calc(-50% + var(--o) * ${d})) translateZ(${-abs * 150}px) rotateY(${Math.max(-60, Math.min(60, -d * 38))}deg) scale(${focus ? 1 : 0.92})`,
                opacity: abs > 2 ? 0 : 1 - abs * 0.28,
                zIndex: 10 - abs,
                transition: "all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)",
                pointerEvents: abs > 2 ? "none" : "auto",
              }}
            >
              <div
                className="flex h-[380px] flex-col gap-3 rounded-3xl border bg-[#0a0620ee] p-6 backdrop-blur-md"
                style={{
                  borderColor: focus ? "#22d3eeaa" : "#7042f866",
                  boxShadow: focus ? "0 0 50px #22d3ee44" : "0 0 24px #7042f822",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-4xl font-bold text-white/20">
                    0{k + 1}
                  </span>
                  <span className="flex gap-1.5" aria-label={`Tools: ${step.tools.map((t) => TOOLS[t].name).join(", ")}`}>
                    {step.tools.map((t) => (
                      <span
                        key={t}
                        title={TOOLS[t].name}
                        className="h-3.5 w-3.5 rounded-full"
                        style={{ background: toolColor(t), boxShadow: `0 0 12px ${toolColor(t)}` }}
                      />
                    ))}
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-white">{step.title}</h4>
                <p className="text-sm leading-relaxed text-gray-300">{step.text}</p>
                <a
                  href={step.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={focus ? 0 : -1}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-auto w-fit text-xs font-medium text-cyan-300 underline underline-offset-4"
                >
                  {step.doc} ↗
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setA((v) => Math.max(0, v - 1))}
          disabled={a === 0}
          aria-label="Previous step"
          className="rounded-full border border-white/15 px-4 py-1.5 text-gray-300 hover:bg-white/5 disabled:opacity-30"
        >
          ←
        </button>
        <ul className="flex gap-2" aria-label="Steps">
          {RELAY.map((s, k) => (
            <li key={s.title}>
              <button
                onClick={() => setA(k)}
                aria-label={`Step ${k + 1}: ${s.title}`}
                aria-current={k === a}
                className="h-2.5 rounded-full transition-all"
                style={{
                  width: k === a ? 28 : 10,
                  background: k === a ? "#22d3ee" : "#ffffff33",
                }}
              />
            </li>
          ))}
        </ul>
        <button
          onClick={() => setA((v) => Math.min(n - 1, v + 1))}
          disabled={a === n - 1}
          aria-label="Next step"
          className="rounded-full border border-white/15 px-4 py-1.5 text-gray-300 hover:bg-white/5 disabled:opacity-30"
        >
          →
        </button>
      </div>

      <ul className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
        {(Object.keys(TOOLS) as Array<keyof typeof TOOLS>)
          .filter((k) => k !== "together")
          .map((k) => (
            <li key={k} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: TOOLS[k].color }} />
              {TOOLS[k].name}
            </li>
          ))}
      </ul>
    </div>
  );
};
