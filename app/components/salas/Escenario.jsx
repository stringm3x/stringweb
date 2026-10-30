"use client";

import { useEffect, useRef } from "react";

// El escenario de una sala con movimiento (docs/movimiento-salas.md). No
// anima nada: solo marca atributos que app/salas.css lee. Un solo
// IntersectionObserver por sala; nada escucha el scroll en cada fotograma.
//
// - "una-vez" (música, galería): data-mov="espera" al montar y "hecho" al
//   entrar en pantalla. No se repite.
// - "etapas" (escultura, cine, arquitectura): lo que sigue al dedo usa
//   animation-timeline en CSS. Donde el navegador no la tiene, este modo pone
//   data-etapa = cuántos [data-centinela] ya cruzaron la línea (solo avanza,
//   así nunca queda a medias) y data-activo = el paso de ahora.
// - "visible" (danza): data-visible mientras la sala está en pantalla.
//
// Con menos movimiento no marca nada: sin atributos, cada sala queda en su
// estado final. Igual sin JavaScript.
//
// `linea` es la altura de la pantalla (en %) donde se cruza una etapa;
// `lineaAncha`, la de pantallas de 1024 px o más. `centrar` hace que la tira
// [data-tira] centre el [data-cuadro] de la etapa actual (cine en celular).
export function Escenario({
  modo,
  linea = 50,
  lineaAncha = linea,
  centrar = false,
  as: Etiqueta = "div",
  children,
  ...resto
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (modo === "una-vez") {
      el.dataset.mov = "espera";
      const io = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          el.dataset.mov = "hecho";
          io.disconnect();
        },
        { threshold: 0.3 }
      );
      io.observe(el);
      return () => io.disconnect();
    }

    if (modo === "visible") {
      const io = new IntersectionObserver(([e]) => {
        el.dataset.visible = e.isIntersecting ? "si" : "no";
      });
      io.observe(el);
      return () => io.disconnect();
    }

    if (modo !== "etapas") return;
    const respaldo = !CSS.supports("animation-timeline: view()");
    if (!respaldo && !centrar) return;

    const ancha = window.matchMedia("(min-width: 1024px)").matches;
    const altura = ancha ? lineaAncha : linea;
    const centinelas = [...el.querySelectorAll("[data-centinela]")];
    const cruzados = new Set();
    let maximo = 0;
    let actual = -1;

    if (respaldo) {
      el.dataset.etapa = "0";
      el.dataset.activo = "0";
    }

    // La raíz va de arriba de la pantalla hasta la línea: un centinela que
    // está dentro, o ya pasó por arriba, cruzó.
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          const cruzo = e.isIntersecting || e.boundingClientRect.top < 0;
          if (cruzo) cruzados.add(e.target);
          else cruzados.delete(e.target);
        });
        const ahora = cruzados.size;
        maximo = Math.max(maximo, ahora);
        if (respaldo) {
          el.dataset.etapa = String(maximo);
          el.dataset.activo = String(ahora);
        }
        if (centrar && ahora !== actual) centrarCuadro(el, ahora);
        actual = ahora;
      },
      { rootMargin: `0px 0px -${100 - altura}% 0px` }
    );
    centinelas.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [modo, linea, lineaAncha, centrar]);

  return (
    <Etiqueta ref={ref} {...resto}>
      {children}
    </Etiqueta>
  );
}

// Centra el cuadro encendido si la tira es más ancha que la pantalla.
function centrarCuadro(el, n) {
  const tira = el.querySelector("[data-tira]");
  const cuadro = el.querySelector(`[data-cuadro="${n}"]`);
  if (!tira || !cuadro || tira.scrollWidth <= tira.clientWidth) return;
  const caja = tira.getBoundingClientRect();
  const c = cuadro.getBoundingClientRect();
  tira.scrollTo({
    left: tira.scrollLeft + c.left - caja.left - (caja.width - c.width) / 2,
    behavior: "smooth",
  });
}
