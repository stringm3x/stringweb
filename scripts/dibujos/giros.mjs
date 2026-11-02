// Dibujos de los giros (lote 11), en el estilo de public/arte/niveles:
// línea a mano en #F5F5F3, rellenos oscuros, rayado #2E2E32 para sombras
// y suelo, detalles en neblina y un solo toque verde.
// Los nueve de public/arte/giros/ (todos menos gimnasios, que sale de dibujar.mjs).
// Uso: node scripts/dibujos/giros.mjs public/arte/giros  (después, svgo: ver svgo.config.mjs)
import fs from "node:fs";
import path from "node:path";

const W = 520, H = 372;
const LINEA = "#F5F5F3", NEBLINA = "#9A9A9F", GRIS = "#5A5A5E", RAYA = "#2E2E32", RAYA2 = "#3A3A3E";
const OSCURO = "#141416", OSCURO2 = "#0E0E10", LUZ = "#50FF05";
const MADERA = "#9A6534", MADERA_S = "#5E3A1A", ORO = "#C9A23F", ACERO = "#A9AEB4", VIDRIO = "#CFDCE0";

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
  const attrs = ({ c = LINEA, w = 1.6, fill = "none", op } = {}) =>
    `fill="${fill}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${op ? ` opacity="${op}"` : ""}`;

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
    if (o.fill && o.fill !== "none") el.push(`<path d="${d}" fill="${o.fill}" stroke="none"/>`);
    if (o.c !== null) el.push(`<path d="${d}" ${attrs({ ...o, fill: "none" })}/>`);
    return d;
  }
  const linea = (x1, y1, x2, y2, o) => poly([[x1, y1], [x2, y2]], o);
  const rect = (x, y, w, h, o = {}) => poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], { ...o, cerrada: true });
  // Curva libre por puntos de control (para tubos, asas, pétalos).
  function trazo(pts, o = {}) {
    const p = pts.map(([x, y]) => [x + r(o.j ?? 0.8), y + r(o.j ?? 0.8)]);
    const d = curva(p, !!o.cerrada);
    if (o.fill && o.fill !== "none") el.push(`<path d="${d}" fill="${o.fill}" stroke="none"/>`);
    if (o.c !== null) el.push(`<path d="${d}" ${attrs({ ...o, fill: "none" })}/>`);
    return d;
  }
  function elipse(cx, cy, rx, ry, o = {}) {
    const n = Math.max(14, Math.round((rx + ry) / 4));
    const a0 = r(Math.PI);
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = a0 + (i / n) * Math.PI * 2;
      const k = 1 + r(0.025);
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    const d = curva(pts, true);
    if (o.fill && o.fill !== "none") el.push(`<path d="${d}" fill="${o.fill}" stroke="none"/>`);
    if (o.c !== null) el.push(`<path d="${d}" ${attrs({ ...o, fill: "none" })}/>`);
    return d;
  }
  // Rayado dentro de una región (un path), a mano y en diagonal.
  function rayado(region, caja, o = {}) {
    const id = `c${semilla}-${++clips}`;
    defs.push(`<clipPath id="${id}"><path d="${region}"/></clipPath>`);
    const [x0, y0, x1, y1] = caja;
    const paso = o.paso ?? 5, ang = ((o.ang ?? -28) * Math.PI) / 180;
    const largo = Math.hypot(x1 - x0, y1 - y0) + 4;
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    const ux = Math.cos(ang), uy = Math.sin(ang), vx = -uy, vy = ux;
    let lineas = "";
    for (let k = -largo / 2; k <= largo / 2; k += paso) {
      const ax = cx + vx * k - ux * largo / 2, ay = cy + vy * k - uy * largo / 2;
      const bx = cx + vx * k + ux * largo / 2, by = cy + vy * k + uy * largo / 2;
      lineas += curva(tramo([ax, ay], [bx, by], 0.7, 70), false);
    }
    el.push(`<path clip-path="url(#${id})" d="${lineas}" ${attrs({ c: o.c ?? RAYA, w: o.w ?? 1 })}/>`);
  }
  // El suelo: rayas horizontales que se adelgazan hacia los lados.
  function suelo(x0, x1, y, o = {}) {
    const filas = o.filas ?? 4;
    for (let i = 0; i < filas; i++) {
      const m = (x1 - x0) * 0.08 * i;
      const yy = y + 6 + i * 5;
      for (let x = x0 + m + r(8); x < x1 - m; x += 30 + r(10)) {
        const l = 16 + r(8);
        linea(x, yy + r(1), Math.min(x + l, x1 - m), yy + r(1), { c: RAYA, w: 1, j: 0.4 });
      }
    }
    linea(x0 - 10, y, x1 + 10, y, { c: o.c ?? LINEA, w: 1.4, j: 0.8 });
  }

  const svg = () =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">` +
    (defs.length ? `<defs>${defs.join("")}</defs>` : "") + el.join("") + "</svg>";
  return { r, poly, linea, rect, trazo, elipse, rayado, suelo, svg, el };
}

const DIBUJOS = {};

// Barberías: tijeras abiertas sobre un peine, en la mesa del espejo.
DIBUJOS.barberias = (d) => {
  d.suelo(50, 470, 300);
  // Sombra de la mesa.
  const sombra = "M70 300L450 300L470 318L60 318Z";
  d.rayado(sombra, [60, 300, 470, 318], { paso: 4 });
  // Peine, acostado y en perspectiva.
  const lomo = d.poly([[96, 250], [404, 232], [410, 246], [100, 266]], { cerrada: true, fill: OSCURO, w: 1.6 });
  d.rayado(lomo, [96, 232, 410, 266], { paso: 4, c: RAYA2 });
  for (let i = 0; i < 34; i++) {
    const x = 104 + i * 8.8, y = 265 - i * 0.54;
    const largo = i < 14 ? 24 : 16;
    d.linea(x, y, x - 3, y + largo, { w: 1.2, j: 0.3 });
  }
  // Tijeras: dos hojas que se cruzan en el tornillo, y sus ojos.
  const piv = [268, 168];
  const hoja1 = d.trazo([[piv[0] - 4, piv[1] + 6], [330, 120], [404, 72], [410, 76], [340, 132], [piv[0] + 8, piv[1] + 4]], { cerrada: true, fill: OSCURO2, w: 1.6, j: 0.5 });
  d.rayado(hoja1, [260, 70, 412, 176], { paso: 5, c: RAYA2 });
  d.trazo([[piv[0] + 4, piv[1] - 8], [336, 190], [414, 214], [412, 220], [330, 202], [piv[0] - 6, piv[1] + 2]], { cerrada: true, fill: OSCURO2, w: 1.6, j: 0.5 });
  d.linea(300, 150, 396, 84, { c: NEBLINA, w: 1, j: 0.3 });
  d.linea(300, 186, 400, 212, { c: NEBLINA, w: 1, j: 0.3 });
  // Brazos hacia los ojos.
  d.trazo([[piv[0] - 4, piv[1] + 6], [230, 188], [196, 204]], { w: 1.6, j: 0.4 });
  d.trazo([[piv[0] - 6, piv[1] - 2], [232, 150], [200, 132]], { w: 1.6, j: 0.4 });
  d.elipse(174, 212, 26, 18, { w: 1.6, fill: OSCURO });
  d.elipse(174, 212, 15, 9, { w: 1.2, c: NEBLINA });
  d.elipse(178, 124, 26, 18, { w: 1.6, fill: OSCURO });
  d.elipse(178, 124, 15, 9, { w: 1.2, c: NEBLINA });
  // El toque verde: el tornillo.
  d.elipse(piv[0], piv[1], 5.5, 5.5, { c: LUZ, w: 1.6, fill: LUZ });
};

// Clínicas: la agenda abierta y el estetoscopio encima.
DIBUJOS.clinicas = (d) => {
  d.suelo(40, 480, 312);
  // Agenda abierta, en perspectiva.
  const izq = d.poly([[86, 110], [258, 96], [262, 292], [70, 300]], { cerrada: true, fill: OSCURO, w: 1.6 });
  const der = d.poly([[258, 96], [432, 112], [452, 300], [262, 292]], { cerrada: true, fill: OSCURO, w: 1.6 });
  d.rayado("M70 300L262 292L452 300L456 312L66 312Z", [60, 290, 460, 314], { paso: 4 });
  d.linea(258, 96, 262, 292, { w: 1.2, c: NEBLINA });
  // Renglones de horas (izquierda) y casillas del día (derecha).
  for (let i = 0; i < 8; i++) {
    const y = 134 + i * 20;
    d.linea(98 - i * 1.6, y - i * 0.2, 244, y - 2 - i * 0.2, { c: GRIS, w: 1, j: 0.4 });
    d.linea(98 - i * 1.6, y - i * 0.2, 112 - i * 1.6, y - i * 0.2, { c: NEBLINA, w: 1.6, j: 0.2 });
  }
  for (let i = 0; i < 8; i++) {
    const y = 132 + i * 20;
    d.linea(276, y - 2, 424 + i * 2.2, y + i * 0.6, { c: GRIS, w: 1, j: 0.4 });
  }
  // Una cita apartada (barra) y la siguiente, la del toque verde.
  d.rect(286, 150, 70, 12, { c: NEBLINA, w: 1.2, fill: "#1C1C1E" });
  d.rect(296, 210, 84, 12, { c: LUZ, w: 1.4 });
  // Estetoscopio: tubo en Y, olivas, y la campana sobre la página.
  d.trazo([[150, 70], [140, 120], [168, 168], [214, 186]], { w: 2.4, c: ACERO, j: 0.4 });
  d.trazo([[196, 64], [204, 118], [190, 162], [214, 186]], { w: 2.4, c: ACERO, j: 0.4 });
  d.elipse(150, 66, 5, 5, { w: 1.4, fill: OSCURO });
  d.elipse(196, 60, 5, 5, { w: 1.4, fill: OSCURO });
  d.trazo([[214, 186], [252, 232], [300, 252], [340, 250], [372, 236]], { w: 3, c: LINEA, j: 0.5 });
  d.elipse(392, 232, 22, 16, { w: 1.8, fill: OSCURO2 });
  d.elipse(392, 232, 13, 9, { w: 1.2, c: ACERO });
};

// Restaurantes: una mesa puesta para dos.
DIBUJOS.restaurantes = (d) => {
  d.suelo(40, 480, 320);
  // Cubierta de la mesa en perspectiva, con mantel.
  const mantel = d.poly([[120, 150], [400, 150], [462, 222], [58, 222]], { cerrada: true, fill: OSCURO, w: 1.6 });
  const caida = d.poly([[58, 222], [462, 222], [458, 262], [62, 262]], { cerrada: true, fill: OSCURO2, w: 1.6 });
  d.rayado(caida, [58, 222, 462, 262], { paso: 5 });
  for (const x of [120, 200, 280, 360, 430]) d.linea(x, 224, x - 2 + (x - 260) * 0.02, 260, { c: RAYA2, w: 1, j: 0.5 });
  // Patas.
  d.linea(78, 262, 82, 320, { w: 1.6 });
  d.linea(442, 262, 438, 320, { w: 1.6 });
  d.linea(250, 262, 250, 304, { c: GRIS, w: 1.2 });
  // Platos.
  for (const [cx, cy] of [[190, 188], [330, 188]]) {
    d.elipse(cx, cy, 52, 18, { w: 1.6, fill: "#1C1C1E" });
    d.elipse(cx, cy, 34, 11, { w: 1.1, c: NEBLINA });
  }
  // Cubiertos.
  d.linea(126, 176, 118, 204, { w: 1.4 });
  for (const k of [-4, 0, 4]) d.linea(126 + k, 172, 127 + k, 180, { w: 1, j: 0.2 });
  d.linea(254, 176, 248, 206, { w: 1.4 });
  d.linea(394, 176, 402, 204, { w: 1.4 });
  d.linea(268, 176, 274, 206, { w: 1.4 });
  // Copas.
  for (const [cx, cy] of [[232, 150], [380, 148]]) {
    d.trazo([[cx - 12, cy - 44], [cx - 13, cy - 24], [cx, cy - 14], [cx + 13, cy - 24], [cx + 12, cy - 44]], { w: 1.4, j: 0.3 });
    d.elipse(cx, cy - 44, 12, 3.5, { w: 1.1, c: NEBLINA });
    d.linea(cx, cy - 14, cx, cy + 2, { w: 1.2, j: 0.2 });
    d.elipse(cx, cy + 3, 9, 2.6, { w: 1.2 });
  }
  // Florero al centro.
  d.trazo([[252, 178], [246, 158], [254, 136], [262, 136], [268, 158], [262, 178]], { w: 1.4, fill: OSCURO2, j: 0.3 });
  d.trazo([[258, 136], [256, 112], [250, 96]], { w: 1.1, c: NEBLINA, j: 0.4 });
  d.trazo([[260, 136], [266, 108], [276, 94]], { w: 1.1, c: NEBLINA, j: 0.4 });
  // El toque verde: el letrero de reservado, sin letras.
  d.poly([[300, 156], [340, 156], [344, 138], [304, 138]], { cerrada: true, fill: OSCURO, w: 1.3 });
  d.linea(310, 147, 334, 147, { c: LUZ, w: 2, j: 0.2 });
};

// Tiendas en línea: la caja de envío cerrada, con cinta y etiqueta.
DIBUJOS.tiendas = (d) => {
  d.suelo(60, 460, 312);
  const frente = d.poly([[130, 168], [300, 196], [300, 312], [130, 290]], { cerrada: true, fill: "#1C1C1E", w: 1.7 });
  const lado = d.poly([[300, 196], [404, 156], [404, 270], [300, 312]], { cerrada: true, fill: OSCURO2, w: 1.7 });
  d.rayado(lado, [300, 150, 410, 316], { paso: 5 });
  const tapa = d.poly([[130, 168], [236, 130], [404, 156], [300, 196]], { cerrada: true, fill: OSCURO, w: 1.7 });
  // Cinta de la tapa y su caída por el frente.
  d.poly([[178, 152], [196, 146], [354, 174], [336, 182]], { cerrada: true, c: ACERO, w: 1.1, fill: "#26262A" });
  d.poly([[336, 182], [354, 174], [354, 190], [336, 198]], { cerrada: true, c: ACERO, w: 1.1 });
  // Sombra contra el suelo.
  d.rayado("M130 290L300 312L404 270L440 280L320 328L110 304Z", [110, 268, 440, 330], { paso: 4 });
  // Etiqueta del envío con renglones.
  d.poly([[150, 214], [236, 228], [236, 278], [150, 264]], { cerrada: true, fill: OSCURO, c: NEBLINA, w: 1.2 });
  for (let i = 0; i < 3; i++) d.linea(158, 232 + i * 11, 212 - i * 10, 240 + i * 11 - i * 1.6, { c: GRIS, w: 1, j: 0.3 });
  // Flechas de "este lado arriba" en el lado.
  for (const x of [336, 360]) {
    d.linea(x, 250, x, 222, { c: NEBLINA, w: 1.1, j: 0.2 });
    d.poly([[x - 5, 228], [x, 220], [x + 5, 228]], { c: NEBLINA, w: 1.1, j: 0.2 });
  }
  // El toque verde: la palomita de entregado en la etiqueta.
  d.poly([[214, 258], [221, 266], [234, 248]], { c: LUZ, w: 2, j: 0.3 });
};

// Distribuidoras: el almacén con su cortina y la camioneta al frente.
DIBUJOS.distribuidoras = (d) => {
  d.suelo(20, 500, 314);
  // Almacén con techo de lámina en arco.
  const muro = d.poly([[60, 150], [330, 150], [330, 314], [60, 314]], { cerrada: true, fill: OSCURO, w: 1.6 });
  const arco = [];
  for (let i = 0; i <= 12; i++) { const t = i / 12; arco.push([52 + 286 * t, 152 - Math.sin(Math.PI * t) * 58]); }
  const techo = d.poly(arco, { w: 1.6, fill: OSCURO2, cerrada: true, j: 0.4 });
  d.rayado(techo, [52, 92, 338, 154], { paso: 7, ang: 90, c: RAYA2 });
  // Cortina enrollable.
  const cortina = d.poly([[120, 196], [270, 196], [270, 314], [120, 314]], { cerrada: true, fill: OSCURO2, w: 1.4 });
  for (let y = 206; y < 312; y += 9) d.linea(122, y, 268, y, { c: GRIS, w: 1, j: 0.4 });
  d.linea(112, 192, 278, 192, { w: 1.6 });
  // Cajas apiladas junto a la puerta.
  for (const [x, y, w, h] of [[282, 272, 38, 42], [284, 236, 34, 36]]) {
    d.rect(x, y, w, h, { w: 1.3, fill: "#1C1C1E" });
    d.linea(x + w / 2, y, x + w / 2, y + 10, { c: NEBLINA, w: 1, j: 0.2 });
  }
  // Camioneta de reparto, de perfil.
  const caja = d.poly([[340, 214], [440, 214], [440, 296], [340, 296]], { cerrada: true, fill: "#1C1C1E", w: 1.6 });
  d.rayado(caja, [340, 214, 440, 296], { paso: 6, c: RAYA });
  d.poly([[440, 236], [470, 236], [490, 266], [492, 296], [440, 296]], { cerrada: true, fill: OSCURO, w: 1.6 });
  d.poly([[446, 242], [466, 242], [480, 264], [446, 264]], { cerrada: true, c: NEBLINA, w: 1.1, fill: "#26262A" });
  for (const cx of [366, 462]) {
    d.elipse(cx, 300, 14, 14, { w: 1.6, fill: "#000000" });
    d.elipse(cx, 300, 5, 5, { c: NEBLINA, w: 1.1 });
  }
  // El toque verde: la ruta del almacén a la camioneta.
  for (let x = 200; x < 330; x += 14) d.linea(x, 336 - (x - 200) * 0.06, x + 7, 336 - (x + 7 - 200) * 0.06, { c: LUZ, w: 1.6, j: 0.2 });
  d.elipse(340, 328, 3.5, 3.5, { c: LUZ, fill: LUZ, w: 1 });
};

// Inmobiliarias: la fachada de una casa y su letrero clavado en el jardín.
DIBUJOS.inmobiliarias = (d) => {
  d.suelo(30, 490, 316);
  const muro = d.poly([[150, 140], [380, 140], [380, 316], [150, 316]], { cerrada: true, fill: OSCURO, w: 1.6 });
  const techo = d.poly([[134, 142], [265, 70], [396, 142]], { cerrada: true, fill: OSCURO2, w: 1.6 });
  d.rayado(techo, [134, 70, 396, 142], { paso: 5 });
  // Ventanas de arriba y de abajo, y la puerta.
  for (const x of [176, 300]) {
    d.rect(x, 160, 54, 46, { w: 1.3, fill: "#1C1C1E" });
    d.linea(x + 27, 160, x + 27, 206, { c: NEBLINA, w: 1 });
    d.linea(x, 183, x + 54, 183, { c: NEBLINA, w: 1 });
  }
  d.rect(176, 236, 54, 46, { w: 1.3, fill: "#1C1C1E" });
  d.linea(203, 236, 203, 282, { c: NEBLINA, w: 1 });
  const puerta = d.rect(296, 232, 50, 84, { w: 1.4, fill: OSCURO2 });
  d.rayado(puerta, [296, 232, 346, 316], { paso: 5 });
  d.elipse(336, 276, 2.6, 2.6, { w: 1, c: ORO, fill: ORO });
  // Arbusto.
  // Follaje: lóbulos redondos (|sen|) de tamaño desigual, como hojas en bola.
  const hojas = [];
  const lobulo = [1, 0.8, 1.15, 0.9, 1.05, 0.85];
  for (let i = 0; i <= 72; i++) {
    const u = i / 72, t = Math.PI * (1 - u);
    const k = Math.min(5, Math.floor(u * 6));
    const rr = 30 + 9 * lobulo[k] * Math.abs(Math.sin(u * Math.PI * 6));
    hojas.push([416 + Math.cos(t) * rr * 1.25, 317 - Math.sin(t) * rr * 1.45]);
  }
  const follaje = d.trazo(hojas, { cerrada: true, w: 1.4, fill: OSCURO2, j: 0.3 });
  d.rayado(`${follaje}`, [366, 250, 466, 318], { paso: 4, c: RAYA2 });
  for (const [x, y] of [[394, 298], [404, 278], [420, 268], [436, 282], [446, 300], [418, 294]]) {
    d.trazo([[x - 5, y + 2], [x, y - 3], [x + 5, y + 1]], { c: NEBLINA, w: 1, j: 0.4 });
  }
  // Letrero en su poste, sin letras.
  d.linea(84, 316, 84, 190, { w: 1.8 });
  d.linea(84, 196, 128, 196, { w: 1.6 });
  d.linea(98, 196, 98, 206, { w: 1, c: NEBLINA });
  d.linea(122, 196, 122, 206, { w: 1, c: NEBLINA });
  d.rect(78, 206, 64, 46, { w: 1.5, fill: "#1C1C1E" });
  d.linea(88, 228, 130, 228, { c: GRIS, w: 1, j: 0.3 });
  d.linea(88, 238, 120, 238, { c: GRIS, w: 1, j: 0.3 });
  // El toque verde: la franja del letrero.
  d.linea(88, 217, 132, 217, { c: LUZ, w: 2.4, j: 0.2 });
};

// Escuelas: el pizarrón en la pared y un pupitre con su silla.
DIBUJOS.escuelas = (d) => {
  d.suelo(30, 490, 318);
  // Pizarrón con marco de madera.
  d.rect(92, 54, 336, 150, { w: 1.6, fill: MADERA_S, c: MADERA });
  const tabla = d.rect(102, 62, 316, 134, { w: 1.4, fill: "#16201A", c: LINEA });
  d.rayado(tabla, [102, 62, 418, 196], { paso: 9, c: "#1E2A22" });
  d.rect(110, 204, 300, 7, { w: 1.2, fill: MADERA, c: MADERA });
  // Lo escrito con gis, abstracto: renglones y una suma.
  d.trazo([[128, 90], [160, 86], [196, 92], [222, 88]], { c: LINEA, w: 1.4, j: 0.7 });
  d.trazo([[128, 112], [170, 110], [206, 114]], { c: NEBLINA, w: 1.2, j: 0.7 });
  d.trazo([[128, 132], [150, 130], [184, 134], [214, 130]], { c: NEBLINA, w: 1.2, j: 0.7 });
  d.linea(270, 96, 270, 120, { w: 1.4 }); d.linea(258, 108, 282, 108, { w: 1.4 });
  d.linea(300, 96, 316, 120, { w: 1.4 }); d.linea(316, 96, 300, 120, { w: 1.4 });
  d.linea(256, 140, 336, 140, { w: 1.4 });
  // El toque verde: la palomita en el pizarrón.
  d.poly([[350, 150], [362, 164], [388, 132]], { c: LUZ, w: 2.4, j: 0.3 });
  // Pupitre en perspectiva, como la mesa de /nosotros: cubierta, canto
  // rayado al frente y al lado, la rejilla de abajo, patas y su sombra.
  d.rayado("M188 304L344 294L380 322L206 332Z", [188, 294, 380, 332], { paso: 4 });
  d.linea(198, 240, 198, 300, { c: GRIS, w: 1.2 });
  d.linea(330, 232, 330, 294, { c: GRIS, w: 1.2 });
  const tapa = d.poly([[198, 240], [330, 232], [354, 258], [214, 268]], { cerrada: true, fill: MADERA, c: LINEA, w: 1.5 });
  d.rayado(tapa, [198, 232, 354, 268], { paso: 7, c: MADERA_S });
  const frente = d.poly([[214, 268], [354, 258], [354, 266], [214, 276]], { cerrada: true, fill: OSCURO, w: 1.3 });
  d.rayado(frente, [214, 258, 354, 276], { paso: 3 });
  const canto = d.poly([[330, 232], [354, 258], [354, 266], [330, 240]], { cerrada: true, fill: OSCURO, w: 1.3 });
  d.rayado(canto, [330, 232, 354, 266], { paso: 3 });
  d.poly([[206, 284], [334, 276], [346, 288]], { c: NEBLINA, w: 1.1, j: 0.4 });
  d.linea(216, 276, 216, 326, { w: 1.6 });
  d.linea(352, 266, 352, 316, { w: 1.6 });
  // Un libro abierto sobre la cubierta.
  d.poly([[236, 246], [266, 244], [272, 256], [240, 258]], { cerrada: true, fill: "#26262A", w: 1.2 });
  d.poly([[266, 244], [296, 242], [304, 254], [272, 256]], { cerrada: true, fill: "#26262A", w: 1.2 });
  d.linea(244, 250, 264, 249, { c: GRIS, w: 1, j: 0.2 });
  d.linea(274, 248, 294, 247, { c: GRIS, w: 1, j: 0.2 });
  // La silla, de tres cuartos: asiento con canto, respaldo de dos tablas.
  d.rayado("M378 304L432 300L452 318L392 322Z", [378, 300, 452, 322], { paso: 4 });
  d.linea(378, 270, 378, 306, { c: GRIS, w: 1.2 });
  d.linea(428, 266, 428, 302, { c: GRIS, w: 1.2 });
  d.linea(378, 270, 378, 212, { w: 1.5 });
  d.linea(428, 266, 428, 208, { w: 1.5 });
  d.poly([[378, 214], [428, 210], [428, 222], [378, 226]], { cerrada: true, fill: MADERA, c: LINEA, w: 1.3 });
  d.poly([[378, 234], [428, 230], [428, 240], [378, 244]], { cerrada: true, fill: MADERA, c: LINEA, w: 1.3 });
  d.poly([[378, 270], [428, 266], [442, 282], [390, 286]], { cerrada: true, fill: MADERA, c: LINEA, w: 1.4 });
  const asiento = d.poly([[390, 286], [442, 282], [442, 288], [390, 292]], { cerrada: true, fill: OSCURO, w: 1.2 });
  d.rayado(asiento, [390, 282, 442, 292], { paso: 3 });
  d.linea(392, 292, 392, 324, { w: 1.5 });
  d.linea(440, 288, 440, 320, { w: 1.5 });
};

// Hoteles: la cama tendida y la llave con su llavero al frente.
DIBUJOS.hoteles = (d) => {
  d.suelo(30, 490, 318);
  // Cabecera.
  const cabecera = d.rect(110, 90, 300, 104, { w: 1.6, fill: OSCURO });
  for (let x = 140; x < 400; x += 30) d.linea(x, 100, x, 186, { c: RAYA2, w: 1, j: 0.4 });
  // Colchón en perspectiva y la colcha.
  d.poly([[116, 194], [404, 194], [458, 262], [62, 262]], { cerrada: true, fill: "#1C1C1E", w: 1.6 });
  const colcha = d.poly([[94, 222], [426, 222], [458, 262], [62, 262]], { cerrada: true, fill: OSCURO2, w: 1.4 });
  d.rayado(colcha, [62, 222, 458, 262], { paso: 6 });
  const lado = d.poly([[62, 262], [458, 262], [454, 296], [66, 296]], { cerrada: true, fill: OSCURO2, w: 1.6 });
  d.rayado(lado, [62, 262, 458, 296], { paso: 4 });
  d.linea(70, 296, 72, 318, { w: 1.6 }); d.linea(450, 296, 448, 318, { w: 1.6 });
  // Almohadas.
  d.trazo([[140, 214], [134, 196], [148, 182], [238, 180], [250, 194], [244, 214]], { cerrada: true, w: 1.4, fill: "#26262A" });
  d.trazo([[276, 214], [270, 196], [284, 182], [374, 180], [386, 194], [380, 214]], { cerrada: true, w: 1.4, fill: "#26262A" });
  // Llave con su llavero, al frente, sobre la colcha.
  d.elipse(300, 244, 11, 11, { w: 1.6, c: ORO, fill: "#000000" });
  d.linea(311, 244, 360, 246, { w: 2, c: ORO });
  d.poly([[344, 246], [344, 254], [350, 254], [350, 250], [356, 250], [356, 246]], { c: ORO, w: 1.4, j: 0.2 });
  d.linea(289, 244, 274, 244, { w: 1.2, c: NEBLINA, j: 0.2 });
  // El toque verde: el llavero.
  d.poly([[226, 234], [274, 234], [280, 244], [274, 254], [226, 254]], { cerrada: true, c: LUZ, w: 1.6, fill: OSCURO });
  d.elipse(270, 244, 2.4, 2.4, { c: LUZ, w: 1 });
};

// Cadenas: tres fachadas iguales unidas por una sola línea.
DIBUJOS.cadenas = (d) => {
  d.suelo(20, 500, 314);
  const xs = [40, 190, 340];
  for (const x of xs) {
    const muro = d.rect(x, 140, 140, 174, { w: 1.6, fill: OSCURO });
    // Toldo rayado.
    const toldo = d.poly([[x - 6, 168], [x + 146, 168], [x + 136, 196], [x + 4, 196]], { cerrada: true, fill: "#1C1C1E", w: 1.4 });
    for (let k = 0; k < 7; k++) d.linea(x + 4 + k * 22, 168, x + 10 + k * 20, 196, { c: NEBLINA, w: 1, j: 0.3 });
    // Letrero vacío arriba del toldo.
    d.rect(x + 22, 148, 96, 14, { w: 1.1, c: NEBLINA });
    // Vitrina y puerta.
    d.rect(x + 14, 214, 64, 62, { w: 1.3, fill: "#1C1C1E" });
    d.linea(x + 46, 214, x + 46, 276, { c: GRIS, w: 1 });
    const puerta = d.rect(x + 92, 216, 34, 98, { w: 1.4, fill: OSCURO2 });
    d.rayado(puerta, [x + 92, 216, x + 126, 314], { paso: 5 });
  }
  // La línea que las une, con un nodo verde arriba: el toque verde.
  for (const x of xs) d.linea(x + 70, 140, x + 70, 104, { c: GRIS, w: 1.1, j: 0.3 });
  d.linea(110, 104, 410, 104, { c: GRIS, w: 1.1, j: 0.5 });
  d.linea(260, 104, 260, 74, { c: GRIS, w: 1.1, j: 0.3 });
  d.elipse(260, 66, 8, 8, { c: LUZ, w: 1.6, fill: LUZ });
};

const salida = process.argv[2];
fs.mkdirSync(salida, { recursive: true });
let semilla = 7;
for (const [slug, dibujar] of Object.entries(DIBUJOS)) {
  const d = lienzo((semilla += 101));
  dibujar(d);
  fs.writeFileSync(path.join(salida, `${slug}.svg`), d.svg());
}
console.log(Object.keys(DIBUJOS).join(" "));
