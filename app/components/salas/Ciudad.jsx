// La Ciudad de docs/sistema/components/Ciudad: la Ciudad de México en una
// sola línea (Monumento a la Revolución, Bellas Artes, el Ángel, la Torre
// Latinoamericana, edificios del centro, Popocatépetl e Iztaccíhuatl). Sin
// la luna desde el 30 oct (Carlos). El trazo se calcula aquí, en el
// servidor, con las mismas coordenadas del preview. El movimiento vive en
// globals.css (.ciudad-trazo).
const PI = Math.PI;

function trazoCiudad() {
  const P = [];
  const L = (x, y) => P.push([x, y]);
  const arc = (cx, cy, r, a0, a1, n) => {
    for (let i = 1; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      P.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
  };
  L(0,380);L(40,380);L(40,330);L(90,330);L(90,380);L(120,380);L(120,250);L(135,250);
  arc(175,250,40,PI,PI*1.5,10);L(172,210);L(172,196);L(175,189);L(178,196);L(178,210);L(175,210);
  arc(175,250,40,PI*1.5,PI*2,10);L(230,250);L(230,380);L(205,380);L(205,305);
  arc(175,305,30,0,-PI,12);L(145,380);L(280,380);L(280,300);L(305,300);L(305,280);L(330,280);L(330,262);
  arc(360,262,30,PI,PI*1.5,8);L(357,232);L(357,216);L(360,207);L(363,216);L(363,232);L(360,232);
  arc(360,262,30,PI*1.5,PI*2,8);L(390,280);L(415,280);L(415,300);L(440,300);L(440,380);
  L(490,380);L(490,370);L(510,370);L(510,360);L(514,360);L(514,172);L(510,172);L(510,162);L(518,162);L(516,152);L(504,140);L(517,145);L(522,128);L(527,145);L(540,140);L(528,152);L(526,162);L(534,162);L(534,172);L(530,172);L(530,360);L(534,360);L(534,370);L(554,370);L(554,380);
  L(600,380);L(600,150);L(606,150);L(606,130);L(612,130);L(612,112);L(618,112);L(618,100);L(622,100);L(622,40);L(624,40);L(624,100);L(628,100);L(628,112);L(634,112);L(634,130);L(640,130);L(640,150);L(646,150);L(646,380);
  L(700,380);L(700,180);L(730,165);L(730,380);L(760,380);L(760,240);L(800,240);L(800,380);L(830,380);L(830,280);L(860,280);L(860,380);
  L(900,380);L(935,356);L(965,326);L(992,292);L(1015,258);L(1035,228);L(1050,210);L(1060,203);L(1072,209);L(1090,228);L(1112,254);L(1135,280);L(1152,296);L(1172,286);L(1190,272);L(1205,262);L(1218,268);L(1232,258);L(1248,250);L(1265,258);L(1282,262);L(1300,255);L(1318,266);L(1338,288);L(1360,316);L(1382,348);L(1400,380);L(1490,380);
  return "M" + P.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L");
}

const TRAZO = trazoCiudad();

export function Ciudad({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1490 400"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="Dibujo de la Ciudad de México de noche, trazada en una sola línea."
      className={`block w-full ${className}`.trim()}
    >
      <path className="ciudad-trazo" d={TRAZO} />
    </svg>
  );
}
