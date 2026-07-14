import { describe, it, expect } from "vitest";
import { calcularTier } from "./recomendacion";

describe("calcularTier — flow servicios", () => {
  it("recomienda multi-sucursal con 4+ sucursales sin importar el score", () => {
    expect(calcularTier({ suc: "4" }, "servicios", 90, 90)).toBe("multi");
  });

  it("recomienda agenda cuando la agenda es manual", () => {
    expect(calcularTier({ suc: "1", agenda: "manual" }, "servicios", 90, 90)).toBe(
      "agenda"
    );
  });

  it("recomienda agenda cuando cualquiera de los scores está por debajo de 50", () => {
    expect(calcularTier({ suc: "1" }, "servicios", 49, 90)).toBe("agenda");
    expect(calcularTier({ suc: "1" }, "servicios", 90, 49)).toBe("agenda");
  });

  it("recomienda base con una sola sucursal y buenos scores", () => {
    expect(calcularTier({ suc: "1" }, "servicios", 80, 80)).toBe("base");
  });
});

describe("calcularTier — flow ecommerce", () => {
  it("recomienda eco1 para negocios sin pago en línea, catálogo chico y gestión manual", () => {
    expect(
      calcularTier(
        { "pago-online": "no", catalogo: "10", "gestion-pedidos": "manual" },
        "ecommerce",
        80,
        null
      )
    ).toBe("eco1");
  });

  it("recomienda eco3 cuando ya tienen sistema de gestión de pedidos", () => {
    expect(
      calcularTier(
        { "pago-online": "si", catalogo: "10", "gestion-pedidos": "sistema" },
        "ecommerce",
        80,
        null
      )
    ).toBe("eco3");
  });

  it("recomienda eco3 con catálogo grande aunque el resto sea básico", () => {
    expect(
      calcularTier(
        { "pago-online": "no", catalogo: "150", "gestion-pedidos": "manual" },
        "ecommerce",
        80,
        null
      )
    ).toBe("eco3");
  });

  it("recomienda eco2 en el resto de los casos", () => {
    expect(
      calcularTier(
        { "pago-online": "si", catalogo: "50", "gestion-pedidos": "parcial" },
        "ecommerce",
        80,
        null
      )
    ).toBe("eco2");
  });
});

describe("calcularTier — flow menu", () => {
  it("recomienda rest3 cuando la prioridad es 'todo'", () => {
    expect(calcularTier({ prioridad: "todo" }, "menu", 80, null)).toBe("rest3");
  });

  it("recomienda rest3 con delivery propio y volumen alto", () => {
    expect(
      calcularTier(
        { prioridad: "menu", domicilio: "propio", volumen: "50" },
        "menu",
        80,
        null
      )
    ).toBe("rest3");
  });

  it("recomienda rest3 si ya intentan reactivar clientes de alguna forma", () => {
    expect(
      calcularTier(
        { prioridad: "menu", domicilio: "no", reactivacion: "manual" },
        "menu",
        80,
        null
      )
    ).toBe("rest3");
  });

  it("recomienda rest2 cuando la prioridad son los pedidos", () => {
    expect(
      calcularTier(
        { prioridad: "pedidos", domicilio: "no", reactivacion: "no" },
        "menu",
        80,
        null
      )
    ).toBe("rest2");
  });

  it("recomienda rest1 en el caso base", () => {
    expect(
      calcularTier(
        { prioridad: "menu", domicilio: "no", reactivacion: "no" },
        "menu",
        80,
        null
      )
    ).toBe("rest1");
  });
});

describe("calcularTier — flow desconocido", () => {
  it("cae en base por default", () => {
    expect(calcularTier({}, "otro", 80, 80)).toBe("base");
  });
});
