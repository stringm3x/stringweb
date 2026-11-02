// El logotipo positivo de Boaz (public/marca, de string-gym-saas). Su
// mínimo de marca es 96 px de ancho: aquí nunca baja de 113.
export function Logotipo({ alt = "Boaz", className = "" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/marca/boaz-logotipo-positivo.svg"
      width={378}
      height={100}
      alt={alt}
      className={`block h-auto ${className}`.trim()}
    />
  );
}
