import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fim: {
          ink: "#041329",
          blue: "#0d4ba6",
          blueSoft: "#7fb5ff",
          orange: "#ff6a2b",
          sand: "#f8f4ee",
          mist: "#d7e5ff",
          slate: "#7a8dad",
        },
      },
      boxShadow: {
        spotlight: "0 30px 120px rgba(8, 40, 92, 0.32)",
        panel: "0 24px 70px rgba(7, 17, 38, 0.22)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at top left, rgba(255, 106, 43, 0.28), transparent 36%), radial-gradient(circle at top right, rgba(127, 181, 255, 0.22), transparent 40%), linear-gradient(135deg, rgba(4, 19, 41, 0.94), rgba(8, 41, 91, 0.9))",
        "section-fade":
          "linear-gradient(180deg, rgba(4, 19, 41, 0.08), rgba(4, 19, 41, 0) 18%, rgba(255, 255, 255, 0))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-8px,0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "70%": { transform: "scale(1.08)", opacity: "0" },
          "100%": { transform: "scale(1.08)", opacity: "0" },
        },
        confetti: {
          "0%": { transform: "translate3d(0, -10px, 0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translate3d(10px, 120px, 0) rotate(420deg)", opacity: "0" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        drift: "drift 10s ease-in-out infinite",
        "pulse-ring": "pulseRing 2.8s ease-out infinite",
        confetti: "confetti 3s linear infinite",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;

