# Lote 25 · /interno para los nichos nuevos

25 nov 2026 · rama `lote-25-interno-nichos` desde `origin/main` (72b656f) · PR a `main` sin fusionar.

## Qué se hizo

| Bloque | Commit | Qué |
|---|---|---|
| 1 | 592496b | Datos de los cuatro nichos y el guion común, literales del prompt (clínicas en pausa). Inicio: nicho con su filtro, atajo "Gimnasio → Boaz Pro", negocio, dueño y tipo de dueño. Notas en `sessionStorage` (`useLlamada.js`); "Terminar llamada" y "Salir" las borran |
| 2 | e9a96df | Guía por tramos (0–2, 2–8, 8–13, 13–17, 17–20): frases con dueño y negocio, campo bajo cada pregunta, Situación según el tipo de dueño, recordatorios, reloj discreto que nunca corta y objeciones del nicho |
| 3 | 764aa8c | Calculadora de "su número" (al mes, ×12, deudas aparte, "él lo dijo", horas tal cual en la frase), prioridad → pantalla de ejemplo y nivel "Solo para ti" (si quedan dos, el más chico) |
| 4 | 0a07e7d | Cierre (su problema, "Te digo lo que escuché…", preguntas de cierre, fecha y hora de la propuesta, "Algo que noté") y resumen para WhatsApp editable con "Copiar"; frases de las prioridades aprobadas |
| 5 | 391d977 | **Arreglo de seguridad**: los precios internos y los textos de la herramienta del lote 20 se leen en el servidor y llegan por props; ya no están en el JS público |
| — | de692d5 | Merge de `origin/main` (arreglo de `pagos.spec.js`, PR #22) |

Fuera del lote, en su propia rama: `arreglo-prueba-mercado-pago` (PR #22, fusionado con merge commit ffc21e8):
"Mercado Pago" se permite solo en los legales de Boaz.

## Arreglo de seguridad

Los componentes de cliente de Next se sirven en `.next/static` sin sesión (nombre con hash, sin enlace, pero
públicos). Desde el lote 20 ahí estaban el mínimo de Empresa (`$80,000`), el boceto (`$7,500`) y los textos de la
herramienta. Ahora:

- `contenido.js` es solo datos (plantillas en vez de funciones, textos del resumen incluidos) y `ofertas.js` tiene los
  precios por nivel; `flujo.js`, `nivel.js` y `resumen.js` los reciben como argumento.
- La página de /interno los lee después de `exigirCarlos()` junto con el guion, las fichas y `precios-interno.js`, y
  los pasa por props (contexto en `Diagnostico`; textos de "Salir" desde el layout).
- En el build: `$80,000`, `$7,500`, `BOCETO`, "nunca menos de", "Te dejan plantado", "Pro se paga con", "Aguanta el
  silencio", "Colegiaturas con estado de cuenta"… en 0 archivos de `.next/static` (antes: 1–2 cada uno).
- Lo vigilan `app/lib/interno/cliente-sin-contenido.test.js` (grafo de imports de cada componente de cliente) y
  `e2e/interno.spec.js` (revisa `.next/static` en el build de producción).

## Pruebas

- `npm test` (Vitest): 259 en verde. Nuevas: fichas completas y sin precios, fichas solo en /interno, sessionStorage
  solo en el archivo de las notas, calculadora (caso Mariana, deuda, variantes de horas), nivel (Organiza +
  Automatiza → Organiza), resumen (Mariana; sin mínimo, boceto ni "Desde" con Empresa marcada), grafo de imports.
  Las pruebas del lote 20 pasan con sus mismas comprobaciones.
- `npm run build` limpio.
- `npm run test:e2e:interno` (build de producción): 12 en verde, incluida la de `.next/static`.
- `e2e/diagnostico-interno.spec.js`: 17 en verde, con axe en cada pantalla (inicio, tramos, calculadora, nivel,
  cierre, resumen, objeciones, diálogos) y el atajo a gimnasio.
- e2e completas: 149 de 150. Falla `registro-aviso.spec.js:48`, inestable y sin relación con el lote (anotada en la
  deuda de `docs/estado.md`).

## Caso Mariana

120 alumnos, $900, 4 bajas al mes, 6 h a la semana → $3,600 al mes, $43,200 al año, 24 h al mes. Frase: "O sea, más o
menos $3,600 al mes y unas 6 horas tuyas a la semana. ¿Así lo ves?". Resumen:

> Mariana, gracias por tu tiempo. Lo que entendí: te escriben unos 15 papás al mes y se inscriben 5; se te van unos 4
> alumnos al mes sin darte cuenta; te está costando más o menos $3,600 al mes y unas 6 horas tuyas a la semana, y lo
> que más quieres es que nadie se quede sin respuesta. Algo que noté: casi todo pasa por tu WhatsApp personal, así
> que mientras das clase nadie contesta. Nos vemos el jueves 26 de noviembre a las 5 pm para la propuesta.

## Capturas (390 px, `reportes/lote-25/`)

01–07 inicio, nicho y filtro, apertura, terminar, recarga, atajo a gimnasio · 08–14 los cinco tramos, Situación por
tipo, reloj y objeciones · 15–20 calculadora de Mariana, deuda, prioridad, nivel (dos reglas; Empresa) · 21–23 cierre
y resumen de Mariana. En las capturas de página completa, la barra fija sale a media página: es la captura, no el
celular.

## Por aprobar

- Los textos de pantalla propuestos: `docs/textos.md` § Interno · lote 25 › Textos de pantalla (TODO(textos)).

## Pendiente después del merge

- Merge commit (no squash), deploy en Production y verificación de Carlos con su sesión en
  `www.stringwebs.com/interno/diagnostico`.
