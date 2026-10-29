import { Sala1Inicio } from "@/app/components/salas/Sala1Inicio";
import { Sala2Problema } from "@/app/components/salas/Sala2Problema";
import { Sala3Caso } from "@/app/components/salas/Sala3Caso";
import { Sala4Niveles } from "@/app/components/salas/Sala4Niveles";
import PlanesContinuidad from "@/app/components/home/PlanesContinuidad";
import Us from "@/app/components/home/Us";
import { Cierre } from "@/app/components/ui/Cierre";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Sala1Inicio />
      <Sala2Problema />
      <Sala3Caso />
      <Sala4Niveles />
      <PlanesContinuidad />
      <Us />
      <Cierre
        ctaTexto="Solicitar diagnóstico"
        ctaHref="/diagnostico"
        nota="Respuesta en 24 h · Sin compromiso"
      />
    </div>
  );
};

export default Home;
