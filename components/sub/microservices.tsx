"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  FaArchive,
  FaCheckDouble,
  FaCode,
  FaConciergeBell,
  FaDatabase,
  FaLink,
  FaNetworkWired,
  FaRoute,
  FaShieldAlt,
  FaUserMd,
  FaUserNurse,
  FaUserShield,
} from "react-icons/fa";

import { Arrow, FlowStep } from "@/components/sub/agentic-rag";
import { Reveal, SectionTitle } from "@/components/sub/section";
import { TiltCard } from "@/components/sub/tilt-card";
import { SHIFT_NODES } from "@/constants";

const ServicesCanvas = dynamic(
  () => import("@/components/sub/services-scene").then((m) => m.ServicesCanvas),
  { ssr: false }
);

/* ───────── interactive 3D architecture explorer ───────── */

const Explorer = () => {
  const [active, setActive] = useState<string>("gateway");
  return (
    <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="relative h-[380px] min-w-0 overflow-hidden rounded-3xl border border-[#7042f855] bg-gradient-to-b from-[#7042f81f] to-[#03001466] sm:h-[460px]">
        <ServicesCanvas
          interactive
          selected={active}
          onSelect={(id) => id && setActive(id)}
        />
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/40 px-3 py-1 text-xs text-gray-400 backdrop-blur">
          Hover or tap a node · drag to rotate
        </span>
      </div>

      <ol className="flex flex-col gap-2.5">
        {SHIFT_NODES.map((node) => {
          const isActive = active === node.id;
          return (
            <li key={node.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(node.id)}
                onFocus={() => setActive(node.id)}
                onClick={() => setActive(node.id)}
                aria-pressed={isActive}
                className="w-full rounded-2xl border bg-[#03001499] p-3.5 text-left backdrop-blur-md transition-all duration-300"
                style={{
                  borderColor: `${node.color}${isActive ? "ee" : "44"}`,
                  boxShadow: isActive ? `0 0 30px ${node.color}44` : "none",
                  transform: isActive ? "translateX(6px)" : "none",
                }}
              >
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: node.color }}
                  />
                  <span className="font-semibold text-white">{node.title}</span>
                  <span className="text-sm text-gray-500">{node.subtitle}</span>
                </div>
                {isActive && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {node.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border px-2.5 py-1 text-xs text-gray-100"
                        style={{
                          borderColor: `${node.color}66`,
                          background: `${node.color}18`,
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

/* ───────── database per service ───────── */

const DataOwnership = () => {
  const services = SHIFT_NODES.filter((n) =>
    ["user", "roster", "patient", "shift"].includes(n.id)
  );
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((svc, i) => (
          <Reveal key={svc.id} delay={i * 0.08}>
            <TiltCard max={12} className="h-full">
              <div
                className="flex h-full flex-col items-center gap-3 rounded-2xl border bg-[#03001499] p-6 text-center backdrop-blur-md"
                style={{
                  borderColor: `${svc.color}77`,
                  boxShadow: `0 0 30px ${svc.color}22, inset 0 0 20px ${svc.color}10`,
                }}
              >
                <p
                  className="text-sm font-semibold text-white"
                  style={{ transform: "translateZ(26px)" }}
                >
                  {svc.title.replace(" Service", "")}
                </p>
                <span
                  className="text-gray-600"
                  style={{ transform: "translateZ(14px)" }}
                  aria-hidden
                >
                  ↓
                </span>
                <FaDatabase
                  className="h-12 w-12"
                  style={{ color: svc.color, transform: "translateZ(50px)" }}
                  aria-hidden
                />
                <p
                  className="text-sm text-gray-400"
                  style={{ transform: "translateZ(20px)" }}
                >
                  Own MySQL 8 schema
                </p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-[#7042f88b] bg-[#7042f81a] px-4 py-2 text-gray-100">
              <FaLink className="text-[#b49bff]" aria-hidden /> Logical foreign
              keys
            </span>
            <span className="flex items-center gap-2 rounded-full border border-cyan-400/60 bg-cyan-400/10 px-4 py-2 text-cyan-100">
              <FaDatabase aria-hidden /> Read-only cross-schema compatibility
              views
            </span>
          </div>
          <p className="text-gray-400">
            Services never share tables. Relationships between schemas are
            logical, and anything that reads across schemas does so through
            read-only views.
          </p>
        </div>
      </Reveal>
    </div>
  );
};

/* ───────── roles & workflows ───────── */

const ROLES: Array<{ name: string; text: string; icon: IconType; color: string }> = [
  { name: "Hospital Admin / HR", text: "Organisation and staffing administration", icon: FaUserShield, color: "#2dd4bf" },
  { name: "Nurse Supervisor", text: "Ward rosters and oversight", icon: FaUserMd, color: "#b49bff" },
  { name: "Nurse", text: "Shifts, availability and patient tasks", icon: FaUserNurse, color: "#facc15" },
  { name: "Reception", text: "Patient registration and bed allocation", icon: FaConciergeBell, color: "#fb923c" },
];

const WORKFLOWS = [
  "Ward roster planning & validation",
  "Nurse availability preferences",
  "Shift-swap approvals",
  "Bed-allocated patient registration",
  "Patient assignments",
  "Per-patient task lists",
  "Structured shift handovers",
  "Attendance verification",
  "Staffing analytics",
];

const Roles = () => (
  <div className="flex flex-col gap-10">
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {ROLES.map(({ name, text, icon: Icon, color }, i) => (
        <Reveal key={name} delay={i * 0.08}>
          <TiltCard max={12} className="h-full">
            <div
              className="flex h-full flex-col gap-3 rounded-2xl border bg-[#03001499] p-6 backdrop-blur-md"
              style={{ borderColor: `${color}77`, boxShadow: `0 0 28px ${color}22` }}
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
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3
                className="text-lg font-semibold text-white"
                style={{ transform: "translateZ(24px)" }}
              >
                {name}
              </h3>
              <p className="text-sm text-gray-400">{text}</p>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>

    <Reveal>
      <p className="mb-4 text-center text-xs uppercase tracking-[0.25em] text-gray-500">
        Workflows supported end to end
      </p>
      <ul className="flex flex-wrap justify-center gap-3">
        {WORKFLOWS.map((w) => (
          <li
            key={w}
            className="rounded-full border border-[#7042f88b] bg-[#7042f81a] px-4 py-2 text-sm text-gray-100"
          >
            {w}
          </li>
        ))}
      </ul>
    </Reveal>
  </div>
);

/* ───────── request path at the edge ───────── */

const EdgePath = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col items-stretch gap-3 md:flex-row">
      <FlowStep
        icon={FaCode}
        title="React SPA"
        detail="Every call goes through one centralized Axios gateway client"
        color="#38bdf8"
      />
      <Arrow />
      <FlowStep
        icon={FaShieldAlt}
        title="API Gateway"
        detail="CORS enforcement and edge JWT validation"
        color="#22d3ee"
      />
      <Arrow />
      <FlowStep
        icon={FaRoute}
        title="Role-based routing"
        detail="Consul discovery + LoadBalancer pick the service"
        color="#f472b6"
      />
      <Arrow />
      <FlowStep
        icon={FaNetworkWired}
        title="Domain service"
        detail="Spring Security with JJWT and BCrypt · own schema"
        color="#b49bff"
      />
    </div>
    <p className="text-center text-sm text-gray-500">
      Failures come back as standardized API error contracts the SPA can
      render consistently as toast notifications.
    </p>
  </div>
);

/* ───────── CI/CD pipeline ───────── */

const Stage = ({
  n,
  icon: Icon,
  title,
  children,
  color,
}: {
  n: number;
  icon: IconType;
  title: string;
  children: React.ReactNode;
  color: string;
}) => (
  <TiltCard max={10} className="h-full flex-1">
    <div
      className="flex h-full flex-col gap-3 rounded-2xl border bg-[#03001499] p-5 backdrop-blur-md"
      style={{ borderColor: `${color}77`, boxShadow: `0 0 28px ${color}22` }}
    >
      <div className="flex items-center justify-between">
        <Icon
          className="h-6 w-6"
          style={{ color, transform: "translateZ(36px)" }}
          aria-hidden
        />
        <span className="font-mono text-xs" style={{ color }}>
          STAGE {n}
        </span>
      </div>
      <h4 className="font-semibold text-white" style={{ transform: "translateZ(22px)" }}>
        {title}
      </h4>
      <div className="text-sm text-gray-400">{children}</div>
    </div>
  </TiltCard>
);

const Pipeline = () => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-col items-stretch gap-3 md:flex-row">
      <Stage n={1} icon={FaCode} title="Backend build & test" color="#2dd4bf">
        Parallel builds and tests across the five services.
      </Stage>
      <Arrow />
      <Stage n={2} icon={FaCode} title="Frontend test & build" color="#38bdf8">
        Testing and building the React SPA.
      </Stage>
      <Arrow />
      <Stage n={3} icon={FaCheckDouble} title="SonarQube analysis" color="#b49bff">
        Static quality analysis of the codebase.
      </Stage>
      <Arrow />
      <Stage n={4} icon={FaArchive} title="Archive artifacts" color="#facc15">
        Build outputs archived by the pipeline.
      </Stage>
    </div>

    <Reveal>
      <div className="flex flex-col items-center gap-4">
        <span className="flex items-center gap-2 rounded-full border border-amber-300/70 bg-amber-300/10 px-5 py-2 font-medium text-amber-200 shadow-[0_0_30px_#facc1533]">
          <FaCheckDouble aria-hidden /> 80% JaCoCo line-coverage gate
        </span>
        <ul className="flex flex-wrap justify-center gap-3 text-sm text-gray-300">
          {[
            "Jenkins declarative pipeline",
            "JUnit 5",
            "Mockito",
            "React Testing Library",
            "Spring Boot Actuator",
          ].map((t) => (
            <li
              key={t}
              className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  </div>
);

/* ───────── composite ───────── */

export const MicroservicesShowcase = () => (
  <>
    <section>
      <SectionTitle eyebrow="Explore it in 3D" title="Microservices Architecture" />
      <Explorer />
    </section>

    <section>
      <SectionTitle eyebrow="Data ownership" title="Database per Service" />
      <DataOwnership />
    </section>

    <section>
      <SectionTitle eyebrow="Hospital staffing" title="Four Role-Scoped Modules" />
      <Roles />
    </section>

    <section>
      <SectionTitle eyebrow="Security & edge governance" title="Request Path at the Edge" />
      <EdgePath />
    </section>

    <section>
      <SectionTitle eyebrow="CI/CD & quality" title="Automated Delivery Pipeline" />
      <Pipeline />
    </section>
  </>
);
