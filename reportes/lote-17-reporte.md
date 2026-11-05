# Lote 17 · Precios con IVA incluido

Rama `lote-17-precios-iva`, desde `main` 4fca720. Sin fusionar hasta el visto bueno de Carlos.

Decisión del 4 nov: todos los precios públicos de STRING y Boaz van con IVA incluido. Este lote cambia los
precios, agrega la etiqueta "IVA incluido" y confirma que el paquete GYM no está en el sitio. Ningún otro texto,
diseño ni orden cambia. No se tocan /interno, el aviso de privacidad ni los términos.

## Precios

| Qué | Antes | Ahora |
|---|---|---|
| Responde | Desde $8,000 | Desde $9,500 |
| Organiza | Desde $18,000 | Desde $21,000 |
| Automatiza | Desde $28,000 | Desde $32,500 |
| Controla | Desde $40,000 | Desde $46,500 |
| Empresa | Se cotiza | Se cotiza (sin mínimo publicado) |
| Continuidad | Desde $1,800 al mes | Desde $2,100 al mes |
| Cuida · Mejora · Impulsa | sin precio en pantalla | sin precio en pantalla; $2,100 · $3,500 · $5,800 solo en `precios.js` |
| Boaz Starter | $799 al mes · $7,990 al año | sin cambio |
| Boaz Pro | $1,799 al mes · $17,990 al año | $1,299 al mes · $12,990 al año |

Escala y Pro fundador no aparecen en el sitio. El boceto sigue sin precio. El paquete GYM a medida
($45,000–$55,000) no estaba en ninguna página pública: no hubo que quitar nada ni tapar huecos.

## Bloques (un commit cada uno)

1. **Inventario** (sin cambios): tabla de cada precio viejo por archivo y línea, aprobada por Carlos.
2. `refactor(precios): una sola fuente en app/lib/precios.js`: los precios estaban escritos en 9 archivos y
   ahora todos leen de `app/lib/precios.js`. En ese commit nada cambia en pantalla (se comprobó en el HTML generado).
3. `feat(precios): precios con IVA incluido y la etiqueta junto a cada precio`: valores nuevos, la etiqueta y los textos.
4. `test(precios): …`: las pruebas del lote.
5. `docs: lote 17 …`: `docs/estado.md` y este reporte.

## La etiqueta "IVA incluido"

Un componente, `app/components/ui/IvaIncluido.jsx`: `text-etiqueta` (12 px), `text-texto-suave` y
`whitespace-nowrap`, en la misma familia mono que el precio que acompaña (Ubuntu Mono en /boaz, Geist Mono en el resto).

- **Dónde va:**
  - Junto a cada "Desde" de los niveles: sala 4, tarjetas de /sistemas, resumen de la página de nivel, tarjeta
    "Cuando crezcas", ficha de la obra, escaleras de /tu-negocio y de los giros grandes, ejemplos de /productos.
  - Junto al "Desde" de la continuidad: sala 7 y "Después" en la ficha.
  - Junto a cada precio de Boaz, mensual y anual, en /productos y en /boaz.
- **Dónde no va:** "Se cotiza" no lleva etiqueta. En texto corrido solo cambia la cifra (lista de /sistemas,
  nota del correo de diagnóstico); las CTA "DESDE $9,500 →" de /tu-negocio tampoco la llevan.
- **Preguntas frecuentes:** "…desde $9,500 (IVA incluido)." y "…cada mes, desde $2,100 (IVA incluido)."
- **/gym/registro:** las opciones del selector no llevan etiqueta. Debajo del selector, como segunda línea de la
  ayuda que ya existía (mismo estilo y mismo `aria-describedby`): "Precios con IVA incluido."
- **Contraste:** neblina sobre noche ≈ 7.6:1; `--texto-suave` de Boaz sobre papel ≈ 6.3:1, y más sobre la
  columna clara de Pro. Todo pasa 4.5:1.
- **CSS:** usa solo clases que ya existían. El CSS global queda igual que en `main` (50,702 B): no crece.

En las capturas se vieron dos fallas y se corrigieron antes del commit: la etiqueta se partía en dos en la
columna de 240 px de la sala 4 (de ahí `whitespace-nowrap`) y en /productos faltaba un espacio ("AL MESIVA incluido").

## Textos y documentos

- `docs/textos.md`: precios nuevos en todas sus secciones, una nota en cada lugar donde va la etiqueta y la sección
  "Precios con IVA incluido · lote 17 (4 nov)", con los textos nuevos de las preguntas y de /gym/registro.
- `docs/pagina-nivel.md`: continuidad desde $2,100.
- `CLAUDE.md`: precios nuevos y una línea sobre el IVA.
- `docs/estado.md`:
  - fila del lote 17;
  - al final de la fila del lote 16: "Supabase de STRING configurado y TOTP dado de alta (4 nov)";
  - fuera de pendientes el punto de /interno;
  - pendiente nuevo: "`docs/kb/` está desactualizado frente al KB del proyecto (edición 10: precios con IVA).
    Reemplazar la copia."
  - No había un pendiente de "precios con IVA en el sitio".
- **No se tocó** `docs/kb/KB-Maestro-STRING.md` (solo lectura): sigue con los precios viejos y el paquete GYM.

## JSON-LD

`app/layout.jsx` solo tiene `Organization`, sin `offers`. No se agregan (van en el lote 18). La prueba revisa que
el JSON-LD no traiga precios distintos a los de `precios.js`.

## Pruebas

`app/lib/precios.test.js`, 4 pruebas nuevas:

- `precios.js` tiene exactamente los valores de arriba (niveles, continuidad con Cuida, Mejora e Impulsa, Boaz y la
  etiqueta).
- Ningún archivo de `app/` fuera de /interno (sin contar las pruebas) contiene un precio viejo de la lista, ni con
  formato (`$8,000`) ni sin él (`8000`).
- "Escala", "Pro fundador" y el paquete GYM no aparecen en el código público, ya sin comentarios.
- El JSON-LD no trae cifras ni `price` distintos a los de `precios.js`.

Comprobé que las pruebas detectan fallas: con "Escala $1,799" en una tarjeta y un `offers` de $8,500 en el JSON-LD,
fallan las tres; se regresó el cambio.

Se actualizaron con los valores nuevos `niveles.test.js`, `giros.test.js` y `api/diagnostico/route.test.js`.

## Verificación

| Qué | Resultado |
|---|---|
| `npm test` | ✅ 112 de 112 (12 archivos) |
| `npm run test:e2e` | ✅ 98 de 98 (en serie, `--workers=1`) |
| `npm run test:e2e:interno` | ✅ 9 de 9 |
| `npm run build` | ✅ limpio, sin errores ni avisos |
| Capturas | 390 y 1280 px de /sistemas, /sistemas/responde, sala 4, /productos#boaz, /boaz#planes y /gym/registro, revisadas por Carlos |

`e2e/componentes.spec.js` volvió a reescribir las capturas de `reportes/lote-6-componentes/` (deuda conocida); se
regresaron a mano y no van en el PR. `npm run lint` sigue roto (deuda conocida).

### JS y CSS de las páginas públicas (`npm run build`, main 4fca720 → esta rama)

Se suma lo que carga el HTML de cada página.

| Ruta | Scripts | JS (KB) | JS gzip (KB) | CSS (KB) | CSS gzip (KB) |
|---|---|---|---|---|---|
| / | 12 → 12 | 574.8 → 574.8 | 177.3 → 177.3 | 45.0 → 45.0 | 10.0 → 10.0 |
| /sistemas/responde | 12 → 12 | 569.5 → 569.5 | 175.3 → 175.3 | 45.0 → 45.0 | 10.0 → 10.0 |
| /productos | 12 → 12 | 569.5 → 569.5 | 175.3 → 175.3 | 45.4 → 45.4 | 10.3 → 10.3 |
| /boaz | 11 → 11 | 568.8 → 568.8 | 174.8 → 174.8 | 48.7 → 48.7 | 10.9 → 10.9 |

Sin cambio: los precios y la etiqueta se pintan en el servidor.

## Archivos nuevos

- `app/lib/precios.js`: fuente única de los precios.
- `app/components/ui/IvaIncluido.jsx`: la etiqueta.
- `app/lib/precios.test.js`: las pruebas del lote.

## Pendiente de Carlos

- Reemplazar la copia de `docs/kb/` por el KB del proyecto, edición 10.
- Visto bueno para fusionar y publicar.
