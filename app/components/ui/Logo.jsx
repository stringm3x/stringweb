import Link from "next/link";

// El logo de docs/sistema/components/Logo/logo-inline.svg: STRING en Anton
// convertida a trazo, con la I como cursor de terminal. Las letras toman
// currentColor y el bloque, el acento del tema; el parpadeo vive en
// globals.css (.logo-string). Se dimensiona con font-size: mide lo mismo
// que Anton escrita a ese tamaño (mínimo 24 px).
export function LogoSvg({ className = "" }) {
  return (
    <svg
      className={`logo-string ${className}`.trim()}
      viewBox="-20 -1990 5744 2270"
      role="img"
      aria-label="STRING"
    >
      <g fill="currentColor">
        <path transform="translate(0 0)" d="M496 16Q255 16 148.5 -104.0Q42 -224 42 -486V-658H390V-438Q390 -377 408.5 -342.5Q427 -308 473 -308Q521 -308 539.5 -336.0Q558 -364 558 -428Q558 -509 542.0 -563.5Q526 -618 486.5 -667.5Q447 -717 377 -783L219 -933Q42 -1100 42 -1315Q42 -1540 146.5 -1658.0Q251 -1776 449 -1776Q691 -1776 792.5 -1647.0Q894 -1518 894 -1255H536V-1376Q536 -1412 515.5 -1432.0Q495 -1452 460 -1452Q418 -1452 398.5 -1428.5Q379 -1405 379 -1368Q379 -1331 399.0 -1288.0Q419 -1245 478 -1189L681 -994Q742 -936 793.0 -871.5Q844 -807 875.0 -721.5Q906 -636 906 -513Q906 -265 814.5 -124.5Q723 16 496 16Z" />
        <path transform="translate(945 0)" d="M229 0V-1422H20V-1760H790V-1422H581V0Z" />
        <path transform="translate(1755 0)" d="M78 0V-1760H618Q753 -1760 822.0 -1698.5Q891 -1637 914.5 -1526.5Q938 -1416 938 -1267Q938 -1123 901.5 -1037.0Q865 -951 764 -918Q847 -901 880.5 -835.5Q914 -770 914 -666V0H567V-689Q567 -766 535.5 -784.5Q504 -803 434 -803V0ZM436 -1108H521Q594 -1108 594 -1267Q594 -1370 578.0 -1402.0Q562 -1434 518 -1434H436Z" />
        <path className="i-anton" transform="translate(2979.0 0)" d="M62 0V-1760H402V0Z" />
        <path transform="translate(3691 0)" d="M78 0V-1760H440L602 -917V-1760H942V0H598L422 -880V0Z" />
        <path transform="translate(4711 0)" d="M441 16Q64 16 64 -524V-1283Q64 -1776 496 -1776Q674 -1776 769.0 -1704.5Q864 -1633 900.0 -1496.0Q936 -1359 936 -1162H592V-1318Q592 -1375 576.5 -1413.5Q561 -1452 512 -1452Q451 -1452 431.5 -1411.0Q412 -1370 412 -1321V-468Q412 -397 430.5 -352.5Q449 -308 503 -308Q559 -308 577.5 -352.5Q596 -397 596 -470V-721H502V-1025H932V0H791L731 -148Q639 16 441 16Z" />
      </g>
      <path
        className="bloque"
        fillRule="evenodd"
        d="M2801 -1960H3621V260H2801Z M2996 -1760H3426V-1610H3286V-150H3426V0H2996V-150H3136V-1610H2996Z"
      />
    </svg>
  );
}

// Logo como enlace al inicio. El tamaño se pasa con una clase text-[…].
export function Logo({ className = "text-[28px]", onClick }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="STRING, inicio"
      className={`inline-flex items-center leading-none text-texto ${className}`.trim()}
    >
      <LogoSvg />
    </Link>
  );
}
