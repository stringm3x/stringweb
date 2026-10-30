# CLAUDE.md — stringwebs.com

Este repo es SOLO el sitio público de STRING (stringwebs.com): código, estructura, copy y diseño.
El sistema para gimnasios (código, base de datos, `app.gym.stringwebs.com`) vive en otro repo.
Aquí solo se habla de él como producto en venta.

## Fuentes de verdad (solo lectura)

| Documento | Manda en |
|---|---|
| `docs/kb/KB-Maestro-STRING.md` | Negocio, niveles, precios, cifras autorizadas (Parte 8), el sitio (Parte 7) |
| `docs/diseno.md` (STRING — Identidad) | Todo lo visual: logo, color, tipografía, arte, salas |
| `docs/sistema/` (Identidad 2026) | Tokens (`tokens.json`), componentes con HTML de referencia (Logo, Botón, Ciudad, Cuerda, Galería, Portada) |
| `docs/textos.md` (Textos del sitio) | El copy final de cada sala, formulario, pie y legales |
| `docs/calidad.md` (La calidad en STRING) | Reglas de calidad, tokens de movimiento y `--alerta`, y los estados de cada componente (botón, campo, píldora, tarjeta, barra, menú, transiciones) |

Si el código contradice un documento, manda el documento y se reporta. Si dos documentos chocan:
textos → `textos.md`; componentes, estados y movimiento → `calidad.md`; visual → `diseno.md`;
negocio y cifras → KB. Si no se resuelve, se pregunta.
Estado del trabajo y deuda técnica: `docs/estado.md`. Reportes por lote: `reportes/`.

## Qué es STRING

Taller de software mexicano, en CDMX, fundado por Carlos Avilés: crea sus propios productos SaaS y
construye sistemas a la medida, con calidad premium y con arte. STRING es la casa; cada producto
tiene su marca y STRING lo firma.

- **Sistemas a la medida:** cinco niveles, una sola familia, misma calidad; cambia el alcance.
  En el sitio solo se muestra el "desde": Responde $8,000 · Organiza $18,000 · Automatiza $28,000 ·
  Controla $40,000 · Empresa se cotiza. Continuidad: Cuida · Mejora · Impulsa, desde $1,800 al mes.
- **Productos:** el sistema para gimnasios (único en producción). Barberías, clínicas y
  restaurantes no existen todavía: nunca se presentan como disponibles.

Si un precio en el código no coincide con estos, se reporta. No se corrige por cuenta propia.

Mensajes vigentes:
- Titular de la portada: "Software hecho con oficio. Y con arte."
- Sala de continuidad: "El sistema trabaja aunque tu negocio no esté disponible."
- Entrada de los niveles: "Arte y calidad no están peleados."
- **Retirado:** "No necesitas más seguidores. Necesitas un sistema que convierta."

## A quién le habla el sitio

Al dueño de un negocio con local en México (y a empresas por el nivel Empresa), no técnico, que
entra desde el celular. Casi siempre ya conoció a Carlos. La portada no es catálogo: es prueba de
credibilidad. Qué hacemos, para quién, cuánto cuesta y qué sigue: en 5 segundos, en un celular.

## Reglas y metas para todo el sitio

**Metas en celular:** Lighthouse rendimiento ≥ 90, accesibilidad ≥ 95, buenas prácticas y SEO ≥ 95,
LCP < 2.5 s, CLS < 0.1, contraste ≥ 4.5:1. Si una no se cumple, se dice en el reporte.

- Stack actual, sin migrar. Celular primero.
- El arte nunca tapa texto, botones ni precios; sin arte, la página sigue vendiendo.
- Con menos movimiento (`prefers-reduced-motion`) todo queda quieto; el sonido empieza apagado.
- Solo se anima `transform`, `opacity` y `clip-path`; los cambios de color son instantáneos.
  Ninguna duración ni curva suelta: todas salen de los tokens (`docs/calidad.md` § 2).
- Cada componente tiene sus 8 estados (`docs/calidad.md` § 3) y pasa la lista "Antes de publicar".
- Todo usable con teclado y foco visible.
- Un solo acento en la interfaz: el verde. El color cálido vive solo en el arte.
- Anton solo en el logo, y el logo va como SVG en línea.
- Precios y cifras en Geist Mono, tal como en `docs/textos.md`. Nada inventado.
- Boaz nunca por su nombre: en público es "el sistema para gimnasios".
- Nunca se publica en producción sin el visto bueno de Carlos.
- No se toca `app.gym.stringwebs.com` ni su base de datos.

## Reglas de trabajo

1. NO inventar datos: ni testimonios, ni logos, ni clientes, ni métricas, ni casos. Si falta un
   dato o un texto, se deja `// TODO(dato):` o `// TODO(textos):` y se avisa.
2. NO cambiar el sistema de diseño sin petición explícita.
3. Un lote = una rama; cada bloque = un commit. Nada de refactors de paso.
4. Trabajo en ramas. Nada se fusiona a `main` sin el visto bueno de Carlos.
5. Toda ruta que cambie lleva redirect 301.
6. Mostrar el diff antes de aplicar.
7. Verificar en móvil (≈375 px).
8. `npm run build` limpio y `npm test` en verde antes de cerrar un lote.

## Identidad visual (resumen; manda `docs/diseno.md`)

- **Color.** Noche `#000000` · Línea `#F5F5F3` (texto sobre noche) · Luz `#50FF05` (el acento) ·
  Neblina `#9A9A9F` (secundario sobre noche) · Pared `#F4F2EC` · Tinta `#111214` (texto sobre
  pared) · Verde profundo `#1A7F00` (acento sobre pared, nunca en texto < 14 px) · Grafito `#5F6368`.
  `#50FF05` solo sobre noche. Texto encima del verde: negro. El azul `#004aad` y el dorado
  `#f6c75e` del sitio anterior se retiran con el rehecho.
- **Tipografía.** Anton solo en el logo (ya va a trazo en el SVG, no hace falta cargarla). Geist
  para titulares (600, -0.035 em) y texto (17–22 px). Geist Mono para cifras, precios y etiquetas
  en mayúsculas.
- **Botones** en píldora, mínimo 48 px de alto (44 px en la barra); uno principal verde por pantalla
  ("Solicitar diagnóstico"); foco de 2 px en línea (tinta sobre pared) con 3 px de separación.
- **Movimiento.** `--dur-rapido` 150 ms · `--dur-normal` 300 ms · `--dur-lento` 600 ms · `--curva`
  `cubic-bezier(.2, 0, 0, 1)` · `--parpadeo` 1.1 s `steps(1)`. El arte usa `--arte-dur-*`.
- **Alerta** solo para errores: `#FF6B5A` sobre noche, `#B3261E` sobre pared.
- **Arte.** La ciudad de una línea, la luna, las cuerdas (sonido opcional, apagado al cargar), la
  galería y las estrellas. Dibujo de línea; nada de 3D ni video. Única foto: Carlos, sala 3.
  Paleta del arte: la del 29 oct en `docs/diseno.md`. La brochada, el grano y el grabado del sitio
  anterior se retiran.
- **Animación:** cada una se explica en una frase y nada parpadea más rápido que el cursor (1.1 s).

## La portada: siete salas en una sola página

1 Inicio (literatura) · 2 El problema (escultura) · 3 El caso real (cine) ·
4 Los niveles (música, `#niveles`) · 5 La galería (pintura, `#galeria`) · 6 Cómo trabajamos
(arquitectura, incluye el estándar de servicio) · 7 Continuidad (danza). Después: preguntas
frecuentes, cierre y pie. Sin bloque "quién soy" en la portada: Carlos se presenta en la sala 3.

Al lanzar: literatura, música y pintura completas; escultura, cine, arquitectura y danza en versión
quieta (`public/arte/`). Sala 3 sin cifras de socios hasta recontar.

Barra: logo · Sistemas (`/#niveles`) · Productos (`/saas`) · Galería (`/#galeria`) · Nosotros ·
"Solicitar diagnóstico" (`/diagnostico`).

## Rutas

Páginas: `/`, `/nosotros`, `/diagnostico`, `/aviso-de-privacidad`, `/terminos`, `/saas` (copy:
"El sistema para gimnasios"), 404. Se conservan `/gym/registro` y `/gym/gracias` (envían a
`app.gym.stringwebs.com`; no se toca ese envío). No se crean `/sistemas`, `/galeria`, `/estandar`
ni `/preguntas`.

Redirects (en `next.config.mjs`, con `statusCode: 301`, no `permanent: true`, que emite 308).
Sin cadenas: cada ruta vieja apunta al destino final.

| Vieja | Destino |
|---|---|
| `/servicios`, `/servicios/:id`, `/Services`, `/Services/:id` | `/#niveles` |
| `/proyectos`, `/Proyects` | `/#galeria` |
| `/cotizacion`, `/quote` | `/diagnostico` |
| `/Us` | `/nosotros` |
| `/privacy-policy` | `/aviso-de-privacidad` |
| `/terms` | `/terminos` |
| `/gym/empezar` | `/saas#planes` (hoy 308: deuda técnica, ver `docs/estado.md`) |

En el mismo cambio de una ruta se actualizan enlaces internos, nav, pie, `app/sitemap.js`, el
canonical y los datos estructurados.

## Contacto

Correo: `stringwebmx@gmail.com` (no `hola@stringwebs.com`). WhatsApp: `525545524847`, el que ya
está en el repo; vive en una sola constante desde el lote 1.

## Cifras públicas

Solo las de la Parte 8 del KB, tal como las usa `docs/textos.md`. Al lanzamiento:
"En uso todos los días en el mostrador · 1 producto en producción", 5 niveles, diagnóstico
inicial en 24 horas. **Sin cifras de socios** hasta recontar; cuando vuelvan, "X socios cargados,
Y activos" siempre juntas. Fuente única en el código: `app/lib/stats.js`.
Retiradas: "10+ clientes", "2+ años", "3 sectores", "30 % más conversión", "nadie en México".

## Voz y copy

El copy sale de `docs/textos.md`, palabra por palabra. Lo que no esté ahí se marca
`TODO(textos)` y se pregunta. Español de México, frases cortas que afirman, sin promesas de
ventas. "Panel", no "dashboard"; "prospecto", no "lead". Prohibido: muros de logos de tecnologías,
fotos de stock y superlativos sin respaldo.

## Stack y comandos

- Next.js 16.1 (App Router), React 19, Tailwind 3.4, GSAP, react-hook-form + zod, nodemailer.
- **JavaScript puro. No migrar a TypeScript.**
- `npm run dev` · `npm run build` · `npm test` (Vitest; hoy solo cubre `quote-schema`).
- `npm run lint` está roto (el parser exige `typescript`): deuda técnica, no se arregla de paso.
- Correo: `app/lib/mailer.js` (SMTP). No se agrega Resend ni otro proveedor.
- Protección del formulario: Turnstile, el mismo widget del formulario de gym
  (`app/gym/components/TurnstileWidget.jsx`).
- Despliegue: Vercel desde GitHub (`stringm3x/stringweb`).

## Mapa del repo

- Portada: `app/(sitio)/page.jsx` + `app/components/home/*.jsx` (se rehace por salas).
- Layout, metadata y JSON-LD: `app/layout.jsx`. Barra: `app/header.jsx`. Pie: `app/Footer.jsx`.
- UI compartida: `app/components/ui/`; formularios: `app/components/forms/`.
- Copy hardcodeado en JSX con algunos arrays en `data.js`; no hay CMS.
- Logo: `app/components/ui/Logo.jsx` (se cambia por el SVG de
  `docs/sistema/components/Logo/logo-inline.svg`). Archivos del logo: `public/logo/`.

## Lotes

0 Lectura y plan · 1 Base · 2 Salas 1–4 · 3 Salas 5–7 + /nosotros + preguntas + cierre ·
4 Formulario y /saas · 5 Calidad (metas medibles). Carlos pasa el prompt de cada lote; el estado
vive en `docs/estado.md`.
