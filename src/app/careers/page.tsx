import { Metadata } from "next";
import Link from "next/link";
import { getCareers } from "@/lib/sanity/queries";
import { Button } from "@/components/ui/Button";
import { GhostBorder } from "@/components/ui/GhostBorder";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { StaggerChildren } from "@/components/animations/StaggerChildren";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore career opportunities at Rivendell Consults, and join our team of world-class architects, engineers, and designers.",
};

export default async function CareersPage() {
  const jobs = await getCareers();

  return (
    <div className="pt-24 min-h-screen bg-background text-on-surface">
      {/* Header */}
      <section className="py-12 md:py-20 max-w-[1440px] mx-auto px-6 md:px-16 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <RevealOnScroll className="lg:col-span-8 space-y-6" y={15}>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block mb-2">
              JOIN THE LEGACY
            </span>
            <h1 className="font-display-xl text-4xl sm:text-6xl md:text-5xl lg:text-6xl max-w-4xl text-on-surface leading-none uppercase">
              Join Our <br />
              <span className="italic text-primary">Team.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll className="lg:col-span-4 flex items-end animate-delay-200" y={15}>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm mb-4 leading-relaxed">
              We look for meticulous designers, detail-driven engineers, and visionaries committed to architectural perfection.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Jobs list */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-16 border-t border-gold-muted/10 mb-16">
        {jobs.length > 0 ? (
          <StaggerChildren className="space-y-8">
            {jobs.map((job) => (
              <GhostBorder
                key={job._id}
                className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="space-y-3">
                  <span className="font-label-caps text-[9px] text-primary tracking-widest block uppercase">
                    {job.department.toUpperCase()} • {job.type.toUpperCase()}
                  </span>
                  <h3 className="font-playfair text-2xl text-on-surface">{job.title}</h3>
                  <p className="font-body-md text-xs text-on-surface-variant max-w-xl">
                    {job.location} | Active position. Click to read specifications.
                  </p>
                </div>
                <Link href={`/contact?subject=Application+for+${job.title}`}>
                  <Button variant="outline">Apply Now</Button>
                </Link>
              </GhostBorder>
            ))}
          </StaggerChildren>
        ) : (
          <div className="text-center py-20 border border-gold-muted/10 max-w-xl mx-auto p-8 bg-surface-container/20">
            <span className="material-symbols-outlined text-4xl text-primary/30 mb-4 block select-none">
              group_add
            </span>
            <h3 className="font-playfair text-xl text-on-surface mb-2">
              No Open Positions
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-6">
              We are not currently recruiting, but we are always open to hearing from
              exceptional talent. Send your portfolio and dossier directly.
            </p>
            <Link href="/contact">
              <Button variant="outline">SEND DOSSIER</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
