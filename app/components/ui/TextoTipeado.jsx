"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Texto corto (precio, dato) que aparece carácter por carácter, como si se
// tipeara. El texto completo va en aria-label; los caracteres son aria-hidden.
export function TextoTipeado({ texto, className = "", retraso = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = ref.current.querySelectorAll("[data-char]");
      gsap.set(chars, { opacity: 0 });
      gsap.to(chars, { opacity: 1, duration: 0.02, stagger: 0.05, delay: retraso });
    }, ref);
    return () => ctx.revert();
  }, [retraso, texto]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true">
        {texto.split("").map((c, i) => (
          <span key={i} data-char>
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
    </span>
  );
}
