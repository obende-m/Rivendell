"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";

interface CapabilityItem {
  title: string;
  description: string;
  icon: string;
}

interface ServicesGridProps {
  eyebrow?: string;
  heading?: string;
  capabilities?: CapabilityItem[];
}

export function ServicesGrid({
  eyebrow = "Core Capabilities",
  heading = "Expertise Defined",
  capabilities,
}: ServicesGridProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const capabilityList = capabilities || [
    {
      title: "Project Design",
      description:
        "Articulating your vision through sophisticated conceptual drawings and meticulous spatial planning.",
      icon: "draw",
    },
    {
      title: "Structural Precision",
      description:
        "Ensuring permanence and safety through rigorous engineering standards and premium material selection.",
      icon: "engineering",
    },
    {
      title: "Site Development",
      description:
        "Optimizing landscapes for both aesthetic beauty and structural integrity from the ground up.",
      icon: "landscape",
    },
    {
      title: "Investment Strategy",
      description:
        "Providing deep market insights to maximize the ROI of your real estate portfolio developments.",
      icon: "payments",
    },
    {
      title: "Legal & Advisory",
      description:
        "Navigating complex zoning laws and property regulations with absolute precision and legal rigor.",
      icon: "gavel",
    },
    {
      title: "Turnkey Solutions",
      description:
        "End-to-end project management from initial acquisition to final interior dressing and handover.",
      icon: "key",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background px-6 md:px-12 lg:px-16 border-b border-gold-muted/10">
      <div className="section-container max-w-[1440px] mx-auto">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-16 md:mb-24" y={15}>
          <p className="font-label-caps text-label-caps text-primary mb-4 tracking-[0.4em] uppercase">
            {eyebrow}
          </p>
          <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            {heading}
          </h2>
        </RevealOnScroll>
 
        {/* Bento/Capability 3x2 Grid with thin overlapping border lines */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold-muted/20 border border-gold-muted/20">
          {capabilityList.map((cap, index) => (
            <motion.div
              key={cap.title}
              variants={staggerItemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={
                isMobile
                  ? {
                      top: `${80 + index * 48}px`,
                      zIndex: index + 10,
                    }
                  : {}
              }
              className="bg-background p-6 sm:p-10 md:p-12 hover:bg-surface-container transition-colors duration-500 border border-transparent hover:border-gold-muted/10 hover:shadow-2xl hover:shadow-primary/5 group select-none flex flex-col justify-start min-h-[300px] sticky md:relative"
            >
              <span className="material-symbols-outlined text-3xl text-primary mb-8 block transition-transform group-hover:scale-110 duration-300">
                {cap.icon}
              </span>
              <h4 className="font-playfair text-2xl mb-4 text-on-surface group-hover:text-primary transition-colors duration-300">
                {cap.title}
              </h4>
              <p className="font-body-md text-on-surface-variant/80 text-sm leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
