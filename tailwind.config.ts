import type { Config } from "tailwindcss";

/**
 * Tokens migrados de legacy/css/variables.css (design tokens da v1).
 * Fonte única de verdade do visual do Sandlerflix.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        bg: {
          DEFAULT: "#141414", // Netflix black
          elevated: "#1a1a1a", // cards, modais, overlays
          hover: "#2a2a2a",
        },
        overlay: "rgba(0,0,0,0.75)",
        primary: {
          DEFAULT: "#e50914",
          dark: "#b20710",
          glow: "rgba(229,9,20,0.25)",
        },
        content: {
          DEFAULT: "#ffffff",
          secondary: "#a3a3a3",
          muted: "#666666",
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.08)",
          hover: "rgba(255,255,255,0.18)",
        },
        skeleton: {
          base: "#1f1f1f",
          shimmer: "#2d2d2d",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Netflix Sans"', "Arial", "sans-serif"],
        body: ['"Netflix Sans"', "Arial", "Helvetica", "sans-serif"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
      },
      spacing: {
        header: "68px",
      },
      maxWidth: {
        site: "1400px",
      },
      borderRadius: {
        sm: "2px",
        base: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0,0,0,0.5)",
        base: "0 4px 12px rgba(0,0,0,0.6)",
        lg: "0 8px 32px rgba(0,0,0,0.8)",
        card: "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.7)",
        modal: "0 25px 80px rgba(0,0,0,0.9)",
        glow: "0 0 20px rgba(229,9,20,0.25)",
      },
      zIndex: {
        dropdown: "100",
        sticky: "200",
        overlay: "300",
        modal: "400",
        toast: "500",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      aspectRatio: {
        poster: "2 / 3",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s ease-in-out infinite",
        "fade-in": "fade-in 400ms ease both",
      },
    },
  },
  plugins: [],
} satisfies Config;
