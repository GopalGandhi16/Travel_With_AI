import React from "react";
import Hero from "../../components/Hero";
import StatsSection from "../../components/home/StatsSection";
import AIFeaturesSection from "../../components/home/AIFeaturesSection";
import HowItWorks from "../../components/home/HowItWorks";
import AIChatPreview from "../../components/home/AIChatPreview";
import PopularDestinations from "../../components/home/PopularDestinations";
import TrendingPackages from "../../components/home/TrendingPackages";
import SampleItinerary from "../../components/home/SampleItinerary";
import Testimonials from "../../components/home/Testimonials";
import FAQ from "../../components/home/FAQ";
import FinalCTA from "../../components/home/FinalCTA";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <StatsSection />
      <AIFeaturesSection />
      <HowItWorks />
      <AIChatPreview />
      <PopularDestinations />
      <TrendingPackages />
      <SampleItinerary />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </div>
  );
};

export default Home;
