// Las estrellas del inicio: puntos diminutos que brillan despacio y
// desfasados. Viven en los bordes del cielo, lejos del bloque de texto.
// Las posiciones salen de una semilla fija para que el servidor y el
// navegador pinten lo mismo.
function estrellas(cuantas) {
  let semilla = 7;
  const azar = () => {
    semilla = (semilla * 16807) % 2147483647;
    return (semilla - 1) / 2147483646;
  };
  const lista = [];
  while (lista.length < cuantas) {
    const x = azar() * 100;
    const y = azar() * 100;
    // Fuera del rectángulo central donde van la etiqueta, el titular y los botones.
    if (x > 14 && x < 86 && y > 12) continue;
    lista.push({
      x: x.toFixed(2),
      y: y.toFixed(2),
      r: (0.6 + azar() * 0.9).toFixed(2),
      dur: (4 + azar() * 3).toFixed(1),
      delay: (azar() * 5).toFixed(1),
    });
  }
  return lista;
}

const ESTRELLAS = estrellas(34);

export function Estrellas({ className = "" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`.trim()}>
      {ESTRELLAS.map((e, i) => (
        <span
          key={i}
          className="estrella"
          style={{
            left: `${e.x}%`,
            top: `${e.y}%`,
            width: `${e.r * 2}px`,
            height: `${e.r * 2}px`,
            animationDuration: `${e.dur}s`,
            animationDelay: `${e.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
