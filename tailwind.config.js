/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      // Tokens de docs/sistema/tokens.json. Cambian solos con data-theme
      // (noche o pared); los valores viven en app/globals.css.
      fondo: "rgb(var(--fondo) / <alpha-value>)",
      superficie: "rgb(var(--superficie) / <alpha-value>)",
      texto: "rgb(var(--texto) / <alpha-value>)",
      "texto-suave": "rgb(var(--texto-suave) / <alpha-value>)",
      hairline: "rgb(var(--hairline) / <alpha-value>)",
      acento: "rgb(var(--acento) / <alpha-value>)",
      "sobre-acento": "rgb(var(--sobre-acento) / <alpha-value>)",
      foco: "rgb(var(--foco) / <alpha-value>)",
      "acento-presionado": "rgb(var(--acento-presionado) / <alpha-value>)",
      alerta: "rgb(var(--alerta) / <alpha-value>)",
      borde: "rgb(var(--borde) / <alpha-value>)",
      "borde-hover": "rgb(var(--borde-hover) / <alpha-value>)",
      "borde-suave": "rgb(var(--borde-suave) / <alpha-value>)",
      placeholder: "rgb(var(--placeholder) / <alpha-value>)",
      "boaz-azul": "rgb(var(--boaz-azul) / <alpha-value>)",
      // Legado de la marca anterior: lo usan las salas que se rehacen en
      // los lotes 2 a 4. No usar en piezas nuevas.
      "fondo-elevado": "#0f1310",
      papel: "#f7f5ef",
      tinta: "#ffffff",
      "tinta-papel": "#111111",
      "tinta-suave": "#a8b3a6",
      "tinta-tenue": "#7c8a7d",
      acido: "#50ff05",
      "acido-profundo": "#2f7a05",
      linea: "#242b24",
    },
    boxShadow: {
      acido: "8px 8px 0 #50ff05",
      tinta: "8px 8px 0 #111111",
      none: "none",
    },
    borderRadius: {
      none: "0",
      DEFAULT: "4px",
      full: "9999px",
      sm: "8px",
      md: "14px",
      lg: "20px",
      pill: "999px",
    },
    spacing: {
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "22rem",
      72: "28rem",
      80: "35rem",
      96: "50rem",
      px: "1px",
      0.5: "0.125rem",
      1.5: "0.375rem",
      2.5: "0.625rem",
      3.5: "0.875rem",
    },
    extend: {
      // Retícula: la página se centra a 1440 y el contenido a 1248
      // (1440 menos 96px de margen por lado). Header, hero y secciones
      // comparten estos dos anchos para que todo arranque en la misma x.
      maxWidth: {
        pagina: "1440px",
        contenido: "1248px",
      },
      spacing: {
        "espacio-1": "4px",
        "espacio-2": "8px",
        "espacio-3": "16px",
        "espacio-4": "24px",
        "espacio-5": "40px",
        "espacio-6": "64px",
        "espacio-7": "96px",
        // Espaciado de tokens.json.
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "16px",
        "space-4": "24px",
        "space-5": "32px",
        "space-6": "48px",
        "space-7": "64px",
        "space-8": "120px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SF Mono", "Menlo", "monospace"],
        // Legado: Anton ya no se carga (solo vive a trazo en el logo SVG).
        // Lo que aún dice font-anton cae en Geist hasta rehacer su sala.
        anton: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Escala de tokens.json.
        display: ["96px", { lineHeight: "1.02", letterSpacing: "-0.035em", fontWeight: "600" }],
        titulo: ["64px", { lineHeight: "1.02", letterSpacing: "-0.035em", fontWeight: "600" }],
        subtitulo: ["30px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        entrada: ["22px", { lineHeight: "1.45" }],
        cuerpo: ["17px", { lineHeight: "1.5" }],
        pequeno: ["14px", { lineHeight: "1.45" }],
        etiqueta: ["12px", { lineHeight: "1.4", letterSpacing: "0.16em", fontWeight: "500" }],
        cifra: ["16px", { lineHeight: "1.4" }],
        // Legado de la marca anterior.
        "titular-xl": ["88px", { lineHeight: "80px", letterSpacing: "0.01em" }],
        "titular-l": ["56px", { lineHeight: "52px", letterSpacing: "0.01em" }],
        "titular-m": ["34px", { lineHeight: "34px", letterSpacing: "0.01em" }],
        "cuerpo-l": ["19px", { lineHeight: "30px" }],
        "cuerpo-s": ["14px", { lineHeight: "22px" }],
        dato: ["15px", { lineHeight: "20px", letterSpacing: "0.04em" }],
      },
      keyframes: {
        cinta: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        girar: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        // Flash de "impresión": papel que se desvanece sobre la lámina.
        imprimir: {
          from: { opacity: "0.9" },
          to: { opacity: "0" },
        },
        tic: {
          "0%, 100%": { transform: "scale(1)" },
          "40%": { transform: "scale(0.88)" },
          "70%": { transform: "scale(1.06)" },
        },
      },
      animation: {
        cinta: "cinta var(--legado-dur-cinta) linear infinite",
        girar: "girar var(--legado-dur-girar) linear infinite",
        imprimir: "imprimir var(--legado-dur-imprimir) var(--curva) forwards",
        tic: "tic var(--legado-dur-tic) var(--curva) var(--legado-espera-tic) 1 both",
      },
      // Movimiento de docs/calidad.md: las clases duration-rapido/normal/lento
      // y una sola curva. Las duraciones numéricas de Tailwind quedan solo
      // para el legado de /gym; el sitio no las usa (tests/tokens.test.js).
      transitionDuration: {
        DEFAULT: "var(--dur-rapido)",
        rapido: "var(--dur-rapido)",
        normal: "var(--dur-normal)",
        lento: "var(--dur-lento)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--curva)",
        curva: "var(--curva)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
