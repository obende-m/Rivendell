"use client";

import Link from "next/link";
import { CTAFields } from "@/lib/sanity/types";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

interface CTASectionProps {
  data?: CTAFields;
}

export function CTASection({ data }: CTASectionProps) {
  const heading = data?.ctaHeading || "Let's Build Something Extraordinary";
  const description =
    data?.ctaDescription ||
    "Your legacy deserves the precision and dedication of Rivendell Consults. Connect with our principal consultants today.";
  const buttonText = data?.ctaButtonText || "Book Consultation";
  const buttonLink = data?.ctaButtonLink || "/contact";
  const bgImg =
    data?.ctaBackgroundImage?.asset?.url ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuASuv0TBtpnAieebk_bSimvo3cg9Mum5n67rJpHcitCRtGoaMPwQw8RhMf-BrESLXgZig-oNG_htsae0xFDVgoedUn_F-7NXki832nyQv5BFEmDSGK0CZ-LnX5bfOqjUulx0zMegIyWfCMgcGyagfy7Cdy8Ggq1OfNsz0dSNZYEkbWbiVkwibrYp7Yn3xpuMcrXUQOM8UROH2McIQHuZSo4zwLGgWXnFqWurMgalfInF37Bl5-VcUF77t50cmh5kYgCIjHLbEetRSu1";

  return (
    <section className="relative py-24 md:py-36 px-grid-margin overflow-hidden text-center bg-background border-t border-gold-muted/10">
      {/* Background Image Parallax frame */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full object-cover opacity-25 scale-105"
          alt="Architectural detailing perspective"
          src={bgImg}
        />
        {/* Radial mask gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto relative z-10">
        <RevealOnScroll className="max-w-4xl mx-auto flex flex-col items-center" y={20}>
          <h2 className="font-display-lg text-[32px] sm:text-4xl md:text-display-lg mb-8 text-on-surface leading-tight">
            {heading.includes("Extraordinary") ? (
              <>
                Let&apos;s Build Something <br />
                <span className="italic text-primary">Extraordinary</span>
              </>
            ) : (
              heading
            )}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-12">
            {description}
          </p>
          <Link href={buttonLink}>
            <Button variant="primary" className="shadow-2xl shadow-primary/25">
              {buttonText}
            </Button>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
