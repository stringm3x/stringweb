import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { GIROS } from "./giros";
import { NIVELES } from "./niveles";
import { BOAZ } from "./precios";
import { ID_STRING, aplicacionBoaz, cifra, migas, servicioProfesional } from "./jsonld";

// Datos estructurados (lote 18): nada inventado y los precios de precios.js.
const APP = path.resolve(__dirname, "..");

// Todas las claves de un objeto, a cualquier profundidad.
const claves = (o) =>
  o && typeof o === "object" ? Object.entries(o).flatMap(([k, v]) => [k, ...claves(v)]) : [];

const TODOS = [
  servicioProfesional(),
  aplicacionBoaz(),
  ...NIVELES.map((n) => migas([["Inicio", "/"], ["Sistemas", "/sistemas"], [n.nombre, `/sistemas/${n.slug}`]])),
  ...GIROS.map((g) => migas([["Inicio", "/"], ["Tu negocio", "/tu-negocio"], [g.nombre, g.href]])),
];

describe("JSON-LD (lote 18)", () => {
  it("STRING: ProfessionalService sin calle, con fundador, ciudad e Instagram", () => {
    const s = servicioProfesional();
    expect(s["@type"]).toBe("ProfessionalService");
    expect(s["@id"]).toBe(ID_STRING);
    expect(s.founder).toEqual({ "@type": "Person", name: "Carlos Avilés" });
    expect(s.email).toBe("stringwebmx@gmail.com");
    expect(s.telephone).toBe("+525545524847");
    expect(s.areaServed.name).toBe("Ciudad de México");
    expect(s.address).toEqual({ "@type": "PostalAddress", addressLocality: "Ciudad de México", addressCountry: "MX" });
    expect(s.sameAs).toEqual(["https://www.instagram.com/stringwebmx/"]);
    expect(s.logo).toMatch(/\.png$/);
    expect(fs.existsSync(path.join(APP, "..", "public", new URL(s.logo).pathname))).toBe(true);
  });

  it("Boaz: los precios del JSON-LD son los de precios.js, al mes, en MXN y con IVA", () => {
    const b = aplicacionBoaz();
    expect(b.applicationCategory).toBe("BusinessApplication");
    expect(b.operatingSystem).toBe("Web");
    expect(b.publisher["@id"]).toBe(ID_STRING);
    const esperado = [
      ["Starter", cifra(BOAZ.starter.mes)],
      ["Pro", cifra(BOAZ.pro.mes)],
    ];
    expect(b.offers.map((o) => [o.name, o.price])).toEqual(esperado);
    expect(esperado).toEqual([["Starter", "799"], ["Pro", "1299"]]);
    // Lote 21: exactamente dos offers; ni Escala ni el Pro fundador.
    expect(b.offers).toHaveLength(2);
    b.offers.forEach((o) => expect(o.name).not.toMatch(/escala|fundador/i));
    expect(JSON.stringify(b)).not.toMatch(/Escala|fundador|1999|19990/i);
    b.offers.forEach((o) => {
      expect(o.priceCurrency).toBe("MXN");
      expect(o.priceSpecification.price).toBe(o.price);
      expect(o.priceSpecification.priceCurrency).toBe("MXN");
      expect(o.priceSpecification.valueAddedTaxIncluded).toBe(true);
      expect(o.priceSpecification.referenceQuantity.unitCode).toBe("MON");
    });
  });

  it("migas con posiciones seguidas y URLs absolutas", () => {
    const m = migas([["Inicio", "/"], ["Sistemas", "/sistemas"], ["Responde", "/sistemas/responde"]]);
    expect(m.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.stringwebs.com/" },
      { "@type": "ListItem", position: 2, name: "Sistemas", item: "https://www.stringwebs.com/sistemas" },
      { "@type": "ListItem", position: 3, name: "Responde", item: "https://www.stringwebs.com/sistemas/responde" },
    ]);
  });

  it("sin reseñas, calificaciones ni domicilio de calle en ningún bloque", () => {
    const prohibidas = ["aggregateRating", "review", "reviews", "ratingValue", "streetAddress", "postalCode"];
    TODOS.forEach((b) => {
      const k = claves(b);
      prohibidas.forEach((p) => expect(k, `${b["@type"]}: ${p}`).not.toContain(p));
    });
  });

  it("el layout raíz, la 404 y /interno no pintan JSON-LD", () => {
    const leer = (r) => fs.readFileSync(path.join(APP, r), "utf8");
    const internos = (dir) =>
      fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const ruta = path.join(dir, e.name);
        return e.isDirectory() ? internos(ruta) : /\.jsx?$/.test(e.name) ? [path.relative(APP, ruta)] : [];
      });
    const archivos = ["layout.jsx", "not-found.jsx", ...internos(path.join(APP, "(interno)"))];
    archivos.forEach((r) => {
      const t = leer(r);
      expect(t, r).not.toMatch(/ld\+json|JsonLd|lib\/jsonld/);
    });
  });
});
