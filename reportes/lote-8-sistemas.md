# Lote 8 · Sistemas — reporte

Rama `lote-8-sistemas`, 8 commits más este reporte; fusionada a `main` el 30 oct. `npm run build` limpio, `npm test` 27/27, `npm run test:e2e` 56/56.
Capturas de las seis páginas a 375 y 1440 px (y /sistemas a 768) en `reportes/lote-8-sistemas/`.
**Hecho.** `docs/pagina-nivel.md` y los cinco dibujos en el repo; textos.md con Sistemas, Lo que cambia por nivel y Ejemplos y textos
alternativos de los niveles, palabra por palabra. `/sistemas` y `/sistemas/responde`, `/organiza`, `/automatiza`, `/controla`,
`/empresa` salen de un solo componente (`PaginaNivel`) alimentado por `app/lib/niveles.js`, que también usa la sala 4. Ficha de la
obra pegada bajo la barra en escritorio y después del dibujo en celular; la fila de las siete artes apaga en gris las que el nivel no
suma, sin arte nuevo. Barra: Sistemas · Productos · Nosotros (sin Galería; Tu negocio espera su página). La sala 4 enlaza a cada
nivel. Título, descripción, canonical e imagen para compartir en las seis; sitemap; `/servicios` y `/Services` → 301 a `/sistemas`.
Titular de la sala 3: "Probado en un negocio real." La portada, sin la luna verde (Carlos).

**Antes de publicar (docs/calidad.md § 4)**
- [x] Capturas a 375 y 1440 px de las seis páginas; puntos de control de Responde y /sistemas con visto bueno de Carlos.
- [x] Ninguna duración ni curva suelta (`app/tokens.test.js`). Solo el fundido del dibujo en `--dur-lento`.
- [x] Menos movimiento: nada se mueve en /sistemas, Responde y Empresa (`e2e/calidad.spec.js`).
- [x] Teclado y foco: las tarjetas y la ficha son enlaces y botones del sistema; axe sin fallas en las 10 páginas revisadas.
- [x] 320 px (400 %): ninguna de las seis se desborda.
- [x] Textos: `app/lib/niveles.test.js` busca cada cadena de los niveles en textos.md; `e2e/sistemas.spec.js`, los de /sistemas.
- [x] Lighthouse 12, celular, `next start`, mediana de 3: `/sistemas` 98 / 100 / 96 / 100, LCP 2.38 s, CLS 0; Responde 98 / 100 / 96 /
  100, LCP 2.46 s, CLS 0. `/` sin cambio: 96, LCP 2.76 s (sobre 2.5 s desde antes del lote; pendiente de PageSpeed en producción).

**Decisiones de Carlos (30 oct)**
- Galería sale de la barra; `/servicios` y `/Services` van a `/sistemas`; CLAUDE.md al día (rutas, barra, redirects, mapa).
- "Qué incluye": las frases de la tabla de textos.md, un punto por frase (no la de la sala 4, que no dice "tienda en línea").
- "Cuando crezcas": la tarjeta al siguiente nivel ("Empresa + Música, escultura y cine" en Controla); en Empresa, "Ver los
  cinco niveles" → /sistemas. Título y descripción derivados (nombre · STRING y su "Para quién es").
- "Cómo se ve": ejemplos y alt de cada dibujo dictados por Carlos. Cuerdas en `hairline` (sin token `#3A3A3D`).
- /sistemas: Empresa cierra la cuadrícula (dos columnas en escritorio, todo el ancho en tableta).

**Avisos**
- Etiqueta "NIVEL 1 · RESPONDE" como en textos.md (pagina-nivel.md agregaba "SALA DE LA…"; el arte va en la ficha).
- El dibujo aparece con un fundido al cargar, no al entrar en pantalla: casi siempre está a la vista desde el inicio y con un
  observador parpadearía al hidratar.
- `responde.svg` corregido: estaba en `~/Downloads`, no en el repo; se copió antes del commit 0.
- La imagen para compartir vive en `app/lib/imagenCompartir.jsx`; la de la portada no cambió.
- Portada sin la luna (Carlos, 30 oct): fuera su trazo, CSS, animación y tokens; alt y CLAUDE.md al día; `/` sigue en 96, LCP 2.76 s.
  **Pendiente de Carlos:** si la luna sale también del cuadro de STRING en la galería (sala 5).
