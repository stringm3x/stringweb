"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

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
    w-full px-4 py-3 bg-white/5 border text-white text-sm
    placeholder:text-white/20 transition-colors duration-200
    focus:outline-none focus:border-green
    ${error ? "border-red-500/60" : "border-white/10 hover:border-white/20"}
  `;

  const { ref: registerRef, ...registerProps } = register(name);

  return (
    <div ref={fieldRef} className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-xs font-mono text-gray uppercase tracking-widest"
      >
        {label} {required && <span className="text-green">*</span>}
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
          className={baseClass}
        />
      )}

      {error && (
        <p
          ref={errorRef}
          className="text-xs text-red-400 flex items-center gap-1.5 font-mono"
        >
          <span>↳</span>
          {error}
        </p>
      )}
    </div>
  );
};
