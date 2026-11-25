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

async function empezarLlamada(page, n = "Academias", { negocio = "Academia Sol", dueno = "Mariana", tipo } = {}) {
  await elegir(page, n);
  await page.getByLabel("Negocio").fill(negocio);
  await page.getByLabel("Nombre del dueño").fill(dueno);
  if (tipo) await elegir(page, tipo);
  await boton(page, "Empezar llamada").click();
}
const tramo = (page, n) => page.getByRole("list", { name: "Tramos" }).getByRole("button").nth(n - 1);

test("guía por tramos: frases, preguntas con campo, Situación según el tipo de dueño, con axe", async ({ page }) => {
  await empezarLlamada(page);
  await expect(page.getByRole("list", { name: "Tramos" }).getByRole("button")).toHaveCount(5);
  await expect(tramo(page, 1)).toHaveAccessibleName("Tramo 1, Apertura, minuto 0 a 2");
  await expect(tramo(page, 1)).toHaveAttribute("aria-current", "step");
  await expect(page.getByText("Aguanta el silencio")).toBeVisible();
  await expect(page.getByText("Si pregunta el precio: “Desde $9,500;", { exact: false })).toBeVisible();
  await page.getByLabel("¿Qué es lo que más tiempo te quita hoy?").fill("Cobrar colegiaturas");
  await sinFallasAxe(page, "tramo 1");

  // Tramo 2: sin tipo, solo las de todos; el tipo cambia las demás.
  await siguiente(page);
  await expect(page.getByRole("heading", { level: 2, name: "Su negocio" })).toBeFocused();
  await expect(page.getByText("ACADEMIAS · 2–8 MIN", { exact: false })).toBeVisible();
  await expect(page.getByText("desde que [alguien te pregunta] hasta que [ya es cliente y paga].", { exact: false })).toBeVisible();
  await expect(page.getByLabel("¿Cuántos alumnos y maestros tienes, y en cuántos grupos?")).toBeVisible();
  await expect(page.getByText("Elige el tipo de dueño para ver sus preguntas.")).toBeVisible();
  await elegir(page, "Sin sistema");
  await expect(page.getByLabel("¿Cómo sabes quién te debe?")).toBeVisible();
  await page.getByLabel("¿Cómo sabes quién te debe?").fill("En una libreta");
  await elegir(page, "Con uno que no se adapta");
  await expect(page.getByLabel("¿Cómo sabes quién te debe?")).toHaveCount(0);
  await expect(page.getByLabel("¿Qué usas y cuánto pagas al mes?")).toBeVisible();
  await sinFallasAxe(page, "tramo 2");

  // Tramo 3: problema e implicación.
  await siguiente(page);
  await expect(page.getByLabel("¿Se te quedan papás sin contestar, sobre todo cuando das clase?")).toBeVisible();
  await expect(page.getByLabel("¿Cuántas horas a la semana se te van en cobrar y confirmar?")).toBeVisible();
  await sinFallasAxe(page, "tramo 3");

  // Tramo 4 y 5 por los puntos; Siguiente se apaga en el último.
  await tramo(page, 4).click();
  await expect(page.getByLabel("¿Y cómo sería tu semana si eso ya estuviera resuelto?")).toBeVisible();
  await expect(page.getByText("Solo si ayuda:", { exact: false })).toBeVisible();
  await tramo(page, 5).click();
  await expect(page.getByRole("heading", { level: 2, name: "Siguiente paso" })).toBeFocused();
  await expect(page.getByText("Gracias, Mariana. Me llevo tarea.")).toBeVisible();
  await expect(page.getByText("hecha para tu Academia Sol.", { exact: false })).toBeVisible();
  await sinFallasAxe(page, "tramo 5");

  // Las notas siguen al volver y tras recargar; la del otro tipo no se pierde.
  await page.reload();
  await expect(page.getByRole("heading", { level: 2, name: "Siguiente paso" })).toBeVisible();
  await tramo(page, 1).click();
  await expect(page.getByLabel("¿Qué es lo que más tiempo te quita hoy?")).toHaveValue("Cobrar colegiaturas");
  await tramo(page, 2).click();
  await elegir(page, "Sin sistema");
  await expect(page.getByLabel("¿Cómo sabes quién te debe?")).toHaveValue("En una libreta");

  // Anterior desde el primer tramo vuelve al inicio, con los datos.
  await tramo(page, 1).click();
  await boton(page, "Anterior").click();
  await expect(page.getByRole("heading", { level: 2, name: "Inicio de la llamada" })).toBeVisible();
  await expect(page.getByLabel("Negocio")).toHaveValue("Academia Sol");
});

test("el reloj marca el minuto y el tramo, y no cambia de pantalla solo", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-11-26T17:00:00") });
  await page.goto(BANCO);
  await empezarLlamada(page, "B2B · Distribuidoras y proveedores", { negocio: "Distribuidora Norte", dueno: "Jorge" });
  await expect(page.getByText("Min 0 · Apertura")).toBeVisible();
  await expect(tramo(page, 1)).toHaveClass(/bg-acento/);

  await page.clock.fastForward("09:05");
  await expect(page.getByText("Min 9 · Lo que le cuesta")).toBeVisible();
  await expect(tramo(page, 3)).toHaveClass(/bg-acento/);
  // Sigue en la Apertura: el reloj no corta nada.
  await expect(page.getByRole("heading", { level: 2, name: "Apertura" })).toBeVisible();

  // Pasado el minuto 20, solo el minuto. Recargar no reinicia el reloj.
  await page.clock.fastForward("14:00");
  await expect(page.getByText("Min 23", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText("Min 23", { exact: true })).toBeVisible();
});

test("objeciones del nicho: se abren y se cierran, con axe", async ({ page }) => {
  await empezarLlamada(page, "Tiendas · Con local y en línea", { negocio: "Moda Rosa", dueno: "Rosa" });
  await boton(page, "Objeciones").click();
  const dialogo = page.getByRole("dialog", { name: "Objeciones" });
  await expect(dialogo).toBeVisible();
  const pregunta = dialogo.getByText("“Hay plataformas mucho más baratas”");
  const respuesta = dialogo.getByText("Sí, y si te funcionan, úsalas.", { exact: false });
  await expect(respuesta).toBeHidden();
  await pregunta.click();
  await expect(respuesta).toBeVisible();
  await expect(dialogo.getByText("Si solo quiere lo básico barato, no es tu cliente.")).toBeVisible();
  await sinFallasAxe(page, "objeciones");
  await pregunta.click();
  await expect(respuesta).toBeHidden();
  // Las de otro nicho no salen.
  await expect(dialogo.getByText("“Mi CRM ya maneja prospectos”")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(dialogo).toBeHidden();
  await expect(boton(page, "Objeciones")).toBeFocused();
});

test("calculadora, caso Mariana: 120 alumnos, $900, 4 bajas al mes, 6 h a la semana, con axe", async ({ page }) => {
  await empezarLlamada(page);
  await tramo(page, 2).click();
  await page.getByLabel("¿Cuántos alumnos y maestros tienes, y en cuántos grupos?").fill("120 alumnos, 6 maestros, 10 grupos");
  await tramo(page, 3).click();
  await expect(page.getByText("Captura sus cifras para armar la frase.")).toBeVisible();
  await page.getByLabel("Colegiatura al mes").fill("900");
  await page.getByLabel("Alumnos que se van al mes").fill("4");
  await page.getByLabel("Horas a la semana en cobrar y confirmar").fill("6");
  const desglose = page.getByRole("definition");
  await expect(page.getByText("“O sea, más o menos $3,600 al mes y unas 6 horas tuyas a la semana. ¿Así lo ves?”")).toBeVisible();
  await expect(desglose.filter({ hasText: "$3,600 al mes" })).toHaveCount(1);
  await expect(desglose.filter({ hasText: "$43,200" })).toHaveCount(1);
  await expect(desglose.filter({ hasText: /^24$/ })).toHaveCount(1);
  await sinFallasAxe(page, "calculadora");

  // "Él lo dijo": los interesados solo cuentan con la casilla.
  await page.getByLabel("Interesados que no inscriben al mes").fill("2");
  await expect(page.getByText("más o menos $3,600 al mes", { exact: false })).toBeVisible();
  await page.getByRole("switch", { name: /Él lo dijo/ }).check({ force: true });
  await expect(page.getByText("más o menos $5,400 al mes", { exact: false })).toBeVisible();
  await page.getByRole("switch", { name: /Él lo dijo/ }).uncheck({ force: true });

  // La deuda va aparte: no cambia el mes ni el año.
  await page.getByLabel("Lo que le deben hoy").fill("18,000");
  await expect(
    page.getByText("“O sea, más o menos $3,600 al mes y unas 6 horas tuyas a la semana, y hoy te deben unos $18,000. ¿Así lo ves?”"),
  ).toBeVisible();
  await expect(desglose.filter({ hasText: "$43,200" })).toHaveCount(1);
  await page.getByLabel("Lo que le deben hoy").fill("");

  // Tras recargar, las cifras siguen.
  await page.reload();
  await expect(page.getByLabel("Colegiatura al mes")).toHaveValue("900");
  await expect(page.getByText("más o menos $3,600 al mes", { exact: false })).toBeVisible();
});

test("prioridad → pantalla de ejemplo, y nivel solo para ti (si quedan dos, el más chico)", async ({ page }) => {
  await empezarLlamada(page);
  await tramo(page, 4).click();
  await elegir(page, "las bajas");
  await expect(page.getByText("Alumnos en riesgo")).toBeVisible();
  await elegir(page, "cobrar");
  await expect(page.getByText("Colegiaturas con estado de cuenta")).toBeVisible();
  await expect(page.getByText("Alumnos en riesgo")).toHaveCount(0);
  await sinFallasAxe(page, "prioridad");

  await tramo(page, 5).click();
  await siguiente(page);
  await expect(page.getByRole("heading", { level: 2, name: "Solo para ti" })).toBeFocused();
  await expect(page.getByText("Marca lo que quiere para sugerir un nivel.")).toBeVisible();
  await elegir(page, "Tiene varias sedes, quiere panel de sus números o tienda de uniformes");
  const sugerido = page.getByRole("region", { name: "Nivel sugerido" });
  await expect(sugerido.getByText("Controla", { exact: true })).toBeVisible();
  // Con paréntesis: por su nombre, no con la expresión de elegir().
  await page.getByRole("checkbox", { name: /^Quiere que el sistema cobre, recuerde y avise solo/ }).check({ force: true });
  await expect(sugerido.getByText("Automatiza", { exact: true })).toBeVisible();
  // Organiza + Automatiza (sin Controla) → Organiza, el más chico.
  await elegir(page, "Tiene varias sedes, quiere panel de sus números o tienda de uniformes");
  await elegir(page, "Quiere en un solo lugar interesados, alumnos y cobros");
  await expect(sugerido.getByText("Organiza", { exact: true })).toBeVisible();
  await expect(sugerido.getByText("Automatiza", { exact: true })).toHaveCount(0);
  // Ningún "Desde" ni precio en la sugerencia de una academia.
  await expect(sugerido).not.toContainText("$");
  await sinFallasAxe(page, "nivel");

  await boton(page, "Anterior").click();
  await expect(page.getByRole("heading", { level: 2, name: "Siguiente paso" })).toBeVisible();
});

test("nivel en desarrolladoras: Controla de caso típico; Empresa con su nota y su mínimo", async ({ page }) => {
  await empezarLlamada(page, "Desarrolladoras", { negocio: "Lomas del Valle", dueno: "Ricardo" });
  await tramo(page, 5).click();
  await siguiente(page);
  const sugerido = page.getByRole("region", { name: "Nivel sugerido" });
  await expect(sugerido.getByText("Controla", { exact: true })).toBeVisible();
  await expect(sugerido.getByText("Caso típico")).toBeVisible();
  await expect(sugerido).not.toContainText("$");
  await elegir(page, "Tiene varios desarrollos, equipo grande o necesita conectarse con sus sistemas");
  await expect(sugerido.getByText("Empresa", { exact: true })).toBeVisible();
  await expect(sugerido.getByText("Mapa de procesos antes de cotizar · boceto desde $7,500")).toBeVisible();
  await expect(sugerido.getByText("Se cotiza · nunca menos de $80,000")).toBeVisible();
  await sinFallasAxe(page, "nivel empresa");
});

const TEXTO_MARIANA =
  "Mariana, gracias por tu tiempo. " +
  "Lo que entendí: te escriben unos 15 papás al mes y se inscriben 5; se te van unos 4 alumnos al mes sin darte cuenta; " +
  "te está costando más o menos $3,600 al mes y unas 6 horas tuyas a la semana, y lo que más quieres es que nadie se quede sin respuesta. " +
  "Algo que noté: casi todo pasa por tu WhatsApp personal, así que mientras das clase nadie contesta. " +
  "Nos vemos el jueves 26 de noviembre a las 5 pm para la propuesta.";

async function llamadaMariana(page) {
  await empezarLlamada(page, "Academias", { tipo: "Con uno que no se adapta" });
  await tramo(page, 3).click();
  await page.getByLabel("Colegiatura al mes").fill("900");
  await page.getByLabel("Alumnos que se van al mes").fill("4");
  await page.getByLabel("Horas a la semana en cobrar y confirmar").fill("6");
  await tramo(page, 4).click();
  await elegir(page, "contestar a tiempo");
  await tramo(page, 5).click();
  await page
    .getByLabel("Su problema, con sus palabras")
    .fill("Te escriben unos 15 papás al mes y se inscriben 5; se te van unos 4 alumnos al mes sin darte cuenta.");
  await page.getByLabel("Fecha").fill("2026-11-26");
  await page.getByLabel("Hora").fill("17:00");
  await page.getByLabel("Algo que noté").fill("casi todo pasa por tu WhatsApp personal, así que mientras das clase nadie contesta");
}

test("cierre: lo que escuché se llena solo, preguntas de cierre y la cita, con axe", async ({ page }) => {
  await empezarLlamada(page, "Academias", { tipo: "Sin sistema" });
  await tramo(page, 5).click();
  // Sin datos: las pistas entre corchetes.
  await expect(page.getByText("Te digo lo que escuché: [problema], te está costando [número] y lo más urgente es [prioridad].", { exact: false })).toBeVisible();
  await expect(page.getByText("¿Te queda el [día] a las [hora]?", { exact: false })).toBeVisible();
  // Sin sistema, no se pregunta por exportar.
  await expect(page.getByLabel("¿Alguien más decide esto contigo?")).toBeVisible();
  await expect(page.getByLabel("¿Para cuándo te gustaría tenerlo funcionando?")).toBeVisible();
  await expect(page.getByLabel("¿Te deja exportar tus datos?")).toHaveCount(0);
  await expect(page.getByText("¿Puede estar [él/ella] también?")).toHaveCount(0);
  await page.getByLabel("¿Alguien más decide esto contigo?").fill("Mi socio, Pedro");
  await expect(page.getByText("¿Puede estar [él/ella] también?")).toBeVisible();
  await sinFallasAxe(page, "cierre");

  await tramo(page, 2).click();
  await elegir(page, "Con varios que no se hablan");
  await tramo(page, 5).click();
  await expect(page.getByLabel("¿Te deja exportar tus datos?")).toBeVisible();
});

test("resumen, caso Mariana: el texto con sus palabras, copiar, editar y volver a armar", async ({ page }) => {
  await llamadaMariana(page);
  await expect(
    page.getByText(
      "Te digo lo que escuché: te escriben unos 15 papás al mes y se inscriben 5; se te van unos 4 alumnos al mes sin darte cuenta, te está costando más o menos $3,600 al mes y unas 6 horas tuyas a la semana y lo más urgente es contestar a tiempo. ¿Lo dije bien?",
    ),
  ).toBeVisible();
  await expect(page.getByText("¿Te queda el jueves 26 de noviembre a las 5 pm?", { exact: false })).toBeVisible();

  await siguiente(page);
  await expect(page.getByRole("heading", { level: 2, name: "Solo para ti" })).toBeVisible();
  await siguiente(page);
  await expect(page.getByRole("heading", { level: 2, name: "Resumen para WhatsApp" })).toBeFocused();
  const texto = page.getByRole("textbox", { name: "Resumen para WhatsApp" });
  await expect(texto).toHaveValue(TEXTO_MARIANA);
  // Nada de WhatsApp automático: solo copiar.
  await expect(page.getByRole("link", { name: /WhatsApp/ })).toHaveCount(0);
  await sinFallasAxe(page, "resumen");

  await boton(page, "Copiar").click();
  await expect(boton(page, "Copiado")).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(TEXTO_MARIANA);

  // Editado a mano: se queda, aun tras recargar; si cambia lo anotado, se puede volver a armar.
  await texto.fill(`${TEXTO_MARIANA} Un abrazo.`);
  await page.reload();
  await expect(texto).toHaveValue(`${TEXTO_MARIANA} Un abrazo.`);
  await expect(boton(page, "Volver a armar el resumen")).toHaveCount(0);
  await boton(page, "Anterior").click();
  await boton(page, "Anterior").click();
  await page.getByLabel("Hora").fill("17:30");
  await siguiente(page);
  await siguiente(page);
  await expect(texto).toHaveValue(`${TEXTO_MARIANA} Un abrazo.`);
  await boton(page, "Volver a armar el resumen").click();
  await expect(texto).toHaveValue(TEXTO_MARIANA.replace("a las 5 pm", "a las 5:30 pm"));

  // Terminar desde el resumen borra todo.
  await boton(page, "Terminar llamada").click();
  await page.getByRole("dialog").getByRole("button", { name: "Sí, terminar" }).click();
  await expect(page.getByRole("heading", { level: 2, name: "Inicio de la llamada" })).toBeVisible();
  await expect.poll(() => guardado(page)).toBeNull();
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
