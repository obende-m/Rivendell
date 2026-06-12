import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Brand
        primary: "var(--primary)",
        "on-primary": "var(--on-primary)",
        "primary-container": "var(--primary-container)",
        "on-primary-container": "var(--on-primary)",
        "primary-fixed": "var(--primary-container)",
        "primary-fixed-dim": "var(--primary)",
        "inverse-primary": "var(--primary)",

        // Surfaces
        surface: "var(--surface)",
        "surface-dim": "var(--surface)",
        "surface-bright": "var(--surface-container)",
        "surface-container-lowest": "var(--background)",
        "surface-container-low": "var(--surface-container-low)",
        "surface-container": "var(--surface-container)",
        "surface-container-high": "var(--surface-container)",
        "surface-container-highest": "var(--surface-container)",
        "surface-variant": "var(--surface-container-low)",
        "surface-tint": "var(--primary)",

        // On-Surface
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",
        "inverse-surface": "var(--on-background)",
        "inverse-on-surface": "var(--background)",

        // Background
        background: "var(--background)",
        "on-background": "var(--on-background)",

        // Secondary
        secondary: "#c9c6c5",
        "on-secondary": "#313030",
        "secondary-container": "#4a4949",
        "on-secondary-container": "#bab8b7",
        "secondary-fixed": "#e5e2e1",
        "secondary-fixed-dim": "#c9c6c5",

        // Tertiary
        tertiary: "#cfcccc",
        "on-tertiary": "#313030",
        "tertiary-container": "#b3b1b1",
        "on-tertiary-container": "#444444",
        "tertiary-fixed": "#e5e2e1",
        "tertiary-fixed-dim": "#c8c6c5",

        // Error
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",

        // Outline
        outline: "var(--outline)",
        "outline-variant": "var(--outline)",

        // Brand Accents
        "gold-muted": "var(--gold-muted)",
        stone: "#E8E3D8",
        "charcoal-light": "#2A2A2A",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
        // Semantic aliases
        "display-xl": ["var(--font-playfair)", "serif"],
        "display-lg": ["var(--font-playfair)", "serif"],
        "headline-lg": ["var(--font-playfair)", "serif"],
        "headline-lg-mobile": ["var(--font-playfair)", "serif"],
        "body-lg": ["var(--font-manrope)", "sans-serif"],
        "body-md": ["var(--font-manrope)", "sans-serif"],
        "label-caps": ["var(--font-manrope)", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "96px",
          { lineHeight: "100%", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "display-lg": [
          "64px",
          { lineHeight: "110%", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        "headline-lg": [
          "48px",
          { lineHeight: "120%", fontWeight: "400" },
        ],
        "headline-lg-mobile": [
          "32px",
          { lineHeight: "120%", fontWeight: "400" },
        ],
        "body-lg": [
          "20px",
          { lineHeight: "160%", fontWeight: "300" },
        ],
        "body-md": [
          "16px",
          { lineHeight: "160%", fontWeight: "400" },
        ],
        "label-caps": [
          "12px",
          { lineHeight: "100%", letterSpacing: "0.15em", fontWeight: "600" },
        ],
      },
      spacing: {
        "grid-margin": "64px",
        "section-gap-desktop": "160px",
        "section-gap-mobile": "80px",
        gutter: "32px",
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px",
      },
      maxWidth: {
        container: "1440px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        editorial: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "scroll-indicator": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(12px)", opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "scroll-indicator": "scroll-indicator 2s infinite ease-in-out",
        "fade-up": "fade-up 1s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
