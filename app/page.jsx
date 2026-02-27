import React from "react";

// ✅ Usa rutas absolutas con @
import Hero from "@/app/home/Hero";
import Content from "@/app/home/Content";
import Proyects from "@/app/home/Proyects";
import Services from "@/app/home/Services";
import Us from "@/app/home/Us";
import Steps from "@/app/home/Steps";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Content />
      <Proyects />
      <Services />
      <Steps />
      <Us />
    </div>
  );
};

export default Home;