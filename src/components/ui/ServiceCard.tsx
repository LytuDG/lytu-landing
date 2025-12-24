import { useTranslation } from "react-i18next";
import { Bot } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  isNew?: boolean;
  isHighlighted?: boolean;
  aiMessage?: string;
  id?: string;
}

export default function ServiceCard({
  icon,
  title,
  desc,
  isNew,
  isHighlighted,
  aiMessage,
  id,
}: ServiceCardProps) {
  const { t } = useTranslation();

  return (
    <div id={id} className="group relative transition-all duration-300">
      {/* Floating AI Message Bubble */}
      {isHighlighted && aiMessage && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-max max-w-[200px] z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative bg-indigo-500 text-white p-3 rounded-2xl shadow-2xl shadow-indigo-500/50 border border-white/20">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={12} className="text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-80">
                Lytus AI
              </span>
            </div>
            <p
              className="text-xs font-bold leading-tight"
              dangerouslySetInnerHTML={{ __html: aiMessage }}
            />
            {/* Bubble Tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-500 rotate-45 border-r border-b border-white/10" />
          </div>
        </div>
      )}

      {/* Main Card */}
      <div
        className={`p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden h-full flex flex-col ${
          isHighlighted
            ? "bg-slate-800 border-cyan-400 -translate-y-2 shadow-[0_0_50px_rgba(34,211,238,0.2)] ring-2 ring-cyan-400 z-20"
            : "bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/50 hover:-translate-y-2 z-10"
        }`}
      >
        {isNew && !isHighlighted && (
          <div className="absolute top-4 right-[-35px] bg-linear-to-r from-cyan-500 to-indigo-600 text-white text-[10px] font-bold py-1 px-10 rotate-45 shadow-lg z-10 uppercase tracking-widest">
            {t("common.new")}
          </div>
        )}

        <div
          className={`bg-slate-950 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 border shadow-lg ${
            isHighlighted
              ? "border-cyan-400 scale-110 shadow-cyan-500/20"
              : "border-slate-800 group-hover:scale-110 group-hover:border-indigo-500/30"
          }`}
        >
          {icon}
        </div>

        <h3
          className={`text-xl font-bold mb-3 transition-colors ${
            isHighlighted
              ? "text-cyan-400"
              : "text-white group-hover:text-cyan-400"
          }`}
        >
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed grow">{desc}</p>
      </div>
    </div>
  );
}
