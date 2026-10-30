# La página de nivel y /sistemas

Fase 3, lote 8 del Plan de calidad. Diseño aprobado por Carlos el 30 oct 2026 en el lienzo **STRING — Página de nivel** (camino A, "La ficha, con su arte").
Los textos están en `docs/textos.md` (sección Sistemas y "Lo que cambia por nivel"). Los componentes y tokens, en `docs/calidad.md`.

## La idea

**Cada página de nivel es una sala:** habla con el arte que ese nivel suma. Responde es literatura; Organiza, arquitectura; Automatiza, danza; Controla, pintura; Empresa, las siete juntas.

## Estructura (escritorio, 1280 px de referencia)

Dos columnas: contenido a la izquierda (fluido) y la **ficha de la obra** a la derecha (380 px), `position: sticky` bajo la barra mientras se baja.

**Columna izquierda, en este orden:**

1. Etiqueta en Geist Mono: `NIVEL N · NOMBRE · SALA DE LA [ARTE]`.
2. `<h1>` con el titular del nivel (Geist 600, ~76 px en escritorio, `text-wrap: balance`).
3. La frase del dueño entre comillas tipográficas + "Si eso te pasa, empieza aquí." (Responde) o su equivalente.
4. **El dibujo del nivel** (`public/arte/niveles/<nivel>.svg`, 520 × 372) con `role="img"`, su texto alternativo y, debajo, la línea bajo el dibujo en Geist Mono.
5. Cuerda (línea de 1 px `#3A3A3D`) como separador.
6. **Qué incluye:** lista con palomita verde; cada punto con su parte inicial en negritas.
7. Cuerda.
8. **Cómo se ve:** el ejemplo (máx. 300 px de ancho, marcado con la etiqueta "EJEMPLO") junto a **Para quién es**.
9. Cuerda.
10. **Cómo trabajamos:** los pasos numerados en Geist Mono (Responde y Organiza: diagnóstico, propuesta, construcción, entrega; Automatiza en adelante agregan el boceto) y la línea del avance cada viernes.
11. Cuerda.
12. **Cuando crezcas:** Tarjeta (componente) al siguiente nivel, con su viñeta mostrando el arte que suma ("Organiza + Arquitectura"). En Empresa no hay siguiente nivel: en su lugar, enlace a `/productos`.

**Ficha de la obra (columna derecha):** borde hairline, radio 20 px, padding 28 px.

- Etiqueta "FICHA DE LA OBRA".
- Nombre (Geist 600, 28 px) y `NIVEL N DE 5 · [ARTE]` en Mono.
- "Artes que suma": la fila de las siete viñetas, encendidas solo las del nivel (la última que suma en verde); debajo `N DE 7 · EMPRESA LAS TIENE TODAS` (en Empresa: `7 DE 7`).
- Línea fina.
- "Desde" + precio en Geist Mono 36 px (Empresa: "Se cotiza").
- Lista de definición: Tiempo, Pago, Después (continuidad desde $1,800 al mes), todo en Mono donde hay cifras.
- Botón primario "Solicitar diagnóstico" a todo el ancho.

**Al final:** el Cierre de la portada.

## Celular (375 px)

Una columna. La ficha **no** es sticky: va justo después del dibujo, completa, para que el precio y el botón se vean pronto. El dibujo y el ejemplo a todo el ancho; el ejemplo con su altura natural.

## /sistemas

La puerta a los cinco niveles, con los textos de `docs/textos.md`:

- Etiqueta, `<h1>` "Cinco niveles. La misma calidad." y la entrada.
- Las cinco **Tarjetas** (componente) en una cuadrícula: en cada una, la cuerda, el nombre, la frase del dueño, qué hace en una línea, la viñeta de sus artes, "Desde" en Mono y "Ver el nivel →". En celular, una columna.
- "¿Cuál es el mío?" con el botón de diagnóstico.
- "Todos los niveles incluyen", lista.
- El Cierre.

Como `/sistemas` se arma solo con componentes ya aprobados, no tiene lienzo propio: sus capturas a 375 y 1440 px van a la revisión de Carlos antes del commit (punto de control).

## Rutas

`/sistemas` y `/sistemas/responde`, `/organiza`, `/automatiza`, `/controla`, `/empresa`. La barra pasa a: Sistemas · Tu negocio · Productos · Nosotros · botón. "Tu negocio" y "Productos" apuntan a sus páginas cuando existan; mientras, "Tu negocio" se oculta y "Productos" sigue a `/saas`. Las tarjetas de la sala 4 enlazan a su página de nivel. Redirección: `/#niveles` se queda como ancla de la portada.

## Movimiento

Solo el de los componentes (tarjetas, botón). El dibujo del nivel aparece con un fundido en `--dur-lento` al entrar en pantalla; con menos movimiento, visible desde el inicio.
