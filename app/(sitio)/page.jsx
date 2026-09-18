import React from "react";

import Hero from "@/app/components/home/Hero";
import Problema from "@/app/components/home/Problema";
import { Caso } from "@/app/components/Caso";
import { Cinta } from "@/app/components/ui/Cinta";
import DosCaminos from "@/app/components/home/DosCaminos";
import PlanesContinuidad from "@/app/components/home/PlanesContinuidad";
import Us from "@/app/components/home/Us";
import { Cierre } from "@/app/components/ui/Cierre";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Problema />
      <Caso />
      <Cinta texto="STRING" variante="solida" decorativo />
      <DosCaminos />
      <PlanesContinuidad />
      <Us />
      <Cierre
        ctaTexto="Solicitar diagnóstico"
        ctaHref="/cotizacion"
        nota="Respuesta en 24 h · Sin compromiso"
      />
    </div>
  );
};

export default Home;
