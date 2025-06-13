import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // ou ./e2e si tu renommes
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: "pnpm --filter web dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
