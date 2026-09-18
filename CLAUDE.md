# CLAUDE.md — stringwebs.com

Este repo es SOLO el sitio público de STRING (stringwebs.com): código, estructura, copy y diseño.
El producto STRING GYM (roadmap, arquitectura, migración de Evolution GYM) vive aparte. Aquí solo
se habla de él como producto en venta.

## Qué es STRING

Agencia de sistemas digitales en CDMX, fundada por Carlos Avilés. Organiza la captación de clientes
de negocios locales: desde que un prospecto muestra interés hasta que queda registrado, calificado
y en seguimiento. No vendemos páginas, vendemos estructura.

Tiene dos líneas:

- **Sistemas a Medida**: proyecto único en 4 niveles ($8,000 a $90,000+ MXN) más planes de
  continuidad ($1,800 a $8,000/mes). La continuidad es el ingreso recurrente, no un extra.
- **STRING SaaS**: suscripción por nicho. El único activo es STRING GYM ($799/mes).
  RESTO, CLINIC y BARBER están sin iniciar. Nunca se presentan como disponibles.

Si un precio en el código no coincide con estos, se reporta. No se corrige por cuenta propia.

Mensaje central, palabra por palabra:
> No necesitas más seguidores. Necesitas un sistema que convierta.

Promesa de producto, que va arriba y nunca enterrada:
> El sistema trabaja aunque tu negocio no esté disponible.

## A quién le habla el sitio

Al dueño de un negocio local mexicano, no técnico, que entra desde el celular. Casi siempre llega
porque ya conoció a Carlos en persona o por redes, no por búsqueda. Por eso la home no es un
catálogo: es prueba de credibilidad. Qué hacemos, para quién, cuánto cuesta y qué sigue deben
entenderse en 5 segundos, en un celular.

## Voz y copy

- Español mexicano. En pantalla se dice "panel" (no dashboard), "prospecto" (no lead) y
  "seguidores" (no likes).
- Frases cortas y afirmaciones concretas, no promesas. Nada de ventas garantizadas.
- Números verificables o nada. Si falta el dato, se omite la cifra.
- Los botones usan palabras del cliente ("Solicitar diagnóstico"), no verbos vacíos ("Enviar").
- Prohibido: muros de logos de tecnologías, fotos de stock y superlativos sin respaldo.

## Identidad visual

La fuente de verdad es el sistema de marca: https://claude.ai/artifact/FKQgBhXAgpvUegyST78am6
Lee su README antes de tocar estilos. Si no tienes acceso al enlace, mandan estas reglas:

- **Color:** tres, nada más: `acido` #50ff05, negro y blanco. El bloque claro editorial es
  `papel` #f7f5ef.
  - `acido` sobre blanco da 1.3:1 y es ilegible. Sobre superficie clara el verde es
    `acido-profundo` #2f7a05.
  - El azul #004aad y el dorado #f6c75e son herencia. No se les agregan usos nuevos. Retirarlos
    es una tarea aparte y no se hace de paso.
- **Tipografía:**
  - Anton para titulares, siempre en mayúsculas.
  - Geist para texto.
  - Ubuntu Mono para etiquetas, precios y metadatos, en mayúsculas con tracking abierto.
  - Las tres se cargan con next/font/google como CSS vars.
- **Forma:**
  - Esquina viva por defecto. Solo inputs y chips llevan 4px; la píldora es solo para controles
    circulares.
  - Bordes antes que sombras. Una sombra es un desplazamiento duro sin blur (`8px 8px 0`), nunca
    difusa.
  - Sin degradados ni glassmorphism.
- **Retícula de 8.** El aire entre secciones es de 96px como mínimo.
- **Dirección de arte:** grabado, muralismo mexicano, serigrafía a dos tintas.
  Regla dura: el arte nunca toca la jerarquía de la información. Si tapas la ilustración y la
  textura, la página todavía debe vender.
- **Animación:** cada una debe poder explicarse en una frase, y todo funciona igual con
  `prefers-reduced-motion`.

Hoy los tokens viven solo en `tailwind.config.js` (paleta plana + spacing custom), y sus nombres
pueden no coincidir con los del sistema de marca. No se renombran ni migran sin petición explícita.

## Stack y comandos

- Next.js 16.1.x (App Router), React 19 y Tailwind 3.4.
- **JavaScript puro. No migrar a TypeScript.**
- Tests con Vitest: 48 tests que solo cubren /diagnostico y un schema. La home no tiene tests.
- `npm run build` debe quedar limpio antes de cerrar cualquier tarea.
- `npm run lint` está **roto** hasta la Tarea 6, porque el parser exige `typescript`. No se
  arregla de paso.
- TODO: confirmar el nombre del script de tests.

## Mapa del repo

- La home vive en `app/components/home/*.jsx`, en este orden:
  Hero → Content → Proyects → Services → SaasSection → Steps → Us
- El copy está hardcodeado en el JSX, con algunos arrays en `data.js` por sección. No hay CMS ni
  archivo central de strings.
- `next.config.mjs` tiene un redirect existente: `/gym/empezar → /saas#gym-detalle`. No romperlo.
- Existe `/api/waitlist`, pero usarlo para RESTO/CLINIC/BARBER está bloqueado (ver abajo).

## Rutas

Convención: rutas en español y en minúsculas. La migración está pendiente (Tarea 1):

| Actual | Destino |
|---|---|
| /Proyects | /proyectos |
| /Services, /Services/[id] | /servicios, /servicios/[id] |
| /Us | /nosotros |
| /quote | /cotizacion |
| /onboarding | /alta |

Toda ruta que cambie lleva un redirect 301 en `next.config.mjs`. En el mismo cambio se actualizan
los enlaces internos, el nav, el footer, `sitemap.js`, el canonical y los datos estructurados.

## Cifras públicas

Hay una sola franja de cifras, en el hero de la home, con una sola fuente de verdad en el código.
A partir de la Tarea 2 esa fuente es `lib/stats.js`.

Cifras aprobadas:
- 70 socios gestionados en Evolution GYM (migración en curso)
- 1 SaaS en producción
- 4 niveles de sistema
- 24h de diagnóstico

Prohibido: "10+ clientes", "2+ años" o cualquier cifra sin respaldo.

## Reglas duras

1. NO inventar datos: ni testimonios, ni logos, ni nombres de clientes, ni métricas, ni casos de
   éxito. Si falta un dato, se deja `// TODO(dato):` y se avisa.
2. NO cambiar el sistema de diseño sin petición explícita.
3. Una tarea = un cambio = una rama. Nada de refactors de paso.
4. Toda ruta que cambie lleva redirect 301.
5. Mostrar el diff antes de aplicar.
6. Verificar en móvil (≈375px), porque ahí llega el comprador real.
7. Build limpio antes de dar por terminada cualquier tarea.

## Bloqueado: no implementar sin copy escrito y aprobado

- El hero nuevo (falta decidir si el CTA principal es el diagnóstico o probar STRING GYM).
- El orden nuevo de la home.
- El caso de Evolution GYM.
- El FAQ y la historia personal.
- El destino de RESTO/CLINIC/BARBER (lista de espera o quitarlos).
- Si cada SaaS tiene landing propia o se queda en /saas.
