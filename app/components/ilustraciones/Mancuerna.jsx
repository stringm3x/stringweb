export function Mancuerna({ className = "" }) {
  return (
    <svg
      viewBox="0 0 520 380"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <rect width="520" height="380" className="fill-papel" />
      <g data-brochada>
        <path
          d="M 40 300 C 140 286 250 280 360 288 C 420 292 470 300 500 308 L 500 330 C 460 320 410 312 358 308 C 248 300 140 306 40 320 Z"
          className="fill-acido"
        />
      </g>
      <g
        fill="none"
        className="stroke-tinta-papel"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 150 190 h 220" strokeWidth="12" />
        <g strokeWidth="10">
          <rect x="106" y="158" width="38" height="64" rx="6" />
          <rect x="376" y="158" width="38" height="64" rx="6" />
          <rect x="74" y="172" width="28" height="36" rx="6" />
          <rect x="418" y="172" width="28" height="36" rx="6" />
        </g>
      </g>
      <text
        x="488"
        y="358"
        fontFamily="var(--font-anton-sans)"
        fontSize="26"
        className="fill-tinta-papel"
      >
        S
      </text>
    </svg>
  );
}
