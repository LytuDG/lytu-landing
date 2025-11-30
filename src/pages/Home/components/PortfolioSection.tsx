import {
  ChevronRight,
  Smartphone,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PortfolioSection() {
  const { t } = useTranslation();
  return (
    <section id="proyectos" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              {t("portfolio.title")}
            </h2>
            <p className="text-slate-400 max-w-xl">{t("portfolio.subtitle")}</p>
          </div>
          <div className="hidden md:block">
            <button className="text-indigo-400 font-bold hover:text-white transition-colors flex items-center">
              {t("portfolio.viewGithub")}{" "}
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Project 1 - TuViaje */}
          <a
            href="https://tuviaje.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-500 block"
          >
            <div className="h-64 bg-slate-800 relative overflow-hidden">
              <WebsitePreview url="https://tuviaje.app" color="cyan" />
              <div className="absolute top-4 left-4 bg-cyan-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full z-10">
                {t("portfolio.status.launched")}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {t("portfolio.projects.tuviaje.title")}
              </h3>
              <p className="text-slate-400 mb-6">
                {t("portfolio.projects.tuviaje.description")}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Ionic", "Angular", "Capacitor", "Node.js"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="inline-flex items-center text-white font-bold group-hover:text-cyan-400 transition-colors">
                {t("portfolio.viewCaseStudy")}{" "}
                <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          </a>

          {/* Project 2 - Nova Corp (UPDATED: Green) */}
          <a
            href="https://novafinancialcorp.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-emerald-500 transition-all duration-500 block"
          >
            <div className="h-64 bg-slate-800 relative overflow-hidden">
              <WebsitePreview
                url="https://novafinancialcorp.netlify.app/"
                color="emerald"
              />
              <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                {t("portfolio.status.upcomingLaunch")}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {t("portfolio.projects.novacorp.title")}
              </h3>
              <p className="text-slate-400 mb-6">
                {t("portfolio.projects.novacorp.description")}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded border border-emerald-500/20"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
              <div className="inline-flex items-center text-white font-bold group-hover:text-emerald-400 transition-colors">
                {t("portfolio.viewCaseStudy")}{" "}
                <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          </a>

          {/* Project 3 - Imago Creations */}
          <a
            href="https://imagocreations.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-orange-500 transition-all duration-500 block"
          >
            <div className="h-64 bg-slate-800 relative overflow-hidden">
              <WebsitePreview
                url="https://imagocreations.netlify.app/"
                color="orange"
              />
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                {t("portfolio.status.inDevelopment")}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                {t("portfolio.projects.imago.title")}
              </h3>
              <p className="text-slate-400 mb-6">
                {t("portfolio.projects.imago.description")}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Vue.js", "Express", "MongoDB", "Stripe", "Tailwind"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-orange-400 bg-orange-900/20 px-2 py-1 rounded border border-orange-500/20"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
              <div className="inline-flex items-center text-white font-bold group-hover:text-orange-400 transition-colors">
                {t("portfolio.learnMore")}{" "}
                <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          </a>

          {/* Project 4 - Baila Conmigo (UPDATED: En Desarrollo) */}
          <a
            href="https://bailaconmigo.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-rose-500 transition-all duration-500 block"
          >
            <div className="h-64 bg-slate-800 relative overflow-hidden">
              <WebsitePreview
                url="https://bailaconmigo.netlify.app/"
                color="rose"
              />
              <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                {t("portfolio.status.inDevelopment")}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">
                {t("portfolio.projects.baila.title")}
              </h3>
              <p className="text-slate-400 mb-6">
                {t("portfolio.projects.baila.description")}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["React", "Tailwind", "Framer Motion", "Vite"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-rose-400 bg-rose-900/20 px-2 py-1 rounded border border-rose-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="inline-flex items-center text-white font-bold group-hover:text-rose-400 transition-colors">
                {t("portfolio.viewProject")}{" "}
                <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function WebsitePreview({ url, color }: { url: string; color: string }) {
  // Map color names to Tailwind classes for the fallback background
  const bgColors: Record<string, string> = {
    cyan: "bg-linear-to-tr from-cyan-900 to-slate-800",
    emerald: "bg-linear-to-br from-emerald-900 via-slate-800 to-slate-900",
    orange: "bg-linear-to-br from-orange-900 via-slate-800 to-slate-900",
    rose: "bg-linear-to-br from-rose-900 via-slate-800 to-slate-900",
  };

  const iconColors: Record<string, string> = {
    cyan: "text-cyan-400/50",
    emerald: "text-emerald-400/50",
    orange: "text-orange-400/50",
    rose: "text-rose-400/50",
  };

  return (
    <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700">
      {/* Fallback / Background */}
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          bgColors[color] || "bg-slate-800"
        }`}
      >
        <Smartphone
          size={80}
          className={iconColors[color] || "text-slate-500"}
        />
      </div>

      {/* Iframe Preview */}
      <div className="absolute inset-0 opacity-90 transition-opacity duration-500">
        <iframe
          src={url}
          title={`Preview of ${url}`}
          className="w-[400%] h-[400%] transform scale-25 origin-top-left pointer-events-none border-0"
          loading="lazy"
          scrolling="no"
          tabIndex={-1}
        />
      </div>

      {/* Overlay for hover effect and click protection */}
      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-300" />

      {/* External Link Icon */}
      <div className="absolute top-4 right-4 z-20">
        <ExternalLink className="text-white drop-shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" />
      </div>
    </div>
  );
}
