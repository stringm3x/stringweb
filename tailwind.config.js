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
      fondo: "#000000",
      "fondo-elevado": "#0f1310",
      papel: "#f7f5ef",
      tinta: "#ffffff",
      "tinta-papel": "#111111",
      "tinta-suave": "#a8b3a6",
      "tinta-tenue": "#7c8a7d",
      acido: "#50ff05",
      "acido-profundo": "#2f7a05",
      linea: "#242b24",
      // ALIAS TEMPORAL: se elimina al terminar el rediseño
      green: "#50ff05",
      // ALIAS TEMPORAL: se elimina al terminar el rediseño
      gray: "#a8b3a6",
      // ALIAS TEMPORAL: se elimina al terminar el rediseño
      charcoal: "#0f1310",
      // ALIAS TEMPORAL: se elimina al terminar el rediseño
      bg: "#000000",
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
      spacing: {
        "espacio-1": "4px",
        "espacio-2": "8px",
        "espacio-3": "16px",
        "espacio-4": "24px",
        "espacio-5": "40px",
        "espacio-6": "64px",
        "espacio-7": "96px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-ubuntu-mono)", "ui-monospace", "monospace"],
        anton: ["var(--font-anton-sans)", "Arial Narrow", "Impact", "sans-serif"],
      },
      fontSize: {
        "titular-xl": ["88px", { lineHeight: "80px", letterSpacing: "0.01em" }],
        "titular-l": ["56px", { lineHeight: "52px", letterSpacing: "0.01em" }],
        "titular-m": ["34px", { lineHeight: "34px", letterSpacing: "0.01em" }],
        "cuerpo-l": ["19px", { lineHeight: "30px" }],
        cuerpo: ["16px", { lineHeight: "26px" }],
        "cuerpo-s": ["14px", { lineHeight: "22px" }],
        etiqueta: ["13px", { lineHeight: "16px", letterSpacing: "0.16em" }],
        dato: ["15px", { lineHeight: "20px", letterSpacing: "0.04em" }],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
