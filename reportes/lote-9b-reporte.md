# Lote 9b · /boaz y /gym con la identidad de Boaz (2 nov)

Rama `lote-9b-boaz`. Commits: `701683e` /boaz (tema boaz, letras, botón) · `e786fc1` /gym/registro y
/gym/gracias · `5fb12c3` Conoce Boaz → /boaz, /saas y /gym/empezar → 301 a /boaz, sitemap · `316eb59` borrado
del legado sin uso · el commit de este reporte: docs y estado.

## Qué se hizo
- /boaz (camino A), con los textos aprobados el 2 nov: encabezado con logotipo y lámina quieta, lo que hace hoy,
  sellos, cómo nació, planes en tabla (`#planes`, sin Escala), preguntas y cierre. Barra y pie del sitio.
- Tema `data-theme="boaz"`: papel, tinta, `#1F5FD6` en botones y enlaces (5.1:1), `#2979FF` solo como mancha.
  Archivo 900 al 62 % (archivo local del 9a, con precarga solo aquí), Geist, Ubuntu Mono sin precarga.
- Botón de Boaz sin cursor, con sus 8 estados; hover en `--boaz-dur-color` (120 ms; 0 con menos movimiento).
- /gym/registro: mismos campos y mismo envío; Escala fuera; error en línea; "Ver planes" → /boaz#planes.
  /gym/gracias: texto nuevo, WhatsApp "me registré en Boaz", "Volver a Boaz" → /boaz; pestaña "¡Listo!".
- /productos deja solo "Conoce Boaz →"; sala 4 y Preguntas → /boaz. Productos marcado en /boaz y /gym.
- Docs: textos.md ("Boaz · lote 9b"), CLAUDE.md y diseno.md (excepción de Ubuntu Mono), estado.md.

## Revisado en el plan
- La prueba no se activa sola: el registro crea una solicitud; Carlos la activa desde el admin (14 días, Pro).
- Los datos siguen al elegir plan: es el mismo gimnasio; al vencer, Carlos lo reactiva con el plan pagado.

## Métricas (build local, Lighthouse 12 en celular, 3 pasadas)
- /boaz: rendimiento 95–98 · accesibilidad 100 · buenas prácticas 96 · SEO 100 · CLS 0 · LCP 2.41–2.84 s ✗.
- axe sin fallas en /boaz y /gym/registro; con menos movimiento nada se mueve; teclado completo en /boaz,
  registro y gracias, a 390 y 1440, con foco visible. Build limpio, `npm test` 27/27, e2e 60/60. Capturas en `reportes/lote-9b/`.

## Hallazgos
- LCP: el mismo de todo el sitio (párrafo de entrada o titular, retraso de pintado). Va con PageSpeed en producción.
- Sin precarga de Archivo, /boaz daba CLS 0.056; con precarga, 0.

## Lo que no pude comprobar
- PageSpeed en el preview: la protección de Vercel lo manda al inicio de sesión y la API agotó su cuota diaria.
- Un registro real de punta a punta (Turnstile real y la solicitud en app.gym); lo probé con Turnstile simulado.

## Pendiente
- Colores, animaciones y tokens "legado" de Tailwind y su exención en `tokens.test.js`, con `TarjetaSistema.jsx`
  e `ilustraciones/Mancuerna.jsx` (sin uso desde antes del 9b): otro lote.
