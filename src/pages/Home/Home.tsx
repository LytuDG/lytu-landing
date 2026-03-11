import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import PricingSection from "./components/PricingSection";
import ModulesSection from "./components/ModulesSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <PricingSection />
      <ModulesSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
