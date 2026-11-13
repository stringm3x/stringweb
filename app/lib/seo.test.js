import { describe, expect, it } from "vitest";
import { GIROS } from "./giros";
import { NIVELES } from "./niveles";
import { PORTADA } from "./compartir";
import sitemap from "../sitemap";

// Los títulos y descripciones de Google (lote 18), tal como los aprobó
// Carlos (docs/textos.md § SEO · lote 18).
const NIVELES_SEO = {
  responde: [
    "Responde: sistema que contesta WhatsApp e Instagram · STRING",
    "Para el negocio al que le llegan mensajes por Instagram y WhatsApp y pierde clientes por no contestar a tiempo. Desde $9,500, IVA incluido.",
  ],
  organiza: [
    "Organiza: tus clientes en un solo sistema · STRING",
    "Para el negocio que ya contesta, pero tiene a sus clientes regados entre chats, libretas y Excel. Desde $21,000, IVA incluido.",
  ],
  automatiza: [
    "Automatiza: citas y seguimiento sin perder clientes · STRING",
    "Para el negocio que pierde citas y clientes porque nadie da seguimiento a tiempo. Desde $32,500, IVA incluido.",
  ],
  controla: [
    "Controla: panel de ventas y tienda en línea · STRING",
    "Para el negocio que ya creció y necesita saber cuánto gana y qué está pasando, o vender en línea con su propia tienda. Desde $46,500, IVA incluido.",
  ],
  empresa: [
    "Empresa: sistema a la medida para empresas · STRING",
    "Para la empresa con varias áreas o sucursales, o una tienda en línea grande, que necesita un sistema completo a su medida. Se cotiza.",
  ],
};

const GIROS_SEO = {
  barberias: [
    "Sistema para barberías y estéticas en CDMX · STRING",
    "Tu agenda llena, sin vivir en el WhatsApp. Un sistema para barberías y estéticas en la Ciudad de México, desde $9,500 con IVA incluido.",
  ],
  clinicas: [
    "Sistema para clínicas y consultorios en CDMX · STRING",
    "Cada paciente atendido a tiempo. Un sistema para clínicas y consultorios en la Ciudad de México, desde $9,500 con IVA incluido.",
  ],
  restaurantes: [
    "Sistema para restaurantes en CDMX · STRING",
    "Reservas y pedidos sin perder un mensaje. Un sistema para restaurantes en la Ciudad de México, desde $9,500 con IVA incluido.",
  ],
  tiendas: [
    "Sistema para tiendas en línea en CDMX · STRING",
    "Tu tienda, con tu nombre. Un sistema para tiendas en línea en la Ciudad de México, desde $9,500 con IVA incluido.",
  ],
  distribuidoras: [
    "Sistema para distribuidoras y mayoristas · STRING",
    "Del pedido a la cobranza, sin perder nada. Un sistema a la medida para distribuidoras y mayoristas, con el alcance que necesita tu operación.",
  ],
  inmobiliarias: [
    "Sistema para inmobiliarias · STRING",
    "Cada prospecto, cada propiedad, cada cita. Un sistema a la medida para inmobiliarias, con el alcance que necesita tu operación.",
  ],
  escuelas: [
    "Sistema para escuelas y academias · STRING",
    "Inscripciones, pagos y avisos sin papeles. Un sistema a la medida para escuelas y academias, con el alcance que necesita tu operación.",
  ],
  hoteles: [
    "Sistema para hoteles · STRING",
    "Reservas, huéspedes y pagos en un solo lugar. Un sistema a la medida para hoteles, con el alcance que necesita tu operación.",
  ],
  cadenas: [
    "Sistema para cadenas y franquicias · STRING",
    "Todas tus sucursales en un solo panel. Un sistema a la medida para cadenas y franquicias, con el alcance que necesita tu operación.",
  ],
};

const largo = (s) => [...s].length;

describe("SEO (lote 18)", () => {
  it("la portada", () => {
    expect(PORTADA.titulo).toBe("STRING · Taller de software en la Ciudad de México");
    expect(PORTADA.descripcion).toBe(
      "Taller de software de Carlos Avilés en la Ciudad de México. Sistemas que contestan, ordenan y trabajan por tu negocio, desde un local hasta una empresa grande.",
    );
  });

  it("cada nivel con su título y descripción aprobados", () => {
    expect(NIVELES.map((n) => n.slug)).toEqual(Object.keys(NIVELES_SEO));
    NIVELES.forEach((n) => {
      expect([n.tituloSeo, n.descripcionSeo], n.slug).toEqual(NIVELES_SEO[n.slug]);
    });
  });

  it("cada giro con su título y descripción aprobados, sin la cita", () => {
    expect(GIROS.map((g) => g.slug).sort()).toEqual(Object.keys(GIROS_SEO).sort());
    GIROS.forEach((g) => {
      expect([g.tituloSeo, g.descripcionSeo], g.slug).toEqual(GIROS_SEO[g.slug]);
      expect(g.descripcionSeo).not.toContain(g.cita);
      expect(g.descripcionSeo).not.toMatch(/[“”"]/);
    });
  });

  it("ningún título pasa de 60 caracteres ni descripción de 160", () => {
    const todos = [PORTADA, ...NIVELES, ...GIROS].map((x) => [x.titulo ?? x.tituloSeo, x.descripcion ?? x.descripcionSeo]);
    todos.forEach(([t, d]) => {
      expect(largo(t), t).toBeLessThanOrEqual(60);
      expect(largo(d), d).toBeLessThanOrEqual(160);
    });
  });

  it("sitemap: lastmod fijo por ruta, no la fecha del build", () => {
    const a = sitemap();
    expect(sitemap()).toEqual(a);
    a.forEach((e) => {
      expect(e.lastModified, e.url).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(e.lastModified)), e.url).toBe(false);
    });
    const rutas = a.map((e) => new URL(e.url).pathname);
    expect(new Set(rutas).size).toBe(rutas.length);
    [...NIVELES.map((n) => `/sistemas/${n.slug}`), ...GIROS.map((g) => `/tu-negocio/${g.slug}`)].forEach((r) =>
      expect(rutas).toContain(r),
    );
    ["/", "/sistemas", "/tu-negocio", "/tu-negocio/empresas", "/boaz", "/gym/registro", "/productos", "/nosotros", "/diagnostico", "/aviso-de-privacidad", "/terminos", "/boaz/terminos", "/boaz/aviso-de-privacidad"].forEach((r) =>
      expect(rutas).toContain(r),
    );
    // /privacidad es solo un redirect: no va al sitemap.
    expect(rutas).not.toContain("/privacidad");
  });
});
