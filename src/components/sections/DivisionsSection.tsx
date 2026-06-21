"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";

interface DivisionItem {
  title: string;
  description: string;
  icon?: string;
  link?: string;
  features?: string[];
}

interface DivisionsSectionProps {
  eyebrow?: string;
  heading?: string;
  divisions?: DivisionItem[];
}

export function DivisionsSection({
  eyebrow = "Ecosystem of Excellence",
  heading = "Our Divisions",
  divisions,
}: DivisionsSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const divisionsList = divisions || [
    {
      title: "Architecture",
      description:
        "Visionary designs that balance form and function, tailored to the unique narrative of each landscape and client.",
      icon: "architecture",
      link: "/services/architecture",
      features: ["CONCEPTUAL PLANNING", "SUSTAINABLE DESIGN", "INTERIOR MASTERY"],
    },
    {
      title: "Construction",
      description:
        "Precision engineering and master craftsmanship transform blueprints into enduring physical realities of the highest caliber.",
      icon: "foundation",
      link: "/services/construction",
      features: ["GENERAL CONTRACTING", "SITE MANAGEMENT", "QUALITY ASSURANCE"],
    },
    {
      title: "Real Estate",
      description:
        "Strategic development and portfolio management focused on long-term value creation in the luxury property market.",
      icon: "domain",
      link: "/developments",
      features: ["LAND ACQUISITION", "MARKET ANALYSIS", "ASSET MANAGEMENT"],
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background px-6 md:px-12 lg:px-16 border-b border-gold-muted/10">
      <div className="section-container max-w-[1440px] mx-auto">
        {/* Section Title */}
        <RevealOnScroll className="text-center mb-16 md:mb-24" y={15}>
          <p className="font-label-caps text-label-caps text-primary mb-4 tracking-[0.4em] uppercase">
            {eyebrow}
          </p>
          <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg">
            {heading}
          </h2>
        </RevealOnScroll>
 
        {/* Divisions Cards Stagger */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {divisionsList.map((div, index) => (
            <motion.div
              key={div.title}
              variants={staggerItemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={
                isMobile
                  ? {
                      top: `${80 + index * 48}px`,
                      zIndex: index + 10,
                    }
                  : {}
              }
              className="bg-surface-container group p-6 sm:p-10 md:p-12 relative overflow-hidden transition-colors duration-500 hover:bg-surface-container-high border border-transparent hover:border-gold-muted/20 hover:shadow-2xl hover:shadow-primary/5 select-none flex flex-col justify-between min-h-[440px] sticky md:relative"
            >
              {/* Floating Icon Top Right */}
              <div className="absolute top-0 right-0 p-8">
                <span className="material-symbols-outlined text-4xl text-primary/20 group-hover:text-primary transition-colors duration-500">
                  {div.icon || "bolt"}
                </span>
              </div>

              {/* Card Content */}
              <div className="relative z-10 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-playfair text-3xl mb-6 text-on-surface group-hover:text-primary transition-colors">
                    {div.title}
                  </h3>
                  <p className="font-body-md text-on-surface-variant/80 mb-10 leading-relaxed text-sm">
                    {div.description}
                  </p>
                </div>

                <div>
                  {/* Checklist */}
                  <ul className="space-y-3 mb-10 font-label-caps text-[9px] tracking-widest text-on-surface-variant/60">
                    {div.features?.map((feat) => (
                      <li key={feat} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary mr-3 inline-block" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Text link */}
                  <Link
                    href={div.link || "#"}
                    className="font-label-caps text-xs tracking-wider text-primary border-b border-primary/20 pb-2 hover:border-primary transition-all duration-300 inline-block"
                  >
                    EXPLORE {div.title.toUpperCase()}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
