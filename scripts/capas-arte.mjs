// Parte los dibujos de public/arte en capas para el movimiento de las salas
// (docs/movimiento-salas.md). Cada capa es un SVG con el mismo lienzo que el
// original y un tramo contiguo de sus hijos de primer nivel, así que apiladas
// en orden se ven igual que el original. Solo copia los <clipPath> que usa.
//
// Uso: node scripts/capas-arte.mjs   (reescribe public/arte/salaN/*.svg)
import fs from "node:fs";
import path from "node:path";

const RAIZ = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const ARTE = path.join(RAIZ, "public/arte");

// Tramos por sala, en orden de pintado: [nombre, primer hijo, último hijo].
// Los índices cuentan los hijos de <svg> después de <defs> (que es el 0).
export const CAPAS = {
  sala2: {
    original: "sala2-escultura.svg",
    capas: [
      ["bloque", 1, 17],
      ["celular", 18, 32],
      ["lascas", 33, 50],
      ["herramientas", 51, 54],
    ],
  },
  sala5: {
    original: "sala5-galeria.svg",
    capas: [
      ["galeria-1", 1, 4],
      ["haz-1", 5, 5],
      ["galeria-2", 6, 47],
      ["haz-2", 48, 48],
      ["galeria-3", 49, 87],
      ["haz-3", 88, 88],
      ["galeria-4", 89, 129],
    ],
  },
  sala6: {
    original: "sala6-arquitectura.svg",
    capas: [
      ["suelo", 1, 2],
      ["cimientos", 3, 5],
      ["suelo-linea", 6, 6],
      ["piso-1", 7, 23],
      ["piso-2", 24, 40],
      ["obra", 41, 52],
      ["bandera", 53, 55],
      ["rotulos", 56, 57],
    ],
  },
  sala7: {
    original: "sala7-danza.svg",
    capas: [
      ["cinta-oro", 1, 16],
      ["cinta-roja", 17, 29],
      ["cinta-verde", 30, 42],
    ],
  },
};

// Hijos de primer nivel de un elemento, como texto. Los SVG del arte no
// traen comentarios ni CDATA; basta con contar etiquetas.
export function hijos(xml) {
  const lista = [];
  const re = /<(\/?)([\w:-]+)[^>]*?(\/?)>/g;
  let nivel = 0;
  let inicio = -1;
  let m;
  while ((m = re.exec(xml))) {
    const [etiqueta, cierre, , solo] = m;
    if (cierre) {
      nivel--;
      if (nivel === 0) lista.push(xml.slice(inicio, m.index + etiqueta.length));
    } else if (solo) {
      if (nivel === 0) lista.push(etiqueta);
    } else {
      if (nivel === 0) inicio = m.index;
      nivel++;
    }
  }
  return lista;
}

export function partir(svg) {
  const apertura = svg.match(/^<svg[^>]*>/)[0];
  const cuerpo = svg.slice(apertura.length, svg.lastIndexOf("</svg>"));
  const [defs, ...resto] = hijos(cuerpo);
  if (!defs.startsWith("<defs")) throw new Error("se esperaba <defs> primero");
  const recortes = new Map(
    hijos(defs.replace(/^<defs>|<\/defs>$/g, "")).map((c) => [c.match(/id="([^"]+)"/)[1], c])
  );
  return { apertura: apertura.replace(/ role="img"/, ""), recortes, hijos: [null, ...resto] };
}

export function capa({ apertura, recortes, hijos: lista }, desde, hasta) {
  const contenido = lista.slice(desde, hasta + 1).join("");
  const usados = [...contenido.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]);
  const defs = [...new Set(usados)].map((id) => recortes.get(id)).join("");
  return `${apertura}${defs ? `<defs>${defs}</defs>` : ""}${contenido}</svg>`;
}

function main() {
  for (const [sala, { original, capas }] of Object.entries(CAPAS)) {
    const partes = partir(fs.readFileSync(path.join(ARTE, original), "utf8"));
    const total = partes.hijos.length - 1;
    // Los tramos cubren todo el dibujo, en orden y sin huecos.
    capas.forEach(([nombre, desde], i) => {
      const esperado = i === 0 ? 1 : capas[i - 1][2] + 1;
      if (desde !== esperado) throw new Error(`${sala}/${nombre}: empieza en ${desde}, no en ${esperado}`);
    });
    if (capas.at(-1)[2] !== total) throw new Error(`${sala}: faltan hijos (hay ${total})`);
    const dir = path.join(ARTE, sala);
    fs.mkdirSync(dir, { recursive: true });
    for (const [nombre, desde, hasta] of capas) {
      fs.writeFileSync(path.join(dir, `${nombre}.svg`), capa(partes, desde, hasta));
    }
    console.log(`${sala}: ${capas.length} capas`);
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) main();
