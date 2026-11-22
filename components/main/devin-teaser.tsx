import Link from "next/link";

import { TiltCard } from "@/components/sub/tilt-card";
import { TOOLS } from "@/constants/devin";

const PLANETS = [TOOLS.devin, TOOLS.claude, TOOLS.copilot];

export const DevinTeaser = () => {
  return (
    <section className="flex flex-col items-center px-6 py-10 md:px-10">
      <TiltCard max={6} className="w-full max-w-6xl">
        <Link
          href="/devin"
          className="group relative flex flex-col items-center gap-10 overflow-hidden rounded-3xl border border-[#7042f88b] bg-[radial-gradient(ellipse_at_20%_50%,#2a106688_0%,#03001499_65%)] p-8 shadow-[0_0_50px_#7042f833] backdrop-blur-md transition-shadow hover:shadow-[0_0_70px_#7042f866] md:flex-row md:p-12"
        >
          {/* orbiting trio */}
          <div
            aria-hidden
            className="relative h-[260px] w-[260px] shrink-0"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="absolute inset-4 rounded-full border border-[#7042f866]" />
            <div className="absolute inset-12 rounded-full border border-dashed border-[#7042f833]" />
            <div className="orbit-spin absolute inset-0">
              {PLANETS.map((p, i) => (
                <span
                  key={p.name}
                  className="absolute left-1/2 top-1/2 -ml-5 -mt-5 h-10 w-10 rounded-full"
                  style={{
                    transform: `rotate(${i * 120}deg) translateY(-112px)`,
                    background: `radial-gradient(circle at 30% 30%, #fff8, ${p.color} 55%)`,
                    boxShadow: `0 0 26px ${p.color}`,
                  }}
                />
              ))}
            </div>
            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#e0f2fe,#22d3ee_60%,#0e7490)] shadow-[0_0_50px_#22d3ee] transition-transform duration-500 group-hover:scale-125" />
          </div>

          <div className="flex flex-col gap-4 text-center md:text-left">
            <span className="mx-auto w-fit rounded-full border border-[#7042f88b] px-3 py-1 text-xs uppercase tracking-widest text-cyan-400 md:mx-0">
              Currently working with
            </span>
            <h3 className="text-3xl font-semibold text-white md:text-4xl">
              Devin{" "}
              <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                × Claude Code × Copilot
              </span>
            </h3>
            <p className="max-w-2xl text-gray-300">
              What makes Devin different, and what becomes possible when you
              combine it with Claude Code and GitHub Copilot — explained in 3D,
              straight from the official docs.
            </p>
            <ul className="flex flex-wrap justify-center gap-2 md:justify-start">
              {PLANETS.map((p) => (
                <li
                  key={p.name}
                  className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-gray-100"
                  style={{ borderColor: `${p.color}88`, background: `${p.color}14` }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                  {p.name}
                </li>
              ))}
            </ul>
            <span className="mt-1 inline-flex items-center justify-center gap-2 font-medium text-white md:justify-start">
              Explore the agent stack
              <span className="transition-transform group-hover:translate-x-1.5">→</span>
            </span>
          </div>
        </Link>
      </TiltCard>
    </section>
  );
};
