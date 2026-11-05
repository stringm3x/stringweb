import { test, expect } from "@playwright/test";

// Datos estructurados (lote 18): cada página pinta solo el suyo, y ni la 404
// ni las páginas sin datos llevan ninguno.
async function bloques(page, ruta) {
  await page.goto(ruta);
  const textos = await page.locator('script[type="application/ld+json"]').allTextContents();
  return textos.map((t) => JSON.parse(t));
}

test("cada página con su JSON-LD", async ({ page }) => {
  const esperados = {
    "/": ["ProfessionalService"],
    "/boaz": ["SoftwareApplication"],
    "/sistemas/responde": ["BreadcrumbList"],
    "/tu-negocio/barberias": ["BreadcrumbList"],
    "/tu-negocio/hoteles": ["BreadcrumbList"],
    "/sistemas": [],
    "/nosotros": [],
  };
  for (const [ruta, tipos] of Object.entries(esperados)) {
    expect((await bloques(page, ruta)).map((b) => b["@type"]), ruta).toEqual(tipos);
  }
});

test("la 404 sin JSON-LD", async ({ page }) => {
  for (const ruta of ["/no-existe", "/sistemas/no-existe", "/tu-negocio/no-existe"]) {
    expect(await bloques(page, ruta), ruta).toEqual([]);
  }
});
