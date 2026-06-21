"use client";

import { motion } from "framer-motion";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";

interface EstateItem {
  name: string;
  loc: string;
  img: string;
  span: string;
}

interface DevelopmentsBentoProps {
  estates: EstateItem[];
}

export function DevelopmentsBento({ estates }: DevelopmentsBentoProps) {
  return (
    <StaggerChildren className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {estates.map((est) => (
        <motion.div
          key={est.name}
          variants={staggerItemVariants}
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`group relative overflow-hidden project-card bg-surface-container-low border border-gold-muted/5 transition-colors duration-500 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer block ${est.span}`}
        >
          <ImageReveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={est.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              src={est.img}
            />
          </ImageReveal>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
          <div className="absolute bottom-10 left-10 z-20">
            <span className="font-label-caps text-[10px] text-on-surface-variant/80 mb-2 block tracking-wider uppercase">
              {est.loc}
            </span>
            <h3 className="font-display-lg text-2xl md:text-3xl text-on-surface group-hover:text-primary transition-colors duration-500">
              {est.name}
            </h3>
          </div>
        </motion.div>
      ))}
    </StaggerChildren>
  );
}
