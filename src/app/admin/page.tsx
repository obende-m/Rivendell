"use client";

import { useEffect, useState } from "react";
import { GhostBorder } from "@/components/ui/GhostBorder";

export default function AdminPage() {
  const [db, setDb] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"hero" | "contact" | "projects">("hero");
  const [githubToken, setGithubToken] = useState("");

  // Load database on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/cms");
        if (!res.ok) throw new Error("Failed to load CMS database");
        const data = await res.json();
        setDb(data);
        // Pre-fill token from localStorage if saved
        const savedToken = localStorage.getItem("cms_gh_token");
        if (savedToken) setGithubToken(savedToken);
      } catch (err: any) {
        setError(err.message || "An error occurred loading content.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveToken = (val: string) => {
    setGithubToken(val);
    localStorage.setItem("cms_gh_token", val);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-github-token": githubToken,
        },
        body: JSON.stringify(db),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to publish changes");
      }

      setMessage(result.message || "Website updated and publishing triggered!");
    } catch (err: any) {
      setError(err.message || "Failed to publish content.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center bg-background text-on-surface">
        <div className="text-center space-y-4">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin select-none">
            progress_activity
          </span>
          <p className="font-label-caps tracking-widest text-xs">LOADING CMS DATA...</p>
        </div>
      </div>
    );
  }

  const hero = db.homepageData.hero || {};
  const contact = db.contactInfo.offices?.[0] || {};
  const projects = db.projects || [];

  return (
    <div className="pt-28 min-h-screen bg-background text-on-surface pb-20">
      <section className="max-w-[1000px] mx-auto px-6 md:px-16 space-y-12">
        <div className="border-b border-gold-muted pb-8 space-y-4">
          <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block">
            RIVENDELL SYSTEM
          </span>
          <h1 className="font-display-xl text-3xl sm:text-5xl uppercase leading-none">
            Content <span className="italic text-primary">Manager</span>
          </h1>
        </div>

        {/* Auth / GitHub Token section */}
        <GhostBorder className="p-6 md:p-8 bg-surface-container/30 space-y-4">
          <h3 className="font-playfair text-lg italic text-primary">GitHub Connection</h3>
          <p className="font-body-md text-xs text-on-surface-variant max-w-2xl leading-relaxed">
            Enter your GitHub Personal Access Token to commit modifications directly to the main repository.
            This token is saved locally in your browser and sent securely via request headers.
          </p>
          <div className="max-w-md">
            <input
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxx"
              value={githubToken}
              onChange={(e) => handleSaveToken(e.target.value)}
              className="w-full input-underline text-xs py-2 px-3 text-on-surface placeholder:text-on-surface/30 font-mono"
            />
          </div>
        </GhostBorder>

        {/* Tab selection */}
        <div className="flex border-b border-gold-muted/40 gap-8">
          {(["hero", "contact", "projects"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-label-caps text-xs tracking-widest pb-4 transition-all uppercase cursor-pointer relative ${
                activeTab === tab ? "text-primary" : "text-on-surface/60 hover:text-primary"
              }`}
            >
              {tab === "hero" ? "Homepage Hero" : tab === "contact" ? "HQ Contacts" : "Projects Archive"}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Editor Form */}
        <form onSubmit={handlePublish} className="space-y-8">
          {activeTab === "hero" && (
            <div className="space-y-8">
              <h2 className="font-playfair text-xl italic text-on-surface pb-2 border-b border-gold-muted/20">
                Hero Section
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-primary block">EYEBROW LABEL</label>
                  <input
                    type="text"
                    value={hero.heroLabel || ""}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        homepageData: {
                          ...db.homepageData,
                          hero: { ...hero, heroLabel: e.target.value },
                        },
                      })
                    }
                    className="w-full input-underline text-sm py-2 text-on-surface"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-primary block">MAIN HEADING</label>
                  <input
                    type="text"
                    value={hero.heroHeading || ""}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        homepageData: {
                          ...db.homepageData,
                          hero: { ...hero, heroHeading: e.target.value },
                        },
                      })
                    }
                    className="w-full input-underline text-sm py-2 text-on-surface"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-[10px] text-primary block">HERO DESCRIPTION</label>
                <textarea
                  value={hero.heroSubheading || ""}
                  onChange={(e) =>
                    setDb({
                      ...db,
                      homepageData: {
                        ...db.homepageData,
                        hero: { ...hero, heroSubheading: e.target.value },
                      },
                    })
                  }
                  rows={4}
                  className="w-full input-underline text-sm py-2 text-on-surface bg-transparent border border-gold-muted/10 p-3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-primary block">PRIMARY CTA TEXT</label>
                  <input
                    type="text"
                    value={hero.primaryCtaText || ""}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        homepageData: {
                          ...db.homepageData,
                          hero: { ...hero, primaryCtaText: e.target.value },
                        },
                      })
                    }
                    className="w-full input-underline text-sm py-2 text-on-surface"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-primary block">PRIMARY CTA LINK</label>
                  <input
                    type="text"
                    value={hero.primaryCtaLink || ""}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        homepageData: {
                          ...db.homepageData,
                          hero: { ...hero, primaryCtaLink: e.target.value },
                        },
                      })
                    }
                    className="w-full input-underline text-sm py-2 text-on-surface"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-8">
              <h2 className="font-playfair text-xl italic text-on-surface pb-2 border-b border-gold-muted/20">
                Lagos Head Office
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-primary block">OFFICE NAME</label>
                  <input
                    type="text"
                    value={contact.name || ""}
                    onChange={(e) => {
                      const offices = [...db.contactInfo.offices];
                      offices[0] = { ...contact, name: e.target.value };
                      setDb({ ...db, contactInfo: { ...db.contactInfo, offices } });
                    }}
                    className="w-full input-underline text-sm py-2 text-on-surface"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-primary block">OFFICE ADDRESS</label>
                  <input
                    type="text"
                    value={contact.address || ""}
                    onChange={(e) => {
                      const offices = [...db.contactInfo.offices];
                      offices[0] = { ...contact, address: e.target.value };
                      setDb({ ...db, contactInfo: { ...db.contactInfo, offices } });
                    }}
                    className="w-full input-underline text-sm py-2 text-on-surface"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-primary block">OFFICE PHONE</label>
                  <input
                    type="text"
                    value={contact.phone?.[0] || ""}
                    onChange={(e) => {
                      const offices = [...db.contactInfo.offices];
                      const phone = [...(contact.phone || [])];
                      phone[0] = e.target.value;
                      offices[0] = { ...contact, phone };
                      setDb({ ...db, contactInfo: { ...db.contactInfo, offices } });
                    }}
                    className="w-full input-underline text-sm py-2 text-on-surface"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-primary block">OFFICE EMAIL</label>
                  <input
                    type="text"
                    value={contact.email || ""}
                    onChange={(e) => {
                      const offices = [...db.contactInfo.offices];
                      offices[0] = { ...contact, email: e.target.value };
                      setDb({ ...db, contactInfo: { ...db.contactInfo, offices } });
                    }}
                    className="w-full input-underline text-sm py-2 text-on-surface"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-8">
              <h2 className="font-playfair text-xl italic text-on-surface pb-2 border-b border-gold-muted/20">
                Projects List
              </h2>
              <div className="space-y-6">
                {projects.map((proj: any, idx: number) => (
                  <GhostBorder key={proj._id || idx} className="p-4 md:p-6 bg-surface-container/20 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-label-caps text-[9px] text-primary block">PROJECT NAME</label>
                        <input
                          type="text"
                          value={proj.name || ""}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[idx] = { ...proj, name: e.target.value };
                            setDb({ ...db, projects: newProjects });
                          }}
                          className="w-full input-underline text-xs py-1 text-on-surface"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-caps text-[9px] text-primary block">LOCATION</label>
                        <input
                          type="text"
                          value={proj.location || ""}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[idx] = { ...proj, location: e.target.value };
                            setDb({ ...db, projects: newProjects });
                          }}
                          className="w-full input-underline text-xs py-1 text-on-surface"
                        />
                      </div>
                    </div>
                  </GhostBorder>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {error && (
            <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-body-md">
              {error}
            </div>
          )}

          {message && (
            <div className="p-4 border border-green-500/20 bg-green-500/5 text-green-400 text-sm font-body-md">
              {message}
            </div>
          )}

          {/* Action button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed px-10 py-4 font-label-caps text-xs tracking-widest transition-all duration-300 disabled:opacity-40 select-none cursor-pointer"
            >
              {saving ? "PUBLISHING TO GITHUB..." : "PUBLISH CHANGES"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
