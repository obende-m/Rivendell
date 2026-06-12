"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProjects } from "@/lib/sanity/queries";
import { Project } from "@/lib/sanity/types";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { cn } from "@/lib/utils";

const CATEGORIES = ["ALL", "RESIDENTIAL", "COMMERCIAL", "ARCHITECTURE", "CONSTRUCTION", "MIXED USE"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    async function loadData() {
      const data = await getProjects();
      setProjects(data);
    }
    loadData();
  }, []);

  // Filter projects statefully
  const filteredProjects = projects.filter((p) => {
    if (filter === "ALL") return true;
    if (filter === "MIXED USE") return p.category === "mixed-use";
    return p.category.toUpperCase() === filter;
  });

  return (
    <div className="pt-24 min-h-screen bg-background">
      <main className="max-w-[1440px] mx-auto px-6 md:px-16 overflow-hidden">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <RevealOnScroll className="lg:col-span-8" y={15}>
              <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] mb-6 block">
                ARCHITECTURE & DESIGN
              </span>
              <h1 className="font-display-xl text-4xl sm:text-6xl md:text-display-xl text-on-surface mb-8 leading-tight">
                Legacy through <br />
                <span className="italic text-primary">Precision.</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll className="lg:col-span-4 flex items-end" y={15} delay={0.2}>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm mb-4 leading-relaxed">
                Curating a portfolio of monumental landmarks that redefine luxury living and commercial excellence across the globe.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Category Filters Bar */}
        <section className="mb-16 border-b border-gold-muted/20 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-wrap gap-4 md:gap-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "font-label-caps text-label-caps pb-2 transition-all cursor-pointer text-[10px] tracking-wider",
                  filter === cat
                    ? "text-primary border-b-2 border-primary"
                    : "text-on-surface/60 hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-4 text-on-surface-variant/40">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "font-label-caps text-[10px] tracking-widest cursor-pointer hover:text-primary transition-colors",
                view === "grid" ? "text-primary" : "text-on-surface-variant/40"
              )}
            >
              VIEW: GRID
            </button>
            <span className="h-4 w-[0.5px] bg-gold-muted/20" />
            <button
              onClick={() => setView("list")}
              className={cn(
                "font-label-caps text-[10px] tracking-widest cursor-pointer hover:text-primary transition-colors",
                view === "list" ? "text-primary" : "text-on-surface-variant/40"
              )}
            >
              LIST
            </button>
          </div>
        </section>

        {/* Grid and List displays */}
        {view === "grid" ? (
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 md:mb-36">
            {filteredProjects.map((p, idx) => {
              const cycleIdx = idx % 4;
              let colSpan = "md:col-span-6";
              let aspect = "aspect-video";

              if (cycleIdx === 0) {
                colSpan = "md:col-span-8";
                aspect = "aspect-[16/9]";
              } else if (cycleIdx === 1) {
                colSpan = "md:col-span-4";
                aspect = "aspect-[4/5]";
              } else if (cycleIdx === 2) {
                colSpan = "md:col-span-4";
                aspect = "aspect-square";
              } else if (cycleIdx === 3) {
                colSpan = "md:col-span-8";
                aspect = "aspect-[16/9]";
              }

              const imgUrl =
                p.featuredImage?.asset?.url ||
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

              return (
                <div
                  key={p._id}
                  className={cn(
                    "group project-card overflow-hidden relative fade-up border border-gold-muted/5 p-1 bg-surface-container",
                    colSpan,
                    aspect
                  )}
                >
                  <div className="w-full h-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-full h-full object-cover transition-slow duration-1000 group-hover:scale-105"
                      alt={p.name}
                      src={imgUrl}
                    />
                  </div>
                  {/* Hover Overlay info */}
                  <div className="project-overlay absolute inset-0 bg-background/85 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 md:p-10 z-10">
                    <span className="font-label-caps text-[10px] text-primary tracking-widest mb-2 block uppercase">
                      {p.category.toUpperCase()} • {p.location?.toUpperCase() || "GLOBAL"}
                    </span>
                    <h3 className="font-playfair text-2xl md:text-4xl text-on-surface mb-6 leading-tight">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="h-[1px] w-12 bg-primary inline-block" />
                      <Link
                        className="font-label-caps text-[10px] text-on-surface hover:text-primary transition-colors tracking-widest"
                        href={`/projects/${p.slug.current}`}
                      >
                        EXPLORE PROJECT
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggerChildren>
        ) : (
          /* List Display */
          <div className="space-y-4 mb-24 md:mb-36">
            {filteredProjects.map((p) => (
              <div
                key={p._id}
                className="border-b border-gold-muted/10 py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group hover:bg-surface-container/20 transition-all px-4"
              >
                <div className="md:col-span-3">
                  <span className="font-label-caps text-[9px] text-primary block tracking-wider uppercase mb-1">
                    {p.category.toUpperCase()}
                  </span>
                  <Link
                    href={`/projects/${p.slug.current}`}
                    className="font-playfair text-2xl text-on-surface group-hover:text-primary transition-colors duration-300"
                  >
                    {p.name}
                  </Link>
                </div>
                <div className="md:col-span-5 font-body-md text-sm text-on-surface-variant/80">
                  {p.challenge || "Precision-driven architectural masterwork."}
                </div>
                <div className="md:col-span-2 font-label-caps text-[9px] text-on-surface-variant tracking-wider uppercase">
                  {p.location || "GLOBAL"}
                </div>
                <div className="md:col-span-2 text-right">
                  <Link
                    href={`/projects/${p.slug.current}`}
                    className="font-label-caps text-[9px] tracking-widest text-primary hover:text-primary-fixed border-b border-primary/20 pb-1"
                  >
                    CASE STUDY —
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
