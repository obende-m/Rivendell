"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NavItem } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: NavItem[];
  cta: { text: string; href: string };
  siteName?: string;
}

export function MobileMenu({ onClose, menuItems, cta }: MobileMenuProps) {
  const pathname = usePathname();

  // Framer Motion presets
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed inset-0 z-[120] bg-background/98 backdrop-blur-3xl flex flex-col justify-between px-6 py-12 md:hidden"
    >
      {/* Top Header Row */}
      <div className="flex justify-between items-center w-full max-w-[1440px] mx-auto">
        <span className="font-playfair text-xl tracking-[0.1em] text-primary font-bold">
          RIVENDELL
        </span>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-10 h-10 border border-gold-muted/30 text-on-surface hover:bg-primary/10 transition-colors"
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      {/* Centered Navigation Links */}
      <div className="flex flex-col items-center justify-center space-y-8 my-auto text-center">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.div key={item.label} variants={itemVariants}>
              <Link
                href={item.href}
                onClick={onClose}
                className={cn(
                  "font-playfair text-4xl block transition-all duration-300",
                  isActive
                    ? "text-primary italic font-medium"
                    : "text-on-surface hover:italic hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            </motion.div>
          );
        })}

        {/* CTA Button Block */}
        <motion.div variants={itemVariants} className="pt-8 w-full max-w-[280px]">
          <Link href={cta.href} onClick={onClose} className="w-full block">
            <button className="bg-primary text-on-primary hover:bg-primary-fixed w-full py-4.5 font-label-caps text-xs tracking-[0.25em] transition-colors cursor-pointer shadow-lg shadow-primary/10">
              {cta.text.toUpperCase()}
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Legal Credits */}
      <div className="text-center">
        <p className="font-label-caps text-[8px] tracking-[0.3em] uppercase opacity-40">
          © 2026 Rivendell Consults
        </p>
      </div>
    </motion.div>
  );
}
