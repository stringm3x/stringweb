import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { firmarIntentos, COOKIE_INTENTOS } from "@/app/lib/interno/intentos";

// Las tres acciones de la entrada, sin Supabase real. Se simulan las
// cookies de Next, redirect() y el cliente de Supabase.
const CARLOS = "00000000-0000-4000-8000-0000000000ca";
const SECRETO = "s".repeat(32);
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const token = (sid) => `${b64({ alg: "HS256" })}.${b64({ session_id: sid })}.ZmlybWE`;

let galletas; // Map nombre → valor
let sb; // estado del Supabase simulado
let clientesCreados;

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (nombre) => (galletas.has(nombre) ? { name: nombre, value: galletas.get(nombre) } : undefined),
    getAll: () => [...galletas].map(([name, value]) => ({ name, value })),
    set: (nombre, valor) => galletas.set(nombre, valor),
    delete: (o) => galletas.delete(typeof o === "string" ? o : o.name),
  }),
}));

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
          return sb.usuario ? { data: { user: { id: sb.usuario } }, error: null } : { data: { user: null }, error: {} };
        },
        async getSession() {
          return { data: { session: sb.usuario ? { access_token: token(sb.sid) } : null } };
        },
        async signInWithPassword({ password }) {
          if (password !== "buena") return { data: {}, error: { message: "Invalid login credentials" } };
          sb.usuario = sb.quienEntra;
          sb.nivel = "aal1";
          return { data: { user: { id: sb.usuario } }, error: null };
        },
        signOut: vi.fn(async () => {
          sb.usuario = null;
          sb.nivel = null;
          return { error: null };
        }),
        mfa: {
          async getAuthenticatorAssuranceLevel() {
            return { data: { currentLevel: sb.nivel }, error: null };
          },
          async listFactors() {
            return { data: { all: [], totp: [{ id: "f1" }] }, error: null };
          },
          challengeAndVerify: vi.fn(async ({ code }) => {
            sb.verificaciones++;
            if (code !== "123456") return { data: null, error: { message: "Invalid TOTP code entered" } };
            sb.nivel = "aal2";
            return { data: {}, error: null };
          }),
        },
      },
    };
  },
}));

const { entrar, verificar, salir } = await import("./acciones.js");

const formulario = (datos) => {
  const f = new FormData();
  Object.entries(datos).forEach(([k, v]) => f.set(k, v));
  return f;
};

// Corre la acción y devuelve a dónde redirige.
async function destino(accion, datos = {}) {
  try {
    await accion(formulario(datos));
  } catch (e) {
    if (e && "destino" in e) return e.destino;
    throw e;
  }
  return null;
}

const enAal1DeCarlos = (intentos = 0) => {
  sb.usuario = CARLOS;
  sb.nivel = "aal1";
  galletas.set(COOKIE_INTENTOS, firmarIntentos({ n: intentos, sid: sb.sid, uid: CARLOS }, SECRETO));
};

beforeEach(() => {
  galletas = new Map();
  clientesCreados = 0;
  sb = { usuario: null, nivel: null, sid: "sesion-1", quienEntra: CARLOS, verificaciones: 0 };
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://prueba.supabase.co");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "clave-publica");
  vi.stubEnv("INTERNO_USUARIO_ID", CARLOS);
  vi.stubEnv("INTERNO_SECRETO", SECRETO);
});
afterEach(() => vi.unstubAllEnvs());

describe("Entrar (contraseña)", () => {
  it("Carlos con la contraseña correcta queda en aal1, con la cuenta en 0", async () => {
    expect(await destino(entrar, { correo: "c@x.mx", contrasena: "buena" })).toBe("/interno/entrar");
    expect(sb.usuario).toBe(CARLOS);
    expect(galletas.get(COOKIE_INTENTOS)).toBeTruthy();
  });

  it("contraseña mala: error genérico, sin cookie de intentos", async () => {
    expect(await destino(entrar, { correo: "c@x.mx", contrasena: "mala" })).toBe("/interno/entrar?error=1");
    expect(galletas.has(COOKIE_INTENTOS)).toBe(false);
  });

  it("otro usuario: cierra la sesión de inmediato y responde el error genérico", async () => {
    sb.quienEntra = "otro-uuid";
    expect(await destino(entrar, { correo: "o@x.mx", contrasena: "buena" })).toBe("/interno/entrar?error=1");
    expect(sb.usuario).toBeNull();
    expect(galletas.has(COOKIE_INTENTOS)).toBe(false);
  });

  it("sin INTERNO_SECRETO, falla cerrado", async () => {
    vi.stubEnv("INTERNO_SECRETO", "");
    expect(await destino(entrar, { correo: "c@x.mx", contrasena: "buena" })).toBe("/interno/entrar?error=1");
    expect(clientesCreados).toBe(0);
  });
});

describe("Verificar (código)", () => {
  it("código correcto: aal2 y a /interno/diagnostico; la cuenta se borra", async () => {
    enAal1DeCarlos();
    expect(await destino(verificar, { codigo: "123456" })).toBe("/interno/diagnostico");
    expect(sb.nivel).toBe("aal2");
    expect(galletas.has(COOKIE_INTENTOS)).toBe(false);
  });

  it("código malo: sigue en aal1, error genérico y suma un intento", async () => {
    enAal1DeCarlos();
    const antes = galletas.get(COOKIE_INTENTOS);
    expect(await destino(verificar, { codigo: "000000" })).toBe("/interno/entrar?error=1");
    expect(sb.usuario).toBe(CARLOS);
    expect(sb.nivel).toBe("aal1");
    expect(galletas.get(COOKIE_INTENTOS)).not.toBe(antes);
  });

  it("después de un código malo, uno correcto sí entra", async () => {
    enAal1DeCarlos();
    await destino(verificar, { codigo: "000000" });
    expect(await destino(verificar, { codigo: "123456" })).toBe("/interno/diagnostico");
  });

  it("5 códigos malos seguidos: sesión cerrada y de vuelta a correo y contraseña", async () => {
    enAal1DeCarlos();
    for (let i = 1; i <= 4; i++) {
      expect(await destino(verificar, { codigo: "000000" })).toBe("/interno/entrar?error=1");
      expect(sb.usuario).toBe(CARLOS);
    }
    expect(await destino(verificar, { codigo: "000000" })).toBe("/interno/entrar?error=1");
    expect(sb.usuario).toBeNull();
    expect(galletas.has(COOKIE_INTENTOS)).toBe(false);
    expect(sb.verificaciones).toBe(5);
  });

  it.each([["12345"], ["1234567"], ["12a456"], [""]])("formato malo (%j): no llama a Supabase ni cierra la sesión", async (codigo) => {
    enAal1DeCarlos();
    expect(await destino(verificar, { codigo })).toBe("/interno/entrar?error=1");
    expect(clientesCreados).toBe(0);
    expect(sb.usuario).toBe(CARLOS);
  });

  it("cookie de intentos alterada: sesión cerrada", async () => {
    enAal1DeCarlos(4);
    const [cuerpo, firma] = galletas.get(COOKIE_INTENTOS).split(".");
    const datos = JSON.parse(Buffer.from(cuerpo, "base64url").toString());
    galletas.set(COOKIE_INTENTOS, `${b64({ ...datos, n: 0 })}.${firma}`);
    expect(await destino(verificar, { codigo: "123456" })).toBe("/interno/entrar?error=1");
    expect(sb.usuario).toBeNull();
    expect(sb.verificaciones).toBe(0);
  });

  it("sin cookie de intentos: cuenta como límite y cierra la sesión", async () => {
    enAal1DeCarlos();
    galletas.delete(COOKIE_INTENTOS);
    expect(await destino(verificar, { codigo: "123456" })).toBe("/interno/entrar?error=1");
    expect(sb.usuario).toBeNull();
  });

  it("cookie de otra sesión: cierra la sesión", async () => {
    enAal1DeCarlos();
    sb.sid = "sesion-2";
    expect(await destino(verificar, { codigo: "123456" })).toBe("/interno/entrar?error=1");
    expect(sb.usuario).toBeNull();
  });

  it("sesión de otro UUID: cierra la sesión sin verificar", async () => {
    enAal1DeCarlos();
    sb.usuario = "otro-uuid";
    expect(await destino(verificar, { codigo: "123456" })).toBe("/interno/entrar?error=1");
    expect(sb.usuario).toBeNull();
    expect(sb.verificaciones).toBe(0);
  });

  it("sin sesión: error genérico, sin verificar", async () => {
    expect(await destino(verificar, { codigo: "123456" })).toBe("/interno/entrar?error=1");
    expect(sb.verificaciones).toBe(0);
  });
});

describe("Salir", () => {
  it("cierra la sesión y vuelve a la entrada", async () => {
    sb.usuario = CARLOS;
    sb.nivel = "aal2";
    expect(await destino(salir)).toBe("/interno/entrar");
    expect(sb.usuario).toBeNull();
  });
});
