import { test, expect } from "@playwright/test";

// Llena y envía /diagnostico a 375 px. Turnstile se sustituye por uno que
// pasa solo, y la llamada a /api/diagnostico se intercepta para no mandar
// correo (la API tiene sus propias pruebas en Vitest).
const TURNSTILE_FALSO = `window.turnstile = {
  render: (_el, opciones) => { setTimeout(() => opciones.callback("token-e2e"), 50); return "w"; },
  remove: () => {},
};`;

test.beforeEach(async ({ page }) => {
  await page.route("https://challenges.cloudflare.com/**", (ruta) =>
    ruta.fulfill({ contentType: "text/javascript", body: TURNSTILE_FALSO })
  );
});

test("muestra los mensajes de error de textos.md", async ({ page }) => {
  await page.goto("/diagnostico");
  await page.getByRole("button", { name: "Enviar" }).click();

  await expect(page.getByText("Escribe tu nombre.")).toBeVisible();
  await expect(page.getByText("Escribe tu WhatsApp a 10 dígitos.")).toBeVisible();
  await expect(page.getByText("Elige el giro de tu negocio.")).toBeVisible();
  await expect(page.getByText("Elige qué te pasa hoy.")).toBeVisible();
  await expect(page.getByLabel("Nombre")).toBeFocused();

  await page.getByText("Otra cosa", { exact: true }).click();
  await page.getByRole("button", { name: "Enviar" }).click();
  await expect(page.getByText("Cuéntanos qué te pasa.")).toBeVisible();
});

test("llena el formulario, lo envía y muestra la confirmación", async ({ page }) => {
  let enviado;
  await page.route("**/api/diagnostico", async (ruta) => {
    enviado = ruta.request().postDataJSON();
    await ruta.fulfill({ json: { success: true } });
  });

  await page.goto("/diagnostico");
  await page.getByLabel("Nombre").fill("Ana López");
  await page.getByLabel("WhatsApp").fill("55 1234 5678");
  await page.getByText("Gimnasio", { exact: true }).click();
  await page.getByText("Otra cosa", { exact: true }).click();
  await page.getByRole("textbox", { name: "Otra cosa" }).fill("Quiero cobrar en línea.");
  await page.getByRole("button", { name: "Enviar" }).click();

  await expect(page.getByText("Listo. Te respondemos en un día hábil.")).toBeFocused();
  await expect(page.getByRole("link", { name: "Escríbenos por WhatsApp" })).toHaveAttribute(
    "href",
    "https://wa.me/525545524847"
  );
  expect(enviado).toEqual({
    nombre: "Ana López",
    whatsapp: "5512345678",
    giro: "Gimnasio",
    situacion: "Otra cosa",
    otraCosa: "Quiero cobrar en línea.",
    turnstileToken: "token-e2e",
  });
});

test("si el envío falla, avisa y deja intentar de nuevo", async ({ page }) => {
  await page.route("**/api/diagnostico", (ruta) =>
    ruta.fulfill({
      status: 500,
      json: { message: "No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp." },
    })
  );

  await page.goto("/diagnostico");
  await page.getByLabel("Nombre").fill("Ana López");
  await page.getByLabel("WhatsApp").fill("5512345678");
  await page.getByText("Restaurante", { exact: true }).click();
  await page.getByText("Me escriben y no alcanzo a contestar.").click();
  await page.getByRole("button", { name: "Enviar" }).click();

  await expect(
    page.getByText("No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.")
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Enviar" })).toBeEnabled();
});
