"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { FiAlertCircle, FiChevronDown } from "react-icons/fi";
import { PROJECT_TYPES } from "../../lib/constants/project-types";

const OPCIONES_NIVEL = PROJECT_TYPES.map((t) => ({ value: t.id, label: t.label }));

export const FormSelect = ({
  register,
  error,
  name,
  label,
  required,
  opciones = OPCIONES_NIVEL,
  placeholder = "Selecciona un nivel",
}) => {
  const errorRef = useRef(null);
  const errorId = `${name}-error`;

  useEffect(() => {
    if (error && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [error]);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block font-mono uppercase text-etiqueta text-tinta-tenue"
      >
        {label} {required && <span className="text-acido">*</span>}
      </label>

      <div className="relative">
        <select
          {...register(name)}
          id={name}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full appearance-none cursor-pointer rounded border-2 bg-fondo px-4 py-3 pr-10 text-cuerpo-s text-tinta transition-colors duration-200 focus:border-acido focus:outline-none ${
            error ? "border-tinta" : "border-linea hover:border-tinta-tenue"
          }`}
        >
          {placeholder !== null && (
            <option value="" className="bg-fondo text-tinta-tenue">
              {placeholder}
            </option>
          )}
          {opciones.map((o) => (
            <option key={o.label} value={o.value} className="bg-fondo text-tinta">
              {o.label}
            </option>
          ))}
        </select>
        <FiChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-acido"
        />
      </div>

      {error && (
        <p
          ref={errorRef}
          id={errorId}
          className="flex items-center gap-1.5 font-mono text-cuerpo-s text-tinta"
        >
          <FiAlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};
