import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// exigirCarlos() sin Supabase real: se simulan las cookies, redirect(),
// notFound(), connection() y el cliente.
const CARLOS = "00000000-0000-4000-8000-0000000000ca";
let sb;
let clientesCreados;

vi.mock("next/headers", () => ({ cookies: async () => ({ getAll: () => [], set: () => {} }) }));
vi.mock("next/server", () => ({ connection: async () => {} }));
vi.mock("next/navigation", () => ({
  redirect: (destino) => {
    throw { destino };
  },
  notFound: () => {
    throw { destino: "404" };
  },
}));
vi.mock("@supabase/ssr", () => ({
  createServerClient: () => {
    clientesCreados++;
    return {
      auth: {
        async getUser() {
          if (sb.falla) throw new Error("Supabase caído");
          return sb.usuario ? { data: { user: { id: sb.usuario } }, error: null } : { data: { user: null }, error: {} };
        },
        signOut: vi.fn(async () => {
          sb.cerro = true;
          return { error: null };
        }),
        mfa: {
          async getAuthenticatorAssuranceLevel() {
            return { data: { currentLevel: sb.nivel }, error: null };
          },
        },
      },
    };
  },
}));

const { exigirCarlos } = await import("./exigirCarlos.js");

async function resultado() {
  try {
    return { pasa: await exigirCarlos() };
  } catch (e) {
    if (e && "destino" in e) return { destino: e.destino };
    throw e;
  }
}

beforeEach(() => {
  clientesCreados = 0;
  sb = { usuario: null, nivel: null, falla: false, cerro: false };
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://prueba.supabase.co");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "clave-publica");
  vi.stubEnv("INTERNO_USUARIO_ID", CARLOS);
  vi.stubEnv("INTERNO_SECRETO", "s".repeat(32));
});
afterEach(() => vi.unstubAllEnvs());

describe("exigirCarlos()", () => {
  it.each(["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "INTERNO_USUARIO_ID", "INTERNO_SECRETO"])(
    "sin %s, niega (a la entrada) sin preguntar a Supabase",
    async (variable) => {
      sb = { ...sb, usuario: CARLOS, nivel: "aal2" };
      vi.stubEnv(variable, "");
      expect(await resultado()).toEqual({ destino: "/interno/entrar" });
      expect(clientesCreados).toBe(0);
    }
  );

  it("con INTERNO_SECRETO de menos de 32 caracteres, niega", async () => {
    sb = { ...sb, usuario: CARLOS, nivel: "aal2" };
    vi.stubEnv("INTERNO_SECRETO", "corto");
    expect(await resultado()).toEqual({ destino: "/interno/entrar" });
  });

  it("sin sesión, niega (a la entrada)", async () => {
    expect(await resultado()).toEqual({ destino: "/interno/entrar" });
  });

  it("con otro UUID, cierra esa sesión y responde 404", async () => {
    sb = { ...sb, usuario: "otro-uuid", nivel: "aal2" };
    expect(await resultado()).toEqual({ destino: "404" });
    expect(sb.cerro).toBe(true);
  });

  it("con aal1 de Carlos, niega (a la entrada, para el código)", async () => {
    sb = { ...sb, usuario: CARLOS, nivel: "aal1" };
    expect(await resultado()).toEqual({ destino: "/interno/entrar" });
    expect(sb.cerro).toBe(false);
  });

  it("si Supabase falla, niega", async () => {
    sb = { ...sb, falla: true };
    expect(await resultado()).toEqual({ destino: "/interno/entrar" });
  });

  it("con aal2 de Carlos, pasa y devuelve el usuario", async () => {
    sb = { ...sb, usuario: CARLOS, nivel: "aal2" };
    const { pasa } = await resultado();
    expect(pasa.user.id).toBe(CARLOS);
  });
});
