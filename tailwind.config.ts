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
        "surface-container-lowest": "#100e0b",
        "on-secondary": "#003739",
        "on-primary": "#392f19",
        "background": "#151310",
        "primary-container": "#c9b99a",
        "surface": "#151310",
        "surface-variant": "#383431",
        "primary-fixed": "#f2e1c0",
        "inverse-primary": "#695d43",
        "surface-container-highest": "#383431",
        "on-error": "#690005",
        "surface-dim": "#151310",
        "surface-bright": "#3c3935",
        "error-container": "#93000a",
        "surface-container-high": "#2c2926",
        "on-background": "#e8e1dc",
        "tertiary-fixed": "#f4e0bf",
        "inverse-surface": "#e8e1dc",
        "secondary-fixed": "#b8ecee",
        "on-primary-container": "#544931",
        "secondary": "#9cd0d2",
        "outline-variant": "#4b463d",
        "primary": "#e6d5b4",
        "secondary-container": "#1b5052",
        "tertiary-fixed-dim": "#d7c4a4",
        "surface-tint": "#d5c5a5",
        "surface-container-low": "#1e1b18",
        "outline": "#979085",
        "on-surface": "#e8e1dc",
        "on-surface-variant": "#cec5b9",
        "on-secondary-container": "#8ec1c3",
        "tertiary-container": "#cbb999",
        "surface-container": "#221f1c",
        "on-tertiary": "#3a2f18",
        "primary-fixed-dim": "#d5c5a5",
        "error": "#ffb4ab",
        "tertiary": "#e7d4b3",
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      fontFamily: {
        // Use CSS variables from next/font with fallbacks
        headline: ["var(--font-newsreader)", "Georgia", "Times New Roman", "serif"],
        body: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        label: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        // Add these for convenience
        newsreader: ["var(--font-newsreader)", "Georgia", "Times New Roman", "serif"],
        inter: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;