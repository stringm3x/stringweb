# Lote 21 · /boaz: Escala "Próximamente" y Programa Fundadores

Rama `lote-21-boaz-fundadores` · 6 nov 2026 · decisión de Carlos del 6 nov · PR a main sin fusionar.

## Qué se hizo
1. **Datos.** `precios.js`: `BOAZ_ESCALA` ($1,999 / $19,990) y `BOAZ_FUNDADOR` ($799, 12 meses), aparte de
   `BOAZ` (Starter y Pro), que es lo que leen /productos, /gym/registro y el JSON-LD. /interno toma el fundador de
   ahí; el boceto y el mínimo de Empresa siguen solo en `precios-interno.js`. Lugares (0–5, hoy 5) y estado de
   Escala ("desarrollo", hoy) a mano en `app/lib/boaz-lanzamiento.js`; un valor que no vale rompe el build.
2. **Escala.** Tercera columna junto a la tabla desde 1024 px; en celular, debajo de Pro. Regla punteada #7D7A72
   a la altura de la sólida (medido al píxel a 1360, 1280 y 1024), precio en #5C5A55, botón secundario a WhatsApp.
   Sin "Contratar" ni enlace a /gym/registro.
3. **Fundadores.** Sección propia después de los planes: $799 heroico con cota, cinco casillas decorativas, el texto
   de lugares (singular con 1, "LOS 5 LUGARES ESTÁN TOMADOS" con 0), lista 01–05, "A CAMBIO" y "Quiero ser
   fundador" (azul, 52 px) a WhatsApp. Con 0: "Los 5 lugares ya tienen dueño." y botón secundario a /gym/registro.
4. **Docs.** textos.md § "Boaz · lote 21"; estado.md (21 este lote, 22 rendimiento, 23 giros); CLAUDE.md (regla de
   Escala y del fundador); sitemap con `LOTE_21` en /boaz; `/muestrario/boaz` (solo en desarrollo, noindex).

## Decisiones
- Un solo azul por pantalla (propuesta A): el "Registra tu gimnasio" del pie de Planes pasa a secundario.
- Número de la casilla azul en negro (#000, 5.3:1); la tinta daba 4.4:1.
- Ninguna prueba busca "$799" para el fundador (Starter cuesta lo mismo): JSON-LD por sus offers, fundador por
  `BOAZ_FUNDADOR` y por su sección.

## Pruebas
- `npm run build` limpio. Vitest: 199 de 199 (22 archivos).
- `npm run test:e2e` (dev, 375 px): 125 de 125, con 9 nuevas en `e2e/boaz-fundadores.spec.js` (Escala sin
  registro ni "Contratar", sin "bot", /gym/registro sin Escala, JSON-LD con exactamente Starter y Pro, $799 y
  "QUEDAN 5 DE 5 LUGARES", 0/1/2 lugares en el muestrario, axe con contraste en /boaz y el muestrario).
- `npm run test:e2e:interno` (build de producción): 11 de 11.
- `/muestrario/boaz` en producción: 404.

## Pendiente
- Visto bueno de Carlos para fusionar; después, verificación en producción.
- Lighthouse de /boaz no se midió en este lote (queda en el lote 22, rendimiento).
