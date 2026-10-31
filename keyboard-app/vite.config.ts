import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Builds the keyboard into ../public/skill-keyboard (served by the main site).
// Static assets (keycaps.glb, sounds, fonts) already live in ../public at the
// same absolute URLs the keyboard code expects, so the dev server reuses that
// folder and the build does not copy it again.
export default defineConfig({
  base: "./",
  plugins: [react()],
  publicDir: "../public",
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  build: {
    outDir: "../public/skill-keyboard",
    emptyOutDir: true,
    copyPublicDir: false,
    assetsDir: "bundle",
    chunkSizeWarningLimit: 2500,
  },
});
