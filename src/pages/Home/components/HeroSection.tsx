import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import ParticleNetwork from "../../../components/ui/ParticleNetwork";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-linear-to-b from-indigo-900/20 via-slate-950/80 to-slate-950 z-10" />
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
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-cyan-400">
              {t("hero.title2")}
            </span>
          </h1>

          <p
            className="text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl leading-relaxed mx-auto animate-fade-in-up delay-200"
            dangerouslySetInnerHTML={{ __html: t("hero.description") }}
          />

          <div
            id="hero-ai-container"
            className="min-h-[100px] w-full flex justify-center items-center"
          >
            {/* AI Command Center will be rendered here by a Portal or absolute positioning logic */}
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 animate-bounce text-slate-500">
        <ArrowRight className="transform rotate-90" />
      </div> */}
    </header>
  );
}
