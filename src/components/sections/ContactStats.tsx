"use client";

import { motion } from "framer-motion";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";

export function ContactStats() {
  return (
    <StaggerChildren className="grid grid-cols-2 gap-12 md:gap-20">
      <motion.div variants={staggerItemVariants}>
        <span className="font-display-lg text-5xl md:text-6xl text-primary block mb-2 select-none">
          15+
        </span>
        <span className="font-label-caps text-[9px] tracking-wider text-on-surface-variant/80 uppercase">
          YEARS OF PRECISION
        </span>
      </motion.div>
      <motion.div variants={staggerItemVariants}>
        <span className="font-display-lg text-5xl md:text-6xl text-primary block mb-2 select-none">
          200+
        </span>
        <span className="font-label-caps text-[9px] tracking-wider text-on-surface-variant/80 uppercase">
          PROJECTS COMPLETED
        </span>
      </motion.div>
    </StaggerChildren>
  );
}
