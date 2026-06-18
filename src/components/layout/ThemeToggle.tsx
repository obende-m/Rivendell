"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  if (!mounted) {
    return (
      <div 
        className="w-10 h-10 border border-gold-muted/30 rounded-full flex items-center justify-center text-transparent select-none pointer-events-none"
        aria-hidden="true"
      >
        <span className="material-symbols-outlined text-lg opacity-0">dark_mode</span>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 border border-gold-muted hover:bg-primary/10 text-primary transition-all duration-300 cursor-pointer select-none rounded-full"
      aria-label="Toggle theme"
    >
      <span className="material-symbols-outlined text-lg select-none">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
