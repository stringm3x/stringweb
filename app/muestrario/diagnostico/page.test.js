import { afterEach, describe, expect, it, vi } from "vitest";

// Lote 20: el banco de /interno/diagnostico solo existe en desarrollo.
vi.mock("./Banco", () => ({ Banco: () => null }));

describe("/muestrario/diagnostico", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("en producción da 404", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const { default: Pagina } = await import("./page.jsx");
    let error;
    try {
      Pagina();
    } catch (e) {
      error = e;
    }
    expect(error?.digest).toMatch(/404/);
  });

  it("no se indexa", async () => {
    const { metadata } = await import("./page.jsx");
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});
