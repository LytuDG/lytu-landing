import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import AIServicesSection from "./components/AIServicesSection";
import PhilosophySection from "./components/PhilosophySection";
import ReadySolutionsSection from "./components/ReadySolutionsSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <AIServicesSection />
      <PhilosophySection />
      <ReadySolutionsSection />
      <PortfolioSection />
      <ContactSection />
    </main>
  );
}
