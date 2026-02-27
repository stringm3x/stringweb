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
}) => {
  const fieldRef = useRef(null);
  const errorRef = useRef(null);
  const inputRef = useRef(null);

  // Animación de error
  useEffect(() => {
    if (error && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.to(inputRef.current, {
        x: [-5, 5, -3, 3, 0],
        duration: 0.4,
        ease: "power2.inOut",
        borderColor: "#ef4444",
      });
    }
  }, [error]);

  // Animación de focus
  const handleFocus = () => {
    gsap.to(inputRef.current, {
      scale: 1.02,
      borderColor: "#50ff05",
      boxShadow: "0 4px 6px -1px rgba(57, 255, 20, 1)",
      duration: 0.2,
    });
  };

  const handleBlur = () => {
    gsap.to(inputRef.current, {
      scale: 1,
      borderColor: error ? "#ef4444" : "#d1d5db",
      boxShadow: "none",
      duration: 0.2,
    });
  };

  return (
    <div className="mb-6" ref={fieldRef}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-black mb-2"
      >
        {label} {required && <span className="text-red">*</span>}
      </label>

      <input
        id={name}
        type={type}
        {...register(name)}
        ref={(e) => {
          register(name).ref(e);
          inputRef.current = e;
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`
          bg-bg w-full px-4 py-3 rounded-lg border
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-green
          ${
            error
              ? "border-red bg-red"
              : "border-gray hover:border-gray"
          }
        `}
      />

      {error && (
        <p
          ref={errorRef}
          className="mt-2 text-sm text-red flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};
