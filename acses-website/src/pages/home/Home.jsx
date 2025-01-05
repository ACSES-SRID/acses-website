import React from "react";
import NavBar from "../../components/navbar/NavBar";
import HeroSection from "../../components/hero-section/HeroSection";
import About from "../../components/about/About";
import WelcomeMessage from "../../components/welcome/WelcomeMessage";
import Patrons from "../../components/patrons/Patrons";
import Programs from "../../components/programs/Programs";
import Statistics from "../../components/statistics/Statistics";
import Footer from "../../components/footer/Footer";
import Contact from "../../components/contact/Contact";
import Events from "../../components/events/Events";
import News from "../../components/news/News";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <HeroSection />
        <WelcomeMessage />
        <Patrons />
        <About />
        <Programs />
        <Statistics />
        <Events />
        <News />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
