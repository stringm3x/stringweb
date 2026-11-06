import { test, expect } from "@playwright/test";
import { CONTINUIDAD, CONTINUIDAD_DESDE } from "../app/lib/precios.js";

// Formas de pago y continuidad por nivel (decisión de Carlos, 6 nov;
// docs/textos.md). Las cifras salen de precios.js: "$3,500" es a la vez
// Mejora y el boceto (que vive solo en /interno), así que Mejora se busca por
// su lugar — la fila "Después" de la ficha de Automatiza y Controla — y en
// ninguna otra página pública puede salir ese valor.
const MEJORA = CONTINUIDAD.mejora;

const PREGUNTA_PAGO =
  "Con anticipo. Responde y Organiza, 50 % al empezar y 50 % al entregar. Automatiza y Controla, en tres pagos: 40, 30 y 30 %. También puedes pagar a meses con tarjeta de crédito o, en Responde y Organiza, con un plan mensual.";
const PREGUNTA_DESCUENTO = "No descontamos. Si el precio pesa, ajustamos el alcance o lo pagas a meses.";

const FICHAS = {
  responde: { pago: "50 % al empezar y 50 % al entregar", tambien: "También a meses con tarjeta o en plan mensual", despues: CONTINUIDAD_DESDE },
  organiza: { pago: "50 / 50", tambien: "También a meses con tarjeta o en plan mensual", despues: CONTINUIDAD_DESDE },
  automatiza: { pago: "40 / 30 / 30", tambien: "También a meses con tarjeta", despues: MEJORA },
  controla: { pago: "40 / 30 / 30", tambien: "También a meses con tarjeta", despues: MEJORA },
  empresa: { pago: "Según su propuesta", tambien: null, despues: null },
};

// La única "comisión" permitida: la del giro de hoteles, que habla de las
// plataformas de reservas, no de pagos.
const COMISION_HOTELES = "sin comisión por cada una";

const normal = (t) => t.replace(/\s+/g, " ").trim();

async function respuesta(page, pregunta) {
  const det = page.locator("details", { has: page.locator("summary", { hasText: pregunta }) });
  await det.locator("summary").click();
  return normal(await det.locator("p").innerText());
}

function fila(page, que) {
  return page
    .getByRole("complementary", { name: "Ficha de la obra" })
    .locator("dl > div", { has: page.locator("dt", { hasText: new RegExp(`^${que}$`) }) })
    .locator("dd");
}

async function rutasPublicas(request) {
  const xml = await (await request.get("/sitemap.xml")).text();
  const rutas = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  expect(rutas.length).toBeGreaterThan(10);
  return [...rutas, "/gym/gracias", "/no-existe"];
}

test("portada: ¿Cómo se paga? y ¿Me hacen descuento? con sus textos", async ({ page }) => {
  await page.goto("/");
  expect(await respuesta(page, "¿Cómo se paga?")).toBe(PREGUNTA_PAGO);
  expect(await respuesta(page, "¿Me hacen descuento?")).toBe(PREGUNTA_DESCUENTO);
  expect(await respuesta(page, "¿Qué pasa después de la entrega?")).toContain(`desde ${CONTINUIDAD_DESDE}`);
});

for (const [slug, f] of Object.entries(FICHAS)) {
  test(`ficha de ${slug}: Pago y Después`, async ({ page }) => {
    await page.goto(`/sistemas/${slug}`);
    const pago = fila(page, "Pago");
    const lineas = (await pago.innerText()).split("\n").map(normal).filter(Boolean);
    expect(lineas).toEqual(f.tambien ? [f.pago, f.tambien] : [f.pago]);
    if (slug === "responde" || slug === "organiza") expect(lineas.join(" ")).toContain("plan mensual");
    else expect(lineas.join(" ")).not.toContain("plan mensual");

    const despues = normal(await fila(page, "Después").innerText());
    expect(despues).toBe(f.despues ? `Desde ${f.despues} al mes IVA incluido` : "Según su propuesta");

    // Mejora sale una sola vez, y solo en Automatiza y Controla, dentro de "Después".
    const cuerpo = await page.locator("body").innerText();
    expect(cuerpo.split(MEJORA).length - 1).toBe(f.despues === MEJORA ? 1 : 0);
  });
}

test("/sistemas sigue en el desde de siempre", async ({ page }) => {
  await page.goto("/sistemas");
  const cuerpo = await page.locator("body").innerText();
  expect(cuerpo).toContain(CONTINUIDAD_DESDE);
  expect(cuerpo).not.toContain(MEJORA);
});

test("ninguna página pública trae lo que no se publica de los pagos", async ({ page, request }) => {
  test.setTimeout(120_000);
  const fallas = [];
  for (const ruta of await rutasPublicas(request)) {
    const html = (await (await request.get(ruta)).text()).replaceAll(COMISION_HOTELES, "");
    for (const re of [/sin intereses/i, /comisi[oó]n/i, /mercado\s*pago/i, /\$\s?2,?900\b/, /\$\s?3,?700\b/]) {
      if (re.test(html)) fallas.push(`${ruta}: ${re}`);
    }
    await page.goto(ruta);
    const cuerpo = await page.locator("body").innerText();
    if (/boceto[^.]{0,80}\$\s?\d/i.test(cuerpo)) fallas.push(`${ruta}: boceto con monto`);
    if (!ruta.startsWith("/sistemas/automatiza") && !ruta.startsWith("/sistemas/controla") && html.includes(MEJORA)) {
      fallas.push(`${ruta}: ${MEJORA}`);
    }
  }
  expect(fallas).toEqual([]);
});
