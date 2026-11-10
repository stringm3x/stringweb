# Estado · stringwebs.com

Última actualización: 10 nov 2026 (lote 23). Meta del KB: sitio rehecho del 1 al 7 nov; salir a
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
| 14 | Limpieza: fuera las imágenes del sitio anterior (`public/serv/`, `proyects/`, `design/`, los PNG sueltos y los del logo anterior en `marca/`), `TarjetaSistema`, `Mancuerna` y `scrollTriggerDefaults`, el legado de `tailwind.config.js` y `globals.css`, la exención de `app/tokens.test.js` (incluida `app/gym/`, que ya cumple) y las dependencias `gsap` y `react-hot-toast` | `lote-14-limpieza` | ✅ Fusionado a `main` (PR #9, 17d1efa, visto bueno de Carlos, 4 nov) |
| 16 | Cimientos de `/interno` (herramienta privada de Carlos): Supabase propio de STRING, `exigirCarlos()`, `proxy.js` con noindex y sin caché, entrada con contraseña + TOTP, `/interno/diagnostico` vacío, medición fuera de /interno. Sin tablas ni datos de prospectos. Supabase de STRING configurado y TOTP dado de alta (4 nov) | `lote-16-interno-cimientos` | ✅ Fusionado a main (PR #10, visto bueno de Carlos, 4 nov) |
| 17 | Precios con IVA incluido (decisión del 4 nov): una sola fuente en `app/lib/precios.js`; Responde $9,500 · Organiza $21,000 · Automatiza $32,500 · Controla $46,500 · continuidad $2,100 al mes · Boaz Pro $1,299 al mes y $12,990 al año; la etiqueta "IVA incluido" (`ui/IvaIncluido.jsx`) junto a cada precio y una línea de ayuda en /gym/registro; prueba de que no quedan precios viejos, ni Escala ni el paquete GYM, y de que el JSON-LD no trae precios distintos | `lote-17-precios-iva` | ✅ Fusionado a main (PR #11, visto bueno de Carlos, 4 nov) |
| 18 | SEO: título y descripción propios en cada ruta, desde los datos (`niveles.js`, `giros.js`) y `metadatosPagina()` en `app/lib/compartir.js`, todos absolutos; JSON-LD por página (`app/lib/jsonld.js`): ProfessionalService en `/` sin domicilio, SoftwareApplication de Boaz con los precios de `precios.js` y migas en niveles y giros, nada en la 404 ni en /interno; sitemap con `lastmod` fijo por ruta; head sin `viewport` ni `http-equiv` repetidos ni hreflang; 404 con su título; favicon (`favicon.ico` y PNG de 48 px); og:image propia de /boaz; /gym/registro index, follow | `lote-18-seo` | ✅ Fusionado a main (PR #12, visto bueno de Carlos, 4 nov) |
| 19 | Sala 6, dibujo nuevo: "La obra, de izquierda a derecha", un edificio que se completa en cinco tramos (cimientos, plano, estructura, muros, luz), quieto, con la paleta del arte del 29 oct; generador `scripts/dibujos/sala6.mjs`; etiquetas en HTML alineadas con los tramos (completas desde 1280 px; abajo, número y lista) y `aria-hidden`, el dibujo con su descripción; la raya del paso se queda; fuera las capas viejas y su CSS | `lote-19-sala6` | ✅ Fusionado a main (PR #14, visto bueno de Carlos, 4 nov) |
| 20 | /interno/diagnostico, versión 1 (guía sin guardar): una pregunta por pantalla para la llamada o la visita, seis giros (gimnasio → Boaz Pro), `sugerirNivel` puro, nivel en tarjeta con boceto o precio fundador, siguiente paso con día, resumen para WhatsApp editable con "Abrir en WhatsApp" y datos para la propuesta; saltar y volver por los puntos; visita rápida; "Salir" y "Nuevo diagnóstico" con confirmación, beforeunload y Wake Lock. No guarda nada. Precios que no se publican en `app/lib/interno/precios-interno.js`. Banco en `/muestrario/diagnostico` (404 en producción) | `lote-20-diagnostico` | ✅ Fusionado a main (PR #16, visto bueno de Carlos, 5 nov). Probado por Carlos en el Preview desde el celular con su sesión |
| — | Arreglo de formularios: /diagnostico y /gym/registro caídos en producción (4–5 nov) porque Vercel no tenía `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (el widget mandaba un token falso y el servidor respondía 403). Carlos puso en Vercel (Production y Preview) `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` y las SMTP y redesplegó sin caché. En código: el widget ya no da token falso en producción (`app/lib/turnstile-cliente.js`) | `arreglo-formularios` | ✅ Fusionado a main (PR #15, visto bueno de Carlos, 5 nov). Formularios probados en producción (5 nov) |
| 21 | /boaz: Escala "Próximamente" (tercera columna, no se contrata, botón a WhatsApp) y Programa Fundadores (Pro a $799 fijo 12 meses, cinco lugares, "Quiero ser fundador" a WhatsApp). `BOAZ_ESCALA` y `BOAZ_FUNDADOR` en `precios.js`, aparte de `BOAZ`; /interno toma el fundador de ahí. Lugares (0–5) y estado de Escala a mano en `app/lib/boaz-lanzamiento.js`. El "Registra tu gimnasio" del pie de Planes pasa a secundario. Banco en `/muestrario/boaz` (404 en producción). Nada cambia en /gym/registro, /productos ni el JSON-LD | `lote-21-boaz-fundadores` | ✅ Fusionado a main (PR #17, merge c1c7d28, visto bueno de Carlos, 6 nov). En producción: deploy de Vercel en Production del SHA c1c7d28 y verificado en www.stringwebs.com (/boaz, /gym/registro, /productos, JSON-LD y /muestrario/boaz con 404) |
| — | Arreglo: `/privacidad` daba 404 y Boaz (`string-gym-saas`, `lib/constants.ts`) enlaza ahí. Redirect 301 a `/aviso-de-privacidad` en `next.config.mjs`; fuera del sitemap; prueba e2e del 301 (`e2e/seo.spec.js`) y del sitemap (`app/lib/seo.test.js`). El repo de Boaz no se toca | `arreglo-privacidad-redirect` | ✅ Fusionado (PR #18, 5db1417), verificado en producción (6 nov: `/privacidad` da 301 a `/aviso-de-privacidad`, que da 200) |
| 22 | Formas de pago y continuidad por nivel (decisión del 6 nov): preguntas "¿Cómo se paga?" y "¿Me hacen descuento?" con los textos nuevos; en la ficha de nivel, línea "También a meses con tarjeta (o en plan mensual)" bajo "Pago" y "Después" por nivel con `continuidadNivel()` de `precios.js` (Mejora $3,500 en Automatiza y Controla, $2,100 en Responde y Organiza, "Según su propuesta" en Empresa); KB ed. 15 en `docs/kb/`; `e2e/pagos.spec.js`. `lastmod` de `/` y de los niveles: `LOTE_22` en `app/sitemap.js` | `pagos-continuidad` | ✅ Fusionado sin la cuenta de Mercado Pago, por decisión de Carlos (PR #19, 6 nov); abrirla es pendiente |
| 23 | Aviso de privacidad en /gym/registro (lote legal de Boaz): casilla obligatoria «Acepto el aviso de privacidad» (`CasillaBoaz`, G · Casilla) con enlace en otra pestaña; reemplaza «Al enviar aceptas…». Envía `acepta_aviso: true`; el SaaS lo exige y guarda versión y fecha. Sale ANTES del lanzamiento del SaaS a main. Comentario del 301 de /privacidad al día; e2e `registro-aviso.spec.js` | `lote-23-aviso-registro` | ⏳ PR abierto, espera el visto bueno de Carlos |

Producción sirve `main` con el lote 21 (c1c7d28) y el arreglo de /privacidad (5db1417, PR #18): deploy de Vercel en Production y verificación en www.stringwebs.com, 6 nov. Nada se fusiona a `main` sin el visto bueno de Carlos.

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
- npm audit: 27 avisos previos (next, vite, eslint…), ninguno de @supabase. Revisar en un lote propio.
- `e2e/componentes.spec.js` reescribe las capturas de `reportes/lote-6-componentes/` cada vez que corre (lote 11: se
  regresaron a mano); debería escribirlas fuera del repo.
- e2e inestable: `refinar.spec.js` compara 180 px exactos y falla por subpíxel (180.000244) cuando la suite corre en paralelo. Cambiar a una tolerancia (toBeCloseTo o ±0.5 px) en un lote propio.
- LCP simulado de 2.2–2.9 s en celular en todo el sitio (Lighthouse), con el LCP observado en ~0.1 s: va en un lote
  propio, medido con PageSpeed en producción (`reportes/lote-10-reporte.md`). Lote 12: /tu-negocio pasó de 2.31 a
  ~2.54 s. Lote 13: no son los dibujos (ya salían con prioridad Low; con `fetchpriority="low"` sigue en 1.96–2.53 s).
  El LCP del párrafo es Render Delay (~2.1 s) y cae sobre el TTI simulado (2.55 s): lo amarran los 17 scripts
  (228 KB) de la página. El arreglo es de JS, no de imágenes (`reportes/lote-13-reporte.md`).
- La vibración al tocar una cuerda (sala 4) redibuja la ruta con JS en cada fotograma (`Cuerdas.jsx`), no con `transform`.
- Los dibujos de `public/arte/giros/`, `productos/`, `niveles/chica/` y `sala6-obra.svg` salen de `scripts/dibujos/` (`giros.mjs`, `dibujar.mjs`, `sala6.mjs`)
  y después pasan por svgo con `scripts/dibujos/svgo.config.mjs`; si cambia uno, se corren los dos pasos.
- Las capas de `public/arte/sala{2,5,7}/` salen de los SVG originales con `node scripts/capas-arte.mjs`; si cambia un dibujo,
  se vuelve a correr (`app/arte-capas.test.js` avisa si no coinciden).
- Las transiciones entre páginas dependen del flag experimental `experimental.viewTransition` de Next 16.1
  (`next.config.mjs`). Sin él, la navegación debe seguir funcionando, solo sin fundido: comprobado el 29 oct con
  el flag apagado (build limpio; barra, logo y botón navegan sin errores). Revisar al subir de versión de Next.

## Pendientes de Carlos

- **Domicilio** del responsable para el aviso de privacidad (lo pide la ley) y fecha de publicación. Listo para
  un solo cambio: `DOMICILIO` en `app/(sitio)/aviso-de-privacidad/page.jsx` y la frase en `docs/textos.md`
  (§ Aviso de privacidad, "Quién es responsable de tus datos").
- Del KB, abiertos: si el sonido se queda, recontar cifras de Evolution GYM.
- Facebook (profile.php?id=61576042750915) y TikTok (@stringmx) salieron del sameAs en el lote 18. Vuelven al JSON-LD
  solo si Carlos los mantiene activos con su foto y el nombre de STRING.
- **Dominio sin www** (reconocimiento del lote 18): `https://stringwebs.com` redirige a www con **307** (temporal) y
  `http://stringwebs.com` encadena 308 → 307. En Vercel → Domains, poner la redirección del apex en 308 (o 301). No
  es código.
- **Google Search Console**: verificar la propiedad de dominio con un registro TXT en el DNS (cubre www, sin www,
  http y https) y enviar `https://www.stringwebs.com/sitemap.xml`. Después, el Rich Results Test de `/`, `/boaz`,
  un nivel y un giro (en el lote 18 solo se validó contra el vocabulario de schema.org, en local).
- **Perfil de Negocio de Google** como negocio de área de servicio (sin domicilio público), para las búsquedas
  locales por giro. Lo decide Carlos; Google pide el domicilio en privado para verificar.

## Ruta privada /interno (lote 16)

- `/interno/*` es privada: fuera del sitemap, la barra, el menú y el pie; sin canonical, Open Graph ni
  redirect; `noindex` en la metadata y en `X-Robots-Tag`, Cache-Control con `no-store` (`private` cuando Next lo permite). No se
  agrega a `public/robots.txt` (listarla ahí la anunciaría).
- Supabase: proyecto propio de STRING (nunca el de Boaz), sin service role. Variables:
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (o `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) e
  `INTERNO_USUARIO_ID`, más `INTERNO_SECRETO` (solo servidor, 32 caracteres o más; firma la cuenta de
  intentos del código). Si falta una, nadie entra.
- Cada página, server action y route handler de `/interno` llama a `exigirCarlos()`, salvo estas tres
  acciones de la entrada:
  - "Entrar" (contraseña): si el usuario que inicia sesión no es `INTERNO_USUARIO_ID`, cierra la sesión
    de inmediato y responde el error genérico. Si es Carlos, la cuenta de códigos fallidos empieza en 0.
  - "Verificar" (código): exige la sesión aal1 de Carlos antes y aal2 de Carlos después; con otro UUID,
    cierra la sesión. Formato malo (no son 6 dígitos): solo error de validación, no llega a Supabase ni
    cierra la sesión. Código incorrecto: sigue en aal1 y deja reintentar; al quinto fallido seguido,
    cierra la sesión y vuelve a correo y contraseña. La cuenta vive en la cookie httpOnly
    `interno-intentos`, firmada con `INTERNO_SECRETO` y ligada a la sesión (`session_id`) y al usuario,
    con 15 minutos de vida; si no se puede validar (falta, alterada, de otra sesión o caducada), cuenta
    como límite alcanzado.
  - "Salir": solo cierra la sesión.

  El error es siempre el mismo ("No se pudo entrar. Revisa los datos."): no revela si el correo existe,
  si la contraseña o el código fallaron o si el usuario no es el permitido.
- Límite conocido de la cuenta de intentos: sin estado en el servidor (no hay tablas en este lote), una
  cookie válida guardada y reenviada dentro de la misma sesión no se distingue. La frenan la contraseña
  (hace falta para tener la sesión aal1) y los límites de verificación de Supabase (Auth → Rate Limits).
- **Alta del TOTP** (una sola vez, en la Mac de Carlos): `node scripts/interno/enrolar-totp.mjs`. Lee las
  variables de `.env.local`, pide correo y contraseña (oculta), revisa que el UUID sea `INTERNO_USUARIO_ID`
  y muestra en pantalla el URI `otpauth://` para la app de códigos; luego pide el primer código y lo
  verifica. No escribe nada a disco ni a logs. El URI es secreto: no se comparte, no se captura y no se
  pega en ningún lado. Si ya hay un factor verificado, no crea otro. Nada del sitio importa el script.

## Pendientes para después del lanzamiento

- PageSpeed Insights en producción: confirmar LCP < 2.5 s y rendimiento ≥ 90 en `/` (en la vista previa el
  Chrome de Lighthouse alterna entre 1.6–2.1 s y 2.6–3.6 s con el mismo código; ver reporte del lote 5).
- LCP de todo el sitio (lote 9a, Lighthouse local en celular): el elemento es el párrafo de entrada y casi todo es
  retraso de pintado. Portada 2.76 s, /sistemas 2.4 s, /productos 2.76 s. Se mide con PageSpeed en producción (Fase 0).
- LCP de /boaz (lote 9b, Lighthouse local): 2.41–2.84 s, el mismo hallazgo de todo el sitio.
- PageSpeed de /boaz: no se pudo en el preview (protección de Vercel y cuota diaria de la API); medir en producción.
- El dibujo de Boaz (`LaminaBoaz.jsx` y el cuadro de la galería) es copia de `string-gym-saas`, provisional allá: cuando
  llegue el del ilustrador, se copia a mano aquí.
- **Lote 22 · rendimiento** (hallazgos del reconocimiento del lote 18, punto 10): el LCP simulado de `/` es 2.8 s y el
  observado 66 ms, igual al FCP; el elemento es el párrafo de entrada y el 84 % es retraso de pintado, porque
  Lighthouse cuenta los ~180 KB comprimidos de JS que terminan antes del primer pintado. Candidatos, sin cambiar
  el diseño: diferir `components/Medicion.jsx` (Analytics y Speed Insights) hasta después de `load`; cargar el
  audio de `salas/Cuerdas.jsx` solo al activar el sonido; revisar si lo de cliente de `salas/Escenario.jsx` puede
  ser CSS; cambiar `react-icons` de `header.jsx` por dos SVG en línea; `salas.css` solo en la portada (hoy entra
  en todo el sitio desde `layout.jsx`); la portada pesa 164 KB de HTML desde el lote 19 (SVG en línea); en `/sistemas` el LCP es
  una imagen con `loading="lazy" fetchpriority="low"` en la primera pantalla. Medir con PageSpeed en producción
  antes y después.
- **Lote 23 · enlaces a los giros** (copy por aprobar): cada giro con local recibe un solo enlace interno (desde
  /tu-negocio) y la portada no enlaza a ningún giro; /productos y /tu-negocio solo reciben enlaces de la barra y el
  pie. Enlazar desde la portada y desde cada nivel hacia sus giros; los textos de los enlaces no están en
  `docs/textos.md` y se aprueban antes.

## Decisiones tomadas en el lote 21

- Escala y el Pro fundador viven en `precios.js` como `BOAZ_ESCALA` y `BOAZ_FUNDADOR`, aparte de `BOAZ`: /productos,
  /gym/registro y el JSON-LD leen `BOAZ` y no pueden arrastrarlos. `precios.test.js` deja "Escala" solo en
  `components/boaz/datos.js` y `PlanEscala.jsx`; `jsonld.test.js` exige exactamente dos offers (Starter y Pro).
- Lugares de fundadores y estado de Escala: `app/lib/boaz-lanzamiento.js`, a mano. Un valor que no vale rompe el build.
  Escala pasa a "pruebas" el día que haya número verificado y socios reales recibiendo mensajes.
- La regla punteada de Escala queda a la altura de la sólida de la tabla (la píldora y su margen miden 28 px, como
  "★ RECOMENDADO" en Pro); abajo, Escala lleva su propio ritmo.
- El número de la casilla azul (#2979FF) va en negro (#000, 5.3:1): la tinta da 4.4:1 (Carlos, 6 nov).
- Un solo azul por pantalla (propuesta A, Carlos): el "Registra tu gimnasio" del pie de Planes pasa a secundario; el del
  encabezado y el del cierre siguen primarios.

## Decisiones tomadas en el lote 20

- Contenido y textos finales de la herramienta: los del prompt del lote y los aprobados por ventas (5 nov), literales
  en `docs/textos.md` § Interno · lote 20.
- Boceto, precio fundador y el mínimo de Empresa ($80,000) viven en `app/lib/interno/precios-interno.js`, no en
  `precios.js`: no se publican. \[Lote 21: el precio fundador se vuelve público y pasa a `precios.js`; /interno lo toma
  de ahí.\] El mínimo solo sale en la tarjeta del paso 4; nunca en el resumen ni en los datos.
- P2 común y la P de gimnasio ("¿Sabes…?") son problema con "Más o menos" / "A veces" / "No". La P de Empresa es texto.
- En el descarte por "No sé", Automatiza solo con la P de barbería, clínica o restaurante en Sí / A veces.
- Las pruebas en navegador corren en `/muestrario/diagnostico` (mismo componente y barra, sin `exigirCarlos()`), que
  da 404 fuera de desarrollo; `e2e/interno.spec.js` lo comprueba contra el build de producción.
- "Saltar" borra la respuesta y deja la nota; "Siguiente" sin respuesta también la marca saltada. Los botones del
  paso 1 esperan al giro. Cambiar de giro borra las respuestas del giro anterior y el nivel elegido a mano.
- JS de las páginas públicas: `/`, `/sistemas`, `/boaz` y los giros, idénticos. `/diagnostico` (formulario
  público) +74 B gzip por un nuevo corte de chunks compartidos (`Boton`, `Campo`, `precios.js`), sin código de
  /interno: aceptado por Carlos (5 nov).

## Decisiones tomadas en el lote 19

- El dibujo de la sala 6 sigue la composición del lienzo de Carlos con los colores de la paleta del 29 oct
  (`docs/diseno.md`). Lo que la tabla no trae (tierra, rayas del cimiento, separadores) va en los neutros de `giros.mjs`.
  En el tramo 4, marcos y reflejo de los vidrios en mármol sombra, para que el vidrio se lea contra el muro.
- Sala 6 quieta: el edificio ya no crece con el scroll; la raya del paso en la lista se queda. Así lo dice
  `docs/movimiento-salas.md` § Sala 6; si se anima, va en el lote de animar salas.
- Etiquetas de los tramos en HTML: número, nombre y subtítulo desde 1280 px; de 1024 a 1279 px y en celular, número y
  lista (a 1024 px los nombres se enciman). Son `aria-hidden`; el dibujo lleva `role="img"` y su descripción.
- "AJAMOS" junto al logo al pasar por la sala 6 es intencional (barra al 88 %, `docs/calidad.md` § Barra); si se
  quiere ocultar, lote propio de la barra.

## Decisiones tomadas en el lote 18

- Títulos y descripciones aprobados por Carlos (4 nov), en `docs/textos.md` § SEO · lote 18. Viven en los datos:
  `tituloSeo` y `descripcionSeo` en `niveles.js` y `giros.js`; el resto, en la metadata de cada página con
  `metadatosPagina()`. La portada, en `PORTADA` (`app/lib/compartir.js`), que también usa el layout por omisión.
- El JSON-LD ya no sale del layout raíz: cada página pinta el suyo con `components/JsonLd.jsx`, y así la 404 y
  /interno quedan sin él. ProfessionalService solo en `/`, con `founder` Carlos Avilés, ciudad sin calle y
  `sameAs` solo Instagram. Logo del JSON-LD: `public/logo/string-pared.png` (pared, 852×516), generado desde
  `string-pared.svg`.
- Sin FAQPage: Google solo la muestra a sitios de gobierno y salud. Sin `aggregateRating` ni `review`: no hay
  reseñas reales.
- `lastmod` del sitemap: una fecha fija por ruta en `app/sitemap.js` (la del último lote que cambió la ruta). Al
  cambiar una página, se actualiza a mano.
- `public/logo/string-pared.png`, `app/icon1.png` y `app/favicon.ico` salen de `node scripts/generar-imagenes-seo.mjs`
  (se corre a mano si cambia el logo o el ícono).
- La og:image de /boaz llama a `LaminaBoaz` y la pasa a SVG con un serializador mínimo (sin las cotas: el generador
  no pinta `<text>`); el texto va en Geist porque el generador no lee woff2. Si `LaminaBoaz` cambia, revisar la imagen
  (`e2e/seo.spec.js` falla si el generador truena; comprobado).

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
