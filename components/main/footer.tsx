"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaRocket } from "react-icons/fa";

import { TiltCard } from "@/components/sub/tilt-card";
import { NAV_LINKS, PROFILE, SOCIALS } from "@/constants";

const NAME = PROFILE.firstName.toUpperCase();

export const Footer = () => {
  const [launched, setLaunched] = useState(false);

  const launch = () => {
    if (launched) return;
    setLaunched(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => setLaunched(false), 1800);
  };

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-[#7042f833]">
      {/* horizon glow + scrolling perspective grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[460px] bg-[radial-gradient(ellipse_at_50%_100%,#7042f877,transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 overflow-hidden [perspective:420px]"
      >
        <div className="footer-grid absolute -left-1/2 -right-1/2 -bottom-[40%] h-[200%] origin-[50%_100%] [transform:rotateX(68deg)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 pb-10 pt-20">
        {/* launch button */}
        <div className="relative flex flex-col items-center">
          <motion.button
            type="button"
            onClick={launch}
            aria-label="Back to top"
            animate={
              launched
                ? { y: -520, opacity: [1, 1, 0], scale: [1, 1.15, 0.8] }
                : { y: 0, opacity: 1, scale: 1 }
            }
            transition={{ duration: launched ? 1.3 : 0.4, ease: "easeIn" }}
            whileHover={{ y: -6 }}
            className="relative z-20 flex h-16 w-16 items-center justify-center rounded-full border border-[#7042f8aa] bg-[#7042f822] text-2xl text-[#d8ccff] shadow-[0_0_30px_#7042f888] backdrop-blur"
          >
            <FaRocket className="-rotate-45" aria-hidden />
            {launched && (
              <span
                aria-hidden
                className="absolute -bottom-9 left-1/2 h-10 w-3 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-300 via-orange-500 to-transparent blur-[2px]"
              />
            )}
          </motion.button>
          <span className="mt-3 text-xs uppercase tracking-[0.3em] text-gray-500">
            Back to top
          </span>
        </div>

        {/* big 3D name: every letter lifts on hover */}
        <TiltCard max={7} glare={false} className="w-full">
          <h2
            aria-label={PROFILE.name}
            className="select-none text-center font-black leading-none tracking-tight [font-size:clamp(3.2rem,15vw,11rem)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {[...NAME].map((ch, i) => (
              <span
                key={i}
                aria-hidden
                className="inline-block bg-gradient-to-b from-[#e5dcff] via-[#7042f8] to-[#1a0b45] bg-clip-text text-transparent transition-all duration-300 [filter:drop-shadow(0_0_18px_rgba(112,66,248,0.55))] hover:-translate-y-3 hover:from-[#cffafe] hover:via-[#22d3ee] hover:[filter:drop-shadow(0_0_22px_rgba(34,211,238,0.7))]"
                style={{ transform: "translateZ(40px)" }}
              >
                {ch === " " ? " " : ch}
              </span>
            ))}
          </h2>
        </TiltCard>

        <p className="-mt-4 text-center text-gray-400">
          {PROFILE.role} · {PROFILE.company} {PROFILE.team}
        </p>

        {/* links */}
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.title}
              href={link.link}
              className="rounded-full border border-[#7042f855] bg-[#03001488] px-4 py-1.5 text-sm text-gray-200 backdrop-blur transition hover:border-cyan-400/70 hover:text-white hover:shadow-[0_0_24px_#22d3ee44]"
            >
              {link.title}
            </Link>
          ))}
          {SOCIALS.map(({ name, icon: Icon, link }) => (
            <a
              key={name}
              href={link}
              target={link.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              aria-label={name}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7042f855] bg-[#03001488] text-gray-300 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/70 hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </nav>

        <p className="text-center text-xs text-gray-500">
          Designed &amp; built by {PROFILE.name} · Next.js · Three.js · Framer
          Motion · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
