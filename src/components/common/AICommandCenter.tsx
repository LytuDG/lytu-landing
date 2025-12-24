import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bot, Loader2, ArrowRight } from "lucide-react";
import { AIService } from "../../services/ai.service";
import { scrollToSection } from "../../utils/scroll";

export default function AICommandCenter() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const isAtHome = location.pathname === "/";
  const isChatbotPage = location.pathname.includes("/ai-chatbot");

  if (isChatbotPage) return null;

  const handleSearch = async () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);

    try {
      const rawIntent = await AIService.getIntent(input);
      const [intentRaw, targetRaw] = rawIntent.split(":");
      const intent = intentRaw.trim().toLowerCase();
      const target = targetRaw?.trim().toLowerCase();

      console.log("AI Intent:", intent, "Target:", target);

      // Emit event for sections to react
      const event = new CustomEvent("lytu-ai-intent", {
        detail: {
          intent,
          target,
          message: target
            ? `Creo que nuestro sistema de ${target} es justo lo que buscas.`
            : `¡Aquí tienes nuestras opciones de ${intent}!`,
        },
      });
      window.dispatchEvent(event);

      // Precise navigation with a small delay to allow UI to react and animations to finish
      setTimeout(() => {
        const elementId = target ? `ai-target-${target}` : null;
        const sectionId =
          intent === "services"
            ? "servicios"
            : intent === "solutions"
            ? "soluciones"
            : intent === "contact"
            ? "contacto"
            : null;

        const targetEl = elementId ? document.getElementById(elementId) : null;

        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (sectionId) {
          scrollToSection(sectionId);
        } else if (intent === "quote") {
          window.location.href = "/quote-request";
        } else {
          scrollToSection("servicios");
        }
      }, 300);

      setInput("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Command Sector (Only at Home) */}
      {isAtHome && (
        <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 pointer-events-none z-30">
          <div className="pointer-events-auto relative group animate-in fade-in zoom-in duration-1000">
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 to-indigo-600/20 rounded-2xl blur-xl group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl transition-all group-hover:border-cyan-500/30">
              <div className="pl-4 text-cyan-400">
                <Bot size={24} className="animate-pulse" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="¿Qué quieres construir hoy?"
                className="w-full bg-transparent border-none outline-none px-4 py-4 text-white placeholder:text-slate-500 text-lg md:text-xl"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-linear-to-r from-cyan-500 to-indigo-600 p-3 rounded-xl text-white shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <ArrowRight size={24} />
                )}
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center animate-in slide-in-from-top-2 duration-700 delay-300">
              {[
                "Tienda Online",
                "App iOS/Android",
                "Automatización con IA",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Floating Bot */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          to="/demos/ai-chatbot"
          className="relative group block w-14 h-14 md:w-16 md:h-16"
        >
          <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity animate-pulse" />
          <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-indigo-600 rounded-full opacity-20 group-hover:opacity-40 blur-md transition-all animate-pulse" />
          <div className="relative w-full h-full rounded-full bg-linear-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl transition-all duration-300 group-hover:scale-110">
            <Bot
              size={28}
              className="transition-transform group-hover:rotate-12"
            />
            <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full shadow-lg" />
          </div>
        </Link>
      </div>
    </>
  );
}
