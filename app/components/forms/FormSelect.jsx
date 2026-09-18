"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { FiAlertCircle } from "react-icons/fi";
import { PROJECT_TYPES } from "../../lib/constants/project-types";

export const FormSelect = ({ register, error, name, label, required }) => {
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
      <label className="block font-mono uppercase text-etiqueta text-tinta-tenue">
        {label} {required && <span className="text-acido">*</span>}
      </label>

      <select
        {...register(name)}
        id={name}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`
          w-full px-4 py-3 bg-fondo-elevado border-2 rounded text-tinta text-sm
          transition-colors duration-200 appearance-none cursor-pointer
          focus:outline-none focus:border-acido
          ${error ? "border-tinta" : "border-linea hover:border-tinta-tenue"}
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2350ff05' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.75rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.25em 1.25em",
        }}
      >
        <option value="" className="bg-black text-white/50">
          Selecciona un nivel
        </option>
        {PROJECT_TYPES.map((type) => (
          <option key={type.id} value={type.id} className="bg-black text-white">
            {type.label}
          </option>
        ))}
      </select>

      {error && (
        <p
          ref={errorRef}
          id={errorId}
          className="text-xs text-tinta flex items-center gap-1.5 font-mono"
        >
          <FiAlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};
