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
              className="h-9 mb-4 object-contain"
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
                className="w-10 h-10 border border-gold-muted flex items-center justify-center text-on-surface hover:text-primary hover:bg-primary/5 transition-all duration-300"
                title={link.platform}
              >
                {getSocialIcon(link.platform)}
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
          <p className="font-body-md text-[10px] tracking-widest text-on-surface-variant uppercase">
            Built by{" "}
            <a href="#" className="text-primary hover:underline transition-all duration-300">
              RUNA Labs
            </a>
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

function getSocialIcon(platform: string) {
  const size = "w-4 h-4 fill-current";
  switch (platform.toLowerCase()) {
    case "instagram":
      return (
        <svg className={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "twitter":
    case "x":
      return (
        <svg className={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 8H7v3h2v9h3v-9h3.625L16 8h-4V6.75C12 5.908 12.166 5 13 5h2V2h-3c-3.284 0-5 1.88-5 5v1z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.556a3.003 3.003 0 00-2.11 2.107C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 002.11 2.107C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.556a3.003 3.003 0 002.11-2.107C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg className={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.533 3.977 14.062 2.95 11.43 2.95c-5.449 0-9.885 4.373-9.889 9.803-.001 1.77.472 3.498 1.368 5.051L1.879 21.5l3.876-.998c1.55.952 3.125 1.411 4.792 1.411H6.647zm11.238-6.195c-.296-.147-1.753-.853-2.026-.951-.273-.099-.472-.147-.671.147-.199.296-.77.951-.944 1.147-.174.197-.348.221-.644.074-.296-.147-1.25-.453-2.38-1.446-.88-.773-1.474-1.727-1.647-2.022-.174-.296-.018-.456.13-.603.133-.133.296-.34.444-.51.147-.17.197-.29.296-.484.099-.193.049-.364-.024-.512-.074-.148-.671-1.597-.92-2.186-.242-.574-.487-.497-.671-.506-.174-.009-.373-.01-.572-.01-.199 0-.522.074-.795.369-.273.296-1.043 1.006-1.043 2.454 0 1.449 1.043 2.846 1.192 3.043.149.197 2.052 3.13 4.972 4.38.694.298 1.237.475 1.66.608.699.22 1.336.19 1.838.115.56-.084 1.753-.706 2.001-1.391.248-.686.248-1.276.174-1.391-.074-.115-.272-.191-.568-.34z" />
        </svg>
      );
    default:
      return null;
  }
}
