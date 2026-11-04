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
      placeholder: "rgb(var(--placeholder) / <alpha-value>)",
      "boaz-azul": "rgb(var(--boaz-azul) / <alpha-value>)",
      // Contorno de los campos de Boaz (tema boaz).
      campo: "rgb(var(--campo) / <alpha-value>)",
    },
    boxShadow: {
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
        // Ubuntu Mono de Boaz: solo en /boaz y /gym (app/components/boaz/fuentes.js).
        "boaz-mono": ["var(--font-boaz-mono)", "ui-monospace", "monospace"],
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
        // Lo usan los párrafos de entrada de las páginas internas.
        "cuerpo-l": ["19px", { lineHeight: "30px" }],
      },
      // Movimiento de docs/calidad.md: las clases duration-rapido/normal/lento
      // y una sola curva. Las duraciones numéricas de Tailwind no se usan
      // (app/tokens.test.js).
      transitionDuration: {
        DEFAULT: "var(--dur-rapido)",
        rapido: "var(--dur-rapido)",
        normal: "var(--dur-normal)",
        lento: "var(--dur-lento)",
        // Solo en el tema boaz: el color del botón de Boaz (G).
        "boaz-color": "var(--boaz-dur-color)",
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
