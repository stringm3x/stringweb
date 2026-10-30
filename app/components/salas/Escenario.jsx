"use client";

import { useEffect, useRef } from "react";

// El escenario de una sala con movimiento (docs/movimiento-salas.md). No
// anima nada: solo marca atributos que app/salas.css lee. Un solo
// IntersectionObserver por sala; nada escucha el scroll en cada fotograma.
//
// - "una-vez" (música, galería): data-mov="espera" al montar y "hecho" al
//   entrar en pantalla. No se repite. En celular, cada pieza en su turno:
//   con `cuerdas` (música, < 1024 px) cada <li> hijo se marca data-afinada al
//   entrar en pantalla y el último (Empresa) marca todas más data-empresa;
//   con `cuadros` (galería, cuando la tira [data-tira] se desliza) cada
//   [data-cuadro] que entra en la tira, con la sala en pantalla, se suma a
//   data-luz ("1 3").
// - "etapas" (escultura, cine, arquitectura): lo que sigue al dedo usa
//   animation-timeline en CSS. Donde el navegador no la tiene, este modo pone
//   data-etapa = cuántos [data-centinela] ya cruzaron la línea (solo avanza,
//   así nunca queda a medias) y data-activo = el paso de ahora. Con `activo`,
//   data-activo se marca siempre: para cambios secos (cuadros del cine, paso
//   resaltado), que no necesitan línea de tiempo y regresan si se sube.
// - "visible" (danza): data-visible mientras la sala está en pantalla.
//
// Con menos movimiento no marca nada: sin atributos, cada sala queda en su
// estado final. Igual sin JavaScript.
//
// `linea` es la altura de la pantalla (en %) donde se cruza una etapa;
// `lineaAncha`, la de pantallas de 1024 px o más. `centrar` hace que la tira
// [data-tira] centre el [data-cuadro] de la etapa actual (cine en celular).

// Cuánto se extiende la raíz por arriba de la pantalla.
const ARRIBA = 100000;

export function Escenario({
  modo,
  linea = 50,
  lineaAncha = linea,
  activo = false,
  centrar = false,
  cuerdas = false,
  cuadros = false,
  as: Etiqueta = "div",
  children,
  ...resto
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (modo === "una-vez") {
      if (cuerdas && !window.matchMedia("(min-width: 1024px)").matches) return porCuerda(el);
      const tira = cuadros && el.closest("[data-tira]");
      if (tira && tira.scrollWidth > tira.clientWidth) return porCuadro(el, tira);
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
    if (!respaldo && !activo && !centrar) return;

    const ancha = window.matchMedia("(min-width: 1024px)").matches;
    const altura = ancha ? lineaAncha : linea;
    const centinelas = [...el.querySelectorAll("[data-centinela]")];
    const cruzados = new Set();
    let maximo = 0;
    let actual = -1;

    if (respaldo) el.dataset.etapa = "0";
    if (respaldo || activo) el.dataset.activo = "0";

    // La raíz va de muy arriba de la pantalla hasta la línea: un centinela
    // dentro de ella ya cruzó. Así un salto (un enlace, volver arriba) también
    // avisa, porque siempre entra o sale de la raíz.
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) cruzados.add(e.target);
          else cruzados.delete(e.target);
        });
        const ahora = cruzados.size;
        maximo = Math.max(maximo, ahora);
        if (respaldo) el.dataset.etapa = String(maximo);
        if (respaldo || activo) el.dataset.activo = String(ahora);
        if (centrar && ahora !== actual) centrarCuadro(el, ahora);
        actual = ahora;
      },
      { rootMargin: `${ARRIBA}px 0px -${100 - altura}% 0px` }
    );
    centinelas.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [modo, linea, lineaAncha, activo, centrar, cuerdas, cuadros]);

  return (
    <Etiqueta ref={ref} {...resto}>
      {children}
    </Etiqueta>
  );
}

// Música en celular: cada cuerda se afina al entrar en pantalla; Empresa,
// la última, las afina todas.
function porCuerda(el) {
  el.dataset.mov = "por-cuerda";
  const cuerdas = [...el.children];
  const io = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.dataset.afinada = "";
        io.unobserve(e.target);
        if (e.target === cuerdas.at(-1)) {
          cuerdas.forEach((c) => (c.dataset.afinada = ""));
          el.dataset.empresa = "";
          io.disconnect();
        }
      });
    },
    { threshold: 0.6 }
  );
  cuerdas.forEach((c) => io.observe(c));
  return () => io.disconnect();
}

// Galería en celular: un cuadro se enciende cuando está en la tira y la sala
// en pantalla. La tira es la raíz del segundo observador, que no mira la
// pantalla; por eso el primero vigila la sala.
function porCuadro(el, tira) {
  el.dataset.mov = "por-cuadro";
  const cuadros = [...el.querySelectorAll("[data-cuadro]")];
  const enTira = new Set();
  const encendidos = new Set();
  let enPantalla = false;
  const encender = () => {
    if (!enPantalla) return;
    enTira.forEach((c) => encendidos.add(c.dataset.cuadro));
    el.dataset.luz = [...encendidos].sort().join(" ");
    if (encendidos.size === cuadros.length) {
      pantalla.disconnect();
      deslizar.disconnect();
    }
  };
  const pantalla = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      enPantalla = true;
      encender();
    },
    { threshold: 0.3 }
  );
  const deslizar = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => (e.isIntersecting ? enTira.add(e.target) : enTira.delete(e.target)));
      encender();
    },
    { root: tira, threshold: 0.6 }
  );
  pantalla.observe(el);
  cuadros.forEach((c) => deslizar.observe(c));
  return () => {
    pantalla.disconnect();
    deslizar.disconnect();
  };
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
