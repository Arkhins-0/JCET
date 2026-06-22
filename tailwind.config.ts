import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // ---- JCET brand design system ----
        primary: {
          DEFAULT: "#0B1F4E", // deep navy
          light: "#13306F",
          dark: "#081636",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#00C9B1", // electric teal
          light: "#33D6C3",
          dark: "#00A08D",
          foreground: "#04231F",
        },
        accent: {
          DEFAULT: "#F5A623", // warm gold
          light: "#FFBB4D",
          dark: "#D98C0A",
          foreground: "#3A2600",
        },
        surface: "#F8FAFC", // off-white background
        muted: {
          DEFAULT: "#64748B", // slate gray (secondary text)
          foreground: "#475569",
        },
        // shadcn-compatible aliases (light theme only)
        border: "#E2E8F0",
        input: "#E2E8F0",
        ring: "#00C9B1",
        background: "#FFFFFF",
        foreground: "#0B1F4E",
        card: "#FFFFFF",
        destructive: { DEFAULT: "#DC2626", foreground: "#FFFFFF" },
      },
      fontFamily: {
        display: ["var(--font-outfit)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(11,31,78,0.08), 0 1px 2px rgba(11,31,78,0.06)",
        hover: "0 18px 40px -18px rgba(11,31,78,0.35)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 30s linear infinite",
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
