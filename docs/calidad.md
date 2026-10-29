# La calidad en STRING

Reglas que se comprueban, no gustos. Aplican a todo el sitio, a Claude Code y a cualquier freelancer.
Fuente: STRING — Plan de calidad del sitio (aprobado 29 oct 2026) y el lienzo STRING — Componentes de calidad (aprobado 29 oct 2026).

**La frase que lo resume:** cada componente tiene todos sus estados diseñados, cada animación explica algo, y todo usa los mismos tokens de espacio, color y movimiento.

## 1. Las reglas

| Dimensión | La regla | Cómo se comprueba |
|---|---|---|
| Estados | Todo lo que se toca tiene reposo, hover, presionado, foco, cargando, deshabilitado, éxito y error, cada uno diseñado (si un estado no aplica, se dice) | Capturas de los 8 estados en el reporte |
| Respuesta | Toda acción responde en menos de 100 ms | Prueba en celular; Playwright |
| Movimiento con intención | Cada animación explica algo. Si no explica nada, no va | Frase de intención escrita en el lote |
| Tokens de movimiento | Ninguna duración ni curva suelta en el código: todas salen de los tokens | grep de `ms` y `cubic-bezier` fuera de los tokens |
| Movimiento ligero | Solo se anima `transform`, `opacity` y `clip-path`. Los cambios de color en hover y presionado son instantáneos. Con menos movimiento, todo quieto. Nada parpadea más rápido que el cursor (1.1 s) | Lighthouse ≥ 90; `getAnimations()` en cero con `reduce` |
| Ritmo | Una escala de espacios; mismos márgenes en todas las salas; titulares con `text-wrap: balance` | Capturas a 375 y 1440 px |
| Pulido | Comillas “ ” y guiones — tipográficos, alineaciones exactas, bordes limpios a 400 % | Revisión a 400 % antes de publicar |
| Profundidad | Cada página termina con un siguiente paso | Recorrido de cada página hasta /diagnostico |
| Verdad | Nada inventado: ni clientes, ni cifras, ni testimonios, ni pantallas falsas. Los datos de ejemplo dicen que son de ejemplo | Revisión contra docs/kb y docs/textos.md |
| Accesibilidad | AA, teclado completo, nombres claros para lectores de pantalla | axe sin fallas; accesibilidad 100 |

Las metas que ya se ganaron no se pierden: rendimiento ≥ 90, accesibilidad 100, buenas prácticas y SEO 100, CLS 0, LCP < 2.5 s (PageSpeed Insights).

## 2. Tokens

### Movimiento

| Token | Valor | Para qué |
|---|---|---|
| `--dur-rapido` | 150 ms | Botones, campos, píldoras: la respuesta a la mano |
| `--dur-normal` | 300 ms | Tarjetas, menú, flechas: algo que cambia de lugar |
| `--dur-lento` | 600 ms | Salas y entradas de página: algo que se cuenta |
| `--curva` | `cubic-bezier(.2, 0, 0, 1)` | Una sola curva para todo: arranca rápido y llega suave. Sin rebotes |
| `--parpadeo` | 1.1 s, `steps(1)` | El cursor, en el logo y en el botón primario |

### Color nuevo: alerta (solo para errores, nunca como adorno)

| Token | Hex | Contraste |
|---|---|---|
| `--alerta` sobre noche | `#FF6B5A` | ≈ 7:1 sobre `#000000` |
| `--alerta` sobre pared | `#B3261E` | ≈ 6:1 sobre `#F4F2EC` |

Los demás colores no cambian (docs/sistema/tokens.json y docs/diseno.md).

## 3. Componentes

### Botón

Píldora, alto mínimo 48 px (44 px en barra), Geist 600 16 px, padding horizontal 24 px.

| Estado | Primario (noche) | Secundario | De texto |
|---|---|---|---|
| Reposo | Fondo `#50FF05`, texto negro | Borde 1 px `#5A5A5E`, texto línea | Texto línea, subrayado 1 px `#5A5A5E` a 6 px, flecha → |
| Hover | **Aparece el cursor ▍ del logo después del texto, parpadeando a 1.1 s** | Borde línea, fondo línea al 6 % | Subrayado en línea; la flecha avanza 4 px (normal) |
| Presionado | `scale(.97)`, fondo `#46E000` (rápido) | `scale(.97)` | Texto neblina |
| Foco | Contorno 2 px línea, separación 3 px | Igual | Igual |
| Cargando | Texto "Enviando" + el cursor ▍ parpadeando, como si escribiera | Igual, en línea | No aplica |
| Deshabilitado | Opacidad 40 %, cursor not-allowed | Igual | Igual |
| Éxito | Palomita + "Enviado" | Borde y texto en luz | No aplica |
| Error | Fondo transparente, borde y texto alerta, ícono + "Intenta de nuevo" | Borde y texto alerta | No aplica |

- **Sobre pared**, el primario usa verde profundo `#1A7F00` con texto pared `#F4F2EC`; presionado `#156900`; foco en tinta; error en alerta de pared.
- **El cursor en hover es solo del primario**: es la firma de STRING y no se usa en ningún otro componente.
- Con menos movimiento, el cursor aparece fijo, sin parpadear, y no hay `scale`.

### Campo de texto

Borde 1 px `#5A5A5E`, radio 12 px, alto 48 px, Geist 16 px, etiqueta visible arriba (Geist 500 14 px).

| Estado | Cómo se ve |
|---|---|
| Reposo | Borde `#5A5A5E` (3.06:1 sobre noche, el mínimo de WCAG 1.4.11 para el contorno de un control); placeholder `#7A7A80` |
| Hover | Borde neblina `#9A9A9F` |
| Foco | Borde luz + halo de 3 px luz al 22 % |
| Error | Borde alerta; debajo, ícono + mensaje en alerta, unido con `aria-describedby` |
| Deshabilitado | Opacidad 40 % |

### Opción en píldora

Borde 1 px `#3A3A3D`, alto 44 px, Geist 500 15 px. Hover: borde línea. **Elegida: fondo luz, texto negro y palomita**, con `aria-pressed` o radio real. Foco: contorno 2 px línea.

### Tarjeta (niveles, enlaces a páginas)

Borde 1 px `#2A2A2C`, radio 16 px, padding 28 px, con una **cuerda** de 2 px arriba. Hover: borde luz, la cuerda se enciende en luz y la tarjeta sube 2 px (normal). Es un `<a>` completo, con foco visible.

### Barra

Arriba de todo: fondo transparente. Al bajar: fondo noche al 88 % y línea inferior `#2A2A2C`, con transición normal. Enlaces en neblina; el de la página actual en línea.

### Menú del celular

Panel de pantalla completa sobre noche: logo y botón "Cerrar menú" de 44 px arriba; los cuatro enlaces en Geist 600 32 px con su número en Geist Mono, separados por línea fina; el primario abajo, de 52 px. Entra con la curva en velocidad normal; foco atrapado, Escape cierra y el foco vuelve a "Abrir menú".

### Transiciones entre páginas

Con la API nativa View Transitions (sin librerías): fundido corto en velocidad normal. Con menos movimiento, sin transición.

## 4. Antes de publicar cualquier pieza

- [ ] Sus estados, capturados.
- [ ] Ninguna duración ni curva suelta.
- [ ] Menos movimiento: todo quieto.
- [ ] Teclado y foco recorridos.
- [ ] axe sin fallas, Lighthouse en sus metas.
- [ ] Capturas a 375 y 1440 px, revisadas a 400 %.
- [ ] Textos iguales a docs/textos.md; nada inventado.
