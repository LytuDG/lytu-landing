import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Mail,
  ArrowRight,
  Linkedin,
  Instagram,
  Rocket,
} from "lucide-react";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section
      id="contacto"
      className="py-32 relative overflow-hidden bg-slate-950"
    >
      {/* Elementos Decorativos de Fondo - Optimized */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse,rgba(79,70,229,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse,rgba(147,51,234,0.1)_0%,transparent_70%)] pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Cabecera */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
              {t("contact.title")}
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t("contact.subtitle")}
            </p>
          </div>

          {/* Tarjeta Principal de Cotización */}
          <div className="mb-12">
            <Link
              to="/quote-request"
              className="group relative block p-10 md:p-16 bg-gradient-to-br from-indigo-600 to-violet-800 border border-white/20 rounded-[3rem] hover:scale-[1.01] transition-all duration-500 shadow-2xl shadow-indigo-500/30 overflow-hidden"
            >
              {/* Efecto de luz dinámico */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 blur-3xl rounded-full group-hover:bg-white/20 transition-colors duration-700"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-4xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <Rocket className="w-12 h-12 text-white" />
                </div>

                <div className="text-center md:text-left">
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-4">
                    {t("contact.mainCTA.title")}
                  </h3>
                  <p className="text-indigo-100 text-lg md:text-xl leading-relaxed max-w-xl">
                    {t("contact.mainCTA.description")}
                  </p>
                </div>

                <div className="md:ml-auto">
                  <div className="px-8 py-5 bg-white text-indigo-700 font-black rounded-2xl shadow-xl flex items-center gap-3 group-hover:bg-indigo-50 transition-all duration-300">
                    {t("contact.quoteOption.cta")}
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Opciones Secundarias (Canales Directos) */}
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://wa.me/5354081085"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-8 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] hover:border-green-500/30 hover:bg-slate-900 transition-all duration-500"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-7 h-7 text-green-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    {t("contact.whatsapp.title")}
                  </h4>
                  <p className="text-slate-500 text-sm">
                    {t("contact.whatsapp.status")}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-700 group-hover:text-green-500 group-hover:translate-x-2 transition-all" />
            </a>

            <a
              href="mailto:soporte.lytu@gmail.com"
              className="group flex items-center justify-between p-8 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] hover:border-indigo-500/30 hover:bg-slate-900 transition-all duration-500"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-7 h-7 text-indigo-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    {t("contact.email.title")}
                  </h4>
                  <p className="text-slate-500 text-sm">
                    {t("contact.email.description")}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-700 group-hover:text-indigo-500 group-hover:translate-x-2 transition-all" />
            </a>
          </div>

          <div className="mt-16 flex flex-col items-center gap-6">
            <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs">
              {t("contact.socials.subtitle")}
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:border-indigo-500 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:border-indigo-500 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
