# Lote 6 · Componentes de calidad — reporte

Rama `lote-6-componentes`, 8 commits, sin fusionar. `npm run build` limpio, `npm test` 16/16, `npm run test:e2e` 28/28.
Capturas: `reportes/lote-6-componentes/estados/` (8 estados, 375 px) y `paginas/` (7 páginas a 375 y 1440 px).
**Hecho.** `docs/calidad.md` en el repo y en CLAUDE.md, con los dos ajustes aprobados: borde del campo `#5A5A5E` y colores
sin transición. Tokens `--dur-rapido/normal/lento`, `--curva`, `--parpadeo`, `--alerta`, `--borde*` y `--acento-presionado`;
el arte guarda sus tiempos en `--arte-dur-*`, sin cambiarlos. Botón con 8 estados; `Campo`, `Opciones` y `Tarjeta` nuevos
(la tarjeta no se aplica todavía); barra con fondo al bajar, menú a pantalla completa y View Transitions nativo.
**Arreglos:** el número de los pasos de "Cómo trabajamos" vive solo en el dibujo (Carlos, 29 oct); el SVG del logo se oculta al lector dentro de "STRING, inicio".
**Antes de publicar (docs/calidad.md § 4)**
- [x] Estados capturados. Lo que no aplica está en `estados/no-aplica.txt`.
- [x] Ninguna duración ni curva suelta: lo comprueba `app/tokens.test.js` (Vitest solo lee `app/**`).
- [x] Menos movimiento: `getAnimations()` en cero en todas las páginas y en el muestrario.
- [x] Teclado y foco: menú con foco atrapado y foco visible en los capturados. El foco pasa de verde a línea (tinta sobre pared).
- [x] axe sin fallas en 7 páginas y en el muestrario. Respuesta en menos de 100 ms (píldora; botón: 56 ms a "Enviando").
- [x] 375 y 1440 px capturadas. A 320 px (equivale a 400 %) ninguna página se desborda; solo el arte, dentro de su caja.
- [x] Textos de textos.md. "Enviando", "Enviado" e "Intenta de nuevo" vienen de calidad.md. El muestrario dice "de ejemplo".

**Lighthouse**, celular, `next start` local, Lighthouse 12, mediana de 3. La vista previa de Vercel no se usó: pide subir la rama.
| | Rend. | Acces. | Buenas pr. | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 97 | 100 | 96* | 100 | 2.69 s | 0 |
| `/diagnostico` | 96 | 100 | 96* | 100 | 2.71 s | 0 |
| `/nosotros` | 98 | 100 | 96* | 100 | 2.46 s | 0 |

\* Los scripts de `/_vercel` dan 404 fuera de Vercel (errores en consola). **LCP:** `main`, medido igual, da lo mismo (96 y 2.76 s
en `/`), así que el lote no lo bajó. Sigue pendiente confirmarlo en PageSpeed de producción (lote 5).

**Intención de cada animación**
Cursor en hover: la firma, "esto es lo que sigue"; "Enviando ▍": el sistema escribe. `scale(.97)`: tu toque llegó. Flecha
que avanza: te lleva a otro lado. Tarjeta que sube con la cuerda encendida: esto se abre. Fondo de la barra: ya no estás arriba.
Menú con fundido y 8 px: se puso encima. Fundido entre páginas: cambiaste de sala. "Enviado" durante `--dur-lento`: llegó.

**Excepciones y avisos**
- El grep deja fuera el legado de /gym y /saas (`app/gym/**`, `TitularBrochada`, `FormField`, `FormSelect`) y las constantes en JS del arte (tecleo, estrellas, cuerdas).
- Ajustes de Carlos: píldora con borde `#5A5A5E` (3:1); cursor ▍ también en presionado y foco (`estados/…-presionado-dedo.png`, toque a 375 px).
- `BotonSonido` (sala 4) sigue igual: es un interruptor del arte. /gym hereda el botón: fuera `barrido`; "Enviando…" → "Enviando ▍".
- `experimental.viewTransition` (Next 16.1) es experimental; con el flag apagado la navegación funciona igual (deuda en estado.md). `/muestrario`: solo en desarrollo (404 en
  producción, fuera del sitemap); en las capturas de páginas sale la "N" del modo dev.
