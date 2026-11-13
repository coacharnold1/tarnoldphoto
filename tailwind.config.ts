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
        teal: "#0f766e",        // Deep teal/cyan
        "teal-light": "#14b8a6", // Bright teal
        "teal-bg": "#f0fdfa",    // Very light teal background
        emerald: "#059669",      // Deep green
        "emerald-light": "#10b981", // Bright green
        "emerald-bg": "#f0fdf4", // Very light green background
        orange: "#ea580c",       // Deep orange
        "orange-light": "#fb923c", // Bright orange
        "orange-bg": "#fff7ed",  // Very light orange background
        charcoal: "#1f2937",     // Dark gray for text
        "charcoal-light": "#374151", // Light gray
        "charcoal-bg": "#f9fafb", // Very light gray background
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
