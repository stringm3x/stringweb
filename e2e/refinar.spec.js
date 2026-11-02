import { test, expect } from "@playwright/test";

// Lote 12: la tarjeta con su dibujo y el hilo entre secciones. El axe y el
// movimiento reducido de estas páginas viven en calidad.spec.js.

// Baja la página entera para que carguen los dibujos perezosos.
async function recorrer(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
}

test("cada tarjeta de /tu-negocio trae su dibujo cargado y su número", async ({ page }) => {
  await page.goto("/tu-negocio");
  await recorrer(page);
  const zonas = page.locator("ul.grid a > span[aria-hidden=true]:first-child");
  await expect(zonas).toHaveCount(10);
  for (const zona of await zonas.all()) {
    const img = zona.locator("img");
    await expect(img).toHaveAttribute("alt", "");
    await expect.poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0)).toBe(true);
    // La zona mide 180 px fijos: el dibujo no mueve el layout.
    expect((await zona.boundingBox()).height).toBe(180);
  }
  // Los números van por grupo: 01–05 con local (Gimnasios cierra), 01–05 las empresas.
  await expect(page.getByRole("link", { name: /Gimnasios/ }).locator("span.font-mono")).toHaveText("05");
  await expect(page.getByRole("link", { name: /Cadenas y franquicias/ }).locator("span.font-mono")).toHaveText("05");
});

test("la tarjeta con dibujo sube 2 px y enciende su cuerda en hover", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/tu-negocio");
  const tarjeta = page.getByRole("link", { name: /Barberías y estéticas/ });
  await tarjeta.hover();
  await page.waitForTimeout(400);
  const [sube, cuerda] = await tarjeta.evaluate((el) => [
    new DOMMatrix(getComputedStyle(el).transform).m42,
    getComputedStyle(el.querySelector(":scope > span:nth-child(2) > span")).opacity,
  ]);
  expect(sube).toBe(-2);
  expect(cuerda).toBe("1");
});

test("/productos: Boaz en su papel y A la medida en noche, sin nombre extra en el enlace", async ({ page }) => {
  await page.goto("/productos");
  const boaz = page.getByRole("link", { name: /Productos.*Ver Boaz/ });
  await expect(boaz.locator("[data-theme=pared]")).toHaveCount(1);
  await expect(boaz.locator("svg[aria-hidden=true]")).toHaveCount(1);
  await expect(page.getByRole("link", { name: /A la medida.*Ver la vitrina/ }).locator("[data-theme=pared]")).toHaveCount(0);
});

test("/sistemas: el dibujo chico de cada nivel en lugar de la viñeta", async ({ page }) => {
  await page.goto("/sistemas");
  await expect(page.locator('ul.grid img[src*="/arte/niveles/chica/"]')).toHaveCount(5);
  await expect(page.locator('ul.grid img[src*="sala4-vineta"]')).toHaveCount(0);
});

// Los hilos acordados: máximo 2–3 por página (Carlos, 2 nov), /nosotros entre
// sus cuatro paradas, ninguno en /boaz.
const HILOS = {
  "/": 1,
  "/productos": 2,
  "/tu-negocio": 1,
  "/nosotros": 5,
  "/sistemas": 1,
  "/sistemas/organiza": 1,
  "/tu-negocio/barberias": 1,
  "/tu-negocio/empresas": 0,
  "/tu-negocio/hoteles": 0,
  "/boaz": 0,
};

for (const [ruta, n] of Object.entries(HILOS)) {
  test(`${ruta} lleva ${n} hilo(s), decorativos y de alto fijo`, async ({ page }) => {
    await page.goto(ruta);
    const hilos = page.locator(".hilo");
    await expect(hilos).toHaveCount(n);
    for (const hilo of await hilos.all()) {
      await expect(hilo).toHaveAttribute("aria-hidden", "true");
      expect(await hilo.evaluate((el) => [getComputedStyle(el).position, el.offsetHeight])).toEqual(["absolute", 24]);
    }
  });
}

test("el hilo se dibuja de izquierda a derecha al entrar, solo con clip-path", async ({ page }) => {
  await page.goto("/nosotros");
  const hilo = page.locator("#equipo .hilo");
  const estado = () =>
    hilo.evaluate((el) => [el.dataset.mov, getComputedStyle(el.querySelector(".hilo-trazo")).clipPath, getComputedStyle(el).opacity]);
  expect(await estado()).toEqual(["espera", "inset(0px 100% 0px 0px)", "1"]);
  await hilo.evaluate((el) => scrollTo(0, el.getBoundingClientRect().top + scrollY - innerHeight / 2));
  await expect.poll(estado).toEqual(["hecho", "inset(0px)", "1"]);
});

test("con menos movimiento el hilo ya está completo", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/nosotros");
  for (const hilo of await page.locator(".hilo").all()) {
    expect(await hilo.evaluate((el) => ["mov" in el.dataset, getComputedStyle(el.querySelector(".hilo-trazo")).clipPath])).toEqual([
      false,
      "none",
    ]);
  }
});
