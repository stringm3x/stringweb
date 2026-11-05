# STRING · KB Maestro

**Edición 11 · 4 de noviembre de 2026 · Autor: Carlos Avilés · CDMX, México**

> Documento maestro de STRING: la casa. Fuente de verdad única para qué es STRING, sus líneas y productos, el negocio, la venta, la marca, el sitio y las cifras públicas.
> Sustituye a la edición 10. **Novedad (ed. 11): el sitio se pone al día con el plan de ventas.** En producción los lotes 13 a 18: limpieza de código (14), cimientos de la herramienta privada `/interno` con Supabase propio y TOTP (16), **precios con IVA incluido en todo el sitio** (17) y **SEO** (18: títulos y descripciones por ruta, JSON-LD, sitemap, favicon e imagen de Boaz para compartir). Siguen el lote 19 (rendimiento) y el contenido de la herramienta de diagnóstico. Antes (ed. 10): sale el plan de ventas, con precios nuevos con IVA, boceto, pagos, método SPIN y Carlos como la cara de STRING. Antes (ed. 9): desarrollo en pausa tras el lote 13. Estado y siguiente paso en la Parte 10.

> 🧭 **¿Chat nuevo?** Lee la Parte 1 (qué es STRING), la Parte 6 (la marca) y la Parte 10 (estado y siguiente paso). Con eso basta para retomar.

---

## Parte 0 · Cómo se usa este documento

- Si algo en el sitio, una propuesta, un CV o una conversación contradice este documento, **manda este documento**. En diseño visual de STRING, manda **STRING — Identidad**.
- **Una sola fuente de cifras:** la Parte 8.
- **Se actualiza cuando cambia un hecho**, no una idea. Lo que está en exploración se marca como tal.
- **Una sola copia por documento** en el proyecto.

### Mapa de documentos

| Documento | Manda en |
|---|---|
| **KB STRING** (este) | La casa: negocio, líneas, marcas, venta, sitio, cifras, fundador. Resumen de la marca |
| **STRING — Identidad** | **Fuente de verdad visual de STRING:** esencia, logo y versiones, color, tipografía, arte, página, reglas |
| **STRING · Identidad 2026** (Claude Design) | Tokens, 5 archivos de logo y componentes vivos (Logo, Botón, Cuerda, Ciudad, Galería, Portada) |
| **STRING — Territorios** (lienzo) | Historial visual de todas las exploraciones. Páginas clave: "Premium + arte" y "La palabra con su detalle", opción 01 |
| **KB del chat creativo** (`claude/KB-Chat-Creativo-STRING.md`) | Cómo se llegó a la identidad y cómo decide Carlos en diseño |
| **KB Boaz** (`KB-Maestro-Boaz.md`) | El producto Boaz: planes, qué existe, código, entornos, ramas |
| **Visión Boaz** (`Vision-Boaz.md`) | Hacia dónde va Boaz |
| **Diseño de Boaz** (`Boaz-Direccion-de-diseno-G.md`) | Todo lo visual de Boaz |
| Sistema anterior de STRING (Anton + brochada) | **Solo consulta.** Reemplazado por Identidad 2026 |
| **STRING y Boaz · Lo que se rescata de Codeblock** (doc) | **Solo consulta.** Lo decidido ya está en este KB |
| **STRING — Textos del sitio** (doc) · https://claude.ai/artifact/2PW25r68AN2zy8jwxsMmmG | **Cada palabra del sitio.** En el repo: `docs/textos.md` (incluye § Interno, § Precios con IVA · lote 17 y § SEO · lote 18) |
| **STRING — Plan de calidad del sitio** (doc) · https://claude.ai/artifact/6L59jkaYk4utCvQ9A3kgk6 | Fases, lotes, mapa del sitio y reglas de calidad. Aprobado 29 oct |
| **STRING — Brief del sitio** (doc) · https://claude.ai/artifact/JvPowr8zsNrkSpP99WT3TM | El rediseño original (lotes 0 a 5). Histórico |
| **Lienzos de diseño** | Salas: https://claude.ai/artifact/D4xjaWwRuNCyN75ceCcBKp · Componentes: https://claude.ai/artifact/Ao5aw4HEyCV8s1nPdXfDaQ · Movimiento: https://claude.ai/artifact/JxrLvwmNGof8vVTVdjR4Lf · Página de nivel: https://claude.ai/artifact/V7Fnmygn6q5Y1za9B19cks · **Productos** (camino A elegido): https://claude.ai/artifact/PmHq9tou26MHVMPa5Q2RvV |
| **En el repo `stringweb`** | `CLAUDE.md` (reglas de Claude Code, rutas, `/interno`, precios) · `docs/calidad.md` · `docs/movimiento-salas.md` · `docs/pagina-nivel.md` · `docs/estado.md` (estado técnico, lotes y pendientes) · `docs/diseno.md` y `docs/textos.md` (copias de los docs) · `docs/kb/` (copia de este KB) · `app/lib/precios.js` (fuente única de precios) · `reportes/` (un reporte por lote, hasta `lote-18-reporte.md`) |
| **Método de trabajo · Chat principal + Claude Code** (doc) · https://claude.ai/artifact/WHzRwTwVFJpTMNPc2AgVDG | Cómo se trabaja con Claude Code: lotes, plantilla de prompt, puntos de control |
| **Plan de Ventas — STRING y Boaz** (doc) · https://claude.ai/artifact/1xMBhaDVu2fLzVTTKYcgfz | **Fuente de verdad de ventas:** cliente ideal, método, precios, pagos, canales, metas a 90 días, aprender a vender |

---

## Parte 1 · Qué es STRING

**STRING es un taller de software mexicano que crea sus propios productos SaaS y construye sistemas a la medida, con calidad premium y con arte.** Fundado por Carlos Avilés, desarrollador, en CDMX.

STRING es **la casa**: la madre de todos los productos. Cada producto tiene nombre, marca y tema propios, y STRING los firma. El primero es **Boaz, by STRING**, el sistema para gimnasios.

**Cómo lo define el fundador (28 oct):** "Agencia de sistemas de calidad premium, simple como Apple pero vistosa, con diseño propio que diga mucho."

### La historia

> Construyo el software con el que opero mi propio negocio.

STRING nació haciendo sistemas para clientes. Construyó uno para un gimnasio que conocía desde dentro, y se volvió un producto. Mismo arco que 37signals con Basecamp: el estudio crea su producto y el producto se vuelve el negocio.

**Frase sobre Evolution GYM (28 oct): "el gimnasio de mi familia".**

### Mensajes

| Mensaje | Estado |
|---|---|
| **"Software hecho con oficio. Y con arte."** | Titular de la portada nueva |
| "No necesitas más seguidores. Necesitas un sistema que convierta." | **Retirado** (28 oct): suena a agencia de redes |
| "El sistema trabaja aunque tu negocio no esté disponible." | **Se queda** como titular de la sala de continuidad (danza) |
| **"Arte y calidad no están peleados."** | Entrada de la sección de niveles del sitio, no titular |
| **"Un sistema listo o uno a tu medida."** | Titular de `/productos` (30 oct) |

### El problema que resuelve

Los negocios con local en México captan clientes por Instagram y WhatsApp y los pierden en el camino:

1. Alguien pregunta por precio y nadie responde a tiempo.
2. La conversación se pierde entre cientos de chats.
3. El interesado no recibe seguimiento y se enfría.
4. El personal registra pagos en Excel, sin historial ni control.
5. Nadie sabe cuántos clientes están activos y cuántos se fueron.
6. El dueño depende de su memoria y **no sabe cuánto gana**.

> No es falta de demanda. Es falta de sistema.

### Para quién

**Negocios con local en México:** mostrador, clientes que vuelven, un dueño que opera todos los días. Gimnasios, barberías, estéticas, clínicas.

**Desde un negocio con local hasta una empresa grande. Misma calidad; cambia el alcance.** Las empresas grandes entran por el nivel Empresa (Parte 5).

---

## Parte 2 · Las dos líneas

| Línea | Qué es | Modelo | Papel |
|---|---|---|---|
| **Productos** | SaaS propios por nicho, cada uno con su marca | Suscripción mensual | El activo. Ingreso que no depende de horas |
| **A la medida** | Sistemas construidos para un negocio, **cada uno con su propia obra** | Proyecto + continuidad mensual | Financia hoy y es el laboratorio del siguiente producto |

**Las dos líneas en el sitio (en producción desde el lote 9a).** La página `/productos` muestra las dos:

- **SaaS:** Boaz primero, en una sala clara propia, con su historia (nació de un sistema a la medida para Evolution GYM y se volvió producto), lo que hace hoy, sus planes Starter y Pro y su registro. Cierra con "Boaz es el primero", **sin nombres ni fechas** de lo que todavía no existe.
- **Sistemas a la medida:** una vitrina de cinco sistemas de ejemplo (restaurante, clínica, barbería, tienda en línea, empresa), uno por nivel, **marcados "Ejemplo"** y con "Datos de ejemplo" en cada pantalla, sin nombres de negocios. Cada sistema real entregado ocupa su lugar como caso.

### La agencia como laboratorio

1. **Pagar las cuentas** mientras los productos crecen.
2. **Investigar:** cada proyecto en un nicho es una exploración pagada del siguiente producto. Boaz nació así.

**Cualquier gimnasio que llegue a STRING se dirige a Boaz**, salvo que necesite algo que Boaz no cubre.

### El arco

| Etapa | A la medida | Productos | Termina cuando |
|---|---|---|---|
| **1 · Hoy** | Paga las cuentas | Boaz en piloto | Primer gimnasio que paga |
| **2 · Tracción** | Selectiva | Boaz con 10 a 20 gimnasios | Boaz cubre los gastos fijos |
| **3 · Producto** | Laboratorio | El negocio principal | — |

**Regla:** si en doce meses la agencia creció y Boaz no, el plan no está funcionando.

### Principios

- **Premium desde el día uno.** "Acabado" = funciona y es confiable para quien lo usa.
- **Misma calidad en todos los niveles; cambia el alcance** (como MacBook Air y Pro). Más barato no significa menos calidad.
- **El precio no baja por presión ni se descuenta.** Se ajusta alcance, se agrega un bono o se extiende la prueba.
- **Ningún dato público sin respaldo.**
- **Nada que no exista aparece en pantalla ni en venta.**
- **Se diseña para quien opera desde un celular**, en su mostrador, con prisa.

### Reglas de operación

No prometer ventas garantizadas: **se garantizan tiempos y funcionamiento, nunca ventas** · no iniciar sin anticipo · **alcance congelado con documento firmado antes de construir;** lo nuevo se cotiza aparte o va en la siguiente versión · mapa de procesos firmado antes de sistemas complejos · nada de precios de la competencia ni "nadie en México" sin fuente.

---

## Parte 3 · Arquitectura de marcas

**STRING firma; cada producto tiene su propia cara.** Una casa con marcas respaldadas.

| | **STRING** | **Boaz** | **Siguientes** |
|---|---|---|---|
| Qué es | El taller | Producto para gimnasios | Por nicho |
| Cómo se vende | Diagnóstico y propuesta | Demo y prueba | Demo y prueba |
| Firma | Carlos, en persona | "by STRING", chico y en gris | "by STRING" |
| Casa | stringwebs.com | Propia (registro en el IMPI cuando haya ingresos) | Propia |
| Fondo | **Noche** | Papel claro | Propio |
| Color | **Verde** | Azul eléctrico `#2979FF` (mancha, nunca texto) | Propio |
| Trazo | **A mano** (ciudad de una línea) | Con regla (plano técnico) | Propio |

### Reglas de firma

- "by STRING" va pequeño, con STRING en Anton (en el sitio, el SVG `string-firma-gris.svg` en línea, en `#5F6368`).
- **Dentro de un producto**, STRING va en gris. El verde aparece solo cuando firma la casa (sitio, tarjeta, propuestas).
- **El verde de STRING no aparece en el panel de Boaz:** ahí el verde significa "pagado".
- STRING Admin conserva la identidad de la casa.
- **Token `boaz-azul` del sistema de STRING: `#2979FF`** (corregido en el lote 9a; antes `#1E44FF`). Solo relleno: 3.6:1 sobre papel.

**Lo que comparten:** la manera de hacer las cosas. Oficio, datos que no se inventan, cifras en monoespaciada, nada que no exista. Distintos a la vista, claramente de la misma mano.

---

## Parte 4 · Productos

### Boaz · el sistema para gimnasios

**Boaz es el sistema con el que un gimnasio mexicano sabe cuánto gana, ve quién se le va antes de que se vaya, y le da a sus socios una razón para volver.** Multitenant, en pesos, sin instalación, sin límite de socios.

- **Nombre:** Boaz (hebreo, "en él hay fuerza"; columna del templo de Salomón). **Sale con su nombre** (decisión de Carlos, 29 oct); **en el sitio desde el lote 9a**. El registro en el IMPI se hace cuando haya ingresos; se recomienda antes la búsqueda gratuita en Marcanet.
- **En público se dice "cuánto entra", no "cuánto gana"**, hasta que exista Finanzas.
- **Detalle:** KB Boaz. **Visión:** Visión Boaz.

| Plan | Frase | Precio | Anual |
|---|---|---|---|
| **Starter** | "Sal del cuaderno." | $799/mes | $7,990 |
| **Pro** ★ | "Vende más en el mismo local." | **$1,299/mes** | $12,990 |
| **Escala** | "El sistema trabaja y te avisa." | **$1,999/mes** | $19,990 |

**Precios con IVA incluido (4 nov).** Pro es el plan objetivo de venta. Pro fundador: $799 fijo 12 meses para los primeros 5 gimnasios (**solo en visita, no va en el sitio**). Escala no se vende hasta cumplir sus tres condiciones (KB Boaz, Parte 2). Pro sube a $1,499 para clientes nuevos con 5 gimnasios pagando y 2 testimonios. **En el sitio desde el lote 17:** Starter $799 · Pro $1,299, con "IVA incluido".

**Estado:**

- **En producción desde el 13 de octubre** con Evolution GYM. Cobro seguro y aislamiento entre gimnasios probados.
- **Se usa poco todavía** (en pruebas en recepción). En público: "En producción desde octubre de 2026", no "todos los días".
- **Pausado:** WhatsApp automático, alertas, bot e inbox. **Escala no se vende como entregable** hasta activarlos, y **no aparece en el sitio**.
- **No existe y no se vende:** sucursales, landing propia, biométrico, rutinas con IA, CFDI.
- **Siguiente fase:** "listo para piloto" (respaldos, gimnasio de demostración, bienvenida y portal), luego **Finanzas: "el número del lunes"**.
- **Registro en el sitio:** `/gym/registro` registra un gimnasio para una prueba de 14 días con Pro completo, sin tarjeta.

### Siguientes productos

| Nicho | Orden | Por qué |
|---|---|---|
| Barberías | 2.º | Operación casi idéntica, más núcleo reaprovechado |
| Clínicas | 3.º | Mayor ticket, más riesgo regulatorio |
| Restaurantes | 4.º | Mercado grande, menos núcleo reaprovechado |

### Abrir un producto nuevo (los cuatro a la vez)

10 clientes de pago · 6 meses de permanencia · rotación menor al 5 % · soporte menor a 5 h/semana.

**Costo honesto de replicar:** 50 % a 60 % de construir el primero. El 50 % que no se reutiliza (el dominio del nicho) es el que define si el producto sirve.

---

## Parte 5 · Sistemas a la medida

| Nivel | Nombre | Desde (IVA incluido) | Qué agrega |
|---|---|---|---|
| **1** | **Responde** | Desde $9,500 | Diagnóstico, landing, WhatsApp, formulario, mensaje automático |
| **2** | **Organiza** | Desde $21,000 | Captura y registro de prospectos, calificación, avisos |
| **3** | **Automatiza** | Desde $32,500 | Respuesta inmediata, agenda, seguimiento, recordatorios, panel |
| **4** | **Controla** | Desde $46,500 | Desarrollo a medida, CRM propio, paneles, integraciones, **tienda en línea propia** (catálogo, carrito, pagos, inventario y pedidos) |
| **5** | **Empresa** | Cotizado (nunca menos de $80,000) | Empresas grandes: sistema completo con equipo por proyecto, **incluida una tienda en línea grande** (varias sucursales, catálogo amplio, conexión con sus sistemas). Mapa de procesos firmado antes de cotizar |

**Precios con IVA incluido (4 nov):** todo precio público de STRING y Boaz va con IVA incluido, redondeado para que a STRING le quede lo mismo que antes sin IVA (Responde deja $8,190; Organiza $18,103; Automatiza $28,017; Controla $40,086). Frente a agencias en México (landing $15k–$60k, sistemas internos $80k–$400k, mantenimiento $3k–$15k al mes) STRING está 30–60 % abajo: sirve para entrar sin casos. **Después de 3 casos entregados se revisan los pisos al alza.** El régimen fiscal (si se cobra IVA y cuánto queda) lo confirma un contador; si cambia, se recalculan.

**E-commerce (30 oct):** entra a la oferta. Una tienda en línea propia va en Controla; una tienda grande, en Empresa. Al primer cliente de e-commerce: alcance cuidado y precio con margen para aprender, porque todavía no hay una tienda entregada.

**Una sola familia.** Los cinco niveles reciben la misma calidad, el mismo sistema de diseño, la misma entrega cuidada y su obra. Lo que cambia es cuántos flujos, módulos e integraciones lleva el sistema. Empresa no tiene precio público.

### Cómo se nombran los niveles

**El cliente dice el nombre; STRING muestra el concepto.** Cada nombre es lo que el negocio necesita, en palabras del dueño, de lo más chico a lo más grande. El cliente se ubica solo, sin explicación.

| Nivel | El dueño dice… |
|---|---|
| Responde | "Me escriben y no alcanzo a contestar" |
| Organiza | "Tengo a mis clientes regados en chats y en Excel" |
| Automatiza | "Quiero que el sistema siga aunque yo no esté" |
| Controla | "Quiero saber cuánto gano y qué está pasando" |
| Empresa | Empresas grandes, con equipo por proyecto |

En la llamada: *"¿Se te van mensajes sin contestar? Eso es Responde. ¿Ya contestas pero se te pierden en el camino? Eso es Organiza."*

**El arte se ve, no se lee: cada nivel suma un arte** a los anteriores, y Empresa tiene las siete. Mismo sistema, más alcance.

| Nivel | Arte que suma | Por qué |
|---|---|---|
| Responde | Literatura | Un string es texto: tu negocio contesta a tiempo |
| Organiza | + Arquitectura | Cada cliente en su lugar: estructura |
| Automatiza | + Danza | Todo se mueve solo y a tiempo, como coreografía |
| Controla | + Pintura | Ves el cuadro completo de tu negocio |
| Empresa | + Música, escultura y cine | La obra completa, como una orquesta con todo el equipo |

En la sala de música, cada nivel es una cuerda que suena al tocarla, con una viñeta en línea de sus artes acumuladas. **Remate de venta:** el sitio tiene las siete salas, así que es una obra de nivel Empresa: "esto que estás viendo es lo que construimos".

**Nombres anteriores** (Conversión, Captación, Automatizado, Especializado): retirados. No se usan Starter, Pro ni Escala, que son de Boaz.

**Gimnasios → Boaz.** Paquete GYM a medida ($45,000–$55,000, precio sin IVA, sin recalcular) solo si Boaz no lo cubre; **se cotiza en persona y no aparece en el sitio** (lote 17).

**La obra de cada cliente:** cada sistema a medida lleva su propia obra, que cuelga en la galería de STRING. Es parte de la oferta. **Nace en el boceto** (Automatiza en adelante); en Responde y Organiza se define en la llamada de diagnóstico, con plantilla y tiempo acotado para que no se coma el margen.

### El boceto (pieza de entrada)

Pieza pagada para **Automatiza, Controla y Empresa**: mapa de procesos + primera pantalla dibujada + la obra del cliente en boceto.

- **Se acredita al 100 %** si el cliente contrata el sistema dentro de 30 días.
- **Precio (4 nov): $3,500 con IVA incluido** para Automatiza y Controla; Empresa cotizado, desde $7,500. Se entrega en ~5 días hábiles y solo se ofrece después de una buena llamada de diagnóstico. **En el sitio sigue sin precio.**
- **Cómo se acredita:** se descuenta del precio del sistema y el anticipo se calcula sobre lo que falta. Ejemplo, Automatiza: boceto $3,500 + anticipo 40 % de $29,000 = $11,600 + $8,700 + $8,700 = $32,500. Si no contrata en 30 días, no hay reembolso y el mapa de procesos y la pantalla son del cliente. Si contrata después, ya no se acredita.
- Texto para propuesta y recibo: "Boceto: $3,500 IVA incluido. Se descuenta completo del precio del sistema si contratas dentro de 30 días a partir de la entrega. Si no, el mapa de procesos y la pantalla son tuyos."
- Si los primeros 2–3 prospectos grandes lo rechazan todos, se revisa.
- La llamada de diagnóstico **sigue siendo gratis** para todos los niveles. En Responde y Organiza no hay boceto.

### Continuidad

| Plan | Precio | Qué incluye |
|---|---|---|
| **Cuida** | Desde $2,100/mes | Hosting, mantenimiento, soporte. Si el cliente pide más de 2 h al mes, pasa a Mejora |
| **Mejora** | Desde $3,500/mes | Optimización mensual y ajustes |
| **Impulsa** | Desde $5,800/mes | Análisis, mejoras, soporte prioritario |

Precios con IVA incluido (4 nov). En el sitio solo aparece "Desde $2,100 al mes"; los planes van por nombre, sin precio.

**Nombres (28 oct):** verbos, como los niveles. Antes Base, Crecimiento y Escalamiento; se cambiaron porque "Escalamiento" chocaba con el plan Escala de Boaz.

El proyecto es la puerta; la continuidad es el negocio. **Toda propuesta incluye su continuidad, con precio.**

### Sectores

**Toda la escalera de negocios (30 oct):** de lo más simple a lo más grande. Barberías y estéticas, clínicas y consultorios, restaurantes, gimnasios (van a Boaz), **tiendas en línea** y empresas grandes de cualquier sector. En el sitio, cada giro tiene su página en "Tu negocio", con su escalera completa de niveles.

### Venta y entrega

1. Diagnóstico gratuito. 2. Llamada de 20–30 min **de escucha**: cómo se siente su negocio, no un pitch. De Automatiza en adelante, la llamada lleva al **boceto**. 3. Propuesta con nivel y continuidad. 4. Propuesta formal: incluye, **no incluye**, precio, vigencia de 7 días. 5. Anticipo: N1–N2 50/50; N3–N4 40/30/30.

**Método de venta (4 nov):** tono Apple (asesor tranquilo, sin presión, presentar un solo nivel) y **venta consultiva con SPIN**: Situación, Problema, Implicación (cuánto le cuesta el problema al mes) y Necesidad. El dueño habla el 70 % de la llamada; la propuesta usa su propio número ("pierdes ~$6,000 al mes y esto cuesta $9,500"). Seguimiento al día 2 y al día 6. Detalle en el Plan de Ventas.

**Pagos y financiamiento (aprobado 4 nov):** por defecto, contado con anticipo. Primera opción para financiar: **meses con tarjeta** por pasarela (STRING recibe el total; la comisión se suma al precio de esa modalidad; revisar comisiones vigentes antes de usarla). **Financiamiento propio**, solo si la tarjeta no es opción: (1) anticipo mínimo del 40 % que cubra los costos; (2) plazo máximo de 6 meses; (3) precio a plazos un poco mayor que el de contado; (4) contrato firmado, revisado por abogado; (5) código y hosting a nombre de STRING hasta el último pago; (6) si deja de pagar, se pausa el servicio; (7) nunca sin anticipo pagado.

N1–N2: 4 fases, 2–3 semanas. N3–N4: 7 fases, 4–6 semanas, **mapa de procesos firmado antes de código.** Empresa: fases y tiempos en su propuesta.

### Estándar de servicio

Igual en todos los niveles. Es lo que Carlos cumple hoy, solo. Se publica en el sitio en una página.

| Qué | Tiempo |
|---|---|
| Respuesta a mensajes | 1 día hábil (lun–vie, 9 a 19 h) |
| El sistema no cobra o no deja entrar | Atención en 4 horas hábiles |
| Resumen escrito de cada llamada | El mismo día |
| Avance del proyecto | Por escrito, cada viernes |
| Propuesta tras el diagnóstico | 2 días hábiles |
| Responsable | Carlos Avilés, con nombre |

**Regla:** si un tiempo se rompe dos veces en un mes, se ajusta el estándar; no se esconde.

### Equipo por proyecto

Carlos más sus tíos y desarrolladores conocidos, como freelancers pagados por proyecto. **Las reglas se activan cuando un proyecto necesita equipo**, y aplican a todos, familia incluida:

1. **Contrato simple por proyecto:** alcance, entregables, pago, confidencialidad y cesión del código a STRING (y de STRING al cliente al liquidar).
2. **Pago por entregable aprobado, nunca por hora**, y solo después de que entra el anticipo del cliente.
3. **El código vive en repos de STRING**, nunca en la cuenta del freelancer.
4. **Acceso mínimo:** sin producción ni datos reales del cliente salvo que el entregable lo exija.
5. **Calidad:** sistema de diseño de STRING, definición de terminado escrita y revisión final de Carlos antes de entregar.
6. **El cliente habla solo con Carlos.** Nadie subcontrata.
7. **Margen:** el precio al cliente se fija antes de cotizar al freelancer; su costo no pasa del 50 % del proyecto.
8. **Primer trabajo chico y pagado** antes de un proyecto completo.

La plantilla de contrato la revisa un abogado una vez, antes del primer proyecto con equipo.

---

## Parte 6 · La marca de STRING

> **Fuente de verdad: STRING — Identidad** y el sistema **STRING · Identidad 2026**. Esto es el resumen.

### El porqué

**STRING hace software con oficio y con arte: cada sistema que construye tiene su propia obra.**

| Idea | De dónde sale | Cómo se ve |
|---|---|---|
| **El texto** | Un *string* es texto en programación | La I del logo es un cursor |
| **La cuerda** | *String* es cuerda de instrumento | Cuerdas que vibran y suenan en la página |
| **La obra** | STRING es la casa, como una galería | Cada sistema cuelga su arte: STRING, Boaz y cada cliente |

**Dirección:** premium como Apple (simple, mucho aire, frases cortas) + arte (fondos, animación, dibujo, música).

### Lo decidido

| Pieza | Decisión |
|---|---|
| **Logo** | STRING en Anton, con **la I como cursor verde que parpadea**. Funciona como la flecha escondida de FedEx |
| **Cursor** (28 oct) | **Bloque verde de terminal con la I en negativo, en forma de puntero.** Parpadea en ciclo de 1.1 s, de golpe: apagado queda la I de Anton y la palabra nunca se rompe. Impreso y con movimiento reducido, encendido fijo. Referencia: lienzo STRING — El cursor, camino B |
| **Ícono** | El bloque verde con la I en negativo, en un cuadrado noche. Se lee a 16 px. En el sitio también como `favicon.ico` (16, 32 y 48 px) desde el lote 18 |
| **Versiones del logo** | Noche, pared, una tinta, firma gris, ícono (5 archivos reales en el sistema, con el cursor B desde el 28 oct). Para Google (JSON-LD) se usa la versión **pared** en PNG (`public/logo/string-pared.png`) |
| **Color** | Noche `#000000` · un solo acento verde `#50FF05` · sobre fondo claro `#1A7F00` · pared clara `#F4F2EC` |
| **Tipografía** | **Anton solo para el logo** · Geist para titulares y texto · Geist Mono para cifras y etiquetas. En la sala de Boaz de `/productos`, los nombres de los planes van en Archivo (letra de Boaz) |
| **Arte** | Ciudad de México en una sola línea · cuerdas que vibran y suenan · galería · estrellas. **La luna salió del arte (30 oct), también del cuadro de STRING en la galería (lote 9a).** |
| **Concepto del sitio** | **Las siete bellas artes, una por sala** (Parte 7). Literatura, música y pintura ya estaban en la marca: el cursor, las cuerdas, la ciudad y la galería |
| **Fondo claro** (2 nov) | **El fondo claro (pared/papel) es de Boaz.** En STRING solo queda en la galería (sala 5); todo lo demás va en noche. Una prueba del repo lo vigila |
| **Paleta del arte** (29 oct) | La interfaz sigue con un solo acento (verde); **el color cálido vive solo en el arte**: oro en los marcos, terracota, madera, mármol, concreto y vidrio, amarillo de obra. Tabla completa en STRING — Identidad |

**Cambios contra la marca anterior:** Anton deja de ser tipografía de titulares (solo logo) · Ubuntu Mono → Geist Mono · el verde sobre claro pasa de `#2f7a05` a `#1A7F00` · el papel de `#f7f5ef` a `#F4F2EC` · la brochada, el grano y el grabado del sitio actual se retiran.

### Cómo decide Carlos en diseño (para cualquier chat)

- **El porqué tiene que salir de él.** Uno inventado se rechaza.
- **Decide con el ojo:** mostrar opciones dibujadas, no conceptos escritos.
- **Las referencias externas no le funcionan.**
- **Le gusta lo concreto y reconocible:** un logo "tipo Amazon o Pepsi", no un símbolo abstracto.
- **"No me gusta ninguna" = cambiar de camino**, no afinar el mismo.
- **Descartado para siempre:** arañas, animales y mascotas para STRING, ADN o secuencias como arte principal, telar, bordado, logos de una sola línea.
- **Siempre se quedó:** el nombre en Anton, el verde, la CDMX de una línea.

### Reglas fijas

- **El arte nunca tapa la información:** si se quita, la página sigue vendiendo.
- **Contraste mínimo 4.5:1.**
- **Nada inventado:** ni clientes, ni cifras, ni testimonios. Los ejemplos dicen que son ejemplos.
- **Boaz sale con su nombre** y la firma "by STRING" (en el sitio desde el lote 9a).
- **Distinto de Boaz y de la misma familia.**

### Copy

Español mexicano. Habla un desarrollador que opera su propio negocio, no una agencia. **No se dice "hecho en casa" ni "probado en casa"** (30 oct): suena poco profesional. Se dice lo que pasó: probado en un negocio real, con clientes de verdad. Frases cortas, afirmaciones, números concretos o nada. "Panel", no "dashboard"; "prospecto", no "lead".

---

## Parte 7 · El sitio: stringwebs.com

**La portada no es catálogo: es prueba de credibilidad.** La mayoría llega porque conoció a Carlos.

### Concepto: las siete salas

El sitio es un recorrido por siete salas, **cada una hecha con el lenguaje de una de las siete bellas artes.** Guiño de casa: el Palacio de Bellas Artes está en la ciudad dibujada.

| Sala | Arte | Qué vende | Cómo se ve |
|---|---|---|---|
| 1 · Inicio | **Literatura** | Qué hacemos y para quién | El cursor escribe el titular: "Software hecho con oficio. Y con arte." |
| 2 · El problema | **Escultura** | "No es falta de demanda. Es falta de sistema." | Un bloque en línea que se talla al bajar: el sistema quita lo que sobra |
| 3 · El caso real | **Cine** | Carlos, el fundador, cuenta la historia de Evolution GYM | Fotogramas dibujados (el mostrador de Evolution GYM) al hacer scroll y las cifras en mono, como créditos. **Sin foto** (2 nov) |
| 4 · Los niveles | **Música** | Responde · Organiza · Automatiza · Controla · Empresa | Una cuerda por nivel, que suena si el visitante enciende el sonido, con una viñeta de sus artes acumuladas (Parte 5). Entrada: "Arte y calidad no están peleados." |
| 5 · La galería | **Pintura** | La obra de cada sistema | Marcos sobre pared clara: STRING (sin luna), **Boaz** y "Tu negocio" |
| 6 · Cómo trabajamos | **Arquitectura** | Proceso, el boceto y el estándar de servicio | El proceso como edificio en línea: cimientos, estructura, entrega |
| 7 · Continuidad | **Danza** | El cuidado mensual | Líneas que se mueven a ritmo constante: el sistema sigue vivo |

Después: quién soy · preguntas · llamado final, sin arte nuevo (la pausa antes de salir).

**Reglas del concepto:**

- **Un arte por sala**, no los siete mezclados: simple como Apple.
- **Todo en dibujo de línea**, como la ciudad. Nada de 3D ni video. **Única excepción: la foto real de Carlos en /nosotros**, junto a su presentación (decisión de Carlos, 2 nov; antes iba en la sala 3).
- **La arquitectura va a mano, no con regla:** el plano técnico es de Boaz.
- **El arte nunca tapa la información:** sin las siete artes, el sitio sigue vendiendo.
- **Lanzamiento:** literatura, música y pintura ya existen. Escultura, cine, arquitectura y danza, y las viñetas de los niveles, salen en versión sencilla (dibujo quieto y su texto) y se animan después de salir a vender.

**Productos:** tienen su propia puerta (`/productos`); no ocupan una sala.

### Precios en el sitio (en producción desde el lote 17)

**Se muestra el "desde" de cada nivel**, con los pisos de la Parte 5, **con IVA incluido**. Nunca el rango completo. La fuente única en el repo es `app/lib/precios.js`.

| Nivel | En el sitio |
|---|---|
| Responde | Desde $9,500 |
| Organiza | Desde $21,000 |
| Automatiza | Desde $32,500 |
| Controla | Desde $46,500 |
| Empresa | Se cotiza |
| Continuidad | Desde $2,100 al mes |
| Boaz | Starter $799 · Pro $1,299 al mes ($7,990 y $12,990 al año) |

**Etiqueta "IVA incluido"** (lote 17): en mono chico junto a cada "desde" y cada precio de Boaz (Ubuntu Mono en Boaz, Geist Mono en el resto). En las preguntas frecuentes, "(IVA incluido)" después de la cifra. En `/gym/registro`, la línea "Precios con IVA incluido." debajo del selector. **No van en el sitio:** Escala, Pro fundador, el paquete GYM ni el precio del boceto.

El boceto aparece sin precio: "se acredita completo si contratas el sistema".

### Herramienta privada de diagnóstico (`/interno`)

Página interna solo para Carlos, para usar durante la llamada o la visita: datos del prospecto, preguntas SPIN por giro, calculadora del costo del problema, nivel sugerido, resumen para mandar el mismo día e historial con etapa.

- **Cimientos en producción (lote 16, `4fca720`):** `/interno/entrar` y `/interno/diagnostico` (vacía). **Supabase propio de STRING** (nunca el de Boaz), un solo usuario (UUID en `INTERNO_USUARIO_ID`), **contraseña + TOTP** (sesión aal2), validado en el servidor con `exigirCarlos()`; si falta algo, nadie entra. Hasta 5 códigos malos antes de cerrar la sesión. `noindex`, `X-Robots-Tag`, `Cache-Control: no-store`, fuera del sitemap, del menú, del pie y de la medición. Supabase configurado y TOTP dado de alta (4 nov). Detalle en `CLAUDE.md` y `docs/estado.md`.
- **Variables (4):** `NEXT_PUBLIC_SUPABASE_URL`, la clave anon o publishable, `INTERNO_USUARIO_ID` e `INTERNO_SECRETO` (un valor distinto por entorno, `openssl rand -base64 32`). Alta del TOTP: `node scripts/interno/enrolar-totp.mjs`.
- **Lo que falta, en orden:** el chat de ventas define el contenido (preguntas por giro, reglas del nivel, plantilla del resumen) → Carlos lo prueba en 3–5 llamadas → el aviso de privacidad cubre los datos de prospectos (requiere el domicilio) → lote del flujo (pasos 1, 2, 4 y 5, primera tabla, la cuenta de intentos pasa a la base) → calculadora e historial. La precarga desde `/diagnostico` va en un lote aparte.

### SEO (en producción desde el lote 18)

- **Titles y descripciones por ruta**, desde los datos (`niveles.js`, `giros.js`), todos absolutos: portada "STRING · Taller de software en la Ciudad de México"; giros con local "Sistema para <giro> en CDMX", con "desde $9,500 con IVA incluido"; giros de empresas sin ciudad ni precio; /boaz "Boaz · Sistema para gimnasios en México, by STRING". Tabla completa en `docs/textos.md` § SEO · lote 18.
- **JSON-LD por página:** `ProfessionalService` en `/` (founder Carlos Avilés, areaServed Ciudad de México, **sin domicilio**, sameAs solo Instagram, logo PNG); `SoftwareApplication` en /boaz (Starter y Pro desde `precios.js`, MXN, IVA incluido); `BreadcrumbList` en niveles y giros. Nada en la 404 ni en /interno. Sin reseñas ni calificaciones: los resultados enriquecidos de negocio local y de app no salen hasta tener domicilio y reseñas reales. **FAQPage no va** (Google ya no lo muestra para sitios como este).
- **Sitemap con `lastmod` fijo por ruta**; head sin meta duplicadas; 404 con su título ("Esta sala no existe · STRING"), sin canonical; `favicon.ico`; imagen propia de /boaz para compartir (logotipo y lámina reales). `/gym/registro` pasó a `index, follow`.
- **Facebook y TikTok** salieron del `sameAs` (solo vivían ahí). Vuelven solo si Carlos los mantiene activos con su foto y el nombre de STRING.

**Llamado principal:** solicitar diagnóstico. Los productos tienen su propia puerta.

**Navegación:** Sistemas · Tu negocio · Productos · Nosotros · botón "Solicitar diagnóstico". Sistemas lleva a `/sistemas` y a una página por nivel; Tu negocio, a una página por giro; **Productos, a `/productos`** (barra, menú del celular y pie). "Galería" sale de la barra: se ve al recorrer la portada. Detalle en STRING — Plan de calidad del sitio.

**Contacto en el sitio (28 oct):** correo **stringwebmx@gmail.com**. WhatsApp: el número de STRING que ya está en el sitio.

**Formulario de diagnóstico (28 oct):** nombre · WhatsApp · giro · "¿Qué te pasa hoy?" con las frases de los niveles como opciones (más "Otra cosa"). Llega a stringwebmx@gmail.com por el mismo servicio de correo de Boaz. Al enviar: "Listo. Te respondemos en un día hábil." Al lado, un botón de WhatsApp más chico. Si el giro es Gimnasio, el correo dice "ofrécele Boaz". No guarda nada en base de datos. Texto completo en **STRING — Textos del sitio**.

### Estado (4 nov)

- **En producción** en www.stringwebs.com, en `main`: **lotes 0 a 18** (sin 15). Portada de siete salas, /sistemas y cinco niveles, /productos, /boaz, /gym/registro y /gym/gracias, /nosotros, /tu-negocio con diez giros y /tu-negocio/empresas, /diagnostico, legales, 404 y `/interno` (privada). Precios con IVA y SEO al día.
- **Commits de referencia:** lote 13 `f97bd84` · lote 14 `17d1efa` · lote 16 `4fca720` · lote 17 `4cbc6c4` · lote 18 PR #12 (anotar el SHA del merge).
- `/saas` y `/gym/empezar` dan **301 a `/boaz`**.
- **Pendiente fuera del código:** el dominio sin www redirige con **307** (temporal): cambiar a **308** en Vercel → Domains. Search Console sin verificar.
- **Métricas (local, celular):** rendimiento 96–98, accesibilidad 100, CLS 0. LCP simulado 2.5–2.8 s (real ~66 ms): es la simulación de Lighthouse contando el JS de hidratación. Se ataca en el lote 19.
- **Pruebas del repo:** 122 Vitest, 104 e2e de siempre, 10 e2e de /interno (contra build de producción).

---

## Parte 8 · Cifras públicas autorizadas

| Dato | Cifra | Uso |
|---|---|---|
| Socios cargados en Evolution GYM | 129 | Sitio, propuestas, demo |
| Socios activos en Evolution GYM | 70 | Sitio, propuestas, demo |
| Productos en inventario | 23 | Demo |
| Productos SaaS en producción | 1 | Sitio |
| Niveles de sistema | 5 | Sitio |
| Diagnóstico inicial | 24 horas | Sitio |

> ⚠️ **Por refrescar antes de publicar:** las cifras de Evolution son del 18 de septiembre. Al 28 oct el Marcador da **53 activos**, y faltan 15 socios por registrar. **El sitio sale sin cifras de socios**; se agregan al recontar.

**Forma correcta:** "129 socios cargados, 70 activos". Siempre juntas.

**Retiradas:** "10+ clientes", "2+ años", "3 sectores", "30 % más conversión", "nadie en México".

---

## Parte 9 · Decisiones

### Edición 11 (4 nov) · Lotes 14 a 18

| # | Decisión | Por qué |
|---|---|---|
| 1 | **`/interno` vive en el repo `stringweb`, con un Supabase propio de STRING** (nunca el de Boaz) | Un solo deploy y sistema de diseño; los prospectos de STRING no se mezclan con los datos de los gimnasios |
| 2 | **Privada de verdad:** login obligatorio, un solo UUID validado en servidor, contraseña + TOTP, falla cerrado, noindex y fuera de todo | Va a guardar datos personales de prospectos |
| 3 | **El contenido del diagnóstico se prueba en papel antes de programarlo** (3–5 llamadas) | No programar preguntas que luego cambian |
| 4 | **Precios con IVA en el sitio con la etiqueta "IVA incluido"** junto a cada precio; fuente única `app/lib/precios.js` | El cliente paga lo que ve |
| 5 | **Pro fundador, Escala, el paquete GYM y el precio del boceto no van en el sitio** | Ofertas de visita o que no se venden todavía |
| 6 | **SEO: primero las búsquedas de marca** ("STRING Carlos Avilés", "Boaz gimnasios"), luego las locales por giro | Se vende en persona; quien conoce a Carlos lo busca esa noche |
| 7 | **JSON-LD sin domicilio, sin reseñas y sin FAQPage**; sameAs solo Instagram | Nada inventado; FAQPage ya no se muestra |
| 8 | **Numeración de lotes por orden de fusión:** 14 limpieza, 16 /interno, 17 precios, 18 SEO (no hay 15) | Seguir el orden real en `docs/estado.md` |

### Edición 10 (4 nov) · Plan de ventas

| # | Decisión | Por qué |
|---|---|---|
| 1 | **Plan de Ventas — STRING y Boaz** como fuente de verdad de ventas | Un solo lugar para método, precios, canales y metas |
| 2 | **Meta a 90 días:** 2 sistemas a la medida cobrados + 5 gimnasios pagando Boaz | Ingreso para vivir de STRING mientras crece Boaz |
| 3 | **Salir a vender ya**, sin esperar al 14 de diciembre | El sitio ya es correcto; solo falta el domicilio del aviso |
| 4 | **Todo precio público con IVA incluido**, en STRING y Boaz | El cliente paga lo que ve |
| 5 | **STRING redondeado** para mantener el ingreso: Responde $9,500 · Organiza $21,000 · Automatiza $32,500 · Controla $46,500 · Empresa ≥ $80,000 · Cuida $2,100 · Mejora $3,500 · Impulsa $5,800 | Bajar para absorber el IVA quitaba ~14 % a precios ya bajos |
| 6 | **Boaz:** Starter $799 · Pro $1,299 (plan objetivo) · Escala $1,999 | Pro a $500 de Starter; defendible frente a Klasius ($999) |
| 7 | **Boceto $3,500** (Empresa desde $7,500), acreditable al 100 % en 30 días | Cubre 2–3 días de trabajo y filtra; para quien contrata es gratis |
| 8 | **Pagos:** meses con tarjeta primero; financiamiento propio con 7 reglas | Bajar la barrera sin volverse banco |
| 9 | **Método:** SPIN para a la medida; demo + prueba de 14 días acompañada para Boaz; tono Apple en ambos | Venta consultiva para ticket alto; el producto convence en el SaaS |
| 10 | **Canal principal: visita en persona** (gimnasios y negocios con local); redes solo confirman | Confianza local; la red cercana de Boaz está quemada |
| 11 | **Carlos es la cara, STRING es la casa** (WhatsApp con su foto, copy en primera persona) | La gente le compra a una persona |
| 12 | **Portada vieja de WhatsApp retirada** ("4 sistemas implementados", "85 %" sin respaldo) | Ningún dato público sin respaldo |
| 13 | **Herramienta privada de diagnóstico** propuesta al chat de dev | Guiar la llamada y guardar prospectos |

### Edición 5 (30 oct – 2 nov) · Lote 9a

| # | Decisión | Por qué |
|---|---|---|
| 1 | **/productos, camino A "Dos salas"**: Boaz en sala clara propia, vitrina a la medida en noche (lienzo STRING — Productos) | Distintos a la vista, de la misma familia |
| 2 | **Titular de /productos: "Un sistema listo o uno a tu medida."** | Nombra las dos líneas en una frase |
| 3 | **Escala no aparece en /productos** mientras WhatsApp y alertas estén en pausa | Su frase promete lo que está pausado |
| 4 | **"En producción desde octubre de 2026"** en lugar de "todos los días en el mostrador" | Evolution aún lo usa poco; se dice lo verificable |
| 5 | **"Cuánto entra", no "cuánto gana"**, hasta que exista Finanzas | Sin gastos no hay ganancia que mostrar |
| 6 | **El significado del nombre** ("en él hay fuerza") va en /productos | Es la historia de Boaz y la fe de su autor |
| 7 | **Botón "Registra tu gimnasio"** a /gym/registro | Ese formulario registra un gimnasio para prueba, no solo contacto |
| 8 | **Vitrina con cinco ejemplos marcados**, sin nombres de negocios | Mostrar cómo se ve sin inventar clientes |
| 9 | **Logotipo y lámina reales de Boaz**, copiados de `string-gym-saas` | Nada dibujado a mano en lugar de la marca real |
| 10 | **`boaz-azul` = `#2979FF`**, solo relleno | El azul real de G; el anterior era un error de copia |
| 11 | **La luna sale también del cuadro de STRING** en la galería | La ciudad es la misma en todo el sitio |
| 12 | **/saas y /gym/empezar: 301 a /productos#boaz**; /saas borrado | Una sola puerta para productos |
| 13 | **"Conoce Boaz" no va en /productos** hasta que exista la página de Boaz | Nada que no exista aparece en pantalla |
| 14 | **La foto de Carlos pasa de la sala 3 a /nosotros**; la sala 3 lleva un dibujo del mostrador como fotograma (2 nov) | Quien quiere conocerlo va a /nosotros; la portada queda toda en línea |
| 15 | **/nosotros como recorrido de cuatro paradas:** historia, método, equipo y fe (textos en borrador, lote 10) | Plan de calidad, lote 10 |

### Edición 3 (28 oct) · Lo rescatado de Codeblock

De Codeblock se tomaron **principios generales de negocio**, no su oferta: ningún nombre, precio, texto ni demo. STRING existía antes y queda claramente propio.

| # | Decisión | Por qué |
|---|---|---|
| 1 | **Niveles renombrados: Responde · Organiza · Automatiza · Controla · Empresa** (el 5.º, nuevo y cotizado) | El cliente dice el nombre y se ubica solo |
| 2 | **El boceto:** pieza de entrada pagada, acreditable al 100 % en 30 días, de N3 en adelante | El mapa de procesos ya se exigía; ahora se cobra, y ahí nace la obra |
| 3 | **Estándar de servicio** con tiempos que Carlos cumple hoy, igual en todos los niveles | Garantizar tiempos y funcionamiento, nunca ventas |
| 4 | **Equipo por proyecto** con ocho reglas, activas cuando un proyecto lo pida | Calidad y código de STRING aunque construyan otros |
| 5 | **"Arte y calidad no están peleados"** entra al sitio como entrada de los niveles | Ahí prueba algo: donde se comparan niveles |
| 6 | **El sitio son siete salas, una por cada bella arte** | Literatura, música y pintura ya estaban en la marca |
| 7 | **Cursor: bloque verde de terminal con la I en negativo** (camino B) | Se lee como cursor real y aguanta a 16 px |
| 8 | **Cada nivel suma un arte;** Empresa tiene las siete | Misma calidad y más alcance |
| 9 | **Precios en el sitio: el "desde" de cada nivel**; Empresa se cotiza; el boceto sin precio | Da confianza y filtra |
| 10 | **Mensajes de la casa** y **Evolution GYM: "el gimnasio de mi familia"** | La frase familiar es verdad y es más cálida |
| 11 | **Carlos se presenta como fundador en la sala 3, con foto real** | La gente le compra a una persona |
| 12 | **Galería: la lámina de Boaz** en su marco. **Sala 3 sin cifras de socios** al lanzamiento | Las cifras cambian mientras se registran 15 socios |
| 13 | **Continuidad: Cuida · Mejora · Impulsa** | "Escalamiento" chocaba con Escala de Boaz |
| 14 | **Formulario de 4 campos + botón de WhatsApp aparte** | La pregunta "¿Qué te pasa hoy?" dice el nivel antes de la llamada |
| 15 | **Aviso de privacidad y términos:** borradores con la LFPDPPP vigente (21 mar 2025); revisión de abogado cuando se pueda | Sin aviso no se puede lanzar |
| 16 | **La fe de Carlos: Salmos 73:25–26 al cierre de /nosotros** (Reina-Valera 1909) | Es él, sin desviar a quien llega por un sistema |
| 17 | **Paleta del arte:** colores de materiales reales; la interfaz sigue con el verde | Se ve vivo sin que el verde pierda fuerza |
| 18 | **Dibujos con más realismo:** perspectiva, volumen y sombra rayada, a mano | Se reconocen como cosas reales |
| 19 | **Sitio en producción** (29 oct) y **Plan de calidad aprobado** | El sitio correcto pasa a memorable |
| 20 | **Se sale a vender con todas las mejoras**; **Boaz sale con su nombre**, IMPI cuando haya ingresos | Vender con seguridad en lo que muestra |
| 21 | **Productos muestra las dos líneas**; el caso de Evolution GYM vive ahí | Las dos líneas son STRING |
| 22 | **E-commerce entra a la oferta:** tienda propia en Controla, grande en Empresa | Mostrar la escalera completa |
| 23 | **Fuera "hecho en casa" y "probado en casa"** de la voz | Poco profesional |
| 24 | **Lotes 6, 7 y 8 en producción**. Sala 3: "Probado en un negocio real." | Plan de calidad, fases 1 a 3 |
| 25 | **Cada página de nivel es una sala con su dibujo** | Habla el arte que ese nivel suma |
| 26 | **La luna sale del arte de la portada** (30 oct) | Decisión de Carlos |

### Edición 2 (28 oct)

| # | Decisión | Por qué |
|---|---|---|
| 1 | **Identidad nueva de STRING:** software con oficio y con arte; premium + arte | El porqué salió del replanteo del propio Carlos |
| 2 | **Logo con la I como cursor verde que parpadea** | Reconocible, con detalle escondido |
| 3 | **Anton solo en el logo;** Geist para todo lo demás, Geist Mono en cifras | Premium y simple |
| 4 | **Arte: CDMX de una línea, cuerdas que suenan, galería** | Lo único que se quedó en todas las vueltas fue la ciudad |
| 5 | **Cada sistema tiene su obra** y STRING es la galería | El arte es parte de la oferta |
| 6 | **El sitio anterior queda como marca anterior** hasta rehacerlo | Evita maquetar dos veces |

### Edición unificada (24 oct), vigentes

STRING es la casa · dos líneas (productos y a la medida) · la agencia es laboratorio · sectores recortados · un KB de la casa y otro de Boaz. Y de antes: planes de Boaz en tres escalones, Escala no se vende sin WhatsApp, competencia fuera del sitio, vender primero, sin segundo mes gratis, cuatro requisitos para abrir un nicho, continuidad en primer plano, cifras autorizadas.

### Abierto

- **Domicilio del responsable para el aviso de privacidad** (el sitio publicado aún dice "[domicilio por confirmar]"): bloquea vender con tranquilidad, el aviso de datos de prospectos de `/interno` y el Perfil de Negocio de Google.
- **Régimen fiscal con un contador:** confirma si se cobra IVA y cuánto queda de cada venta (persona física, RESICO o actividad empresarial).
- **Revisión legal del contrato de pagos a plazos**, del aviso de privacidad y de los términos.
- **Lineamientos de publicaciones de Instagram:** en exploración (Parte 12).
- **Facebook y TikTok:** ¿se mantienen activos? Solo así vuelven al JSON-LD.
- Revisión de la plantilla de contrato para el equipo por proyecto.
- Estándar técnico medible (rendimiento, accesibilidad, seguridad, respaldos): decir solo lo verificable.
- Si el sonido de las cuerdas se queda en el sitio real.
- Plan de Supabase de `/interno`: el gratuito se pausa tras una semana sin uso.
- Dominio de Boaz (cuando haya ingresos).
- Constituir STRING como empresa o seguir como persona física.
- Respaldos de producción de Boaz, antes del primer cliente de pago.
- **El sistema de diseño STRING · Identidad 2026 aún tiene `boaz-azul` en `#1E44FF`**: corregir a `#2979FF`.
- **KB Boaz** todavía dice "nombre interno hasta el IMPI": se actualiza en el chat de Boaz.

---

## Parte 10 · Arranque

### Estado al 4 de noviembre de 2026

- **Marca:** cerrada.
- **Sitio:** en producción con la identidad nueva, lotes 0 a 18 (sin 15): precios con IVA, SEO y `/interno` (cimientos). Ver Parte 7.
- **Boaz:** en producción con Evolution GYM. Cero clientes de pago. Sale con su nombre en el sitio.
- **A la medida:** sin proyectos entregados todavía.
- **Ventas:** plan aprobado (ed. 10); **se sale a vender ya**.

### La situación

**El fundador no tiene ingreso fijo y va a vivir de vender sistemas a la medida y Boaz.** Decidió (4 nov) **salir a vender ya**: el sitio es correcto y muestra los precios vigentes. Solo falta el domicilio del aviso de privacidad.

### El plan (Plan de calidad del sitio y lotes posteriores)

| Fase | Qué | Estado |
|---|---|---|
| 0 | Formulario en producción probado, domicilio, PageSpeed (la foto ya está: `public/foto/carlos.jpg`) | ⏳ **Pendiente de Carlos** |
| 1 · lote 6 | Componentes de calidad y `docs/calidad.md` | ✅ |
| 2 · lote 7 | Salas en movimiento (`docs/movimiento-salas.md`) | ✅ |
| 3 · lote 8 | Sistemas: /sistemas y cinco páginas de nivel | ✅ |
| 3 · lote 9a | **/productos** (camino A) y Boaz por su nombre en todo el sitio. PR #3, `74c8afd` | ✅ |
| 3 · lote 9b | **/boaz** con la identidad de Boaz; /gym/registro y /gym/gracias rehechos (sin Escala); /saas y /gym/empezar 301 a /boaz. PR #4 | ✅ |
| 3 · lote 10 | **/nosotros** como recorrido (historia, método, equipo, fe) con la foto de Carlos; sala 3 sin foto, tira dibujada. PR #5, `63eaa0e` | ✅ |
| 3 · lote 11 | **Tu negocio:** /tu-negocio en dos grupos + /tu-negocio/empresas. Sala 6 y método de /nosotros a noche. PR #6, `8503fbd` | ✅ |
| 4 · lote 12 | **Refinar UI:** tarjetas con su dibujo e hilo de cuerda. PR #7, `242149e` | ✅ |
| 4 · lote 13 | **Pulido final:** firma y lámina para lectores de pantalla; títulos, descripciones e imagen para compartir por ruta; descripciones de los legales. PR #8, `f97bd84` | ✅ |
| lote 14 | **Limpieza:** 30 archivos sin uso de `public/` (36 MB), código y dependencias muertas (`gsap`, `react-hot-toast`). PR #9, `17d1efa` | ✅ |
| lote 16 | **Cimientos de `/interno`:** Supabase propio, login con contraseña + TOTP, `exigirCarlos()`, `proxy.js`, noindex y sin caché, medición fuera. PR #10, `4fca720` | ✅ |
| lote 17 | **Precios con IVA incluido** en todo el sitio, etiqueta "IVA incluido", fuente única `precios.js`. PR #11, `4cbc6c4` | ✅ |
| lote 18 | **SEO:** titles y descripciones por ruta, JSON-LD, sitemap con lastmod fijo, head sin duplicados, 404 con título, favicon, og:image de /boaz. PR #12 | ✅ |
| lote 19 | **Rendimiento:** diferir Medicion y el audio de Cuerdas, `salas.css` solo en la portada, quitar `lazy` a la imagen de la primera pantalla de /sistemas, `react-icons` por SVG. Medido con PageSpeed en producción antes y después | ⏳ Siguiente de dev |
| lote 20 | **Enlaces a los giros** desde la portada y los niveles (copy y diseño por aprobar) | ⏳ |
| /interno | Contenido del diagnóstico → prueba en papel → aviso → flujo → calculadora e historial | ⏳ Empieza en el chat de ventas |
| después | "¿Qué nivel eres?" y muestra viva de Boaz | ⏳ Tras salir a vender |

### Cómo se trabaja cada pieza

**Texto → diseño → construcción → revisión.** El texto va a STRING — Textos del sitio; el diseño se dibuja en un lienzo y Carlos elige con el ojo (dos o tres caminos cuando hay decisiones grandes); Claude Code construye por lotes con el Método de trabajo, empezando en modo plan; nada pasa a `main` sin visto bueno de Carlos. **Los puntos de control acordados en un plan se respetan** (diffs y capturas antes de cada commit; también antes de un push encadenado).

### Siguiente paso (4 nov)

1. **Carlos (fuera del código):** domicilio del aviso; dominio sin www a 308 en Vercel; Search Console por DNS y envío del sitemap; Prueba de resultados enriquecidos en producción.
2. **Ventas (Plan de Ventas):** lista de 100 prospectos, guion de diagnóstico SPIN, manual de objeciones, plantilla de propuesta, mensajes en frío, demo de Boaz, contrato. **Contenido de la herramienta de diagnóstico:** preguntas por giro, reglas para sugerir nivel, plantilla del resumen.
3. **Dev:** lote 19 (rendimiento).
4. **Planeación:** régimen fiscal con contador, persona física o empresa, cuándo activar respaldos de Boaz.

### Retomar el desarrollo (para un chat nuevo de dev)

**Dónde quedó (4 nov):** `main` con lotes 0 a 18 (lote 18 = PR #12). Rama de trabajo nueva siempre desde `origin/main` tras `git fetch`, sin upstream hasta el push; `gh` en **stringm3x**. Claude Code empieza en modo plan; un bloque = un commit; diff y capturas antes de cada commit o push; PR a main sin fusionar hasta el OK de Carlos; al fusionar, merge commit (no squash) y verificación en producción. Si dos sesiones de Claude Code trabajan a la vez, la segunda usa un worktree aparte. Docs del repo: `CLAUDE.md`, `docs/calidad.md`, `docs/movimiento-salas.md`, `docs/textos.md`, `docs/estado.md`, `reportes/`. Textos fuente: doc **STRING — Textos del sitio** (Claude Code no lo puede abrir: pasarle los textos en el prompt).

**Pendiente de dev, en orden:**

- [ ] **Domicilio del aviso:** una línea en `app/(sitio)/aviso-de-privacidad/page.jsx` (`TODO(domicilio)`) y en `docs/textos.md`. Bloquea vender con tranquilidad.
- [ ] **Lote 19 · Rendimiento:** LCP simulado 2.5–2.8 s (real ~66 ms). Hallazgos y archivos en `docs/estado.md`.
- [ ] **Lote 20 · Enlaces a los giros** (copy por aprobar).
- [ ] **`/interno` · flujo del diagnóstico** (cuando el contenido esté probado y el aviso cubra los prospectos). La cuenta de intentos del TOTP pasa a la base con la primera tabla.
- [ ] **"¿Qué nivel eres?"** y **muestra viva de Boaz.**
- [ ] **Animar salas 2, 3, 6 y 7** (hoy dibujo quieto).
- [ ] **Deuda:** `npm audit` con 27 avisos previos (next, vite, eslint; ninguno de `@supabase`); e2e inestable en `refinar.spec.js` (subpíxel, usar tolerancia); `componentes.spec.js` sobrescribe las capturas del lote 6.
- [ ] **Fuera del repo:** `boaz-azul` en STRING · Identidad 2026 a `#2979FF`; revisión legal del aviso y términos; cifras de Evolution al recontar socios.

## Parte 11 · El fundador

**Carlos Avilés.** CDMX. Desarrollador; Next.js, TypeScript, Supabase y arquitectura multitenant los aprendió construyendo Boaz. Opera STRING como persona física. Hoy sin ingreso fijo.

**Evolution GYM**, el gimnasio de su familia, fue el primer cliente a medida y es el primer gimnasio en Boaz: caso, cazador de errores y demostración en vivo.

**Cómo trabaja:** razonamiento detrás de cada decisión, honestidad directa, paso por paso en procesos largos, prompts completos y listos para pegar cuando hay que instruir a otro agente.

---

## Parte 12 · Ventas y redes

> **Fuente de verdad de ventas: Plan de Ventas — STRING y Boaz** (https://claude.ai/artifact/1xMBhaDVu2fLzVTTKYcgfz). Esto es el resumen.

### Cómo se vende

- **Canal principal: visita en persona** a gimnasios y negocios con local de la CDMX. La visita no vende: consigue la cita (demo de Boaz o llamada de diagnóstico). Horarios: gimnasios 10–13 h o 15–17 h (nunca en hora pico); barberías y estéticas a media mañana entre semana; restaurantes 16–18 h. Si no está el dueño, no se le vende a recepción.
- Apertura: "Soy Carlos, desarrollador aquí de la ciudad. Hice el sistema con el que opera el gimnasio de mi familia… No vengo a venderte nada hoy."
- WhatsApp el mismo día después de cada visita y registro de cada visita (negocio, dueño, resultado, siguiente paso).
- Referencia realista: 25–30 visitas por cliente al principio.
- **Las redes no venden, confirman:** el dueño que conociste te busca esa noche y tiene que pensar "este cuate es serio". Por eso el SEO del lote 18 empieza por las búsquedas de marca.

### Carlos y STRING

**Carlos es la cara; STRING es la casa.** En persona: "Soy Carlos, desarrollador. Tengo un taller de software que se llama STRING." Historia en tres líneas: "Soy Carlos, desarrollador en la CDMX. Construí el sistema con el que opera el gimnasio de mi familia, y se convirtió en Boaz. Hoy hago sistemas para negocios como el tuyo, con el mismo cuidado."

### WhatsApp Business (4 nov)

- Nombre: **Carlos Avilés · STRING**. Foto: Carlos. Portada nueva: diseño del sitio (logo con cursor, titular, ciudad de una línea y estrellas), **sin cifras**.
- Descripción: "Soy Carlos, desarrollador en la CDMX. Hago sistemas para negocios con local… Te respondo en un día hábil. Diagnóstico gratis."
- Cobertura por área de servicio (sin domicilio exacto). Horario lun–vie 9–19 h. Sitios: stringwebs.com y stringwebs.com/boaz.
- Siguen: mensaje de bienvenida, ausencia, respuestas rápidas (`/precios`, `/boaz`, `/demo`, `/diagnostico`, `/gracias`), catálogo y etiquetas.

### Instagram (@stringwebmx, 4 nov)

- Nombre: Carlos Avilés · STRING Software. Categoría: Desarrollador de software. Bio en primera persona; enlace directo a stringwebs.com/diagnostico (sin Linktree). Foto: Carlos. Es el único perfil social en el JSON-LD del sitio.
- Destacadas "Clientes" y "Test" eliminadas (insinuaban clientes que no hay).
- **4 destacadas** con portada y contenido: Quién soy (cursor), Niveles (cuerdas), Cómo trabajo (escalera con bandera verde), Boaz (la B sobre papel, en su identidad). 20 historias con textos del KB, sin cifras inventadas.
- **Publicaciones: en exploración.** Se probó (y se descartó) extender las salas del sitio, una cuerda continua y 9 "piezas" de estilos variados: no se sentían premium. Dirección actual: **3 publicaciones premium con propósito**: retrato de Carlos (confianza), Boaz en laptop y celular (producto, "Pide tu demo") y "No es falta de demanda. Es falta de sistema." (problema, "Diagnóstico gratis"). Una idea por imagen, mucho aire, producto real. Faltan: foto original de Carlos y capturas reales de Boaz del gimnasio demo.
- Reglas que no cambian: nada inventado, las pantallas dicen "Ejemplo", ninguna cifra sin respaldo.

### Logos en archivo (4 nov)

PNG en alta y SVG, sacados de los archivos publicados en el sitio: STRING noche, pared, una tinta, firma gris, ícono, y dos recortados con fondo transparente (blanco y oscuro). Boaz: logotipo positivo, sobre papel, isotipo (B) positivo y sobre papel. **El negativo de Boaz es derivado** (no existe en el sitio): usar solo si hace falta.
