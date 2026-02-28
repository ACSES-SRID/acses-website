import React from "react";
import About from "../../components/about/About";
import WelcomeMessage from "../../components/welcome/WelcomeMessage";
import Patrons from "../../components/patrons/Patrons";
import Programs from "../../components/programs/Programs";
import Statistics from "../../components/statistics/Statistics";
import Contact from "../../components/contact/Contact";
import Events from "../../components/events/Events";
import News from "../../components/news/News";
import HeroSection01 from "../../components/hero-section/HeroSection01";

const Home = () => {
  return (
    <>
      <HeroSection01 />
      <WelcomeMessage />
      <About />
      <Programs />
      <Statistics />
      <Patrons />
      <Events />
      <News />
      <Contact />
    </>
  );
};

export default Home;
