import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure favicon in public directory is synced with trublendeduforcarrier copy.png
try {
  const sourceFav = path.resolve(__dirname, "src/assets/trublendeduforcarrier copy.png");
  const targetFav = path.resolve(__dirname, "public/favicon.png");
  const targetFavIco = path.resolve(__dirname, "public/favicon.ico");
  if (fs.existsSync(sourceFav)) {
    fs.copyFileSync(sourceFav, targetFav);
    fs.copyFileSync(sourceFav, targetFavIco);
  }
} catch {
  // Ignore sync errors
}

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    sourcemap: true,
  },
});
