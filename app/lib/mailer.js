import nodemailer from "nodemailer";

// Transporter singleton compartido por todas las rutas que envían email —
// antes cada ruta creaba el suyo, y uno de ellos leía SMTP_PASS en vez de
// SMTP_PASSWORD (el nombre real de la variable en .env.local), rompiendo el
// envío de correo en esa ruta sin que nada lo señalara en build ni en runtime
// hasta que fallaba el envío.
let transporter = null;

export const getTransporter = () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
};

export const REQUIRED_SMTP_ENV_VARS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "SMTP_FROM",
  "NOTIFICATION_EMAIL",
];

export const getMissingSmtpEnvVars = () =>
  REQUIRED_SMTP_ENV_VARS.filter((v) => !process.env[v]);
