export function Telefono({ className = "" }) {
  return (
    <svg
      viewBox="0 0 312 200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <rect width="312" height="200" className="fill-acido" />
      <g
        fill="none"
        className="stroke-tinta-papel"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="118" y="44" width="76" height="118" rx="8" />
        <path d="M 134 76 h 44" />
        <path d="M 134 94 h 32" />
        <path d="M 134 120 h 44 v 24 l -18 -12 h -26 z" />
      </g>
      <text
        x="286"
        y="182"
        fontFamily="var(--font-anton-sans)"
        fontSize="22"
        className="fill-tinta-papel"
      >
        S
      </text>
    </svg>
  );
}
