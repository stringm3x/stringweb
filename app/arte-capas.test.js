import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { CAPAS, capa, partir } from "../scripts/capas-arte.mjs";

// docs/movimiento-salas.md: los dibujos se separan en capas "sin cambiar
// cómo se ven al final". Las capas apiladas se comparan píxel a píxel con
// el dibujo original; solo se tolera el redondeo del suavizado.
const ARTE = path.resolve(__dirname, "../public/arte");
const TOLERANCIA = 8;

const pintar = (archivo) => sharp(archivo, { density: 144 });

describe("capas del arte", () => {
  for (const [sala, { original, capas }] of Object.entries(CAPAS)) {
    it(`${sala}: las capas en disco son las que salen del original`, () => {
      const partes = partir(fs.readFileSync(path.join(ARTE, original), "utf8"));
      for (const [nombre, desde, hasta] of capas) {
        const enDisco = fs.readFileSync(path.join(ARTE, sala, `${nombre}.svg`), "utf8");
        expect(enDisco, `${sala}/${nombre}.svg: corre node scripts/capas-arte.mjs`).toBe(
          capa(partes, desde, hasta)
        );
      }
    });

    it(`${sala}: apiladas se ven igual que ${original}`, async () => {
      const { width, height } = await pintar(path.join(ARTE, original)).metadata();
      const antes = await pintar(path.join(ARTE, original)).ensureAlpha().raw().toBuffer();
      const capasPng = await Promise.all(
        capas.map(([nombre]) => pintar(path.join(ARTE, sala, `${nombre}.svg`)).png().toBuffer())
      );
      const despues = await sharp({
        create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
      })
        .composite(capasPng.map((input) => ({ input })))
        .raw()
        .toBuffer();
      let distintos = 0;
      for (let i = 0; i < antes.length; i++) if (Math.abs(antes[i] - despues[i]) > TOLERANCIA) distintos++;
      expect(distintos).toBe(0);
    }, 30_000);
  }
});
