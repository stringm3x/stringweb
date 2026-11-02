// svgo para los dibujos de línea (lote 12): conserva el viewBox, el
// aria-hidden y los <clipPath> del rayado; redondea a una décima, la misma
// precisión con que se dibujan, para no tocar el temblor del trazo.
// Uso, una carpeta a la vez: npx --yes svgo@4 --config scripts/dibujos/svgo.config.mjs -f public/arte/giros
export default {
  multipass: true,
  floatPrecision: 1,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          convertPathData: { floatPrecision: 1, makeArcs: false },
          // No se juntan caminos: cada trazo conserva su orden de pintado.
          mergePaths: false,
        },
      },
    },
  ],
};
