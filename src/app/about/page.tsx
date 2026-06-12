import { Metadata } from "next";
import Link from "next/link";
import { getTeamMembers } from "@/lib/sanity/queries";
import { Button } from "@/components/ui/Button";
import { GhostBorder } from "@/components/ui/GhostBorder";
import { VerticalLine } from "@/components/ui/VerticalLine";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { StaggerChildren } from "@/components/animations/StaggerChildren";

export const metadata: Metadata = {
  title: "About the Firm",
  description:
    "Learn about Rivendell Consults, our principal designers, architectural values, and legacy milestones.",
};

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <div className="pt-24 min-h-screen bg-background text-on-surface">
      {/* Hero */}
      <section className="py-12 md:py-20 max-w-[1440px] mx-auto px-6 md:px-16 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <RevealOnScroll className="lg:col-span-8 space-y-6" y={15}>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block mb-2">
              THE FIRM
            </span>
            <h1 className="font-display-xl text-4xl sm:text-6xl md:text-5xl lg:text-6xl max-w-4xl text-on-surface leading-none uppercase">
              Permanence <br />
              <span className="italic text-primary">Through Rigor.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll className="lg:col-span-4 flex items-end animate-delay-200" y={15}>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm mb-4 leading-relaxed">
              Founded in 2012, Rivendell Consults operates at the intersection of architectural physics, clean layouts, and luxury craftsmanship.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-16 border-t border-gold-muted/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[0.5px] bg-primary" />
              <span className="font-label-caps text-label-caps text-on-surface-variant/80 uppercase">
                THE STORY
              </span>
            </div>
            <h2 className="font-display-lg text-3xl md:text-headline-lg italic">
              Crafting legacies that breathe with life.
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              We began as a boutique design studio focused on Lekki residential commissions. Today, our footprint extends across London, Dubai, and Lusaka, managing complex structural builds, high-yield developments, and bespoke curation details.
            </p>
            <p className="font-body-md text-on-surface-variant leading-relaxed border-l border-primary/40 pl-6">
              Our core design principle is editorial minimalism: avoiding unnecessary decoration to emphasize structural lines, raw materials (stone, glass, steel), and natural light.
            </p>
          </div>
          <div className="lg:col-span-6">
            <ImageReveal>
              <div className="aspect-[4/3] overflow-hidden ghost-border p-2 bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  alt="Architecture monograph mockup"
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-surface-container border-t border-gold-muted/10">
        <div className="section-container max-w-[1440px] mx-auto">
          <RevealOnScroll className="max-w-3xl mb-16 md:mb-24" y={15}>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block mb-3">
              THE DIRECTORS
            </span>
            <h2 className="font-display-lg text-3xl md:text-headline-lg text-on-surface">
              Design & Construction Leadership
            </h2>
          </RevealOnScroll>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((member) => (
              <div
                key={member._id}
                className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start group"
              >
                <div className="sm:col-span-5 relative overflow-hidden ghost-border p-1 bg-surface-container-low aspect-[4/5] sm:aspect-auto sm:h-[260px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    src={member.photo?.asset?.url}
                  />
                </div>
                <div className="sm:col-span-7 space-y-4 pt-2">
                  <div>
                    <h3 className="font-playfair text-2xl text-on-surface group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-label-caps text-[9px] text-primary tracking-widest uppercase">
                      {member.position}
                    </p>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant/80 leading-relaxed">
                    {member.biography}
                  </p>
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-fixed font-label-caps text-[9px] tracking-widest border-b border-primary/20 pb-1"
                    >
                      LINKEDIN DOSSIER
                    </a>
                  )}
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="py-20 md:py-32 max-w-[900px] mx-auto px-6">
        <RevealOnScroll className="text-center mb-16 md:mb-24" y={15}>
          <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block mb-3">
            JOURNEY
          </span>
          <h2 className="font-display-lg text-3xl md:text-headline-lg text-on-surface">
            Legacy Milestones
          </h2>
        </RevealOnScroll>

        <div className="space-y-12 relative border-l border-gold-muted/20 pl-8 md:pl-12 ml-4">
          {[
            { year: "2012", title: "Inception in Lagos", desc: "Studio set up with focus on bespoke private luxury residences in Lekki Phase 1." },
            { year: "2016", title: "BIM Integration", desc: "Full shift to BIM virtual modeling, syncing construction frames with architecture." },
            { year: "2020", title: "Regional Expansion", desc: "Opened coordinate office presence in Lusaka, managing mixed-use estates." },
            { year: "2023", title: "Urban Excellence Award", desc: "Awarded 'Best Structural Execution' for coastal cantilevers in Lake Como." },
          ].map((mile) => (
            <RevealOnScroll key={mile.year} className="relative space-y-2" y={15}>
              <div className="absolute -left-[45px] md:-left-[61px] top-1.5 w-6 h-6 rounded-full bg-background border border-primary flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              </div>
              <span className="font-display-lg text-xl text-primary font-bold italic block">
                {mile.year}
              </span>
              <h4 className="font-playfair text-xl text-on-surface">{mile.title}</h4>
              <p className="font-body-md text-sm text-on-surface-variant/80 leading-relaxed max-w-xl">
                {mile.desc}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Contact redirection CTA */}
      <section className="py-16 text-center border-t border-gold-muted/10 bg-surface-container-low">
        <Link href="/contact">
          <Button variant="primary" className="tracking-[0.25em]">
            CONNECT WITH OUR DIRECTORS
          </Button>
        </Link>
      </section>
    </div>
  );
}
