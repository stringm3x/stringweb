# Logo

La palabra STRING en Anton con la I como **cursor de terminal**: un bloque de `acento` con la I en negativo, en forma de puntero. Es la firma de la casa en pantalla.

**En HTML** se escribe como SVG en línea (no como texto: la I de puntero no existe en Anton). Las letras usan `currentColor` y el bloque, `var(--acento)`. Debajo del bloque va la I de Anton, para que se lea cuando el bloque se apaga. Copia el SVG de `preview.html`.

- `.logo`: `height: 1.108em` y `vertical-align: -0.137em`, así mide lo mismo que Anton escrito al mismo tamaño.
- `.bloque`: parpadeo de 1.1 s con `steps(1)`. **Encendido:** bloque con la I en negativo. **Apagado:** el bloque desaparece (opacidad 0) y queda la I de Anton en el color de las letras; la palabra nunca se rompe.
- Con `prefers-reduced-motion` el bloque se queda encendido.
- El SVG lleva `role="img"` y `aria-label="STRING"`, para que no se lea "S T R I N G".

**Fuera de la web** (impresos, documentos, redes) se usan los archivos del grupo Logos, con el bloque encendido.

**Quien lo usa provee:** nada más; el logo no necesita cargar Anton.
