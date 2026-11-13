import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // tarnoldphoto palette: blue, green, orange
        teal: "#0f766e",
        "teal-light": "#14b8a6",
        "teal-bg": "#f0fdfa",
        emerald: "#059669",
        "emerald-light": "#10b981",
        "emerald-bg": "#f0fdf4",
        orange: "#ea580c",
        "orange-light": "#fb923c",
        "orange-bg": "#fff7ed",
        charcoal: "#1f2937",
        "charcoal-light": "#374151",
        "charcoal-bg": "#f9fafb",
      },
    },
    fontFamily: {
      sans: ["var(--font-sans)"],
    },
  },
  plugins: [],
};

export default config;
