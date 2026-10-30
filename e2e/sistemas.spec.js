import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

// /sistemas y las páginas de nivel (lote 8, docs/pagina-nivel.md).
const TEXTOS = fs.readFileSync(path.resolve("docs/textos.md"), "utf8");
const NIVELES = [
  ["responde", "Que nadie se quede sin respuesta."],
  ["organiza", "Cada cliente en su lugar."],
  ["automatiza", "Que el seguimiento lo dé el sistema."],
  ["controla", "Sabe cuánto ganas y qué está pasando."],
  ["empresa", "Un sistema completo, con su equipo."],
];

for (const [slug, titular] of NIVELES) {
  test(`/sistemas/${slug}: titular, ficha y botón`, async ({ page }) => {
    await page.goto(`/sistemas/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(titular);
    const ficha = page.getByRole("complementary", { name: "Ficha de la obra" });
    await expect(ficha).toBeVisible();
    await expect(ficha.getByRole("link", { name: "Solicitar diagnóstico" })).toHaveAttribute("href", "/diagnostico");
    await expect(page.getByText("EJEMPLO", { exact: true })).toBeVisible();
  });
}

test("en celular la ficha va justo después del dibujo", async ({ page }) => {
  await page.goto("/sistemas/responde");
  const dibujo = await page.locator(".nivel-dibujo").boundingBox();
  const ficha = await page.getByRole("complementary", { name: "Ficha de la obra" }).boundingBox();
  const incluye = await page.locator("#incluye").boundingBox();
  expect(ficha.y).toBeGreaterThan(dibujo.y + dibujo.height - 1);
  expect(incluye.y).toBeGreaterThan(ficha.y + ficha.height - 1);
});

test("en escritorio la ficha acompaña pegada bajo la barra", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/sistemas/responde");
  await page.locator("#como-trabajamos").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const ficha = await page.getByRole("complementary", { name: "Ficha de la obra" }).boundingBox();
  expect(Math.round(ficha.y)).toBe(104);
});

test("/sistemas lleva a cada nivel y sus textos están en textos.md", async ({ page }) => {
  await page.goto("/sistemas");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Cinco niveles. La misma calidad.");
  for (const [slug] of NIVELES) {
    await expect(page.locator(`a[href="/sistemas/${slug}"]`)).toHaveCount(1);
  }
  const puntos = await page.locator("#incluyen ~ ul li").allInnerTexts();
  expect(puntos).toHaveLength(4);
  for (const p of puntos) expect(TEXTOS).toContain(p.replace(/^✓\s*/, "").trim());
});

test("la sala 4 enlaza a cada página de nivel", async ({ page }) => {
  await page.goto("/");
  for (const [slug] of NIVELES) {
    await expect(page.locator(`#niveles a[href="/sistemas/${slug}"]`)).toHaveCount(1);
  }
});

test("la barra lleva a /sistemas y ya no tiene Galería", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/sistemas/controla");
  const barra = page.locator("header nav").first();
  await expect(barra.getByRole("link", { name: "Sistemas" })).toHaveAttribute("href", "/sistemas");
  await expect(barra.getByRole("link", { name: "Galería" })).toHaveCount(0);
});

test("un nivel que no existe es 404", async ({ page }) => {
  const r = await page.goto("/sistemas/otro");
  expect(r.status()).toBe(404);
});

test("las rutas viejas de servicios van a /sistemas con 301", async ({ request }) => {
  for (const vieja of ["/servicios", "/servicios/web", "/Services", "/Services/1"]) {
    const r = await request.get(vieja, { maxRedirects: 0 });
    expect(r.status(), vieja).toBe(301);
    expect(r.headers().location, vieja).toMatch(/\/sistemas$/);
  }
});
