import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const sendMail = vi.fn();
vi.mock("@/app/lib/mailer", () => ({
  getTransporter: () => ({ sendMail }),
  getMissingSmtpEnvVars: () => [],
}));

const { POST } = await import("./route");

const valido = {
  nombre: "Ana López",
  whatsapp: "55 1234 5678",
  giro: "Restaurante",
  situacion: "Tengo a mis clientes regados en chats y en Excel.",
  otraCosa: "",
  turnstileToken: "token",
};

const pedir = (cuerpo) =>
  POST(
    new Request("http://localhost/api/diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
    })
  );

const turnstileResponde = (success) =>
  vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ success })));

describe("POST /api/diagnostico", () => {
  beforeEach(() => {
    sendMail.mockReset().mockResolvedValue({});
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secreto");
    vi.stubEnv("SMTP_FROM", "envios@stringwebs.com");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("rechaza datos inválidos sin mandar correo", async () => {
    turnstileResponde(true);
    const respuesta = await pedir({ ...valido, whatsapp: "123" });
    expect(respuesta.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("rechaza si Turnstile no lo confirma", async () => {
    turnstileResponde(false);
    const respuesta = await pedir(valido);
    expect(respuesta.status).toBe(403);
    expect((await respuesta.json()).message).toBe(
      "No pudimos confirmar el envío. Recarga la página e intenta de nuevo."
    );
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("en producción sin secreto no deja pasar", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    vi.stubEnv("NODE_ENV", "production");
    expect((await pedir(valido)).status).toBe(403);
  });

  it("manda a Carlos el asunto y el cuerpo de textos.md", async () => {
    turnstileResponde(true);
    const respuesta = await pedir(valido);
    expect(respuesta.status).toBe(200);

    const correo = sendMail.mock.calls[0][0];
    expect(correo.to).toBe("stringwebmx@gmail.com");
    expect(correo.subject).toBe("Diagnóstico · Ana López · Restaurante · Nivel sugerido: Organiza");
    expect(correo.text).toContain("Nueva solicitud de diagnóstico.");
    expect(correo.text).toContain("WhatsApp: 5512345678 (https://wa.me/525512345678)");
    expect(correo.text).toContain("Lo que le pasa: Tengo a mis clientes regados en chats y en Excel.");
    expect(correo.text).toContain("Estándar: respóndele en un día hábil.");
    expect(correo.text).not.toContain("Es gimnasio");
    expect(correo.html).toContain('href="https://wa.me/525512345678"');
  });

  it("marca el gimnasio y usa lo que escribieron en Otra cosa", async () => {
    turnstileResponde(true);
    await pedir({
      ...valido,
      giro: "Gimnasio",
      situacion: "Otra cosa",
      otraCosa: "Quiero <b>cobrar</b> en línea",
    });

    const correo = sendMail.mock.calls[0][0];
    expect(correo.subject).toBe("Diagnóstico · Ana López · Gimnasio · Nivel sugerido: por definir");
    expect(correo.text).toContain("Lo que le pasa: Quiero <b>cobrar</b> en línea");
    expect(correo.text).toContain("Es gimnasio: ofrécele el sistema para gimnasios.");
    expect(correo.html).toContain("Quiero &lt;b&gt;cobrar&lt;/b&gt; en línea");
  });

  it("si el correo falla responde con el mensaje de textos.md", async () => {
    turnstileResponde(true);
    sendMail.mockRejectedValue(new Error("SMTP caído"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const respuesta = await pedir(valido);
    expect(respuesta.status).toBe(500);
    expect((await respuesta.json()).message).toBe(
      "No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp."
    );
  });
});
