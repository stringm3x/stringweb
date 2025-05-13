import React from "react";
import Hero from "./Websites/Hero";
import Intro from "./Websites/Intro";
import Responsive from "./Websites/Responsive";
import UI from "./Websites/UI";
import Animations from "./Websites/Animations";
import Photos from "./Websites/Photos";
import Hosting from "./Websites/Hosting";
import Develop from "./Websites/Develop";
import Browser from "./Websites/Browser";
import Proyects from "./Websites/Proyects";
import Prices from "./Websites/Prices";
import Contact from "./Websites/Contact";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Intro />
      <Responsive />
      <UI />
      <Animations />
      <Photos />
      <Hosting />
      <Develop />
      <Browser />
      <Proyects />
      <Prices />
      <Contact />
    </div>
  );
};

export default Home;
