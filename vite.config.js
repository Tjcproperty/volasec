import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const plugins = [react()];

if (!process.env.DISABLE_CLOUDFLARE_PLUGIN) {
  const { cloudflare } = await import("@cloudflare/vite-plugin");
  plugins.push(cloudflare());
}

export default defineConfig({
  plugins,
  server: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
