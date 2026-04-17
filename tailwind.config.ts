import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0E0E12",
        "obsidian-soft": "#1A1A22",
        neon: "#F3F31A",
        "off-white": "#F7F5F0",
        "warm-grey": "#5C5852",
        coral: "#FF6B5B",
      },
      fontFamily: {
        serif: ["var(--font-instrument)"],
        fraunces: ["var(--font-fraunces)"],
        caveat: ["var(--font-caveat)"],
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
export default config;
