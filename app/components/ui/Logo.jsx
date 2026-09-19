import Link from "next/link";

// Lockup de marca: símbolo (S negra sobre cuadro acido) + wordmark en Anton.
// Es tipográfico, no imagen: nítido a cualquier tamaño y alineado a la
// línea base del resto del header.
export function Logo({ className = "", onClick }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="STRING, inicio"
      className={`inline-flex items-center gap-3 ${className}`.trim()}
    >
      <span
        aria-hidden="true"
        className="grid h-9 w-9 flex-shrink-0 place-items-center bg-acido font-anton text-[22px] leading-none text-black"
      >
        S
      </span>
      <span className="font-anton text-[26px] uppercase leading-none tracking-[0.01em] text-tinta">
        STRING
      </span>
    </Link>
  );
}
