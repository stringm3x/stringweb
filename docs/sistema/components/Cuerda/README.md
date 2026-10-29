# Cuerda

Una línea de `acento` que cruza la página y vibra como cuerda de guitarra al pasar el cursor, al hacer clic o con el teclado.

- Va entre secciones (a lo ancho, con un punto en cada extremo) y junto a cada principio (sin puntos, en `texto`, con grosores 1.2, 1.7 y 2.2 px como cuerdas de distinto calibre).
- Vibración: seno a lo largo de la cuerda, 9 oscilaciones por segundo, amplitud máxima 30 px, se apaga en unos 2 s.
- **Sonido:** apagado al cargar. Un botón "Sonido" lo enciende. Cada cuerda tiene su nota: La (110 Hz), Re (146.8 Hz), Sol (196 Hz), Si (246.9 Hz), sintetizadas con el método Karplus-Strong a volumen 0.22.
- Con `prefers-reduced-motion` no vibra; si el sonido está encendido, sí suena.
- Es un `button` con `aria-label` "Tocar la cuerda": se alcanza con Tab y se toca con Enter o espacio.
- Nunca va encima de texto ni de botones.
