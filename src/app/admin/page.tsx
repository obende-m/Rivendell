"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  FolderKanban,
  FileText,
  Briefcase,
  Search,
  ArrowUpRight,
  GitBranch,
  CheckCircle,
  HelpCircle,
  AlertTriangle
} from "lucide-react";

export default function AdminDashboard() {
  const [db, setDb] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [tokenSaved, setTokenSaved] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/cms");
        if (!res.ok) throw new Error("Failed to load database content");
        const data = await res.json();
        setDb(data);
        
        // Retrieve GitHub Token
        const savedToken = localStorage.getItem("cms_gh_token");
        if (savedToken) {
          setGithubToken(savedToken);
          setTokenSaved(true);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load database.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubToken.trim()) {
      localStorage.setItem("cms_gh_token", githubToken.trim());
      setTokenSaved(true);
    } else {
      localStorage.removeItem("cms_gh_token");
      setTokenSaved(false);
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

  const projects = db?.projects || [];
  const services = db?.services || [];
  const careers = db?.careers || [];
  const siteSettings = db?.siteSettings || {};

  const filteredProjects = projects.filter((p: any) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Top Banner / Error Banner */}
      {error && (
        <div className="p-4 bg-error-container text-on-error-container text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Projects */}
        <div className="bg-surface-container-low p-6 border border-outline/10 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-primary/10 text-primary">
              <FolderKanban className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-green-500 flex items-center gap-1 bg-green-500/10 px-2.5 py-1 uppercase tracking-widest">
              <TrendingUp className="w-3 h-3" /> Active
            </span>
          </div>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total Projects</p>
          <h3 className="text-3xl font-bold font-playfair text-primary mt-2">{projects.length}</h3>
          <div className="mt-4 w-full bg-surface-container h-1 overflow-hidden">
            <div className="bg-primary h-full w-[80%]"></div>
          </div>
        </div>

        {/* Card 2: Services Offered */}
        <div className="bg-surface-container-low p-6 border border-outline/10 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-primary/10 text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant">Ecosystem</span>
          </div>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Divisions & Services</p>
          <h3 className="text-3xl font-bold font-playfair text-primary mt-2">{services.length}</h3>
          <div className="mt-4 flex gap-1 h-3 items-end">
            <div className="h-2 w-full bg-primary/20"></div>
            <div className="h-3 w-full bg-primary"></div>
            <div className="h-1.5 w-full bg-primary/20"></div>
          </div>
        </div>

        {/* Card 3: Active Job Openings */}
        <div className="bg-surface-container-low p-6 border border-outline/10 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-primary/10 text-primary">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-[9px] uppercase tracking-widest text-primary font-bold">Hiring</span>
          </div>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Open Positions</p>
          <h3 className="text-3xl font-bold font-playfair text-primary mt-2">{careers.length}</h3>
          <p className="text-[9px] text-on-surface-variant/75 mt-3 uppercase tracking-wider">
            {careers.filter((c: any) => c.active).length} active roles listings
          </p>
        </div>
      </div>

      {/* Main Content Splitting */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Projects Table (Col Span 2) */}
        <div className="lg:col-span-2 bg-surface border border-outline/10 overflow-hidden">
          <div className="p-6 border-b border-outline/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="font-playfair text-base font-bold uppercase tracking-wider">Recent Developments</h4>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Projects catalog view</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-surface-container-low text-xs border-b border-outline/35 focus:border-primary outline-none w-full font-manrope text-on-surface placeholder:text-on-surface-variant/50"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface-container-low font-bold uppercase tracking-wider text-on-surface-variant border-b border-outline/10">
                  <th className="px-6 py-4">Project Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Year</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/10">
                {filteredProjects.slice(0, 5).map((project: any) => (
                  <tr key={project._id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-on-surface">{project.name}</p>
                        <p className="text-[10px] text-on-surface-variant/70 mt-0.5">{project.location}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 uppercase tracking-wider font-semibold text-[10px] text-primary">
                      {project.category}
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{project.year || "—"}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href="/admin/projects"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-all font-bold tracking-widest text-[9px] uppercase"
                      >
                        Manage <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredProjects.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-on-surface-variant">
                      No matching projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {projects.length > 5 && (
            <div className="p-4 bg-surface-container-low/40 border-t border-outline/10 text-center">
              <Link href="/admin/projects" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">
                View All {projects.length} Projects
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar settings columns */}
        <div className="space-y-6">
          {/* GitHub Connection */}
          <div className="bg-surface border border-outline/10 p-6 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <GitBranch className="w-5 h-5" />
              <h4 className="font-playfair text-sm font-bold uppercase tracking-wider">GitHub Sync</h4>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Commits are pushed securely to the main branch. Enter your Personal Access Token (PAT) below.
            </p>
            <form onSubmit={handleSaveToken} className="space-y-3">
              <div>
                <input
                  type="password"
                  placeholder={tokenSaved ? "••••••••••••••••••••••••" : "ghp_xxxxxxxxxxxxxxxxxxxx"}
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="w-full input-underline text-xs py-2 px-1 text-on-surface font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed text-[9px] font-bold uppercase tracking-widest transition-all"
              >
                {tokenSaved ? "Update Token" : "Save Connection Token"}
              </button>
            </form>
            {tokenSaved ? (
              <div className="flex items-center gap-1.5 text-green-500 text-[10px] uppercase font-bold tracking-wider pt-1">
                <CheckCircle className="w-3.5 h-3.5" /> Token active locally
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-primary text-[10px] uppercase font-bold tracking-wider pt-1">
                <HelpCircle className="w-3.5 h-3.5" /> Enter token to publish
              </div>
            )}
          </div>

          {/* System Info */}
          <div className="bg-surface border border-outline/10 p-6 space-y-4">
            <h4 className="font-playfair text-sm font-bold uppercase tracking-wider text-on-surface">Firm Summary</h4>
            <div className="space-y-3 text-[11px]">
              <div className="flex justify-between border-b border-outline/5 pb-2">
                <span className="text-on-surface-variant">Firm Name</span>
                <span className="font-bold text-on-surface">{siteSettings.siteName}</span>
              </div>
              <div className="flex justify-between border-b border-outline/5 pb-2">
                <span className="text-on-surface-variant">Default Title</span>
                <span className="font-bold text-on-surface line-clamp-1 max-w-[150px]">{siteSettings.defaultSeo?.metaTitle}</span>
              </div>
              <div className="flex justify-between border-b border-outline/5 pb-2">
                <span className="text-on-surface-variant">Local Status</span>
                <span className="font-bold text-green-500 uppercase tracking-widest text-[9px]">Connected</span>
              </div>
            </div>
            
            <div className="pt-2 flex gap-2">
              <Link
                href="/admin/settings"
                className="flex-1 py-2 bg-surface-container-low hover:bg-surface-container transition-all text-center text-[9px] font-bold uppercase tracking-widest"
              >
                Edit Config
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
