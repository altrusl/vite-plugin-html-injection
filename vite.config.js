import { defineConfig } from "vite";
import { resolve } from "path";
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "HtmlInjection",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["fs", "path", "vite"],
    },
  },
});