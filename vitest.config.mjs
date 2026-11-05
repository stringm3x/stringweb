import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      // Los módulos de /interno llevan import "server-only"; fuera de Next se
      // cambia por el archivo vacío del mismo paquete.
      "server-only": path.resolve(__dirname, "node_modules/server-only/empty.js"),
    },
  },
  test: {
    environment: "node",
    include: ["app/**/*.test.js"],
  },
});
