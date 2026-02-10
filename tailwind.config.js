/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        haze: "#050505",
        plasma: "#00f2ff",
        ion: "#00f2ff",
        pulse: "#ff8c00",
        shard: "#8a8a8a",
        tech: {
          accent: "#00f2ff",
          warning: "#ff8c00",
          base: "#050505",
          border: "rgba(255, 255, 255, 0.1)",
          dim: "#555555",
        },
        border: "rgba(255, 255, 255, 0.1)",
        dim: "#555555",
      },
      fontFamily: {
        display: ["Orbitron", "system-ui", "sans-serif"],
        body: ["IBM Plex Mono", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(0, 242, 255, 0.2)",
        pulse: "0 0 30px rgba(255, 140, 0, 0.35)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(120%)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        scan: "scan 6s linear infinite",
        glow: "glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
