"use client";

import { Testimonial } from "@/lib/sanity/types";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";
import { VerticalLine } from "@/components/ui/VerticalLine";

interface TestimonialsSectionProps {
  heading?: string;
  testimonials?: Testimonial[];
}

export function TestimonialsSection({
  heading = "Voices of Prestige",
  testimonials,
}: TestimonialsSectionProps) {
  const list = testimonials || [
    {
      _id: "t1",
      name: "Julian Sterling",
      position: "Private Estate Owner",
      testimonial:
        "The attention to detail displayed by Rivendell is unparalleled. They didn't just build a home; they crafted a legacy for my family that breathes with life and architectural intelligence.",
      displayOrder: 1,
      featured: true,
    },
    {
      _id: "t2",
      name: "Elena Vance",
      position: "Senior Developer",
      testimonial:
        "Rivendell's ability to navigate complex urban developments while maintaining a pure architectural vision is why they remain our primary choice for luxury construction.",
      displayOrder: 2,
      featured: true,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-surface-container px-6 md:px-12 lg:px-16 relative overflow-hidden">
      <div className="section-container max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          {/* Left Heading */}
          <RevealOnScroll className="flex flex-col justify-start items-start" y={15}>
            <h2 className="font-display-lg text-3xl md:text-headline-lg mb-12 text-on-surface leading-tight">
              {heading.includes("Prestige") ? (
                <>
                  Voices of <br />
                  <span className="italic text-primary">Prestige</span>
                </>
              ) : (
                heading
              )}
            </h2>
            <VerticalLine tall className="hidden lg:block" />
          </RevealOnScroll>
 
          {/* Right Quotes list */}
          <StaggerChildren className="space-y-16 md:space-y-24">
            {list.map((t) => (
              <motion.div
                key={t._id}
                variants={staggerItemVariants}
                className="relative pl-6 md:pl-12 border-l border-gold-muted/40 py-2"
              >
                <p className="font-display-lg text-2xl md:text-3xl italic text-on-surface leading-relaxed mb-6 select-none">
                  &ldquo;{t.testimonial}&rdquo;
                </p>
                <p className="font-label-caps text-label-caps tracking-[0.2em] text-primary uppercase">
                  — {t.name}
                  {t.position && (
                    <span className="text-on-surface-variant/75 text-[10px] lowercase italic normal-case block md:inline md:ml-3">
                      ({t.position})
                    </span>
                  )}
                </p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
