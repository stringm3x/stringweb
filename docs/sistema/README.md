# STRING

**STRING hace software con oficio y con arte: cada sistema que construye tiene su propia obra.** Es un taller de software de la Ciudad de México y la casa de sus productos (el primero, el sistema para gimnasios Boaz). Este sistema de diseño manda sobre todo lo visual de la casa; lo visual de Boaz vive en su propio sistema.

## Esencia

La marca sale de tres lecturas del nombre:

| Idea | De dónde sale | Cómo se ve |
| --- | --- | --- |
| **El texto** | En programación, un *string* es texto: lo que la gente escribe y el sistema ordena | La I del logo es un cursor que parpadea |
| **La cuerda** | *String* también es cuerda de instrumento: precisión que se vuelve arte | Cuerdas que vibran y suenan en la página |
| **La obra** | STRING es la casa, como una galería: paredes simples donde cuelga el arte de cada sistema | La galería: el arte de STRING, de Boaz y de cada cliente |

**En una frase:** simple como Apple, pero que diga mucho. Pocas cosas en pantalla, cada una con significado.

## Voz

- Frases cortas que afirman. Ni promesas ni adjetivos de agencia.
- Español de México: "panel", no "dashboard"; "prospecto", no "lead".
- Se habla como un desarrollador que opera su propio negocio.
- Cifras solo si existen y están autorizadas en el KB de STRING. Nada inventado: ni clientes, ni cifras, ni testimonios.

| Sí | No |
| --- | --- |
| Software hecho con oficio. Y con arte. | Soluciones digitales innovadoras de clase mundial. |
| Cuéntanos qué necesita tu negocio. | ¡Transforma tu negocio hoy mismo! |
| Desde $799/mes | Precios increíbles |

## Logo: el cursor

El logo es la palabra **STRING en Anton, con la I convertida en un cursor verde que parpadea**. Funciona como la flecha escondida de FedEx: primero se lee STRING; cuando alguien nota la I, ya no deja de verla. Un string es texto y el cursor es donde empiezas a escribir: ahí empieza tu sistema.

- **Letras:** S, T, R, N, G en `texto`; la I en `acento`. Es la única pieza de color del logo.
- **Parpadeo:** solo en pantalla, ciclo de 1.1 s, encendido y apagado de golpe como un cursor real. Apagada, la I baja a 15 % de opacidad: nunca desaparece del todo.
- **Movimiento reducido:** con `prefers-reduced-motion`, la I queda fija.
- **Espacio libre:** alrededor, como mínimo, la altura de la I.
- **Tamaño mínimo:** 24 px de alto en pantalla, 8 mm impreso. Más chico, el ícono.

Las versiones (noche, pared, una tinta, firma gris, ícono) están en el grupo de recursos **Logos**, dibujadas con la letra real de Anton convertida a trazo.

**No se permite:** cambiar Anton, estirarla o inclinarla; poner otra letra en verde o toda la palabra en verde; usar `#50FF05` sobre fondos claros; poner el logo sobre fotos o arte que le quiten lectura; sombras, degradados o contornos; usar el verde de STRING dentro de Boaz (ahí el verde significa "pagado").

## Color

STRING vive de noche con una sola luz verde; la galería es su pared clara. Hay dos temas: **Noche** (principal) y **Pared** (galería e impresos).

- `fondo`, `superficie`: el piso de todo. En Noche, negro puro; en Pared, un blanco cálido.
- `texto`, `texto-suave`: todo el texto y el dibujo de línea.
- `acento`: **el único acento**. Si hay dos verdes compitiendo, sobra uno. Sobre claro siempre el verde profundo.
- `sobre-acento`: el texto encima de un botón verde.
- `boaz-azul`: solo para mostrar a Boaz, nunca en piezas propias.

Contraste mínimo del sistema: 4.5:1 en texto. Cada token dice su contraste en su nota.

## Tipografía

Tres letras, cada una con un solo trabajo:

- **Anton** (`logo`): solo el logo. Nunca en titulares ni texto, para que el logo se reconozca siempre.
- **Geist** (`sans`): titulares en 600, apretados (-0.035 em) y cortos; texto en 400.
- **Geist Mono** (`mono`): cifras, precios y etiquetas en mayúsculas.

Las tres se cargan de Google Fonts: `https://fonts.googleapis.com/css2?family=Anton&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap`.

## Arte: la mezcla

El arte de STRING es **la Ciudad de México dibujada de noche, con cuerdas que suenan y una galería donde cada sistema cuelga su obra**. Son cinco piezas y todas se pueden quitar: la página sigue vendiendo.

| Pieza | Qué es | Movimiento |
| --- | --- | --- |
| **La ciudad de una línea** | Monumento a la Revolución, Bellas Artes, el Ángel, la Torre Latinoamericana, el Popocatépetl y el Iztaccíhuatl en un solo trazo, en `texto` | Se dibuja sola en unos 10 s, ida y vuelta |
| **La luna de un brochazo** | Un círculo de `acento` pintado en un solo trazo que no se cierra, detrás de la Torre Latino | Se pinta una vez al cargar |
| **Las cuerdas** | Líneas que cruzan la página y vibran como cuerdas de guitarra | Vibran al tocarlas; sonido opcional |
| **La galería** | Marcos con el arte de cada sistema y su cartela | Ninguno: es la pausa |
| **Las estrellas** | Puntos diminutos en el cielo del inicio | Brillo lento |

**Movimiento y sonido**

- El arte nunca tapa titulares, botones ni cifras: vive en su propia franja.
- Con `prefers-reduced-motion`, todo queda fijo.
- **El sonido empieza apagado** y solo suena si el visitante lo enciende. Notas: La, Re, Sol, Si.
- Una cuerda se toca con el cursor, con clic o con el teclado (Enter o espacio).
- Nada parpadea más rápido que el cursor del logo.

El dibujo actual de la ciudad es un boceto hecho con código: la versión final se afina a mano, cuidando que siga siendo una sola línea.

## Páginas

La portada alterna noche y pared en siete partes: barra superior · inicio (titular, ciudad, luna, estrellas) · primera cuerda con el botón de sonido · galería en pared · tres principios, cada uno con su cuerda · cierre con el botón verde · pie. El componente **Portada** la muestra completa.

## STRING y sus productos

STRING es la galería; cada producto es una obra con su propio arte. No comparten color ni logo: comparten dibujo de línea, cifras en mono, nada inventado y contraste de 4.5:1.

- **Dentro de un producto**, STRING firma "by STRING" chico y todo en gris (logo *firma gris*).
- **Cada sistema a la medida lleva su arte**, definido con el cliente en el diagnóstico.
- **Boaz:** el nombre es interno hasta la consulta en el IMPI. En la galería pública su marco dice "El sistema para gimnasios".

## Reglas que no se rompen

1. El nombre es STRING, en mayúsculas, y en Anton cuando es logo.
2. Contraste mínimo de 4.5:1 en todo texto.
3. El arte nunca tapa la información.
4. Nada inventado.
5. Un solo acento: el verde.
6. El sonido nunca suena solo.
7. Distinto de Boaz y de la misma familia: noche contra papel, verde contra azul, mano contra regla.
8. Si un elemento no se puede explicar en una frase, sobra.
