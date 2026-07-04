import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Warm boutique surfaces: cream page, lighter elevated cards.
        base: {
          DEFAULT: "#f4ede1", // page
          900: "#efe6d8", // subtle recessed
          800: "#fffaf3", // elevated card
          700: "#e8dcc9",
        },
        // Warm accents: terracotta primary, soft terracotta, sage, gold.
        accent: {
          terra: "#c4623f",
          clay: "#d98c6a",
          sage: "#7f8a6f",
          gold: "#c99a5b",
        },
        ink: {
          DEFAULT: "#2c2620", // espresso primary text
          muted: "#6b6154",
          faint: "#9a8f7f",
        },
        line: "#e4d8c5", // warm hairline
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "Cambria", "serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        aurora: {
          "0%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%,-4%,0) scale(1.15)" },
          "66%": { transform: "translate3d(-5%,5%,0) scale(0.92)" },
          "100%": { transform: "translate3d(0,0,0) scale(1)" },
        },
        "aurora-slow": {
          "0%": { transform: "translate3d(0,0,0) scale(1.1)" },
          "50%": { transform: "translate3d(-7%,6%,0) scale(0.95)" },
          "100%": { transform: "translate3d(0,0,0) scale(1.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        aurora: "aurora 22s ease-in-out infinite",
        "aurora-slow": "aurora-slow 30s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        marquee: "marquee 34s linear infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
