# Lote 7 · Salas en movimiento — reporte

Rama `lote-7-movimiento`, 8 commits, sin fusionar. `npm run build` limpio, `npm test` 24/24, `npm run test:e2e` 36/36.
Capturas de los momentos de cada sala en `reportes/lote-7-movimiento/` (375 px; sala 6 también a 1440; salas 2 y 3 en WebKit).
**Hecho.** `docs/movimiento-salas.md` en el repo. Los SVG de las salas 2, 5, 6 y 7 se parten en capas con `scripts/capas-arte.mjs`
(tramos contiguos, mismo orden de pintado) y se apilan con `Capas.jsx`. `Escenario.jsx` marca atributos con un solo
`IntersectionObserver` por sala; el movimiento vive en `app/salas.css`: `animation-timeline` donde existe (Chrome, Safari/WebKit 27)
y etapas que solo avanzan donde no (Firefox). Sin GSAP, sin escuchar el scroll. Solo `transform`, `opacity` y `clip-path`.

**Frase de intención de cada sala**
- 2 Escultura: la piedra que tapa el hueco se agrieta y cae a pedazos; queda el celular: el sistema quita lo que sobra.
- 3 Cine: la tira entra como en un proyector y cada cuadro se enciende con corte seco: la historia, cuadro por cuadro.
- 4 Música: una vez, sin sonido, las cuerdas se afinan en cascada y cada viñeta suma su arte: mismo instrumento, más cuerdas.
- 5 Galería: en penumbra, cada reflector enciende su cuadro en su turno: cada obra se ilumina.
- 6 Arquitectura: cada piso sube cuando su paso cruza la línea y el paso se marca: el edificio crece al ritmo de los pasos.
- 7 Danza: las cintas se mecen y se voltean, sin parar y sin prisa: el sistema sigue trabajando, a su ritmo.
- 1 Inicio: sin cambios visibles; el tecleo y las estrellas ya toman su tiempo de los tokens.

**Antes de publicar (docs/calidad.md § 4)**
- [x] Momentos capturados. Final igual al de antes: `app/arte-capas.test.js` compara las capas con cada SVG (0 píxeles distintos)
  y, con menos movimiento, las salas 1–5 y 7 dan 0 píxeles distintos contra `main` a 375 y 1440 px. La sala 6 cambia de orden (abajo).
- [x] Ninguna duración ni curva suelta: `app/tokens.test.js`, ahora también en plantillas `${…}ms` y `animationDuration` en línea.
- [x] Menos movimiento: sin atributos ni animaciones (`getAnimations()` en 0); cada sala en su final (`e2e/movimiento.spec.js`).
- [x] Teclado y foco: la tira y la galería siguen con `tabIndex`; nada nuevo se enfoca. axe sin fallas en las 7 páginas.
- [x] 375 y 1440 px; a 320 px (400 %) la portada no se desborda. [x] Textos sin cambios.
- [ ] **LCP < 2.5 s**: Lighthouse 12, celular, `next start` local, mediana de 3, después de cada sala: 96 / 100 / 96 / 100, CLS 0,
  LCP 2.76 s (salas 2, 3, 4–5, 6–7) y 2.77 s al final. Es lo mismo que daban el lote 6 y `main` (2.69–2.76 s): el lote no lo baja,
  pero la meta sigue pendiente de PageSpeed en producción (lote 5).

**Decisiones y avisos**
- Carlos (29 oct): sala 6 con el dibujo pegado bajo la barra (arriba de la lista en celular, en su columna en escritorio); sala 7
  con volteo `scaleY`, sin arte nuevo. La línea de los pasos va al 74 % en celular y al 70 % en escritorio (a la mitad, la grúa y la
  bandera quedaban bajo la barra al llegar el último paso).
- **Arte nuevo en la sala 2:** los 4 pedazos y sus grietas no existían; van en línea con el color del frente del bloque. Revisar.
- Cine: los cuadros y los créditos cambian con `data-activo` (regresan al subir), no con línea de tiempo: un corte seco no la
  necesita y la misma señal centra cada cuadro en celular. La entrada de la tira sí va ligada al scroll.
- Tokens nuevos de arte: `--arte-dur-danza` (12 s), `--arte-curva-danza` y `--arte-espera-tecla` (0.3 s).
- Galería en celular: solo se ven el primer cuadro y parte del segundo sin deslizar la tira; el doc pide centrar solo en el cine.
- Música en celular: la cascada dura 1.5 s y Controla y Empresa quedan bajo el pliegue al dispararse.
- Sigue como antes: la vibración al tocar una cuerda redibuja la ruta con JS (`Cuerdas.jsx`), fuera de la regla de solo `transform`.
