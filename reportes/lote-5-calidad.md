# Lote 5 · Calidad — reporte

Rama `lote-5-calidad` (desde `lote-4-contacto`), 29 oct 2026. Sin fusionar. `npm run build` limpio (también sin
red), `npm test` 15/15, `npm run test:e2e` 19/19. Lighthouse 12 en celular, vista previa de Vercel, mediana de 3.

| Meta | Antes (lote 4) | Después (lote 5) | ¿Cumple? |
|---|---|---|---|
| Rendimiento ≥ 90 | 86–95 (`/` 86) | 94–97, `/` 88 · ronda rápida: 96–100 | `/` solo en ronda rápida |
| Accesibilidad ≥ 95 | 98–100 | 100 en las 6 · axe: 0 fallas WCAG A/AA | Sí |
| Buenas prácticas ≥ 95 | 100 | 100 | Sí |
| SEO ≥ 95 | 58–61* | 100 sin las 2 auditorías de la vista previa* | Sí (*) |
| LCP < 2.5 s | 2.78–3.79 (todas) | 2.64–3.63 · ronda rápida: 1.61–2.13, legales 2.65 | No, ver abajo |
| CLS < 0.1 | 0 | 0 | Sí |
| Contraste ≥ 4.5:1 | firma 4.51:1 | axe 0 fallas; "by STRING" en negro | Sí |

\* La vista previa manda `X-Robots-Tag: noindex` y Lighthouse pide `robots.txt` sin el bypass: en producción no pasa.

**LCP, lo que se sabe:** el Chrome de Lighthouse en esta Mac cae en dos modos con el mismo código. En el lento la
pantalla queda en blanco hasta ~1.33 s (legales) o ~2.35 s (`/`), sin nada que bloquee en el HTML; así salió el
"antes" y la última ronda. En el rápido pinta a ~0.4 s. En Playwright con la CPU a 4× el primer pintado real es
0.4–0.5 s en todas. **Falta confirmarlo con PageSpeed Insights en producción** antes de dar la meta por cumplida.

**Hecho (un commit por bloque):**
1. Fuera `PageTransition` (tapaba la página hasta hidratar), cursor propio, Lenis, SplitType y `Grano`. Menú del
   celular con CSS. GSAP solo en /saas y /gym (diseño anterior). Titular con `clip-path`: cuenta desde el inicio.
2. SVGO: `public/arte` de 1,027 a 459 KB, sin diferencia visible (≤ 3 px distintos por SVG a 2×).
3. Letreros de cine y galería a trazo de Geist y Geist Mono; cartela del gimnasio a 196 de ancho, centrada.
4. 404 con textos.md y sin Anton; "by STRING" en negro sobre el verde; fuera `Mancha` y `Sello`.
5. Fuentes locales (`geist` 1.8.2, OFL) por el build roto en Vercel; variables, de 115 a 46 KB, se ven igual.
6. Menú con foco atrapado y de vuelta al botón; h2 en los planes de /saas; `e2e/calidad.spec.js` con axe, menos
   movimiento (0 animaciones), la 404 y el menú con teclado en las 7 páginas a 375 px.

**Verificado:** textos alternativos iguales a textos.md; Tab con foco visible en barra, menú, formulario y pie;
capturas a 375 px en `reportes/lote-5-calidad/` (portada, /nosotros, /diagnostico, /saas, 404 y la cartela).

**Pendientes:**
- PageSpeed Insights en producción después de fusionar, para cerrar LCP y rendimiento de `/`.
- /saas y /gym siguen con el diseño anterior (Anton, TitularBrochada, GSAP).
- Hay dos `<meta name="viewport">` en el `<head>`; no afecta las metas.
