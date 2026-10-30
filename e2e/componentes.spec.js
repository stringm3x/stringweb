import { test, expect } from "@playwright/test";
import fs from "fs";
import AxeBuilder from "@axe-core/playwright";

// Componentes de calidad (lote 6, docs/calidad.md § 3). Capturas de los
// 8 estados en /muestrario, respuesta en menos de 100 ms, nada en marcha
// con menos movimiento, nombre del logo y transición entre páginas.
const CAPTURAS = "reportes/lote-6-componentes";
fs.mkdirSync(`${CAPTURAS}/estados`, { recursive: true });
fs.mkdirSync(`${CAPTURAS}/paginas`, { recursive: true });

// Ratón real (sin toque) para que hover y presionado sean de verdad.
test.use({ isMobile: false, hasTouch: false });

async function capturar(muestra, nombre) {
  await muestra.screenshot({
    path: `${CAPTURAS}/estados/${nombre}.png`,
    animations: "disabled",
  });
}

// Reposo, hover, presionado y foco sobre el mismo componente; cargando,
// deshabilitado, éxito y error vienen de sus filas.
async function interactivos(page, id, nombre, objetivo) {
  const muestra = page.locator(`[data-muestra="${id}"]`);
  const control = muestra.locator(objetivo).first();
  await page.mouse.move(0, 0);
  await capturar(muestra, `${nombre}-1-reposo`);
  await control.hover();
  await page.waitForTimeout(350);
  await capturar(muestra, `${nombre}-2-hover`);
  await page.mouse.down();
  await page.waitForTimeout(200);
  await capturar(muestra, `${nombre}-3-presionado`);
  await page.mouse.move(0, 0);
  await page.mouse.up();
  // Una tecla antes del foco: así el navegador lo pinta como de teclado.
  await page.keyboard.press("Shift");
  await control.focus();
  await capturar(muestra, `${nombre}-4-foco`);
  await control.blur();
}

const NO_APLICA = [];

test("capturas de los 8 estados de cada componente", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/muestrario");

  for (const tema of ["noche", "pared"]) {
    for (const variante of ["primario", "secundario"]) {
      const nombre = `boton-${variante}-${tema}`;
      await interactivos(page, `${variante}-${tema}-reposo`, nombre, "button");
      const fijos = ["cargando", "deshabilitado", "exito", "error"];
      for (const [i, estado] of fijos.entries()) {
        await capturar(
          page.locator(`[data-muestra="${variante}-${tema}-${estado}"]`),
          `${nombre}-${i + 5}-${estado}`,
        );
      }
    }
    await interactivos(
      page,
      `texto-${tema}-reposo`,
      `boton-texto-${tema}`,
      "a",
    );
    await capturar(
      page.locator(`[data-muestra="texto-${tema}-deshabilitado"]`),
      `boton-texto-${tema}-6-deshabilitado`,
    );
    NO_APLICA.push(`boton-texto-${tema}: cargando, éxito y error`);
  }

  await interactivos(page, "campo-reposo", "campo", "input");
  await capturar(page.locator('[data-muestra="campo-error"]'), "campo-8-error");
  await capturar(
    page.locator('[data-muestra="campo-deshabilitado"]'),
    "campo-6-deshabilitado",
  );
  NO_APLICA.push("campo: presionado es foco; cargando y éxito no aplican");

  await interactivos(page, "opcion-reposo", "opcion", "label");
  await page.locator('[data-muestra="opcion-reposo"] label').first().click();
  await page.mouse.move(0, 0);
  await capturar(
    page.locator('[data-muestra="opcion-reposo"]'),
    "opcion-7-elegida",
  );
  await capturar(
    page.locator('[data-muestra="opcion-error"]'),
    "opcion-8-error",
  );
  await capturar(
    page.locator('[data-muestra="opcion-deshabilitado"]'),
    "opcion-6-deshabilitado",
  );
  NO_APLICA.push("opción: éxito es elegida; cargando no aplica");

  await interactivos(page, "tarjeta-reposo", "tarjeta", "a");
  NO_APLICA.push(
    "tarjeta: es un enlace; cargando, deshabilitado, éxito y error no aplican",
  );

  fs.writeFileSync(
    `${CAPTURAS}/estados/no-aplica.txt`,
    NO_APLICA.join("\n") + "\n",
  );
});

test("el muestrario pasa axe", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/muestrario");
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(
    violations.map(
      (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`,
    ),
  ).toEqual([]);
});

test("con menos movimiento nada se mueve en el muestrario", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/muestrario");
  await page.locator('[data-muestra="primario-noche-reposo"] button').hover();
  await page.waitForTimeout(300);
  const enMarcha = await page.evaluate(
    () =>
      document.getAnimations().filter((a) => a.playState === "running").length,
  );
  expect(enMarcha).toBe(0);
});

test("la píldora responde en menos de 100 ms", async ({ page }) => {
  await page.goto("/muestrario");
  const ms = await page.evaluate(async () => {
    const etiqueta = document.querySelector(
      '[data-muestra="opcion-reposo"] label',
    );
    const t0 = performance.now();
    etiqueta.click();
    await new Promise((r) => requestAnimationFrame(() => r()));
    if (!etiqueta.querySelector("input").checked) return Infinity;
    return performance.now() - t0;
  });
  expect(ms).toBeLessThan(100);
});

test("el botón de envío responde en menos de 100 ms", async ({ page }) => {
  await page.route("https://challenges.cloudflare.com/**", (ruta) =>
    ruta.fulfill({
      contentType: "text/javascript",
      body: `window.turnstile = { render: (_e, o) => { setTimeout(() => o.callback("t"), 50); return "w"; }, remove: () => {} };`,
    }),
  );
  // La API tarda: así se alcanza a ver "Enviando".
  await page.route("**/api/diagnostico", async (ruta) => {
    await new Promise((r) => setTimeout(r, 1000));
    await ruta.fulfill({ json: { success: true } });
  });
  await page.goto("/diagnostico");
  await page.getByLabel("Nombre").fill("Ejemplo");
  await page.getByLabel("WhatsApp").fill("5512345678");
  await page.getByText("Gimnasio", { exact: true }).click();
  await page.getByText("Me escriben y no alcanzo a contestar.").click();
  await expect(page.getByRole("button", { name: "Enviar" })).toBeEnabled();

  const ms = await page.evaluate(
    () =>
      new Promise((resolver) => {
        const boton = [...document.querySelectorAll("button")].find(
          (b) => b.textContent === "Enviar",
        );
        const t0 = performance.now();
        new MutationObserver((_m, obs) => {
          if (boton.textContent.includes("Enviando")) {
            obs.disconnect();
            resolver(performance.now() - t0);
          }
        }).observe(boton, {
          subtree: true,
          childList: true,
          characterData: true,
        });
        boton.click();
      }),
  );
  expect(ms).toBeLessThan(100);
  await expect(page.getByRole("button", { name: "Enviado" })).toBeVisible();
  await expect(
    page.getByText("Listo. Te respondemos en un día hábil."),
  ).toBeFocused();
});

test('el logo se llama "STRING, inicio" y no se repite', async ({ page }) => {
  await page.goto("/nosotros");
  // Barra y pie (el menú cerrado está inerte).
  await expect(
    page.getByRole("link", { name: "STRING, inicio", exact: true }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("img", { name: "STRING", exact: true }),
  ).toHaveCount(0);
});

test("cambiar de página usa View Transitions sin errores", async ({ page }) => {
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  await page.addInitScript(() => {
    window.__transiciones = 0;
    const original = document.startViewTransition?.bind(document);
    if (original) {
      document.startViewTransition = (...a) => {
        window.__transiciones++;
        return original(...a);
      };
    }
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/nosotros");
  await page
    .getByRole("navigation", { name: "Principal" })
    .getByRole("link", { name: "Productos" })
    .click();
  await page.waitForURL("**/saas");
  await expect
    .poll(() => page.evaluate(() => window.__transiciones))
    .toBeGreaterThan(0);
  expect(errores).toEqual([]);
});

// Ritmo (docs/calidad.md § 1): cada página a 375 y 1440 px, a densidad 1
// para que las capturas no pesen de más.
test.describe("páginas", () => {
  test.use({ deviceScaleFactor: 1 });
  for (const ancho of [375, 1440]) {
    test(`capturas de las páginas a ${ancho} px`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width: ancho, height: 900 });
      for (const ruta of [
        "/",
        "/nosotros",
        "/diagnostico",
        "/saas",
        "/aviso-de-privacidad",
        "/terminos",
        "/no-existe",
      ]) {
        await page.goto(ruta);
        await page.waitForLoadState("load");
        const nombre = ruta === "/" ? "inicio" : ruta.slice(1);
        // JPEG: las páginas completas en PNG pesan 16 MB.
        await page.screenshot({
          path: `${CAPTURAS}/paginas/${nombre}-${ancho}.jpg`,
          fullPage: true,
          type: "jpeg",
          quality: 60,
        });
      }
    });
  }
});

// En el celular el cursor ▍ del primario sale al presionar con el dedo.
// Un toque largo de Chrome (synthesizeTapGesture) deja el botón en :active.
test.describe("con el dedo", () => {
  test.use({ isMobile: true, hasTouch: true });

  test("el primario muestra el cursor al presionar a 375 px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/muestrario");
    const muestra = page.locator('[data-muestra="primario-noche-reposo"]');
    const boton = muestra.locator("button");
    const caja = await boton.boundingBox();
    const cdp = await page.context().newCDPSession(page);
    const toque = cdp.send("Input.synthesizeTapGesture", {
      x: caja.x + caja.width / 2,
      y: caja.y + caja.height / 2,
      duration: 2000,
      gestureSourceType: "touch",
    });
    await expect.poll(() => boton.evaluate((e) => e.matches(":active"))).toBe(true);
    await muestra.screenshot({
      path: `${CAPTURAS}/estados/boton-primario-noche-3-presionado-dedo.png`,
      animations: "disabled",
    });
    // Con la animación quieta, el cursor queda encendido.
    expect(await muestra.locator(".boton-cursor").evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
    await toque;
  });
});
