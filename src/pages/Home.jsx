import React from "react";
import HeroSection from "../components/sections/HeroSection.jsx";
import ShopSection from "../components/sections/ShopSection.jsx";
import AboutSection from "../components/sections/AboutSection.jsx";
import Navbar from "../components/Navbar.jsx";
import ContactSection from "../components/sections/ContactSection.jsx";

const Home = () => {
  return (
    <>
      <HeroSection
        collectionHandle="RIPPED REALITY"
        taglines={[
          "BUILT FOR THE UNNECESSARY",
          "WE DON'T FIT THE ALGORITHM",
          "WE SELL FRICTION, NOT FASHION",
          "MADE FOR THE MISFITS",
          "UNNECESSARY BY DESIGN",
          "FRICTION OVER FUNCTION",
          "BUILT FOR DISRUPTION",
          "WE ARE THE GLITCH",
          "ALGORITHM BREAKERS",
          "CHAOS CREATORS",
        ]}
      />

      <ShopSection collectionHandle="RIPPED REALITY" dropStatus="Coming Soon" />
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default Home;
