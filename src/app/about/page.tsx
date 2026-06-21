import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GhostBorder } from "@/components/ui/GhostBorder";
import { VerticalLine } from "@/components/ui/VerticalLine";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { StaggerChildren } from "@/components/animations/StaggerChildren";

export const metadata: Metadata = {
  title: "About the Firm",
  description:
    "Learn about Rivendell Consults, our architectural values, client experiences, and legacy milestones.",
};

export default async function AboutPage() {

  return (
    <div className="pt-24 min-h-screen bg-background text-on-surface">
      {/* Hero */}
      <section className="py-12 md:py-20 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <RevealOnScroll className="lg:col-span-8 space-y-6" y={15}>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block mb-2">
              THE FIRM
            </span>
            <h1 className="font-display-xl text-4xl sm:text-6xl md:text-5xl lg:text-6xl max-w-4xl text-on-surface leading-tight uppercase">
              Redefining Spaces <br />
              with <span className="italic text-primary">Precision, Style, & Innovation.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll className="lg:col-span-4 flex items-end animate-delay-200" y={15}>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm mb-4 leading-relaxed">
              Rivendell Consults is a leading construction and architectural firm in Lagos, Nigeria, with over 20 years of experience.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 border-t border-gold-muted/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[0.5px] bg-primary" />
              <span className="font-label-caps text-label-caps text-on-surface-variant/80 uppercase">
                THE STORY
              </span>
            </div>
            <h2 className="font-display-lg text-3xl md:text-headline-lg italic">
              Building Dreams, Creating Legacies
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              We specialize in new builds, remodeling, and repairs, delivering innovative designs and precision craftsmanship. Our customer-focused team ensures every project is tailored to meet your needs, budget, and timeline. At Rivendell, we exceed expectations by creating stylish, functional spaces that inspire.
            </p>
            <p className="font-body-md text-on-surface leading-relaxed border-l-2 border-primary/80 pl-6 italic font-semibold">
              We don’t just build structures — We craft experiences.
            </p>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              At Rivendell Consults, we specialize in bringing architectural dreams to life. We focus on creating functional, aesthetically pleasing spaces that align with modern trends and sustainable practices. Whether it’s designing innovative commercial spaces, crafting elegant residential homes, or undertaking large-scale construction projects, we thrive on challenges and deliver nothing short of excellence.
            </p>

            {/* Core Values Section */}
            <div className="pt-6 space-y-4">
              <h3 className="font-label-caps text-xs text-primary uppercase tracking-widest font-bold">
                Core Values
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {["Precision", "Craftsmanship", "Excellence", "Sustainability", "Integrity"].map((val) => (
                  <div key={val} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                    <span className="font-body-md text-sm text-on-surface">{val}</span>
                  </div>
                ))}
              </div>
            </div>
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

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-surface-container border-t border-gold-muted/10">
        <div className="section-container max-w-[1440px] mx-auto">
          <RevealOnScroll className="max-w-3xl mb-16 md:mb-24" y={15}>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block mb-3">
              TESTIMONIALS
            </span>
            <h2 className="font-display-lg text-3xl md:text-headline-lg text-on-surface">
              Client Testimonials
            </h2>
          </RevealOnScroll>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: "Ayoolanrewaju Kuyebi",
                position: "Managing Director",
                company: "GMH Luxury",
                testimonial:
                  "Working with Rivendell Consults was a seamless experience from start to finish. Their attention to detail, innovative designs, and commitment to excellence made our dream project a reality. We couldn't be happier with the result!",
                avatar:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
              },
              {
                name: "Modupeola Sonola",
                position: "Chief Operating Officer",
                company: "GMH Luxury",
                testimonial:
                  "Rivendell exceeded our expectations in every way. From the initial concept to the final touches, their team delivered outstanding craftsmanship and professionalism. Our new home is a perfect blend of style and functionality.",
                avatar:
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-primary/10 bg-surface-container-low/40 p-8 backdrop-blur-md shadow-sm transition-all duration-500 hover:border-primary/30 group flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-6 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="font-body-md text-base text-on-surface-variant/90 leading-relaxed italic mb-8">
                    &ldquo;{item.testimonial}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-gold-muted/10 pt-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-primary/20"
                    src={item.avatar}
                  />
                  <div>
                    <h3 className="font-playfair text-lg text-on-surface">
                      {item.name}
                    </h3>
                    <p className="font-label-caps text-[9px] text-primary tracking-widest uppercase">
                      {item.position}, {item.company}
                    </p>
                  </div>
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
            { year: "2006", title: "Inception in Lagos", desc: "Firm established in Lagos, specializing in custom residential designs and craftsmanship." },
            { year: "2012", title: "Lekki Operations Expansion", desc: "Expanded office operations to Lekki Phase 1, managing premium new builds and structural remodeling." },
            { year: "2018", title: "Construction Management Launch", desc: "Launched dedicated construction management and structural feasibility divisions." },
            { year: "2024", title: "Sustainable Integration", desc: "Shifted focus to eco-friendly planning, sustainable building codes, and green spaces planning." },
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
            CONNECT WITH US
          </Button>
        </Link>
      </section>
    </div>
  );
}
