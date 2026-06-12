"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getNavigation, getSiteSettings } from "@/lib/sanity/queries";
import { NavigationData, SiteSettings } from "@/lib/sanity/types";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [navData, setNavData] = useState<NavigationData | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function loadData() {
      const [nav, setts] = await Promise.all([getNavigation(), getSiteSettings()]);
      setNavData(nav);
      setSettings(setts);
    }
    loadData();

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = navData?.mainMenu || [];
  const cta = navData?.ctaButton || { text: "Book Consultation", href: "/contact" };
  const logoUrl = settings?.logo?.asset?.url || settings?.logoDark?.asset?.url;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full",
          scrolled
            ? "glass-nav py-4 border-b border-gold-muted/10 shadow-lg"
            : "bg-transparent py-6 border-b border-transparent"
        )}
      >
        <div className="section-container flex justify-between items-center w-full max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={settings?.siteName || "Rivendell Consults"}
                className="h-9 w-auto object-contain transition-all duration-500 filter brightness-100 group-hover:brightness-110"
                src={logoUrl}
              />
            ) : (
              <span className="font-playfair text-2xl tracking-[0.1em] text-primary font-bold">
                RIVENDELL
              </span>
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "font-label-caps text-label-caps tracking-[0.15em] transition-all duration-300 pb-1 relative",
                    isActive
                      ? "text-primary border-b border-primary/40"
                      : "text-on-surface/85 hover:text-primary editorial-hover-line"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Consultation CTA & Hamburger */}
          <div className="flex items-center gap-4 md:gap-6">
            <ThemeToggle />

            <Link href={cta.href} className="hidden md:block">
              <button className="bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed px-8 py-3.5 font-label-caps text-[10px] tracking-[0.2em] transition-all duration-300 cursor-pointer shadow-lg shadow-primary/5 hover:scale-[1.02] active:scale-[0.98]">
                {cta.text.toUpperCase()}
              </button>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 border border-gold-muted/30 text-on-surface hover:bg-primary/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            menuItems={menuItems}
            cta={cta}
            siteName={settings?.siteName}
          />
        )}
      </AnimatePresence>
    </>
  );
}
