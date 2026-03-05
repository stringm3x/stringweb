"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { PROJECT_TYPES } from "../../lib/constants/project-types";

export const FormSelect = ({ register, error, name, label, required }) => {
  const selectRef = useRef(null);
  const errorRef = useRef(null);

  useEffect(() => {
    if (error && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 }
      );
    }
  }, [error]);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-black mb-2">
        {label} {required && <span className="text-red">*</span>}
      </label>

      <select
        {...register(name)}
        ref={(e) => {
          register(name).ref(e);
          selectRef.current = e;
        }}
        className={`
          w-full px-4 py-3 rounded-lg border bg-black
          transition-all duration-200 appearance-none
          focus:outline-none focus:ring-2 focus:ring-green
          ${
            error
              ? "border-red bg-red"
              : "border-gray hover:border-gray"
          }
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.5rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
        }}
      >
        <option value="">Selecciona un tipo de proyecto</option>
        {PROJECT_TYPES.map((type) => (
          <option key={type.id} value={type.id}>
            {type.description} 
          </option>
        ))}
      </select>

      {error && (
        <p ref={errorRef} className="mt-2 text-sm text-red">
          {error}
        </p>
      )}

      {/* Tooltip con features */}
      {!error && (
        <p className="mt-2 text-xs text">
          {
            PROJECT_TYPES.find((t) => t.id === selectRef.current?.value)
              ?.description
          }
        </p>
      )}
    </div>
  );
};
