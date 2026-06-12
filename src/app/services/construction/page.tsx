import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GhostBorder } from "@/components/ui/GhostBorder";
import { VerticalLine } from "@/components/ui/VerticalLine";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { StaggerChildren } from "@/components/animations/StaggerChildren";

export const metadata: Metadata = {
  title: "Construction Excellence Services",
  description:
    "Rivendell Consults specializes in high-quality structural engineering, general contracting, and zero-tolerance project compliance.",
};

export default function ConstructionServicePage() {
  return (
    <div className="pt-24 min-h-screen bg-background text-on-surface">
      {/* Grayscale Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 grayscale filter">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Heavy steel construction framing"
            className="w-full h-full object-cover scale-105"
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
          />
          <div className="absolute inset-0 hero-overlay bg-black/60" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end section-container max-w-[1440px] mx-auto pb-16">
          <RevealOnScroll y={15}>
            <span className="font-label-caps text-label-caps text-primary mb-4 tracking-[0.4em] block">
              ENGINEERED PERMANENCE
            </span>
            <h1 className="font-display-xl text-4xl sm:text-6xl md:text-5xl lg:text-6xl max-w-4xl text-on-surface leading-none uppercase">
              Construction <span className="italic text-primary">Excellence</span>
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      {/* Safety & Standards Section */}
      <section className="py-20 md:py-32 section-container max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Checklists */}
        <div className="lg:col-span-6 space-y-8">
          <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block">
            STANDARDS
          </span>
          <h2 className="font-display-lg text-3xl md:text-headline-lg italic">
            Zero-tolerance for error.
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Our construction procedures strictly comply with local safety guidelines, environmental standards, and premium structural audits.
          </p>
          <div className="space-y-4">
            {[
              "100% on-site safety compliance record",
              "Rigorous material stress and pressure testing",
              "Chartered engineers present for all structural pours",
              "Environmental impact mitigation strategies",
            ].map((std) => (
              <div key={std} className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-xl">
                  check_circle
                </span>
                <span className="font-body-md text-sm text-on-surface">{std}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Image */}
        <div className="lg:col-span-6">
          <ImageReveal>
            <div className="aspect-[4/3] overflow-hidden ghost-border p-2 bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                alt="Precision steel joints detail"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfnZhsL7BsA_dJemK4X1SkzvrwYCkstSs7aXjGgH1OmERaMgy9F0GcpOwS2w68cW4v2BXGzsAYouYIsdHEXbJUiko19hnD-PDD296IM5tIZzzfSIaKM0ZO0SjR-gAKwXaNk7IoeySxUqlm-SBOx-RrDcSS_ZPTUsAAB4gw2IS2IOtQqmsRfJ90-6WOEWfTZZOaY4mFfNYU0GPKl1bJwTw68FKWBflzg29Bo2YkfXLaeLFc3asLjEZh3m88yY3FZzcQTq3FoT2wWNoK"
              />
            </div>
          </ImageReveal>
        </div>
      </section>

      {/* Horizontal snapping gallery */}
      <section className="bg-surface-container py-20 md:py-32 overflow-hidden">
        <div className="section-container max-w-[1440px] mx-auto mb-12">
          <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block">
            built states
          </span>
          <h2 className="font-display-lg text-3xl md:text-headline-lg italic">
            Structural milestones.
          </h2>
        </div>

        {/* Scroll snapping container */}
        <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-6 md:px-16 py-6 no-scrollbar">
          {[
            { name: "Makarios Coastal Foundation", loc: "Mauritius", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKOnXHTqcjfpxsYKbIboHQqB0OjdzJUE_lD80PeyYtuw-1aph2CSKOtaLOJURVHjkhEso-xgHFF6QwoK7zf_bLV3jfY_zIp3kiA3FN8SzxJ5b-4VLUHP8K5Bqgsn1Kryj2v4OhWS589Zykr__iYxQq3E0VWnzVbYxsMAK7XvHDzdBy5pzKTFMbwhA5Yhj3FlHxvng6ICOkxBFyCj9a3kSUpkAxmQHU8slHhpv86l83jkj4yfgBYly8rQczGWXHvnJZOMvKpaOKcNnD" },
            { name: "Onyx Tower Concrete Frame", loc: "Dubai", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw9NwvEgqeXiIUNB5iNUgTkowlZl5qAV4ZhyzMo_a_8vrQMJaROM5naUENbpWjZDRve4fMGhidtaSnGP3bHDcD07G-ynMvxV5awe-WPumX4qDAV1hl55_J_fyIQbXKKWpHeHkzlahDb7sIvUhD_y3O4wjhs96h-xyfAsyCSqLp259HFx-H58rdcfPADXLlyg1LdB_D_d1CwE2TeqN2Lw2easSvpfKcNPueBhqbyvrEF_bgylEIiap89v_pqj5UINdCyniBAqnpriiy" },
            { name: "Sarai Situs Cantilever", loc: "Costa del Sol", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUQK4uiZomRrdKP2irFAXbdgY4vfVi5hh_jrc5YuUzDPed0wILFzBWNmIKGfde7ZtfVk8GwNbhIADQEj25C8zWgmTfvNWjtfJhIKlnaH49kp9EdrlHqzPobO36qNO7MTgoc6GUZMLLuCv_T2vOtEAJqI-efNUqTyIoSb-Rfpg7YHU4rTCra4R5zvlu0_xG_mFlJA4AwfdnNbaxnju4FEbu0EkYfqzpr63ncIRTZ4xI1rrzVXBhrjHPi3qwzaC3LrTHLhfYKd6sFmLE" },
          ].map((item) => (
            <div
              key={item.name}
              className="flex-shrink-0 w-[300px] md:w-[480px] snap-center bg-background border border-gold-muted/10 p-4 space-y-4 select-none group"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={item.name}
                  src={item.img}
                />
              </div>
              <div>
                <span className="font-label-caps text-[8px] text-primary tracking-widest uppercase mb-1 block">
                  {item.loc.toUpperCase()}
                </span>
                <h4 className="font-playfair text-lg text-on-surface">{item.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial / Final CTA */}
      <section className="py-20 md:py-32 section-container max-w-[1000px] mx-auto text-center">
        <RevealOnScroll className="space-y-8" y={15}>
          <span className="font-label-caps text-[10px] text-primary tracking-widest block uppercase">
            ENDORSEMENT
          </span>
          <p className="font-display-lg text-2xl md:text-3xl italic leading-relaxed text-on-surface">
            &ldquo;Their teams handle site complexities with absolute engineering authority. The concrete work is flawless.&rdquo;
          </p>
          <p className="font-label-caps text-xs text-primary tracking-widest">
            — VANCE STRUCTURAL AUDITS LTD
          </p>
        </RevealOnScroll>
      </section>

      {/* Footer link row */}
      <section className="py-16 text-center bg-surface-container-low border-t border-gold-muted/10 flex flex-col sm:flex-row gap-6 justify-center">
        <Link href="/projects">
          <Button variant="primary">VIEW BUILT PORTFOLIO</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline">BOOK STRUCTURAL AUDIT</Button>
        </Link>
      </section>
    </div>
  );
}
