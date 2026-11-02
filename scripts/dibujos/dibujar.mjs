// Dibujos del lote 12, al estilo de public/arte/giros/: trazo a mano en tramos
// cuadráticos, rellenos oscuros, sombreado clipado y suelo punteado. Escribe
// giros/gimnasios.svg, productos/medida.svg y niveles/chica/*.svg.
// Uso: node scripts/dibujos/dibujar.mjs public/arte  (después, svgo: ver svgo.config.mjs)
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT = process.argv[2];
const r1 = (n) => Math.round(n * 10) / 10;

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function lienzo(id, seed) {
  const rand = rng(seed);
  const j = (a) => (rand() * 2 - 1) * a;
  const defs = [];
  const capas = [];
  let nclip = 0;

  // Un tramo recto a mano: puntos cada ~14 px con un temblor perpendicular.
  function tramo(a, b, temblor) {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const largo = Math.hypot(dx, dy);
    const n = Math.max(2, Math.round(largo / 14));
    const nx = -dy / (largo || 1);
    const ny = dx / (largo || 1);
    const pts = [];
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      const k = i === n ? 0 : j(temblor);
      pts.push([a[0] + dx * t + nx * k, a[1] + dy * t + ny * k]);
    }
    return pts;
  }

  function d(puntos, cerrado, temblor = 0.6) {
    const p = cerrado ? [...puntos, puntos[0]] : puntos;
    let s = `M${r1(p[0][0] + j(0.3))} ${r1(p[0][1] + j(0.3))}`;
    for (let i = 0; i < p.length - 1; i++) {
      const pts = tramo(p[i], p[i + 1], temblor);
      let prev = p[i];
      for (let k = 0; k < pts.length; k++) {
        const c = pts[k];
        if (k === pts.length - 1) {
          s += `L${r1(c[0])} ${r1(c[1])}`;
        } else {
          const n = pts[k + 1];
          s += `Q${r1(c[0])} ${r1(c[1])} ${r1((c[0] + n[0]) / 2)} ${r1((c[1] + n[1]) / 2)}`;
        }
        prev = c;
      }
    }
    return s + (cerrado ? "Z" : "");
  }

  const ATR = 'stroke-linecap="round" stroke-linejoin="round"';
  const api = {
    linea(puntos, { color = "#F5F5F3", ancho = 1.4, relleno, cerrado = false, temblor } = {}) {
      const camino = d(puntos, cerrado || !!relleno, temblor);
      if (relleno) capas.push(`<path d="${camino}" fill="${relleno}" stroke="none"/>`);
      if (color) capas.push(`<path d="${camino}" fill="none" stroke="${color}" stroke-width="${ancho}" ${ATR}/>`);
    },
    rect(x0, y0, x1, y1, op) {
      api.linea([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], { cerrado: true, ...op });
    },
    elipse(cx, cy, rx, ry, op = {}, giro = 0) {
      const n = Math.max(10, Math.round((Math.PI * (rx + ry)) / 9));
      const c = Math.cos(giro);
      const s = Math.sin(giro);
      const pts = [];
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2;
        const x = Math.cos(t) * rx;
        const y = Math.sin(t) * ry;
        pts.push([cx + x * c - y * s, cy + x * s + y * c]);
      }
      api.linea(pts, { cerrado: true, temblor: 0.35, ...op });
    },
    // Sombreado: rayas paralelas recortadas por un polígono.
    rayas(poligono, { angulo = -0.5, paso = 7, color = "#2E2E32" } = {}) {
      nclip++;
      const cid = `${id}-${nclip}`;
      defs.push(`<clipPath id="${cid}"><path d="M${poligono.map((p) => `${r1(p[0])} ${r1(p[1])}`).join("L")}Z"/></clipPath>`);
      const xs = poligono.map((p) => p[0]);
      const ys = poligono.map((p) => p[1]);
      const t = Math.tan(angulo);
      const x0 = Math.min(...xs) - 2;
      const x1 = Math.max(...xs) + 2;
      const caida = (x1 - x0) * t;
      const y0 = Math.min(...ys) - Math.max(0, caida);
      const y1 = Math.max(...ys) - Math.min(0, caida);
      for (let y = y0; y < y1; y += paso) {
        capas.push(
          `<path clip-path="url(#${cid})" d="${d([[x0, y], [x1, y + (x1 - x0) * t]], false, 0.4)}" fill="none" stroke="${color}" stroke-width="1" ${ATR}/>`
        );
      }
    },
    // El suelo de los giros: la línea en línea y debajo guiones en #2E2E32.
    suelo(y = 312, x0 = 50, x1 = 470) {
      const filas = [6, 11, 16, 21];
      filas.forEach((dy, f) => {
        const a = x0 + 30 + f * 32;
        const b = x1 - 30 - f * 32;
        for (let x = a; x < b; ) {
          const l = 6 + rand() * 9;
          capas.unshift(
            `<path d="${d([[x, y + dy + j(0.6)], [Math.min(x + l, b), y + dy + j(0.6)]], false, 0.3)}" fill="none" stroke="#2E2E32" stroke-width="1" ${ATR}/>`
          );
          x += l + 10 + rand() * 18;
        }
      });
      api.linea([[x0, y], [x1, y]], { ancho: 1.4, temblor: 0.5 });
    },
    svg() {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="372" viewBox="0 0 520 372" aria-hidden="true"><defs>${defs.join("")}</defs>${capas.join("")}</svg>\n`;
    },
  };
  return api;
}

const L = "#F5F5F3";
const N = "#9A9A9F";
const G = "#5A5A5E";
const OSC = "#141416";
const VERDE = "#50FF05";

// ── Gimnasios: una mancuerna en el suelo y un disco de pie ──
function gimnasios() {
  const c = lienzo("g12", 12);
  c.suelo();
  // El disco de pie, en tres cuartos: cara trasera, canto y cara de frente.
  c.elipse(366, 222, 34, 90, { color: N, ancho: 1.2, relleno: "#0E0E10" });
  c.linea([[352, 132], [338, 132]], { color: L, ancho: 1.4 });
  c.rayas([[338, 132], [366, 132], [366, 312], [338, 312]], { angulo: -0.6 });
  c.elipse(338, 222, 34, 90, { color: L, ancho: 1.7, relleno: OSC });
  c.elipse(338, 222, 24, 64, { color: G, ancho: 1 });
  c.elipse(338, 222, 7, 16, { color: N, ancho: 1.2, relleno: "#000000" });
  // La mancuerna: el mango y tres discos de cada lado.
  c.rect(150, 275, 292, 283, { color: L, ancho: 1.4, relleno: "#1C1C1E" });
  for (const x of [116, 129, 142]) c.elipse(x, 279, 10, 33, { color: L, ancho: 1.6, relleno: OSC });
  for (const x of [300, 313, 326]) c.elipse(x, 279, 10, 33, { color: L, ancho: 1.6, relleno: OSC });
  c.elipse(153, 279, 5, 11, { color: N, ancho: 1.1, relleno: OSC });
  // El toque verde: el seguro del lado derecho.
  c.elipse(289, 279, 5, 11, { color: VERDE, ancho: 2.4, relleno: OSC });
  return c.svg();
}

// ── A la medida: una pantalla con su obra colgada adentro ──
function medida() {
  const c = lienzo("m12", 27);
  c.suelo();
  c.elipse(262, 302, 56, 8, { color: L, ancho: 1.4, relleno: OSC });
  c.rect(254, 252, 270, 298, { color: L, ancho: 1.4, relleno: "#1C1C1E" });
  c.linea([[380, 86], [392, 94], [392, 246], [380, 252]], { color: L, ancho: 1.4, relleno: "#0E0E10" });
  c.rect(130, 86, 380, 252, { color: L, ancho: 1.7, relleno: OSC });
  c.rayas([[380, 86], [392, 94], [392, 246], [380, 252]], { angulo: 1.1, paso: 6 });
  c.rect(142, 98, 368, 240, { color: G, ancho: 1 });
  c.linea([[142, 114], [368, 114]], { color: G, ancho: 1 });
  // La obra: un cuadro colgado de su alambre, con la ciudad de una línea.
  c.linea([[180, 136], [212, 122], [244, 136]], { color: N, ancho: 1.1 });
  c.rect(164, 136, 260, 222, { color: N, ancho: 1.3, relleno: "#0E0E10" });
  c.linea(
    [[172, 206], [182, 206], [182, 184], [196, 184], [196, 196], [206, 196], [206, 168], [220, 168], [220, 190], [232, 190], [232, 178], [244, 178], [244, 206], [252, 206]],
    { color: L, ancho: 1.2 }
  );
  // Las filas del sistema y, en verde, su único botón.
  c.linea([[284, 146], [350, 146]], { color: G, ancho: 1.2 });
  c.linea([[284, 162], [340, 162]], { color: G, ancho: 1.2 });
  c.linea([[284, 178], [324, 178]], { color: G, ancho: 1.2 });
  c.rect(284, 200, 330, 214, { color: VERDE, ancho: 2 });
  return c.svg();
}

// ── Niveles en chico: la misma escena, sin texto adentro ──
function responde() {
  const c = lienzo("nr12", 41);
  c.suelo();
  c.rect(118, 300, 402, 310, { color: L, ancho: 1.4, relleno: "#1C1C1E" });
  c.linea([[136, 300], [384, 300], [356, 222], [164, 222]], { cerrado: true, color: L, ancho: 1.7, relleno: OSC });
  c.rayas([[136, 300], [164, 222], [184, 222], [160, 300]], { angulo: -0.6 });
  // La hoja: arriba lo que te escribieron, abajo la respuesta, en verde.
  c.rect(204, 104, 316, 204, { color: "#C9C3B5", ancho: 1.1, relleno: "#F4F2EC" });
  c.linea([[218, 122], [296, 122]], { color: "#5F6368", ancho: 1.4 });
  c.linea([[218, 134], [272, 134]], { color: "#5F6368", ancho: 1.4 });
  c.linea([[218, 160], [300, 160]], { color: "#1A7F00", ancho: 2 });
  c.linea([[218, 172], [286, 172]], { color: "#1A7F00", ancho: 2 });
  c.linea([[218, 184], [258, 184]], { color: "#1A7F00", ancho: 2 });
  c.rect(170, 200, 350, 214, { color: L, ancho: 1.4, relleno: "#1C1C1E" });
  c.elipse(162, 207, 8, 8, { color: L, ancho: 1.4, relleno: OSC });
  c.elipse(358, 207, 8, 8, { color: L, ancho: 1.4, relleno: OSC });
  c.linea([[352, 200], [382, 184]], { color: N, ancho: 1.2 });
  for (const [y, n, x0] of [[240, 8, 184], [258, 9, 174], [276, 8, 184]]) {
    for (let i = 0; i < n; i++) c.elipse(x0 + i * 20, y, 5, 5, { color: N, ancho: 1, relleno: "#000000" });
  }
  c.rect(212, 287, 308, 293, { color: N, ancho: 1, relleno: "#1C1C1E" });
  return c.svg();
}

function organiza() {
  const c = lienzo("no12", 58);
  c.suelo();
  c.rect(170, 130, 350, 312, { color: L, ancho: 1.7, relleno: OSC });
  c.rayas([[170, 130], [192, 130], [192, 312], [170, 312]], { angulo: -0.7 });
  c.linea([[156, 132], [260, 78], [364, 132]], { cerrado: true, color: L, ancho: 1.7, relleno: "#1C1C1E" });
  c.linea([[170, 192], [350, 192]], { color: L, ancho: 1.2 });
  c.linea([[170, 252], [350, 252]], { color: L, ancho: 1.2 });
  // La campana que avisa.
  c.linea([[252, 112], [254, 100], [260, 96], [266, 100], [268, 112]], { cerrado: true, color: "#C9A23F", ancho: 1.2, relleno: "#C9A23F" });
  // Cada cliente en su piso; el que acaba de llegar, en verde.
  for (const y of [162, 222, 282]) {
    for (const x of [214, 260, 306]) {
      const nuevo = y === 162 && x === 306;
      c.elipse(x, y, 10, 10, { color: nuevo ? VERDE : N, ancho: nuevo ? 2 : 1.2, relleno: nuevo ? VERDE : "#000000" });
    }
  }
  return c.svg();
}

function automatiza() {
  const c = lienzo("na12", 73);
  c.suelo();
  // La cinta, sus rodillos y sus patas.
  c.linea([[110, 298], [110, 312]], { color: N, ancho: 1.2 });
  c.linea([[410, 298], [410, 312]], { color: N, ancho: 1.2 });
  c.rect(84, 278, 436, 298, { color: L, ancho: 1.6, relleno: "#1C1C1E" });
  c.elipse(96, 288, 8, 8, { color: N, ancho: 1.1, relleno: OSC });
  c.elipse(424, 288, 8, 8, { color: N, ancho: 1.1, relleno: OSC });
  // Los cuatro pasos, cada uno en su caja.
  const cajas = [100, 188, 276, 364];
  const onda = (x, fase) => 150 + Math.sin(((x - 84) / 352) * Math.PI * 3 + fase) * 22;
  for (const x of cajas) {
    c.linea([[x + 28, onda(x + 28, 0)], [x + 28, 218]], { color: G, ancho: 1 });
    c.rect(x, 218, x + 56, 276, { color: L, ancho: 1.6, relleno: OSC });
    c.linea([[x + 12, 240], [x + 44, 240]], { color: G, ancho: 1.2 });
    c.linea([[x + 12, 254], [x + 34, 254]], { color: G, ancho: 1.2 });
  }
  // La onda que lo mueve todo, en verde, con su sombra.
  const pts = (fase) => Array.from({ length: 45 }, (_, i) => [84 + i * 8, onda(84 + i * 8, fase)]);
  c.linea(pts(0.5), { color: "#2E7A0C", ancho: 1.2, temblor: 0.2 });
  c.linea(pts(0), { color: VERDE, ancho: 1.6, temblor: 0.2 });
  return c.svg();
}

function controla() {
  const c = lienzo("nc12", 89);
  c.suelo();
  // El caballete.
  c.linea([[196, 262], [168, 312]], { color: "#9A6534", ancho: 1.8 });
  c.linea([[324, 262], [352, 312]], { color: "#9A6534", ancho: 1.8 });
  c.linea([[260, 262], [262, 306]], { color: "#9A6534", ancho: 1.6 });
  // El cuadro dorado y, adentro, el panel.
  c.rect(128, 86, 392, 268, { color: "#8A6A1E", ancho: 1.4, relleno: "#C9A23F" });
  c.linea([[128, 86], [392, 86], [380, 98], [140, 98]], { cerrado: true, color: null, relleno: "#E9CC74" });
  c.rect(142, 100, 378, 254, { color: "#2A1A0C", ancho: 1.2, relleno: "#0E0E10" });
  for (const x of [156, 232, 308]) c.rect(x, 114, x + 60, 138, { color: G, ancho: 1, relleno: OSC });
  c.linea([[156, 236], [364, 236]], { color: G, ancho: 1 });
  c.linea([[160, 226], [204, 212], [244, 218], [292, 186], [330, 192], [362, 160]], { color: VERDE, ancho: 1.8, temblor: 0.3 });
  // El lápiz recargado.
  c.linea([[400, 306], [432, 238], [440, 242], [408, 310]], { cerrado: true, color: "#2A1A0C", ancho: 1, relleno: "#9A6534" });
  return c.svg();
}

function empresa() {
  const c = lienzo("ne12", 97);
  c.suelo();
  // El escenario.
  c.linea([[80, 300], [440, 300], [440, 312], [80, 312]], { cerrado: true, color: L, ancho: 1.4, relleno: "#1C1C1E" });
  c.linea([[96, 272], [424, 272], [440, 300], [80, 300]], { cerrado: true, color: L, ancho: 1.6, relleno: OSC });
  c.rayas([[96, 272], [424, 272], [440, 300], [80, 300]], { angulo: 0, paso: 6 });
  c.linea([[100, 272], [100, 92], [150, 74], [370, 74], [420, 92], [420, 272]], { color: L, ancho: 1.7 });
  // El telón.
  c.linea([[104, 94], [152, 80], [140, 170], [124, 272], [104, 272]], { cerrado: true, color: "#5E241A", ancho: 1.2, relleno: "#7A2E20" });
  c.linea([[416, 94], [368, 80], [380, 170], [396, 272], [416, 272]], { cerrado: true, color: "#5E241A", ancho: 1.2, relleno: "#7A2E20" });
  // Las tres pantallas; la de la derecha, con su línea verde.
  for (const x of [176, 236, 296]) c.rect(x, 106, x + 50, 152, { color: N, ancho: 1.1, relleno: "#0E0E10" });
  c.linea([[302, 144], [314, 136], [324, 140], [340, 118]], { color: VERDE, ancho: 1.8, temblor: 0.2 });
  // El equipo: cuatro mesas y quien lo dirige.
  for (const x of [196, 236, 276, 316]) {
    c.linea([[x - 12, 236], [x + 12, 236]], { color: N, ancho: 1.3 });
    c.linea([[x, 236], [x, 268]], { color: N, ancho: 1.1 });
  }
  c.elipse(152, 220, 7, 7, { color: "#3B352D", ancho: 1, relleno: "#DDD3C0" });
  c.linea([[142, 268], [143, 236], [161, 236], [162, 268]], { cerrado: true, color: "#3B352D", ancho: 1, relleno: "#C9C0AE" });
  return c.svg();
}

const escribir = (ruta, svg) => {
  mkdirSync(join(OUT, ruta, ".."), { recursive: true });
  writeFileSync(join(OUT, ruta), svg);
};
escribir("giros/gimnasios.svg", gimnasios());
escribir("productos/medida.svg", medida());
escribir("niveles/chica/responde.svg", responde());
escribir("niveles/chica/organiza.svg", organiza());
escribir("niveles/chica/automatiza.svg", automatiza());
escribir("niveles/chica/controla.svg", controla());
escribir("niveles/chica/empresa.svg", empresa());
