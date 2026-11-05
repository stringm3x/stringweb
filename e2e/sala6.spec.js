import { test, expect } from "@playwright/test";

// Sala 6 (lote 19): la obra de izquierda a derecha, quieta, con sus
// etiquetas en HTML alineadas con los cinco tramos.

const fila = ".arquitectura .sticky ol:first-of-type li";

// Centro de cada etiqueta y de cada tramo del dibujo (del 7.8 % al 92.2 %
// del ancho, en cinco partes iguales), en px.
async function centros(page) {
  return page.evaluate((sel) => {
    const img = document.querySelector('.arquitectura img[src="/arte/sala6-obra.svg"]').getBoundingClientRect();
    const ancho = (img.width * (1 - 2 * 0.078)) / 5;
    return [...document.querySelectorAll(sel)].map((li, i) => {
      const r = li.getBoundingClientRect();
      return { etiqueta: r.left + r.width / 2, tramo: img.left + img.width * 0.078 + ancho * (i + 0.5) };
    });
  }, fila);
}

// Tamaño de letra de todo texto visible de las etiquetas.
const tamanos = (page) =>
  page.$$eval(".arquitectura ol[aria-hidden] span", (els) =>
    els.filter((e) => e.offsetParent).map((e) => parseFloat(getComputedStyle(e).fontSize))
  );

test("el dibujo se anuncia como una imagen con sus cinco tramos", async ({ page }) => {
  await page.goto("/");
  const dibujo = page.getByRole("img", { name: /cinco tramos/ });
  await expect(dibujo).toHaveCount(1);
  await expect(dibujo.locator("img")).toHaveAttribute("alt", "");
  // Las etiquetas (la fila y la lista, que va en dos lugares según el
  // ancho) no se repiten para el lector.
  await expect(page.locator(".arquitectura ol[aria-hidden='true']")).toHaveCount(3);
});

test("en celular, el número bajo cada tramo y la lista debajo", async ({ page }) => {
  await page.goto("/");
  await page.locator("#como-trabajamos").scrollIntoViewIfNeeded();
  const numeros = page.locator(`${fila} > span:visible`);
  await expect(numeros).toHaveText(["1", "2", "3", "4", "5"]);
  const lista = page.locator(".arquitectura .sticky + ol li");
  await expect(lista).toHaveText([
    "1 Diagnóstico · Cimientos",
    "2 Boceto · Plano",
    "3 Propuesta · Estructura",
    "4 Construcción · Muros",
    "5 Entrega · Luz",
  ]);
  for (const c of await centros(page)) expect(Math.abs(c.etiqueta - c.tramo)).toBeLessThan(2);
  expect(Math.min(...(await tamanos(page)))).toBeGreaterThanOrEqual(12);
});

test("de 1024 a 1279 px, solo el número y la lista bajo el dibujo", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/");
  await page.locator("#como-trabajamos").scrollIntoViewIfNeeded();
  await expect(page.locator(`${fila} > span:visible`)).toHaveText(["1", "2", "3", "4", "5"]);
  await expect(page.locator(".arquitectura .sticky + ol")).toBeHidden();
  await expect(page.locator(".arquitectura .sticky ol:last-child li")).toHaveText([
    "1 Diagnóstico · Cimientos",
    "2 Boceto · Plano",
    "3 Propuesta · Estructura",
    "4 Construcción · Muros",
    "5 Entrega · Luz",
  ]);
  await expect(page.locator(".arquitectura .sticky ol:last-child")).toBeVisible();
  for (const c of await centros(page)) expect(Math.abs(c.etiqueta - c.tramo)).toBeLessThan(2);
  expect(Math.min(...(await tamanos(page)))).toBeGreaterThanOrEqual(12);
});

test("en escritorio, número, nombre y subtítulo en cinco columnas", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.locator("#como-trabajamos").scrollIntoViewIfNeeded();
  await expect(page.locator(".arquitectura .sticky + ol")).toBeHidden();
  await expect(page.locator(fila)).toHaveText([
    "1DiagnósticoCimientos",
    "2BocetoPlano",
    "3PropuestaEstructura",
    "4ConstrucciónMuros",
    "5EntregaLuz",
  ]);
  for (const c of await centros(page)) expect(Math.abs(c.etiqueta - c.tramo)).toBeLessThan(2);
  // Ninguna etiqueta se encima con la de al lado.
  const cajas = await page.$$eval(`${fila} > span:not(:first-child)`, (els) =>
    els.map((e) => {
      const r = document.createRange();
      r.selectNodeContents(e);
      const b = r.getBoundingClientRect();
      return [b.left, b.right];
    })
  );
  for (const par of [0, 1]) {
    const col = cajas.filter((_, i) => i % 2 === par);
    for (let i = 1; i < col.length; i++) expect(col[i][0]).toBeGreaterThan(col[i - 1][1]);
  }
  expect(Math.min(...(await tamanos(page)))).toBeGreaterThanOrEqual(12);
});
