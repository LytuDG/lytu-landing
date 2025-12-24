import { useState, useEffect } from "react";
import { Globe, Smartphone, Cpu, Palette, Bot } from "lucide-react";
import { useTranslation } from "react-i18next";
import ServiceCard from "../../../components/ui/ServiceCard";

export default function ServicesSection() {
  const { t } = useTranslation();
  const [highlighted, setHighlighted] = useState<{
    target: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const handleIntent = (e: any) => {
      const { intent, target, message } = e.detail;
      if (intent === "services") {
        setHighlighted({ target, message });
        setTimeout(() => setHighlighted(null), 10000);
      }
    };

    window.addEventListener("lytu-ai-intent", handleIntent);
    return () => window.removeEventListener("lytu-ai-intent", handleIntent);
  }, []);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          <ServiceCard
            id="ai-target-ai"
            icon={<Bot className="text-emerald-400" size={40} />}
            title={t("services.aiAutomations.title")}
            desc={t("services.aiAutomations.description")}
            isNew={true}
            isHighlighted={highlighted?.target === "ai"}
            aiMessage={highlighted?.message}
          />
          <ServiceCard
            id="ai-target-web"
            icon={<Globe className="text-cyan-400" size={40} />}
            title={t("services.webDev.title")}
            desc={t("services.webDev.description")}
            isHighlighted={highlighted?.target === "web"}
            aiMessage={highlighted?.message}
          />
          <ServiceCard
            id="ai-target-mobile"
            icon={<Smartphone className="text-violet-400" size={40} />}
            title={t("services.mobileDev.title")}
            desc={t("services.mobileDev.description")}
            isHighlighted={highlighted?.target === "mobile"}
            aiMessage={highlighted?.message}
          />
          <ServiceCard
            id="ai-target-software"
            icon={<Cpu className="text-pink-400" size={40} />}
            title={t("services.customSoftware.title")}
            desc={t("services.customSoftware.description")}
            isHighlighted={highlighted?.target === "software"}
            aiMessage={highlighted?.message}
          />
          <ServiceCard
            id="ai-target-design"
            icon={<Palette className="text-orange-400" size={40} />}
            title={t("services.design.title")}
            desc={t("services.design.description")}
            isHighlighted={highlighted?.target === "design"}
            aiMessage={highlighted?.message}
          />
        </div>
      </div>
    </section>
  );
}
