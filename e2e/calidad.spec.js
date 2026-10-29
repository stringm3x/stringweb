import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Repaso de calidad (lote 5): accesibilidad con axe, movimiento reducido,
// la 404 y el menú del celular con teclado, a 375 px.
const PAGINAS = ["/", "/nosotros", "/diagnostico", "/saas", "/aviso-de-privacidad", "/terminos", "/no-existe"];

test.beforeEach(async ({ page }) => {
  // Turnstile no se carga en las pruebas: es un iframe de terceros.
  await page.route("https://challenges.cloudflare.com/**", (ruta) => ruta.abort());
});

for (const ruta of PAGINAS) {
  test(`axe sin fallas WCAG A/AA en ${ruta}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(ruta);
    await page.waitForLoadState("load");
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`)).toEqual([]);
  });

  test(`con menos movimiento nada se mueve en ${ruta}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(ruta);
    await page.waitForLoadState("load");
    await page.waitForTimeout(300);
    const enMarcha = await page.evaluate(() =>
      document.getAnimations().filter((a) => a.playState === "running").length
    );
    expect(enMarcha).toBe(0);
  });
}

test("la 404 responde 404 y lleva al inicio", async ({ page }) => {
  const respuesta = await page.goto("/no-existe");
  expect(respuesta.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Esta sala no existe." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute("href", "/");
});

test("el menú del celular se usa con teclado", async ({ page }) => {
  await page.goto("/nosotros");
  const abrir = page.getByRole("button", { name: "Abrir menú" });
  await abrir.focus();
  await page.keyboard.press("Enter");

  const menu = page.getByRole("dialog", { name: "Menú principal" });
  await expect(menu).toBeVisible();
  await expect(page.getByRole("button", { name: "Cerrar menú" })).toBeFocused();

  // El foco no sale del menú mientras está abierto.
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    expect(await menu.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(abrir).toBeFocused();
});
