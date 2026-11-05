import { CORREO, WHATSAPP_TELEFONO } from "./contacto";
import { PORTADA, SITIO } from "./compartir";
import { BOAZ } from "./precios";
import { DESCRIPCION as DESCRIPCION_BOAZ } from "../components/boaz/datos";

// Datos estructurados (lote 18). Solo datos reales: sin domicilio de calle,
// sin reseñas ni calificaciones. Cada página pinta el suyo con <JsonLd>; el
// layout raíz no lleva ninguno, así no sale en la 404 ni en /interno.

export const ID_STRING = `${SITIO}/#string`;

// "$1,299" → "1299": schema.org pide el precio sin símbolo ni comas.
export const cifra = (precio) => precio.replace(/\D/g, "");

// STRING como taller (solo en la portada). La ciudad sí, la calle no.
export function servicioProfesional() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ID_STRING,
    name: "STRING",
    url: `${SITIO}/`,
    logo: `${SITIO}/logo/string-pared.png`,
    image: `${SITIO}/logo/string-pared.png`,
    description: PORTADA.descripcion,
    founder: { "@type": "Person", name: "Carlos Avilés" },
    email: CORREO,
    telephone: WHATSAPP_TELEFONO,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ciudad de México",
      addressCountry: "MX",
    },
    areaServed: { "@type": "City", name: "Ciudad de México" },
    sameAs: ["https://www.instagram.com/stringwebmx/"],
  };
}

// Un plan de Boaz al mes, con IVA incluido (lote 17).
function oferta(nombre, precio) {
  const valor = cifra(precio);
  return {
    "@type": "Offer",
    name: nombre,
    price: valor,
    priceCurrency: "MXN",
    url: `${SITIO}/boaz#planes`,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: valor,
      priceCurrency: "MXN",
      valueAddedTaxIncluded: true,
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
    },
  };
}

// Boaz en /boaz: la aplicación y sus dos planes de precios.js.
export function aplicacionBoaz() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Boaz",
    url: `${SITIO}/boaz`,
    description: DESCRIPCION_BOAZ,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "es-MX",
    offers: [oferta("Starter", BOAZ.starter.mes), oferta("Pro", BOAZ.pro.mes)],
    publisher: { "@type": "Organization", "@id": ID_STRING, name: "STRING", url: `${SITIO}/` },
  };
}

// Migas: [["Inicio", "/"], ["Sistemas", "/sistemas"], ["Responde", "/sistemas/responde"]].
export function migas(pasos) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: pasos.map(([nombre, ruta], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: nombre,
      item: ruta === "/" ? `${SITIO}/` : `${SITIO}${ruta}`,
    })),
  };
}
