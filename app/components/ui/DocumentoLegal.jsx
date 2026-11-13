// eslint-disable-next-line no-unused-vars -- Vitest compila el JSX en modo clásico.
import React from "react";
import Link from "next/link";
import { enLinea } from "@/app/lib/legal-boaz/documento";
import { ENLACE } from "@/app/components/salas/estilos";

// Documento legal largo (lote 24: Términos y Aviso de Boaz). Mismo estilo que
// PaginaLegal (noche, 680 px, mismo título), con apartados, tablas y listas.
// Los bloques salen de app/lib/legal-boaz/documento.js; aquí no hay texto.

// Una celda que es solo un precio va en Geist Mono, como todo precio del sitio.
const PRECIO = /^\$[\d,]+$/;

function Linea({ texto }) {
  return enLinea(texto).map((t, i) => {
    if (t.tipo === "strong") {
      return (
        <strong key={i} className="font-semibold text-texto">
          {t.texto}
        </strong>
      );
    }
    if (t.tipo === "code") {
      return (
        <span key={i} className="font-mono text-texto">
          {t.texto}
        </span>
      );
    }
    if (t.tipo === "enlace") {
      return (
        <Link key={i} href={t.href} className={`underline ${ENLACE}`}>
          {t.texto}
        </Link>
      );
    }
    return t.texto;
  });
}

function Bloque({ bloque }) {
  switch (bloque.tipo) {
    case "h3":
      return (
        <h2 className="pt-space-4 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-texto">
          {bloque.texto}
        </h2>
      );
    case "ul":
      return (
        <ul className="flex list-disc flex-col gap-2 pl-6">
          {bloque.items.map((item) => (
            <li key={item}>
              <Linea texto={item} />
            </li>
          ))}
        </ul>
      );
    case "tabla":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[15px] leading-snug">
            <thead>
              <tr>
                {bloque.encabezado.map((c) => (
                  <th key={c} scope="col" className="border-b border-borde py-2 pr-4 align-bottom font-semibold text-texto">
                    <Linea texto={c} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloque.filas.map((fila) => (
                <tr key={fila.join("|")}>
                  {fila.map((c, i) => (
                    <td
                      key={i}
                      className={`border-b border-borde py-2 pr-4 align-top${PRECIO.test(c) ? " font-mono" : ""}`}
                    >
                      <Linea texto={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return (
        <p>
          <Linea texto={bloque.texto} />
        </p>
      );
  }
}

export function DocumentoLegal({ titulo, bloques }) {
  return (
    <div data-theme="noche" className="bg-fondo px-4 pb-space-8 pt-32 text-texto sm:px-6 lg:px-24 lg:pt-40">
      <article className="mx-auto max-w-[680px]">
        <h1 className="text-[40px] font-semibold leading-[1.02] tracking-[-0.035em] lg:text-titulo">
          {titulo}
        </h1>
        <div className="mt-space-6 flex flex-col gap-space-4 text-cuerpo text-texto-suave">
          {bloques.map((b, i) => (
            <Bloque key={i} bloque={b} />
          ))}
        </div>
      </article>
    </div>
  );
}
