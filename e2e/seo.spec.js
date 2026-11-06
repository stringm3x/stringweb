import { test, expect } from "@playwright/test";

// SEO (lote 18): cada página pinta solo su JSON-LD, la 404 no lleva ninguno
// ni canonical, el head sin meta repetidas y el favicon responde.
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

test("la 404 con su título y sin canonical", async ({ page }) => {
  for (const ruta of ["/no-existe", "/sistemas/no-existe"]) {
    await page.goto(ruta);
    await expect(page, ruta).toHaveTitle("Esta sala no existe · STRING");
    await expect(page.locator('link[rel="canonical"]'), ruta).toHaveCount(0);
  }
});

test("head sin meta repetidas ni hreflang solitario", async ({ page }) => {
  for (const ruta of ["/", "/boaz", "/sistemas/responde"]) {
    await page.goto(ruta);
    await expect(page.locator('meta[name="viewport"]'), ruta).toHaveCount(1);
    await expect(page.locator("meta[charset]"), ruta).toHaveCount(1);
    await expect(page.locator('meta[http-equiv="Content-Type"]'), ruta).toHaveCount(0);
    await expect(page.locator('link[rel="alternate"][hreflang]'), ruta).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]'), ruta).toHaveCount(1);
  }
});

test("favicon: /favicon.ico y el PNG de 48 px responden", async ({ page, request }) => {
  expect((await request.get("/favicon.ico")).status()).toBe(200);
  await page.goto("/");
  const png = page.locator('link[rel="icon"][type="image/png"]');
  await expect(png).toHaveAttribute("sizes", "48x48");
  expect((await request.get(await png.getAttribute("href"))).status()).toBe(200);
});

test("/boaz comparte su propia imagen", async ({ page, request }) => {
  await page.goto("/boaz");
  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(new URL(og).pathname).toMatch(/^\/boaz\/opengraph-image/);
  const res = await request.get(new URL(og).pathname + new URL(og).search);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toBe("image/png");
});

test("/privacidad va al aviso de privacidad con 301", async ({ request }) => {
  // Boaz (string-gym-saas) enlaza a /privacidad.
  const r = await request.get("/privacidad", { maxRedirects: 0 });
  expect(r.status()).toBe(301);
  expect(r.headers().location).toMatch(/\/aviso-de-privacidad$/);
  const destino = await request.get("/privacidad");
  expect(destino.status()).toBe(200);
  expect(new URL(destino.url()).pathname).toBe("/aviso-de-privacidad");
});
