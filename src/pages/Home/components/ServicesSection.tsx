import { Globe, Smartphone, Cpu, Palette } from "lucide-react";
import { useTranslation } from "react-i18next";
import ServiceCard from "../../../components/ui/ServiceCard";

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section id="servicios" className="py-24 relative bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("services.title")}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            icon={<Globe className="text-cyan-400" size={40} />}
            title={t("services.webDev.title")}
            desc={t("services.webDev.description")}
          />
          <ServiceCard
            icon={<Smartphone className="text-violet-400" size={40} />}
            title={t("services.mobileDev.title")}
            desc={t("services.mobileDev.description")}
          />
          <ServiceCard
            icon={<Cpu className="text-pink-400" size={40} />}
            title={t("services.customSoftware.title")}
            desc={t("services.customSoftware.description")}
          />
          <ServiceCard
            icon={<Palette className="text-orange-400" size={40} />}
            title={t("services.design.title")}
            desc={t("services.design.description")}
          />
        </div>
      </div>
    </section>
  );
}
