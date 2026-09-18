export function Tablero({ className = "" }) {
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
        <rect x="100" y="52" width="112" height="96" />
        <path d="M 118 128 v -26" />
        <path d="M 146 128 v -44" />
        <path d="M 174 128 v -16" />
        <path d="M 194 128 v -34" />
        <path d="M 100 76 h 112" />
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
