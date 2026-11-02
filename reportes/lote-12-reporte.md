# Lote 12 · Refinar — reporte

Rama `lote-12-refinar` desde `main` (`8503fbd`). Commits: `cd21046` arte · `1ecc376` tarjeta · `c6be0ba` hilo ·
`bf2a201` pruebas · docs. Plan aprobado por Carlos, con su ajuste al hilo (máximo 2–3 por página).

## Qué se hizo
- **Tarjeta con su dibujo** (`ui/Tarjeta.jsx`, camino B del lienzo): zona de 180 px en noche con número en mono y
  suelo `#2E2E32`, la cuerda (2 o 3 px) y el texto de siempre. Sin dibujo, igual que antes. Sube 2 px (calidad.md,
  no los 4 del lienzo); radio 16; textos sin cambio (en /productos sigue "Productos" / "A la medida").
- Usos: los diez giros de /tu-negocio (dos grupos, 01–05 cada uno) y los cinco de /empresas; las dos puertas de
  /productos (Boaz con su lámina recortada sobre papel; "A la medida" con su pantalla); /sistemas y "Cuando
  crezcas" con el dibujo chico de cada nivel, que sustituye a la viñeta. Sin dibujo: la vitrina, los niveles de
  los giros grandes y "Ver los cinco niveles".
- **Dibujos nuevos**: Gimnasios (mancuerna y disco, sin lámina ni azul), "A la medida" y los cinco niveles en chico,
  sin texto adentro (los grandes no se leían a 180 px). Hoja: `lote-12/dibujos-hoja.jpg`.
- **Generadores** en `scripts/dibujos/`: `dibujar.mjs` (lote 12) y `giros.mjs` (el del lote 11 seguía en un
  scratchpad: se recuperó y reproduce los nueve byte a byte), con `svgo.config.mjs`.
- **svgo** a los 16 SVG (una décima, sin juntar caminos): 490,621 → 328,005 B; gzip 119,837 → 64,444 B. Los clips
  del rayado siguen todos; diferencia visual < 0.05 % de píxeles, solo en el suavizado.
- **Hilo** (`ui/Hilo.jsx`): cuerda a mano `#5A5A5E` de 1.2 px, aria-hidden, 24 px fijos sobre el borde de su sección.
  Se dibuja con `clip-path` (lento, curva); con menos movimiento, completa. Hilos por página: portada 1 (antes del
  Cierre), /productos 2, /tu-negocio 1, /nosotros 5 (las cuatro paradas y el Cierre), /sistemas, niveles y giros
  con local 1 (el Cierre); /boaz, /empresas y giros grandes 0. Lo demás, línea recta.

## Verificación
- `npm run build` limpio · `npm test` 37/37 · e2e 94/94 (16 nuevas en `e2e/refinar.spec.js`). axe sin fallas.
- Lighthouse local en celular (`next start`, tres corridas o más):
  - /tu-negocio: rendimiento 97–99 · accesibilidad 100 · SEO 100 · CLS 0 · LCP 1.96–2.55 s (main: 2.31 s).
  - /productos: rendimiento 96–98 · accesibilidad 100 · SEO 100 · CLS 0 · LCP 2.25–2.77 s (main: 2.77 s).
- **No se cumple:** LCP < 2.5 s en la mayoría de las corridas de /tu-negocio (~2.54 s, contra 2.31 s en main). El
  LCP es el párrafo de entrada; los dibujos se piden temprano aunque sean perezosos. Va a la deuda de LCP de estado.md.
- Buenas prácticas 96 en local: el 404 de los scripts de Vercel Analytics, que no pasa en Vercel.
- Capturas en `reportes/lote-12/`: /tu-negocio, /productos y /sistemas a 1440 y 390; hover y foco; /nosotros y
  barberías a 1440 y 390, con y sin menos movimiento; el hilo a medias, completo y quieto; estados en `estados/`.

## Notas
- El muestrario da 404 en producción: el hover y el foco se capturaron sobre /tu-negocio; los 8 estados, en e2e.
- La suite e2e reescribe las capturas del lote 6: se regresaron a mano otra vez (deuda ya anotada).
