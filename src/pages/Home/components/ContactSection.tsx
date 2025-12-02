import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MessageCircle, FileText, ArrowRight, Mail, Send } from "lucide-react";

export default function ContactSection() {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<
    "simple" | "quote" | null
  >(null);

  return (
    <section id="contacto" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-900/20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t("contact.title")}
            </h2>
            <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>

          {/* Opciones de Contacto */}
          {!selectedOption && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Opción 1: Contacto Simple */}
              <button
                onClick={() => setSelectedOption("simple")}
                className="group bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-8 text-left shadow-2xl border border-white/10 hover:border-white/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {t("contact.simpleOption.title")}
                </h3>
                <p className="text-indigo-100 text-base">
                  {t("contact.simpleOption.description")}
                </p>
              </button>

              {/* Opción 2: Solicitar Cotización */}
              <Link
                to="/quote-request"
                className="group bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl p-8 text-left shadow-2xl border border-white/10 hover:border-white/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {t("contact.quoteOption.title")}
                </h3>
                <p className="text-indigo-100 text-base">
                  {t("contact.quoteOption.description")}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90">
                  {t("contact.quoteOption.cta")}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          )}

          {/* Formulario Simple */}
          {selectedOption === "simple" && (
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-10 md:p-16 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button
                onClick={() => setSelectedOption(null)}
                className="mb-6 text-white/80 hover:text-white text-sm flex items-center gap-2 transition-colors"
              >
                ← {t("contact.back")}
              </button>

              <div className="flex flex-col gap-4 max-w-lg mx-auto">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-200" />
                  <input
                    type="email"
                    placeholder={t("contact.emailPlaceholder")}
                    className="pl-12 pr-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-indigo-200 focus:outline-none focus:bg-white/20 w-full backdrop-blur-sm transition-all focus:border-white/40"
                  />
                </div>
                <textarea
                  placeholder={t("contact.projectPlaceholder")}
                  rows={4}
                  className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-indigo-200 focus:outline-none focus:bg-white/20 w-full backdrop-blur-sm transition-all focus:border-white/40 resize-none"
                />
                <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-cyan-50 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  {t("contact.cta")}
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-indigo-200">
                {t("contact.or")}{" "}
                <a
                  href="mailto:hola@lytu.tech"
                  className="underline hover:text-white font-semibold"
                >
                  hola@lytu.tech
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
