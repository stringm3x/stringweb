// Términos y Aviso de privacidad de Boaz (lote 24). El texto vive, tal como
// lo aprobó Carlos, en boaz-terminos-aviso-2026-11-12.md: aquí solo se lee y
// se parte en bloques. Ninguna palabra sale de este archivo.
//
// Se entiende solo lo que usa ese texto: "### " (apartado), tablas con "|",
// listas con "- ", **negritas** y `versión`. Los "stringwebs.com/boaz…" del
// texto se vuelven enlaces sin cambiar sus palabras.
import { readFileSync } from "node:fs";
import path from "node:path";

export const VERSION_BOAZ = "2026-11-12";

const ARCHIVO = path.join(process.cwd(), "app/lib/legal-boaz/boaz-terminos-aviso-2026-11-12.md");

export function leerFuente() {
  return readFileSync(ARCHIVO, "utf8");
}

/** Las líneas de "## {titulo}" hasta el siguiente "## " o el final. */
export function seccion(md, titulo) {
  const lineas = md.split("\n");
  const inicio = lineas.findIndex((l) => l.trim() === `## ${titulo}`);
  if (inicio === -1) throw new Error(`Falta la sección "${titulo}"`);
  const resto = lineas.slice(inicio + 1);
  const fin = resto.findIndex((l) => l.startsWith("## "));
  return fin === -1 ? resto : resto.slice(0, fin);
}

const celdas = (linea) =>
  linea
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

const esSeparador = (linea) => /^\|(\s*-+\s*\|)+\s*$/.test(linea.trim());

/** Bloques de una sección: p, h3, ul y tabla, en orden. */
export function bloques(lineas) {
  const salida = [];
  let i = 0;
  while (i < lineas.length) {
    const linea = lineas[i];
    if (!linea.trim()) {
      i++;
    } else if (linea.startsWith("### ")) {
      salida.push({ tipo: "h3", texto: linea.slice(4).trim() });
      i++;
    } else if (linea.trim().startsWith("|")) {
      const filas = [];
      while (i < lineas.length && lineas[i].trim().startsWith("|")) {
        if (!esSeparador(lineas[i])) filas.push(celdas(lineas[i]));
        i++;
      }
      const [encabezado, ...cuerpo] = filas;
      salida.push({ tipo: "tabla", encabezado, filas: cuerpo });
    } else if (linea.startsWith("- ")) {
      const items = [];
      while (i < lineas.length && lineas[i].startsWith("- ")) {
        items.push(lineas[i].slice(2).trim());
        i++;
      }
      salida.push({ tipo: "ul", items });
    } else {
      const partes = [];
      while (
        i < lineas.length &&
        lineas[i].trim() &&
        !lineas[i].startsWith("### ") &&
        !lineas[i].trim().startsWith("|") &&
        !lineas[i].startsWith("- ")
      ) {
        partes.push(lineas[i].trim());
        i++;
      }
      salida.push({ tipo: "p", texto: partes.join(" ") });
    }
  }
  return salida;
}

const ENLACE_SITIO = /stringwebs\.com\/boaz(?:\/[a-z-]+)?/g;

function conEnlaces(texto, tipo) {
  const salida = [];
  let ultimo = 0;
  for (const m of texto.matchAll(ENLACE_SITIO)) {
    if (m.index > ultimo) salida.push({ tipo, texto: texto.slice(ultimo, m.index) });
    salida.push({ tipo: "enlace", texto: m[0], href: m[0].replace("stringwebs.com", "") });
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) salida.push({ tipo, texto: texto.slice(ultimo) });
  return salida;
}

/** Trozos de una línea: texto, negrita (strong), versión (code) y enlace. */
export function enLinea(texto) {
  const salida = [];
  const marcas = /\*\*(.+?)\*\*|`([^`]+)`/g;
  let ultimo = 0;
  for (const m of texto.matchAll(marcas)) {
    if (m.index > ultimo) salida.push(...conEnlaces(texto.slice(ultimo, m.index), "texto"));
    if (m[1] !== undefined) salida.push(...conEnlaces(m[1], "strong"));
    else salida.push({ tipo: "code", texto: m[2] });
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) salida.push(...conEnlaces(texto.slice(ultimo), "texto"));
  return salida;
}

export const TERMINOS = "Términos de Boaz";
export const AVISO = "Aviso de privacidad de Boaz";

export function documento(titulo) {
  return bloques(seccion(leerFuente(), titulo));
}
