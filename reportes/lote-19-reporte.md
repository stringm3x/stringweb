# Lote 19 · Sala 6: dibujo nuevo

Rama `lote-19-sala6`, desde `main` dccc6e7. Sin fusionar hasta el visto bueno de Carlos.

El dibujo de la sala 6 (Cómo trabajamos, arquitectura) no se entendía: cuatro etiquetas sueltas para cinco pasos,
sin Entrega, una pared en diagonal y una viga colgando. Se reemplaza por el camino "A · La obra, de izquierda a
derecha", que Carlos eligió en el lienzo: un solo edificio que se completa en cinco tramos iguales, uno por paso y en
el orden del texto. Los textos de la sala no cambian.

## Bloques (un commit cada uno)

1. `feat(sala6): generador y dibujo de la obra de izquierda a derecha`
2. `feat(sala6): la sala con el dibujo nuevo y etiquetas en HTML`
3. `docs: lote 19` (este reporte, `docs/estado.md` y `docs/movimiento-salas.md` § Sala 6)

## 1 · El dibujo

- **Generador:** `scripts/dibujos/sala6.mjs`, con el mismo trazo a mano que `giros.mjs` (temblor, rayado recortado) y
  una semilla fija. Escribe `public/arte/sala6-obra.svg`, que después pasa por svgo (`scripts/dibujos/svgo.config.mjs`).
  Pesa 38.2 KB: 57.2 KB sin optimizar, menos 34 %.
  ```
  node scripts/dibujos/sala6.mjs public/arte
  npx svgo@4 --config scripts/dibujos/svgo.config.mjs -i public/arte/sala6-obra.svg
  ```
- **Composición:** es la del lienzo, en 640×640.
  - Suelo en y=440 y cimiento continuo de 72 a 568.
  - Tramos de 100 px entre x=70 y 570.
  - Techo en 250 del tramo 2 al 5; losa en 238.
  - Mástil en x=556, de 238 a 186, con la bandera hasta x=590.
  - El SVG se recorta a lo dibujado (`viewBox="24 172 592 320"`), porque las etiquetas pasaron al HTML. Así, a 390 px
    el dibujo mide unos 195 px de alto y no 360.
- **Los cinco tramos:**
  1. Cimientos: el concreto rayado bajo el suelo, dos estacas y la cinta de obra.
  2. Plano: el contorno, las ventanas y la puerta en punteado, con una cota arriba.
  3. Estructura: columnas y vigas de madera, con una diagonal de refuerzo.
  4. Muros: los muros, las ventanas de vidrio y el andamio delante.
  5. Luz: la losa de terracota, las ventanas encendidas, la puerta de madera y la bandera.
- **Colores:** salen de la paleta del arte del 29 oct (`docs/diseno.md`), por decisión de Carlos; los del lienzo eran una
  aproximación.
  - Madera `#9A6534` (sombra `#5E3A1A`).
  - Amarillo de obra `#E0A526`.
  - Vidrio `#CFDCE0`.
  - Muros `#ECE5D6` (mármol luz).
  - Cimiento y andamio `#A99F8C` (mármol sombra).
  - Terracota `#B5523B`.
  - Bandera `#50FF05`, el único verde.
  - Lo que la tabla no trae (la tierra, las rayas del cimiento y los separadores) va en los neutros de `giros.mjs`:
    `#3A3A3E` y `#5A5A5E`.
- **Ajuste aprobado:** el vidrio `#CFDCE0` contra el muro `#ECE5D6` casi no se distinguía. En el tramo 4, los marcos van
  en mármol sombra y cada vidrio lleva una raya de reflejo a mano. El plano punteado se queda en vidrio: sobre noche se
  lee casi blanco, como gis, más que azul.

## 2 · La sala

- **El dibujo está quieto.** `<Capas>` y sus 8 capas dan paso a un `<img>` con alto reservado (CLS 0). Se van del
  CSS el revelado con clip-path, `@keyframes sube`, las líneas de tiempo y el respaldo: −122 líneas en
  `app/salas.css`, que pasa de 17,315 a 14,237 B.
- **La raya verde del paso** en la lista se queda igual, y sigue sin aparecer con menos movimiento. El dibujo sigue
  pegado bajo la barra, como antes. `docs/movimiento-salas.md` § Sala 6 ya lo dice: dibujo quieto desde este lote y, si
  se anima, en el lote de animar salas.
- **Etiquetas en HTML**, en una fila alineada con los tramos. Los tramos ocupan del 7.8 % al 92.2 % del ancho del
  dibujo, así que la fila es un grid de 5 columnas con `px-[7.8%]`.
  - **1280 px o más:** número (Geist Mono verde), nombre (Geist 600 claro) y subtítulo (Geist Mono neblina, en
    mayúsculas).
  - **De 1024 a 1279 px:** solo el número y, debajo del dibujo, la lista "1 Diagnóstico · Cimientos…". A 1024 px la
    columna mide unos 400 px y los nombres se enciman ("Propuesta" con "Construcción", "Plano" con "Estructura").
    Corte aprobado por Carlos.
  - **Celular:** el número bajo cada tramo y la lista debajo, fuera de lo pegado.
  - Nada mide menos de 12 px. El contraste sobre noche pasa de 4.5:1: verde, Línea, y neblina con unos 7:1.
- **Lector de pantalla:** el dibujo es `role="img"`, con un `aria-label` que describe los cinco tramos. Las etiquetas son
  `aria-hidden`, porque los nombres de los pasos ya se leen en la lista de al lado y así cada paso no se oye tres
  veces.
- **Se borran:** `public/arte/sala6/` (8 capas), `public/arte/sala6-arquitectura.svg` y la entrada `sala6` de
  `scripts/capas-arte.mjs`. `Capas.jsx` se queda, porque lo usan las salas 2, 5 y 7.
- **e2e:**
  - Nuevo, `e2e/sala6.spec.js`: el nombre del dibujo, lo que se ve a 375, 1024 y 1280 px, que cada etiqueta quede a
    menos de 2 px del centro de su tramo, que a 1280 px no se enciman y que nada mide menos de 12 px.
  - En `movimiento.spec.js` sale la revisión del clip-path, y la prueba de la raya ahora busca los pasos por
    `[data-centinela]`.

## "AJAMOS" en la barra

Es intencional, porque la barra va al 88 %. Al bajar, la barra pone fondo noche al 88 %, como pide `docs/calidad.md`
§ Barra. Cualquier texto que pase por debajo se ve tenue, y en la sala 6 se nota más porque la etiqueta "CÓMO TRABAJAMOS"
está alineada con el logo: las letras del logo tapan el principio y asoma "AJAMOS". No es un error de capas ni de
posición. Si se quiere ocultar, va en un lote propio de la barra.

## Verificación

- `npm test`: 120 de 120.
- `npm run test:e2e`: 108 de 108, contando las 4 nuevas de la sala 6.
- `npm run test:e2e:interno`: 10 de 10, contra el build de producción.
- `npm run build`: limpio, sin avisos.
- Capturas de la sala 6 a 390 px (al entrar y en el paso 3, con el dibujo pegado) y a 1280 px, revisadas por Carlos
  antes del commit del bloque 2.
- Sitemap: el `lastmod` de `/` ya es 2026-11-04, la fecha de este lote, así que no cambia.
- Lighthouse no se corrió en este lote. El rendimiento va en el lote 20.

### JS y CSS de `/` antes y después (`next start`, bytes sin comprimir / gzip)

| Ruta | JS antes | JS después | CSS antes | CSS después | HTML antes → después |
|---|---|---|---|---|---|
| `/` | 588,645 / 181,540 | igual | 46,070 / 10,252 | 44,223 / 9,988 | 154,260 → 163,908 |

- **JS:** no cambia ni un byte.
- **CSS:** baja 1,847 B (264 gzip), por el CSS del dibujo viejo.
- **HTML:** sube 9.6 KB. Lo nuevo son la descripción del dibujo, la fila de etiquetas y la lista, que va en dos lugares
  según el ancho; Next repite todo eso en el payload de React.
- **Dibujo:** antes eran 8 archivos con 56.9 KB en total; ahora es uno de 39.1 KB, con carga diferida.

## Pendientes

- **Siguientes lotes** (detalle en `docs/estado.md`):
  - Lote 20 · rendimiento.
  - Lote 21 · enlaces a los giros.
