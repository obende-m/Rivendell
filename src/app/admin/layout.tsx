"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Briefcase,
  Settings as SettingsIcon,
  Bell,
  Plus,
  Globe,
  Menu,
  X,
  UserCheck
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [db, setDb] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/cms");
        if (res.ok) {
          const data = await res.json();
          setDb(data);
        }
      } catch (err) {
        console.error("Failed to load layout CMS settings", err);
      }
    }
    loadData();
  }, []);

  const sidebarLinks = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Projects", href: "/admin/projects", icon: <FolderKanban className="w-5 h-5" /> },
    { label: "Services", href: "/admin/services", icon: <FileText className="w-5 h-5" /> },
    { label: "Careers", href: "/admin/careers", icon: <Briefcase className="w-5 h-5" /> },
    { label: "Settings", href: "/admin/settings", icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(href);
  };

  const siteName = db?.siteSettings?.siteName || "Rivendell";

  return (
    <div className="min-h-screen flex bg-background text-on-surface font-manrope">
      {/* Mobile Sidebar Overlay Backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`bg-surface-container-low w-64 fixed left-0 top-0 bottom-0 h-screen flex flex-col p-6 gap-2 border-r border-outline/10 shadow-md z-40 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between lg:justify-start gap-3 py-4 mb-6">
          <div>
            <h1 className="font-playfair text-xl font-bold uppercase tracking-widest text-primary leading-none">
              {siteName}
            </h1>
            <p className="text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/70 mt-2">
              System Control Panel
            </p>
          </div>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-on-surface-variant hover:text-primary transition-colors focus:outline-none cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-grow space-y-1">
          {sidebarLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 transition-all duration-150 text-xs font-semibold uppercase tracking-wider ${
                  active
                    ? "bg-primary text-on-primary border-l-2 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Block in Sidebar */}
        <div className="mt-auto pt-6 border-t border-outline/10 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs">
              RC
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface leading-none">Admin Concierge</p>
              <p className="text-[9px] uppercase tracking-widest text-on-surface-variant/70 mt-1">Super Admin</p>
            </div>
          </div>
          <Link
            href="/"
            className="w-full py-2.5 px-4 bg-outline/10 hover:bg-outline/20 text-on-surface text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all uppercase tracking-widest"
          >
            <Globe className="w-3.5 h-3.5" />
            View Website
          </Link>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col w-full">
        {/* Top Header Bar */}
        <header className="h-20 px-6 md:px-10 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-30 border-b border-outline/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-playfair text-lg font-bold text-on-surface leading-none uppercase tracking-wider">
                Control Panel
              </h2>
              <p className="text-[10px] text-on-surface-variant/80 mt-1 uppercase tracking-widest">
                Welcome back, Administrator
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors relative cursor-pointer">
              <Bell className="w-4 h-4 text-on-surface-variant" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
            </button>
            <div className="h-6 w-[1px] bg-outline/20"></div>
            
            <Link
              href="/admin/projects"
              className="flex items-center gap-2 py-2 px-4 bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed transition-all active:scale-[0.98] text-[10px] font-bold tracking-widest uppercase shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              New Project
            </Link>
          </div>
        </header>

        {/* Content container */}
        <main className="p-6 md:p-10 flex-grow bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
