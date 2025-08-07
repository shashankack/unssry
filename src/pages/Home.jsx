import HeroSection from "../components/sections/HeroSection.jsx";
import ShopSection from "../components/sections/ShopSection.jsx";
import AboutSection from "../components/sections/AboutSection.jsx";

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
    </>
  );
};

export default Home;
