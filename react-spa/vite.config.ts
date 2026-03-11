/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // https://tailwindcss.com/docs/installation/using-vite
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
  ],
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
          setupFiles: ["./vitest.setup.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "browser",
          include: ["src/**/*.{browsertest,spec}.?(c|m)[jt]s?(x)"],
          setupFiles: ["./vitest.browsertest.setup.ts"],
          browser: {
            enabled: true,
            provider: playwright(),
            trace: {
              mode: "on",
              // the path is relative to the root of the project
              tracesDir: "./playwright-traces",
            },
            // https://vitest.dev/guide/browser/playwright
            instances: [{ browser: "chromium" }],
            screenshotFailures: true,
            screenshotDirectory: "vitest-screenshots",
          },
        },
      },
    ],
  },
});
