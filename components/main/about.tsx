"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Link from "next/link";

import { FOCUS_AREAS, PROFILE, SOCIALS } from "@/constants";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

export const About = () => {
  return (
    <section
      id="about-me"
      className="relative flex flex-col items-center justify-center px-6 md:px-20 py-20 scroll-mt-20"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col items-center w-full max-w-6xl"
      >
        <div className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]">
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h2 className="Welcome-text text-[13px]">
            {PROFILE.company} · {PROFILE.team}
          </h2>
        </div>

        <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mt-6 mb-12">
          About Me
        </h2>

        <motion.div
          variants={slideInFromLeft(0.1)}
          className="mb-8 grid w-full grid-cols-1 gap-5 md:grid-cols-3"
        >
          {PROFILE.highlights.map(({ label, value, detail }) => (
            <div
              key={label}
              className="rounded-2xl border border-[#7042f88b] bg-[#7042f81a] p-6 shadow-[inset_0_0_20px_#a48fff1f]"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                {label}
              </p>
              <p className="mt-2 text-lg font-semibold text-white">{value}</p>
              <p className="mt-1 text-sm text-gray-400">{detail}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.2)}
          className="rounded-3xl border border-[#7042f88b] bg-[#03001499] p-8 md:p-12 backdrop-blur-md shadow-[inset_0_0_24px_#a48fff1f] flex flex-col gap-5"
        >
          {PROFILE.about.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-gray-300 text-lg leading-relaxed"
            >
              {paragraph}
            </p>
          ))}

          <blockquote className="mt-2 border-l-4 border-[#7042f8] pl-5 text-xl italic text-gray-100">
            {PROFILE.closing}
          </blockquote>

          {SOCIALS.length > 0 && (
            <div className="flex gap-4 pt-2">
              {SOCIALS.map(({ name, icon: Icon, link }) => (
                <Link
                  key={name}
                  href={link}
                  target={link.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-label={name}
                  className="text-gray-300 hover:text-[rgb(112,66,248)] transition"
                >
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={slideInFromRight(0.4)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full"
        >
          {FOCUS_AREAS.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#2A0E61] bg-[#7042f80d] p-6 hover:border-cyan-400/60 hover:shadow-[0_0_24px_#7042f855] transition"
            >
              <Icon className="h-8 w-8 text-[#b49bff]" aria-hidden />
              <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-gray-400">{description}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
