import { useTranslation } from "react-i18next";
import {
  Bot,
  MessageSquare,
  FileSpreadsheet,
  Zap,
  PenTool,
  BarChart3,
  CheckCircle2,
  Sparkles,
  BrainCircuit,
} from "lucide-react";

export default function AIServicesSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Elements - Optimized using gradients instead of large blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,transparent_70%)] pointer-events-none translate-y-1/2 -translate-x-1/2" />
      {/* Removed external noise texture for performance */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6 backdrop-blur-sm animate-fade-in-up">
            <Sparkles size={14} className="text-purple-400 mr-2" />
            <span className="text-purple-300 text-xs font-bold uppercase tracking-widest">
              {t("aiServices.badge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("aiServices.title")}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">
              {t("aiServices.titleHighlight")}
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t("aiServices.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 1. AI Sales Chatbot (Featured Large) */}
          <div className="lg:col-span-8 group relative p-px rounded-3xl bg-linear-to-br from-purple-500/50 via-cyan-500/30 to-slate-800 transition-all hover:scale-[1.01] duration-500">
            <div className="relative h-full w-full bg-slate-950 rounded-3xl overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <BrainCircuit size={200} />
              </div>
              <div className="relative p-8 md:p-10 h-full flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4 border border-amber-500/30">
                    🥇 {t("aiServices.salesChatbot.badge")}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                    <Bot className="text-purple-400" size={32} />
                    {t("aiServices.salesChatbot.title")}
                  </h3>
                  <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                    {t("aiServices.salesChatbot.description")}
                  </p>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 mb-6">
                    <p className="text-cyan-300 font-medium italic">
                      "{t("aiServices.salesChatbot.quote")}"
                    </p>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(
                      t("aiServices.salesChatbot.features", {
                        returnObjects: true,
                      }) as string[]
                    ).map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-slate-400 text-sm"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-purple-400 mr-2 shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Lead Qualification */}
          <div className="lg:col-span-4 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-purple-500/30 transition-colors flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <Zap size={24} />
              </div>
              <div className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-slate-800 text-slate-400 uppercase tracking-tighter">
                {t("aiServices.leadQualification.badge")}
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {t("aiServices.leadQualification.title")}
            </h3>
            <p className="text-slate-400 text-sm mb-4 grow">
              {t("aiServices.leadQualification.description")}
            </p>
            <div className="mt-auto pt-4 border-t border-slate-800">
              <p className="text-xs text-blue-300 bg-blue-500/5 p-2 rounded-lg border border-blue-500/10">
                "{t("aiServices.leadQualification.quote")}"
              </p>
            </div>
          </div>

          {/* 3. Smart Quotes (High Priority) */}
          <div className="lg:col-span-6 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-green-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                <FileSpreadsheet size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {t("aiServices.smartQuotes.title")}
                </h3>
                <span className="text-xs text-green-500 font-bold uppercase tracking-wider">
                  🥉 {t("aiServices.smartQuotes.badge")}
                </span>
              </div>
            </div>
            <p className="text-slate-400 mb-6">
              {t("aiServices.smartQuotes.description")}
            </p>
            <ul className="space-y-2">
              {(
                t("aiServices.smartQuotes.features", {
                  returnObjects: true,
                }) as string[]
              ).map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center text-slate-400 text-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Support Automation */}
          <div className="lg:col-span-6 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-orange-500/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                <MessageSquare size={24} />
              </div>
              <div className="text-orange-300 text-[10px] font-bold uppercase tracking-widest bg-orange-500/10 px-2 py-1 rounded">
                {t("aiServices.supportAuto.badge")}
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {t("aiServices.supportAuto.title")}
            </h3>
            <p className="text-slate-400 mb-4">
              {t("aiServices.supportAuto.description")}
            </p>
            <div className="inline-flex items-center text-xs font-medium text-orange-300 bg-orange-500/10 px-3 py-1 rounded-full">
              {t("aiServices.supportAuto.target")}
            </div>
          </div>

          {/* 5. Content Generation */}
          <div className="lg:col-span-4 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-pink-500/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400">
                <PenTool size={24} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t("aiServices.contentGen.title")}
            </h3>
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-slate-300 mb-3">
              {t("aiServices.contentGen.badge")}
            </span>
            <p className="text-slate-400 text-sm">
              {t("aiServices.contentGen.description")}
            </p>
          </div>

          {/* 6. Smart Analysis */}
          <div className="lg:col-span-8 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-indigo-500/30 transition-colors relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <BarChart3 size={24} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-white">
                      {t("aiServices.dataAnalysis.title")}
                    </h3>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                      {t("aiServices.dataAnalysis.badge")}
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 mb-4">
                  {t("aiServices.dataAnalysis.description")}
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3">
                  {(
                    t("aiServices.dataAnalysis.examples", {
                      returnObjects: true,
                    }) as string[]
                  ).map((ex, i) => (
                    <div
                      key={i}
                      className="flex items-center bg-slate-800/50 px-3 py-2 rounded-lg text-sm text-indigo-200"
                    >
                      <Sparkles
                        size={12}
                        className="text-indigo-400 mr-2 shrink-0"
                      />
                      "{ex}"
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
