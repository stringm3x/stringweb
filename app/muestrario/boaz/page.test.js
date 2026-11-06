import { afterEach, describe, expect, it, vi } from "vitest";

// Lote 21: el banco de /boaz solo existe en desarrollo. Las fuentes de
// next/font no corren fuera de Next: se cambian por nada.
vi.mock("@/app/components/boaz/Fundadores", () => ({ Fundadores: () => null }));
vi.mock("@/app/components/boaz/PlanEscala", () => ({ PlanEscala: () => null }));
vi.mock("@/app/components/boaz/fuentes", () => ({ ubuntuMono: { variable: "" } }));

describe("/muestrario/boaz", () => {
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

  it("no se indexa y muestra 0, 1, 2 y 5 lugares", async () => {
    const { metadata, LUGARES } = await import("./page.jsx");
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(LUGARES).toEqual([0, 1, 2, 5]);
  });
});
