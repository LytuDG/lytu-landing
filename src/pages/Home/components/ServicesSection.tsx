import { Globe, Smartphone, Cpu } from "lucide-react";
import ServiceCard from "../../../components/ui/ServiceCard";

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-24 relative bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ingeniería Digital Integral
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Desde la idea conceptual hasta el despliegue final. Cubrimos todo el
            ciclo de vida del desarrollo de software moderno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Globe className="text-cyan-400" size={40} />}
            title="Desarrollo Web"
            desc="Sitios web y aplicaciones web progresivas (PWA) ultrarrápidas, escalables y optimizadas para SEO. Usamos tecnologías modernas como React, Next.js y Node."
          />
          <ServiceCard
            icon={<Smartphone className="text-violet-400" size={40} />}
            title="Apps Móviles"
            desc="Desarrollo nativo e híbrido para iOS y Android. Creamos experiencias fluidas que tus usuarios amarán llevar en su bolsillo."
          />
          <ServiceCard
            icon={<Cpu className="text-pink-400" size={40} />}
            title="Software a Medida"
            desc="Sistemas de gestión, dashboards analíticos y herramientas internas diseñadas específicamente para resolver los problemas únicos de tu empresa."
          />
        </div>
      </div>
    </section>
  );
}
