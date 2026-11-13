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

// Cada página lleva sus propios títulos para compartir: Twitter igual a Open
// Graph, distintos de los de la portada, y con imagen.
const RUTAS = [
  "/sistemas",
  ...["responde", "organiza", "automatiza", "controla", "empresa"].map((n) => `/sistemas/${n}`),
  "/tu-negocio",
  "/tu-negocio/empresas",
  ...["barberias", "clinicas", "restaurantes", "tiendas", "distribuidoras", "inmobiliarias", "escuelas", "hoteles", "cadenas"].map(
    (g) => `/tu-negocio/${g}`
  ),
  "/nosotros",
  "/diagnostico",
  "/productos",
  "/boaz",
  "/gym/registro",
  "/gym/gracias",
  "/aviso-de-privacidad",
  "/terminos",
  "/boaz/terminos",
  "/boaz/aviso-de-privacidad",
];

// Rutas con su propio opengraph-image.jsx: su imagen no es la de la portada.
const IMAGEN_PROPIA = ["/sistemas", "/tu-negocio"];

async function etiquetas(request, ruta) {
  const html = await (await request.get(ruta)).text();
  const meta = (atributo, nombre) =>
    html.match(new RegExp(`<meta ${atributo}="${nombre}" content="([^"]*)"`))?.[1] ?? null;
  return {
    ogTitulo: meta("property", "og:title"),
    ogDescripcion: meta("property", "og:description"),
    ogImagen: meta("property", "og:image"),
    twTitulo: meta("name", "twitter:title"),
    twDescripcion: meta("name", "twitter:description"),
    twImagen: meta("name", "twitter:image"),
  };
}

test("cada página comparte su propio título, descripción e imagen", async ({ request }) => {
  const portada = await etiquetas(request, "/");
  expect(portada.twTitulo).toBe(portada.ogTitulo);
  for (const ruta of RUTAS) {
    const e = await etiquetas(request, ruta);
    expect(e.ogTitulo, ruta).toBeTruthy();
    expect(e.twTitulo, ruta).toBe(e.ogTitulo);
    expect(e.twDescripcion, ruta).toBe(e.ogDescripcion);
    expect(e.twTitulo, ruta).not.toBe(portada.twTitulo);
    expect(e.twDescripcion, ruta).not.toBe(portada.twDescripcion);
    expect(e.ogImagen, ruta).toBeTruthy();
    expect(e.twImagen, ruta).toBeTruthy();
    expect(e.twImagen, ruta).toBe(e.ogImagen);
    if (IMAGEN_PROPIA.some((r) => ruta.startsWith(r))) {
      expect(new URL(e.ogImagen).pathname, ruta).toMatch(new RegExp(`^${ruta}/opengraph-image`));
    }
  }
});
