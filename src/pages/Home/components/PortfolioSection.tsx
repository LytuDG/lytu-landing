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
              <ProjectVisual color="cyan" />
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
              <ProjectVisual color="emerald" />
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
              <ProjectVisual color="orange" />
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
              <ProjectVisual color="rose" />
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

function ProjectVisual({ color }: { color: string }) {
  const colorMap: Record<
    string,
    {
      primary: string;
      secondary: string;
      glow: string;
      grid: string;
      text: string;
    }
  > = {
    cyan: {
      primary: "from-cyan-600/20 to-transparent",
      secondary: "bg-cyan-500/10",
      glow: "shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)]",
      grid: "bg-size-[32px_32px] bg-[linear-gradient(to_right,#0891b21a_1px,transparent_1px),linear-gradient(to_bottom,#0891b21a_1px,transparent_1px)]",
      text: "text-cyan-400",
    },
    emerald: {
      primary: "from-emerald-600/20 to-transparent",
      secondary: "bg-emerald-500/10",
      glow: "shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)]",
      grid: "bg-size-[32px_32px] bg-[linear-gradient(to_right,#0596691a_1px,transparent_1px),linear-gradient(to_bottom,#0596691a_1px,transparent_1px)]",
      text: "text-emerald-400",
    },
    orange: {
      primary: "from-orange-600/20 to-transparent",
      secondary: "bg-orange-500/10",
      glow: "shadow-[0_0_50px_-12px_rgba(249,115,22,0.5)]",
      grid: "bg-size-[32px_32px] bg-[linear-gradient(to_right,#ea580c1a_1px,transparent_1px),linear-gradient(to_bottom,#ea580c1a_1px,transparent_1px)]",
      text: "text-orange-400",
    },
    rose: {
      primary: "from-rose-600/20 to-transparent",
      secondary: "bg-rose-500/10",
      glow: "shadow-[0_0_50px_-12px_rgba(244,63,94,0.5)]",
      grid: "bg-size-[32px_32px] bg-[linear-gradient(to_right,#e11d481a_1px,transparent_1px),linear-gradient(to_bottom,#e11d481a_1px,transparent_1px)]",
      text: "text-rose-400",
    },
  };

  const theme = colorMap[color] || colorMap.cyan;

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-950 group-hover:scale-105 transition-transform duration-700">
      {/* Grid Pattern Background */}
      <div className={`absolute inset-0 bg-size-[32px_32px] ${theme.grid}`} />

      {/* Radial Gradient Glow */}
      <div
        className={`absolute inset-0 bg-gradient-radial from-transparent to-slate-950`}
      />

      {/* Animated Glow Orb */}
      <div
        className={`absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full bg-linear-to-br ${theme.primary} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <div
        className={`absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-linear-to-tr ${theme.primary} blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
      />

      {/* Abstract UI Elements */}
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <div
          className={`w-full h-full rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm relative overflow-hidden p-4 ${theme.glow}`}
        >
          {/* Mock UI Header */}
          <div className="flex gap-2 mb-4">
            <div className={`w-2 h-2 rounded-full ${theme.secondary}`} />
            <div className={`w-2 h-2 rounded-full ${theme.secondary}`} />
            <div className={`w-2 h-2 rounded-full ${theme.secondary}`} />
          </div>

          {/* Mock UI Content */}
          <div className="space-y-3">
            <div
              className={`h-4 w-3/4 rounded ${theme.secondary} opacity-50`}
            />
            <div
              className={`h-3 w-1/2 rounded ${theme.secondary} opacity-30`}
            />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div
                className={`h-20 rounded-lg ${theme.secondary} opacity-20`}
              />
              <div
                className={`h-20 rounded-lg ${theme.secondary} opacity-20`}
              />
            </div>
          </div>

          {/* Central Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Smartphone
              size={64}
              className={`opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500 ${theme.text}`}
            />
          </div>
        </div>
      </div>

      {/* External Link Icon Overlay */}
      <div className="absolute top-6 right-6 z-20">
        <ExternalLink
          className="text-white/40 group-hover:text-white transition-colors duration-300"
          size={20}
        />
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-white/5 to-transparent h-[200%] -translate-y-full group-hover:animate-scanline" />
    </div>
  );
}
