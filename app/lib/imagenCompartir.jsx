import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

// Imagen para compartir de cada página (docs/textos.md § Textos que
// faltaban): el logo sobre noche y debajo el titular de la página. La usan la
// portada, /sistemas y cada nivel.
export const TAMANO = { width: 1200, height: 630 };

// El logo como en public/logo/string-noche.svg: bloque encendido y sin la I
// de Anton debajo, así la I queda en negativo.
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -1990 5744 2270"><g fill="#F5F5F3"><path transform="translate(0 0)" d="M496 16Q255 16 148.5 -104.0Q42 -224 42 -486V-658H390V-438Q390 -377 408.5 -342.5Q427 -308 473 -308Q521 -308 539.5 -336.0Q558 -364 558 -428Q558 -509 542.0 -563.5Q526 -618 486.5 -667.5Q447 -717 377 -783L219 -933Q42 -1100 42 -1315Q42 -1540 146.5 -1658.0Q251 -1776 449 -1776Q691 -1776 792.5 -1647.0Q894 -1518 894 -1255H536V-1376Q536 -1412 515.5 -1432.0Q495 -1452 460 -1452Q418 -1452 398.5 -1428.5Q379 -1405 379 -1368Q379 -1331 399.0 -1288.0Q419 -1245 478 -1189L681 -994Q742 -936 793.0 -871.5Q844 -807 875.0 -721.5Q906 -636 906 -513Q906 -265 814.5 -124.5Q723 16 496 16Z"/><path transform="translate(945 0)" d="M229 0V-1422H20V-1760H790V-1422H581V0Z"/><path transform="translate(1755 0)" d="M78 0V-1760H618Q753 -1760 822.0 -1698.5Q891 -1637 914.5 -1526.5Q938 -1416 938 -1267Q938 -1123 901.5 -1037.0Q865 -951 764 -918Q847 -901 880.5 -835.5Q914 -770 914 -666V0H567V-689Q567 -766 535.5 -784.5Q504 -803 434 -803V0ZM436 -1108H521Q594 -1108 594 -1267Q594 -1370 578.0 -1402.0Q562 -1434 518 -1434H436Z"/><path transform="translate(3691 0)" d="M78 0V-1760H440L602 -917V-1760H942V0H598L422 -880V0Z"/><path transform="translate(4711 0)" d="M441 16Q64 16 64 -524V-1283Q64 -1776 496 -1776Q674 -1776 769.0 -1704.5Q864 -1633 900.0 -1496.0Q936 -1359 936 -1162H592V-1318Q592 -1375 576.5 -1413.5Q561 -1452 512 -1452Q451 -1452 431.5 -1411.0Q412 -1370 412 -1321V-468Q412 -397 430.5 -352.5Q449 -308 503 -308Q559 -308 577.5 -352.5Q596 -397 596 -470V-721H502V-1025H932V0H791L731 -148Q639 16 441 16Z"/></g><path fill="#50FF05" fill-rule="evenodd" d="M2801 -1960H3621V260H2801Z M2996 -1760H3426V-1610H3286V-150H3426V0H2996V-150H3136V-1610H2996Z"/></svg>`;

export async function imagenCompartir(titular) {
  const geist = fs.readFileSync(path.join(process.cwd(), "app/fonts/Geist-SemiBold.woff"));
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          padding: "80px",
          gap: "56px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={520} height={206} alt="STRING" />
        <div
          style={{
            fontFamily: "Geist",
            fontWeight: 600,
            color: "#F5F5F3",
            fontSize: 60,
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            textAlign: "center",
          }}
        >
          {titular}
        </div>
      </div>
    ),
    {
      ...TAMANO,
      fonts: [{ name: "Geist", data: geist, style: "normal", weight: 600 }],
    }
  );
}
