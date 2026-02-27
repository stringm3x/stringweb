import React from "react";
import Hero from "./home/Hero";
import Content from "./home/Content";
import Proyects from "./home/Proyects";
import Services from "./home/Services";
import Us from "./home/Us";
import Steps from "./home/Steps";

const page = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Content />
      <Proyects />
      <Services />
      <Steps/>
      <Us />
    </div>
  );
};

export default page;
