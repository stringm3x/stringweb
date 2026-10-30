# Lote 9a · /productos + Boaz en todo el sitio (30 oct)

Rama `lote-9a-productos`. Commits: `75bae58` /productos, barra, pie, sitemap, /saas y /gym/empezar → 301 a
/productos#boaz · `fafba40` logotipo y lámina reales de Boaz · `8b71778` Boaz en los textos, galería con su
cuadro y sin luna · el commit de este reporte: docs, `boaz-azul` y estado.

## Qué se hizo
- /productos: encabezado con dos anclas, Boaz sobre pared (`#boaz`), los siguientes, a la medida con la vitrina
  de cinco ejemplos (`#medida`) y el Cierre. Entrada con `--dur-lento` y la curva; con menos movimiento, quieta.
- Boaz: logotipo positivo y escena de la columna de `string-gym-saas`; firma gris; Archivo 900 local (34 KB)
  solo en /productos. Botón "Registra tu gimnasio": /gym/registro registra el gimnasio para la prueba.
- Boaz por su nombre en las salas 3, 4 y 5, preguntas, /nosotros, términos, correo y metadata de /gym/registro.
- Galería: cartela "Boaz" (Geist a trazo), cuadro con la columna y el disco, ciudad de STRING sin luna.
- Docs: textos.md (sección "Productos · lote 9"), CLAUDE.md, diseno.md, sistema/README.md, Galeria; `boaz-azul`
  pasa a `#2979FF` (solo relleno, 3.6:1 sobre papel).

## Métricas (build local, Lighthouse 12 en celular, mediana de 5)
- /productos: rendimiento 96 · accesibilidad 100 · buenas prácticas 96 · SEO 100 · CLS 0 · LCP 2.76 s ✗.
- axe sin fallas; con menos movimiento nada se mueve; teclado: 17 paradas a 1440 y 14 a 375, foco visible.
- `npm run build` limpio, `npm test` 27/27, e2e 56/56. Capturas en `reportes/lote-9a/`.

## Hallazgos
- LCP de todo el sitio: párrafo de entrada, casi todo retraso de pintado. Portada 2.76 s, /sistemas 2.4 s,
  /productos 2.76 s. No se arregla aquí: va con PageSpeed en producción (Fase 0).
- Arreglado en el lote: la entrada del encabezado empezaba en opacidad 0 y dejaba la página sin LCP; ahora solo sube.
- El dibujo de Boaz es copia de uno PROVISIONAL en `string-gym-saas`: cuando llegue el del ilustrador, se copia a mano.
- El KB (§ Boaz y § sitio, línea 339) aún dice que Boaz es interno hasta el IMPI: es de solo lectura, no se tocó.

## Lo que no pude comprobar
- PageSpeed en producción ni un celular real; el correo de diagnóstico real con el texto "ofrécele Boaz".

## Pendiente para el 9b
- La página propia de Boaz y su enlace "Conoce Boaz →" en /productos.
- El cuerpo de /gym (etiqueta, pregunta del formulario, mensaje de WhatsApp de gracias) con Boaz.
- Escala en el selector de plan de /gym/registro ($2,999).
- "Ver planes" de /gym/registro apunta a /saas#planes (hoy pasa por el 301).
- `Caso.jsx` y `ui/Cierre.jsx`, sin uso desde que se borró /saas.
