# El movimiento de las salas

Fase 2 del Plan de calidad. Aprobado por Carlos el 30 oct 2026 sobre el lienzo **STRING — Salas en movimiento**.
Lo general (tokens, curva, qué se puede animar, menos movimiento) está en `docs/calidad.md`; esto es lo de cada sala.

## Reglas comunes

- **Ningún movimiento gratuito:** cada sala cuenta con el movimiento lo mismo que dice su texto. La frase de intención de cada una va en el reporte.
- **Dos tipos de movimiento:**
  - **Sigue al dedo** (escultura, cine, arquitectura): el avance está ligado al scroll mientras la sala cruza la pantalla. Si el usuario sube, regresa. Cuentan un proceso.
  - **Pasa una vez** (música, galería): se dispara al entrar la sala en pantalla y no se repite. Es un momento.
  - **Continuo** (danza): la única animación que no se detiene, y solo mientras la sala está en pantalla.
- **Técnica:** primero, CSS scroll-driven animations (`animation-timeline: view()`). Donde el navegador no las soporte, `IntersectionObserver` con clases: lo que "sigue al dedo" pasa a "pasa una vez" por etapas, y nunca queda a medias. Nada de escuchar el scroll con JavaScript en cada fotograma, y nada de GSAP.
- **Solo `transform`, `opacity` y `clip-path`.** Para lograrlo, los dibujos se separan en capas SVG (ver cada sala), sin cambiar cómo se ven al final.
- **Menos movimiento:** cada sala muestra su **estado final**, completo y quieto.
- **Celular primero:** todo se prueba deslizando con el pulgar a 375 px.
- **Rendimiento:** después de cada sala, Lighthouse en celular no baja de las metas. Si baja, se simplifica esa sala antes de seguir.

## Sala 2 · Escultura — "El sistema quita lo que sobra."

| Momento | Qué se ve |
|---|---|
| Al entrar | El bloque de mármol entero: la piedra cubre el hueco y no se ve el celular |
| 25 % | Aparecen grietas en la piedra que cubre, mientras se leen los problemas |
| 60 % | La piedra cae a pedazos y asoma la pantalla |
| Final | El celular libre con su lista en verde, junto a "Un sistema quita lo que sobra. Queda tu negocio." |

- **Tipo:** sigue al dedo. Cada pedazo cae en `--dur-rapido`.
- **Capas:** el bloque con su hueco (fondo), el celular, la piedra que cubre el hueco partida en 3 o 4 pedazos, y las grietas como trazos aparte.
- **Menos movimiento:** el celular ya libre.

## Sala 3 · Cine — "La historia se cuenta cuadro por cuadro."

| Momento | Qué se ve |
|---|---|
| Al entrar | La tira entra desde la derecha, como en un proyector, con los tres cuadros apagados |
| Cuadro 1 | Se enciende la foto de Carlos |
| Cuadro 2 | Se enciende el mostrador de Evolution GYM |
| Cuadro 3 | Se enciende el producto; luego aparecen los créditos en Geist Mono |

- **Tipo:** sigue al dedo. La entrada en `--dur-lento`; cada cambio de cuadro es seco, como un corte de plano (`steps(1)`).
- **Capas:** la tira y una capa de oscuridad por cuadro, que se apaga con `opacity`.
- **En celular:** la tira conserva su scroll lateral, y al encenderse cada cuadro se centra en pantalla.
- **Menos movimiento:** los tres cuadros encendidos, sin entrada.

## Sala 4 · Música — "Mismo instrumento, más cuerdas."

| Momento | Qué se ve |
|---|---|
| Al entrar | Las cinco cuerdas quietas y las viñetas apagadas |
| Se afinan | Una vez, en cascada: vibra Responde y se enciende su viñeta |
| En cascada | Cada cuerda vibra un instante después de la anterior y su viñeta suma su arte, hasta Controla |
| Empresa | Vibran todas a la vez y se encienden las siete artes |

- **Tipo:** pasa una vez, al entrar. Cada cuerda en `--dur-normal`, separadas por un instante. Después solo vibran si se tocan, como hoy.
- **Sonido:** la afinación **no suena**; el sonido sigue siendo solo cuando el visitante lo enciende.
- **Menos movimiento:** todo encendido y quieto. Las cuerdas siguen sonando si se tocan con el sonido encendido.

## Sala 5 · Galería — "Cada obra se ilumina en su turno."

| Momento | Qué se ve |
|---|---|
| Al entrar | La galería en penumbra: los tres cuadros apagados |
| Primer reflector | Se ilumina STRING |
| Segundo | Se ilumina el sistema para gimnasios (Boaz) |
| Tercero | Se ilumina "Tu negocio", el lienzo que espera su obra |

- **Tipo:** pasa una vez. Cada reflector en `--dur-lento`, uno tras otro.
- **Capas:** una capa de penumbra por cuadro, que baja su `opacity`; el haz de luz de cada reflector aparece con su cuadro.
- **Menos movimiento:** los tres encendidos.

## Sala 6 · Arquitectura — "El edificio crece al ritmo de los pasos."

| Momento | Qué se ve |
|---|---|
| Paso 1 | Solo los cimientos, bajo tierra |
| Pasos 2 y 3 | Suben los dos primeros pisos |
| Paso 4 | El piso en obra, con andamio, ladrillos y grúa |
| Paso 5 | La bandera en lo alto |

- **Tipo:** sigue al dedo. Cada piso sube cuando su paso llega al centro de la pantalla, y **el paso activo se resalta en la lista** de la izquierda.
- **Capas:** cimientos, cada piso, la obra (andamio, ladrillos y grúa) y la bandera; se revelan con `clip-path` de abajo hacia arriba.
- **Menos movimiento:** el edificio completo, sin paso resaltado.

## Sala 7 · Danza — "El sistema sigue trabajando, a su ritmo."

- **Qué se ve:** las cintas en un vaivén lento y largo, nunca brusco; al voltearse se ve su revés.
- **Tipo:** continuo, un ciclo de 12 s con curva suave de ida y vuelta. Es la única animación continua del sitio.
- **Se pausa** cuando la sala sale de pantalla (`animation-play-state`), para no gastar batería.
- **Menos movimiento:** quietas.

## Sala 1 · Inicio

Ya tiene su movimiento (el titular que se escribe, la ciudad que se dibuja, las estrellas). Solo se revisa que use los tokens.
