import { defineConfig, devices } from "@playwright/test";

// Pruebas de /interno contra el build de producción (npm run test:e2e:interno).
// Las cabeceras (Cache-Control con no-store) solo cuentan en producción: en
// dev, Next pone las suyas. Arma el build y lo sirve en el 3100, aparte del
// servidor de desarrollo. Sin las variables de Supabase, /interno falla
// cerrado: no hace falta un Supabase real.
export default defineConfig({
  testDir: "./e2e",
  testMatch: "interno.spec.js",
  use: { baseURL: "http://localhost:3100" },
  projects: [{ name: "celular-390", use: { ...devices["iPhone 13"], browserName: "chromium", viewport: { width: 390, height: 844 } } }],
  webServer: {
    command: "npm run build && npx next start -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: false,
    timeout: 300_000,
  },
});
