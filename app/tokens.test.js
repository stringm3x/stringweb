import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

// docs/calidad.md § 1: ninguna duración ni curva suelta. Todas salen de los
// tokens de app/globals.css (las líneas que definen --variables).
const RAIZ = path.resolve(__dirname, "..");

// Legado de /saas y /gym con el diseño anterior: no se toca en el rehecho
// (docs/estado.md). Se borra de aquí cuando se rehagan.
const LEGADO = [
  "app/gym/",
  "app/components/ui/TitularBrochada.jsx",
  "app/components/forms/FormField.jsx",
  "app/components/forms/FormSelect.jsx",
];

const SUELTAS = [
  /\b\d*\.?\d+m?s\b/, // 150ms, 0.3s
  /cubic-bezier\(/,
  /\b(duration|delay)-(\d+|\[)/, // clases de Tailwind con número
  /\bease-(in|out|linear)/,
  /\b(duration|delay|transitionDelay|transitionDuration)\s*:\s*[\d"'`]/, // GSAP y estilos en línea
  /\$\{[^}]+\}m?s\b/, // `${n}ms` o `${n}s` en plantillas
  /\b(animationDuration|animationDelay)\s*:/, // estilos en línea de animación
];

function archivos(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) return archivos(ruta);
    return /\.(jsx?|css)$/.test(e.name) && !e.name.endsWith(".test.js") ? [ruta] : [];
  });
}

function esComentario(linea) {
  return /^\s*(\/\/|\/\*|\*)/.test(linea);
}

describe("tokens de movimiento", () => {
  it("no hay duraciones ni curvas sueltas fuera de los tokens", () => {
    const rutas = [...archivos(path.join(RAIZ, "app")), path.join(RAIZ, "tailwind.config.js")];
    const sueltas = [];
    for (const ruta of rutas) {
      const relativa = path.relative(RAIZ, ruta);
      if (LEGADO.some((l) => relativa.startsWith(l))) continue;
      fs.readFileSync(ruta, "utf8")
        .split("\n")
        .forEach((linea, i) => {
          if (esComentario(linea)) return;
          if (relativa === "app/globals.css" && /^\s*--[\w-]+\s*:/.test(linea)) return;
          if (SUELTAS.some((re) => re.test(linea))) sueltas.push(`${relativa}:${i + 1}: ${linea.trim()}`);
        });
    }
    expect(sueltas).toEqual([]);
  });
});
