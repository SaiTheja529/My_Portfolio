"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Scroll-triggered reveal that swings in from a tilted perspective. */
export const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <div style={{ perspective: 1200 }} className={className}>
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      style={{ transformOrigin: "50% 100%" }}
    >
      {children}
    </motion.div>
  </div>
);

export const SectionTitle = ({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) => (
  <div className="mb-12 flex flex-col items-center text-center">
    <div className="Welcome-box border border-[#7042f88b] px-[7px] py-[8px] opacity-[0.9]">
      <SparklesIcon className="mr-[10px] h-5 w-5 text-[#b49bff]" />
      <span className="Welcome-text text-[13px]">{eyebrow}</span>
    </div>
    <h2 className="mt-5 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-4xl font-semibold text-transparent">
      {title}
    </h2>
  </div>
);
