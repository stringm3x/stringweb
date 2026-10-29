import React from "react";

import { Sala1Inicio } from "@/app/components/salas/Sala1Inicio";
import { Sala2Problema } from "@/app/components/salas/Sala2Problema";
import { Sala3Caso } from "@/app/components/salas/Sala3Caso";
import { Cinta } from "@/app/components/ui/Cinta";
import DosCaminos from "@/app/components/home/DosCaminos";
import PlanesContinuidad from "@/app/components/home/PlanesContinuidad";
import Us from "@/app/components/home/Us";
import { Cierre } from "@/app/components/ui/Cierre";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Sala1Inicio />
      <Sala2Problema />
      <Sala3Caso />
      <Cinta texto="STRING" variante="solida" decorativo />
      <DosCaminos />
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
