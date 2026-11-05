# Estado · stringwebs.com

Última actualización: 4 nov 2026 (lote 14). Meta del KB: sitio rehecho del 1 al 7 nov; salir a
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
| 9b | /boaz con la identidad de Boaz, /gym/registro y /gym/gracias rehechos, Conoce Boaz → /boaz, /saas y /gym/empezar → /boaz, limpieza del legado | `lote-9b-boaz` | ✅ Fusionado a `main` (2 nov, PR #4, visto bueno de Carlos) |
| 10 | /nosotros como recorrido (historia, método, equipo, fe) con la foto de Carlos; la sala 3 sin foto, con la entrada y el mostrador en línea; `Entra` a `ui/`; ancla `#como-trabajamos` | `lote-10-nosotros` | ✅ Fusionado a `main` (2 nov, PR #5, visto bueno de Carlos) |
| 11 | Tu negocio: /tu-negocio, /tu-negocio/empresas y nueve giros (dos plantillas, `app/lib/giros.js`), nueve dibujos, barra, menú, pie y sitemap; dos giros nuevos en el formulario con su marca en el correo; el fondo claro solo para Boaz (sala 6 y método de /nosotros en noche) | `lote-11-tu-negocio` | ✅ Fusionado a `main` (2 nov, PR #6) |
| 12 | Refinar: la tarjeta con su dibujo (giros, /productos, /sistemas, "Cuando crezcas"); dibujos nuevos de Gimnasios, "A la medida" y los cinco niveles en chico; el hilo entre secciones (máximo 2–3 por página); generadores en `scripts/dibujos/` y los dibujos por svgo | `lote-12-refinar` | ✅ Fusionado a `main` (PR #7, 242149e) |
| 13 | Pulido para salir a vender: /nosotros en producción revisado (sirve el lote 10); la firma se anuncia "by STRING" y las cotas de la lámina no se leen; cada página comparte su propio título, descripción e imagen (`app/lib/compartir.js`); `fetchpriority="low"` en el dibujo de la tarjeta; domicilio listo para un solo cambio; descripciones propias de los legales | `lote-13-pulido` | ✅ Fusionado a `main` (PR #8, visto bueno de Carlos, 4 nov); desarrollo en pausa |
| 14 | Limpieza: fuera las imágenes del sitio anterior (`public/serv/`, `proyects/`, `design/`, los PNG sueltos y los del logo anterior en `marca/`), `TarjetaSistema`, `Mancuerna` y `scrollTriggerDefaults`, el legado de `tailwind.config.js` y `globals.css`, la exención de `app/tokens.test.js` (incluida `app/gym/`, que ya cumple) y las dependencias `gsap` y `react-hot-toast` | `lote-14-limpieza` | ✅ Hecho, sin fusionar |

Producción sirve `main` con el lote 12 (revisado con curl el 4 nov, `reportes/lote-13-reporte.md`). Nada se fusiona a `main` sin el visto bueno de Carlos.

## Arreglos del KB Parte 7

| Arreglo | Dónde está hoy | Lote |
|---|---|---|
| Logo leído "SSTRING" | ✅ `Logo.jsx` con el SVG del sistema | 1 |
| Meta description con "e-commerce" | ✅ metadata de textos.md; `/proyectos` retirada | 1 |
| Legales en inglés | ✅ `/aviso-de-privacidad` y `/terminos`; 301 desde las rutas en inglés | 1 |
| Titular repetido | ✅ un solo `<h1>` tecleado en `salas/TitularTecleado.jsx` | 2 |
| /saas dice "STRING GYM" | ✅ "el sistema para gimnasios" en /saas, `Caso.jsx` y `app/gym/*` (4); desde el 9a, Boaz por su nombre y /saas → /productos#boaz | 4, 9a |

## Deuda técnica (no se corrige en el rehecho)

- `npm run lint` roto: el parser de `eslint-config-next` exige `typescript`.
- `e2e/componentes.spec.js` reescribe las capturas de `reportes/lote-6-componentes/` cada vez que corre (lote 11: se
  regresaron a mano); debería escribirlas fuera del repo.
- e2e inestable: `refinar.spec.js` compara 180 px exactos y falla por subpíxel (180.000244) cuando la suite corre en paralelo. Cambiar a una tolerancia (toBeCloseTo o ±0.5 px) en un lote propio.
- LCP simulado de 2.2–2.9 s en celular en todo el sitio (Lighthouse), con el LCP observado en ~0.1 s: va en un lote
  propio, medido con PageSpeed en producción (`reportes/lote-10-reporte.md`). Lote 12: /tu-negocio pasó de 2.31 a
  ~2.54 s. Lote 13: no son los dibujos (ya salían con prioridad Low; con `fetchpriority="low"` sigue en 1.96–2.53 s).
  El LCP del párrafo es Render Delay (~2.1 s) y cae sobre el TTI simulado (2.55 s): lo amarran los 17 scripts
  (228 KB) de la página. El arreglo es de JS, no de imágenes (`reportes/lote-13-reporte.md`).
- La vibración al tocar una cuerda (sala 4) redibuja la ruta con JS en cada fotograma (`Cuerdas.jsx`), no con `transform`.
- Los dibujos de `public/arte/giros/`, `productos/` y `niveles/chica/` salen de `scripts/dibujos/` (`giros.mjs`, `dibujar.mjs`)
  y después pasan por svgo con `scripts/dibujos/svgo.config.mjs`; si cambia uno, se corren los dos pasos.
- Las capas de `public/arte/sala{2,5,6,7}/` salen de los SVG originales con `node scripts/capas-arte.mjs`; si cambia un dibujo,
  se vuelve a correr (`app/arte-capas.test.js` avisa si no coinciden).
- Las transiciones entre páginas dependen del flag experimental `experimental.viewTransition` de Next 16.1
  (`next.config.mjs`). Sin él, la navegación debe seguir funcionando, solo sin fundido: comprobado el 29 oct con
  el flag apagado (build limpio; barra, logo y botón navegan sin errores). Revisar al subir de versión de Next.

## Pendientes de Carlos

- **Domicilio** del responsable para el aviso de privacidad (lo pide la ley) y fecha de publicación. Listo para
  un solo cambio: `DOMICILIO` en `app/(sitio)/aviso-de-privacidad/page.jsx` y la frase en `docs/textos.md`
  (§ Aviso de privacidad, "Quién es responsable de tus datos").
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

## Decisiones tomadas en el lote 13

- La revisión externa que vio el /nosotros viejo leyó una copia en caché: producción, `stringweb.vercel.app` y
  cualquier User-Agent sirven el lote 10. No hubo nada que corregir en Vercel ni en los redirects.
- La firma se lee con un solo texto para lectores ("by STRING"); lo visible va `aria-hidden`. Las cotas de la
  lámina van en un `<g aria-hidden>`: la lámina se nombra por su `aria-label` o se oculta entera.
- Los metadatos para compartir salen de `app/lib/compartir.js` (Open Graph y Twitter iguales). Una imagen en la
  configuración le gana al `opengraph-image.jsx` del segmento: las páginas con imagen propia pasan `imagenPropia`.
- `fetchpriority="low"` en el dibujo de la tarjeta se queda (lo pidió Carlos) aunque no movió el LCP. Tampoco
  empeoró /sistemas, donde el primer dibujo sí es el elemento LCP: 2.45 s antes y después.

## Decisiones tomadas en el lote 11

- El fondo claro es de Boaz (Carlos, 2 nov): pared solo en /boaz, /gym, `#boaz` de /productos y la galería. La sala 6 y
  el método de /nosotros pasan a noche con su arte recoloreado; la tierra de la sala 6 se oscurece (`#2A2620`) y el
  rótulo 1 lleva fondo de tierra para pasar 4.5:1. `app/lib/giros.test.js` falla si la pared vuelve a otra página.
- Tu negocio: dos plantillas (giro con local con escalera de cinco niveles; giro grande con cuatro puntos y dos niveles)
  y los datos en `app/lib/giros.js`; los precios salen de `NIVELES`. Los calibres de las cuerdas viven en `niveles.js`.
- Dibujos de los giros decorativos (`alt=""`): el texto ya lo dice todo. "← TU NEGOCIO" también en /empresas.
- Los giros grandes no llevan el Cierre de siempre (su plantilla termina con el botón); /tu-negocio cierra con
  "¿No ves tu giro?". `Tarjeta` suma la prop `cuerda` (3 px en las empresas).
- Formulario: "Tienda en línea" y "Empresa mediana o grande" antes de "Otro", cada una con su marca en el correo.

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
