"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { useInView } from "react-intersection-observer";

type SkillCardProps = {
  name: string;
  icon: IconType;
  index: number;
};

export const SkillCard = ({ name, icon: Icon, index }: SkillCardProps) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.04 }}
      className="flex items-center gap-3 rounded-2xl border border-[#7042f88b] bg-[#03001499] px-5 py-3 text-gray-200 shadow-[inset_0_0_14px_#a48fff1f] backdrop-blur-md hover:border-cyan-400/70 hover:shadow-[0_0_22px_#7042f866] transition-colors"
    >
      <Icon className="h-7 w-7 text-[#b49bff]" aria-hidden />
      <span className="text-base font-medium">{name}</span>
    </motion.div>
  );
};
