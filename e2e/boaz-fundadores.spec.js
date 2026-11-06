import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Lote 21: Escala "Próximamente" y Programa Fundadores en /boaz. Escala se ve
// pero no se contrata; /gym/registro y el JSON-LD siguen sin Escala ni el
// fundador. El fundador se busca por su sección, nunca por "$799" (Starter
// también cuesta eso). El 0 se prueba en /muestrario/boaz (solo en
// desarrollo; estas pruebas corren contra npm run dev).

// "bot" como palabra suelta: un \bbot\b simple da positivo con "botón".
const BOT = /(?<!\p{L})bots?(?!\p{L})/iu;

test("Escala se ve como Próximamente y no se contrata", async ({ page }) => {
  await page.goto("/boaz");
  const escala = page.locator('[data-plan="escala"]');
  await expect(escala).toBeVisible();
  await expect(escala.getByRole("heading", { name: "Escala" })).toBeVisible();
  await expect(escala).toContainText("PRÓXIMAMENTE · EN DESARROLLO");
  await expect(escala).toContainText("$1,999");
  await expect(escala).toContainText("$19,990");
  await expect(escala.locator('a[href*="/gym/registro"]')).toHaveCount(0);
  const texto = (await escala.innerText()).replace(/todavía no se puede contratar/i, "");
  expect(texto).not.toMatch(/contratar/i);
  const enlaces = await escala.locator("a").evaluateAll((as) => as.map((a) => a.href));
  expect(enlaces).toHaveLength(1);
  expect(decodeURIComponent(enlaces[0])).toContain("wa.me/525545524847?text=Hola Carlos, quiero que me avises cuando salga Boaz Escala.");
});

test("la palabra bot no aparece en /boaz", async ({ page }) => {
  await page.goto("/boaz");
  expect(await page.locator("body").innerText()).not.toMatch(BOT);
});

test("/gym/registro sigue sin Escala ni fundador", async ({ page }) => {
  await page.goto("/gym/registro");
  const texto = await page.locator("body").innerText();
  expect(texto).not.toMatch(/escala|fundador|1,999|19,990/i);
});

test("el JSON-LD de /boaz solo trae Starter y Pro", async ({ page }) => {
  await page.goto("/boaz");
  const bloques = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t));
  const app = bloques.find((b) => b["@type"] === "SoftwareApplication");
  expect(app.offers.map((o) => [o.name, o.price])).toEqual([
    ["Starter", "799"],
    ["Pro", "1299"],
  ]);
  const crudo = JSON.stringify(bloques);
  expect(crudo).not.toMatch(/escala|fundador/i);
  expect(crudo).not.toMatch(/1,?999|19,?990/);
});

test("Fundadores: $799 fijo 12 meses y quedan 5 de 5 lugares", async ({ page }) => {
  await page.goto("/boaz");
  const f = page.locator("#fundadores");
  await expect(f.getByRole("heading", { name: "5 gimnasios fundadores." })).toBeVisible();
  await expect(f).toContainText("$799");
  await expect(f).toContainText("AL MES · FIJO 12 MESES");
  await expect(f).toContainText("QUEDAN 5 DE 5 LUGARES");
  await expect(f.locator('[aria-hidden="true"] [data-casilla]')).toHaveCount(5);
  const boton = f.getByRole("link", { name: "Quiero ser fundador" });
  await expect(boton).toBeVisible();
  expect(decodeURIComponent(await boton.getAttribute("href"))).toContain(
    "wa.me/525545524847?text=Hola Carlos, quiero ser fundador de Boaz. Mi gimnasio es: ",
  );
  expect((await boton.boundingBox()).height).toBeGreaterThanOrEqual(52);
  // Fundadores va justo después de los planes.
  const siguiente = await page.locator("#planes").evaluate((s) => s.nextElementSibling?.id);
  expect(siguiente).toBe("fundadores");
});

test("un solo botón azul entre Planes y Fundadores", async ({ page }) => {
  await page.goto("/boaz");
  await expect(page.locator("#planes a.bg-acento, #fundadores a.bg-acento")).toHaveCount(1);
});

test("Fundadores con 0, 1 y 2 lugares (prueba de componente)", async ({ page }) => {
  await page.goto("/muestrario/boaz");
  const cero = page.locator("#lugares-0");
  await expect(cero).toContainText("LOS 5 LUGARES ESTÁN TOMADOS");
  await expect(cero).toContainText("Los 5 lugares ya tienen dueño.");
  await expect(cero.getByRole("link", { name: "Registra tu gimnasio" })).toHaveAttribute("href", "/gym/registro");
  await expect(cero.getByRole("link", { name: "Quiero ser fundador" })).toHaveCount(0);
  await expect(cero.locator('[data-casilla="tomada"]')).toHaveCount(5);
  await expect(page.locator("#lugares-1")).toContainText("QUEDA 1 DE 5 LUGARES");
  await expect(page.locator("#lugares-2")).toContainText("QUEDAN 2 DE 5 LUGARES");
  await expect(page.locator("#lugares-2 [data-casilla='siguiente']")).toHaveCount(1);
  await expect(page.locator("#lugares-5")).toContainText("QUEDAN 5 DE 5 LUGARES");
  await expect(page.locator("#escala-pruebas")).toContainText("PRÓXIMAMENTE · EN PRUEBAS EN UN GIMNASIO REAL");
});

for (const ruta of ["/boaz", "/muestrario/boaz"]) {
  test(`axe sin fallas WCAG A/AA (contraste ≥ 4.5:1) en ${ruta}`, async ({ page }) => {
    await page.goto(ruta);
    const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(r.violations.map((v) => v.id)).toEqual([]);
  });
}
