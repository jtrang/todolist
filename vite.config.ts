// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import spaServer from "vite-spa-server";

export default defineConfig({
  plugins: [
    react(),
    spaServer({
      entry: "./src/index.ts",
      port: 3000,
      serverType: "express",
    }),
  ],
});