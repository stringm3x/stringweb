"use client";

import { useEffect, useRef } from "react";

// Entrada de cada bloque de /productos (lote 9a): sube y aparece una vez, en
// --dur-lento con la curva del sistema (app/salas.css, .entra). Si al montar
// el bloque ya está en pantalla (o se llegó por un ancla), no se esconde:
// nada aparece y desaparece. Sin JavaScript o con menos movimiento, quieto.
export function Entra({ as: Etiqueta = "div", className = "", children, ...resto }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.mov = "espera";
    // Umbral 0 y la línea un poco arriba del borde: los bloques altos (Boaz
    // en celular) miden varias pantallas y nunca llegarían a un porcentaje.
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.dataset.mov = "hecho";
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Etiqueta ref={ref} className={`entra ${className}`.trim()} {...resto}>
      {children}
    </Etiqueta>
  );
}
