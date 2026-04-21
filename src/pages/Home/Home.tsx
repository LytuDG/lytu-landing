import HeroSection from "./components/HeroSection";
import JourneyPedidoSection from "./components/JourneyPedidoSection";
import TiendaOnlineSection from "./components/TiendaOnlineSection";
import SOPDTeaserSection from "./components/SOPDTeaserSection";
import TrackingTeaserSection from "./components/TrackingTeaserSection";
import SistemasNavigationSection from "./components/SistemasNavigationSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <JourneyPedidoSection />
      <TiendaOnlineSection />
      <SOPDTeaserSection />
      <TrackingTeaserSection />
      <SistemasNavigationSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
