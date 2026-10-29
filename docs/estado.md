# Estado · stringwebs.com

Última actualización: 29 oct 2026 (lote 2). Meta del KB: sitio rehecho del 1 al 7 nov; salir a
vender el 8 nov.

## Lotes

| Lote | Qué | Rama | Estado |
|---|---|---|---|
| 0 | Lectura y plan, docs en el repo, CLAUDE.md | `lote-0-lectura` | ✅ Hecho, sin fusionar |
| 1 | Base: tokens, fuentes, logo SVG, contacto, metadata, barra, pie, legales, redirects, sitemap | `lote-1-base` | ✅ Hecho, sin fusionar |
| 2 | Salas 1–4: inicio, problema, caso real, niveles | `lote-2-salas-1-4` | ✅ Hecho, sin fusionar |
| 3 | Salas 5–7 + /nosotros + preguntas + cierre | — | ⏳ |
| 4 | Formulario /diagnostico y /saas | — | ⏳ |
| 5 | Calidad: Lighthouse, LCP, CLS, contraste, teclado | — | ⏳ |

Producción sigue con la marca anterior. Nada se fusiona a `main` sin el visto bueno de Carlos.

## Arreglos del KB Parte 7

| Arreglo | Dónde está hoy | Lote |
|---|---|---|
| Logo leído "SSTRING" | ✅ `Logo.jsx` con el SVG del sistema | 1 |
| Meta description con "e-commerce" | ✅ metadata de textos.md; `/proyectos` retirada | 1 |
| Legales en inglés | ✅ `/aviso-de-privacidad` y `/terminos`; 301 desde las rutas en inglés | 1 |
| Titular repetido | ✅ un solo `<h1>` tecleado en `salas/TitularTecleado.jsx` | 2 |
| /saas dice "STRING GYM" | `saas/page.jsx`, `saas-data.js`, `Caso.jsx`, `DosCaminos.jsx`, `Hero.jsx`, `app/gym/*` | 4 |

## Deuda técnica (no se corrige en el rehecho)

- Nombres de color y tipos de la marca anterior en `tailwind.config.js` (marcados "legado") hasta
  que se rehagan las salas; luego se borran.

- `/gym/empezar` redirige con `permanent: true` (308), no 301.
- `npm run lint` roto: el parser de `eslint-config-next` exige `typescript`.

## Pendientes de Carlos

- **Domicilio** del responsable para el aviso de privacidad (lo pide la ley) y fecha de publicación.
- **Foto final** de Carlos para la sala 3 (por ahora `public/foto/carlos-respaldo.jpg`).
- **`TURNSTILE_SECRET_KEY`** en `.env.local` y en Vercel: sin el secreto, `/api/diagnostico` no
  puede verificar Turnstile (hoy solo está la clave pública).
- Del KB, abiertos: precio del boceto, si el sonido se queda, recontar cifras de Evolution GYM.

## Pendientes para lotes siguientes (del lote 1)

- Lote 4: `FormSuccess.jsx`, `gym/gracias` y `api/quote/email-template.js` a `app/lib/contacto.js`
  (todavía dicen `hola@stringwebs.com`); el título de `/saas` sale con "STRING" dos veces.
- 404 con el copy de textos y retirar `Grano` y `font-anton` cuando se rehagan las salas.
- Lote 3: en la portada siguen `PlanesContinuidad`, `Us` (quién soy, se retira) y el `Cierre` viejo.
- Lote 5: peso de `sala2-escultura.svg` (141 KB) y `sala3-cine.svg` (389 KB); LCP del titular
  tecleado; las letras dentro de la tira de cine caen en monospace del sistema.

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
