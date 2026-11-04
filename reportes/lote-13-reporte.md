# Lote 13 · Pulido final para salir a vender — reporte

Rama `lote-13-pulido` desde `main` (`242149e`). Commits: `5f402cc` accesibilidad · `813d043` metadatos ·
`90b95c9` perf de la tarjeta · docs. Plan aprobado por Carlos.

## 1 · /nosotros en producción (revisado antes de todo lo demás)
- `curl -I https://www.stringwebs.com/nosotros`: 200, `x-vercel-cache: HIT`, `age` 174 427 s (≈ 2 días, el
  despliegue del 2 nov). El HTML es el del lote 10: `<title>Nosotros · STRING`, "Un taller de software en Ciudad de
  México." dos veces, la foto (`alt="Carlos Avilés, fundador de STRING"`) y los cuatro planos.
- Cero coincidencias de "Somos STRING", `href="/servicios`, `/saas`, `/cotizacion` y `/privacy-policy`.
- Lo mismo con `?x=` (fuera de caché), con User-Agent de Googlebot, facebookexternalhit, ClaudeBot y
  python-requests, y en `stringweb.vercel.app/nosotros`.
- Redirects: `stringwebs.com` → 307 → www; `/Us`, `/us`, `/US` → 301 `/nosotros`; `/nosotros/` → 308 (barra final de
  Next); `http://` → 308 a https.
- En el repo no queda nada que pueda servir la página vieja: sin `pages/`, sin service worker, "Somos STRING" solo
  en docs. Wayback no tiene copia.
- **Conclusión:** la revisión externa leyó una copia en caché (de su herramienta o de un índice anterior al 2 nov).
  No hubo que corregir nada. Quedan imágenes del sitio anterior en `public/` que ninguna página enlaza
  (`us2.png`, `mision2.png`, `vision.png`, `hero.png`, …, `public/serv/`, `public/proyects/`): a deuda.
- La misma herramienta parece ignorar ARIA: lo que reportó de la firma, la lámina y el "01Sistemas" ya estaba
  resuelto con ARIA en producción. Se endureció igual (punto 2).

## 2 · Accesibilidad
- **Firma** (`productos/Firma.jsx`): antes, "by" como texto y el SVG con `role="img" aria-label="STRING"` (dos
  piezas: "by", "imagen, STRING"). Ahora un `sr-only` con "by STRING" y lo visible en un `span aria-hidden`.
  Visualmente idéntica: `lote-13/firma-boaz-antes-375.png` y `…-despues-375.png` (y las de /productos), misma caja
  de 335 × 17.7 px.
- **Lámina** (`productos/LaminaBoaz.jsx`): las cotas "H · 586" y "Ø 450 · 20 KG" en un `<g aria-hidden="true">`.
  Con `decorativa` el SVG sigue oculto entero; con alt solo queda su `aria-label`.
- **Números**: el menú del celular ya tenía el número en `aria-hidden`; la barra de escritorio no lleva números; el
  número de la tarjeta vive dentro de la zona de dibujo, que ya era `aria-hidden`. Sin cambio de código; queda una
  prueba que lo cuida.
- `e2e/pulido.spec.js`: la firma da `paragraph: by STRING`; el árbol de /boaz, /productos y /gym/registro no
  contiene "586", "20 KG" ni "Ø 450"; ningún enlace del menú, /tu-negocio, /sistemas ni /productos empieza con
  "0…". Las dos primeras fallan con el código de `main` y pasan con el nuevo.

## 3 · Títulos para compartir
- Antes, en producción: **todas** las rutas menos `/` daban `twitter:title` "STRING — Software hecho con oficio. Y
  con arte." y la descripción de la portada. Además /productos, /boaz, /nosotros, /diagnostico y los legales
  salían **sin `og:image` ni `twitter:image`** y sin `og:site_name`.
- Causa: Next reemplaza `openGraph` y `twitter` enteros en la página que los fija; no los fusiona con la raíz.
- Ahora `app/lib/compartir.js` arma los dos con el mismo título y descripción que ya tenía cada `openGraph` (ningún
  texto nuevo), con `siteName`, `locale`, `type` e imagen. Las rutas con su `opengraph-image.jsx` (/sistemas, los
  cinco niveles, /tu-negocio, los giros y /empresas) pasan `imagenPropia` y conservan su imagen: una imagen en la
  configuración le gana al archivo (se comprobó: sin esa opción, /sistemas perdía la suya).
- /gym/registro: el `alt` de su imagen pasa de "Boaz · El sistema para gimnasios, by STRING" al de la imagen que de
  verdad se muestra ("STRING — Software hecho con oficio. Y con arte.").
- **TODO(textos):** `/aviso-de-privacidad` y `/terminos` no tienen descripción (`docs/textos.md`: "—"), así que al
  compartirlos sale la de la portada. La prueba los exenta solo de esa comprobación.
- `e2e/pulido.spec.js` recorre las rutas del sitemap y /gym/gracias: `twitter:title` = `og:title`,
  `twitter:description` = `og:description`, distintos de la portada, `twitter:image` = `og:image`, y la imagen propia
  donde la hay.

## 4 · LCP de /tu-negocio
Build local, `next start`, Lighthouse 12.8.2 en celular (simulado), 3 pasadas.

| Ruta | Antes (main) | Después | Elemento LCP |
|---|---|---|---|
| /tu-negocio | 2.03 · 2.38 · 2.53 s | 1.96 · 2.53 · 2.53 s | el párrafo de entrada |
| /sistemas | 2.45 · 2.45 · 2.45 s | 2.45 · 2.45 · 2.45 s | el dibujo de Responde |
| /productos | 2.26 · 2.26 · 2.25 s | 2.76 · 2.75 · 2.26 s | el párrafo de entrada |

Puntajes de /tu-negocio después: rendimiento 97–99 · accesibilidad 100 · buenas prácticas 96 · SEO 100 · CLS 0.
Buenas prácticas 96: los 404 de `/_vercel/insights` y `/_vercel/speed-insights`, que solo existen en Vercel.
/productos no tocó nada que cambie su carga (no tiene dibujos en la primera pantalla); su variación es ruido de la
simulación.

- **A 390 × 844**, el primer dibujo de /tu-negocio empieza en y = 575: sí está en la primera pantalla (el párrafo
  termina en y = 447). Los otros nueve quedan abajo (987, 1408, …). En /sistemas el primero empieza en 482; en
  /productos en 947.
- **No se cumple la meta: /tu-negocio sigue en 2.53 s en dos de tres pasadas.** `fetchpriority="low"` no movió
  nada porque los dibujos ya salían con prioridad Low (Chrome se la da a las imágenes) y no frenan al párrafo: su
  LCP es Render Delay ~2.08 s con carga 0, FCP 0.75 s, y el LCP **observado** es 43 ms. El simulado cae casi encima
  del TTI (2.55 s): Lighthouse lo amarra a los 17 scripts (228 KB) de la página. El arreglo es de JS, no de
  imágenes; va a la deuda del LCP en `docs/estado.md`.

## 5 · Docs
- `docs/estado.md`: lote 12 "✅ Fusionado a `main` (PR #7, 242149e)"; fila del lote 13; "Producción sirve `main`"
  en lugar de "sigue con la marca anterior"; deuda del LCP con el diagnóstico; deuda de las imágenes viejas y de la
  descripción de los legales; decisiones del lote 13.
- `docs/calidad.md` § tarjeta con dibujo: prioridad baja y número fuera del nombre del enlace.

## 6 · Domicilio
Listo para un solo cambio: `const DOMICILIO = "[domicilio por confirmar]"` en
`app/(sitio)/aviso-de-privacidad/page.jsx` (con su `TODO(domicilio)`) y la frase de `docs/textos.md` § Aviso de
privacidad ("…con domicilio en \[domicilio por confirmar\], Ciudad de México."). No se inventó nada.

## Pruebas
- `npm test`: 37 de 37. `npm run build` limpio.
- `npm run test:e2e`: 98 de 98, con axe sin fallas WCAG A/AA en las 16 páginas de `calidad.spec.js`.
- `e2e/componentes.spec.js` volvió a reescribir las capturas de `reportes/lote-6-componentes/`: se regresaron a mano.
