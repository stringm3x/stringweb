import { test, expect } from "@playwright/test";

// El movimiento de las salas (lote 7, docs/movimiento-salas.md), a 375 px.

// Lleva un elemento a cierta altura de la pantalla (fracción, 0 = arriba).
async function llevar(page, selector, altura = 0.3) {
  await page.evaluate(
    ([sel, a]) => {
      const r = document.querySelector(sel).getBoundingClientRect();
      scrollTo(0, r.top + scrollY - innerHeight * a);
    },
    [selector, altura]
  );
  await page.waitForTimeout(400);
}

const opacidad = (page, selector) =>
  page.$$eval(selector, (els) => els.map((e) => getComputedStyle(e).opacity));

test("con menos movimiento cada sala queda en su estado final", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const sel of [".escultura", ".cine", ".afinacion", ".galeria", ".arquitectura", ".danza"]) {
    await llevar(page, sel);
    // Sin atributos de movimiento: nada en espera ni por etapas.
    const marcas = await page.$eval(sel, (el) =>
      ["mov", "etapa", "activo", "visible"].filter((k) => k in el.dataset)
    );
    expect(marcas, sel).toEqual([]);
  }
  expect(await opacidad(page, ".piedra")).toEqual(["0", "0", "0", "0"]);
  expect(await opacidad(page, ".cine-oscuro")).toEqual(["0", "0", "0"]);
  expect(await opacidad(page, ".vineta")).toEqual(["1", "1", "1", "1", "1"]);
  expect(await opacidad(page, ".galeria [data-capa^='haz']")).toEqual(["1", "1", "1"]);
  expect(await opacidad(page, ".penumbra")).toEqual(["0", "0", "0"]);
  expect(await opacidad(page, ".paso-marca")).toEqual(["0", "0", "0", "0", "0"]);
  const recortes = await page.$$eval(".arquitectura [data-capa]", (els) =>
    els.map((e) => getComputedStyle(e).clipPath)
  );
  expect(recortes.every((c) => c === "none")).toBe(true);
  const animaciones = await page.evaluate(() => document.getAnimations().length);
  expect(animaciones).toBe(0);
});

test("en celular cada cuerda se afina al entrar y Empresa las afina todas", async ({ page }) => {
  await page.goto("/");
  const ol = page.locator(".afinacion");
  await expect(ol).toHaveAttribute("data-mov", "por-cuerda");
  const afinadas = () =>
    page.$$eval(".afinacion > li", (lis) => lis.map((li) => "afinada" in li.dataset));
  // Al llegar a Responde se afina (y la de abajo si ya cabe); Empresa no.
  await llevar(page, ".afinacion > li:nth-child(1)", 0.2);
  await expect.poll(async () => (await afinadas())[0]).toBe(true);
  expect((await afinadas())[4]).toBe(false);
  expect(await opacidad(page, ".vineta")).toEqual(expect.arrayContaining(["0.2"]));
  await llevar(page, ".afinacion > li:nth-child(5)", 0.3);
  await expect.poll(afinadas).toEqual([true, true, true, true, true]);
  await expect(ol).toHaveAttribute("data-empresa", "");
  await page.waitForTimeout(800);
  expect(await opacidad(page, ".vineta")).toEqual(["1", "1", "1", "1", "1"]);
});

test("en escritorio la afinación pasa una sola vez, en cascada", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const ol = page.locator(".afinacion");
  await expect(ol).toHaveAttribute("data-mov", "espera");
  await llevar(page, ".afinacion", 0.1);
  await expect(ol).toHaveAttribute("data-mov", "hecho");
  // Termina y no vuelve a empezar al salir y regresar.
  await page.waitForTimeout(2000);
  await llevar(page, ".danza");
  await llevar(page, ".afinacion", 0.1);
  const enMarcha = await ol.evaluate((el) =>
    el.getAnimations({ subtree: true }).filter((a) => a.playState === "running").length
  );
  expect(enMarcha).toBe(0);
  await expect(ol).toHaveAttribute("data-mov", "hecho");
});

test("en celular cada cuadro de la galería se enciende al entrar en la tira", async ({ page }) => {
  await page.goto("/");
  const galeria = page.locator(".galeria");
  await expect(galeria).toHaveAttribute("data-mov", "por-cuadro");
  await llevar(page, ".galeria", 0.2);
  await expect(galeria).toHaveAttribute("data-luz", "1");
  await page.waitForTimeout(800);
  expect(await opacidad(page, ".penumbra")).toEqual(["0", "1", "1"]);
  // Deslizar la tira hasta el final enciende los otros dos.
  await page.$eval("[data-tira]:has(.galeria)", (t) => t.scrollTo({ left: t.scrollWidth }));
  await expect(galeria).toHaveAttribute("data-luz", /3/);
  await page.$eval("[data-tira]:has(.galeria)", (t) => t.scrollTo({ left: t.scrollWidth / 2 - t.clientWidth / 2 }));
  await expect(galeria).toHaveAttribute("data-luz", "1 2 3");
  await page.waitForTimeout(800);
  expect(await opacidad(page, ".penumbra")).toEqual(["0", "0", "0"]);
});

test("en escritorio la galería se ilumina al entrar, por tiempo", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".galeria")).toHaveAttribute("data-mov", "espera");
  expect(await opacidad(page, ".penumbra")).toEqual(["1", "1", "1"]);
  await llevar(page, ".galeria", 0.2);
  await expect(page.locator(".galeria")).toHaveAttribute("data-mov", "hecho");
  await page.waitForTimeout(2200);
  expect(await opacidad(page, ".penumbra")).toEqual(["0", "0", "0"]);
});

test("el cine enciende sus cuadros al bajar y los apaga al subir", async ({ page }) => {
  await page.goto("/");
  const cine = page.locator(".cine");
  await expect(cine).toHaveAttribute("data-activo", "0");
  await llevar(page, ".cine-entra", 0.25);
  await expect(cine).toHaveAttribute("data-activo", "5");
  expect(await opacidad(page, ".cine-oscuro")).toEqual(["0", "0", "0"]);
  // Un salto hacia arriba los vuelve a apagar.
  await page.evaluate(() => scrollTo(0, 0));
  await expect(cine).toHaveAttribute("data-activo", "0");
});

test("la arquitectura marca el paso de ahora", async ({ page }) => {
  await page.goto("/");
  const obra = page.locator(".arquitectura");
  await expect(obra).toHaveAttribute("data-activo", "0");
  // El tercer paso ya cruzó la línea (74 % de la pantalla) y el cuarto no.
  await page.evaluate(() => {
    const li = document.querySelectorAll(".arquitectura li")[2];
    const r = li.getBoundingClientRect();
    scrollTo(0, r.top + scrollY - innerHeight * 0.74 + 10);
  });
  await expect(obra).toHaveAttribute("data-activo", "3");
  await page.waitForTimeout(400);
  expect(await opacidad(page, ".paso-marca")).toEqual(["0", "0", "1", "0", "0"]);
});

test("la danza solo baila en pantalla", async ({ page }) => {
  await page.goto("/");
  const estado = () =>
    page.$$eval(".danza [data-capa]", (els) => els.map((e) => e.getAnimations()[0]?.playState));
  expect(await estado()).toEqual(["paused", "paused", "paused"]);
  await llevar(page, ".danza");
  await expect(page.locator(".danza")).toHaveAttribute("data-visible", "si");
  expect(await estado()).toEqual(["running", "running", "running"]);
  await page.evaluate(() => scrollTo(0, 0));
  await expect(page.locator(".danza")).toHaveAttribute("data-visible", "no");
  expect(await estado()).toEqual(["paused", "paused", "paused"]);
});

test("sin animation-timeline, las etapas solo avanzan", async ({ page }) => {
  // Simula un navegador sin scroll-driven animations para el escenario.
  await page.addInitScript(() => {
    const original = CSS.supports.bind(CSS);
    CSS.supports = (...args) => (String(args.join(":")).includes("animation-timeline") ? false : original(...args));
  });
  await page.goto("/");
  const escultura = page.locator(".escultura");
  await expect(escultura).toHaveAttribute("data-etapa", "0");
  await llevar(page, ".escultura", 0.1);
  await expect(escultura).toHaveAttribute("data-etapa", "2");
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(300);
  await expect(escultura).toHaveAttribute("data-etapa", "2");
});
