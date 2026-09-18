import React from "react";

import Hero from "@/app/components/home/Hero";
import Content from "@/app/components/home/Content";
import Proyects from "@/app/components/home/Proyects";
import Services from "@/app/components/home/Services";
import SaasSection from "@/app/components/home/SaasSection";
import Us from "@/app/components/home/Us";
import Steps from "@/app/components/home/Steps";
import { Cinta } from "@/app/components/ui/Cinta";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Content />
      <Proyects />
      <Services />
      <Cinta texto="STRING" variante="solida" decorativo />
      <SaasSection />
      <Steps />
      <Us />
    </div>
  );
};

export default Home;