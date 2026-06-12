"use client";

import React, { useState, useEffect } from "react";
import { Save, AlertTriangle, CheckCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [db, setDb] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Hero Section Form States
  const [heroLabel, setHeroLabel] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");
  const [primaryCtaText, setPrimaryCtaText] = useState("");
  const [primaryCtaLink, setPrimaryCtaLink] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // Lagos Head Office
  const [lagosName, setLagosName] = useState("");
  const [lagosAddress, setLagosAddress] = useState("");
  const [lagosPhone1, setLagosPhone1] = useState("");
  const [lagosPhone2, setLagosPhone2] = useState("");
  const [lagosEmail, setLagosEmail] = useState("");
  const [lagosHours, setLagosHours] = useState("");

  // Lusaka Presence
  const [lusakaName, setLusakaName] = useState("");
  const [lusakaAddress, setLusakaAddress] = useState("");
  const [lusakaPhone, setLusakaPhone] = useState("");
  const [lusakaEmail, setLusakaEmail] = useState("");
  const [lusakaHours, setLusakaHours] = useState("");

  // Shared contacts
  const [whatsapp, setWhatsapp] = useState("");
  const [calendly, setCalendly] = useState("");

  // Site Settings / SEO
  const [siteName, setSiteName] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/cms");
        if (!res.ok) throw new Error("Failed to load CMS database");
        const data = await res.json();
        setDb(data);

        // Pre-fill states
        const hero = data.homepageData?.hero || {};
        setHeroLabel(hero.heroLabel || "");
        setHeroHeading(hero.heroHeading || "");
        setHeroSubheading(hero.heroSubheading || "");
        setPrimaryCtaText(hero.primaryCtaText || "");
        setPrimaryCtaLink(hero.primaryCtaLink || "");
        setVideoUrl(hero.heroBackgroundVideo || "");

        const offices = data.contactInfo?.offices || [];
        const lusaka = offices[0] || {};
        const lagos = offices[1] || {};

        setLusakaName(lusaka.name || "Lusaka Presence");
        setLusakaAddress(lusaka.address || "");
        setLusakaPhone(lusaka.phone?.[0] || "");
        setLusakaEmail(lusaka.email || "");
        setLusakaHours(lusaka.hours || "");

        setLagosName(lagos.name || "Lagos Head Office");
        setLagosAddress(lagos.address || "");
        setLagosPhone1(lagos.phone?.[0] || "");
        setLagosPhone2(lagos.phone?.[1] || "");
        setLagosEmail(lagos.email || "");
        setLagosHours(lagos.hours || "");

        setWhatsapp(data.contactInfo?.whatsappNumber || "");
        setCalendly(data.contactInfo?.calendlyLink || "");

        setSiteName(data.siteSettings?.siteName || "");
        setMetaTitle(data.siteSettings?.defaultSeo?.metaTitle || "");
        setMetaDescription(data.siteSettings?.defaultSeo?.metaDescription || "");
      } catch (err: any) {
        setError(err.message || "An error occurred loading content.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("cms_gh_token") || "";

      // 1. Prepare updated database structure
      const updatedDb = { ...db };

      // Update hero
      if (!updatedDb.homepageData) updatedDb.homepageData = {};
      updatedDb.homepageData.hero = {
        ...(updatedDb.homepageData.hero || {}),
        heroLabel,
        heroHeading,
        heroSubheading,
        primaryCtaText,
        primaryCtaLink,
        heroBackgroundVideo: videoUrl
      };

      // Update contact details
      updatedDb.contactInfo = {
        ...(updatedDb.contactInfo || {}),
        whatsappNumber: whatsapp,
        calendlyLink: calendly,
        offices: [
          {
            name: lusakaName,
            address: lusakaAddress,
            phone: [lusakaPhone],
            email: lusakaEmail,
            hours: lusakaHours
          },
          {
            name: lagosName,
            address: lagosAddress,
            phone: [lagosPhone1, lagosPhone2].filter(Boolean),
            email: lagosEmail,
            hours: lagosHours
          }
        ]
      };

      // Update site & SEO settings
      updatedDb.siteSettings = {
        ...(updatedDb.siteSettings || {}),
        siteName,
        defaultSeo: {
          metaTitle,
          metaDescription
        }
      };

      // 2. POST update to api
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-github-token": token,
        },
        body: JSON.stringify(updatedDb),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to publish changes");
      }

      setDb(updatedDb);
      setMessage(result.message || "Configurations updated and published successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to publish content.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin"></div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Syncing database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h1 className="font-playfair text-2xl font-bold uppercase tracking-wider text-on-surface">Global Settings</h1>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Configure layout, contact coordinates, hero media, and search presence</p>
      </div>

      {error && (
        <div className="p-4 bg-error-container text-on-error-container text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="p-4 bg-primary/10 border border-primary/20 text-primary text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handlePublish} className="space-y-10 text-xs">
        {/* Hero Configurations */}
        <div className="bg-surface border border-outline/10 p-6 space-y-6">
          <h3 className="font-playfair text-base font-bold uppercase tracking-wider text-primary border-b border-outline/5 pb-3">
            Homepage Hero Section
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Hero Eyebrow Label</label>
              <input
                type="text"
                value={heroLabel}
                onChange={(e) => setHeroLabel(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Main Heading</label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Subheading (Description Text)</label>
            <textarea
              rows={3}
              value={heroSubheading}
              onChange={(e) => setHeroSubheading(e.target.value)}
              className="w-full bg-surface-container-low p-3 border border-outline/10 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Primary CTA Text</label>
              <input
                type="text"
                value={primaryCtaText}
                onChange={(e) => setPrimaryCtaText(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Primary CTA Link</label>
              <input
                type="text"
                value={primaryCtaLink}
                onChange={(e) => setPrimaryCtaLink(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Background MP4 Video URL</label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
          </div>
        </div>

        {/* Lagos Office Coordinates */}
        <div className="bg-surface border border-outline/10 p-6 space-y-6">
          <h3 className="font-playfair text-base font-bold uppercase tracking-wider text-primary border-b border-outline/5 pb-3">
            Lagos Head Office (HQ)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Office Name</label>
              <input
                type="text"
                value={lagosName}
                onChange={(e) => setLagosName(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Email Contact</label>
              <input
                type="email"
                value={lagosEmail}
                onChange={(e) => setLagosEmail(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Physical Address</label>
            <input
              type="text"
              value={lagosAddress}
              onChange={(e) => setLagosAddress(e.target.value)}
              className="w-full input-underline py-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Phone 1</label>
              <input
                type="text"
                value={lagosPhone1}
                onChange={(e) => setLagosPhone1(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Phone 2 (Optional)</label>
              <input
                type="text"
                value={lagosPhone2}
                onChange={(e) => setLagosPhone2(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Operational Hours</label>
              <input
                type="text"
                value={lagosHours}
                onChange={(e) => setLagosHours(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
          </div>
        </div>

        {/* Lusaka Office Coordinates */}
        <div className="bg-surface border border-outline/10 p-6 space-y-6">
          <h3 className="font-playfair text-base font-bold uppercase tracking-wider text-primary border-b border-outline/5 pb-3">
            Lusaka Presence
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Office Name</label>
              <input
                type="text"
                value={lusakaName}
                onChange={(e) => setLusakaName(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Email Contact</label>
              <input
                type="email"
                value={lusakaEmail}
                onChange={(e) => setLusakaEmail(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Physical Address</label>
            <input
              type="text"
              value={lusakaAddress}
              onChange={(e) => setLusakaAddress(e.target.value)}
              className="w-full input-underline py-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Phone Number</label>
              <input
                type="text"
                value={lusakaPhone}
                onChange={(e) => setLusakaPhone(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Operational Hours</label>
              <input
                type="text"
                value={lusakaHours}
                onChange={(e) => setLusakaHours(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
          </div>
        </div>

        {/* Global Links & SEO */}
        <div className="bg-surface border border-outline/10 p-6 space-y-6">
          <h3 className="font-playfair text-base font-bold uppercase tracking-wider text-primary border-b border-outline/5 pb-3">
            Shared Contacts & SEO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">WhatsApp Number (e.g. +2348000000000)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Calendly Booking Link</label>
              <input
                type="text"
                value={calendly}
                onChange={(e) => setCalendly(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-outline/5">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">Site Display Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">SEO Default Title Tag</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full input-underline py-2"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant block">SEO Meta Description</label>
            <textarea
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full bg-surface-container-low p-3 border border-outline/10 outline-none"
            />
          </div>
        </div>

        {/* Form Submission */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-10 py-4 bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" /> {saving ? "Publishing to GitHub..." : "Publish Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
