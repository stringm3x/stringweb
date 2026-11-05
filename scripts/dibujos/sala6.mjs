// Sala 6 · Cómo trabajamos (lote 19): "La obra, de izquierda a derecha".
// Un solo edificio que se completa en cinco tramos iguales, uno por paso:
// 1 cimientos · 2 plano · 3 estructura · 4 muros · 5 luz. El cimiento corre
// bajo los cinco y el techo es el mismo del 2 al 5. Línea a mano como en
// giros.mjs; los materiales salen de la paleta del arte del 29 oct
// (docs/diseno.md) y la bandera es el único verde. Las etiquetas no van
// aquí: viven en el HTML de app/components/salas/Sala6Trabajo.jsx.
// Uso: node scripts/dibujos/sala6.mjs public/arte
//      (después, svgo: ver svgo.config.mjs)
import fs from "node:fs";
import path from "node:path";

// Lienzo de composición 640×640; se recorta a lo dibujado (las etiquetas,
// que en el lienzo iban de y=524 a 568, pasaron al HTML). Los tramos van de
// x=70 a 570: 46 px de margen a cada lado del recorte (7.8 % de 592).
const VX = 24, VY = 172, W = 592, H = 320;

// Neutros de la noche (los de giros.mjs).
const LINEA = "#F5F5F3", GRIS = "#5A5A5E", RAYA = "#3A3A3E", OSCURO = "#141416";
// Materiales (docs/diseno.md, la paleta del arte, 29 oct).
const MADERA = "#9A6534", MADERA_S = "#5E3A1A";
const MARMOL = "#DCD3C2", MARMOL_L = "#ECE5D6", MARMOL_S = "#A99F8C";
const VIDRIO = "#CFDCE0";
const AMARILLO = "#E0A526";
const TERRACOTA = "#B5523B";
const LUZ = "#50FF05";

function lienzo(semilla) {
  let s = semilla;
  const azar = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const r = (a) => (azar() * 2 - 1) * a;
  const f = (n) => (Math.round(n * 10) / 10).toString();
  const el = [];
  const defs = [];
  let clips = 0;

  // Puntos de un tramo con temblor perpendicular.
  function tramo(a, b, j, paso = 28) {
    const [x1, y1] = a, [x2, y2] = b;
    const L = Math.hypot(x2 - x1, y2 - y1);
    const n = Math.max(2, Math.round(L / paso));
    const nx = -(y2 - y1) / (L || 1), ny = (x2 - x1) / (L || 1);
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const d = i === 0 || i === n ? r(j * 0.4) : r(j);
      pts.push([x1 + (x2 - x1) * t + nx * d, y1 + (y2 - y1) * t + ny * d]);
    }
    return pts;
  }
  // Curva suave por los puntos (cuadráticas por los puntos medios).
  function curva(pts, cerrada) {
    if (cerrada) pts = [...pts, pts[0], pts[1]];
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
      d += `Q${f(pts[i][0])} ${f(pts[i][1])} ${f(mx)} ${f(my)}`;
    }
    const u = pts[pts.length - 1];
    d += cerrada ? "Z" : `L${f(u[0])} ${f(u[1])}`;
    return d;
  }
  const attrs = ({ c = LINEA, w = 1.6, punteado } = {}) =>
    `fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"` +
    (punteado ? ` stroke-dasharray="${punteado}"` : "");

  // Polilínea a mano: cada esquina se respeta, cada lado tiembla.
  function poly(pts, o = {}) {
    const j = o.j ?? 0.9;
    const cerrada = !!o.cerrada;
    const lados = cerrada ? [...pts, pts[0]] : pts;
    let d = "";
    for (let i = 0; i < lados.length - 1; i++) {
      const p = tramo([lados[i][0] + r(0.6), lados[i][1] + r(0.6)], [lados[i + 1][0] + r(0.6), lados[i + 1][1] + r(0.6)], j);
      const c = curva(p, false);
      d += i === 0 ? c : c.replace(/^M/, "L");
    }
    if (cerrada) d += "Z";
    if (o.fill) el.push(`<path d="${d}" fill="${o.fill}" stroke="none"/>`);
    if (o.c !== null) el.push(`<path d="${d}" ${attrs(o)}/>`);
    return d;
  }
  const linea = (x1, y1, x2, y2, o) => poly([[x1, y1], [x2, y2]], o);
  const rect = (x, y, w, h, o = {}) => poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], { ...o, cerrada: true });
  // Curva libre por puntos (la cinta que cuelga).
  function trazo(pts, o = {}) {
    const d = curva(pts.map(([x, y]) => [x + r(o.j ?? 0.8), y + r(o.j ?? 0.8)]), false);
    el.push(`<path d="${d}" ${attrs(o)}/>`);
  }
  // Rayado dentro de una región (un path), a mano y en diagonal.
  function rayado(region, caja, o = {}) {
    const id = `s6-${++clips}`;
    defs.push(`<clipPath id="${id}"><path d="${region}"/></clipPath>`);
    const [x0, y0, x1, y1] = caja;
    const paso = o.paso ?? 5, ang = ((o.ang ?? -28) * Math.PI) / 180;
    const largo = Math.hypot(x1 - x0, y1 - y0) + 4;
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    const ux = Math.cos(ang), uy = Math.sin(ang), vx = -uy, vy = ux;
    let lineas = "";
    for (let k = -largo / 2; k <= largo / 2; k += paso) {
      const ax = cx + vx * k - (ux * largo) / 2, ay = cy + vy * k - (uy * largo) / 2;
      const bx = cx + vx * k + (ux * largo) / 2, by = cy + vy * k + (uy * largo) / 2;
      lineas += curva(tramo([ax, ay], [bx, by], 0.7, 70), false);
    }
    el.push(`<path clip-path="url(#${id})" d="${lineas}" ${attrs({ c: o.c ?? RAYA, w: o.w ?? 1 })}/>`);
  }

  const svg = () =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="${VX} ${VY} ${W} ${H}" aria-hidden="true">` +
    (defs.length ? `<defs>${defs.join("")}</defs>` : "") + el.join("") + "</svg>";
  return { r, poly, linea, rect, trazo, rayado, svg };
}

const SUELO = 440, TECHO = 250;

// Las ventanas de un tramo: dos columnas, tres filas (en el 5, la de abajo
// deja lugar a la puerta).
function ventanas(x0, filas = [272, 318, 364]) {
  const lista = [];
  for (const y of filas) for (const dx of [20, 56]) lista.push([x0 + dx, y, 24, 30]);
  return lista;
}

function obra(d) {
  // Separadores entre tramos: punteado muy tenue, detrás de todo.
  for (const x of [170, 270, 370, 470]) d.linea(x, 196, x, 488, { c: RAYA, w: 1, j: 0.2, punteado: "1 6" });

  // La tierra, rayada, y el cimiento de concreto que corre bajo los cinco.
  const tierra = `M32 ${SUELO}L608 ${SUELO}L608 490L32 490Z`;
  d.rayado(tierra, [32, SUELO, 608, 490], { paso: 7, c: RAYA });
  const cimiento = d.rect(72, SUELO, 496, 40, { fill: MARMOL_S, c: LINEA, w: 1.4 });
  d.rayado(cimiento, [72, SUELO, 568, 480], { paso: 6, c: GRIS, ang: -40 });
  d.linea(32, SUELO, 608, SUELO, { c: LINEA, w: 1.6, j: 0.8 });

  // 1 · Cimientos: dos estacas de madera y la cinta de obra entre ellas.
  for (const x of [92, 148]) {
    d.poly([[x - 3, 398], [x + 3, 398], [x + 3, SUELO - 4], [x, SUELO + 2], [x - 3, SUELO - 4]], { cerrada: true, fill: MADERA, c: MADERA_S, w: 1.1 });
  }
  d.trazo([[92, 404], [106, 410], [120, 412], [134, 410], [148, 404]], { c: AMARILLO, w: 3, j: 0.4 });
  d.trazo([[92, 418], [108, 423], [120, 424], [132, 423], [148, 418]], { c: AMARILLO, w: 2, j: 0.4 });

  // 2 · Plano: el contorno y sus ventanas en punteado de vidrio, con su cota.
  const plano = { c: VIDRIO, w: 1.4, j: 0.5, punteado: "4 4" };
  d.rect(174, TECHO, 96, SUELO - TECHO, plano);
  for (const [x, y, w, h] of ventanas(170)) d.rect(x, y, w, h, { ...plano, w: 1.2, punteado: "3 3" });
  d.rect(208, 404, 24, 36, { ...plano, w: 1.2, punteado: "3 3" });
  d.linea(174, 232, 270, 232, { c: VIDRIO, w: 1, j: 0.3 });
  for (const x of [174, 270]) d.linea(x, 226, x, 238, { c: VIDRIO, w: 1, j: 0.2 });
  for (const x of [174, 270]) d.linea(x - 3, 235, x + 3, 229, { c: VIDRIO, w: 1, j: 0.1 });

  // 3 · Estructura: columnas y vigas de madera, con una diagonal de refuerzo.
  for (const x of [270, 316, 362]) d.rect(x, TECHO, 8, SUELO - TECHO, { fill: MADERA, c: MADERA_S, w: 1 });
  for (const y of [TECHO, 314, 378]) d.rect(270, y, 100, 7, { fill: MADERA, c: MADERA_S, w: 1 });
  d.poly([[278, SUELO - 2], [284, SUELO - 2], [316, 386], [310, 384]], { cerrada: true, fill: MADERA, c: MADERA_S, w: 1 });

  // 4 · Muros: papel y mármol con ventanas de vidrio, y el andamio delante.
  d.rect(370, TECHO, 100, SUELO - TECHO, { fill: MARMOL_L, c: LINEA, w: 1.4 });
  // Cada vidrio con su marco y una raya de reflejo, en mármol sombra.
  for (const [x, y, w, h] of [...ventanas(370), [406, 404, 28, 36]]) {
    d.rect(x, y, w, h, { fill: VIDRIO, c: MARMOL_S, w: 1.3 });
    d.linea(x + 5, y + h * 0.6, x + w * 0.6, y + 5, { c: MARMOL_S, w: 1.1, j: 0.3 });
  }
  for (const x of [380, 420, 460]) d.linea(x, 236, x, SUELO, { c: MARMOL_S, w: 2, j: 0.3 });
  for (const [a, b] of [[380, 420], [420, 460]]) {
    d.linea(a, 302, b, 364, { c: MARMOL_S, w: 1, j: 0.3 });
    d.linea(b, 302, a, 364, { c: MARMOL_S, w: 1, j: 0.3 });
    d.linea(a, 370, b, 432, { c: MARMOL_S, w: 1, j: 0.3 });
    d.linea(b, 370, a, 432, { c: MARMOL_S, w: 1, j: 0.3 });
  }
  for (const y of [296, 364]) d.rect(374, y, 92, 6, { fill: MADERA, c: MADERA_S, w: 1 });

  // 5 · Luz: el tramo terminado, con su losa, la luz encendida, la puerta y
  // la bandera de STRING, el único verde del dibujo.
  d.rect(470, TECHO, 98, SUELO - TECHO, { fill: MARMOL_L, c: LINEA, w: 1.4 });
  d.rect(466, 238, 106, 12, { fill: TERRACOTA, c: LINEA, w: 1.2 });
  for (const [x, y, w, h] of ventanas(470, [272, 318])) d.rect(x, y, w, h, { fill: AMARILLO, c: GRIS, w: 1.1 });
  d.rect(476 + 30, 386, 28, 54, { fill: MADERA, c: MADERA_S, w: 1.2 });
  d.linea(528, 414, 528, 416, { c: MARMOL, w: 2, j: 0 });
  d.linea(556, 238, 556, 186, { c: LINEA, w: 1.6, j: 0.3 });
  d.poly([[557, 188], [590, 197], [557, 206]], { cerrada: true, fill: LUZ, c: LUZ, w: 1.2, j: 0.3 });
}

const salida = process.argv[2];
fs.mkdirSync(salida, { recursive: true });
const d = lienzo(619);
obra(d);
fs.writeFileSync(path.join(salida, "sala6-obra.svg"), d.svg());
console.log("sala6-obra");
