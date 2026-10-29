// El titular que el cursor escribe letra por letra (sala 1, literatura).
// Todas las letras están en el DOM desde el inicio: el buscador y el lector
// de pantalla leen la frase completa y el layout no se mueve. Cada letra
// aparece con su retraso; el cursor la acompaña y al final se queda
// parpadeando a 1.1 s. Con menos movimiento, la frase sale completa
// (globals.css, .tecla).
const PASO_MS = 45;
const INICIO_MS = 300;

export function TitularTecleado({ texto, className = "" }) {
  const palabras = texto.split(" ");
  const ultima = texto.replace(/ /g, "").length - 1;
  let indice = 0;
  let letra = 0;

  return (
    <h1 aria-label={texto} className={className}>
      {palabras.map((palabra, p) => {
        const contenido = (
          <span key={p} className="inline-block whitespace-nowrap">
            {[...palabra].map((c) => {
              const delay = INICIO_MS + indice * PASO_MS;
              const fin = letra === ultima;
              indice += 1;
              letra += 1;
              return (
                <span
                  key={indice}
                  aria-hidden="true"
                  className={fin ? "tecla tecla-fin" : "tecla"}
                  style={{ "--tecla-delay": `${delay}ms` }}
                >
                  {c}
                </span>
              );
            })}
          </span>
        );
        // El espacio también cuenta como una pulsación.
        indice += 1;
        return p < palabras.length - 1 ? [contenido, " "] : contenido;
      })}
    </h1>
  );
}
