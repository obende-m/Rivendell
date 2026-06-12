import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GhostBorder } from "@/components/ui/GhostBorder";
import { VerticalLine } from "@/components/ui/VerticalLine";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { StaggerChildren } from "@/components/animations/StaggerChildren";

export const metadata: Metadata = {
  title: "Architecture & Design Services",
  description:
    "Rivendell Consults delivers luxury residential and commercial architecture, BIM modeling, and conceptual planning.",
};

export default function ArchitectureServicePage() {
  return (
    <div className="pt-24 min-h-screen bg-background text-on-surface">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Minimalist architecture concept"
            className="w-full h-full object-cover scale-105"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
          />
          <div className="absolute inset-0 hero-overlay bg-black/50" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end section-container max-w-[1440px] mx-auto pb-16">
          <RevealOnScroll y={15}>
            <span className="font-label-caps text-label-caps text-primary mb-4 tracking-[0.4em] block">
              DESIGN PHILOSOPHY
            </span>
            <h1 className="font-display-xl text-4xl sm:text-6xl md:text-5xl lg:text-6xl max-w-4xl text-on-surface leading-none uppercase">
              Architectural <span className="italic text-primary">Mastery</span>
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 md:py-32 section-container max-w-[1440px] mx-auto">
        <RevealOnScroll className="max-w-3xl mb-16 md:mb-24" y={15}>
          <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block mb-3">
            PILLARS
          </span>
          <h2 className="font-display-lg text-3xl md:text-headline-lg italic">
            Quiet confidence in form and space.
          </h2>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Conceptualization",
              desc: "Mapping topography, analyzing sun paths, and anchoring structures into the natural landscape.",
            },
            {
              num: "02",
              title: "Digital Seeding",
              desc: "Building rich virtual twins using BIM modeling and photorealistic light tracing environments.",
            },
            {
              num: "03",
              title: "Specification",
              desc: "Compiling blueprints, material schedules, structural detail sheets, and zoning reviews.",
            },
          ].map((pillar) => (
            <GhostBorder key={pillar.num} className="p-10 flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="font-display-lg text-3xl text-primary font-bold block mb-4">
                  {pillar.num}
                </span>
                <h3 className="font-playfair text-2xl text-on-surface mb-4">
                  {pillar.title}
                </h3>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant/80 leading-relaxed">
                {pillar.desc}
              </p>
            </GhostBorder>
          ))}
        </StaggerChildren>
      </section>

      {/* Narrative & Process */}
      <section className="bg-surface-container py-20 md:py-32">
        <div className="section-container max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-8">
            <span className="font-label-caps text-label-caps text-primary tracking-widest block">
              OUR PROTOCOL
            </span>
            <h2 className="font-display-lg text-3xl md:text-headline-lg italic">
              Rigorous, iterative, client-centered execution.
            </h2>
            <VerticalLine tall />
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              We guide you from zoning permits to selecting cabinet handles. Our team is present at every inspection and ensures blueprints are translated flawlessly into built layouts.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ImageReveal>
              <div className="aspect-[16/10] overflow-hidden ghost-border p-2 bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  alt="Architectural detailing"
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* Quote testimonial */}
      <section className="py-20 md:py-32 section-container max-w-[1000px] mx-auto text-center border-t border-gold-muted/10">
        <RevealOnScroll className="space-y-8" y={15}>
          <span className="font-label-caps text-[10px] text-primary tracking-widest block uppercase">
            ENDORSEMENT
          </span>
          <p className="font-display-lg text-2xl md:text-3xl italic leading-relaxed text-on-surface">
            &ldquo;Their layouts aren&apos;t just lines; they are carefully orchestrated scripts for light and spatial intelligence.&rdquo;
          </p>
          <p className="font-label-caps text-xs text-primary tracking-widest">
            — STERLING HOMES ASSIGNMENT OFFICE
          </p>
        </RevealOnScroll>
      </section>

      {/* Bottom links */}
      <section className="py-16 text-center bg-surface-container-low border-t border-gold-muted/10 flex flex-col sm:flex-row gap-6 justify-center">
        <Link href="/projects">
          <Button variant="primary">VIEW CASE STUDIES</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline">BOOK DISCOVERY CALL</Button>
        </Link>
      </section>
    </div>
  );
}
