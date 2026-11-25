import { describe, expect, it } from "vitest";
import { formatoHora } from "../fechas";
import { BOCETO, DESDE, EMPRESA_MINIMO } from "../precios-interno";
import { TEXTOS } from "./guion";
import { nichoPorId } from "./nichos";
import { armarResumenLlamada, valoresLlamada } from "./resumen";

// Lote 25: el resumen para WhatsApp se arma con lo que Carlos anotó. Nunca
// trae precios de STRING, el nivel, el boceto ni el mínimo de Empresa
// (ajuste B).

// Misma forma que LLAMADA_VACIA (useLlamada.js).
const LLAMADA_VACIA_DATOS = {
  pantalla: "resumen",
  tramo: 4,
  nicho: "",
  negocio: "",
  dueno: "",
  tipo: "",
  inicio: null,
  notas: {},
  cuenta: {},
  prioridad: {},
  reglas: {},
  cita: { dia: "", hora: "" },
};

const academias = nichoPorId("academias");
const MARIANA = {
  ...LLAMADA_VACIA_DATOS,
  nicho: "academias",
  negocio: "Academia Sol",
  dueno: "Mariana",
  tipo: "uno",
  notas: {
    "g-problema": "Te escriben unos 15 papás al mes y se inscriben 5; se te van unos 4 alumnos al mes sin darte cuenta.",
    "g-noto": "casi todo pasa por tu WhatsApp personal, así que mientras das clase nadie contesta",
    "academias-sit-todos-0": "120 alumnos, 6 maestros",
  },
  cuenta: { academias: { colegiatura: "900", bajas: "4", horas: "6" } },
  prioridad: { academias: "contestar" },
  reglas: { academias: [1] },
  cita: { dia: "2026-11-26", hora: "17:00" },
};

describe("resumen de la llamada", () => {
  it("caso Mariana: problema con sus palabras, su número, su prioridad, algo que noté y la cita", () => {
    expect(armarResumenLlamada(MARIANA, academias, TEXTOS)).toBe(
      "Mariana, gracias por tu tiempo. " +
        "Lo que entendí: te escriben unos 15 papás al mes y se inscriben 5; se te van unos 4 alumnos al mes sin darte cuenta; " +
        "te está costando más o menos $3,600 al mes y unas 6 horas tuyas a la semana, y lo que más quieres es que nadie se quede sin respuesta. " +
        "Algo que noté: casi todo pasa por tu WhatsApp personal, así que mientras das clase nadie contesta. " +
        "Nos vemos el jueves 26 de noviembre a las 5 pm para la propuesta.",
    );
  });

  it("lo que falta no sale", () => {
    expect(armarResumenLlamada({ ...LLAMADA_VACIA_DATOS, nicho: "academias" }, academias, TEXTOS)).toBe(
      "Gracias por tu tiempo.",
    );
    const soloPrioridad = { ...LLAMADA_VACIA_DATOS, dueno: "Mariana", prioridad: { academias: "cobrar" } };
    expect(armarResumenLlamada(soloPrioridad, academias, TEXTOS)).toBe(
      "Mariana, gracias por tu tiempo. Lo que entendí: lo que más quieres es cobrar a tiempo las colegiaturas.",
    );
    const sinHora = { ...MARIANA, cita: { dia: "2026-11-26", hora: "" } };
    expect(armarResumenLlamada(sinHora, academias, TEXTOS)).toMatch(/Nos vemos el jueves 26 de noviembre para la propuesta\.$/);
  });

  it("la prioridad de otro nicho no se cuela", () => {
    const otra = { ...MARIANA, prioridad: { tiendas: "corte" } };
    expect(armarResumenLlamada(otra, academias, TEXTOS)).not.toMatch(/lo que más quieres/);
  });

  it.each(["desarrolladoras", "b2b", "tiendas"])(
    "%s con Empresa marcada: sin mínimo, sin boceto, sin nivel y sin ningún Desde",
    (id) => {
      const nicho = nichoPorId(id);
      const llamada = {
        ...MARIANA,
        nicho: id,
        reglas: { [id]: [0] },
        prioridad: { [id]: nicho.prioridades[0].id },
        cuenta: { [id]: {} },
      };
      const texto = armarResumenLlamada(llamada, nicho, TEXTOS);
      for (const prohibido of [EMPRESA_MINIMO, BOCETO.empresaDesde, BOCETO.chico, ...Object.values(DESDE)]) {
        expect(texto).not.toContain(prohibido);
      }
      expect(texto).not.toMatch(/empresa|controla|boceto|mapa de procesos|nunca menos|desde/i);
      expect(texto).not.toMatch(/\$/);
    },
  );

  it("valores para el guion: día sin el «el» y hora como 5 pm", () => {
    const v = valoresLlamada(MARIANA, academias, TEXTOS);
    expect(v).toMatchObject({
      dueño: "Mariana",
      negocio: "Academia Sol",
      problema: "te escriben unos 15 papás al mes y se inscriben 5; se te van unos 4 alumnos al mes sin darte cuenta",
      número: "más o menos $3,600 al mes y unas 6 horas tuyas a la semana",
      prioridad: "contestar a tiempo",
      prioridadResumen: "que nadie se quede sin respuesta",
      día: "jueves 26 de noviembre",
      hora: "5 pm",
    });
  });

  it("hora: a las 5 pm / a las 5:30 pm", () => {
    expect(formatoHora("17:00")).toBe("5 pm");
    expect(formatoHora("17:30")).toBe("5:30 pm");
    expect(formatoHora("09:05")).toBe("9:05 am");
    expect(formatoHora("12:00")).toBe("12 pm");
    expect(formatoHora("00:15")).toBe("12:15 am");
    expect(formatoHora("")).toBeNull();
    expect(formatoHora("25:00")).toBeNull();
  });
});
