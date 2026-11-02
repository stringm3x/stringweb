# Estado · stringwebs.com

Última actualización: 2 nov 2026 (lote 9b). Meta del KB: sitio rehecho del 1 al 7 nov; salir a
vender el 8 nov.

## Lotes

| Lote | Qué | Rama | Estado |
|---|---|---|---|
| 0 | Lectura y plan, docs en el repo, CLAUDE.md | `lote-0-lectura` | ✅ Hecho, sin fusionar |
| 1 | Base: tokens, fuentes, logo SVG, contacto, metadata, barra, pie, legales, redirects, sitemap | `lote-1-base` | ✅ Hecho, sin fusionar |
| 2 | Salas 1–4: inicio, problema, caso real, niveles | `lote-2-salas-1-4` | ✅ Hecho, sin fusionar |
| 3 | Salas 5–7 + /nosotros + preguntas + cierre | `lote-3-salas-5-7` | ✅ Hecho, sin fusionar |
| 4 | Formulario /diagnostico, /saas, contacto, galería en celular, cierre de /nosotros | `lote-4-contacto` | ✅ Hecho, sin fusionar; falta el correo de prueba desde la vista previa |
| 5 | Calidad: Lighthouse, LCP, CLS, contraste, teclado | `lote-5-calidad` | ✅ Hecho, sin fusionar; LCP por confirmar en producción |
| 6 | Componentes de calidad: tokens de movimiento, botón con 8 estados, campos, píldoras, tarjeta, barra, menú, transiciones | `lote-6-componentes` | ✅ Fusionado a `main` (29 oct, visto bueno de Carlos) |
| 7 | Salas en movimiento (docs/movimiento-salas.md): salas 2–7 con su movimiento, arte en capas, sala 1 con tokens | `lote-7-movimiento` | ✅ Fusionado a `main` (29 oct, visto bueno de Carlos) |
| 8 | Sistemas (docs/pagina-nivel.md): /sistemas y las cinco páginas de nivel, barra, enlaces de la sala 4, metadatos, redirects | `lote-8-sistemas` | ✅ Fusionado a `main` (30 oct, visto bueno de Carlos) |
| 9a | /productos (Boaz y a la medida), Boaz por su nombre en todo el sitio, galería con el cuadro de Boaz y sin luna, /saas → /productos#boaz | `lote-9a-productos` | ✅ Fusionado a `main` (30 oct, visto bueno de Carlos) |
| 9b | /boaz con la identidad de Boaz, /gym/registro y /gym/gracias rehechos, Conoce Boaz → /boaz, /saas y /gym/empezar → /boaz, limpieza del legado | `lote-9b-boaz` | ✅ Hecho; PR abierto, sin fusionar |

Producción sigue con la marca anterior. Nada se fusiona a `main` sin el visto bueno de Carlos.

## Arreglos del KB Parte 7

| Arreglo | Dónde está hoy | Lote |
|---|---|---|
| Logo leído "SSTRING" | ✅ `Logo.jsx` con el SVG del sistema | 1 |
| Meta description con "e-commerce" | ✅ metadata de textos.md; `/proyectos` retirada | 1 |
| Legales en inglés | ✅ `/aviso-de-privacidad` y `/terminos`; 301 desde las rutas en inglés | 1 |
| Titular repetido | ✅ un solo `<h1>` tecleado en `salas/TitularTecleado.jsx` | 2 |
| /saas dice "STRING GYM" | ✅ "el sistema para gimnasios" en /saas, `Caso.jsx` y `app/gym/*` (4); desde el 9a, Boaz por su nombre y /saas → /productos#boaz | 4, 9a |

## Deuda técnica (no se corrige en el rehecho)

- Nombres de color y tipos de la marca anterior en `tailwind.config.js` (marcados "legado"), sus animaciones
  (`tic`, `cinta`, `girar`, `imprimir`) y los tokens `--legado-*` de `globals.css`. Desde el lote 9b solo los usan
  `ui/TarjetaSistema.jsx` e `ilustraciones/Mancuerna.jsx`, que nadie importa (ya estaban sin uso antes del 9b).
  Se borran en otro lote, junto con esos dos archivos y la exención en `app/tokens.test.js`.
- `npm run lint` roto: el parser de `eslint-config-next` exige `typescript`.
- `app/tokens.test.js` todavía exenta `app/gym/` y los archivos legado borrados en el 9b: la exención sale en
  el mismo lote que los colores legado.
- La vibración al tocar una cuerda (sala 4) redibuja la ruta con JS en cada fotograma (`Cuerdas.jsx`), no con `transform`.
- Las capas de `public/arte/sala{2,5,6,7}/` salen de los SVG originales con `node scripts/capas-arte.mjs`; si cambia un dibujo,
  se vuelve a correr (`app/arte-capas.test.js` avisa si no coinciden).
- Las transiciones entre páginas dependen del flag experimental `experimental.viewTransition` de Next 16.1
  (`next.config.mjs`). Sin él, la navegación debe seguir funcionando, solo sin fundido: comprobado el 29 oct con
  el flag apagado (build limpio; barra, logo y botón navegan sin errores). Revisar al subir de versión de Next.

## Pendientes de Carlos

- **Domicilio** del responsable para el aviso de privacidad (lo pide la ley) y fecha de publicación.
- **`TURNSTILE_SECRET_KEY`** y las SMTP en Vercel (Preview y Production): sin el secreto,
  `/api/diagnostico` rechaza todo fuera de desarrollo. Permitir el dominio de la vista previa en
  Turnstile, mandar una solicitud de prueba y confirmar que llegó. `NOTIFICATION_EMAIL` ya no se usa.
- Del KB, abiertos: precio del boceto, si el sonido se queda, recontar cifras de Evolution GYM.

## Pendientes para después del lanzamiento

- PageSpeed Insights en producción: confirmar LCP < 2.5 s y rendimiento ≥ 90 en `/` (en la vista previa el
  Chrome de Lighthouse alterna entre 1.6–2.1 s y 2.6–3.6 s con el mismo código; ver reporte del lote 5).
- LCP de todo el sitio (lote 9a, Lighthouse local en celular): el elemento es el párrafo de entrada y casi todo es
  retraso de pintado. Portada 2.76 s, /sistemas 2.4 s, /productos 2.76 s. Se mide con PageSpeed en producción (Fase 0).
- LCP de /boaz (lote 9b, Lighthouse local): 2.41–2.84 s, el mismo hallazgo de todo el sitio.
- PageSpeed de /boaz: no se pudo en el preview (protección de Vercel y cuota diaria de la API); medir en producción.
- El dibujo de Boaz (`LaminaBoaz.jsx` y el cuadro de la galería) es copia de `string-gym-saas`, provisional allá: cuando
  llegue el del ilustrador, se copia a mano aquí.
- Dos `<meta name="viewport">` en el `<head>`.

## Decisiones tomadas en el lote 9b

- /boaz con la identidad de Boaz (G, camino A) dentro del sitio: tema `data-theme="boaz"`, papel, tinta, `#1F5FD6` en
  botones y enlaces, `#2979FF` solo como mancha. Barra y pie del sitio sin cambio; franja noche bajo la barra.
- Dentro de la identidad de Boaz, las cifras y etiquetas van en Ubuntu Mono (excepción en CLAUDE.md y diseno.md).
- Botón propio de Boaz, sin cursor; hover en `--boaz-dur-color` (120 ms, G; 0 con menos movimiento).
- Archivo con precarga solo en /boaz y /gym (sin ella, CLS 0.056); /productos sigue sin precarga.
- /gym/registro: mismos campos y envío, Escala fuera, selector de plan en Pro, error en línea. Gracias: "¡Listo!".
- /productos deja solo "Conoce Boaz →" (sale "Registra tu gimnasio"). /saas y /gym/empezar → 301 a /boaz.
- Borrados: Caso, ui/Cierre, CintasCierre, MarcasRegistro, PintarAlScroll, TitularBrochada, FormField, FormSelect,
  Etiqueta, motionPrefs y la variante `sobreAcido`.

## Decisiones tomadas en el lote 9a

- Boaz sale con su nombre desde el lote 9, con la firma "by STRING" (Carlos, 29 oct; IMPI cuando haya ingresos).
- `/productos`: encabezado con dos anclas, Boaz sobre pared (`#boaz`), los siguientes, a la medida con vitrina de
  ejemplos (`#medida`) y el Cierre. Productos en la barra, el menú y el pie.
- Logotipo positivo de Boaz y escena de la columna, de `string-gym-saas`; firma "by STRING" en #5F6368 a 16 px.
  Archivo 900 al 62 % (34 KB, local) solo en `/productos`, para los nombres de los planes.
- `boaz-azul` pasa a `#2979FF` (el de G): solo relleno, nunca texto (3.6:1 sobre papel).
- `/saas` y `/gym/empezar` → 301 a `/productos#boaz` (sale de la deuda el 308); `/saas` borrada.
- Galería: cartela "Boaz", cuadro con la columna y el disco, la ciudad de STRING sin luna.
- La tarjeta se queda con hover en luz (#50FF05), como dice calidad.md.

## Decisiones tomadas en el lote 8

- La barra queda Sistemas (`/sistemas`) · Productos (`/saas`) · Nosotros; Galería sale; "Tu negocio" se oculta hasta que exista.
- `/servicios`, `/servicios/:id`, `/Services` y `/Services/:id` → 301 a `/sistemas`; `/#niveles` sigue como ancla de la portada.
- Página de nivel: un solo componente con los datos de `app/lib/niveles.js`; "Qué incluye" con las frases de la tabla de textos.md;
  "Cuando crezcas" solo con la tarjeta (Controla: "Empresa + Música, escultura y cine"; Empresa: "Ver los cinco niveles");
  ejemplos y alt de Carlos; cuerdas en `hairline`. Título y descripción derivados.
- Sala 3: titular "Probado en un negocio real." (textos.md, 30 oct).
- La portada sin la luna verde: fuera del dibujo de la ciudad, con su CSS y sus tokens; alt sin "con una luna verde" (Carlos, 30 oct).

## Decisiones tomadas en el lote 7

- Sala 6: el dibujo va pegado bajo la barra (arriba de la lista en celular, en su columna en escritorio). Sala 7: volteo con
  `scaleY`, sin arte nuevo (Carlos, 29 oct).
- Movimiento en `app/salas.css` con `animation-timeline` y respaldo por etapas (`Escenario.jsx`); el final es el estilo base.
- Cine: cuadros y créditos con corte seco por `data-activo`; en celular cada cuadro se centra en la tira.
- En celular, la galería enciende cada cuadro al entrar en la tira y la música afina cada cuerda al entrar en pantalla (Carlos).
- Sala 2: piedra y grietas dibujadas nuevas (aprobadas con el lote). Tokens de arte nuevos: `--arte-dur-danza`, `--arte-curva-danza`,
  `--arte-espera-tecla`.

## Decisiones tomadas en el lote 6

- `docs/calidad.md` manda en componentes. Ajustes de Carlos: borde del campo `#5A5A5E` (3.06:1) y colores sin transición.
- El arte guarda sus tiempos en `--arte-dur-*`; la tarjeta existe pero no se aplica a los niveles (Carlos, 29 oct).
- Capturas en `/muestrario`, solo en desarrollo. El número de los pasos de "Cómo trabajamos" vive solo en el dibujo.
- El foco pasa de verde a color del texto (línea / tinta), según calidad.md.
- Píldoras con borde `#5A5A5E` (3:1), igual que el campo, y el cursor ▍ del primario también en presionado y
  foco, para el celular (Carlos, 29 oct; calidad.md al día).

## Decisiones tomadas en el lote 5

- Fuentes locales en `app/fonts` (paquete `geist` 1.8.2, OFL), variables y recortadas a latin: el build ya no
  depende de fonts.googleapis.com.
- Fuera `PageTransition`, cursor propio, Lenis, SplitType, `Grano`, `Mancha` y `Sello`.
- "by STRING" en negro sobre el verde (diseno.md); cartela del gimnasio a 196 de ancho.
- Prueba de calidad en `e2e/calidad.spec.js` (axe, menos movimiento, 404, menú con teclado).

## Decisiones tomadas en el lote 4

- Una sola frase de privacidad: la versión corta, debajo de Enviar (Carlos, 29 oct).
- Cierre de /saas con el mensaje vigente y firma "by STRING" en Grafito (4.51:1 sobre el verde).
- Alt de OG de /gym y /saas: "El sistema para gimnasios".
- Prueba en navegador con Playwright (`npm run test:e2e`); Turnstile y la API simulados.

## Decisiones tomadas en el lote 3

- "Días hábiles: lunes a viernes, de 9 a 19 h." visible bajo el estándar (Carlos, 29 oct).
- Cartelas y pasos dibujados en los SVG, no repetidos en HTML; danza decorativa.
- Escultura recortada a `viewBox="0 150 560 470"`.

## Decisiones tomadas en el lote 2

- Cifras de socios fuera de `stats.js`, de la portada y de `/saas` (Carlos, 29 oct).
- Viñeta de Responde reemplazada por la que mandó Carlos (solo el libro, en verde).
- Cuerdas: La, Re, Sol, Si para Responde a Controla; Empresa toca las cuatro juntas.

## Decisiones tomadas en el lote 1

- Textos que faltaban (29 oct) guardados en `docs/textos.md`: títulos, error, 404, alt, legales.
- Redes solo en el JSON-LD; RESTO/CLINIC/BARBER salen de `/saas` (lote 4).
- Logo: manda el README del componente (I en negativo con el bloque encendido) sobre `preview.html`.
- El formulario vive en `/diagnostico` (movido sin cambios); `/servicios` y `/proyectos` borradas.

## Decisiones tomadas en el lote 0

- Conflictos entre docs: paleta del arte del 29 oct; sin bloque "quién soy" en la portada; el
  hero lleva "Ver los niveles"; el botón del formulario dice "Enviar" (todo según `textos.md`).
- Anton deja de cargarse con `next/font`: el logo SVG ya trae la letra a trazo.
- `diseno.md` y `textos.md` se guardaron textualmente desde los documentos que pegó Carlos.
