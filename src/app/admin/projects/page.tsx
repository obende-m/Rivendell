"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X, Save, AlertTriangle, CheckCircle } from "lucide-react";

export default function AdminProjectsPage() {
  const [db, setDb] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("residential");
  const [status, setStatus] = useState("completed");
  const [location, setLocation] = useState("");
  const [client, setClient] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");
  const [architect, setArchitect] = useState("");
  const [contractor, setContractor] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [challenge, setChallenge] = useState("");
  const [approach, setApproach] = useState("");
  const [solution, setSolution] = useState("");
  const [results, setResults] = useState("");
  const [featured, setFeatured] = useState(false);

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

  const handleOpenCreate = () => {
    setEditingProject(null);
    setName("");
    setCategory("residential");
    setStatus("completed");
    setLocation("");
    setClient("");
    setYear(new Date().getFullYear().toString());
    setDuration("");
    setBudget("");
    setArchitect("Alistair Vance, Principal");
    setContractor("Rivendell Build Partners");
    setFeaturedImageUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80");
    setHeroImageUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80");
    setChallenge("");
    setApproach("");
    setSolution("");
    setResults("");
    setFeatured(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (proj: any) => {
    setEditingProject(proj);
    setName(proj.name || "");
    setCategory(proj.category || "residential");
    setStatus(proj.status || "completed");
    setLocation(proj.location || "");
    setClient(proj.client || "");
    setYear(proj.year || "");
    setDuration(proj.duration || "");
    setBudget(proj.budget || "");
    setArchitect(proj.architect || "");
    setContractor(proj.contractor || "");
    setFeaturedImageUrl(proj.featuredImage?.asset?.url || "");
    setHeroImageUrl(proj.heroImage?.asset?.url || "");
    setChallenge(proj.challenge || "");
    setApproach(proj.approach || "");
    setSolution(proj.solution || "");
    setResults(proj.results || "");
    setFeatured(proj.featured || false);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = db.projects.filter((p: any) => p._id !== id);
      const updatedDb = { ...db, projects: updatedProjects };
      saveDatabase(updatedDb);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location) {
      alert("Name and location are required.");
      return;
    }

    const slugCurrent = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const newProjectData: any = {
      _id: editingProject ? editingProject._id : `project-${Date.now()}`,
      _type: "project",
      name,
      slug: { current: slugCurrent },
      category,
      status,
      location,
      client,
      year,
      duration,
      budget,
      architect,
      contractor,
      featured,
      displayOrder: editingProject ? editingProject.displayOrder : db.projects.length + 1,
      featuredImage: {
        asset: {
          url: featuredImageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
        }
      },
      heroImage: {
        asset: {
          url: heroImageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
        }
      },
      challenge,
      approach,
      solution,
      results,
      description: [
        {
          _key: editingProject?.description?.[0]?._key || `desc-key-${Date.now()}`,
          _type: "block",
          style: "normal",
          children: [
            {
              _key: editingProject?.description?.[0]?.children?.[0]?._key || `span-key-${Date.now()}`,
              _type: "span",
              text: challenge || name,
              marks: []
            }
          ]
        }
      ]
    };

    let updatedProjects = [...db.projects];
    if (editingProject) {
      updatedProjects = updatedProjects.map((p: any) => p._id === editingProject._id ? newProjectData : p);
    } else {
      updatedProjects.push(newProjectData);
    }

    const updatedDb = { ...db, projects: updatedProjects };
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

  const projects = db?.projects || [];
  const filteredProjects = projects.filter((proj: any) =>
    proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proj.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-playfair text-2xl font-bold uppercase tracking-wider text-on-surface">Manage Projects</h1>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Create, update or delete case studies</p>
        </div>
        
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 py-3 px-6 bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Case Study
        </button>
      </div>

      {/* Message banners */}
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

      {/* Search and Table Grid */}
      <div className="bg-surface border border-outline/10 p-6 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
          <input
            type="text"
            placeholder="Search projects by name, location, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface-container-low text-xs border-b border-outline/30 focus:border-primary outline-none text-on-surface placeholder:text-on-surface-variant/40"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface-container-low font-bold uppercase tracking-wider text-on-surface-variant border-b border-outline/10">
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Specs</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/10">
              {filteredProjects.map((proj: any) => (
                <tr key={proj._id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {proj.featuredImage?.asset?.url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={proj.featuredImage.asset.url}
                          alt={proj.name}
                          className="w-12 h-12 object-cover border border-outline/10"
                        />
                      )}
                      <div>
                        <p className="font-bold text-on-surface text-sm">{proj.name}</p>
                        <p className="text-[10px] text-on-surface-variant/70 mt-1 uppercase tracking-wider">
                          {proj.category} — {proj.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant space-y-1">
                    <p><span className="font-bold text-[9px] uppercase tracking-widest text-on-surface-variant/60">Client:</span> {proj.client || "—"}</p>
                    <p><span className="font-bold text-[9px] uppercase tracking-widest text-on-surface-variant/60">Budget:</span> {proj.budget || "—"}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1.5">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary font-bold text-[9px] uppercase tracking-widest">
                        {proj.status}
                      </span>
                      {proj.featured && (
                        <p className="text-[9px] text-yellow-500 uppercase tracking-widest font-bold">Featured Main</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-2 bg-surface-container-low text-on-surface hover:text-primary transition-all cursor-pointer"
                        title="Edit project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj._id)}
                        className="p-2 bg-surface-container-low text-on-surface hover:text-red-500 transition-all cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant">
                    No case studies found matching parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-low max-w-3xl w-full border border-outline/20 p-8 space-y-6 overflow-y-auto max-h-[90vh] text-xs font-manrope">
            <div className="flex justify-between items-center border-b border-outline/10 pb-4">
              <h3 className="font-playfair text-lg font-bold uppercase tracking-wider text-on-surface">
                {editingProject ? "Modify Case Study" : "New Case Study"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Metadata Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Project Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                    placeholder="e.g. Sarai Situs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full input-underline py-2 bg-transparent text-on-surface text-xs"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="interior">Interior</option>
                    <option value="mixed-use">Mixed-Use</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full input-underline py-2 bg-transparent text-on-surface text-xs"
                  >
                    <option value="completed">Completed</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="selling">Selling</option>
                    <option value="concept">Concept</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                    placeholder="e.g. Lekki, Lagos"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Client Name</label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                    placeholder="e.g. Sterling Holdings"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Year</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                    placeholder="e.g. 24 Months"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Budget</label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                    placeholder="e.g. $4.5 Million"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Lead Architect</label>
                  <input
                    type="text"
                    value={architect}
                    onChange={(e) => setArchitect(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Main Contractor</label>
                  <input
                    type="text"
                    value={contractor}
                    onChange={(e) => setContractor(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Featured Image URL</label>
                  <input
                    type="text"
                    value={featuredImageUrl}
                    onChange={(e) => setFeaturedImageUrl(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Hero Image URL</label>
                  <input
                    type="text"
                    value={heroImageUrl}
                    onChange={(e) => setHeroImageUrl(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                  />
                </div>
              </div>

              {/* Text Areas */}
              <div className="space-y-4 pt-4 border-t border-outline/10">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">The Challenge (Vision Narrative)</label>
                  <textarea
                    rows={3}
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    className="w-full bg-surface-container p-3 text-on-surface border border-outline/10 outline-none text-xs"
                    placeholder="Describe the initial project challenge..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Our Approach</label>
                  <textarea
                    rows={3}
                    value={approach}
                    onChange={(e) => setApproach(e.target.value)}
                    className="w-full bg-surface-container p-3 text-on-surface border border-outline/10 outline-none text-xs"
                    placeholder="Detail the strategy and execution methodology..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">The Solution</label>
                    <textarea
                      rows={3}
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      className="w-full bg-surface-container p-3 text-on-surface border border-outline/10 outline-none text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">The Results</label>
                    <textarea
                      rows={3}
                      value={results}
                      onChange={(e) => setResults(e.target.value)}
                      className="w-full bg-surface-container p-3 text-on-surface border border-outline/10 outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <label htmlFor="featured" className="font-bold uppercase tracking-widest text-[9px] text-on-surface cursor-pointer select-none">
                    Feature this project on the homepage slider
                  </label>
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
                  <Save className="w-4 h-4" /> {saving ? "Publishing..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
