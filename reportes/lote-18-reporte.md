# Lote 18 · SEO

Rama `lote-18-seo`, desde `main` 4cbc6c4. Sin fusionar hasta el visto bueno de Carlos.

Prioridad 1: que quien conoce a Carlos y busca "STRING Carlos Avilés", "stringwebs" o "Boaz gimnasios" encuentre el sitio
con datos correctos. Prioridad 2: búsquedas por giro ("sistema para barberías CDMX"). Nada inventado: ni reseñas, ni
calificaciones, ni clientes, ni domicilio. /interno sigue fuera de todo. Enlaces internos (lote 20) y rendimiento
(lote 19) van aparte.

## Bloques (un commit cada uno)

1. `feat(seo): titles y descripciones por ruta desde los datos, todos absolutos`
2. `feat(seo): JSON-LD por página: ProfessionalService, SoftwareApplication de Boaz y migas`
3. `feat(seo): sitemap con lastmod fijo, head sin duplicados, 404 con su título, favicon y og:image de Boaz`
4. `docs: lote 18 · SEO`: `docs/textos.md` § SEO · lote 18, `docs/estado.md` y este reporte.

## 1 · Títulos y descripciones

Los textos aprobados, literales, están en `docs/textos.md` § SEO · lote 18. Ninguno pasa de 60 caracteres (título) ni de
160 (descripción); los más justos son Responde y Automatiza (60) y la portada (159).

- **Dónde viven:**
  - Niveles y giros: en los datos (`tituloSeo` y `descripcionSeo` en `app/lib/niveles.js` y `app/lib/giros.js`).
  - Las demás páginas: en su metadata.
  - Los precios salen de `app/lib/precios.js`.
- **`metadatosPagina()`** (`app/lib/compartir.js`): arma `title.absolute`, la descripción, el canonical, Open Graph y
  Twitter con un solo texto, así ningún título se repite a mano.
- **Giros sin la cita:** las descripciones ya no llevan la cita del dueño entre comillas, que en Google parecía un
  testimonio.
- **`/gym/registro`:** título propio (antes repetía el de /boaz) y `index, follow`.

## 2 · Datos estructurados

- **Fuera del layout raíz:** cada página pinta el suyo (`components/JsonLd.jsx`, datos en `app/lib/jsonld.js`). Así la
  404 y /interno quedan sin JSON-LD.
- **`/` · ProfessionalService:** lleva
  - `founder` Carlos Avilés;
  - `areaServed` Ciudad de México;
  - el correo y el teléfono de WhatsApp de `contacto.js`;
  - dirección solo con ciudad y país;
  - `sameAs` solo Instagram;
  - logo en PNG (`public/logo/string-pared.png`, 852×516, desde el archivo real del sistema).
- **`/boaz` · SoftwareApplication** (BusinessApplication, Web): Starter 799 y Pro 1299 MXN al mes, con
  `valueAddedTaxIncluded: true`, salidos de `BOAZ` en precios.js. Sin `aggregateRating` ni `review`.
- **Niveles y giros · BreadcrumbList.**
- **Sin FAQPage:** Google solo la muestra a sitios de gobierno y salud.
- **Validación:**
  - Contra el vocabulario oficial de schema.org, descargado: sin errores. El validador detecta errores cuando se le pasa
    un bloque mal hecho.
  - Requisitos de Google: las migas califican para resultado enriquecido. El negocio local (pide domicilio) y la
    aplicación (pide reseñas) no califican, como se esperaba; los dos sirven para que Google entienda quién es STRING y
    qué es Boaz.
  - **Falta:** el Rich Results Test de Google, que necesita una URL pública (vista previa o producción).
- **Facebook y TikTok** salieron del `sameAs`. Solo vivían ahí, así que ya no están en el sitio. Anotado en
  `docs/estado.md`.

## 3 · Sitemap, head, 404, favicon y og:image

- **Sitemap:** `lastmod` fijo por ruta en `app/sitemap.js` (la fecha del último lote que la cambió), en vez de la fecha
  del build. Hoy las 25 rutas dan 2026-11-04 (lotes 13, 17 y 18). `/gym/registro` se queda, porque ahora es
  index, follow.
- **Head:** fuera el `viewport` duplicado, el `http-equiv`, el canonical heredado y el hreflang solitario.
- **404:** título propio, "Esta sala no existe · STRING", sin canonical ni JSON-LD, también en los `notFound()` de niveles
  y giros.
- **Favicon:** `app/favicon.ico` (16, 32 y 48 px) y `app/icon1.png` (48 px), desde `app/icon.svg`. `/favicon.ico` ya
  no da 404.
- **og:image propia de /boaz:** el logotipo de `public/marca/` y la lámina de `LaminaBoaz` sobre papel, con "El sistema
  para gimnasios".
  - Límites del generador: no lee woff2, así que el texto va en Geist; no pinta `<text>`, así que la lámina va sin cotas.
  - `LaminaBoaz.jsx` lleva un aviso de que la imagen depende de ella. El e2e de la imagen falla si el generador truena
    (comprobado rompiéndolo a propósito).
- **Imágenes generadas:** salen de `node scripts/generar-imagenes-seo.mjs`, que se corre a mano.

## Verificación

- `npm test`: 122 de 122 (14 archivos). Nuevas:
  - `app/lib/seo.test.js`: textos aprobados literales, largos, sin cita en los giros y sitemap fijo.
  - `app/lib/jsonld.test.js`: precios = precios.js; sin reseñas, calificaciones ni calle a ninguna profundidad; el layout,
    la 404 y /interno sin JSON-LD.
  - La prueba de precios del lote 17 ahora también lee `jsonld.js`.
- `npm run test:e2e`: 104 de 104. Nueva `e2e/seo.spec.js`: JSON-LD por página, 404 sin JSON-LD ni canonical y con su
  título, head sin repetidos, favicon y la imagen de /boaz.
- `npm run test:e2e:interno`: 10 de 10, con la nueva "sin datos estructurados".
- `npm run build`: limpio.
- La suite e2e reescribe las capturas de `reportes/lote-6-componentes/`; se regresaron a como estaban (deuda ya anotada).

### JS y CSS antes y después (`next start`, bytes sin comprimir / gzip)

| Ruta | JS antes | JS después | CSS antes | CSS después | HTML antes → después |
|---|---|---|---|---|---|
| `/` | 588,645 / 180,898 | igual | 46,070 / 10,187 | igual | 154,153 → 154,261 |
| `/sistemas/responde` | 583,154 / 178,836 | igual | 46,070 / 10,187 | igual | 75,019 → 74,992 |
| `/productos` | 583,154 / 178,836 | igual | 46,504 / 10,462 | igual | 121,763 → 120,412 |
| `/boaz` | 582,451 / 178,359 | igual | 49,829 / 11,109 | igual | 103,447 → 105,051 |

El JS y el CSS no cambian ni un byte. El HTML cambia un poco por el JSON-LD y la metadata.

## Lo que falta y no es código

- **Vercel → Domains:** el dominio sin www redirige a www con 307 (temporal); ponerlo en 308 o 301.
- **Search Console:** verificar por DNS (TXT), enviar el sitemap y correr el Rich Results Test.
- **Perfil de Negocio de Google** como negocio de área de servicio: lo decide Carlos.
- **Siguientes lotes:**
  - Lote 19 · rendimiento: los hallazgos del LCP simulado.
  - Lote 20 · enlaces a los giros: con copy por aprobar.

  Los dos están detallados en `docs/estado.md`.
