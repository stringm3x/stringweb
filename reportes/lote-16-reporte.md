# Lote 16 · Cimientos de /interno

Rama `lote-16-interno-cimientos`, rebasada sobre `main` en 17d1efa (lote 14 fusionado, 4 nov).
Herramienta privada de Carlos para las llamadas con prospectos: login, protección, layout y una página
vacía. No guarda datos de prospectos ni crea tablas.

## Qué hay

- **Dos puertas.** `proxy.js` (solo `/interno/:path*`) manda a `/interno/entrar` sin una sesión aal2 del
  usuario permitido y copia al redirect las cookies que Supabase refrescó. En el servidor, `exigirCarlos()`
  (getUser + UUID `INTERNO_USUARIO_ID` + aal2) en el layout protegido y en cada página.
- **Entrada en dos pasos:** correo y contraseña → código TOTP. Con una sesión aal1 de Carlos, directo al código.
  Código incorrecto: sigue en aal1 y deja reintentar; al quinto seguido, cierra la sesión. Formato malo no
  llega a Supabase. La cuenta vive en una cookie httpOnly firmada con `INTERNO_SECRETO` y ligada a la sesión.
- **Falla cerrado:** sin variables, con Supabase caído, sin sesión, con otro UUID (se cierra su sesión) o en
  aal1, no se entra. Error siempre igual: "No se pudo entrar. Revisa los datos."
- **noindex de verdad:** metadata `noindex, nofollow` sin canonical, Open Graph ni Twitter heredados;
  `X-Robots-Tag: noindex, nofollow` y `Cache-Control: private, no-store` en toda respuesta de /interno en
  producción (redirects, la entrada y los POST de las acciones). Fuera del sitemap, la barra, el menú, el pie y
  `robots.txt`. Ninguna ruta de /interno se prerenderiza.
- **Sin medición:** Analytics y Speed Insights descartan /interno (`beforeSend`).
- **Supabase solo** en `app/(interno)/` y `app/lib/interno/` (excepción: `scripts/interno/enrolar-totp.mjs`).
  Sin service role.

## Capturas a 390 px (`reportes/lote-16/`)

Build de producción con un Supabase falso local (solo para las capturas; las pruebas no lo usan).

| Archivo | Qué |
|---|---|
| `1-entrar-credenciales.png` | Paso 1: correo y contraseña |
| `2-entrar-error.png` | Paso 1 con el error genérico |
| `3-entrar-codigo.png` | Paso 2: código (sesión aal1) |
| `3b-entrar-codigo-error.png` | Paso 2 después de un código malo: sigue en el código |
| `4-diagnostico.png` | `/interno/diagnostico` con la barra y "Salir" |
| `5-interno-404.png` | Ruta de /interno que no existe: 404 propio, sin barra ni pie del sitio |

## Pruebas

- `npm test`: 100 en verde (11 archivos). Nuevas: `app/interno.test.js` (sitemap, robots.txt, barra y pie sin
  /interno; nadie fuera importa `@supabase`; nadie importa el script; `server-only`; toda página y route handler
  llama a `exigirCarlos()`; metadata noindex; cookie de intentos), `app/lib/interno/exigirCarlos.test.js`,
  `app/lib/interno/proxy.test.js`, `app/(interno)/interno/acciones.test.js` y `app/lib/medicion.test.js`.
- `npm run test:e2e:interno` (build de producción en el 3100, 390 px): 9 en verde. Sin sesión →
  `/interno/entrar`; cabeceras; head sin canonical ni `og:*`; sin barra ni pie; sin variables no se entra; axe sin
  fallas en la entrada (con y sin error); las públicas no pasan por el proxy.
- `npm run test:e2e` (dev): 98 en verde. Ignora `interno.spec.js`. Las capturas de `reportes/lote-6-componentes/`
  que reescribe se regresaron (deuda conocida).
- `npm run build` limpio.
- **Después del rebase sobre 17d1efa** (lote 14: sin `gsap` ni `react-hot-toast`, `npm ci` limpio): `npm test`
  100/100, `npm run test:e2e:interno` 9/9, `npm run build` limpio y `npm run test:e2e` 98/98 en cinco de seis
  corridas; en la primera falló una prueba (sin registrar cuál; la conocida es `refinar.spec.js` por subpíxel, en
  la deuda de `docs/estado.md`). Las dos últimas, con reporter JSON que guarda el nombre de cada falla: sin fallos.
- **El deploy no se rompe sin Supabase.** `npm run build` con las cinco variables de /interno sin definir
  (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
  `INTERNO_USUARIO_ID`, `INTERNO_SECRETO`; `.env.local` tampoco las tiene) sale con 0, sin errores ni avisos,
  y deja las tres rutas de /interno dinámicas (ƒ). Servido así, `/` y `/boaz` responden 200,
  `/interno/entrar` 200 y `/interno/diagnostico` 307 a la entrada; enviar el formulario da el error genérico.
  Falla cerrado: un Vercel sin las variables despliega el sitio completo y nadie entra a /interno.

## Límite conocido

La cuenta de códigos fallidos no tiene estado en el servidor (no hay tablas en este lote). Una cookie válida
guardada y reenviada dentro de la misma sesión no se distingue. La frenan la contraseña (hace falta para tener la
sesión aal1) y los límites de verificación de Supabase. Si se quiere cerrar del todo, va con la primera tabla.

## Tabla final

### JS y CSS de las páginas públicas (`npm run build`, main 17d1efa → esta rama)

Next 16 con Turbopack ya no imprime el JS por ruta; se suma lo que carga el HTML de cada página.

| Ruta | Scripts | JS (KB) | JS gzip (KB) | CSS (KB) | CSS gzip (KB) |
|---|---|---|---|---|---|
| / | 12 → 12 | 575.5 → 574.8 | 177.5 → 177.3 | 45.0 → 45.0 | 10.0 → 10.0 |
| /sistemas/responde | 12 → 12 | 570.1 → 569.5 | 175.5 → 175.3 | 45.0 → 45.0 | 10.0 → 10.0 |
| /productos | 12 → 12 | 570.1 → 569.5 | 175.5 → 175.3 | 45.4 → 45.4 | 10.3 → 10.3 |
| /boaz | 11 → 11 | 569.4 → 568.8 | 175.0 → 174.8 | 48.7 → 48.7 | 10.9 → 10.9 |

CSS global: mismo tamaño que `main` (46,070 B; el lote 14 lo bajó de 48,362). JS: −0.6 KB por página. El chunk de los medidores
de Vercel pasa de 6,856 a 6,206 B: lleva el filtro de /interno, pero ahora es un solo componente de cliente
(`Medicion.jsx`) en vez de dos. Otro chunk solo cambia de nombre (27,273 B) y el runtime de Turbopack de hash.
Nada de Supabase ni de /interno llega a las públicas.

### Archivos nuevos

| Archivo | Qué |
|---|---|
| `proxy.js` | La primera puerta y las cabeceras de /interno |
| `app/(interno)/layout.jsx` | noindex, `force-dynamic`, noche, sin Header ni Footer |
| `app/(interno)/interno/acciones.js` | Entrar, Verificar y Salir |
| `app/(interno)/interno/BotonEnviar.jsx` | Botón con estado "cargando" (único JS de cliente de /interno) |
| `app/(interno)/interno/not-found.jsx` | 404 de /interno |
| `app/(interno)/interno/entrar/page.jsx` | La entrada en dos pasos |
| `app/(interno)/interno/(protegido)/layout.jsx` | `exigirCarlos()` y la barra |
| `app/(interno)/interno/(protegido)/diagnostico/page.jsx` | "Diagnóstico" |
| `app/(interno)/interno/(protegido)/[[...resto]]/page.jsx` | `/interno` y rutas que no existen → puerta y 404 |
| `app/lib/interno/config.js` | Variables; `null` si falta una |
| `app/lib/interno/sesion.js` | `evaluarSesion()`: la decisión que comparten proxy y servidor |
| `app/lib/interno/servidor.js` | Cliente de Supabase con las cookies |
| `app/lib/interno/exigirCarlos.js` | La puerta del servidor |
| `app/lib/interno/entrada.js` | Qué paso de la entrada se muestra |
| `app/lib/interno/intentos.js` | Cookie firmada de códigos fallidos |
| `app/lib/interno/sesion-proxy.js` | Sesión para `proxy.js` |
| `app/components/Medicion.jsx` | Analytics y Speed Insights con `beforeSend` |
| `app/lib/medicion.js` | `descartarInterno()` |
| `scripts/interno/enrolar-totp.mjs` | Alta del TOTP, a mano |
| `playwright.produccion.config.mjs` | e2e de /interno contra producción |
| Pruebas | `app/interno.test.js`, `app/lib/interno/{exigirCarlos,proxy}.test.js`, `app/(interno)/interno/acciones.test.js`, `app/lib/medicion.test.js`, `e2e/interno.spec.js` |

Cambian: `app/layout.jsx` (solo `<Medicion />`), `package.json` (`@supabase/ssr`, `@supabase/supabase-js`,
`server-only`, `test:e2e:interno`), `vitest.config.mjs` (alias de `server-only`), `playwright.config.mjs`
(ignora `interno.spec.js`), `CLAUDE.md`, `docs/estado.md`, `docs/textos.md`.

### Pasos de Carlos, en orden

| # | Dónde | Paso |
|---|---|---|
| 1 | Supabase | Crear un proyecto **nuevo de STRING** (nunca el de Boaz). |
| 2 | Supabase → Authentication → Sign In / Providers | Apagar "Allow new users to sign up". Dejar Email con contraseña. |
| 3 | Supabase → Authentication → Multi-Factor | Activar TOTP. |
| 4 | Supabase → Authentication → Users | Crear tu usuario (correo + contraseña larga, confirmado) y copiar su **UUID**. |
| 5 | Supabase → Authentication → Rate Limits | Revisar los límites de verificación (respaldo de la cuenta de intentos). |
| 6 | Supabase → Project Settings → API | Copiar la URL y la clave anon (o publishable). **No** la service role. |
| 7 | Terminal | Generar `INTERNO_SECRETO` (solo servidor: **sin** prefijo `NEXT_PUBLIC_`, nunca llega al navegador): `openssl rand -base64 32` (44 caracteres; el mínimo es 32). Uno para local y otro distinto para cada entorno de Vercel. |
| 8 | `.env.local` | Agregar las cuatro: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `INTERNO_USUARIO_ID` (el UUID) e `INTERNO_SECRETO` (el de local). |
| 9 | Terminal, en la raíz del repo | `node scripts/interno/enrolar-totp.mjs` → correo, contraseña (oculta), agregar el URI a tu app de códigos (no compartir, no capturar), Enter, primer código. |
| 10 | Local | `npm run dev` → `/interno/entrar` → contraseña → código → "Diagnóstico". Probar "Salir". |
| 11 | Vercel → Settings → Environment Variables | Las cuatro variables en **Preview y Production**. `INTERNO_SECRETO` con un valor **distinto** en cada entorno (y distinto del de local), generado con `openssl rand -base64 32`; las otras tres pueden ser iguales. |
| 12 | Vercel | Redeploy de la vista previa del PR (las `NEXT_PUBLIC_*` se fijan en el build) y probar la entrada ahí. |
| 13 | GitHub | Visto bueno y fusión del PR. |
