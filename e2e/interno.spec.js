import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// /interno en producción, sin sesión (npm run test:e2e:interno, a 390 px).
// Corre con playwright.produccion.config.mjs; el config de dev lo ignora.

function cabecerasPrivadas(res, ruta) {
  const h = res.headers();
  expect(h["x-robots-tag"], ruta).toMatch(/noindex/);
  expect(h["x-robots-tag"], ruta).toMatch(/nofollow/);
  // Obligatorio: no-store. Deseable: private.
  expect(h["cache-control"], ruta).toMatch(/no-store/);
  if (!/private/.test(h["cache-control"])) test.info().annotations.push({ type: "aviso", description: `${ruta} sin private` });
}

test("sin sesión, /interno/diagnostico redirige a /interno/entrar", async ({ page, request }) => {
  const directo = await request.get("/interno/diagnostico", { maxRedirects: 0 });
  expect([307, 308]).toContain(directo.status());
  expect(new URL(directo.headers().location, "http://x").pathname).toBe("/interno/entrar");
  cabecerasPrivadas(directo, "redirect de /interno/diagnostico");

  await page.goto("/interno/diagnostico");
  await expect(page).toHaveURL(/\/interno\/entrar$/);
  await expect(page.getByRole("heading", { level: 1, name: "Entrar" })).toBeVisible();
});

test("/interno y rutas que no existen también van a la entrada", async ({ request }) => {
  for (const ruta of ["/interno", "/interno/no-existe"]) {
    const res = await request.get(ruta, { maxRedirects: 0 });
    expect([307, 308], ruta).toContain(res.status());
    expect(new URL(res.headers().location, "http://x").pathname, ruta).toBe("/interno/entrar");
    cabecerasPrivadas(res, ruta);
  }
});

test("/interno/entrar responde con X-Robots-Tag noindex y Cache-Control no-store", async ({ request }) => {
  for (const ruta of ["/interno/entrar", "/interno/entrar?error=1"]) {
    const res = await request.get(ruta);
    expect(res.status(), ruta).toBe(200);
    cabecerasPrivadas(res, ruta);
  }
});

test("/interno/entrar: noindex sin canonical, Open Graph ni Twitter", async ({ page }) => {
  await page.goto("/interno/entrar");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex.*nofollow|nofollow.*noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property^="og:"]')).toHaveCount(0);
  await expect(page.locator('meta[name^="twitter:"]')).toHaveCount(0);
});

test("/interno/entrar sin la barra ni el pie del sitio", async ({ page }) => {
  await page.goto("/interno/entrar");
  await expect(page.locator("footer")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Solicitar diagnóstico" })).toHaveCount(0);
});

test("sin variables de Supabase, entrar no deja pasar", async ({ page }) => {
  await page.goto("/interno/entrar");
  await page.getByLabel("Correo").fill("alguien@ejemplo.mx");
  await page.getByLabel("Contraseña").fill("cualquiera");
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page.getByText("No se pudo entrar. Revisa los datos.")).toBeVisible();
  await expect(page).toHaveURL(/\/interno\/entrar\?error=1$/);
});

for (const ruta of ["/interno/entrar", "/interno/entrar?error=1"]) {
  test(`axe sin fallas WCAG A/AA en ${ruta} a 390 px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(ruta);
    await page.waitForLoadState("load");
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`)).toEqual([]);
  });
}

test("las páginas públicas no pasan por el proxy de /interno", async ({ request }) => {
  for (const ruta of ["/", "/sistemas/responde", "/productos", "/boaz"]) {
    const res = await request.get(ruta);
    expect(res.status(), ruta).toBe(200);
    expect(res.headers()["x-robots-tag"], ruta).toBeUndefined();
  }
});
