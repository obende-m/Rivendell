"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getFooter, getContactInfo } from "@/lib/sanity/queries";
import { FooterData, ContactInfoData } from "@/lib/sanity/types";

export function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [contactData, setContactData] = useState<ContactInfoData | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [foot, cont] = await Promise.all([getFooter(), getContactInfo()]);
      setFooterData(foot);
      setContactData(cont);
    }
    loadData();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  const logoUrl = footerData?.logo?.asset?.url;
  const description =
    footerData?.companyDescription ||
    "Meticulously crafting architectural legacies through a rigorous fusion of precision, innovation, and ethereal luxury.";
  const columns = footerData?.columns || [];
  const socialLinks = footerData?.socialLinks || [];
  const legalLinks = footerData?.legalLinks || [];
  const copyright =
    footerData?.copyright || "© 2026 Rivendell Consults. All rights reserved.";

  // Get primary office contact info
  const primaryOffice = contactData?.offices?.[0];

  return (
    <footer className="bg-surface-container border-t border-gold-muted/10">
      <div className="section-container grid grid-cols-1 md:grid-cols-4 gap-gutter py-16 md:py-24 max-w-[1440px] mx-auto">
        {/* Column 1: Logo & Description */}
        <div className="md:col-span-1 space-y-6">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt="Rivendell Consults"
              className="h-9 mb-4 grayscale hover:grayscale-0 transition-all duration-300"
              src={logoUrl}
            />
          ) : (
            <span className="font-playfair text-xl tracking-[0.1em] text-primary font-bold block mb-4">
              RIVENDELL
            </span>
          )}
          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed max-w-[280px]">
            {description}
          </p>
          {/* Socials */}
          <div className="flex space-x-3 pt-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gold-muted/20 flex items-center justify-center text-on-surface hover:text-primary hover:bg-primary/5 transition-all duration-300"
                title={link.platform}
              >
                <span className="material-symbols-outlined text-sm">
                  {link.platform === "instagram"
                    ? "photo_camera"
                    : link.platform === "linkedin"
                    ? "work"
                    : "share"}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Columns 2 & 3: Link grids */}
        {columns.map((col) => (
          <div key={col.heading}>
            <h4 className="font-label-caps text-label-caps text-primary mb-8 tracking-[0.2em] uppercase">
              {col.heading}
            </h4>
            <ul className="space-y-4">
              {col.links?.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body-md text-on-surface-variant text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Column 4: Contact / Newsletter (dynamic) */}
        <div>
          <h4 className="font-label-caps text-label-caps text-primary mb-8 tracking-[0.2em] uppercase">
            Contact
          </h4>
          {primaryOffice ? (
            <div className="space-y-4 text-sm font-body-md text-on-surface-variant leading-relaxed mb-6">
              <p>
                {primaryOffice.address.split(",").slice(0, 2).join(",")},
                <br />
                {primaryOffice.address.split(",").slice(2).join(",")}
              </p>
              <p>
                {primaryOffice.phone?.map((ph) => (
                  <span key={ph} className="block">
                    {ph}
                  </span>
                ))}
                <span className="block">{primaryOffice.email}</span>
              </p>
            </div>
          ) : (
            <p className="text-sm font-body-md text-on-surface-variant leading-relaxed mb-6">
              1245 Architectural Row
              <br />
              Suite 400, Horizon District
              <br />
              Lusaka, Zambia
            </p>
          )}

          {/* Dynamic Newsletter input as styled in specifications */}
          <form onSubmit={handleSubscribe} className="relative mt-8 max-w-[280px]">
            <p className="font-label-caps text-[9px] text-primary/60 tracking-widest mb-3 uppercase">
              INSIGHTS NEWSLETTER
            </p>
            <div className="flex items-center border-b border-gold-muted/40 py-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  subscribed ? "Thank you for subscribing" : "Subscribe to updates"
                }
                disabled={subscribed}
                className="appearance-none bg-transparent border-none w-full text-on-surface mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-on-surface/40 text-xs font-body-md"
              />
              <button
                type="submit"
                className="flex-shrink-0 text-primary hover:text-primary-fixed transition-colors duration-300"
                aria-label="Submit newsletter email"
              >
                <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-white/5 py-8">
        <div className="section-container max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-md text-[10px] tracking-widest text-on-surface-variant uppercase">
            {copyright}
          </p>
          <div className="flex space-x-8">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[10px] tracking-widest font-label-caps text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
