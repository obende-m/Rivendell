"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X, Save, AlertTriangle, CheckCircle } from "lucide-react";

export default function AdminCareersPage() {
  const [db, setDb] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("architecture");
  const [location, setLocation] = useState("Lagos Office");
  const [type, setType] = useState("full-time");
  const [active, setActive] = useState(true);
  const [descriptionText, setDescriptionText] = useState("");
  const [requirementsText, setRequirementsText] = useState("");
  const [benefitsText, setBenefitsText] = useState("");

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
    setEditingJob(null);
    setTitle("");
    setDepartment("architecture");
    setLocation("Lagos Office");
    setType("full-time");
    setActive(true);
    setDescriptionText("");
    setRequirementsText("");
    setBenefitsText("");
    setModalOpen(true);
  };

  const handleOpenEdit = (job: any) => {
    setEditingJob(job);
    setTitle(job.title || "");
    setDepartment(job.department || "architecture");
    setLocation(job.location || "Lagos Office");
    setType(job.type || "full-time");
    setActive(job.active ?? true);
    
    // Extract description text
    const textVal = job.description?.[0]?.children?.[0]?.text || "";
    setDescriptionText(textVal);

    setRequirementsText(job.requirements ? job.requirements.join("\n") : "");
    setBenefitsText(job.benefits ? job.benefits.join("\n") : "");
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this job post?")) {
      const updatedCareers = db.careers.filter((c: any) => c._id !== id);
      const updatedDb = { ...db, careers: updatedCareers };
      saveDatabase(updatedDb);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location) {
      alert("Job title and location are required.");
      return;
    }

    const slugCurrent = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const requirementsArray = requirementsText
      .split("\n")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const benefitsArray = benefitsText
      .split("\n")
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const updatedJobData = {
      _id: editingJob ? editingJob._id : `job-${Date.now()}`,
      _type: "career",
      title,
      slug: { current: slugCurrent },
      department,
      location,
      type,
      active,
      requirements: requirementsArray,
      benefits: benefitsArray,
      description: [
        {
          _key: editingJob?.description?.[0]?._key || `desc-key-${Date.now()}`,
          _type: "block",
          style: "normal",
          children: [
            {
              _key: editingJob?.description?.[0]?.children?.[0]?._key || `span-key-${Date.now()}`,
              _type: "span",
              text: descriptionText,
              marks: []
            }
          ]
        }
      ]
    };

    let updatedCareers = db.careers ? [...db.careers] : [];
    if (editingJob) {
      updatedCareers = updatedCareers.map((c: any) => c._id === editingJob._id ? updatedJobData : c);
    } else {
      updatedCareers.push(updatedJobData);
    }

    const updatedDb = { ...db, careers: updatedCareers };
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

  const careers = db?.careers || [];
  const filteredCareers = careers.filter((job: any) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-playfair text-2xl font-bold uppercase tracking-wider text-on-surface">Job Listings</h1>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Manage open vacancies and hiring pipeline</p>
        </div>
        
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 py-3 px-6 bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Vacancy
        </button>
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

      <div className="bg-surface border border-outline/10 p-6 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
          <input
            type="text"
            placeholder="Search roles by title or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface-container-low text-xs border-b border-outline/30 focus:border-primary outline-none text-on-surface placeholder:text-on-surface-variant/40"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface-container-low font-bold uppercase tracking-wider text-on-surface-variant border-b border-outline/10">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Department & Info</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/10">
              {filteredCareers.map((job: any) => (
                <tr key={job._id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-on-surface text-sm">{job.title}</p>
                      <p className="text-[10px] text-on-surface-variant/70 mt-1 uppercase tracking-wider">
                        {job.type} — {job.location}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant uppercase tracking-wider text-[10px] font-semibold">
                    {job.department}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 font-bold text-[9px] uppercase tracking-widest ${
                      job.active ? "bg-green-500/10 text-green-500" : "bg-outline/25 text-on-surface-variant/50"
                    }`}>
                      {job.active ? "Active" : "Closed"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(job)}
                        className="p-2 bg-surface-container-low text-on-surface hover:text-primary transition-all cursor-pointer"
                        title="Edit vacancy"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="p-2 bg-surface-container-low text-on-surface hover:text-red-500 transition-all cursor-pointer"
                        title="Delete vacancy"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCareers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant">
                    No active job listings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vacancy Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-low max-w-3xl w-full border border-outline/20 p-8 space-y-6 overflow-y-auto max-h-[90vh] text-xs font-manrope">
            <div className="flex justify-between items-center border-b border-outline/10 pb-4">
              <h3 className="font-playfair text-lg font-bold uppercase tracking-wider text-on-surface">
                {editingJob ? "Modify Vacancy Details" : "New Vacancy Post"}
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
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Job Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                    placeholder="e.g. Senior Architect"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full input-underline py-2 bg-transparent text-on-surface text-xs"
                  >
                    <option value="architecture">Architecture</option>
                    <option value="construction">Construction</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="operations">Operations & Finance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full input-underline py-2 text-on-surface text-xs"
                    placeholder="e.g. Lagos Office"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Employment Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full input-underline py-2 bg-transparent text-on-surface text-xs"
                  >
                    <option value="full-time">Full Time</option>
                    <option value="contract">Contract</option>
                    <option value="part-time">Part Time</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Job Description</label>
                <textarea
                  rows={4}
                  required
                  value={descriptionText}
                  onChange={(e) => setDescriptionText(e.target.value)}
                  className="w-full bg-surface-container p-3 text-on-surface border border-outline/10 outline-none text-xs"
                  placeholder="Provide a general description of this opening..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Requirements (One per line)</label>
                  <textarea
                    rows={6}
                    value={requirementsText}
                    onChange={(e) => setRequirementsText(e.target.value)}
                    className="w-full bg-surface-container p-3 text-on-surface border border-outline/10 outline-none text-xs font-mono"
                    placeholder="Masters in Architecture&#10;8+ years experience"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-widest text-[9px] text-primary block">Benefits (One per line)</label>
                  <textarea
                    rows={6}
                    value={benefitsText}
                    onChange={(e) => setBenefitsText(e.target.value)}
                    className="w-full bg-surface-container p-3 text-on-surface border border-outline/10 outline-none text-xs font-mono"
                    placeholder="Competitive remuneration&#10;Health insurance"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="active" className="font-bold uppercase tracking-widest text-[9px] text-on-surface cursor-pointer select-none">
                  Enable active hiring listing (shows vacancy on live careers portal)
                </label>
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
                  <Save className="w-4 h-4" /> {saving ? "Publishing..." : "Save Vacancy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
