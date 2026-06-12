"use client";

import React, { useState, useEffect } from "react";
import { Edit2, Save, X, AlertTriangle, CheckCircle } from "lucide-react";

export default function AdminServicesPage() {
  const [db, setDb] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [benefitsText, setBenefitsText] = useState("");
  
  // Process step states
  const [step1Title, setStep1Title] = useState("");
  const [step1Desc, setStep1Desc] = useState("");
  const [step2Title, setStep2Title] = useState("");
  const [step2Desc, setStep2Desc] = useState("");
  const [step3Title, setStep3Title] = useState("");
  const [step3Desc, setStep3Desc] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/cms");
        if (!res.ok) throw new Error("Failed to load CMS database");
        const data = await res.json();
        setDb(data);
      } catch (err: any) {
        setError(err.message || "An error occurred loading content.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const saveDatabase = async (updatedDb: any) => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("cms_gh_token") || "";
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
      setMessage(result.message || "Changes saved successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to publish changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleOpenEdit = (srv: any) => {
    setEditingService(srv);
    setTitle(srv.title || "");
    setIcon(srv.icon || "");
    setDescription(srv.description || "");
    setHeroImageUrl(srv.heroImage?.asset?.url || "");
    setBenefitsText(srv.benefits ? srv.benefits.join("\n") : "");

    // Steps
    const steps = srv.processSteps || [];
    setStep1Title(steps[0]?.title || "");
    setStep1Desc(steps[0]?.description || "");
    setStep2Title(steps[1]?.title || "");
    setStep2Desc(steps[1]?.description || "");
    setStep3Title(steps[2]?.title || "");
    setStep3Desc(steps[2]?.description || "");

    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert("Title is required.");
      return;
    }

    const benefitsArray = benefitsText
      .split("\n")
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const updatedSteps = [
      { stepNumber: "01", title: step1Title, description: step1Desc },
      { stepNumber: "02", title: step2Title, description: step2Desc },
      { stepNumber: "03", title: step3Title, description: step3Desc }
    ];

    const updatedServiceData = {
      ...editingService,
      title,
      icon,
      description,
      benefits: benefitsArray,
      processSteps: updatedSteps,
      heroImage: {
        asset: {
          url: heroImageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
        }
      }
    };

    const updatedServices = db.services.map((s: any) =>
      s._id === editingService._id ? updatedServiceData : s
    );

    const updatedDb = { ...db, services: updatedServices };
    setModalOpen(false);
    saveDatabase(updatedDb);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin"></div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Syncing database...</p>
      </div>
    );
  }

  const services = db?.services || [];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-playfair text-2xl font-bold uppercase tracking-wider text-on-surface">Manage Divisions</h1>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Configure core services, benefits and construction steps</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((srv: any) => (
          <div key={srv._id} className="bg-surface border border-outline/10 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-3xl text-primary select-none">
                  {srv.icon}
                </span>
                <span className="px-2 py-0.5 bg-primary/10 text-primary font-bold text-[9px] uppercase tracking-widest">
                  Active
                </span>
              </div>
              <div>
                <h3 className="font-playfair text-lg font-bold text-on-surface">{srv.title}</h3>
                <p className="text-[9px] uppercase tracking-widest text-on-surface-variant/65 mt-1">Division</p>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed line-clamp-3">
                {srv.description}
              </p>
              <div className="space-y-1">
                <p className="font-bold uppercase tracking-widest text-[9px] text-on-surface-variant">Key Benefits:</p>
                <ul className="list-disc list-inside text-[10px] text-on-surface-variant/90 space-y-1">
                  {srv.benefits?.slice(0, 3).map((b: string, i: number) => (
                    <li key={i} className="line-clamp-1">{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleOpenEdit(srv)}
              className="w-full py-2.5 bg-surface-container-low hover:bg-primary hover:text-on-primary transition-all text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer border border-outline/5"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit Division Specs
            </button>
          </div>
        ))}
      </div>

      {/* Services Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-low max-w-3xl w-full border border-outline/20 p-8 space-y-6 overflow-y-auto max-h-[90vh] text-xs font-manrope">
            <div className="flex justify-between items-center border-b border-outline/10 pb-4">
              <h3 className="font-playfair text-lg font-bold uppercase tracking-wider text-on-surface">
                Edit {editingService?.title} Specifications
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Division Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Icon Name (Material Symbols)</label>
                  <input
                    type="text"
                    required
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Division Hero Image URL</label>
                <input
                  type="text"
                  value={heroImageUrl}
                  onChange={(e) => setHeroImageUrl(e.target.value)}
                  className="w-full input-underline py-2 text-on-surface text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface-container p-3 text-on-surface border border-outline/10 outline-none text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Key Benefits (One per line)</label>
                <textarea
                  rows={4}
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  className="w-full bg-surface-container p-3 text-on-surface border border-outline/10 outline-none text-xs font-mono"
                  placeholder="Conceptual spatial planning&#10;Sustainable carbon-neutral design guidelines"
                />
              </div>

              {/* Process Steps */}
              <div className="space-y-4 pt-4 border-t border-outline/10">
                <h4 className="font-playfair text-sm font-bold uppercase tracking-wider text-on-surface">Process Sequence (3 Phases)</h4>
                
                {/* Step 1 */}
                <div className="bg-surface p-4 border border-outline/5 space-y-3">
                  <p className="font-bold text-primary tracking-widest text-[10px]">PHASE 01</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Step Title (e.g. Concept & Narrative)"
                      value={step1Title}
                      onChange={(e) => setStep1Title(e.target.value)}
                      className="w-full input-underline py-1 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Step Description summary..."
                      value={step1Desc}
                      onChange={(e) => setStep1Desc(e.target.value)}
                      className="w-full input-underline py-1 text-xs"
                    />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-surface p-4 border border-outline/5 space-y-3">
                  <p className="font-bold text-primary tracking-widest text-[10px]">PHASE 02</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Step Title"
                      value={step2Title}
                      onChange={(e) => setStep2Title(e.target.value)}
                      className="w-full input-underline py-1 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Step Description summary..."
                      value={step2Desc}
                      onChange={(e) => setStep2Desc(e.target.value)}
                      className="w-full input-underline py-1 text-xs"
                    />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-surface p-4 border border-outline/5 space-y-3">
                  <p className="font-bold text-primary tracking-widest text-[10px]">PHASE 03</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Step Title"
                      value={step3Title}
                      onChange={(e) => setStep3Title(e.target.value)}
                      className="w-full input-underline py-1 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Step Description summary..."
                      value={step3Desc}
                      onChange={(e) => setStep3Desc(e.target.value)}
                      className="w-full input-underline py-1 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-outline/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-3 border border-outline/20 text-on-surface hover:bg-surface-container transition-all text-[10px] font-bold uppercase tracking-widest cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed transition-all text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> {saving ? "Publishing..." : "Save Division"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
