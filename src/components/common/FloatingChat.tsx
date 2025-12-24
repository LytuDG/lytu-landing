import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bot, X, Sparkles } from "lucide-react";

export default function FloatingChat() {
  const [showTooltip, setShowTooltip] = useState(false);
  const location = useLocation();

  // Don't show the floating button on the actual chatbot demo page
  if (location.pathname.includes("/ai-chatbot")) {
    return null;
  }

  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    // Hide tooltip after 8 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 11000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      {/* Tooltip / Welcome Message */}
      {showTooltip && (
        <div className="pointer-events-auto animate-in fade-in slide-in-from-right-4 duration-500 max-w-[200px] md:max-w-xs transition-all">
          <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl shadow-cyan-500/10">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <X size={12} />
            </button>
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-linear-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
                <Bot size={16} />
              </div>
              <div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  ¡Hola! Soy{" "}
                  <span className="text-cyan-400 font-bold">Lytus</span>.
                  ¿Tienes dudas sobre tu próximo proyecto?
                </p>
                <Link
                  to="/demos/ai-chatbot"
                  className="inline-flex items-center gap-1 text-[10px] text-cyan-400 font-bold uppercase tracking-wider mt-2 hover:translate-x-1 transition-transform"
                >
                  Hablar ahora <Sparkles size={10} />
                </Link>
              </div>
            </div>
          </div>
          {/* Triangle Tail */}
          <div className="absolute right-6 -bottom-2 w-4 h-4 bg-slate-900 border-r border-b border-white/10 rotate-45" />
        </div>
      )}

      {/* Main Button */}
      <Link
        to="/demos/ai-chatbot"
        className="pointer-events-auto relative group"
      >
        {/* Pulse Animations */}
        <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity animate-pulse" />
        <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-indigo-600 rounded-full opacity-20 group-hover:opacity-40 blur-md transition-all animate-pulse" />

        {/* The Button */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-linear-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-cyan-500/20 group-hover:scale-110 active:scale-95 transition-all duration-300">
          <Bot
            size={28}
            className="md:size-32 group-hover:rotate-12 transition-transform"
          />

          {/* Notification Indicator */}
          <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full shadow-lg" />

          {/* Floating Sparkles */}
          <Sparkles
            size={14}
            className="absolute -top-1 -left-1 text-cyan-200 animate-bounce delay-100"
          />
        </div>
      </Link>
    </div>
  );
}
