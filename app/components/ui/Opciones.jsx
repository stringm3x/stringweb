import { FiCheck } from "react-icons/fi";
import { MensajeError } from "./Campo";

// Opciones en píldora de docs/calidad.md § 3: un radio real por opción, con
// el foco en la píldora. Elegida: fondo de acento, texto negro y palomita.
// `registrar` es el register de react-hook-form.
const PILDORA =
  "group/opcion flex min-h-[44px] cursor-pointer items-center gap-2 rounded-pill border px-[18px] py-2 text-[15px] font-medium text-texto hover:border-texto has-[:checked]:border-acento has-[:checked]:bg-acento has-[:checked]:text-sobre-acento has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-[rgb(var(--foco))] has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-40";

export function Opciones({ nombre, legenda, opciones, registrar, error, disabled = false }) {
  const errorId = `${nombre}-error`;
  return (
    <fieldset
      className="flex flex-col gap-space-3"
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
      disabled={disabled}
    >
      <legend className="mb-space-3 text-[14px] font-medium text-texto">{legenda}</legend>
      <div className="flex flex-wrap gap-space-2">
        {opciones.map((opcion) => (
          <label key={opcion} className={`${PILDORA} ${error ? "border-alerta" : "border-borde-suave"}`}>
            <input type="radio" value={opcion} {...registrar(nombre)} className="sr-only" />
            <FiCheck aria-hidden="true" className="hidden h-4 w-4 flex-shrink-0 group-has-[:checked]/opcion:block" />
            {opcion}
          </label>
        ))}
      </div>
      <MensajeError id={errorId}>{error}</MensajeError>
    </fieldset>
  );
}
