import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// /interno/diagnostico, probado en su banco /muestrario/diagnostico: el mismo
// componente y la misma barra, sin sesión (solo en desarrollo). A 390 px.
// Nada de esto toca la red. Lote 25: la llamada con los nichos nuevos (las
// notas viven solo en la pestaña, en sessionStorage) y el atajo a Boaz, que
// es la herramienta del lote 20 con el giro fijo. Los giros viejos quedan
// ocultos; su lógica la cubren las pruebas de Vitest.
const BANCO = "/muestrario/diagnostico";

test.use({ viewport: { width: 390, height: 844 }, locale: "es-MX", permissions: ["clipboard-read", "clipboard-write"] });

let errores;
test.beforeEach(async ({ page }) => {
  errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  // La herramienta no hace peticiones propias: solo las de la página y Next.
  page.on("request", (r) => {
    if (["fetch", "xhr"].includes(r.resourceType()) && !/_next|__nextjs|webpack|turbopack/.test(r.url())) {
      errores.push(`petición: ${r.method()} ${r.url()}`);
    }
  });
  await page.goto(BANCO);
});
test.afterEach(() => expect(errores).toEqual([]));

const elegir = (page, texto) => page.locator("label", { hasText: new RegExp(`^${texto}$`) }).first().click();
const boton = (page, nombre) => page.getByRole("button", { name: nombre, exact: true });
const siguiente = (page) => boton(page, "Siguiente").click();
const saltar = (page) => boton(page, "Saltar").click();
const resumen = (page) => page.getByRole("textbox", { name: "Resumen para WhatsApp" });
const guardado = (page) => page.evaluate(() => window.sessionStorage.getItem("interno-llamada"));
const nicho = (page, texto) => page.getByRole("radio", { name: texto, exact: true });
const gimnasio = (page) => boton(page, "Gimnasio → Boaz Pro").click();

async function sinFallasAxe(page, donde) {
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(violations.map((v) => `${donde} · ${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`)).toEqual([]);
}


test("inicio de la llamada: nicho, filtro, clínicas en pausa y tipo de dueño, con axe", async ({ page }) => {
  await expect(
    page.getByText("Nada se guarda fuera de esta pestaña. Se borra al terminar la llamada o al cerrar la pestaña."),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Inicio de la llamada" })).toBeVisible();
  for (const n of ["Academias", "Desarrolladoras", "B2B · Distribuidoras y proveedores", "Tiendas · Con local y en línea"]) {
    await expect(nicho(page, n)).toBeEnabled();
  }
  await expect(nicho(page, "Clínicas · en pausa")).toBeDisabled();
  // Los giros viejos ya no se ven.
  for (const viejo of ["Barbería o estética", "Restaurante", "Empresa mediana o grande", "Gimnasio"]) {
    await expect(page.getByRole("radio", { name: viejo })).toHaveCount(0);
  }
  await expect(boton(page, "Empezar llamada")).toBeDisabled();
  await sinFallasAxe(page, "inicio");

  await elegir(page, "Academias");
  await expect(page.getByText("3+ maestros, 80+ alumnos, colegiatura de $800+.")).toBeVisible();
  await elegir(page, "B2B · Distribuidoras y proveedores");
  await expect(page.getByText("10+ empleados, vende a otras empresas", { exact: false })).toBeVisible();
  await expect(page.getByText("3+ maestros", { exact: false })).toHaveCount(0);

  await page.getByLabel("Negocio").fill("Academia Sol");
  await page.getByLabel("Nombre del dueño").fill("Mariana");
  await elegir(page, "Con uno que no se adapta");
  await expect(page.getByRole("radio", { name: "Con uno que no se adapta" })).toBeChecked();
  // El tipo de dueño se puede quitar.
  await elegir(page, "Con uno que no se adapta");
  await expect(page.getByRole("radio", { name: "Con uno que no se adapta" })).not.toBeChecked();
  await sinFallasAxe(page, "inicio con nicho");

  await elegir(page, "Academias");
  await boton(page, "Empezar llamada").click();
  await expect(page.getByRole("heading", { level: 2, name: "Apertura" })).toBeFocused();
  await expect(page.getByText("Gracias por el espacio, Mariana.", { exact: false })).toBeVisible();
  await expect(page.getByText("cómo funciona tu Academia Sol,", { exact: false })).toBeVisible();
  await sinFallasAxe(page, "apertura");
});

test("las notas viven en la pestaña: recargar las conserva, nada en localStorage ni cookies", async ({ page }) => {
  expect(await guardado(page)).toBeNull();
  await elegir(page, "Desarrolladoras");
  await page.getByLabel("Negocio").fill("Lomas del Valle");
  await elegir(page, "Con varios que no se hablan");
  await expect.poll(() => guardado(page)).toContain("Lomas del Valle");

  await page.reload();
  await expect(page.getByLabel("Negocio")).toHaveValue("Lomas del Valle");
  await expect(nicho(page, "Desarrolladoras")).toBeChecked();
  await expect(page.getByRole("radio", { name: "Con varios que no se hablan" })).toBeChecked();

  // La llamada empezada también sigue tras recargar.
  await boton(page, "Empezar llamada").click();
  await page.reload();
  await expect(page.getByRole("heading", { level: 2, name: "Apertura" })).toBeVisible();

  expect(await page.evaluate(() => window.localStorage.length)).toBe(0);
  expect(await page.context().cookies()).toEqual([]);

  // Otra pestaña no ve nada: sessionStorage es por pestaña.
  const otra = await page.context().newPage();
  await otra.goto(BANCO);
  await expect(otra.getByLabel("Negocio")).toHaveValue("");
  expect(await guardado(otra)).toBeNull();
});

test("Terminar llamada pide confirmación y borra todo", async ({ page }) => {
  await elegir(page, "Tiendas · Con local y en línea");
  await page.getByLabel("Negocio").fill("Moda Rosa");
  await boton(page, "Empezar llamada").click();

  // Cancelar (o Esc): se queda todo y el foco regresa.
  await boton(page, "Terminar llamada").click();
  const dialogo = page.getByRole("dialog", { name: "¿Terminar la llamada? Se borra todo lo que anotaste." });
  await expect(dialogo).toBeVisible();
  await expect(dialogo.getByRole("button", { name: "Cancelar" })).toBeFocused();
  await sinFallasAxe(page, "terminar llamada");
  await dialogo.getByRole("button", { name: "Cancelar" }).click();
  await expect(dialogo).toBeHidden();
  await expect(boton(page, "Terminar llamada")).toBeFocused();
  await boton(page, "Terminar llamada").click();
  await page.keyboard.press("Escape");
  await expect(dialogo).toBeHidden();
  expect(await guardado(page)).toContain("Moda Rosa");

  // Sí, terminar: inicio vacío y nada en la pestaña.
  await boton(page, "Terminar llamada").click();
  await dialogo.getByRole("button", { name: "Sí, terminar" }).click();
  await expect(page.getByRole("heading", { level: 2, name: "Inicio de la llamada" })).toBeVisible();
  await expect(page.getByLabel("Negocio")).toHaveValue("");
  await expect(nicho(page, "Tiendas · Con local y en línea")).not.toBeChecked();
  await expect.poll(() => guardado(page)).toBeNull();
  await page.reload();
  await expect(page.getByLabel("Negocio")).toHaveValue("");
});

test("Salir: sin notas sale directo; con notas pregunta y las borra", async ({ page }) => {
  await boton(page, "Salir").click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("status")).toHaveText("Muestrario: aquí se habría cerrado la sesión");

  await page.goto(BANCO);
  await page.getByLabel("Negocio").fill("Distribuidora Norte");
  await expect.poll(() => guardado(page)).toContain("Distribuidora Norte");
  await boton(page, "Salir").click();
  const dialogo = page.getByRole("dialog", { name: "¿Seguro? Se borra todo lo del diagnóstico." });
  await expect(dialogo).toBeVisible();
  await expect(page.getByRole("status")).toHaveCount(0);
  await dialogo.getByRole("button", { name: "Sí, borrar" }).click();
  await expect(page.getByRole("status")).toHaveText("Muestrario: aquí se habría cerrado la sesión");
  expect(await guardado(page)).toBeNull();
});

test("atajo a gimnasio: sus 3 preguntas y la N, Boaz Pro con fundador y recordatorio", async ({ page }) => {
  await gimnasio(page);
  await expect(page.getByText("Nada de esto se guarda. Al cerrar la página, se borra.")).toBeVisible();
  await expect(page.getByRole("radio", { name: "Barbería o estética" })).toHaveCount(0);
  await page.getByLabel("Nombre del dueño").fill("Ana");
  await page.getByLabel("Negocio").fill("Gym Fuerza");
  await boton(page, "Empezar preguntas").click();
  await expect(page.getByRole("list", { name: "Preguntas" }).getByRole("button")).toHaveCount(4);
  await page.getByLabel("¿Cuántos socios activos tienes y cómo les cobras?").fill("120, en efectivo");
  await siguiente(page);
  await elegir(page, "No");
  await siguiente(page);
  await page.getByLabel(/¿Cuántos socios sientes/).fill("unos 10");
  await siguiente(page);
  await saltar(page);

  await expect(page.getByText("Eso que me cuentas es Boaz Pro")).toBeVisible();
  await expect(page.getByText("Pro se paga con 2 o 3 socios que no se van")).toBeVisible();
  await expect(page.getByText("Cambiar nivel")).toHaveCount(0);
  await expect(page.getByRole("switch", { name: /boceto/ })).toHaveCount(0);
  await page.getByRole("switch", { name: "Ofrecer precio fundador · $799 fijo 12 meses" }).check({ force: true });
  await siguiente(page);

  const texto = await resumen(page).inputValue();
  expect(texto).toContain("Soy Carlos, el creador de Boaz.");
  expect(texto).toContain("Me quedo con lo que me contaste de Gym Fuerza: no sabes a tiempo quién se te vence ni quién dejó de venir.");
  expect(texto).toContain("¿Qué día te queda bien para dejarlo listo juntos?");
  expect(texto).toContain("Como eres de los primeros 5 gimnasios, te queda en $799 al mes, fijo por 12 meses.");
  expect(texto).toContain("Carlos · Boaz by STRING");
  // Sin número: WhatsApp deja elegir el chat.
  const href = await page.getByRole("link", { name: "Abrir en WhatsApp" }).getAttribute("href");
  expect(href.startsWith("https://wa.me/?text=")).toBe(true);
  await sinFallasAxe(page, "resumen gimnasio");
});

test("atajo a gimnasio: visita rápida, Nuevo diagnóstico con confirmación y volver a los nichos", async ({ page }) => {
  await gimnasio(page);
  await boton(page, "Visita rápida · 3 preguntas").click();
  const puntos = page.getByRole("list", { name: "Preguntas" }).getByRole("button");
  await expect(puntos).toHaveCount(2);
  await expect(page.getByText("¿Sabes quién se te vence esta semana y quién dejó de venir?")).toBeVisible();
  await elegir(page, "A veces");
  await siguiente(page);
  await saltar(page);
  await expect(page.getByText("Eso que me cuentas es Boaz Pro")).toBeVisible();
  await siguiente(page);

  await boton(page, "Nuevo diagnóstico").click();
  const dialogo = page.getByRole("dialog", { name: "¿Seguro? Se borra todo lo del diagnóstico." });
  await expect(dialogo).toBeVisible();
  await dialogo.getByRole("button", { name: "Sí, borrar" }).click();
  // Vuelve al paso 1 del gimnasio, sin la lista de giros.
  await expect(page.getByText("Paso 1 de 5")).toBeVisible();
  await expect(boton(page, "Empezar preguntas")).toBeEnabled();

  // "Cambiar de nicho" regresa al inicio de la llamada. El atajo no usa la pestaña.
  expect(await guardado(page)).toBeNull();
  await boton(page, "Cambiar de nicho").click();
  await expect(page.getByRole("heading", { level: 2, name: "Inicio de la llamada" })).toBeVisible();
});

test("con notas, cerrar la pestaña dispara beforeunload", async ({ page }) => {
  const dialogos = [];
  page.on("dialog", (d) => {
    dialogos.push(d.type());
    d.dismiss();
  });
  await page.getByLabel("Negocio").fill("Tienda Sol");
  await page.close({ runBeforeUnload: true });
  await expect.poll(() => dialogos).toEqual(["beforeunload"]);
});

test("sin notas no hay beforeunload", async ({ page }) => {
  const dialogos = [];
  page.on("dialog", (d) => {
    dialogos.push(d.type());
    d.dismiss();
  });
  // Hubo interacción (el navegador la exige para preguntar), pero no quedan datos.
  await page.getByLabel("Negocio").fill("x");
  await page.getByLabel("Negocio").fill("");
  const cerrada = page.waitForEvent("close", { timeout: 5000 });
  await page.close({ runBeforeUnload: true });
  await cerrada;
  expect(dialogos).toEqual([]);
});

test("Wake Lock: se pide al cargar y al volver a la pestaña; sin soporte, nada falla", async ({ browser }) => {
  // Con un wakeLock simulado, se cuentan las peticiones.
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const conCandado = await ctx.newPage();
  await conCandado.addInitScript(() => {
    window.__pedidos = 0;
    Object.defineProperty(navigator, "wakeLock", {
      value: { request: async () => (window.__pedidos++, { release: async () => {} }) },
    });
  });
  await conCandado.goto(BANCO);
  await expect.poll(() => conCandado.evaluate(() => window.__pedidos)).toBe(1);
  await conCandado.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
  await expect.poll(() => conCandado.evaluate(() => window.__pedidos)).toBe(2);

  // Sin soporte: la página funciona y no hay errores.
  const sinCandado = await ctx.newPage();
  const fallas = [];
  sinCandado.on("pageerror", (e) => fallas.push(e.message));
  await sinCandado.addInitScript(() => {
    delete Navigator.prototype.wakeLock;
  });
  await sinCandado.goto(BANCO);
  await elegir(sinCandado, "Academias");
  await expect(boton(sinCandado, "Empezar llamada")).toBeEnabled();
  expect(fallas).toEqual([]);
  await ctx.close();
});
