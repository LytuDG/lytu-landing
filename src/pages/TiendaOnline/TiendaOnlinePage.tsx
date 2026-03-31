import TiendaOnlineHero from "./components/TiendaOnlineHero";
import ProblemSection from "../Home/components/ProblemSection";
import SolutionSection from "../Home/components/SolutionSection";
import PricingSection from "../Home/components/PricingSection";
import ModulesSection from "../Home/components/ModulesSection";
import ContactSection from "../Home/components/ContactSection";

export default function TiendaOnlinePage() {
  return (
    <main>
      <TiendaOnlineHero />
      <ProblemSection />
      <SolutionSection />
      <PricingSection />
      <ModulesSection />
      <ContactSection />
    </main>
  );
}
