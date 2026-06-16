import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.json",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f7f6f2",
        ink: "#151515",
        muted: "#6f6f68",
        line: "#dedbd2",
        accent: "#8a5a44"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 16px 60px rgba(21, 21, 21, 0.07)"
      }
    }
  },
  plugins: []
};

export default config;
