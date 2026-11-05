import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import * as layoutInterno from "./(interno)/layout.jsx";
import { firmarIntentos, leerIntentos } from "./lib/interno/intentos";

// Reglas de /interno que se revisan leyendo el repo (CLAUDE.md § Rutas).
const RAIZ = path.resolve(__dirname, "..");
const rel = (f) => path.relative(RAIZ, f).split(path.sep).join("/");

function archivos(dir, extensiones = /\.(m?js|jsx)$/) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === "node_modules" || e.name.startsWith(".") ? [] : archivos(ruta, extensiones);
    return extensiones.test(e.name) ? [ruta] : [];
  });
}

// Todo el código propio del repo: app/, scripts/, e2e/ y los archivos de la raíz.
const CODIGO = [
  ...archivos(path.join(RAIZ, "app")),
  ...archivos(path.join(RAIZ, "scripts")),
  ...archivos(path.join(RAIZ, "e2e")),
  ...fs.readdirSync(RAIZ).filter((f) => /\.(m?js|jsx)$/.test(f)).map((f) => path.join(RAIZ, f)),
];
const IMPORTA_SUPABASE = /(from\s+|import\s*\(\s*|require\s*\(\s*)["']@supabase\//;

describe("/interno fuera de lo público", () => {
  it("el sitemap no tiene /interno", () => {
    const urls = sitemap().map((e) => new URL(e.url).pathname);
    expect(urls.length).toBeGreaterThan(0);
    expect(urls.filter((u) => u.startsWith("/interno"))).toEqual([]);
  });

  it("public/robots.txt no menciona /interno", () => {
    expect(fs.readFileSync(path.join(RAIZ, "public/robots.txt"), "utf8")).not.toMatch(/interno/i);
  });

  it("la barra, el menú y el pie no enlazan a /interno", () => {
    for (const f of ["app/header.jsx", "app/Footer.jsx"]) {
      expect(fs.readFileSync(path.join(RAIZ, f), "utf8"), f).not.toMatch(/\/interno/);
    }
  });
});

describe("Supabase solo en app/(interno)/ y app/lib/interno/", () => {
  it("ningún otro archivo importa @supabase (excepción: el script del TOTP)", () => {
    const permitidos = /^(app\/\(interno\)\/|app\/lib\/interno\/|scripts\/interno\/enrolar-totp\.mjs$)/;
    const fuera = CODIGO.filter((f) => !permitidos.test(rel(f)) && IMPORTA_SUPABASE.test(fs.readFileSync(f, "utf8")));
    expect(fuera.map(rel)).toEqual([]);
  });

  it("nadie importa el script del TOTP", () => {
    const quien = CODIGO.filter(
      (f) => /(from\s+|import\s*\(\s*|require\s*\(\s*)["'][^"']*enrolar-totp/.test(fs.readFileSync(f, "utf8"))
    );
    expect(quien.map(rel)).toEqual([]);
  });

  it("los módulos de servidor de app/lib/interno llevan server-only", () => {
    for (const f of ["servidor.js", "exigirCarlos.js", "entrada.js"]) {
      expect(fs.readFileSync(path.join(RAIZ, "app/lib/interno", f), "utf8"), f).toMatch(/^import "server-only";/m);
    }
  });
});

describe("cada ruta de /interno pasa por exigirCarlos()", () => {
  const dir = path.join(RAIZ, "app/(interno)");
  const rutas = archivos(dir).filter((f) => /\/(page|route)\.(m?js|jsx)$/.test(f));

  it("hay rutas que revisar", () => {
    expect(rutas.length).toBeGreaterThanOrEqual(3);
  });

  it("toda página y route handler, salvo la entrada, llama a exigirCarlos()", () => {
    const sinPuerta = rutas.filter(
      (f) => !rel(f).startsWith("app/(interno)/interno/entrar/") && !/await exigirCarlos\(\)/.test(fs.readFileSync(f, "utf8"))
    );
    expect(sinPuerta.map(rel)).toEqual([]);
  });

  it("el layout protegido llama a exigirCarlos()", () => {
    const layout = fs.readFileSync(path.join(dir, "interno/(protegido)/layout.jsx"), "utf8");
    expect(layout).toMatch(/await exigirCarlos\(\)/);
  });

  it("las únicas server actions sin exigirCarlos() son entrar, verificar y salir", () => {
    const acciones = archivos(dir).filter((f) => /^\s*["']use server["']/.test(fs.readFileSync(f, "utf8")));
    const exportadas = acciones.flatMap((f) =>
      [...fs.readFileSync(f, "utf8").matchAll(/export async function (\w+)/g)].map((m) => m[1])
    );
    expect(exportadas.sort()).toEqual(["entrar", "salir", "verificar"]);
  });
});

describe("metadata del layout de (interno)", () => {
  const { metadata, dynamic } = layoutInterno;

  it("noindex, nofollow", () => {
    expect(metadata.robots.index).toBe(false);
    expect(metadata.robots.follow).toBe(false);
    expect(metadata.robots.googleBot.index).toBe(false);
    expect(metadata.robots.googleBot.follow).toBe(false);
  });

  it("sin canonical, Open Graph ni Twitter heredados", () => {
    expect(metadata.alternates.canonical).toBeNull();
    expect(metadata.openGraph).toBeNull();
    expect(metadata.twitter).toBeNull();
  });

  it("nada se prerenderiza", () => {
    expect(dynamic).toBe("force-dynamic");
  });
});

describe("cookie de intentos", () => {
  const SECRETO = "s".repeat(32);
  const ligada = { sid: "sesion-1", uid: "carlos" };

  it("se lee con la misma sesión y el mismo usuario", () => {
    expect(leerIntentos(firmarIntentos({ n: 3, ...ligada }, SECRETO), SECRETO, ligada)).toBe(3);
  });

  it("caducada, con otro secreto o con otro usuario, no vale", () => {
    const valor = firmarIntentos({ n: 0, ...ligada, ahora: Date.now() - 16 * 60 * 1000 }, SECRETO);
    expect(leerIntentos(valor, SECRETO, ligada)).toBeNull();
    expect(leerIntentos(firmarIntentos({ n: 0, ...ligada }, "x".repeat(32)), SECRETO, ligada)).toBeNull();
    expect(leerIntentos(firmarIntentos({ n: 0, ...ligada }, SECRETO), SECRETO, { ...ligada, uid: "otro" })).toBeNull();
    expect(leerIntentos("basura", SECRETO, ligada)).toBeNull();
  });
});
