"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

// Las cuerdas de la sala 4 (docs/sistema/components/Cuerda). Vibran al
// pasar el cursor, con clic o con Enter/espacio; con menos movimiento no
// vibran. El sonido empieza apagado: el AudioContext se crea solo cuando
// el visitante pulsa "Sonido", así nada suena antes de ese clic.
const VOLUMEN = 0.22;
const ANCHO = 1000;
const MEDIO = 32;
const AMPLITUD = 28;
const OSCILACIONES = 9;

const Sonido = createContext(null);

// Karplus-Strong: ruido que se va suavizando en un bucle del largo de la nota.
function cuerdaPulsada(ctx, freq) {
  const sr = ctx.sampleRate;
  const largo = Math.floor(sr * 1.8);
  const n = Math.round(sr / freq);
  const buffer = ctx.createBuffer(1, largo, sr);
  const d = buffer.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  for (let j = n; j < largo; j++) d[j] = 0.996 * 0.5 * (d[j - n] + d[j - n + 1]);
  return buffer;
}

export function SonidoProvider({ children }) {
  const [encendido, setEncendido] = useState(false);
  const ctxRef = useRef(null);
  const buffers = useRef(new Map());

  const tocarNotas = useCallback(
    (notas) => {
      const ctx = ctxRef.current;
      if (!encendido || !ctx) return;
      if (ctx.state === "suspended") ctx.resume();
      // Un acorde reparte el volumen para que no suene más fuerte que una nota.
      const volumen = notas.length > 1 ? VOLUMEN / 2 : VOLUMEN;
      notas.forEach((freq) => {
        if (!buffers.current.has(freq)) buffers.current.set(freq, cuerdaPulsada(ctx, freq));
        const fuente = ctx.createBufferSource();
        fuente.buffer = buffers.current.get(freq);
        const ganancia = ctx.createGain();
        ganancia.gain.value = volumen;
        fuente.connect(ganancia);
        ganancia.connect(ctx.destination);
        fuente.start();
      });
    },
    [encendido]
  );

  const alternar = useCallback(() => {
    if (encendido) {
      setEncendido(false);
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ctxRef.current) ctxRef.current = new AC();
    setEncendido(true);
  }, [encendido]);

  return (
    <Sonido.Provider value={{ encendido, alternar, tocarNotas }}>{children}</Sonido.Provider>
  );
}

// El botón "Sonido": apagado al cargar; el punto se enciende con el sonido.
export function BotonSonido() {
  const { encendido, alternar } = useContext(Sonido);
  return (
    <button
      type="button"
      onClick={alternar}
      aria-pressed={encendido}
      className="inline-flex min-h-[44px] items-center gap-space-2 rounded-pill border border-hairline px-[18px] font-mono text-etiqueta uppercase text-texto transition-colors duration-200 hover:border-texto"
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-pill ${encendido ? "bg-acento" : "border border-texto-suave"}`}
      />
      Sonido
    </button>
  );
}

// Una cuerda: línea a lo ancho que vibra como seno y se apaga en ~2 s.
export function Cuerda({ nombre, notas, calibre }) {
  const { tocarNotas } = useContext(Sonido);
  const lineaRef = useRef(null);
  const marco = useRef(0);
  const inicio = useRef(0);
  const ultimo = useRef(-Infinity);

  const dibujar = (amp) => {
    let d = `M0 ${MEDIO}`;
    for (let x = 8; x <= ANCHO; x += 8) {
      d += ` L${x} ${(MEDIO + amp * Math.sin((Math.PI * x) / ANCHO)).toFixed(1)}`;
    }
    lineaRef.current?.setAttribute("d", d);
  };

  useEffect(() => () => cancelAnimationFrame(marco.current), []);

  const tocar = () => {
    // Pasar el cursor y hacer clic llegan casi juntos: cuentan como un toque.
    const ahora = performance.now();
    if (ahora - ultimo.current < 150) return;
    ultimo.current = ahora;
    tocarNotas(notas);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    inicio.current = performance.now();
    cancelAnimationFrame(marco.current);
    const cuadro = (ahora) => {
      const t = ahora - inicio.current;
      const envolvente = Math.exp(-t / 450);
      if (envolvente < 0.01) {
        dibujar(0);
        return;
      }
      dibujar(AMPLITUD * envolvente * Math.cos((t / 1000) * Math.PI * 2 * OSCILACIONES));
      marco.current = requestAnimationFrame(cuadro);
    };
    marco.current = requestAnimationFrame(cuadro);
  };

  return (
    <button
      type="button"
      onMouseEnter={tocar}
      onClick={tocar}
      aria-label={`Tocar la cuerda de ${nombre}`}
      className="block w-full cursor-pointer"
    >
      <svg
        viewBox={`0 0 ${ANCHO} ${MEDIO * 2}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        className="block h-16 w-full overflow-visible"
      >
        <path
          ref={lineaRef}
          d={`M0 ${MEDIO} L${ANCHO} ${MEDIO}`}
          fill="none"
          stroke="rgb(var(--texto))"
          strokeWidth={calibre}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </button>
  );
}
