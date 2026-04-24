import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF8F3",
        night: "#1E2B4F",
        stone: {
          DEFAULT: "#E8DDC9",
          warm: "#C9B896",
        },
        turquoise: {
          DEFAULT: "#2FA5B5",
          dark: "#238898",
        },
        muted: "#5A6378",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        "wave": "240px 16px 240px 16px",
        "wave-sm": "160px 8px 160px 8px",
        "card": "32px 4px 32px 4px",
        "stone": "120px 12px 120px 12px",
      },
      animation: {
        "ken-burns": "kenBurns 14s ease-in-out infinite alternate",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "wave-loop": "waveLoop 8s linear infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
      keyframes: {
        kenBurns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.06) translate(-1%, -1%)" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(47,165,181,0.4)" },
          "50%": { transform: "scale(1.02)", boxShadow: "0 0 0 12px rgba(47,165,181,0)" },
        },
        waveLoop: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      backgroundImage: {
        "stone-pattern": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        "wave": "0 30px 80px rgba(30,43,79,0.25)",
        "card-soft": "0 8px 32px rgba(30,43,79,0.08)",
        "card-hover": "0 12px 48px rgba(30,43,79,0.12)",
        "glow-turquoise": "0 0 32px rgba(47,165,181,0.35)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
