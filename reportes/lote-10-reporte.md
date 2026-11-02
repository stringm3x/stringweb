# Lote 10 · /nosotros como recorrido y la sala 3 sin foto (2 nov)

Rama `lote-10-nosotros`. Commits: `717158b` textos · `09c6b67` sala 3 · `d728774` /nosotros · `e783a9f` arreglo
del movimiento · `652d4a6` pruebas · el commit de este reporte: estado y reporte.

## Qué se hizo
- /nosotros: encabezado con índice de anclas y la foto 5:6 (la única del sitio), 01 historia con línea de tiempo,
  02 método sobre pared con cinco planos, 03 equipo con la mesa, 04 fe con Geist Italic real (22 KB, sin precarga).
- Sala 3: sin foto. Cuadro 1 "LA ENTRADA" y cuadro 2 "EL MOSTRADOR" redibujados en línea con sombra rayada; alt nuevo.
- `Entra` pasa a `app/components/ui/`; la sala 6 lleva `id="como-trabajamos"`. Foto final: `public/foto/carlos.jpg`.
- Decisiones de Carlos: borde de la foto en hairline (no #3A3A3D); el cuadro 1 es la entrada, no el mostrador.

## Métricas (build local, Lighthouse 12 en celular, 3 pasadas)
- /nosotros y /: rendimiento 95–98 · accesibilidad 100 · buenas prácticas 96 (404 de la analítica de Vercel,
  que solo existe en Vercel) · SEO 100 · CLS 0 · LCP ✗ (abajo).
- axe sin fallas; con menos movimiento todo quieto y dibujado; índice con teclado y foco visible.
  Build limpio, `npm test` 27/27, e2e 65/65. Capturas a 1440 y 390 px, quietas y a media animación, en `reportes/lote-10/`.

## Hallazgo: el LCP de todo el sitio (va en un lote propio, sin arreglar aquí)

| Página | LCP simulado | LCP observado | Elemento LCP |
|---|---|---|---|
| / | 2.70–2.71 s | 0.06–0.10 s | párrafo de entrada de la sala 1 (`p.max-w-[680px]`) |
| /sistemas | 2.39–2.40 s | 0.05–0.06 s | el titular (`header > h1`), no el párrafo |
| /productos | 2.26–2.77 s | 0.04 s | párrafo de entrada (`header > p.text-cuerpo-l`) |
| /boaz | 2.85 s | 0.04 s | párrafo de entrada (`div > p.mt-6`) |
| /nosotros | 2.26–2.84 s | 0.05 s | párrafo de entrada (`header > p.text-cuerpo-l`) |

En todas, el tiempo es retraso de pintado (TTFB 0.45 s; carga 0). El observado es igual al FCP.
Hipótesis: no es la letra (Geist con swap y precarga) ni la animación de entrada (el LCP observado coincide con
el FCP): es la simulación de red lenta, que antes de pintar carga el CSS que bloquea el render (~430 ms estimados)
y 17 scripts (228 KB) de la hidratación. Medirlo primero con PageSpeed en producción.

## Encontrado y arreglado en el lote
- Los planos y la línea se animaban también al esconderse: al bajar rápido, los planos 2–5 no se completaban.
  Ahora la transición solo va al llegar. En celular, cada dibujo entra cuando se ve, no con su parada.

## Pendiente
- Fusionar con el OK de Carlos. El lote del LCP.
