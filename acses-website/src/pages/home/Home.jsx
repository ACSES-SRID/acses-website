import React from "react";
import About from "../../components/home/about/About";
import WelcomeMessage from "../../components/home/welcome/WelcomeMessage";
import Patrons from "../../components/home/patrons/Patrons";
import Programs from "../../components/home/programs/Programs";
import Statistics from "../../components/home/statistics/Statistics";
import Contact from "../../components/home/contact/Contact";
import Events from "../../components/home/events/Events";
import News from "../../components/home/news/News";
import HeroSection01 from "../../components/home/hero-section/HeroSection01";

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
