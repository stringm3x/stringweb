# Lote 11 · Tu negocio y el fondo claro solo para Boaz (2 nov)

Rama `lote-11-tu-negocio`. Commits: `258a3a6` textos · `1e483a8` sala 6 y método en noche · `b4c555b` dibujos ·
`9926437` páginas, barra, pie, sitemap y formulario · `7fd1355` pruebas · el commit de este reporte: docs y capturas.

## Qué se hizo
- /tu-negocio con dos grupos (con local, con Gimnasios → /boaz; empresas con cuerda de 3 px), /tu-negocio/empresas y
  nueve giros: plantilla con local (escalera de cinco niveles con su cuerda, que engorda) y plantilla grande (cuatro
  puntos, el 04 en verde; Controla y Empresa; cómo trabajamos con empresas). Datos en `app/lib/giros.js`.
- Nueve dibujos en línea, en noche, con un solo toque verde (`public/arte/giros/`); escuelas y el arbusto, afinados.
- "Tu negocio" en la barra, el menú y el pie (con Sistemas, Productos y Nosotros); las once páginas en el sitemap.
- Formulario: "Tienda en línea" y "Empresa mediana o grande" antes de "Otro", con su marca en el correo.
- El fondo claro es de Boaz: la sala 6 y el método de /nosotros pasan a noche con su arte recoloreado.

## Contraste en el arte de la sala 6 (tierra nueva `#2A2620`)
- "1 · Diagnóstico" 13.78:1 · "LOS CIMIENTOS" 5.37:1 (fondo de tierra detrás del rótulo; sobre el rayado era 2.82:1).
- "2 · Boceto" a "4 · Construcción" 19.24:1 y "5 · Entrega" 15.65:1, sobre noche.

## Métricas (build local, Lighthouse 12.8.2 en celular, 3 pasadas)
- /tu-negocio: rendimiento 98 · accesibilidad 100 · buenas prácticas 96 · SEO 100 · CLS 0 · LCP 2.30–2.31 s.
- /tu-negocio/barberias: 98 · 100 · 96 · 100 · CLS 0 · LCP 2.38–2.46 s.
- Buenas prácticas 96: los 404 de `/_vercel/insights` y `/_vercel/speed-insights`, que solo existen en Vercel.
- axe sin fallas en las cuatro páginas nuevas y en el resto; con menos movimiento, nada corre; teclado y foco visibles.
- Build limpio (37 páginas), `npm test` 35/35, e2e 78/78.

## Decisiones (aprobadas por Carlos)
- Dibujos de los giros con `alt=""`; "← TU NEGOCIO" también en /empresas; título de /empresas derivado.
- Los giros grandes terminan con su botón, sin el Cierre de siempre; los pasos con punto, como el método.
- Calibres de las cuerdas en `niveles.js`; `Tarjeta` con la prop `cuerda`.

## Pendiente
- `e2e/componentes.spec.js` reescribe las capturas del lote 6 al correr; se regresaron a su estado (deuda menor).

## Capturas (`reportes/lote-11/`)
- /tu-negocio, barberías, distribuidoras y /empresas a 1440 y 390; `giros-hoja.jpg` con los otros siete.
- `dibujos-hoja.jpg` y `dibujos-ajustes.jpg`; sala 6 y método a 1440 y 390; `diagnostico-giro-390.jpg`.
