import React from "react";

// ✅ Usa rutas absolutas con @
import Hero from "@/app/components/forms/home/Hero";
import Content from "@/app/components/forms/home/Content";
import Proyects from "@/app/components/forms/home/Proyects";
import Services from "@/app/components/forms/home/Services";
import Us from "@/app/components/forms/home/Us";
import Steps from "@/app/components/forms/home/Steps";

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