"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroFields } from "@/lib/sanity/types";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  data?: HeroFields;
}

export function HeroSection({ data }: HeroSectionProps) {
  const label = data?.heroLabel || "Building Legacies";
  const heading = data?.heroHeading || "Building Legacies Through Design";
  const subheading =
    data?.heroSubheading ||
    "Rivendell Consults delivers exceptional architecture, construction, and real estate developments through innovation, precision, and craftsmanship.";
  const primaryText = data?.primaryCtaText || "Explore Projects";
  const primaryLink = data?.primaryCtaLink || "/projects";
  const secondaryText = data?.secondaryCtaText || "Book Consultation";
  const secondaryLink = data?.secondaryCtaLink || "/contact";
  const videoUrl = data?.heroBackgroundVideo;
  const overlayStrength = data?.overlayStrength ?? 40;

  // Render video or fallback image
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-background">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic Dark Gradient Overlay */}
        <div
          className="absolute inset-0 z-10 hero-overlay"
          style={{
            backgroundColor: `rgba(19, 20, 18, ${overlayStrength / 100})`,
          }}
        />

        {videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-105"
            src={videoUrl}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="Luxury architecture backdrop"
            className="w-full h-full object-cover scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOwd2lQ3ZqDXRTlg8nsHtnymPmogmBQBQUgdR3QoUmNJeLgvX0dSEt2PKq-xupI4ManeUrYc8xDdo_fm5XKWLv8rg7fYjiaw_qnzGgUSAsuKZYnpu0tXQgqPph7VIMC370redoIpQlcxRTnONnhJcM7Br4-XJ7QaS2UKX3hKRHL89wKT1PQy10HAJp0No8odL3yVbvCvB9kdJLsCBcgzVDzVSvWj8wXVYKEgrwzGfD-cX2zb64tPhvEM25E6sXRZlpC1ZE1_yebH71"
          />
        )}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 section-container max-w-[1440px] mx-auto w-full pt-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-label-caps text-label-caps text-primary mb-6 tracking-[0.4em] uppercase block"
          >
            {label}
          </motion.span>

          {/* Heading with primary italic colors */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display-xl text-[44px] sm:text-[64px] md:text-display-xl text-[#FAF9F6] leading-[1.1] mb-8"
          >
            {heading.includes("Through Design") ? (
              <>
                Building Legacies <br />
                <span className="italic text-primary">Through Design</span>
              </>
            ) : (
              heading
            )}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-body-lg text-body-lg text-[#EAE8E2]/80 max-w-2xl mb-12"
          >
            {subheading}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link href={primaryLink}>
              <Button variant="primary">{primaryText}</Button>
            </Link>
            <Link href={secondaryLink}>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/60">
                {secondaryText}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>


    </section>
  );
}
