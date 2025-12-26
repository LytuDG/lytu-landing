import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bot,
  Loader2,
  ArrowRight,
  X,
  Sparkles,
  Code,
  Cpu,
  Zap,
  Database,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { AIService } from "../../services/ai.service";
import { scrollToSection } from "../../utils/scroll";

interface BotMessageState {
  text: string;
  action?: {
    label: string;
    link: string;
  };
}

export default function AICommandCenter() {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State for the floating nudge (bottom right)
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeMessage, setNudgeMessage] = useState<BotMessageState | null>(
    null
  );

  // State for the main interaction result (Center Screen)
  const [searchResult, setSearchResult] = useState<BotMessageState | null>(
    null
  );
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [showAction, setShowAction] = useState(false);

  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const isAtHome = location.pathname === "/";
  const isChatbotPage = location.pathname.includes("/ai-chatbot");
  const currentLang = i18n.language?.split("-")[0] || "es";

  // Periodic bot nudge - Only once as requested
  useEffect(() => {
    if (isChatbotPage || searchResult) return; // Don't nudge if user is interacting

    const nudgeText = t("aiNavigator.botMessages.nudge");
    if (!nudgeText || nudgeText === "aiNavigator.botMessages.nudge") {
      return;
    }

    const hasBeenNudged = false;
    if (!hasBeenNudged) {
      const initialTimeout = setTimeout(() => {
        setNudgeMessage({
          text: nudgeText,
          action: {
            label: t("aiNavigator.botMessages.talkNow"),
            link: "/demos/ai-chatbot",
          },
        });
        setShowNudge(true);
        setTimeout(() => setShowNudge(false), 8000);
      }, 4000);
      return () => clearTimeout(initialTimeout);
    }
  }, [isChatbotPage, t, searchResult]);

  if (isChatbotPage) return null;

  const handleSearch = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setSearchResult(null); // Clear previous
    setIsResultVisible(false);
    setShowAction(false);
    setShowAction(false);

    try {
      let rawIntent = await AIService.getIntent(input, currentLang);
      // Clean up common AI hallucinations/prefixes
      rawIntent = rawIntent.replace(/^(INTENT|CATEGORY):/i, "").trim();

      const [intentRaw, targetRaw] = rawIntent.split(":");
      const intent = intentRaw.trim().toLowerCase();
      const target = targetRaw?.trim().toLowerCase();

      if (intent === "services") {
        // NEW BEHAVIOR: conversational response inline
        // 1. Get conversational response
        const fullResponse = await AIService.sendMessage(
          input,
          [],
          currentLang
        );

        // 2. Clean response of the markdown link
        const cleanResponse = fullResponse.replace(
          /\[.*?\]\(\/quote-request.*?\)/g,
          ""
        );

        // 3. Set central result
        setSearchResult({
          text: cleanResponse,
          action: {
            label: t("chatbot.requestQuoteButton"),
            link: target
              ? `/quote-request?service=${target}`
              : "/quote-request",
          },
        });
        setIsResultVisible(true);
      } else {
        // EXISTING BEHAVIOR: Scroll/Navigate
        const event = new CustomEvent("lytu-ai-intent", {
          detail: { intent, target },
        });
        window.dispatchEvent(event);

        setTimeout(() => {
          const elementId = target ? `ai-target-${target}` : null;
          const sectionId =
            intent === "solutions"
              ? "soluciones"
              : intent === "contact"
              ? "contacto"
              : null;

          const targetEl = elementId
            ? document.getElementById(elementId)
            : null;
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
        setInput(""); // Clear input only if navigating
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseResult = () => {
    setIsResultVisible(false);
    setTimeout(() => setSearchResult(null), 300);
    setInput("");
  };

  return (
    <>
      <style>{`
        @keyframes cosmic-float {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translate(var(--tw-tx), var(--tw-ty)) rotate(180deg); opacity: 0; }
        }
        .animate-cosmic {
          position: absolute;
          pointer-events: none;
          animation: cosmic-float var(--tw-duration, 15s) linear infinite;
          color: rgba(34, 211, 238, 0.4);
        }
        @keyframes bot-rotate {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg) scale(1.02); }
          75% { transform: rotate(8deg) scale(1.02); }
        }
        .animate-bot-rotate {
          animation: bot-rotate 5s ease-in-out infinite;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Hero Command Sector (Only at Home) */}
      {isAtHome && (
        <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 md:px-6 z-30 pointer-events-none">
          <div className="pointer-events-auto relative group animate-in fade-in zoom-in duration-1000 flex flex-col gap-4">
            {/* Main Input Container */}
            <div className="relative">
              {/* Cosmic Background Effect */}
              <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-cosmic"
                    style={
                      {
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        "--tw-tx": `${(Math.random() - 0.5) * 200}px`,
                        "--tw-ty": `${(Math.random() - 0.5) * 200}px`,
                        "--tw-duration": `${15 + Math.random() * 15}s`,
                        animationDelay: `${-Math.random() * 20}s`,
                      } as any
                    }
                  >
                    {i % 4 === 0 ? (
                      <Code size={12} />
                    ) : i % 4 === 1 ? (
                      <Cpu size={12} />
                    ) : i % 4 === 2 ? (
                      <Database size={12} />
                    ) : (
                      <Zap size={12} />
                    )}
                  </div>
                ))}
              </div>

              <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 to-indigo-600/20 rounded-2xl blur-xl group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl transition-all group-hover:border-cyan-500/30">
                <div className="pl-4 text-cyan-400 flex items-center gap-1">
                  <Bot size={24} className="animate-pulse" />
                  <Sparkles
                    size={14}
                    className="animate-bounce text-cyan-300/50"
                  />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  placeholder={t("aiNavigator.placeholder")}
                  className="w-full bg-transparent border-none outline-none px-4 py-4 text-white placeholder:text-slate-400 text-lg md:text-xl font-medium"
                />
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-linear-to-r from-cyan-500 to-indigo-600 p-3 rounded-xl text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <ArrowRight size={24} />
                  )}
                </button>
              </div>
            </div>

            {/* Central Result Display (Conversational) */}
            {isResultVisible && searchResult && (
              <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10 animate-in slide-in-from-top-4 duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-cyan-500 via-indigo-500 to-cyan-500 animate-[shimmer_2s_infinite]" />

                <button
                  onClick={handleCloseResult}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>

                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                      <Bot size={20} />
                    </div>
                  </div>
                  <div className="space-y-4 w-full">
                    <div className="text-sm md:text-base text-slate-200 leading-relaxed font-medium min-h-[40px]">
                      <Typewriter
                        text={searchResult.text}
                        speed={15}
                        onComplete={() => setShowAction(true)}
                      />
                    </div>

                    {searchResult.action && showAction && (
                      <div className="flex justify-end pt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <Link
                          to={searchResult.action.link}
                          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all group/btn"
                        >
                          {searchResult.action.label}
                          <ArrowRight
                            size={16}
                            className="group-hover/btn:translate-x-1 transition-transform"
                          />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Suggestions (Hidden if result is showing to reduce clutter) */}
            {!isResultVisible && (
              <div className="flex flex-wrap gap-3 justify-center animate-in slide-in-from-top-2 duration-700 delay-300">
                {[
                  {
                    key: "ecommerce",
                    text: t("aiNavigator.suggestions.ecommerce"),
                  },
                  { key: "mobile", text: t("aiNavigator.suggestions.mobile") },
                  { key: "ai", text: t("aiNavigator.suggestions.ai") },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setInput(s.text)}
                    className="px-4 py-1.5 rounded-full border border-white/5 bg-slate-900/40 backdrop-blur-md text-[10px] uppercase tracking-widest font-black text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all shadow-sm"
                  >
                    {s.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Persistent Floating Bot (Just for Nudges/Access) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
        {/* Chat Bubble - Fixed UI */}
        {showNudge && nudgeMessage && (
          <div className="pointer-events-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-linear-to-br from-slate-900 via-slate-900 to-indigo-950 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-2xl shadow-cyan-500/10 max-w-[280px] relative ring-1 ring-white/5">
              <button
                onClick={() => setShowNudge(false)}
                className="absolute -top-2 -right-2 bg-slate-800 rounded-full p-1 text-slate-400 hover:text-white border border-white/10 shadow-lg"
              >
                <X size={10} />
              </button>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                  <Bot size={20} />
                </div>
                <div className="space-y-3">
                  <p className="text-[13px] text-white leading-relaxed font-medium">
                    {nudgeMessage.text}
                  </p>
                  {nudgeMessage.action && (
                    <Link
                      to={nudgeMessage.action.link}
                      className="flex w-full items-center justify-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 transition-all group/btn"
                    >
                      {nudgeMessage.action.label}
                      <ArrowRight
                        size={12}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </Link>
                  )}
                </div>
              </div>
              {/* Tail */}
              <div className="absolute right-8 -bottom-1.5 w-3 h-3 bg-indigo-950 border-r border-b border-white/10 rotate-45" />
            </div>
          </div>
        )}

        <Link
          to="/demos/ai-chatbot"
          className="pointer-events-auto relative group block w-14 h-14 md:w-16 md:h-16"
        >
          {/* External Pulse Rings */}
          <div className="absolute -inset-1.5 bg-cyan-500/5 rounded-full animate-ping duration-[5s]" />
          <div className="absolute -inset-3 bg-indigo-500/3 rounded-full animate-pulse duration-[8s]" />

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
          <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-indigo-600 rounded-full opacity-20 group-hover:opacity-40 blur-md transition-all animate-pulse" />

          {/* Main Button Container */}
          <div className="relative w-full h-full rounded-full bg-linear-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl transition-all duration-300 group-hover:scale-110 active:scale-95 ring-4 ring-white/10 overflow-hidden">
            <Bot
              size={28}
              className="transition-transform group-hover:rotate-12 animate-bot-rotate relative z-10"
            />

            {/* Shimmer effect - Now properly clipped by overflow-hidden */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] z-20" />
          </div>

          {/* Online Indicator - Outside overflow-hidden to avoid clipping */}
          <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-lg z-30" />
        </Link>
      </div>
    </>
  );
}

function Typewriter({
  text,
  speed = 20,
  onComplete,
}: {
  text: string;
  speed?: number;
  onComplete?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (text !== displayedText && index === 0) {
      setDisplayedText("");
    }
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (index >= text.length && onComplete) {
      onComplete();
    }
  }, [index, text, speed, onComplete]);

  return <>{displayedText}</>;
}
