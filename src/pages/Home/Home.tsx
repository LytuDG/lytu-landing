import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import PhilosophySection from "./components/PhilosophySection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <PhilosophySection />
      <PortfolioSection />
      <ContactSection />
    </main>
  );
}
