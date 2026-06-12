import { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/sanity/queries";
import { Button } from "@/components/ui/Button";
import { GhostBorder } from "@/components/ui/GhostBorder";
import { VerticalLine } from "@/components/ui/VerticalLine";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { StaggerChildren } from "@/components/animations/StaggerChildren";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Rivendell Consults provides industry-leading Architectural Design, Construction Management, and luxury Real Estate development curations.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="pt-24 min-h-screen bg-background">
      {/* Services Header */}
      <section className="py-12 md:py-20 max-w-[1440px] mx-auto px-6 md:px-16 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <RevealOnScroll className="lg:col-span-8" y={15}>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] mb-6 block">
              CAPABILITIES
            </span>
            <h1 className="font-display-xl text-4xl sm:text-6xl md:text-display-xl text-on-surface mb-8 leading-tight">
              Ecosystem of <br />
              <span className="italic text-primary">Excellence.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll className="lg:col-span-4 flex items-end animate-delay-200" y={15}>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm mb-4 leading-relaxed">
              We offer integrated architectural, engineering, and asset curation services tailored to the highest standards.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Division 1: Architectural Design */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-16 border-t border-gold-muted/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <ImageReveal>
              <div className="aspect-[16/9] overflow-hidden ghost-border p-2 bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  alt="Minimalist Architecture design"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwgRTwD_COc9SVVqrXDI-9-TYpTFxaZLQSHYCs4DGCikTT0koTeYgN5LWPir6yguyvd56G-fhNdSXEC9muF8P0AVlh1aHmRbbeswMhuLQSGruny0mFZqfMYFAAeK56aqc3XQakNbrOn-9QMaJK8c9NnR5esIhAHrEuP4VFKy_dlJg-UBPJfKlIBrkPC8mc_DpAQT7iyc4vliPaVSFpQdJRUsuATZBrGXQx4XQoDmABxGNCYLhNET3_d6oUDCN7vuva0GfkpS-A9hXX"
                />
              </div>
            </ImageReveal>
            <div className="max-w-2xl space-y-6">
              <h2 className="font-display-lg text-3xl md:text-headline-lg text-on-surface">
                Architectural Design
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                We believe in architecture that transcends time. Our designs are born from a rigorous dialogue between context, materiality, and the human condition.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="border-l border-primary/50 pl-6 space-y-2">
                  <span className="font-label-caps text-label-caps text-primary block text-xs tracking-wider">
                    01. PHILOSOPHY
                  </span>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Contextual integration and structural honesty define our creative process.
                  </p>
                </div>
                <div className="border-l border-primary/50 pl-6 space-y-2">
                  <span className="font-label-caps text-label-caps text-primary block text-xs tracking-wider">
                    02. EXECUTION
                  </span>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    State-of-the-art BIM modeling ensures every millimeter is accounted for.
                  </p>
                </div>
              </div>
              <div className="pt-8">
                <Link href="/services/architecture">
                  <Button variant="ghost">EXPLORE ARCHITECTURE —</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar Consultation Promo */}
          <div className="lg:col-span-4 lg:col-start-9 bg-surface-container p-8 md:p-12 border border-gold-muted/10 sticky top-32">
            <span className="font-label-caps text-xs text-primary block mb-4 uppercase tracking-widest">
              Direct Access
            </span>
            <h3 className="font-display-lg text-3xl text-on-surface mb-6 italic">
              Ready to build?
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
              Schedule a 30-minute discovery call with our Lead Architect to discuss your vision and project feasibility.
            </p>
            <Link href="/contact" className="w-full block">
              <Button variant="primary" className="w-full text-center">
                BOOK CONSULTATION
              </Button>
            </Link>
            <div className="space-y-4 pt-8 mt-8 border-t border-gold-muted/10 font-body-md text-xs text-on-surface-variant/80">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-lg">verified</span>
                <span>Chartered RIBA Practice since 2012</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-lg">award_star</span>
                <span>Winner: Urban Excellence Awards 2023</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Division 2: Interior Curation */}
      <section className="bg-surface-container py-20 md:py-32 border-t border-gold-muted/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <RevealOnScroll className="lg:col-span-5 order-2 lg:order-1 space-y-6" y={15}>
            <span className="font-label-caps text-label-caps text-primary tracking-widest">
              INTERIOR CURATION
            </span>
            <h2 className="font-display-lg text-3xl md:text-headline-lg text-on-surface leading-tight">
              The Soul of the Space.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Interiors are where life happens. We curate bespoke environments that balance sensory richness with functional intelligence, sourcing rare materials from across the globe.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-6 border-b border-gold-muted/10 pb-4">
                <span className="font-display-lg text-2xl text-gold-muted font-bold">01</span>
                <span className="font-body-md text-on-surface">Material Selection & Procurement</span>
              </div>
              <div className="flex items-center gap-6 border-b border-gold-muted/10 pb-4">
                <span className="font-display-lg text-2xl text-gold-muted font-bold">02</span>
                <span className="font-body-md text-on-surface">Bespoke Furniture Design</span>
              </div>
              <div className="flex items-center gap-6 border-b border-gold-muted/10 pb-4">
                <span className="font-display-lg text-2xl text-gold-muted font-bold">03</span>
                <span className="font-body-md text-on-surface">Lighting Orchestration</span>
              </div>
            </div>
          </RevealOnScroll>
          <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
            <ImageReveal>
              <div className="aspect-[4/5] overflow-hidden ghost-border p-2 bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  alt="Minimalist Interior curation"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuByGv2x4vVNzoJJeOIUmF9ZmSdNgZrkouh02v04PaRMoAp1kbyYIlxy6xZuGFxgWC_gbMFFZSfXymZsIbhxWnBfqiaJMgi87yC1PatwZZ9iUUwtl_eF5kC0QSrHLpvKLn1nxBMdWT5UTHvDPw4tQAvBhIHXdqdroF5F8cMW3oKRV20pT-ucHunaVNRVqlSneMurjTHDOLd0hY37TNZSjuq2YASI9NCjd-jlwj-gAhP9ZJ6fzpfhWBPP-zJLhIhrQ5jDhvn3cr8PQlIh"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* Horizontal Lifecycle Timeline */}
      <section className="py-20 md:py-32 max-w-[1440px] mx-auto px-6 md:px-16 overflow-hidden bg-background">
        <RevealOnScroll className="text-center mb-16 md:mb-24" y={15}>
          <p className="font-label-caps text-label-caps text-primary mb-4 tracking-[0.3em] uppercase">
            LIFECYCLE
          </p>
          <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            The Rivendell Standard.
          </h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-gold-muted to-transparent z-0" />
          {[
            { icon: "lightbulb", name: "Discovery", desc: "Deep immersion into your lifestyle and aspirations for the space." },
            { icon: "architecture", name: "Blueprint", desc: "Developing the structural and aesthetic language of the project." },
            { icon: "construction", name: "Manifest", desc: "Meticulous construction management and artisanal execution." },
            { icon: "key", name: "Curation", desc: "Final finishing and styling to bring the architectural vision to life." },
          ].map((step) => (
            <RevealOnScroll key={step.name} className="relative z-10 text-center group" y={20}>
              <div className="w-24 h-24 bg-surface-container border border-gold-muted/20 mb-8 flex items-center justify-center mx-auto transition-all duration-500 group-hover:bg-primary group-hover:border-primary select-none cursor-default">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-3xl transition-colors duration-300">
                  {step.icon}
                </span>
              </div>
              <h4 className="font-label-caps text-label-caps text-primary mb-2 tracking-widest">
                {step.name.toUpperCase()}
              </h4>
              <p className="text-sm text-on-surface-variant/80 px-4 leading-relaxed">
                {step.desc}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Division 3: Construction Management */}
      <section className="bg-surface-container py-20 md:py-32 border-t border-gold-muted/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <ImageReveal>
                <div className="aspect-[3/4] overflow-hidden ghost-border p-1 bg-surface translate-y-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    alt="Precision joinery detail"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfnZhsL7BsA_dJemK4X1SkzvrwYCkstSs7aXjGgH1OmERaMgy9F0GcpOwS2w68cW4v2BXGzsAYouYIsdHEXbJUiko19hnD-PDD296IM5tIZzzfSIaKM0ZO0SjR-gAKwXaNk7IoeySxUqlm-SBOx-RrDcSS_ZPTUsAAB4gw2IS2IOtQqmsRfJ90-6WOEWfTZZOaY4mFfNYU0GPKl1bJwTw68FKWBflzg29Bo2YkfXLaeLFc3asLjEZh3m88yY3FZzcQTq3FoT2wWNoK"
                  />
                </div>
              </ImageReveal>
              <ImageReveal>
                <div className="aspect-[3/4] overflow-hidden ghost-border p-1 bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    alt="Construction site sunset"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2bPQg-QJ4mWuBPEWo7bu_badsyir8_uSPlZpQXAR24W7rFi-TIhuTO5ebBqsg4UHWyMidn9u8tGnQjVNjyXCkAlawh054mYmzfzGq3giSw_F6lgj7zGEIpwwKhx05wE__m5fA0gkY9d0lsS-SN67lv0hoD8WPNksuXAYyltempvT3JkHpUYL6yDfPkBsVl_XlWHrOc2pl0khL6gbyDj8MY9rRdeGh56p2KGHqhZBBxO9lgBl5s9Sv-1YgxW95nI8XjR2bARlFZOuN"
                  />
                </div>
              </ImageReveal>
            </div>
          </div>
          <RevealOnScroll className="lg:col-span-5 lg:col-start-8 space-y-6" y={15} delay={0.15}>
            <span className="font-label-caps text-label-caps text-primary tracking-widest">
              CONSTRUCTION MANAGEMENT
            </span>
            <h2 className="font-display-lg text-3xl md:text-headline-lg text-on-surface leading-tight">
              Uncompromising Construction.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Quality is never an accident; it is always the result of high intention, sincere effort, and skillful execution. Our construction team operates as master craftsmen.
            </p>
            <div className="pt-4">
              <Link href="/services/construction">
                <Button variant="ghost">EXPLORE CONSTRUCTION —</Button>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 md:py-32 max-w-[800px] mx-auto px-6">
        <RevealOnScroll className="text-center mb-16" y={15}>
          <span className="font-label-caps text-label-caps text-primary mb-3 block tracking-widest uppercase">
            ANSWERS
          </span>
          <h2 className="font-display-lg text-3xl md:text-headline-lg text-on-surface">
            Frequently Asked Questions
          </h2>
        </RevealOnScroll>
        <div className="space-y-4">
          {[
            { q: "What is your typical project timeline?", a: "Residential builds generally require 18 to 24 months from excavation to key handover, depending on topographies and complexities. Design phases take 3 to 6 months." },
            { q: "Do you handle local approvals and permits?", a: "Yes, our team handles all local regulatory filings, zoning approvals, structural compliance reviews, and environmental certifications." },
            { q: "Where do you source your construction materials?", a: "We source globally, acquiring premium marble from Carrara, smart structural components from Germany, and high-performance glazing from Belgium." },
          ].map((item) => (
            <details
              key={item.q}
              className="group border-b border-gold-muted/10 pb-4 cursor-pointer"
            >
              <summary className="font-playfair text-xl text-on-surface hover:text-primary transition-colors flex justify-between items-center py-4 list-none">
                <span>{item.q}</span>
                <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform duration-300">
                  expand_more
                </span>
              </summary>
              <p className="font-body-md text-sm text-on-surface-variant/80 pl-4 pb-4 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 text-center border-t border-gold-muted/10 bg-surface-container-low">
        <Link href="/contact">
          <Button variant="primary" className="tracking-[0.25em]">
            START YOUR LEGACY PROJECT
          </Button>
        </Link>
      </section>
    </div>
  );
}
