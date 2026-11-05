import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

// proxy.js sin un Supabase real: el cliente se simula. `sesionSimulada`
// decide qué responde getUser() / el nivel, y si Supabase refresca la cookie.
let sesionSimulada;

vi.mock("@supabase/ssr", () => ({
  createServerClient: (_url, _clave, { cookies }) => ({
    auth: {
      async getUser() {
        if (sesionSimulada.falla) throw new Error("Supabase caído");
        if (sesionSimulada.refresca) {
          cookies.setAll([
            { name: "sb-prueba-auth-token", value: "renovada", options: { path: "/", httpOnly: true, sameSite: "lax" } },
          ]);
        }
        return sesionSimulada.usuario
          ? { data: { user: { id: sesionSimulada.usuario } }, error: null }
          : { data: { user: null }, error: { message: "sin sesión" } };
      },
      mfa: {
        async getAuthenticatorAssuranceLevel() {
          return { data: { currentLevel: sesionSimulada.nivel }, error: null };
        },
      },
    },
  }),
}));

const { proxy, config } = await import("../../../proxy.js");

const CARLOS = "00000000-0000-4000-8000-0000000000ca";
const pedir = (ruta) => proxy(new NextRequest(`http://localhost:3000${ruta}`));

function conVariables() {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://prueba.supabase.co");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "clave-publica");
  vi.stubEnv("INTERNO_USUARIO_ID", CARLOS);
}

function esRedirectAEntrar(res) {
  expect(res.status).toBe(307);
  expect(new URL(res.headers.get("location")).pathname).toBe("/interno/entrar");
}

function traeCabeceras(res) {
  expect(res.headers.get("x-robots-tag")).toBe("noindex, nofollow");
  expect(res.headers.get("cache-control")).toBe("private, no-store");
}

beforeEach(() => {
  sesionSimulada = { usuario: null, nivel: null, refresca: false, falla: false };
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "");
  vi.stubEnv("INTERNO_USUARIO_ID", "");
});
afterEach(() => vi.unstubAllEnvs());

describe("proxy.js", () => {
  it("solo corre en /interno", () => {
    expect(config.matcher).toEqual(["/interno/:path*"]);
  });

  it("sin variables, falla cerrado y manda a la entrada", async () => {
    sesionSimulada = { ...sesionSimulada, usuario: CARLOS, nivel: "aal2" };
    const res = await pedir("/interno/diagnostico");
    esRedirectAEntrar(res);
    traeCabeceras(res);
  });

  it("en /interno/entrar no redirige (sin bucle) y pone las cabeceras", async () => {
    const res = await pedir("/interno/entrar");
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("x-middleware-next")).toBe("1");
    traeCabeceras(res);
  });

  it("/interno a secas también pasa por la puerta", async () => {
    conVariables();
    esRedirectAEntrar(await pedir("/interno"));
  });

  it("sin sesión, manda a la entrada", async () => {
    conVariables();
    const res = await pedir("/interno/diagnostico?x=1");
    esRedirectAEntrar(res);
    expect(new URL(res.headers.get("location")).search).toBe("");
    traeCabeceras(res);
  });

  it("con otro UUID, manda a la entrada", async () => {
    conVariables();
    sesionSimulada = { ...sesionSimulada, usuario: "otro-uuid", nivel: "aal2" };
    esRedirectAEntrar(await pedir("/interno/diagnostico"));
  });

  it("con aal1, manda a la entrada y conserva la cookie refrescada", async () => {
    conVariables();
    sesionSimulada = { ...sesionSimulada, usuario: CARLOS, nivel: "aal1", refresca: true };
    const res = await pedir("/interno/diagnostico");
    esRedirectAEntrar(res);
    const cookie = res.cookies.get("sb-prueba-auth-token");
    expect(cookie?.value).toBe("renovada");
    expect(cookie?.httpOnly).toBe(true);
    expect(res.headers.get("set-cookie")).toContain("sb-prueba-auth-token=renovada");
    traeCabeceras(res);
  });

  it("si Supabase falla, manda a la entrada", async () => {
    conVariables();
    sesionSimulada = { ...sesionSimulada, falla: true };
    esRedirectAEntrar(await pedir("/interno/diagnostico"));
  });

  it("con aal2 de Carlos, deja pasar con la cookie refrescada y las cabeceras", async () => {
    conVariables();
    sesionSimulada = { ...sesionSimulada, usuario: CARLOS, nivel: "aal2", refresca: true };
    const res = await pedir("/interno/diagnostico");
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("x-middleware-next")).toBe("1");
    expect(res.cookies.get("sb-prueba-auth-token")?.value).toBe("renovada");
    traeCabeceras(res);
  });
});
