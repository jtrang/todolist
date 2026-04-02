// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import spaServer from "vite-spa-server";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    spaServer({
      entry: "./src/index.ts",
      port: 3000,
      serverType: "express",
    }),
  ],
});