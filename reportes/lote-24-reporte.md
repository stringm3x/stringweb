# Lote 24 · Términos y Aviso de privacidad de Boaz

12 nov 2026 · rama `lote-24-legales-boaz` desde `origin/main` (bc463e0) · PR a `main` sin fusionar.

## Qué se hizo
- **/boaz/terminos** y **/boaz/aviso-de-privacidad**: el texto aprobado por Carlos, tal cual, en
  `app/lib/legal-boaz/boaz-terminos-aviso-2026-11-12.md`. El único cambio es «Versión `2026-11-12`» (decisión de
  Carlos: `2026-11` ya era la versión del aviso anterior en Boaz). Las páginas leen el archivo al compilar (son
  estáticas) y lo pintan con `ui/DocumentoLegal.jsx`, con el estilo de `PaginaLegal`: noche, 680 px, mismo título;
  los apartados van como h2, más tablas y listas. Los precios de las tablas van en Geist Mono. Los
  «stringwebs.com/boaz…» del texto enlazan sin cambiar sus palabras. Las dos rutas van al sitemap (`LOTE_24`).
- **/terminos**: «Productos.» pasa a «Boaz tiene sus propios términos: Términos de Boaz.», con enlace; la fecha
  pasa al 12 nov. /aviso-de-privacidad no cambia.
- **/gym/registro**: la casilla enlaza a /boaz/aviso-de-privacidad. La versión no la manda el formulario: la guarda
  el SaaS desde `lib/legal.ts`, que sube a `2026-11-12` en su propio PR, después de este.

## Pruebas
- `npm test`: 207 en verde. `app/lib/legal-boaz/documento.test.js` compara, palabra por palabra y en orden, el HTML
  de cada página con su sección del texto. Para ver que sí falla, alteré una palabra del componente en una copia
  (2 en rojo) y lo restauré.
- `npm run build` limpio; las dos páginas, estáticas (○).
- e2e `calidad` (axe y menos movimiento, ahora con las dos páginas) y `registro-aviso`: 44 de 45. Falla «con el
  aviso marcado se envía…», que **también falla sin este lote** (Turnstile falso); queda anotada en la deuda de `docs/estado.md`.
- Sin desbordes horizontales a 375 px ni a 1440 px.

## Por aprobar
- La descripción de /boaz/aviso-de-privacidad: su primera frase, recortada a 160 caracteres (docs/textos.md).
