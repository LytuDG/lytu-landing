import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    conditions: ["import", "module", "browser", "default"],
  },
  build: {
    manifest: true,
    ssrManifest: true,
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  ssr: {
    noExternal: ["react-router-dom", "react-i18next", "i18next"],
    resolve: {
      conditions: ["node", "import", "module", "default"],
      externalConditions: ["node"],
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
