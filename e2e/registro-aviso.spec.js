import { test, expect } from "@playwright/test";

// /gym/registro (lote 23): la casilla del aviso de privacidad es obligatoria.
// Turnstile se sustituye por uno que pasa solo y el POST al SaaS se intercepta
// (el SaaS tiene sus propias pruebas: string-gym-saas, app/api/solicitudes).
const TURNSTILE_FALSO = `window.turnstile = {
  render: (_el, opciones) => { setTimeout(() => opciones.callback("token-e2e"), 50); return "w"; },
  remove: () => {},
};`;
const ENDPOINT = "https://app.gym.stringwebs.com/api/solicitudes";

let enviados;

test.beforeEach(async ({ page }) => {
  enviados = [];
  await page.route("https://challenges.cloudflare.com/**", (ruta) =>
    ruta.fulfill({ contentType: "text/javascript", body: TURNSTILE_FALSO })
  );
  await page.route(ENDPOINT, async (ruta) => {
    enviados.push(ruta.request().postDataJSON());
    await ruta.fulfill({ json: { success: true }, headers: { "Access-Control-Allow-Origin": "*" } });
  });
  await page.goto("/gym/registro");
  await page.getByLabel("Tu nombre").fill("Ana Ruiz");
  await page.getByLabel("Correo").fill("ana@correo.com");
  await page.getByLabel("WhatsApp").fill("55 1234 5678");
  await page.getByLabel("Nombre de tu gimnasio").fill("Box Norte");
});

test("sin marcar el aviso no se envía y dice por qué", async ({ page }) => {
  const casilla = page.getByRole("checkbox", { name: "Acepto el aviso de privacidad" });
  await expect(casilla).not.toBeChecked();
  await page.getByRole("button", { name: "Registrar mi gimnasio" }).click();

  await expect(page.getByText("Acepta el aviso de privacidad.")).toBeVisible();
  await expect(casilla).toHaveAttribute("aria-invalid", "true");
  await expect(page).toHaveURL(/\/gym\/registro/);
  expect(enviados).toHaveLength(0);
});

test("el enlace del aviso abre en otra pestaña y la línea vieja ya no está", async ({ page }) => {
  const enlace = page.getByRole("link", { name: "aviso de privacidad", exact: true });
  await expect(enlace).toHaveAttribute("href", "/boaz/aviso-de-privacidad");
  await expect(enlace).toHaveAttribute("target", "_blank");
  await expect(page.getByText("Al enviar aceptas")).toHaveCount(0);
});

test("con el aviso marcado se envía con acepta_aviso y va a gracias", async ({ page }) => {
  const casilla = page.getByRole("checkbox", { name: "Acepto el aviso de privacidad" });
  await casilla.check();
  await expect(casilla).toBeChecked();
  await page.getByRole("button", { name: "Registrar mi gimnasio" }).click();

  await expect(page).toHaveURL(/\/gym\/gracias/);
  expect(enviados).toHaveLength(1);
  expect(enviados[0]).toMatchObject({ nombre: "Ana Ruiz", acepta_aviso: true, turnstile_token: "token-e2e" });
});
