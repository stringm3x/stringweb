import { describe, expect, it } from "vitest";
import { descartarInterno, esInterno } from "./medicion";

describe("medición sin /interno", () => {
  it.each([
    "https://www.stringwebs.com/interno",
    "https://www.stringwebs.com/interno/",
    "https://www.stringwebs.com/interno/entrar?error=1",
    "https://www.stringwebs.com/interno/diagnostico",
    "/interno/diagnostico",
  ])("descarta %s", (url) => {
    expect(esInterno(url)).toBe(true);
    expect(descartarInterno({ type: "pageview", url })).toBeNull();
  });

  // Las páginas públicas siguen midiendo.
  it.each([
    "https://www.stringwebs.com/",
    "https://www.stringwebs.com/sistemas/responde",
    "https://www.stringwebs.com/boaz",
    "https://www.stringwebs.com/productos",
    "https://www.stringwebs.com/internos",
    "https://www.stringwebs.com/boaz?interno=1",
  ])("deja pasar %s", (url) => {
    const evento = { type: "pageview", url };
    expect(descartarInterno(evento)).toBe(evento);
  });
});
