"use client";

import Link from "next/link";
import { Project } from "@/lib/sanity/types";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Button } from "@/components/ui/Button";

interface SignatureProjectsProps {
  eyebrow?: string;
  heading?: string;
  ctaText?: string;
  projects?: Project[];
}

export function SignatureProjects({
  eyebrow = "The Portfolio",
  heading = "Signature Projects",
  ctaText = "View Archive",
  projects,
}: SignatureProjectsProps) {
  const projectList = projects?.slice(0, 2) || [];

  return (
    <section className="py-20 md:py-32 bg-surface-container-lowest px-6 md:px-12 lg:px-16">
      <div className="section-container max-w-[1440px] mx-auto">
        {/* Title row */}
        <RevealOnScroll
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6"
          y={15}
        >
          <div className="max-w-2xl">
            <span className="font-label-caps text-label-caps text-primary mb-4 tracking-[0.4em] uppercase block">
              {eyebrow}
            </span>
            <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg">
              {heading}
            </h2>
          </div>
          <Link
            href="/projects"
            className="font-label-caps text-xs tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300 inline-flex items-center gap-2"
          >
            {ctaText.toUpperCase()} —
          </Link>
        </RevealOnScroll>

        {/* Alternating Projects Grid */}
        <div className="space-y-24 md:space-y-36">
          {projectList.map((project, index) => {
            const isEven = index % 2 === 1;
            const imgUrl =
              project.featuredImage?.asset?.url ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

            return (
              <div
                key={project._id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center group"
              >
                {/* Asymmetric Image Frame */}
                <div
                  className={`lg:col-span-7 relative overflow-hidden ${
                    isEven ? "lg:order-2" : ""
                  }`}
                >
                  <ImageReveal>
                    <div className="aspect-[16/9] overflow-hidden ghost-border p-2 bg-surface-container">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        alt={project.name}
                        src={imgUrl}
                      />
                    </div>
                  </ImageReveal>
                </div>

                {/* Details Section */}
                <div
                  className={`lg:col-span-5 pt-8 lg:pt-0 ${
                    isEven ? "lg:order-1 lg:pr-12" : "lg:pl-12"
                  }`}
                >
                  <RevealOnScroll delay={0.1}>
                    <span className="font-label-caps text-[10px] tracking-[0.25em] text-primary/75 mb-3 block uppercase">
                      {project.location?.toUpperCase() || "GLOBAL"} |{" "}
                      {project.category.toUpperCase()}
                    </span>
                    <h3 className="font-playfair text-3xl md:text-4xl mb-6 text-on-surface group-hover:text-primary transition-colors duration-500">
                      {project.name}
                    </h3>
                    <p className="font-body-md text-on-surface-variant leading-relaxed text-sm mb-8 max-w-lg">
                      {project.challenge ||
                        "An exceptional architectural milestone balancing material textures with local settings."}
                    </p>
                    <Link href={`/projects/${project.slug?.current}`}>
                      <Button variant="outline">View Case Study</Button>
                    </Link>
                  </RevealOnScroll>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
