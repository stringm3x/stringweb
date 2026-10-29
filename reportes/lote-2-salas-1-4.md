# Lote 2 · Salas 1–4 — reporte

Rama `lote-2-salas-1-4` (desde `lote-1-base`), 29 oct 2026. Sin fusionar. `npm run build` limpio, `npm test` 11/11.

**Hecho (un commit por bloque):**
0. Viñeta de Responde: el SVG que mandó Carlos (solo el libro, en verde), sin el bloque de metadatos C2PA.
1. Sala 1 Inicio: un solo `<h1>` con la frase completa en el DOM, escrito letra por letra con CSS (sin JS) y con el cursor parpadeando a 1.1 s al final. Abajo la ciudad de una línea y la luna (componente Ciudad); arriba las estrellas, lejos del texto. Botones a `/diagnostico` y `/#niveles`.
2. Salas 2 y 3 en versión quieta: el bloque tallado; la tira de cine con la foto de respaldo en el primer fotograma y los créditos sin cifras. Las cifras de socios salen de `stats.js` y de sus dos renglones en `/saas`.
3. Sala 4 (`#niveles`): los cinco niveles con su precio "desde" en Geist Mono, su viñeta y su cuerda. Botón Sonido apagado al cargar.
4. Limpieza: fuera Hero, Problema, DosCaminos, Cinta, FranjaDatos, TextoTipeado y cuatro ilustraciones sin uso.

**Verificado:**
- Texto: 47 de 48 frases de las salas 1 a 4 (con los alt) coinciden palabra por palabra. La otra es la línea "Solicitar diagnóstico · Ver los niveles", que son dos botones; los dos están.
- Con menos movimiento: 0 animaciones corriendo, titular completo, cuerdas quietas (pero suenan si el sonido está encendido).
- Sonido: sin pulsar "Sonido" no se crea `AudioContext` ni suena nada, aunque se toquen las cuerdas con cursor, clic y teclado. Después suena una nota por toque, y Empresa toca las cuatro.
- Teclado: Tab llega a los botones, enlaces, la tira de cine, las cinco cuerdas y "Sonido", todos con foco visible. A 375 px no hay scroll horizontal.
- Capturas en `reportes/lote-2-salas-1-4/` (375 y 1440 px).

**Decisiones a revisar:**
- Notas: La, Re, Sol y Si para Responde a Controla; Empresa las toca juntas ("la orquesta"). Las cuerdas van en `texto` y engordan nivel a nivel (1.2 a 2.4 px).
- No muestro los encabezados de la tabla de textos ("Nivel", "Si dices…"). "Toca una cuerda. Sonido" va después de los niveles, en el orden de textos.
- En celular la tira de cine conserva su tamaño y se recorre de lado, empezando por la foto.
- Arreglé dos fallas mías antes de los commits: el tecleo se quedaba en "Software hecho c" (redondeo con `steps(1)`) y un clic con ratón tocaba la nota dos veces.

**Pendientes:**
- TODO(dato): la foto final de Carlos; hoy se usa `carlos-respaldo.jpg`.
- Lote 5: los SVG pesan 141 KB (sala 2) y 389 KB (sala 3). Dentro de `<img>`, los letreros de la tira de cine caen en una monospace del sistema. El titular termina de escribirse a los ~2 s, así que hay que medir el LCP.
- `sala2-escultura.svg` tiene mucho aire arriba; en celular deja un hueco.
- Siguen en la portada `PlanesContinuidad`, `Us` (el "quién soy" que se retira) y `Cierre` viejo: lote 3. El punto de `CustomCursor` asoma en la esquina superior izquierda.
- Un build falló una vez con un error de Turbopack (`next/font/google queries`) y pasó al repetirlo.
- Metas sin medir: Lighthouse, LCP y CLS (lote 5).
