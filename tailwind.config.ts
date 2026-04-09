import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hype: {
          sand: "#C5A882",
          cream: "#F5EDD8",
          brown: "#8B6145",
          dark: "#2C1810",
          light: "#FBF7F0",
          success: "#4A7C59",
          error: "#B04A3A",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        bounceY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-fast": "marquee 15s linear infinite",
        fadeUp: "fadeUp 0.6s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        bounceY: "bounceY 1.5s ease-in-out infinite",
      },
      boxShadow: {
        card: "0 4px 20px rgba(139, 97, 69, 0.1)",
        "card-hover": "0 8px 40px rgba(139, 97, 69, 0.2)",
        drawer: "-4px 0 40px rgba(44, 24, 16, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
