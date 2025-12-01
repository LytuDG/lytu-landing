import { Link } from "react-router-dom";
import {
  CalendarCheck,
  FileText,
  Package,
  ArrowRight,
  Zap,
  Users,
  ShoppingBag,
  PenTool,
  MessageCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "../../../utils/scroll";

export default function ReadySolutionsSection() {
  const { t } = useTranslation();
  return (
    <section
      id="soluciones"
      className="py-24 bg-slate-950 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6 backdrop-blur-sm animate-fade-in-up">
            <Zap size={14} className="text-cyan-400 mr-2" />
            <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">
              {t("readySolutions.badge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("readySolutions.title")}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-500">
              {t("readySolutions.titleHighlight")}
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t("readySolutions.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SolutionCard
            icon={<CalendarCheck className="text-cyan-400" size={32} />}
            title={t("readySolutions.booking.title")}
            description={t("readySolutions.booking.description")}
            viewDemo={t("readySolutions.viewDemo")}
            link="/demos/booking"
          />
          <SolutionCard
            icon={<FileText className="text-violet-400" size={32} />}
            title={t("readySolutions.quotes.title")}
            description={t("readySolutions.quotes.description")}
            viewDemo={t("readySolutions.viewDemo")}
            link="/demos/quote"
          />
          <SolutionCard
            icon={<Users className="text-pink-400" size={32} />}
            title={t("readySolutions.crm.title")}
            description={t("readySolutions.crm.description")}
            viewDemo={t("readySolutions.viewDemo")}
            link="/demos/crm"
          />
          <SolutionCard
            icon={<Package className="text-orange-400" size={32} />}
            title={t("readySolutions.inventory.title")}
            description={t("readySolutions.inventory.description")}
            viewDemo={t("readySolutions.viewDemo")}
            link="/demos/inventory"
          />
          <SolutionCard
            icon={<ShoppingBag className="text-blue-400" size={32} />}
            title={t("readySolutions.ecommerce.title")}
            description={t("readySolutions.ecommerce.description")}
            viewDemo={t("readySolutions.viewDemo")}
            link="/demos/ecommerce"
          />
          <SolutionCard
            icon={<PenTool className="text-emerald-400" size={32} />}
            title={t("readySolutions.blog.title")}
            description={t("readySolutions.blog.description")}
            viewDemo={t("readySolutions.viewDemo")}
            link="demos/blog"
          />
        </div>

        {/* Custom Solution CTA - Destacado y Centrado */}
        <div
          onClick={() => scrollToSection("contacto")}
          className="mt-16 max-w-5xl mx-auto group relative p-[2px] rounded-3xl bg-linear-to-br from-cyan-400 via-indigo-500 to-purple-600 hover:from-cyan-300 hover:via-indigo-400 hover:to-purple-500 transition-all duration-500 cursor-pointer"
        >
          {/* Pulsing glow effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-cyan-400 to-indigo-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 animate-pulse transition-opacity"></div>

          <div className="relative bg-slate-950 rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-indigo-500/5"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="shrink-0 w-24 h-24 rounded-2xl bg-linear-to-br from-cyan-400 via-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-2xl shadow-cyan-500/50">
                <MessageCircle className="text-white" size={48} />
              </div>

              <div className="grow">
                <h3 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-4">
                  {t("readySolutions.customCTA.title")}
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
                  {t("readySolutions.customCTA.description")}
                </p>
              </div>

              <div className="shrink-0">
                <div className="inline-flex items-center px-8 py-4 rounded-full bg-linear-to-r from-cyan-500 to-indigo-600 text-white font-bold text-lg group-hover:from-cyan-400 group-hover:to-indigo-500 transition-all shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 group-hover:scale-105">
                  {t("readySolutions.customCTA.button")}{" "}
                  <ArrowRight
                    size={20}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionCard({
  icon,
  title,
  description,
  viewDemo,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  viewDemo: string;
  link?: string;
}) {
  const Content = () => (
    <div className="flex items-center text-indigo-400 text-sm font-bold group-hover:text-cyan-300 transition-colors cursor-pointer mt-auto">
      {viewDemo}{" "}
      <ArrowRight
        size={16}
        className="ml-2 group-hover:translate-x-1 transition-transform"
      />
    </div>
  );

  return (
    <div className="group relative p-px rounded-2xl bg-linear-to-b from-slate-800 to-slate-900 hover:from-cyan-500 hover:to-indigo-600 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
      <div className="bg-slate-950 rounded-2xl p-8 h-full relative overflow-hidden flex flex-col">
        {/* Hover Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500 -mr-10 -mt-10 pointer-events-none" />

        <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-300 shadow-lg">
          {icon}
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 grow">
          {description}
        </p>

        {link ? (
          <Link to={link}>
            <Content />
          </Link>
        ) : (
          <Content />
        )}
      </div>
    </div>
  );
}
