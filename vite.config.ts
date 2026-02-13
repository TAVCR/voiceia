import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative base works on GitHub Pages and when opening dist/index.html directly.
  base: "./",
  plugins: [react()],
});
