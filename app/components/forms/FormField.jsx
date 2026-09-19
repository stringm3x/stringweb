"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { FiAlertCircle } from "react-icons/fi";

export const FormField = ({
  label,
  name,
  type = "text",
  register,
  error,
  placeholder,
  required = false,
  rows = 4,
}) => {
  const fieldRef = useRef(null);
  const errorRef = useRef(null);
  const inputRef = useRef(null);
  const errorId = `${name}-error`;

  // Animación de error
  useEffect(() => {
    if (error && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [error]);

  const handleFocus = () => {
    gsap.to(inputRef.current, {
      scale: 1.01,
      duration: 0.15,
      ease: "power2.out",
    });
  };

  const handleBlur = () => {
    gsap.to(inputRef.current, {
      scale: 1,
      duration: 0.15,
      ease: "power2.out",
    });
  };

  const baseClass = `
    w-full px-4 py-3 bg-fondo border-2 rounded text-tinta text-cuerpo-s
    placeholder:text-tinta-tenue transition-colors duration-200
    focus:outline-none focus:border-acido
    ${error ? "border-tinta" : "border-linea hover:border-tinta-tenue"}
  `;

  const { ref: registerRef, ...registerProps } = register(name);

  return (
    <div ref={fieldRef} className="group space-y-1.5">
      <label
        htmlFor={name}
        className="block font-mono uppercase text-etiqueta text-tinta-tenue"
      >
        {label} {required && <span className="text-acido">*</span>}
        {/* La raya de Etiqueta linea: crece cuando el campo tiene el foco */}
        <span
          aria-hidden="true"
          className="ml-2 inline-block h-[3px] w-0 align-middle bg-acido transition-[width] duration-300 group-focus-within:w-6"
        />
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          {...registerProps}
          ref={(e) => {
            registerRef(e);
            inputRef.current = e;
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          id={name}
          type={type}
          {...registerProps}
          ref={(e) => {
            registerRef(e);
            inputRef.current = e;
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={baseClass}
        />
      )}

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
