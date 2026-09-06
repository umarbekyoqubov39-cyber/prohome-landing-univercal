import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#070c1e",
          900: "#0b1330",
          800: "#0f1a3d",
          700: "#142248",
          600: "#1b2c58",
        },
        border: {
          subtle: "rgba(255,255,255,0.07)",
          medium: "rgba(255,255,255,0.12)",
        },
        brand: {
          green: "#22c55e",
          greenDark: "#16a34a",
          blue: "#3b82f6",
          blueDark: "#1d4ed8",
          cyan: "#22d3ee",
          teal: "#2dd4bf",
          purple: "#8b5cf6",
          amber: "#f59e0b",
          red: "#f87171",
        },
        ink: {
          primary: "#f8fafc",
          secondary: "#94a3b8",
          tertiary: "#64748b",
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1216px",
      },
      keyframes: {
        zigzag: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "loader-out": {
          from: { opacity: "1", visibility: "visible" },
          to: { opacity: "0", visibility: "hidden" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.6s ease forwards",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 40px -20px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
