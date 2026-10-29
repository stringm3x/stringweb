# Estado · stringwebs.com

Última actualización: 29 oct 2026 (lote 0). Meta del KB: sitio rehecho del 1 al 7 nov; salir a
vender el 8 nov.

## Lotes

| Lote | Qué | Rama | Estado |
|---|---|---|---|
| 0 | Lectura y plan, docs en el repo, CLAUDE.md | `lote-0-lectura` | ✅ Hecho, sin fusionar |
| 1 | Base: tokens, fuentes, logo SVG, contacto, metadata, barra, pie, legales, redirects, sitemap | — | ⏳ Espera prompt |
| 2 | Salas 1–4: inicio, problema, caso real, niveles | — | ⏳ |
| 3 | Salas 5–7 + /nosotros + preguntas + cierre | — | ⏳ |
| 4 | Formulario /diagnostico y /saas | — | ⏳ |
| 5 | Calidad: Lighthouse, LCP, CLS, contraste, teclado | — | ⏳ |

Producción sigue con la marca anterior. Nada se fusiona a `main` sin el visto bueno de Carlos.

## Arreglos del KB Parte 7

| Arreglo | Dónde está hoy | Lote |
|---|---|---|
| Logo leído "SSTRING" | `app/components/ui/Logo.jsx` (cuadro "S" + palabra) | 1 |
| Meta description con "e-commerce" | `app/layout.jsx:55,80,90` y `app/(sitio)/proyectos/layout.jsx:4` | 1 |
| Legales en inglés | `app/Footer.jsx:172,175` enlaza `/privacy-policy` y `/terms`, que **no existen** (404) | 1 |
| Titular repetido | `app/components/home/Hero.jsx:103`: h1 sr-only + el mismo titular en SVG | 2 |
| /saas dice "STRING GYM" | `saas/page.jsx`, `saas-data.js`, `Caso.jsx`, `DosCaminos.jsx`, `Hero.jsx`, `app/gym/*` | 4 |

## Deuda técnica (no se corrige en el rehecho)

- `/gym/empezar` redirige con `permanent: true` (308), no 301.
- `npm run lint` roto: el parser de `eslint-config-next` exige `typescript`.

## Pendientes de Carlos

- **Domicilio** del responsable para el aviso de privacidad (lo pide la ley) y fecha de publicación.
- **Foto final** de Carlos para la sala 3 (por ahora `public/foto/carlos-respaldo.jpg`).
- **`TURNSTILE_SECRET_KEY`** en `.env.local` y en Vercel: sin el secreto, `/api/diagnostico` no
  puede verificar Turnstile (hoy solo está la clave pública).
- Copy que no está en `docs/textos.md`: title y meta description del sitio, `/saas`, encabezado de
  `/diagnostico`, mensajes de error, 404, título de `/nosotros`, correo que recibe Carlos, textos alt.
  Propuesta de title: "STRING — Software hecho con oficio. Y con arte."
- Si RESTO/CLINIC/BARBER se quitan de `/saas` (propuesta: sí, en el lote 4).
- Si las redes sociales se quedan en el pie (`textos.md` no las lista; propuesta: solo en JSON-LD).
- Del KB, abiertos: precio del boceto, si el sonido se queda, recontar cifras de Evolution GYM.

## Decisiones tomadas en el lote 0

- Conflictos entre docs: paleta del arte del 29 oct; sin bloque "quién soy" en la portada; el
  hero lleva "Ver los niveles"; el botón del formulario dice "Enviar" (todo según `textos.md`).
- Anton deja de cargarse con `next/font`: el logo SVG ya trae la letra a trazo.
- `diseno.md` y `textos.md` se guardaron textualmente desde los documentos que pegó Carlos.
