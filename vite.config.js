import { defineConfig } from "vite";
import { resolve } from "path";
// import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "HtmlInjection",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["fs", "path"],
    },
  },
});
