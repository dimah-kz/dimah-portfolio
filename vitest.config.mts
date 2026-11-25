import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/** Unit tests for the plain modules: routing, URLs, and content helpers. */
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  // The tests load no CSS; skip reading `postcss.config.ts`.
  css: { postcss: {} },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
