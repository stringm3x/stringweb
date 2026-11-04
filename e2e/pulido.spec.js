import { test, expect } from "@playwright/test";

// Lote 13: lo que oye un lector de pantalla en la firma, la lámina y los
// números, y los títulos para compartir de cada página.

test("la firma se anuncia \"by STRING\" de una vez en /boaz y /productos", async ({ page }) => {
  for (const ruta of ["/boaz", "/productos"]) {
    await page.goto(ruta);
    const firma = page.locator("p", { has: page.locator(".sr-only", { hasText: "by STRING" }) }).first();
    await expect(firma).toMatchAriaSnapshot("- paragraph: by STRING");
  }
});

test("las cotas de la lámina de Boaz no se leen", async ({ page }) => {
  for (const ruta of ["/boaz", "/productos", "/gym/registro"]) {
    await page.goto(ruta);
    const arbol = await page.locator("body").ariaSnapshot();
    expect(arbol, ruta).not.toMatch(/586|20 KG|Ø 450/);
  }
});

test("los números del menú y de las tarjetas no entran al nombre del enlace", async ({ page }) => {
  await page.goto("/tu-negocio");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Sistemas", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  for (const ruta of ["/tu-negocio", "/sistemas", "/productos"]) {
    await page.goto(ruta);
    const arbol = await page.locator("main").ariaSnapshot();
    expect(arbol, ruta).not.toMatch(/- link "0\d/);
  }
});
