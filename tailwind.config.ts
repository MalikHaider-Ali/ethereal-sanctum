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
        sm: "0.5rem",      // Added for smaller screens
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
      // ========== RESPONSIVE ADDITIONS ==========
      
      // 1. Custom responsive font sizes
      fontSize: {
        // Fluid responsive font sizes using clamp()
        "fluid-xs": ["clamp(0.75rem, 2vw, 0.875rem)", { lineHeight: "1.4" }],
        "fluid-sm": ["clamp(0.875rem, 2.5vw, 1rem)", { lineHeight: "1.5" }],
        "fluid-base": ["clamp(1rem, 3vw, 1.125rem)", { lineHeight: "1.5" }],
        "fluid-lg": ["clamp(1.125rem, 3.5vw, 1.25rem)", { lineHeight: "1.5" }],
        "fluid-xl": ["clamp(1.25rem, 4vw, 1.5rem)", { lineHeight: "1.3" }],
        "fluid-2xl": ["clamp(1.5rem, 5vw, 1.875rem)", { lineHeight: "1.2" }],
        "fluid-3xl": ["clamp(1.875rem, 6vw, 2.25rem)", { lineHeight: "1.2" }],
        "fluid-4xl": ["clamp(2.25rem, 7vw, 3rem)", { lineHeight: "1.1" }],
        "fluid-5xl": ["clamp(3rem, 8vw, 4rem)", { lineHeight: "1.1" }],
      },
      
      // 2. Custom responsive spacing
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "100": "25rem",
        "128": "32rem",
      },
      
      // 3. Custom responsive max-width containers
      maxWidth: {
        "container-sm": "640px",
        "container-md": "768px",
        "container-lg": "1024px",
        "container-xl": "1280px",
        "container-2xl": "1536px",
      },
      
      // 4. Custom responsive gap scales
      gap: {
        "sm-responsive": "clamp(0.5rem, 2vw, 1rem)",
        "md-responsive": "clamp(1rem, 3vw, 1.5rem)",
        "lg-responsive": "clamp(1.5rem, 4vw, 2rem)",
        "xl-responsive": "clamp(2rem, 5vw, 3rem)",
      },
      
      // 5. Custom responsive padding scales
      padding: {
        "section-y": "clamp(2rem, 8vw, 5rem)",
        "section-x": "clamp(1rem, 4vw, 2rem)",
      },
      
      // 6. Custom responsive margin scales
      margin: {
        "section-y": "clamp(2rem, 8vw, 5rem)",
        "section-x": "clamp(1rem, 4vw, 2rem)",
      },
      
      // 7. Add custom breakpoints (optional)
      screens: {
        'xs': '475px',    // Extra small devices
        'sm': '640px',    // Default Tailwind
        'md': '768px',    // Default Tailwind
        'lg': '1024px',   // Default Tailwind
        'xl': '1280px',   // Default Tailwind
        '2xl': '1536px',  // Default Tailwind
        '3xl': '1920px',  // Extra large desktops
      },
      
      // 8. Responsive container configuration
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '2rem',
          xl: '2.5rem',
        },
      },
    },
  },
  plugins: [
    // Add any Tailwind plugins here if needed
  ],
};

export default config;