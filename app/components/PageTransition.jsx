"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

// Entrada de cada ruta: la página sube 12px y aparece. Con movimiento
// reducido GSAP la resuelve al instante (ver lib/motionPrefs). Es solo
// entrada: el App Router ya cambió el contenido cuando llegamos aquí.
export default function PageTransition({ children }) {
  const pathname = usePathname();
  const ref = useRef(null);

  useEffect(() => {
    const tween = gsap.fromTo(
      ref.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", clearProps: "transform" }
    );
    return () => tween.kill();
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
