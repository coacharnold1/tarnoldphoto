import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      // tarnoldphoto palette: blue, green, orange
      teal: "rgb(15 118 110 / <alpha-value>)",
      "teal-light": "rgb(20 184 166 / <alpha-value>)",
      "teal-bg": "rgb(240 253 250 / <alpha-value>)",
      emerald: "rgb(5 150 105 / <alpha-value>)",
      "emerald-light": "rgb(16 185 129 / <alpha-value>)",
      "emerald-bg": "rgb(240 253 244 / <alpha-value>)",
      orange: "rgb(234 88 12 / <alpha-value>)",
      "orange-light": "rgb(251 146 60 / <alpha-value>)",
      "orange-bg": "rgb(255 247 237 / <alpha-value>)",
      charcoal: "rgb(31 41 55 / <alpha-value>)",
      "charcoal-light": "rgb(55 65 81 / <alpha-value>)",
      "charcoal-bg": "rgb(249 250 251 / <alpha-value>)",
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
