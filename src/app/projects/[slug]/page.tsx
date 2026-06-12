import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getProjects } from "@/lib/sanity/queries";
import { Button } from "@/components/ui/Button";
import { GhostBorder } from "@/components/ui/GhostBorder";
import { VerticalLine } from "@/components/ui/VerticalLine";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { InquiryForm } from "@/components/forms/InquiryForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description:
      project.challenge ||
      `Case study on ${project.name} by Rivendell Consults. ${project.location}`,
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug.current,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const heroImg =
    project.heroImage?.asset?.url ||
    project.featuredImage?.asset?.url ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="bg-background text-on-surface">
      {/* Dynamic Project Hero */}
      <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={project.name}
            className="w-full h-full object-cover scale-105"
            src={heroImg}
          />
          <div className="absolute inset-0 hero-overlay bg-black/40" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end section-container max-w-[1440px] mx-auto pb-16 md:pb-24">
          <RevealOnScroll y={15}>
            <span className="font-label-caps text-label-caps text-primary mb-4 tracking-[0.4em] uppercase block">
              {project.category.toUpperCase()} ARCHITECTURE
            </span>
            <h1 className="font-display-xl text-4xl sm:text-6xl md:text-display-xl max-w-4xl text-on-surface leading-none">
              {project.name}
            </h1>
            <div className="w-24 h-px bg-primary/60 mt-8" />
          </RevealOnScroll>
        </div>
      </section>

      {/* Narrative & Specification Sidebar */}
      <section className="py-20 md:py-32 section-container max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Narrative details */}
        <div className="lg:col-span-7 space-y-12">
          {/* The Vision */}
          <RevealOnScroll className="space-y-6" y={15}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[0.5px] bg-primary" />
              <span className="font-label-caps text-label-caps text-on-surface-variant/80 uppercase">
                THE VISION
              </span>
            </div>
            <h2 className="font-display-lg text-3xl italic leading-tight text-on-surface">
              A sanctuary of geometric precision and natural harmony.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant/90 leading-relaxed">
              {project.challenge ||
                "Sarai Situs was born from a challenge to redefine luxury living within a dense topography. The objective was to create a permanent structure that felt light, almost ethereal."}
            </p>
            {project.approach && (
              <p className="font-body-md text-body-md text-on-surface/75 leading-relaxed">
                {project.approach}
              </p>
            )}
          </RevealOnScroll>

          {/* The Execution (alternate specs check) */}
          {project.solution && (
            <RevealOnScroll className="space-y-6 pt-8 border-t border-gold-muted/10" y={15}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-[0.5px] bg-primary" />
                <span className="font-label-caps text-label-caps text-on-surface-variant/80 uppercase">
                  THE EXECUTION
                </span>
              </div>
              <h3 className="font-display-lg text-2xl italic leading-tight text-on-surface">
                Precision is the language of luxury.
              </h3>
              <p className="font-body-md text-body-md text-on-surface/75 border-l border-primary/40 pl-8 leading-relaxed">
                {project.solution}
              </p>
              {project.results && (
                <p className="font-body-md text-body-md text-on-surface/70 leading-relaxed">
                  {project.results}
                </p>
              )}
            </RevealOnScroll>
          )}
        </div>

        {/* Right Column: Sticky specs box */}
        <div className="lg:col-span-4 lg:col-start-9">
          <RevealOnScroll y={15} delay={0.15}>
            <GhostBorder className="p-8 md:p-10 sticky top-32">
              <h3 className="font-label-caps text-label-caps text-primary mb-8 tracking-[0.2em] uppercase">
                PROJECT SPECS
              </h3>
              <div className="space-y-8">
                <div>
                  <p className="font-label-caps text-[9px] text-on-surface-variant mb-1.5 tracking-wider uppercase">
                    LOCATION
                  </p>
                  <p className="font-display-lg text-2xl md:text-3xl italic text-on-surface">
                    {project.location || "Horizon District"}
                  </p>
                </div>
                <div>
                  <p className="font-label-caps text-[9px] text-on-surface-variant mb-1.5 tracking-wider uppercase">
                    CLIENT
                  </p>
                  <p className="font-display-lg text-2xl md:text-3xl italic text-on-surface">
                    {project.client || "Private Commission"}
                  </p>
                </div>
                <div>
                  <p className="font-label-caps text-[9px] text-on-surface-variant mb-1.5 tracking-wider uppercase">
                    YEAR
                  </p>
                  <p className="font-display-lg text-2xl md:text-3xl italic text-on-surface">
                    {project.year || "2024"}
                  </p>
                </div>
                <div>
                  <p className="font-label-caps text-[9px] text-on-surface-variant mb-1.5 tracking-wider uppercase">
                    STATUS
                  </p>
                  <p className="font-display-lg text-2xl md:text-3xl italic text-primary uppercase">
                    {project.status}
                  </p>
                </div>
              </div>
            </GhostBorder>
          </RevealOnScroll>
        </div>
      </section>

      {/* Bento Image Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="bg-surface-container py-20 md:py-32">
          <div className="section-container max-w-[1440px] mx-auto">
            <RevealOnScroll className="mb-12" y={15}>
              <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] uppercase block mb-3">
                CURATED PERSPECTIVES
              </span>
              <h2 className="font-display-lg text-3xl md:text-headline-lg text-on-surface">
                Meticulous Details
              </h2>
            </RevealOnScroll>

            {/* Asymmetric Bento Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {project.gallery.map((item, idx) => {
                const cycle = idx % 3;
                let colSpan = "md:col-span-4 h-[284px]";
                if (cycle === 0) {
                  colSpan = "md:col-span-8 h-[400px] md:h-[600px]";
                }

                const itemImg =
                  item.image?.asset?.url ||
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

                return (
                  <div
                    key={idx}
                    className={`group relative overflow-hidden ghost-border p-1 bg-surface ${colSpan}`}
                  >
                    <ImageReveal>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt={item.caption || `Gallery visual ${idx + 1}`}
                        src={itemImg}
                      />
                    </ImageReveal>
                    {item.caption && (
                      <div className="absolute bottom-4 left-4 z-10 bg-background/60 backdrop-blur-md px-3 py-1 bg-black/40">
                        <span className="font-label-caps text-[8px] text-white/85 tracking-widest uppercase">
                          {item.caption.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Form & Related Section */}
      <section className="py-20 md:py-32 section-container max-w-[1440px] mx-auto border-t border-gold-muted/10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Inquiry Form */}
        <RevealOnScroll className="lg:col-span-6 space-y-8" y={15}>
          <div>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] uppercase block mb-3">
              INQUIRE
            </span>
            <h3 className="font-display-lg text-3xl italic text-on-surface">
              Arrange an inspection or request particulars.
            </h3>
          </div>
          <InquiryForm projectName={project.name} />
        </RevealOnScroll>

        {/* Lead Partners / Architect info */}
        <RevealOnScroll className="lg:col-span-5 lg:col-start-8 space-y-8" y={15} delay={0.15}>
          <div>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] uppercase block mb-3">
              COLLABORATORS
            </span>
            <h3 className="font-display-lg text-3xl italic text-on-surface">
              Crafting legacies with experts.
            </h3>
          </div>
          <div className="space-y-6 font-body-md text-sm text-on-surface-variant leading-relaxed">
            <div className="border-b border-gold-muted/10 pb-4">
              <p className="font-label-caps text-[9px] text-primary/75 tracking-wider uppercase mb-1">
                LEAD ARCHITECT
              </p>
              <p className="text-on-surface font-semibold">{project.architect || "Alistair Vance"}</p>
            </div>
            {project.contractor && (
              <div className="border-b border-gold-muted/10 pb-4">
                <p className="font-label-caps text-[9px] text-primary/75 tracking-wider uppercase mb-1">
                  MAIN CONTRACTOR
                </p>
                <p className="text-on-surface font-semibold">{project.contractor}</p>
              </div>
            )}
            <div>
              <p className="font-label-caps text-[9px] text-primary/75 tracking-wider uppercase mb-3">
                PROJECT DOWNLOADS
              </p>
              <Button variant="outline" className="w-full text-center">
                DOWNLOAD PDF DOSSIER
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Bottom CTA to Projects list */}
      <section className="py-16 text-center border-t border-gold-muted/10 bg-surface-container-low">
        <Link href="/projects">
          <Button variant="ghost" className="tracking-[0.25em]">
            BACK TO PORTFOLIO ARCHIVE
          </Button>
        </Link>
      </section>
    </div>
  );
}
