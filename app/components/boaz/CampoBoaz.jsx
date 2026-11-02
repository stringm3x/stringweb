import { FiAlertCircle } from "react-icons/fi";

// Campo de Boaz (lote 9b, G): etiqueta visible en Geist 600 14 px, caja de
// 48 px en papel claro con contorno #7D7A72 (4.1:1) y radio 8. Estados de
// docs/calidad.md § 3: reposo, hover (borde tinta), foco (borde y contorno
// de 2 px #1F5FD6), error (borde y mensaje en alerta, con aria-describedby)
// y deshabilitado (40 %). Los colores cambian de golpe.
const CAJA =
  "h-12 w-full rounded-[8px] border bg-superficie px-3 text-[16px] text-texto placeholder:text-placeholder hover:border-texto focus:border-acento disabled:cursor-not-allowed disabled:opacity-40";

export function CampoBoaz({ id, etiqueta, opcional, error, ayuda, mono, opciones, register, ...resto }) {
  const idError = error ? `${id}-error` : undefined;
  const idAyuda = ayuda ? `${id}-ayuda` : undefined;
  const describe = [idAyuda, idError].filter(Boolean).join(" ") || undefined;
  const cls = `${CAJA} ${error ? "border-alerta" : "border-campo"} ${mono ? "font-boaz-mono" : ""}`;
  const comun = { id, "aria-invalid": error ? true : undefined, "aria-describedby": describe, ...register, ...resto };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[14px] font-semibold text-texto">
        {etiqueta}
        {opcional && <span className="font-normal text-texto-suave"> {opcional}</span>}
      </label>
      {opciones ? (
        <div className="relative">
          <select {...comun} className={`${cls} appearance-none pr-9`}>
            {opciones.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-5 text-texto"
          >
            <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      ) : (
        <input {...comun} className={cls} />
      )}
      {ayuda && (
        <p id={idAyuda} className="text-[13px] text-texto-suave">
          {ayuda}
        </p>
      )}
      {error && (
        <p id={idError} className="flex items-start gap-1.5 text-[13px] text-alerta">
          <FiAlertCircle aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
