import { test, expect } from "@playwright/test";

// Lote 10: /nosotros como recorrido y la sala 3 sin foto. El axe de
// /nosotros vive en calidad.spec.js con las demás páginas.
const PARADAS = [
  { nombre: "HISTORIA", id: "historia" },
  { nombre: "MÉTODO", id: "metodo" },
  { nombre: "EQUIPO", id: "equipo" },
  { nombre: "FE", id: "fe" },
];

test("el índice lleva a cada parada con teclado y su foco se ve", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const parada of PARADAS) {
    await page.goto("/nosotros");
    const indice = page.getByRole("navigation", { name: "Recorrido" });
    const enlace = indice.getByRole("link", { name: new RegExp(parada.nombre) });
    // Se llega con Tab, como lo haría alguien sin ratón.
    await page.keyboard.press("Tab");
    for (let i = 0; i < 30 && !(await enlace.evaluate((el) => el === document.activeElement)); i++) {
      await page.keyboard.press("Tab");
    }
    await expect(enlace).toBeFocused();
    const contorno = await enlace.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(contorno).not.toBe("none");

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`#${parada.id}$`));
    // La parada queda bajo la barra, no debajo de ella.
    await expect
      .poll(() => page.locator(`#${parada.id}`).evaluate((el) => Math.round(el.getBoundingClientRect().top)))
      .toBeGreaterThanOrEqual(0);
    await expect(page.locator(`#${parada.id}`)).toBeInViewport();
  }
});

test("la foto de Carlos solo vive en /nosotros", async ({ page }) => {
  await page.goto("/nosotros");
  await expect(page.getByRole("img", { name: "Carlos Avilés, fundador de STRING" })).toHaveCount(1);

  for (const ruta of ["/", "/productos", "/sistemas", "/boaz"]) {
    await page.goto(ruta);
    await expect(page.locator('img[src*="/foto/"], img[srcset*="foto"]')).toHaveCount(0);
  }
});

test("la sala 3 lleva la tira dibujada, sin foto", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("img", {
      name: "Tira de película con tres cuadros dibujados: la entrada del gimnasio, el mostrador del gimnasio y el sistema funcionando en una laptop.",
    }),
  ).toHaveCount(1);
});

test("con menos movimiento todo queda a la vista y ya dibujado", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/nosotros");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.locator('[data-mov="espera"]')).toHaveCount(0);
  const planos = await page.locator(".nosotros-plano").evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
  expect(planos).toEqual(["1", "1", "1", "1", "1"]);
});

test("con movimiento, la línea de tiempo termina dibujada y los planos completos", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/nosotros");
  // Cada dibujo se anima cuando se ve: en celular va debajo del texto.
  await page.locator("#historia ol").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page.locator(".nosotros-linea-v").first().evaluate((el) => getComputedStyle(el).clipPath),
    )
    .toMatch(/^(none|inset\(0px\))$/);
  await page.locator(".nosotros-plano").last().scrollIntoViewIfNeeded();
  await expect
    .poll(() => page.locator(".nosotros-plano").last().evaluate((el) => getComputedStyle(el).opacity))
    .toBe("1");
});
