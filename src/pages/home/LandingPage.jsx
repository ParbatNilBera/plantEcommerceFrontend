import React from "react";
import Navbar from "./landing/Navbar";
import HeroSection from "./landing/HeroSection";
import PlantsSection from "./landing/PlantsSection";
import AboutUsSection from "./landing/AboutUsSection";
import PlantFooter from "./landing/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <PlantsSection />
      <AboutUsSection />
      <PlantFooter />
    </div>
  );
};

export default LandingPage;
