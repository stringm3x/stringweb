import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AVISO, TERMINOS, VERSION_BOAZ, bloques, documento, enLinea, leerFuente, seccion } from "./documento";
import { DocumentoLegal } from "@/app/components/ui/DocumentoLegal";

// Lote 24: lo que se publica en /boaz/terminos y /boaz/aviso-de-privacidad
// son, palabra por palabra y en orden, las secciones del texto aprobado.

const ENTIDADES = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#x27;": "'", "&#39;": "'" };

function palabrasDelHtml(html) {
  // Las etiquetas en línea (enlace, negrita, versión) no separan palabras;
  // las de bloque sí.
  const texto = html
    .replace(/<\/?(?:a|strong|span)(?:\s[^>]*)?>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[#a-z0-9]+;/gi, (e) => ENTIDADES[e] ?? e);
  return texto.split(/\s+/).filter(Boolean);
}

function palabrasDelMarkdown(lineas) {
  return lineas
    .filter((l) => !/^\|(\s*-+\s*\|)+\s*$/.test(l.trim()))
    .join(" ")
    .replace(/^#{3} /gm, " ")
    .replace(/(^|\s)### /g, " ")
    .replace(/(^|\s)- /g, " ")
    .replace(/\*\*|`/g, "")
    .replace(/\|/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

describe("Términos y Aviso de Boaz (lote 24)", () => {
  const md = leerFuente();

  it.each([TERMINOS, AVISO])("%s se pinta sin cambiar palabras", (titulo) => {
    const html = renderToStaticMarkup(createElement(DocumentoLegal, { titulo, bloques: documento(titulo) }));
    const pintadas = palabrasDelHtml(html);
    expect(pintadas[0]).toBe(titulo.split(" ")[0]);
    // El h1 es el título; después, la sección completa.
    expect(pintadas.slice(titulo.split(" ").length)).toEqual(palabrasDelMarkdown(seccion(md, titulo)));
  });

  it("los dos documentos dicen la versión 2026-11-12", () => {
    expect(VERSION_BOAZ).toBe("2026-11-12");
    [TERMINOS, AVISO].forEach((t) => {
      const [primero] = bloques(seccion(md, t));
      expect(primero.texto.startsWith(`Versión \`${VERSION_BOAZ}\`.`), t).toBe(true);
    });
  });

  it("el encabezado del archivo no se publica", () => {
    const todo = [TERMINOS, AVISO].flatMap((t) => documento(t)).map((b) => JSON.stringify(b)).join(" ");
    expect(todo).not.toContain("Texto aprobado");
    expect(todo).not.toContain("Publicar sin cambiar");
  });

  it("los stringwebs.com/boaz… del texto enlazan sin cambiar sus palabras", () => {
    expect(enLinea("La versión vigente está en stringwebs.com/boaz/aviso-de-privacidad. Si cambia")).toEqual([
      { tipo: "texto", texto: "La versión vigente está en " },
      { tipo: "enlace", texto: "stringwebs.com/boaz/aviso-de-privacidad", href: "/boaz/aviso-de-privacidad" },
      { tipo: "texto", texto: ". Si cambia" },
    ]);
    expect(enLinea("está en stringwebs.com/boaz. Ningún")[1]).toEqual({
      tipo: "enlace",
      texto: "stringwebs.com/boaz",
      href: "/boaz",
    });
  });

  it("las tablas conservan sus filas", () => {
    const tablas = documento(AVISO).filter((b) => b.tipo === "tabla");
    expect(tablas.map((t) => t.encabezado)).toEqual([
      ["Quién", "Qué datos"],
      ["Proveedor", "Para qué", "Dónde"],
    ]);
    expect(tablas[1].filas.map((f) => f[0])).toEqual([
      "Supabase", "Vercel", "Resend", "Cloudflare", "Mercado Pago", "360dialog", "n8n", "Anthropic",
    ]);
  });
});
