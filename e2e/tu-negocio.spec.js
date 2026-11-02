import { test, expect } from "@playwright/test";

// Lote 11: Tu negocio. El axe y el movimiento reducido de estas páginas
// viven en calidad.spec.js con las demás.

test("de /tu-negocio a un giro y a su nivel, con teclado y foco visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/tu-negocio");
  const tarjeta = page.getByRole("link", { name: /Barberías y estéticas/ });
  await page.keyboard.press("Tab");
  for (let i = 0; i < 40 && !(await tarjeta.evaluate((el) => el === document.activeElement)); i++) {
    await page.keyboard.press("Tab");
  }
  await expect(tarjeta).toBeFocused();
  // El foco se ve: el contorno del sistema, no "none".
  expect(await tarjeta.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/tu-negocio\/barberias$/);
  await expect(page.getByRole("heading", { level: 1, name: "Tu agenda llena, sin vivir en el WhatsApp." })).toBeVisible();

  // La escalera: cinco escalones, cada uno con el enlace a su nivel.
  const escalones = page.locator("section[aria-labelledby=escalera] ol > li");
  await expect(escalones).toHaveCount(5);
  await expect(page.getByRole("link", { name: "Controla" })).toHaveAttribute("href", "/sistemas/controla");
});

test("Gimnasios lleva a Boaz y las empresas, a su página", async ({ page }) => {
  await page.goto("/tu-negocio");
  await expect(page.getByRole("link", { name: /Gimnasios/ })).toHaveAttribute("href", "/boaz");
  await expect(page.getByRole("link", { name: /Ver cómo trabajamos con empresas/ })).toHaveAttribute("href", "/tu-negocio/empresas");
  await expect(page.getByRole("link", { name: /Cadenas y franquicias.*SE COTIZA/ })).toBeVisible();
});

test("un giro grande regresa a empresas y el 04 lleva la cuerda verde", async ({ page }) => {
  await page.goto("/tu-negocio/distribuidoras");
  await expect(page.getByRole("link", { name: "Tu negocio · Empresas" })).toHaveAttribute("href", "/tu-negocio/empresas");
  await expect(page.locator(".giro-cuerda path.stroke-acento")).toHaveCount(1);
});

test("un giro que no existe es 404", async ({ page }) => {
  const respuesta = await page.goto("/tu-negocio/papelerias");
  expect(respuesta.status()).toBe(404);
});

test("Tu negocio está en el menú del celular y en el pie", async ({ page }) => {
  await page.goto("/tu-negocio/clinicas");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  const menu = page.getByRole("dialog", { name: "Menú principal" });
  await expect(menu.getByRole("link", { name: "Tu negocio" })).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Escape");
  await expect(page.locator("footer").getByRole("link", { name: "Tu negocio" })).toHaveAttribute("href", "/tu-negocio");
});
