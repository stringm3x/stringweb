import { describe, it, expect } from "vitest";
import { diagnosticoSchema, MENSAJES, normalizarWhatsapp } from "./diagnostico-schema";
import { GIROS, OTRA_COSA, SITUACIONES, nivelSugerido } from "../diagnostico";

const valido = {
  nombre: "Ana López",
  whatsapp: "5512345678",
  giro: "Restaurante",
  situacion: "Me escriben y no alcanzo a contestar.",
  otraCosa: "",
};

const mensajeDe = (datos, campo) =>
  diagnosticoSchema.safeParse(datos).error?.issues.find((i) => i.path[0] === campo)?.message;

describe("diagnosticoSchema", () => {
  it("acepta una solicitud completa", () => {
    const resultado = diagnosticoSchema.safeParse(valido);
    expect(resultado.success, JSON.stringify(resultado.error?.issues)).toBe(true);
  });

  it("acepta cada giro y cada situación de textos.md", () => {
    for (const giro of GIROS) {
      expect(diagnosticoSchema.safeParse({ ...valido, giro }).success).toBe(true);
    }
    for (const situacion of SITUACIONES.filter((s) => s !== OTRA_COSA)) {
      expect(diagnosticoSchema.safeParse({ ...valido, situacion }).success).toBe(true);
    }
  });

  it("pide el nombre", () => {
    expect(mensajeDe({ ...valido, nombre: "   " }, "nombre")).toBe(MENSAJES.nombre);
  });

  it("pide el WhatsApp a 10 dígitos", () => {
    expect(mensajeDe({ ...valido, whatsapp: "55123" }, "whatsapp")).toBe(MENSAJES.whatsapp);
    expect(mensajeDe({ ...valido, whatsapp: "" }, "whatsapp")).toBe(MENSAJES.whatsapp);
    expect(mensajeDe({ ...valido, whatsapp: "551234567890" }, "whatsapp")).toBe(MENSAJES.whatsapp);
  });

  it("acepta el WhatsApp con espacios, guiones o +52 y lo deja en 10 dígitos", () => {
    expect(normalizarWhatsapp("55 1234-5678")).toBe("5512345678");
    expect(normalizarWhatsapp("+52 55 1234 5678")).toBe("5512345678");
    const resultado = diagnosticoSchema.safeParse({ ...valido, whatsapp: "+52 (55) 1234-5678" });
    expect(resultado.data.whatsapp).toBe("5512345678");
  });

  it("pide el giro y la situación", () => {
    expect(mensajeDe({ ...valido, giro: "" }, "giro")).toBe(MENSAJES.giro);
    expect(mensajeDe({ ...valido, giro: "Papelería" }, "giro")).toBe(MENSAJES.giro);
    expect(mensajeDe({ ...valido, situacion: undefined }, "situacion")).toBe(MENSAJES.situacion);
  });

  it("pide el espacio libre solo si eligen Otra cosa", () => {
    expect(mensajeDe({ ...valido, situacion: OTRA_COSA, otraCosa: " " }, "otraCosa")).toBe(
      MENSAJES.otraCosa
    );
    expect(
      diagnosticoSchema.safeParse({ ...valido, situacion: OTRA_COSA, otraCosa: "Quiero vender en línea" })
        .success
    ).toBe(true);
    expect(diagnosticoSchema.safeParse({ ...valido, otraCosa: undefined }).success).toBe(true);
  });

  it("pide el espacio libre aunque otros campos también tengan error", () => {
    const datos = { ...valido, nombre: "", situacion: OTRA_COSA, otraCosa: "" };
    expect(mensajeDe(datos, "nombre")).toBe(MENSAJES.nombre);
    expect(mensajeDe(datos, "otraCosa")).toBe(MENSAJES.otraCosa);
  });
});

describe("nivelSugerido", () => {
  it("lleva cada respuesta a su nivel", () => {
    expect(nivelSugerido("Me escriben y no alcanzo a contestar.")).toBe("Responde");
    expect(nivelSugerido("Tengo a mis clientes regados en chats y en Excel.")).toBe("Organiza");
    expect(nivelSugerido("Quiero que el sistema siga aunque yo no esté.")).toBe("Automatiza");
    expect(nivelSugerido("Quiero saber cuánto gano y qué está pasando.")).toBe("Controla");
    expect(nivelSugerido(OTRA_COSA)).toBe("por definir");
  });
});
