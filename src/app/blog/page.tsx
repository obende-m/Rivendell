import { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity/queries";
import { Button } from "@/components/ui/Button";
import { GhostBorder } from "@/components/ui/GhostBorder";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Read our latest insights, architectural reviews, and construction highlights from Rivendell Consults.",
};

export default async function BlogPage() {
  // Return a clean placeholder state for blog posts
  return (
    <div className="pt-24 min-h-screen bg-background text-on-surface">
      {/* Header */}
      <section className="py-12 md:py-20 max-w-[1440px] mx-auto px-6 md:px-16 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <RevealOnScroll className="lg:col-span-8 space-y-6" y={15}>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block mb-2">
              JOURNAL & INSIGHTS
            </span>
            <h1 className="font-display-xl text-4xl sm:text-6xl md:text-5xl lg:text-6xl max-w-4xl text-on-surface leading-none uppercase">
              Rivendell <br />
              <span className="italic text-primary">Insights.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll className="lg:col-span-4 flex items-end animate-delay-200" y={15}>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm mb-4 leading-relaxed">
              Sharing our expertise on luxury topographies, post-tension slabs, real estate target yields, and interior styling.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Grid empty state placeholder */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-16 border-t border-gold-muted/10 mb-16">
        <div className="text-center py-24 border border-gold-muted/10 max-w-xl mx-auto p-12 bg-surface-container/20">
          <span className="material-symbols-outlined text-4xl text-primary/30 mb-4 block select-none">
            rss_feed
          </span>
          <h3 className="font-playfair text-2xl text-on-surface mb-3 italic">
            Insights Log Seeding Soon
          </h3>
          <p className="font-body-md text-xs text-on-surface-variant/80 leading-relaxed mb-8">
            We are curating a collection of design monographs and site analysis reports. Sign up for our newsletter to get notified on release.
          </p>
          <Link href="/contact">
            <Button variant="outline">SUBSCRIBE TO INSIGHTS</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
