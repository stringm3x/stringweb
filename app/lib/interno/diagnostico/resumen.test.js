import { describe, expect, it } from "vitest";
import { N } from "./contenido";
import { armarResumen, datosPropuesta, enlaceWhatsApp, formatoDia, problemas } from "./resumen";

const r = (valores) =>
  Object.fromEntries(
    Object.entries(valores).map(([id, v]) => [id, typeof v === "object" && !Array.isArray(v) ? v : { valor: v }]),
  );

const general = (extra = {}) => ({
  prospecto: { nombre: "Luis", negocio: "Barbería Don Luis", giro: "barberia", origen: "Visita", whatsapp: "" },
  respuestas: r({ s2: "Cuaderno", p1: "Sí", p2: "No", pGiro: "A veces", iGiro: "unas 5 citas, a $250", n: N.automatiza }),
  nivel: "automatiza",
  boceto: false,
  siguiente: {},
  ...extra,
});

const gimnasio = (extra = {}) => ({
  prospecto: { nombre: "Ana", negocio: "Gym Fuerza", giro: "gimnasio" },
  respuestas: r({ pGiro: "No", iGiro: "unos 10" }),
  nivel: "boaz",
  fundador: false,
  siguiente: {},
  ...extra,
});

describe("formatoDia", () => {
  it("en es-MX y en hora local", () => {
    expect(formatoDia("2026-11-12")).toBe("el jueves 12 de noviembre");
    expect(formatoDia("2026-11-01")).toBe("el domingo 1 de noviembre");
    expect(formatoDia("2027-01-06")).toBe("el miércoles 6 de enero");
  });
  it("sin día o con día malo, nada", () => {
    expect(formatoDia("")).toBeNull();
    expect(formatoDia(undefined)).toBeNull();
    expect(formatoDia("2026-02-31")).toBeNull();
  });
});

describe("resumen general", () => {
  it("completo, sin boceto y sin siguiente paso", () => {
    expect(armarResumen(general())).toBe(
      [
        "Hola, Luis. Soy Carlos, de STRING. Gracias por el tiempo de hoy.",
        "",
        "Te dejo por escrito lo que platicamos de Barbería Don Luis:",
        "- Te dejan plantado sin avisar.",
        "- Se te quedan mensajes sin contestar, o contestas tarde.",
        "- No tienes a la mano cuántos clientes activos tienes ni cuánto entró este mes.",
        "- Me comentaste que esto te cuesta unas 5 citas, a $250.",
        "",
        "Lo que más te urge es que el seguimiento siga aunque tú no estés. Para eso te sugiero Automatiza: agenda, recordatorios y seguimiento automáticos, para que el sistema siga trabajando aunque tú no estés.",
        "Arranca desde $32,500 con IVA incluido, y su cuidado mensual desde $3,500.",
        "",
        "En 2 días hábiles te mando la propuesta por escrito, con lo que incluye y lo que no. Cualquier duda, aquí estoy.",
        "",
        "Carlos · STRING",
      ].join("\n"),
    );
  });

  it("con boceto", () => {
    expect(armarResumen(general({ boceto: true }))).toContain(
      "\n\nPara empezar sin arriesgar, el primer paso es el boceto: el mapa de cómo funciona tu negocio y la primera pantalla de tu sistema. Cuesta $3,500 con IVA incluido y se descuenta completo si decides seguir en los 30 días siguientes.\n\n",
    );
  });

  it("el boceto no sale en niveles sin boceto aunque el interruptor esté prendido", () => {
    expect(armarResumen(general({ nivel: "organiza", boceto: true }))).not.toContain("boceto");
  });

  it("sin I, no sale la línea de lo que le cuesta", () => {
    const e = general();
    delete e.respuestas.iGiro;
    expect(armarResumen(e)).not.toContain("Me comentaste");
  });

  it("con las dos I, van tal cual", () => {
    const e = general();
    e.respuestas.i = { valor: "como 8 clientes, de 300 cada uno" };
    expect(armarResumen(e)).toContain("- Me comentaste que esto te cuesta unas 5 citas, a $250; como 8 clientes, de 300 cada uno.");
  });

  it("la nota de Carlos se suma a la viñeta", () => {
    const e = general();
    e.respuestas.pGiro = { valor: "Sí", nota: "los sábados, sobre todo" };
    expect(armarResumen(e)).toContain("- Te dejan plantado sin avisar: los sábados, sobre todo\n");
  });

  it.each([
    ["Llamada", "Quedamos en hablar el jueves 12 de noviembre. Cualquier duda, aquí estoy."],
    ["Demo", "Quedamos el jueves 12 de noviembre para mostrarte cómo funcionaría. Cualquier duda, aquí estoy."],
    [
      "Propuesta",
      "Quedamos el jueves 12 de noviembre para revisar tu propuesta: te la mando antes por escrito, con lo que incluye y lo que no. Cualquier duda, aquí estoy.",
    ],
    ["Visita", "Paso a verte el jueves 12 de noviembre. Cualquier duda, aquí estoy."],
  ])("siguiente paso %s con día", (tipo, cierre) => {
    const texto = armarResumen(general({ siguiente: { tipo, dia: "2026-11-12" } }));
    expect(texto).toContain(`\n\n${cierre}\n\nCarlos · STRING`);
    expect(texto).not.toContain("En 2 días hábiles te mando la propuesta por escrito, con lo que incluye y lo que no. Cualquier");
  });

  it.each([
    ["Llamada", "¿Qué día te acomoda para seguir platicando? Cualquier duda, aquí estoy."],
    [
      "Demo",
      "Me gustaría mostrarte cómo funcionaría en tu negocio. ¿Qué día te acomoda para verlo juntos? Cualquier duda, aquí estoy.",
    ],
    [
      "Propuesta",
      "En 2 días hábiles te mando la propuesta por escrito, con lo que incluye y lo que no, y la revisamos juntos cuando te acomode. Cualquier duda, aquí estoy.",
    ],
    ["Visita", "Me paso a verte para seguir platicando. ¿Qué día y a qué hora te acomoda? Cualquier duda, aquí estoy."],
  ])("siguiente paso %s sin día", (tipo, cierre) => {
    expect(armarResumen(general({ siguiente: { tipo, dia: "" } }))).toContain(`\n\n${cierre}\n\nCarlos · STRING`);
  });

  it('N = "No sé" o saltada: "Para lo que me contaste…"', () => {
    for (const n of [{ valor: N.nose }, {}]) {
      const e = general({ nivel: "organiza" });
      e.respuestas.n = n;
      const texto = armarResumen(e);
      expect(texto).toContain(
        "\n\nPara lo que me contaste te sugiero Organiza: junta en un solo lugar a los clientes que hoy tienes regados entre chats, libretas y Excel, y te avisa a quién darle seguimiento.\nArranca desde $21,000 con IVA incluido, y su cuidado mensual desde $2,100.",
      );
      expect(texto).not.toContain("Lo que más te urge");
    }
  });

  it("visita rápida: solo lo que hay", () => {
    const e = general({
      respuestas: r({ pGiro: "No", s2: "Excel", n: N.organiza }),
      nivel: "organiza",
      prospecto: { giro: "barberia" },
    });
    expect(armarResumen(e)).toBe(
      [
        "Hola. Soy Carlos, de STRING. Gracias por el tiempo de hoy.",
        "",
        "Lo que más te urge es tener a tus clientes en un solo lugar. Para eso te sugiero Organiza: junta en un solo lugar a los clientes que hoy tienes regados entre chats, libretas y Excel, y te avisa a quién darle seguimiento.",
        "Arranca desde $21,000 con IVA incluido, y su cuidado mensual desde $2,100.",
        "",
        "En 2 días hábiles te mando la propuesta por escrito, con lo que incluye y lo que no. Cualquier duda, aquí estoy.",
        "",
        "Carlos · STRING",
      ].join("\n"),
    );
  });
});

describe("resumen de Empresa", () => {
  const empresa = (extra = {}) => ({
    prospecto: { nombre: "Marta", negocio: "Grupo Norte", giro: "empresa" },
    respuestas: r({ pGiro: "la facturación", n: N.controla }),
    nivel: "empresa",
    boceto: false,
    siguiente: {},
    ...extra,
  });

  it("se cotiza, sin precio ni mínimo", () => {
    const texto = armarResumen(empresa());
    expect(texto).toContain("- Hoy la facturación se hace a mano, entre Excel, papel y correo.\n");
    expect(texto).toContain(
      "Para eso te sugiero Empresa: un sistema completo a tu medida, para todas tus áreas o sucursales, que empieza por el mapa de tus procesos.\nPor el tamaño, lo cotizo a tu medida después de mapear tus procesos. El cuidado mensual va incluido en la cotización.",
    );
    expect(texto).not.toContain("Arranca desde");
  });

  it("con boceto: el de Empresa", () => {
    expect(armarResumen(empresa({ boceto: true }))).toContain(
      "\n\nPara empezar, el primer paso es el boceto: el mapa de tus procesos y la primera pantalla. Cuesta desde $7,500 con IVA incluido y se descuenta completo si decides seguir en los 30 días siguientes.\n\n",
    );
  });

  it('ningún resumen ni dato de Empresa contiene "80,000"', () => {
    for (const boceto of [true, false])
      for (const siguiente of [{}, { tipo: "Propuesta", dia: "2026-11-12" }]) {
        const e = empresa({ boceto, siguiente });
        expect(armarResumen(e)).not.toContain("80,000");
        expect(datosPropuesta(e)).not.toContain("80,000");
      }
  });

  it("los datos llevan la continuidad sugerida: Impulsa", () => {
    expect(datosPropuesta(empresa())).toContain("Continuidad: Impulsa, desde $5,800 al mes");
  });
});

describe("resumen de gimnasio", () => {
  it("sin fundador y sin día", () => {
    expect(armarResumen(gimnasio())).toBe(
      [
        "Hola, Ana. Soy Carlos, el creador de Boaz. Gracias por el tiempo de hoy.",
        "",
        "Me quedo con lo que me contaste de Gym Fuerza: no sabes a tiempo quién se te vence ni quién dejó de venir.",
        "Eso es justo lo que Boaz resuelve: sabes cuánto entra, quién se te vence y quién dejó de venir.",
        "",
        "Te propongo probarlo 14 días con Pro completo, sin tarjeta. Yo te ayudo a cargar a tus socios para que lo veas con tus propios datos.",
        "¿Qué día te queda bien para dejarlo listo juntos?",
        "",
        "Pro cuesta $1,299 al mes, IVA incluido.",
        "",
        "Si prefieres empezar por tu cuenta: stringwebs.com/gym/registro",
        "",
        "Carlos · Boaz by STRING",
      ].join("\n"),
    );
  });

  it("con fundador y con día", () => {
    const texto = armarResumen(gimnasio({ fundador: true, siguiente: { tipo: "Visita", dia: "2026-11-12" } }));
    expect(texto).toContain("\n¿Te queda bien el jueves 12 de noviembre para dejarlo listo juntos?\n");
    expect(texto).toContain(
      "Pro cuesta $1,299 al mes, IVA incluido.\nComo eres de los primeros 5 gimnasios, te queda en $799 al mes, fijo por 12 meses.",
    );
    expect(texto).not.toContain("Paso a verte");
  });

  it("sin problema ni nota, no sale el párrafo del problema", () => {
    const texto = armarResumen(gimnasio({ respuestas: r({ pGiro: "Sí" }) }));
    expect(texto).not.toContain("Me quedo con");
    expect(texto).not.toContain("Eso es justo");
  });

  it("visita rápida de gimnasio: la P y la N", () => {
    const texto = armarResumen(gimnasio({ respuestas: r({ pGiro: "A veces", n: N.nose }), prospecto: { giro: "gimnasio" } }));
    expect(texto).toContain("Hola. Soy Carlos, el creador de Boaz.");
    expect(texto).toContain("Me quedo con lo que me contaste de tu gimnasio: no sabes a tiempo");
  });
});

describe("problemas", () => {
  it("P2 cuenta con Más o menos y No; P1 con Sí y A veces", () => {
    const e = (p1, p2) => ({ prospecto: { giro: "clinica" }, respuestas: r({ p1, p2 }) });
    expect(problemas(e("No", "Sí"))).toEqual([]);
    expect(problemas(e("A veces", "Más o menos"))).toHaveLength(2);
  });
});

describe("datos para la propuesta", () => {
  it("negocio, nivel, continuidad, boceto, problemas, costo, paso y origen", () => {
    expect(datosPropuesta(general({ boceto: true, siguiente: { tipo: "Demo", dia: "2026-11-12" } }))).toBe(
      [
        "Negocio: Barbería Don Luis · Barbería o estética",
        "Dueño: Luis",
        "Nivel: Automatiza · desde $32,500, IVA incluido",
        "Continuidad: Mejora, desde $3,500 al mes",
        "Boceto: sí, $3,500",
        "Problemas:",
        "- Te dejan plantado sin avisar.",
        "- Se te quedan mensajes sin contestar, o contestas tarde.",
        "- No tienes a la mano cuántos clientes activos tienes ni cuánto entró este mes.",
        "Le cuesta: unas 5 citas, a $250",
        "Siguiente paso: Demo, el jueves 12 de noviembre",
        "Cómo nos conoció: Visita",
      ].join("\n"),
    );
  });

  it("gimnasio: Boaz Pro y, si se ofreció, el precio fundador", () => {
    expect(datosPropuesta(gimnasio({ fundador: true }))).toContain(
      "Nivel: Boaz Pro · $1,299 al mes, IVA incluido · precio fundador $799 fijo 12 meses",
    );
    expect(datosPropuesta(gimnasio())).not.toMatch(/Continuidad|Boceto/);
  });
});

describe("enlace de WhatsApp", () => {
  const texto = "Hola, José.\nTe sugiero Automatiza: ¿qué día?\n\nCarlos · STRING";

  it("con número de 10 dígitos", () => {
    const url = enlaceWhatsApp("55 4552 4847", texto);
    expect(url.startsWith("https://wa.me/525545524847?text=")).toBe(true);
    expect(decodeURIComponent(new URL(url).search.slice(6))).toBe(texto);
  });

  it("sin número o incompleto: WhatsApp deja elegir el chat", () => {
    for (const n of ["", undefined, "55 1234"]) {
      expect(enlaceWhatsApp(n, "hola").startsWith("https://wa.me/?text=")).toBe(true);
    }
  });

  it("acentos y saltos de línea van codificados", () => {
    const url = enlaceWhatsApp("", texto);
    expect(url).not.toMatch(/[\s¿é·]/);
    expect(url).toContain("%0A%0A");
    expect(url).toContain("Jos%C3%A9");
    expect(new URL(url).searchParams.get("text")).toBe(texto);
  });
});
