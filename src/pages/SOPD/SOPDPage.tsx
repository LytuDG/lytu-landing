import SOPDHeroSection from "./components/SOPDHeroSection";
import SOPDAlgorithmSection from "./components/SOPDAlgorithmSection";
import SOPDNavigationSection from "./components/SOPDNavigationSection";
import SOPDETASection from "./components/SOPDETASection";
import SOPDPricingSection from "./components/SOPDPricingSection";
import ContactSection from "../../pages/Home/components/ContactSection";

export default function SOPDPage() {
  return (
    <main>
      <SOPDHeroSection />
      <SOPDAlgorithmSection />
      <SOPDNavigationSection />
      <SOPDETASection />
      <SOPDPricingSection />
      <ContactSection />
    </main>
  );
}
