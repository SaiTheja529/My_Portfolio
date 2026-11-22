"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import {
  FaArrowRight,
  FaCommentDots,
  FaEnvelope,
  FaHandshake,
  FaLightbulb,
  FaPhoneAlt,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";

import { TiltCard } from "@/components/sub/tilt-card";
import { CONTACT, PROFILE } from "@/constants";

// WebGL scene is browser-only.
const ContactCanvas = dynamic(
  () => import("@/components/sub/contact-scene").then((m) => m.ContactCanvas),
  { ssr: false }
);

const OPEN_TO = [
  { label: "Suggestions", icon: FaCommentDots, color: "#38bdf8" },
  { label: "Project ideas", icon: FaLightbulb, color: "#facc15" },
  { label: "Collaboration", icon: FaHandshake, color: "#2dd4bf" },
];

const ContactCard = ({
  href,
  external,
  icon: Icon,
  label,
  value,
  hint,
  color,
}: {
  href: string;
  external?: boolean;
  icon: typeof FaPhoneAlt;
  label: string;
  value: ReactNode;
  hint: string;
  color: string;
}) => (
  <TiltCard max={10}>
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-5 rounded-2xl border bg-[#03001499] p-5 backdrop-blur-md transition-shadow hover:shadow-[0_0_44px_var(--glow)]"
      style={
        {
          borderColor: `${color}88`,
          "--glow": `${color}66`,
        } as React.CSSProperties
      }
    >
      <span
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
        style={{
          color,
          borderColor: `${color}77`,
          background: `${color}18`,
          transform: "translateZ(40px)",
          boxShadow: `0 0 24px ${color}44`,
        }}
      >
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <span className="min-w-0 flex-1" style={{ transform: "translateZ(22px)" }}>
        <span className="block text-xs uppercase tracking-[0.2em] text-gray-500">
          {label}
        </span>
        <span className="block truncate text-lg font-semibold text-white">
          {value}
        </span>
        <span className="block text-sm" style={{ color }}>
          {hint}
        </span>
      </span>
      <FaArrowRight
        className="shrink-0 text-gray-500 transition group-hover:translate-x-1.5 group-hover:text-white"
        aria-hidden
      />
    </a>
  </TiltCard>
);

export const Contact = () => {
  // The envelope opens the first time the scene scrolls into view.
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 });

  const openEmail = () =>
    window.open(CONTACT.gmailUrl, "_blank", "noopener,noreferrer");
  const callPhone = () => {
    window.location.href = CONTACT.phoneHref;
  };

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center px-6 py-24 md:px-20 scroll-mt-20"
    >
      <div className="flex flex-col items-center text-center">
        <div className="Welcome-box border border-[#7042f88b] px-[7px] py-[8px] opacity-[0.9]">
          <SparklesIcon className="mr-[10px] h-5 w-5 text-[#b49bff]" />
          <span className="Welcome-text text-[13px]">Get in touch</span>
        </div>
        <h2 className="mt-5 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-[40px] font-semibold text-transparent">
          Contact Me
        </h2>
      </div>

      <div className="mt-12 grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        {/* 3D scene */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative h-[380px] min-w-0 overflow-hidden rounded-3xl border border-[#7042f855] bg-[radial-gradient(ellipse_at_center,#2a106655_0%,#03001466_70%)] sm:h-[480px]"
        >
          <ContactCanvas opened={inView} onEmail={openEmail} onPhone={callPhone} />
          <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/40 px-3 py-1 text-xs text-gray-400 backdrop-blur">
            Click the envelope to email · the phone to call
          </span>
        </motion.div>

        {/* Copy + real links */}
        <div className="flex min-w-0 flex-col gap-7">
          <div>
            <h3 className="text-3xl font-semibold text-white md:text-4xl">
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                together.
              </span>
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              I&apos;m {PROFILE.name}, and I&apos;m open to any suggestions,
              any project ideas and any sort of collaboration. If something
              here sparked a thought — say hello.
            </p>
          </div>

          <ul className="flex flex-wrap gap-3">
            {OPEN_TO.map(({ label, icon: Icon, color }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="flex items-center gap-2 rounded-full border px-4 py-2 text-gray-100"
                style={{ borderColor: `${color}88`, background: `${color}14` }}
              >
                <Icon style={{ color }} aria-hidden /> {label}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-col gap-4">
            <ContactCard
              href={CONTACT.phoneHref}
              icon={FaPhoneAlt}
              label="Call me"
              value={PROFILE.phoneDisplay}
              hint="Click to call"
              color="#4ade80"
            />
            <ContactCard
              href={CONTACT.gmailUrl}
              external
              icon={FaEnvelope}
              label="Email me"
              value={PROFILE.email}
              hint="Click to write in Gmail"
              color="#c084fc"
            />
            <p className="text-sm text-gray-500">
              Don&apos;t use Gmail?{" "}
              <a
                href={CONTACT.mailtoHref}
                className="text-gray-300 underline decoration-[#7042f8] underline-offset-4 hover:text-white"
              >
                Open your mail app instead
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
