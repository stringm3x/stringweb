# Lote 4 · Contacto — reporte

Rama `lote-4-contacto` (desde `lote-3-salas-5-7`), 29 oct 2026. Sin fusionar. `npm run build` limpio,
`npm test` 15/15, `npm run test:e2e` 3/3 (Playwright, 375 px).

**Hecho (un commit por paso):**
1. `/diagnostico`: etiqueta, titular e intro de textos; nombre, WhatsApp (acepta espacios, guiones o +52 y
   guarda 10 dígitos), giro y "¿Qué te pasa hoy?" en píldoras de 44 px, "Otra cosa" con espacio libre;
   los 5 mensajes de error salen juntos; el aviso de privacidad corto, debajo de Enviar.
2. `/api/diagnostico`: schema → Turnstile (`TURNSTILE_SECRET_KEY`; sin él solo pasa en desarrollo) →
   `mailer.js` a `stringwebmx@gmail.com` con el asunto y cuerpo de textos (nivel sugerido, marca de
   Gimnasio, WhatsApp como enlace). Confirmación "Listo. Te respondemos en un día hábil." + WhatsApp.
   Fuera QuoteForm, FormSuccess, `/api/quote`, quote-schema y project-types.
3. /saas y /gym: "STRING GYM" → "el sistema para gimnasios"; fuera RESTO, CLINIC, BARBER, WaitlistForm
   y `/api/waitlist`; título "El sistema para gimnasios · STRING"; cierre con el mensaje vigente y la
   firma "by STRING" en Grafito; alt de OG; `/gym/gracias` con `contacto.js`. Precios y POST de
   `/gym/registro` sin cambio.
4. Galería con scroll lateral en celular (como el cine); /nosotros termina con el Cierre de la portada.

**Verificado:**
- grep en `app/`: sin "STRING GYM" ni "hola@stringwebs.com"; el número de WhatsApp solo en `contacto.js`.
- Pruebas de la API (Vitest): 400, 403, 500 y el correo exacto, con mailer y Turnstile simulados.
- Teclado: Tab entra a cada grupo, las flechas eligen, la píldora lleva el foco verde. El foco va al
  primer error y, al enviar, a la confirmación. Sin animaciones en el formulario.
- A 375 px no hay scroll horizontal; la galería se recorre dentro de su región (752 px).
- Firma "by STRING" Grafito sobre `#50FF05`: 4.51:1, pasa por muy poco.
- Capturas a 375 y 1440 px en `reportes/lote-4-contacto/` (la barra a media página es de la captura).

**Falta para cerrar (Carlos):**
- Correo de prueba desde la vista previa: en Vercel (Preview) poner `TURNSTILE_SECRET_KEY` y las SMTP
  (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`); permitir el
  dominio de la vista previa en el widget de Turnstile; mandar una solicitud y confirmar que llegó.
  `NOTIFICATION_EMAIL` ya no se usa.

**Decisiones a revisar:**
- Giro y situación en píldoras, no en select. Si el envío falla, Turnstile se recarga (token de un uso).
- Alt de OG también cambiado en /saas, no solo en /gym.

**Pendientes:**
- /saas sigue con el diseño anterior (Anton, TitularBrochada) y su entrada dice "STRING SaaS";
  `ui/Sello.jsx` ("STRING · SISTEMAS DIGITALES · CDMX") no lo usa nadie. No se tocaron.
