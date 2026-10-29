import { defineConfig, devices } from "@playwright/test";

// Pruebas en navegador (npm run test:e2e). Usan el servidor de desarrollo;
// si ya hay uno en el 3000, lo reutilizan.
export default defineConfig({
  testDir: "./e2e",
  use: { baseURL: "http://localhost:3000" },
  projects: [{ name: "celular", use: { ...devices["iPhone 13"], browserName: "chromium", viewport: { width: 375, height: 812 } } }],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
