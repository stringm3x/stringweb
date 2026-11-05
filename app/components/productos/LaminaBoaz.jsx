// La lámina de Boaz: la escena de la columna con el disco colgado, tomada
// tal cual de string-gym-saas (components/dibujos/escena-columna.ts). Allá
// sigue PROVISIONAL hasta que llegue el ilustrador; cuando cambie, se copia
// aquí también. Quieta: sin el vaivén del disco. El contorno toma
// currentColor (tinta sobre pared), las cotas van en Geist Mono y el disco
// es la única mancha de color.
//
// OJO: la og:image de /boaz (app/(sitio)/boaz/opengraph-image.jsx) llama a
// esta función y pasa su árbol a SVG con un serializador mínimo: solo
// elementos SVG con atributos simples; <text> se omite y los `style` se
// ignoran. Si aquí entra un hook, un componente propio o un elemento nuevo,
// revisa esa imagen (e2e/seo.spec.js la pide y falla si el generador truena).
const COTA = {
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  fontSize: "11px",
  letterSpacing: "0.18em",
};

// `decorativa` (lote 12): dentro de la tarjeta de /productos, que ya se nombra
// sola; `viewBox` la recorta.
export function LaminaBoaz({ className = "", decorativa = false, viewBox = "0 0 600 900" }) {
  const nombre = decorativa
    ? { "aria-hidden": true }
    : {
        role: "img",
        "aria-label":
          "Lámina de Boaz: una columna con un disco colgado, dibujada como plano técnico, con la mancha azul en el disco.",
      };
  return (
    <svg viewBox={viewBox} fill="none" strokeLinecap="round" strokeLinejoin="round" {...nombre} className={className}>
      <g stroke="#C4C0B6">
        <path d="M240 70 L240 900 M260 470 L600 470 M470 230 L470 720" strokeWidth="0.5" strokeDasharray="8 3 2 3" />
        <path d="M70 160 L70 880 M62 160 L78 160" strokeWidth="0.5" />
        <path d="M90 160 L190 160 M90 880 L190 880" strokeWidth="0.5" />
        <circle cx="470" cy="470" r="170" strokeWidth="0.5" />
        <circle cx="470" cy="470" r="220" strokeWidth="0.5" />
      </g>
      <g stroke="currentColor">
        <path d="M100 160 L380 160 L380 196 L100 196 Z" fill="#F4F2EC" strokeWidth="1.4" />
        <path d="M114 196 C 140 226, 340 226, 366 196" fill="#F4F2EC" strokeWidth="1.4" />
        <path d="M130 218 L350 218 L340 920 L140 920 Z" fill="#F4F2EC" strokeWidth="1.4" />
        <path d="M184 222 L186 920 M240 222 L240 920 M296 222 L294 920" strokeWidth="0.9" />
        <path d="M380 176 C 410 210, 440 236, 470 244" strokeWidth="0.9" />
        <path d="M470 244 L470 270" strokeWidth="1.4" />
        <circle cx="470" cy="390" r="120" fill="#2979FF" strokeWidth="1.4" />
        <circle cx="470" cy="390" r="78" strokeWidth="0.9" />
        <circle cx="470" cy="390" r="28" strokeWidth="0.9" />
        <circle cx="470" cy="390" r="19" fill="#F4F2EC" strokeWidth="1.4" />
      </g>
      {/* Las cotas son dibujo: el lector no las lee (lote 13). */}
      <g aria-hidden="true">
        <text x="61" y="520" transform="rotate(-90 61 520)" fill="#5F6368" style={COTA}>
          H · 586
        </text>
        <text x="378" y="558" fill="#5F6368" style={COTA}>
          Ø 450 · 20 KG
        </text>
      </g>
    </svg>
  );
}
