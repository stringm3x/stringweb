export function Libreta({ className = "" }) {
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
        <path d="M 108 48 h 96 v 104 h -96 z" />
        <path d="M 126 74 h 60" />
        <path d="M 126 96 h 60" />
        <path d="M 126 118 h 34" />
        <path d="M 178 132 l 14 14 l 26 -30" />
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
