import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// /interno/diagnostico (lote 20), probado en su banco /muestrario/diagnostico:
// el mismo componente y la misma barra, sin sesión (solo en desarrollo). A
// 390 px. Nada de esto toca la red: la herramienta no guarda nada.
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

async function sinFallasAxe(page, donde) {
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(violations.map((v) => `${donde} · ${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`)).toEqual([]);
}

test("recorrido completo de un giro, con axe en cada paso", async ({ page }) => {
  await expect(page.getByText("Nada de esto se guarda. Al cerrar la página, se borra.")).toBeVisible();
  await expect(page.getByText("Paso 1 de 5")).toBeVisible();
  await expect(boton(page, "Empezar preguntas")).toBeDisabled();
  await page.getByLabel("Nombre del dueño").fill("Luis");
  await page.getByLabel("Negocio").fill("Barbería Don Luis");
  await page.getByLabel("Su WhatsApp").fill("55 4552");
  await expect(page.getByText("El número lleva 10 dígitos.", { exact: false })).toBeVisible();
  await page.getByLabel("Su WhatsApp").fill("55 4552 4847");
  await expect(page.getByText("El número lleva 10 dígitos.", { exact: false })).toHaveCount(0);
  await elegir(page, "Barbería o estética");
  await elegir(page, "Visita");
  await sinFallasAxe(page, "paso 1");
  await boton(page, "Empezar preguntas").click();

  // Paso 2: S1 (varias), S2, P1, P2, S y P del giro.
  await expect(page.getByText("Paso 2 de 5")).toBeVisible();
  await expect(page.getByRole("list", { name: "Preguntas" }).getByRole("button")).toHaveCount(9);
  await elegir(page, "Instagram");
  await elegir(page, "WhatsApp");
  await sinFallasAxe(page, "pregunta");
  await siguiente(page);
  await elegir(page, "Cuaderno");
  await siguiente(page);
  await elegir(page, "Sí");
  await page.getByLabel("Nota").fill("sobre todo en la noche");
  await siguiente(page);
  await elegir(page, "No");
  await siguiente(page);
  await page.getByLabel("¿Cómo te agendan hoy: WhatsApp, teléfono o llegan sin cita?").fill("Por WhatsApp");
  await siguiente(page);
  await elegir(page, "A veces");
  await siguiente(page);

  // Paso 3: I del giro, I común, N.
  await expect(page.getByText("Paso 3 de 5")).toBeVisible();
  await page.getByLabel(/¿Cuántas citas se te caen/).fill("unas 5 a la semana, a $250");
  await siguiente(page);
  await saltar(page);
  await elegir(page, "Que el seguimiento siga aunque yo no esté");
  await siguiente(page);

  // Paso 4: nivel, boceto y siguiente paso.
  await expect(page.getByText("Paso 4 de 5")).toBeVisible();
  await expect(page.getByText("Eso que me cuentas es Automatiza")).toBeVisible();
  await expect(page.getByText("Quiere que el seguimiento siga aunque no esté.")).toBeVisible();
  await expect(page.getByText("Cuando crezca: Controla")).toBeVisible();
  const boceto = page.getByRole("switch", { name: "Ofrecer boceto · $3,500" });
  await expect(boceto).not.toBeChecked();
  await boceto.check({ force: true });
  await elegir(page, "Demo");
  await page.getByLabel("¿Qué día?").fill("2026-11-12");
  await sinFallasAxe(page, "nivel");
  await siguiente(page);

  // Paso 5: resumen, WhatsApp, copiar y datos.
  await expect(page.getByText("Paso 5 de 5")).toBeVisible();
  const texto = await resumen(page).inputValue();
  expect(texto).toContain("Hola, Luis. Soy Carlos, de STRING.");
  expect(texto).toContain("- Te dejan plantado sin avisar.");
  expect(texto).toContain("- Se te quedan mensajes sin contestar, o contestas tarde: sobre todo en la noche");
  expect(texto).toContain("- Me comentaste que esto te cuesta unas 5 a la semana, a $250.");
  expect(texto).toContain("Para eso te sugiero Automatiza:");
  expect(texto).toContain("Cuesta $3,500 con IVA incluido");
  expect(texto).toContain("Quedamos el jueves 12 de noviembre para mostrarte cómo funcionaría.");
  const whatsapp = page.getByRole("link", { name: "Abrir en WhatsApp" });
  const href = await whatsapp.getAttribute("href");
  expect(href.startsWith("https://wa.me/525545524847?text=")).toBe(true);
  expect(new URL(href).searchParams.get("text")).toBe(texto);
  await expect(page.getByText("Siguiente paso: Demo, el jueves 12 de noviembre")).toBeVisible();
  await sinFallasAxe(page, "resumen");

  await boton(page, "Copiar").click();
  await expect(boton(page, "Copiado")).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(texto);
  await expect(boton(page, "Copiar")).toBeVisible({ timeout: 4000 });

  // Editado a mano: se respeta; al cambiar una respuesta, se puede rehacer.
  await resumen(page).fill(`${texto}\nPD`);
  await expect(boton(page, "Volver a armar el resumen")).toHaveCount(0);
  await boton(page, "Anterior").click();
  await page.getByRole("switch", { name: "Ofrecer boceto · $3,500" }).uncheck({ force: true });
  await siguiente(page);
  await expect(resumen(page)).toHaveValue(`${texto}\nPD`);
  await boton(page, "Volver a armar el resumen").click();
  await expect(resumen(page)).not.toHaveValue(/boceto/);
});

test("gimnasio: sus 3 preguntas y la N, Boaz Pro con fundador y recordatorio", async ({ page }) => {
  await page.getByLabel("Nombre del dueño").fill("Ana");
  await page.getByLabel("Negocio").fill("Gym Fuerza");
  await elegir(page, "Gimnasio");
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

test("visita rápida: la P del giro, S2 y la N; en gimnasio, la P y la N", async ({ page }) => {
  await elegir(page, "Clínica o consultorio");
  await boton(page, "Visita rápida · 3 preguntas").click();
  const puntos = page.getByRole("list", { name: "Preguntas" }).getByRole("button");
  await expect(puntos).toHaveCount(3);
  await expect(page.getByText("¿Hay pacientes que ya no regresan a su siguiente cita?")).toBeVisible();
  await elegir(page, "Sí");
  await siguiente(page);
  await expect(page.getByText("¿Dónde apuntas a tus clientes y lo que te pagan?")).toBeVisible();
  await elegir(page, "Cuaderno");
  await siguiente(page);
  await expect(page.getByText("Si pudieras resolver una sola cosa este mes, ¿cuál sería?")).toBeVisible();
  await saltar(page);
  await expect(page.getByText("Eso que me cuentas es Automatiza")).toBeVisible();
  await expect(page.getByText("Por lo que marcó: se le caen citas, pacientes o pedidos.")).toBeVisible();
  await siguiente(page);
  const texto = await resumen(page).inputValue();
  expect(texto).toContain("- Hay pacientes que ya no regresan a su siguiente cita.");
  expect(texto).toContain("Para lo que me contaste te sugiero Automatiza:");
  expect(texto).not.toContain("Me comentaste");

  // Gimnasio: la P y la N.
  await page.goto(BANCO);
  await elegir(page, "Gimnasio");
  await boton(page, "Visita rápida · 3 preguntas").click();
  await expect(puntos).toHaveCount(2);
  await expect(page.getByText("¿Sabes quién se te vence esta semana y quién dejó de venir?")).toBeVisible();
});

test("saltar y volver por los puntos; saltada cuenta como No sé", async ({ page }) => {
  await elegir(page, "Restaurante");
  await boton(page, "Empezar preguntas").click();
  const punto = (n) => page.getByRole("list", { name: "Preguntas" }).getByRole("button").nth(n - 1);

  await expect(punto(1)).toHaveAttribute("aria-current", "step");
  await expect(punto(1)).toHaveAccessibleName("Pregunta 1, sin contestar");
  await saltar(page);
  await expect(punto(1)).toHaveAccessibleName("Pregunta 1, saltada");
  await expect(punto(2)).toHaveAttribute("aria-current", "step");
  await saltar(page);
  await elegir(page, "No");
  await siguiente(page);
  await expect(punto(3)).toHaveAccessibleName("Pregunta 3, contestada");

  // Regresar por el punto 2 (saltada) y contestarla.
  await punto(2).click();
  await expect(punto(2)).toHaveAttribute("aria-current", "step");
  await expect(page.getByText("¿Dónde apuntas a tus clientes y lo que te pagan?")).toBeFocused();
  await elegir(page, "Excel");
  await expect(punto(2)).toHaveAccessibleName("Pregunta 2, contestada");

  // Al último punto (la N) con el teclado, y se salta.
  await punto(9).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("Paso 3 de 5")).toBeVisible();
  await saltar(page);
  // N saltada y S2 = Excel → Organiza por descarte.
  await expect(page.getByText("Eso que me cuentas es Organiza")).toBeVisible();
  await expect(
    page.getByText("Por lo que marcó: apunta a sus clientes en cuaderno, Excel, WhatsApp o en la cabeza."),
  ).toBeVisible();

  // Todo saltado → Responde, y la razón pide volver a preguntar.
  await page.goto(BANCO);
  await elegir(page, "Restaurante");
  await boton(page, "Visita rápida · 3 preguntas").click();
  for (let i = 0; i < 3; i++) await saltar(page);
  await expect(page.getByText("Eso que me cuentas es Responde")).toBeVisible();
  await expect(page.getByText(/^No marcó nada: se sugiere lo más chico\./)).toBeVisible();
});

test("diálogo de confirmación: Nuevo diagnóstico y Salir", async ({ page }) => {
  // Sin datos, Salir no pregunta.
  await boton(page, "Salir").click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("status")).toHaveText("Muestrario: aquí se habría cerrado la sesión");

  await page.goto(BANCO);
  await page.getByLabel("Negocio").fill("Tienda Sol");
  await elegir(page, "Tienda en línea");
  await boton(page, "Visita rápida · 3 preguntas").click();
  for (let i = 0; i < 3; i++) await saltar(page);
  await siguiente(page);

  // Nuevo diagnóstico → Cancelar: se queda todo y el foco regresa.
  await boton(page, "Nuevo diagnóstico").click();
  const dialogo = page.getByRole("dialog", { name: "¿Seguro? Se borra todo lo del diagnóstico." });
  await expect(dialogo).toBeVisible();
  await expect(dialogo.getByRole("button", { name: "Cancelar" })).toBeFocused();
  await sinFallasAxe(page, "diálogo");
  await dialogo.getByRole("button", { name: "Cancelar" }).click();
  await expect(dialogo).toBeHidden();
  await expect(boton(page, "Nuevo diagnóstico")).toBeFocused();
  await expect(page.getByText("Paso 5 de 5")).toBeVisible();

  // Esc también cancela.
  await boton(page, "Nuevo diagnóstico").click();
  await page.keyboard.press("Escape");
  await expect(dialogo).toBeHidden();
  await expect(page.getByText("Paso 5 de 5")).toBeVisible();

  // Sí, borrar: vuelve al paso 1 vacío.
  await boton(page, "Nuevo diagnóstico").click();
  await dialogo.getByRole("button", { name: "Sí, borrar" }).click();
  await expect(page.getByText("Paso 1 de 5")).toBeVisible();
  await expect(page.getByLabel("Negocio")).toHaveValue("");

  // Con datos, Salir pregunta; Sí, borrar sale.
  await page.getByLabel("Negocio").fill("Tienda Sol");
  await boton(page, "Salir").click();
  await expect(dialogo).toBeVisible();
  await expect(page.getByRole("status")).toHaveCount(0);
  await dialogo.getByRole("button", { name: "Sí, borrar" }).click();
  await expect(page.getByRole("status")).toHaveText("Muestrario: aquí se habría cerrado la sesión");
});

test("con datos, cerrar la pestaña dispara beforeunload", async ({ page }) => {
  const dialogos = [];
  page.on("dialog", (d) => {
    dialogos.push(d.type());
    d.dismiss();
  });
  await page.getByLabel("Negocio").fill("Tienda Sol");
  await page.close({ runBeforeUnload: true });
  await expect.poll(() => dialogos).toEqual(["beforeunload"]);
});

test("sin datos no hay beforeunload", async ({ page }) => {
  const dialogos = [];
  page.on("dialog", (d) => {
    dialogos.push(d.type());
    d.dismiss();
  });
  // Hubo interacción (el navegador la exige para preguntar), pero no quedan datos.
  await page.getByLabel("Negocio").fill("x");
  await page.getByLabel("Negocio").fill("");
  // Sin aviso, la pestaña se cierra sola.
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
  await elegir(sinCandado, "Gimnasio");
  await expect(boton(sinCandado, "Empezar preguntas")).toBeEnabled();
  expect(fallas).toEqual([]);
  await ctx.close();
});
