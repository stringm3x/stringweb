export function Reloj({ className = "" }) {
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
        <circle cx="156" cy="100" r="52" />
        <path d="M 156 68 v 34 l 24 16" />
        <path d="M 214 66 l 16 10 l -16 10" />
        <path d="M 196 58 c 20 -10 34 4 34 18" />
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
