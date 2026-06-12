"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { VerticalLine } from "@/components/ui/VerticalLine";

interface AboutPreviewProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  image1?: any;
  image2?: any;
}

export function AboutPreview({
  eyebrow = "ESTABLISHED",
  heading = "Crafting Space with Intention",
  description = "At Rivendell Consults, we believe that luxury is found in the meticulous details. Our approach blends architectural precision with an ethereal aesthetic, creating spaces that are not just structures, but lasting legacies.",
  ctaText = "Our Story",
  ctaLink = "/about",
  image1,
  image2,
}: AboutPreviewProps) {
  const img1Url =
    image1?.asset?.url ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAINeFA-sCMvI_x1nuHABNOg6SqP_3Kye3ZGU-jBrfJzwfaTDF29b9H4OuDoi1e7IeKyFASkqnklFk5P12zjGngUTgfxwSyIA-1cwH25mtf2i3Tf-R7W7Ya33owTSqmS7P5JoTJnouVdKU36VqGpO4yKqSAycbjN9tHLbHCWkiwbMDaYwxOJA8T0LO4mMeGb94v5VA2Z4gMyX07q9yuAe8ipwUpGh--aJjAGhTD7ttfJW_xoBS2f2KjN9Pp2a_KQI-jwIg205WqnHgk";
  const img2Url =
    image2?.asset?.url ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD3HvNWxYOvNpmrKFv0tT9ZtzcXy3I-OVfFSk-hi-DqfaE7m1a9M7j_Hp6WAzNL5gA4dI9bnjEw8-oTV6kpilkMOA3WEi1U0d5VQE-bDH8174jdLDZ1NOPo9XKxq22dQuvKFzuvVfF6fzjtUEUFYRPSpoWXd3ezIaRZhZK-lVnenbIohamnBMM9wEPd1jEldnKj7761Fh1SaAkTF2t9EFVg9IAR5WG79gTjQU2k90evQI_rr4Eu4eHbdW_x_67I9O5fSqSdDbW0DGgV";

  return (
    <section className="py-20 md:py-32 bg-surface-container-low px-grid-margin overflow-hidden relative">
      {/* Decorative Est background text */}
      <div className="absolute top-12 left-12 font-display-xl text-[120px] md:text-[200px] text-on-surface/[0.02] pointer-events-none select-none">
        Est.
      </div>

      <div className="section-container max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        {/* Left Copy */}
        <RevealOnScroll className="lg:col-span-5 relative z-10" y={20}>
          <span className="font-label-caps text-label-caps text-primary mb-4 tracking-[0.4em] uppercase block">
            {eyebrow}
          </span>
          <h2 className="font-display-lg text-3xl md:text-headline-lg text-on-surface mb-8 leading-tight">
            {heading.includes("with Intention") ? (
              <>
                Crafting Space <br />
                with <span className="italic text-primary">Intention</span>
              </>
            ) : (
              heading
            )}
          </h2>
          <VerticalLine className="mb-8" />
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 leading-relaxed">
            {description}
          </p>
          <Link
            href={ctaLink}
            className="group inline-flex items-center font-label-caps text-label-caps text-primary tracking-[0.2em] uppercase transition-colors"
          >
            {ctaText}
            <span className="material-symbols-outlined ml-4 text-base transition-transform group-hover:translate-x-2">
              arrow_forward
            </span>
          </Link>
        </RevealOnScroll>

        {/* Right Images */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-6 mt-12 lg:mt-0">
          <div className="pt-16 md:pt-24">
            <ImageReveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full aspect-[4/5] object-cover ghost-border p-2 bg-surface"
                alt="High-end finishes"
                src={img1Url}
              />
            </ImageReveal>
          </div>
          <div>
            <ImageReveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full aspect-[4/5] object-cover ghost-border p-2 bg-surface"
                alt="Minimalist design interior"
                src={img2Url}
              />
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
