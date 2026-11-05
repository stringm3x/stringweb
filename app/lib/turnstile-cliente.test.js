import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import path from "path";
import { TOKEN_DESARROLLO, tokenSinClave } from "./turnstile-cliente";

describe("Turnstile sin clave pública", () => {
  it("en producción no da token falso", () => {
    expect(tokenSinClave("production")).toBeNull();
  });

  it("en desarrollo y pruebas da el token de prueba", () => {
    expect(tokenSinClave("development")).toBe(TOKEN_DESARROLLO);
    expect(tokenSinClave("test")).toBe(TOKEN_DESARROLLO);
  });

  it("el widget no escribe el token de prueba por su cuenta", () => {
    const widget = readFileSync(
      path.resolve(__dirname, "../gym/components/TurnstileWidget.jsx"),
      "utf8"
    );
    expect(widget).toContain("tokenSinClave()");
    expect(widget).not.toContain(`"${TOKEN_DESARROLLO}"`);
  });
});
