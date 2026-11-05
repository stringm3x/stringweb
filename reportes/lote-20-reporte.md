# Lote 20 · /interno/diagnostico, versión 1 (guía sin guardar)

Rama `lote-20-diagnostico`, desde `origin/main` c26730f. Sin fusionar hasta el visto bueno de Carlos.

Es una guía en pantalla para la llamada o la visita con un prospecto, pensada para el celular y de pie. Se elige el giro,
se hacen las preguntas y se marcan las respuestas. La herramienta sugiere un solo nivel y arma el resumen para WhatsApp.
Vive en `/interno/diagnostico`, detrás de `exigirCarlos()`. **No guarda nada**: no usa base de datos, almacenamiento del
navegador, cookies nuevas, peticiones ni server actions con datos del prospecto. Todo vive en el estado del componente.

## Bloques (un commit cada uno)

1. `feat(interno): precios que no se publican, en precios-interno.js`
2. `feat(interno): contenido, sugerirNivel y resumen del diagnóstico`
3. `feat(interno): la pantalla de /interno/diagnostico`
4. `test(interno): e2e del diagnóstico a 390 px`
5. `docs: lote 20` (este reporte y `docs/estado.md`)

## 1 · Precios internos

`app/lib/interno/precios-interno.js` guarda lo que no se publica:
- el boceto: $3,500, y desde $7,500 en Empresa;
- el precio fundador de Boaz Pro: $799 fijo 12 meses;
- el mínimo de Empresa: $80,000.

Lo público (niveles, continuidad y Boaz) se toma de `app/lib/precios.js`, que no cambia.

La prueba revisa que:
- ninguna página pública importe el archivo ni escriba esas cifras;
- con un build hecho, el JS que cargan las páginas públicas no contenga "7,500", "80,000" ni "799 fijo".

## 2 · Contenido, nivel y resumen (puros)

- `app/lib/interno/diagnostico/contenido.js`: giros, preguntas, opciones y textos, todos literales de `docs/textos.md` §
  Interno · lote 20, con los textos finales de ventas del 5 nov.
- `nivel.js`: `sugerirNivel` aplica las seis reglas en orden y gana la primera que se cumple. Si la N es "No sé" o se
  saltó, sugiere el nivel más chico que cubre lo marcado; Controla y Empresa nunca salen por descarte. Una pregunta
  saltada cuenta como "No sé". El mismo archivo define `OFERTAS` (precio, continuidad y boceto de cada nivel),
  `nivelSiguiente` y `conBoceto`.
- `resumen.js`: `armarResumen` (general y gimnasio), `datosPropuesta`, `enlaceWhatsApp` y `formatoDia`. Este último
  da "el jueves 12 de noviembre" y lee la fecha en hora local, para que no se corra un día.
- Empresa: el mínimo de $80,000 solo aparece en la tarjeta del paso 4. El resumen dice "lo cotizo a tu medida después
  de mapear tus procesos", y los datos para la propuesta llevan Impulsa.

## 3 · La pantalla

- Una pregunta por pantalla, en grande, con respuestas en píldoras de ancho completo de 56 px.
- Barra de cinco segmentos con "PASO N DE 5", barra inferior fija con las acciones y el aviso fijo "Nada de esto se
  guarda. Al cerrar la página, se borra."
- Puntos numerados para moverse entre preguntas:
  - contestada: relleno de acento;
  - saltada: borde punteado;
  - actual: borde de texto, con `aria-current="step"`.

  Cada punto es un `<button>` con su `aria-label`, por ejemplo "Pregunta 2, saltada".
- El nivel va en una tarjeta con borde de acento y su anuncio es `aria-live`. Ahí están "Cambiar nivel", "Cuando
  crezca", el interruptor del boceto (en Automatiza, Controla y Empresa) y, en gimnasio, el del precio fundador con el
  recordatorio.
- El resumen se puede editar. Si se edita y luego cambia una respuesta, aparece "Volver a armar el resumen".
- Las acciones del paso 5:
  - "Abrir en WhatsApp" abre `https://wa.me/52<10 dígitos>?text=…`; sin un número completo, abre `https://wa.me/?text=…`.
  - "Copiar" cambia a "Copiado" durante 2 s.
  - "Copiar datos" copia los datos para la propuesta.
- **Que no se pierda a media llamada:**
  - con datos capturados, "Salir" y "Nuevo diagnóstico" abren un `<dialog>` propio ("¿Seguro? Se borra todo lo del
    diagnóstico.");
  - recargar o cerrar la pestaña dispara `beforeunload`;
  - el Wake Lock mantiene la pantalla encendida y se vuelve a pedir al regresar a la pestaña. Sin soporte, no pasa nada.
- "Salir" ahora es un componente de cliente (`SalirConfirmado`). Lee si hay datos desde un contexto del layout
  protegido (`Captura`) y envía la misma server action `salir()`, que no cambia.
- **Banco de pruebas:** `/muestrario/diagnostico` monta el mismo componente y la misma barra sin `exigirCarlos()`. Solo
  existe en desarrollo: fuera de él da 404.

### Capturas a 390 px (`reportes/lote-20/`)

| | |
| --- | --- |
| `01-paso1.png` | Paso 1, con el aviso de WhatsApp incompleto |
| `02-pregunta-puntos-saltada.png` | Pregunta con los puntos (una saltada) y la nota |
| `03-pregunta-abierta.png` · `04-pregunta-n.png` | Pregunta abierta y la N |
| `05-nivel-boceto.png` · `06-siguiente-paso.png` | Tarjeta del nivel con el boceto encendido; siguiente paso con día |
| `07-resumen.png` | Resumen y datos para la propuesta |
| `08-dialogo.png` · `08b-dialogo-salir.png` · `08c-tras-salir.png` | Confirmación desde Nuevo diagnóstico y desde Salir |
| `09-nivel-empresa.png` · `10-resumen-empresa.png` | Empresa: el mínimo solo en la tarjeta |
| `11-nivel-gimnasio.png` · `12-resumen-gimnasio.png` | Gimnasio con fundador y recordatorio |
| `13`–`15-rapida-*.png` | Visita rápida de una clínica |

## 4 · Pruebas

- `npm test`: **187 en verde** (18 archivos). Del lote son estas:
  - `precios-interno.test.js`;
  - `diagnostico/nivel.test.js`: las 6 reglas, cada rama de "No sé", saltada = "No sé", y una búsqueda exhaustiva de
    que Controla y Empresa nunca salen por descarte;
  - `diagnostico/resumen.test.js`:
    - con y sin boceto, con y sin I, la nota;
    - los 4 pasos con día y sin día, y sin paso;
    - N = "No sé";
    - Empresa: ningún resumen ni dato con "80,000";
    - gimnasio con y sin fundador y con y sin día;
    - visita rápida;
    - el enlace de WhatsApp con número, sin número, y con acentos y saltos de línea;
  - `diagnostico/sin-guardar.test.js`: nada de `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`,
    `fetch`, server actions, Supabase ni precios escritos a mano;
  - `muestrario/diagnostico/page.test.js`: 404 fuera de desarrollo.
- `e2e/diagnostico-interno.spec.js` (en desarrollo, a 390 px): **8 en verde**, estables en 3 repeticiones (24/24).
  Cubren:
  - el recorrido de un giro, de gimnasio y de visita rápida (giro y gimnasio);
  - saltar y volver por los puntos, con el teclado incluido;
  - el diálogo (Cancelar, Esc, Sí, borrar, y Salir con y sin datos);
  - `beforeunload` con y sin datos;
  - Wake Lock con y sin soporte;
  - **axe sin fallas** en paso 1, pregunta, nivel, resumen, resumen de gimnasio y diálogo;
  - y que no hay peticiones propias.
- e2e de siempre (`npm run test:e2e`): **116 en verde**.
- e2e de /interno contra el build de producción (`npm run test:e2e:interno`): **11 en verde**, incluido el 404 de
  `/muestrario/diagnostico` en producción.
- `npm run build` limpio.

## JS de las páginas públicas, antes y después

Se midió la suma de los scripts que carga cada página prerenderizada, en gzip. "Antes" es el build de esta rama en el
bloque 1, con el mismo código público que `main`.

| Página | Antes | Después | Diferencia |
| --- | --- | --- | --- |
| `/` | 181,540 B (12 scripts) | 181,540 B (12) | 0 |
| `/sistemas` | 179,488 B (12) | 179,488 B (12) | 0 |
| `/boaz` | 179,014 B (11) | 179,014 B (11) | 0 |
| `/tu-negocio/barberias` | 179,488 B (12) | 179,488 B (12) | 0 |
| `/diagnostico` (formulario) | 257,322 B (13) | 257,396 B (13) | **+74 B** |

**Hay que decidir sobre `/diagnostico`.** El formulario público carga los mismos módulos que antes, pero Turbopack
volvió a partir dos chunks compartidos: 4,946 + 72,629 B pasan a 5,220 + 72,430 B, en gzip. El motivo es que `Boton`,
`Campo` y `precios.js` ahora también los usa `/interno`. Se buscaron textos y nombres de `/interno` en los chunks de la
página y no hay ninguno. Son +209 B sin comprimir de envoltura de chunks, no código nuevo.

Para llegar a 0 habría que copiar el botón y el campo dentro de `/interno`, lo que duplica componentes de
`calidad.md`. Mi recomendación es aceptarlo. Si no, lo cambio.

## Metas

- Lighthouse no se midió en `/interno/diagnostico`: pide sesión y no se indexa. La accesibilidad se cubre con axe en
  cada paso.
- Contraste: textos en línea y neblina sobre noche, y el verde solo como fondo con texto negro, igual que el resto del
  sitio.

## Pendientes

- Probar en producción con la sesión real de Carlos, después de fusionar: entrar, recorrer un diagnóstico, "Abrir en
  WhatsApp" en el celular, y ver que la pantalla no se apaga.
- Esta rama no trae `arreglo-formularios`, que sigue sin fusionar.
