import React from "react";
import Hero from "./Home/Hero";
import Content from "./Home/Content";
import Proyects from "./Home/Proyects";
import Services from "./Home/Services";
import Contact from "./Home/Contact";
import Us from "./Home/Us";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Content />
      <Proyects />
      <Services />
      <Contact />
      <Us />
    </div>
  );
};

export default Home;
