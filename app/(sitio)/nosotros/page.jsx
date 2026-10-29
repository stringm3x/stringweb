import Image from "next/image";
import { Cierre } from "@/app/components/salas/Cierre";
import { CUERPO, ETIQUETA } from "@/app/components/salas/estilos";

// /nosotros (docs/textos.md): la historia completa de STRING. Carlos se
// presenta en la sala 3 de la portada; aquí va el relato entero y, al
// cierre, Salmos 73:25–26 (Reina-Valera 1909, dominio público). Después,
// el mismo bloque de Cierre que la portada.
export default function NosotrosPage() {
  return (
    <>
      <div data-theme="noche" className="bg-fondo px-4 pb-space-8 pt-32 text-texto sm:px-6 lg:px-24 lg:pt-40">
        <article className="mx-auto flex max-w-[760px] flex-col gap-space-5">
          <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-lg">
            {/* TODO(dato): foto de respaldo hasta que Carlos mande la final. */}
            <Image
              src="/foto/carlos-respaldo.jpg"
              alt="Carlos Avilés, fundador de STRING."
              fill
              priority
              sizes="320px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-space-4">
            <p className={ETIQUETA}>NOSOTROS</p>
            <h1 className="text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[56px] lg:text-titulo">
              La historia de STRING.
            </h1>
          </div>

          <div className={`flex flex-col gap-space-4 ${CUERPO}`}>
            <p>
              STRING empezó haciendo sistemas para negocios. Luego construí uno para Evolution GYM,
              el gimnasio de mi familia. Lo usamos en el mostrador todos los días, lo corregimos con
              socios de verdad, y se volvió un producto.
            </p>
            <p>
              Hoy STRING hace dos cosas: sistemas a la medida para negocios con local y empresas, y
              productos propios para un giro, como el sistema para gimnasios. Lo que aprendemos en
              uno mejora al otro.
            </p>
            <p>
              Trabajo con un equipo de desarrolladores de confianza cuando un proyecto lo pide. El
              trato es siempre conmigo, y la calidad también.
            </p>
          </div>

          <figure className="mt-space-5 flex flex-col gap-space-3 border-t border-hairline pt-space-5">
            <blockquote className="font-mono text-cifra leading-[1.6] text-texto">
              <p>
                ¿A quién tengo yo en los cielos? Y fuera de ti nada deseo en la tierra. Mi carne y mi
                corazón desfallecen: mas la roca de mi corazón y mi porción es Dios para siempre.
              </p>
            </blockquote>
            <figcaption className={ETIQUETA}>
              <cite className="not-italic">SALMOS 73:25–26</cite>
            </figcaption>
          </figure>
        </article>
      </div>
      <Cierre />
    </>
  );
}
