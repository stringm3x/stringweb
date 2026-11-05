// Imágenes para buscadores (lote 18). Se corre a mano cuando cambie el logo:
//   node scripts/generar-imagenes-seo.mjs
// Nada del sitio lo importa. Lee los archivos reales del sistema y escribe:
// - public/logo/string-pared.png: el logotipo sobre pared para el JSON-LD
//   (Google pide PNG, JPG o similar de al menos 112 px).
import sharp from "sharp";

const raiz = new URL("../", import.meta.url);
const ruta = (p) => new URL(p, raiz).pathname;

await sharp(ruta("public/logo/string-pared.svg"), { density: 144 })
  .resize({ width: 852 })
  .png({ compressionLevel: 9 })
  .toFile(ruta("public/logo/string-pared.png"));

console.log("public/logo/string-pared.png listo");
