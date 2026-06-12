"use client";

import { StatItem } from "@/lib/sanity/types";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

interface StatsSectionProps {
  stats?: StatItem[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  const statsList = stats || [
    { value: "20", suffix: "+", label: "Years Experience" },
    { value: "100", suffix: "+", label: "Projects Completed" },
    { value: "50", suffix: "+", label: "Clients Served" },
  ];

  return (
    <section className="py-20 md:py-32 bg-background border-b border-gold-muted/10">
      <div className="section-container max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {statsList.map((stat, idx) => (
          <RevealOnScroll
            key={stat.label}
            delay={idx * 0.15}
            className="flex flex-col items-center group"
          >
            <span className="font-display-lg text-display-lg text-primary mb-4 transition-transform duration-500 group-hover:scale-105 select-none">
              <AnimatedCounter value={stat.value} />
              {stat.suffix}
            </span>
            <p className="font-label-caps text-label-caps tracking-[0.2em] text-on-surface-variant/80 uppercase">
              {stat.label}
            </p>
            <div className="w-12 h-[0.5px] bg-gold-muted/30 mt-6 transition-all duration-500 group-hover:w-24" />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
