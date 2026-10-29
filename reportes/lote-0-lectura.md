# Lote 0 · Lectura y plan — 29 oct 2026

**Rama:** `lote-0-lectura` (3 commits, sin push, sin tocar `app/`, `next.config.mjs` ni `package.json`).

## Hecho
- Paquete de `string-sitio/` movido a `docs/` (kb, sistema) y `public/` (logo, arte, foto); carpeta borrada.
- `docs/diseno.md` y `docs/textos.md` guardados textualmente desde los documentos pegados en el chat.
- `CLAUDE.md` reescrito: reglas y metas del brief, identidad nueva, siete salas, rutas y redirects,
  contacto, cifras, lotes. Se quitaron reglas viejas que contradicen el KB.
- `docs/estado.md` creado: lotes, arreglos, deuda técnica, pendientes.

## Lo que encontré
- Stack: Next 16, React 19, Tailwind 3.4, JS puro, GSAP, Lenis, RHF + zod, nodemailer, Vitest (`npm test`).
  Despliegue en Vercel desde GitHub `stringm3x/stringweb`.
- WhatsApp `525545524847` en 4 lugares (`header.jsx`, `Footer.jsx`, `FormSuccess.jsx`, `layout.jsx`).
- `/privacy-policy` y `/terms` no existen: el pie enlaza a un 404.
- El código tiene 4 niveles con nombres viejos (Conversión…Especializado) y continuidad
  Base/Crecimiento/Escalamiento; el KB tiene 5 niveles y Cuida/Mejora/Impulsa. Se cambia en lotes 2–3.
- `lib/stats.js` muestra 129/70 socios; el sitio debe salir sin cifras de socios (lote 2).
- CLAUDE.md viejo citaba `/alta/[slug]` y tests de `/diagnostico` que no existen.

## Bloquea o falta
- Domicilio y fecha para los legales (lote 1).
- `TURNSTILE_SECRET_KEY` para el formulario (lote 4).
- Copy que no está en `textos.md`: title y meta, `/saas`, intro de `/diagnostico`, errores, 404,
  correo interno, alt. Foto final de Carlos.

## Metas
No aplican en este lote (sin cambios de código). `npm run build` limpio; `npm test`: 11/11 en verde.

## Siguiente
Lote 1 · Base, con tu prompt.
