# Lote 3 · Salas 5–7, preguntas, cierre y /nosotros — reporte

Rama `lote-3-salas-5-7` (desde `lote-2-salas-1-4`), 29 oct 2026. Sin fusionar. `npm run build` limpio, `npm test` 11/11.

**Hecho (un commit por bloque):**
1. Sala 5 Galería (pared, `#galeria`) y Sala 6 Cómo trabajamos (pared): los cinco pasos, el edificio, el bloque "Nuestro estándar" con las cifras en Geist Mono, "Días hábiles: lunes a viernes, de 9 a 19 h." en texto chico (lo pidió Carlos) y la frase de garantía.
2. Sala 7 Continuidad (noche), las preguntas frecuentes (`<details>`, sin JS) y el cierre con WhatsApp aparte. La portada queda: salas 1–7 · preguntas · cierre.
3. `/nosotros` reescrito como componente de servidor: etiqueta, titular, foto, los tres párrafos y Salmos 73:25–26 en Geist Mono. Sin GSAP ni el copy anterior.
4. `sala2-escultura.svg` con `viewBox="0 150 560 470"` y alto 470 (Sala2 ajustada). Se borran `PlanesContinuidad` y `Us`.
5. Arreglo: el ancla deja la sala 15 a 23 px por debajo de la barra fija (`scroll-mt-24`).

**Verificado:**
- Texto: 61 frases de las salas 5–7, preguntas y cierre (con los alt) y las 8 de /nosotros coinciden palabra por palabra. Una sola marca falsa del script, por la línea toda en negritas "Desde $1,800 al mes."; en la página está.
- Alternancia como en diseno.md: salas 1–4 noche · 5 y 6 pared (`#F4F2EC`) · 7, preguntas y cierre noche.
- `/#niveles`, `/#galeria`, `/servicios` y `/proyectos` llegan a su sala, a 375 y a 1440 px.
- Teclado: Tab llega a las ocho preguntas y a los dos botones del cierre, con foco visible; Enter abre la pregunta.
- Con menos movimiento, 0 animaciones en `/` y en `/nosotros`. A 375 px no hay scroll horizontal.
- Capturas en `reportes/lote-3-salas-5-7/` (portada de la galería al pie, y /nosotros, a 375 y 1440 px).

**Decisiones a revisar:**
- Las cartelas de la galería (y los pasos del edificio) vienen dibujadas en los SVG: no las repito en HTML.
- La danza es decorativa (`alt=""`); textos dice que lo es si el texto ya se entiende solo.
- El estándar es una lista de definiciones, no una tabla: en celular la tabla partía las cifras en tres renglones.
- En preguntas van en Geist Mono los precios y porcentajes; las semanas, no.
- /nosotros termina en la cita: textos no le pone cierre ni botón.

**Pendientes:**
- TODO(dato): la foto final de Carlos, en la sala 3 y en /nosotros.
- En celular la galería mide 343 px y sus cartelas dibujadas no se leen. Puede ir con scroll lateral, como la tira de cine, si Carlos quiere.
- Lote 5: peso de `sala5-galeria.svg` (87 KB), `sala6-arquitectura.svg` (128 KB) y `sala7-danza.svg` (269 KB); letreros de los SVG en fuente del sistema; Lighthouse, LCP y CLS.
- Siguen sin cambio: la 404 (diseño viejo), `Grano`, `CustomCursor` (su punto asoma en una esquina) y `font-anton` en /saas, forms y gym.
