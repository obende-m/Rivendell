"use client";

import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from "framer-motion";
import { getGalleryAlbums } from "@/lib/sanity/queries";
import { GalleryAlbum, GalleryItem } from "@/lib/sanity/types";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";
import { cn } from "@/lib/utils";

const FILTERS = ["ALL", "ARCHITECTURE", "INTERIOR", "CONSTRUCTION", "REAL ESTATE"];

export default function GalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotos, setCurrentPhotos] = useState<Array<{ src: string; title?: string }>>([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      const data = await getGalleryAlbums();
      setAlbums(data);
    }
    loadData();
  }, []);

  // Extract all gallery items from albums and filter by category
  const allPhotos: Array<{
    src: string;
    caption: string;
    category: string;
    albumName: string;
  }> = [];

  albums.forEach((album) => {
    album.items?.forEach((item) => {
      const imgUrl = item.image?.asset?.url;
      if (imgUrl) {
        allPhotos.push({
          src: imgUrl,
          caption: item.caption || album.description || "",
          category: item.category || album.category,
          albumName: album.name,
        });
      }
    });
  });

  const filteredPhotos = allPhotos.filter((p) => {
    if (filter === "ALL") return true;
    if (filter === "REAL ESTATE") return p.category === "real-estate";
    return p.category.toUpperCase() === filter;
  });

  const openLightbox = (idx: number) => {
    const slides = filteredPhotos.map((p) => ({
      src: p.src,
      title: p.caption,
    }));
    setCurrentPhotos(slides);
    setPhotoIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-24 min-h-screen bg-background text-on-surface select-none">
      <main className="max-w-[1440px] mx-auto px-6 md:px-16 overflow-hidden">
        {/* Header */}
        <section className="py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <RevealOnScroll className="lg:col-span-8" y={15}>
              <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] mb-6 block">
                CURATED PERSPECTIVES
              </span>
              <h1 className="font-display-xl text-4xl sm:text-6xl md:text-display-xl text-on-surface mb-8 leading-tight">
                Architectural <br />
                <span className="italic text-primary">Details.</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll className="lg:col-span-4 flex items-end animate-delay-200" y={15}>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm mb-4 leading-relaxed">
                Exploring close-ups, geometric framing, raw materials, and built snapshots across our legacy structures.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Filter bar */}
        <section className="mb-12 border-b border-gold-muted/20 pb-8 flex flex-wrap gap-4 md:gap-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "font-label-caps text-label-caps pb-2 transition-all cursor-pointer text-[10px] tracking-wider",
                filter === f
                  ? "text-primary border-b-2 border-primary"
                  : "text-on-surface/60 hover:text-primary"
              )}
            >
              {f}
            </button>
          ))}
        </section>

        {/* Gallery Grid */}
        {filteredPhotos.length > 0 ? (
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                key={photo.src + idx}
                onClick={() => openLightbox(idx)}
                variants={staggerItemVariants}
                className="group relative aspect-[4/3] overflow-hidden ghost-border p-1 bg-surface-container cursor-pointer"
              >
                <div className="w-full h-full overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={photo.caption}
                    src={photo.src}
                  />
                  {/* Hover info screen */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 z-10">
                    <span className="font-label-caps text-[8px] text-primary tracking-widest block uppercase mb-1">
                      {photo.category} • {photo.albumName}
                    </span>
                    <p className="font-playfair text-lg text-on-surface line-clamp-2 italic">
                      {photo.caption || "View detail perspective"}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerChildren>
        ) : (
          <div className="text-center py-24 border border-gold-muted/10 my-12">
            <span className="material-symbols-outlined text-4xl text-primary/30 mb-4 block">
              photo_library
            </span>
            <p className="font-body-md text-on-surface-variant/80 text-sm">
              No gallery perspectives found for this category.
            </p>
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={photoIndex}
        slides={currentPhotos}
      />
    </div>
  );
}
