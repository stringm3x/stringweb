import { FiAlertCircle } from "react-icons/fi";

// Casilla de Boaz (lote 23, G · Casilla): caja de 20 × 20 dentro de un área
// de 44 px, borde 1.5 px #7D7A72 (el mismo contorno de CampoBoaz) y radio 4.
// Marcada: relleno acento con palomita en sobre-acento. La etiqueta, a la
// derecha y también clicable. Estados de docs/calidad.md § 3 como CampoBoaz:
// hover (borde tinta), foco (contorno de 2 px acento), error (borde y mensaje
// en alerta, con aria-describedby). Es el checkbox nativo: espacio y
// lectores de pantalla funcionan solos.
export function CasillaBoaz({ id, etiqueta, error, register, ...resto }) {
  const idError = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-1">
        <span className="relative -ml-3 flex h-11 w-11 flex-shrink-0 items-center justify-center">
          <input
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={idError}
            className={`peer h-5 w-5 cursor-pointer appearance-none rounded-[4px] border-[1.5px] bg-superficie hover:border-texto checked:border-acento checked:bg-acento focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento ${
              error ? "border-alerta" : "border-campo"
            }`}
            {...register}
            {...resto}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="pointer-events-none absolute hidden h-5 w-5 text-sobre-acento peer-checked:block"
          >
            <path
              d="M5.5 10.5 8.5 13.5 14.5 6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <label htmlFor={id} className="flex min-h-11 cursor-pointer items-center py-2.5 text-[15px] text-texto">
          <span>{etiqueta}</span>
        </label>
      </div>
      {error && (
        <p id={idError} className="flex items-start gap-1.5 text-[13px] text-alerta">
          <FiAlertCircle aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
