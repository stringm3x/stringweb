# Lote 1 · Base — reporte

Rama `lote-1-base` (desde `lote-0-lectura`), 29 oct 2026. Sin fusionar. `npm run build` limpio, `npm test` 11/11.

**Hecho (un commit por bloque):**
0. `docs/textos.md`: se agrega "Textos que faltaban (29 oct)" tal como la pegó Carlos (no estaba en el repo).
1. Tokens de `tokens.json` como variables CSS con temas `noche` (por defecto) y `pared`; paleta de la casa y materiales del arte aparte. Geist (400/500/600) y Geist Mono (400/500); Anton y Ubuntu Mono ya no se cargan.
2. `Logo.jsx` con el SVG del sistema: parpadeo de 1.1 s `steps(1)`, fijo con menos movimiento. `app/icon.svg` y `app/apple-icon.png` desde `string-icono.svg`; fuera los favicons PNG viejos.
3. `app/lib/contacto.js` (correo y WhatsApp). Título, descripciones, JSON-LD (redes solo en `sameAs`) e imagen para compartir según textos.
4. Barra y pie según textos, sin íconos de redes. `Boton` en píldora (Geist 17 px, mínimo 44 px).
5. `/aviso-de-privacidad` y `/terminos` (fecha 7 nov 2026). `/cotizacion` pasa a `/diagnostico` (el formulario no se tocó). Se borran `/servicios` y `/proyectos`. Redirects 301 y sitemap.

**Verificado:** `curl -I` → las 11 rutas viejas dan **301** con su destino final (`/#niveles`, `/#galeria`, `/diagnostico`, `/nosotros`, `/aviso-de-privacidad`, `/terminos`); `/gym/empezar` sigue en 308. Los enlaces de la barra y el pie dan 200 (`mailto` y `wa.me` son externos). Sin scroll horizontal a 375 px. Logo: se lee STRING a 27, 31, 53 y 124 px de alto, con el bloque encendido y apagado. Capturas en `reportes/lote-1-base/`.

**TODO(domicilio):** `/aviso-de-privacidad` muestra "[domicilio por confirmar]" a propósito. Carlos tiene que mandarlo antes de publicar.

**Decisiones a revisar:**
- Logo: el `preview.html` deja la I de Anton debajo del bloque y se asoma blanca por el calado. Seguí el README ("encendido: la I en negativo"), así que la I de Anton solo se ve con el bloque apagado.
- Los nombres de color viejos (`tinta`=#fff, `acido`, `linea`…) quedan como legado: los usan ~35 archivos de salas que se rehacen en los lotes 2 a 4. `font-anton` ahora cae en Geist.
- El nuevo `Boton` cambia cómo se ven los botones de las salas viejas y del formulario. La lógica no cambió.
- La imagen para compartir usa `app/fonts/Geist-SemiBold.woff` (OFL, de fontsource) porque Satori no lee woff2.

**Fuera de alcance; lo dejo para lotes siguientes:**
- `/saas`: su título sale "STRING SaaS — … · STRING" por la nueva plantilla. Lote 4, con el título de textos.
- `hola@stringwebs.com` y el WhatsApp fijo en el código siguen en `FormSuccess.jsx`, `gym/gracias` y `api/quote/email-template.js`. Lote 4.
- `app/lib/stats.js` todavía exporta las cifras de socios (129/70). La sala 3 las quita en el lote 2.
- La 404 sigue con el diseño viejo; su copy ya está en textos. `Grano` sigue montado en el layout.
- `/#niveles` y `/#galeria` caen en la portada vieja, que no tiene esos anclas, hasta los lotes 2 y 3.

**Metas sin medir todavía:** Lighthouse, LCP, CLS y contraste en las salas viejas (lote 5). El contraste de barra, pie y legales usa los pares de `tokens.json` (≥ 7.5:1).
