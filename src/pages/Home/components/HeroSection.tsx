import { ChevronRight, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import ParticleNetwork from "../../../components/ui/ParticleNetwork";
import { scrollToSection } from "../../../utils/scroll";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-slate-950/80 to-slate-950 z-10" />
        <ParticleNetwork />
      </div>

      <div className="container mx-auto px-6 relative z-20 pt-20 flex justify-center">
        <div className="max-w-4xl text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6 backdrop-blur-sm animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
            <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight mb-8">
            {t("hero.title1")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              {t("hero.title2")}
            </span>
          </h1>

          <p
            className="text-lg md:text-2xl text-slate-400 mb-10 max-w-3xl leading-relaxed mx-auto"
            dangerouslySetInnerHTML={{ __html: t("hero.description") }}
          />

          <div className="flex flex-col w-full sm:flex-row gap-4 justify-center sm:gap-6 px-4 sm:px-0">
            <button
              onClick={() => scrollToSection("proyectos")}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 rounded-full font-bold text-white overflow-hidden transition-all hover:bg-indigo-700 hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.4)] text-sm sm:text-base"
            >
              <span className="relative z-10 flex items-center justify-center">
                {t("hero.cta1")}{" "}
                <ChevronRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </span>
            </button>

            <button
              onClick={() => scrollToSection("servicios")}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-white border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition-colors backdrop-blur-sm text-sm sm:text-base"
            >
              {t("hero.cta2")}
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 animate-bounce text-slate-500">
        <ArrowRight className="transform rotate-90" />
      </div>
    </header>
  );
}
