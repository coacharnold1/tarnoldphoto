import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      // tarnoldphoto palette: blue, green, orange
      teal: "var(--color-teal)",
      "teal-light": "var(--color-teal-light)",
      "teal-bg": "var(--color-teal-bg)",
      emerald: "var(--color-emerald)",
      "emerald-light": "var(--color-emerald-light)",
      "emerald-bg": "var(--color-emerald-bg)",
      orange: "var(--color-orange)",
      "orange-light": "var(--color-orange-light)",
      "orange-bg": "var(--color-orange-bg)",
      charcoal: "var(--color-charcoal)",
      "charcoal-light": "var(--color-charcoal-light)",
      "charcoal-bg": "var(--color-charcoal-bg)",
      white: "#ffffff",
      black: "#000000",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
    },
    fontFamily: {
      sans: ["var(--font-sans)"],
    },
  },
  plugins: [],
};

export default config;
