// Imágenes para buscadores (lote 18). Se corre a mano cuando cambie el logo:
//   node scripts/generar-imagenes-seo.mjs
// Nada del sitio lo importa. Lee los archivos reales del sistema y escribe:
// - public/logo/string-pared.png: el logotipo sobre pared para el JSON-LD
//   (Google pide PNG, JPG o similar de al menos 112 px).
// - app/icon1.png: el ícono a 48 px (Google pide un favicon múltiplo de 48).
// - app/favicon.ico: el mismo ícono a 16, 32 y 48 px, para quien pida
//   /favicon.ico.
import fs from "node:fs";
import sharp from "sharp";

const raiz = new URL("../", import.meta.url);
const ruta = (p) => new URL(p, raiz).pathname;

await sharp(ruta("public/logo/string-pared.svg"), { density: 144 })
  .resize({ width: 852 })
  .png({ compressionLevel: 9 })
  .toFile(ruta("public/logo/string-pared.png"));

console.log("public/logo/string-pared.png listo");

const icono = ruta("app/icon.svg");
await sharp(icono, { density: 288 }).resize(48, 48).png({ compressionLevel: 9 }).toFile(ruta("app/icon1.png"));
console.log("app/icon1.png listo");

// Un .ico es una cabecera, un directorio y las imágenes; desde Windows Vista
// cada imagen puede ir como PNG tal cual.
const tamanos = [16, 32, 48];
const pngs = await Promise.all(
  tamanos.map((t) => sharp(icono, { density: 288 }).resize(t, t).png({ compressionLevel: 9 }).toBuffer())
);
const cabecera = Buffer.alloc(6);
cabecera.writeUInt16LE(0, 0);
cabecera.writeUInt16LE(1, 2);
cabecera.writeUInt16LE(tamanos.length, 4);
let desplazamiento = 6 + 16 * tamanos.length;
const directorio = tamanos.map((t, i) => {
  const entrada = Buffer.alloc(16);
  entrada.writeUInt8(t, 0);
  entrada.writeUInt8(t, 1);
  entrada.writeUInt16LE(1, 4);
  entrada.writeUInt16LE(32, 6);
  entrada.writeUInt32LE(pngs[i].length, 8);
  entrada.writeUInt32LE(desplazamiento, 12);
  desplazamiento += pngs[i].length;
  return entrada;
});
fs.writeFileSync(ruta("app/favicon.ico"), Buffer.concat([cabecera, ...directorio, ...pngs]));
console.log("app/favicon.ico listo");
