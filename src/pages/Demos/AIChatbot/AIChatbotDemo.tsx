import { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  User,
  RefreshCcw,
  Loader2,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AIService, type ChatMessage } from "../../../services/ai.service";

export default function AIChatbotDemo() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split("-")[0] || "es";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: t("chatbot.welcome"),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const history = messages.slice(-10); // Last 10 messages for context
      const aiResponse = await AIService.sendMessage(
        userMessage,
        history,
        currentLang
      );

      setMessages([...newMessages, { role: "assistant", content: aiResponse }]);
    } catch (err: any) {
      setError(t("chatbot.error"));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user");
    if (lastUserMessage) {
      setInput(lastUserMessage.content);
      setMessages(messages.filter((m) => m !== lastUserMessage));
      setError(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-tight">
                Lytus AI
              </h1>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">
          <Sparkles size={14} className="text-cyan-400" />
          Powered by Lytu Engineering
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto px-4 py-8 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-4 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${
                  msg.role === "user"
                    ? "bg-slate-800"
                    : "bg-linear-to-br from-cyan-500 to-indigo-600"
                }`}
              >
                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>

              <div className={`max-w-[85%] space-y-2`}>
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-white/10 text-white rounded-tr-none border border-white/5"
                      : "bg-slate-900/80 text-slate-200 rounded-tl-none border border-white/5 backdrop-blur-md"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Typewriter text={msg.content} />
                  ) : (
                    <FormattedText text={msg.content} />
                  )}
                </div>
                <div
                  className={`text-[10px] text-slate-500 ${
                    msg.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {msg.role === "assistant"
                    ? t("chatbot.assistantLabel")
                    : t("chatbot.userLabel")}{" "}
                  •{" "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-linear-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-md">
                <Bot size={16} className="animate-pulse" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-slate-900/80 border border-white/5 backdrop-blur-md">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce" />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-3 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl animate-in zoom-in-95 duration-300">
              <p className="text-red-400 text-sm">{error}</p>
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-lg"
              >
                <RefreshCcw size={14} /> {t("chatbot.retry")}
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-slate-950 border-t border-white/5">
        <div className="max-w-3xl mx-auto relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={t("chatbot.inputPlaceholder")}
            className="w-full pl-6 pr-14 py-4 rounded-2xl bg-slate-900 border border-white/10 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-600 shadow-2xl shadow-cyan-500/5 group-hover:border-white/20"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center rounded-xl transition-all ${
              !input.trim() || isLoading
                ? "text-slate-700 bg-slate-800"
                : "text-white bg-linear-to-r from-cyan-500 to-indigo-600 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
            }`}
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-600 mt-3 uppercase tracking-widest font-bold">
          Lytu AI Demo • Powered by Google Gemini
        </p>
      </div>
    </div>
  );
}

function Typewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 5);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <FormattedText text={displayedText} />;
}

function FormattedText({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, i) => (
        <p key={i} className="min-h-[1em]">
          <LineParser line={line} />
        </p>
      ))}
    </div>
  );
}

function LineParser({ line }: { line: string }) {
  const { t } = useTranslation();

  let parts: (string | React.ReactNode)[] = [line];

  // Parse Bold **...**
  parts = parts.flatMap((part) => {
    if (typeof part !== "string") return part;
    const regex = /\*\*(.*?)\*\*/g;
    const result: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(part)) !== null) {
      result.push(part.slice(lastIndex, match.index));
      result.push(
        <strong key={match.index} className="font-bold text-white text-base">
          {match[1]}
        </strong>
      );
      lastIndex = regex.lastIndex;
    }
    result.push(part.slice(lastIndex));
    return result;
  });

  // Parse Italics *...*
  parts = parts.flatMap((part) => {
    if (typeof part !== "string") return part;
    const regex = /\*(.*?)\*/g;
    const result: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(part)) !== null) {
      result.push(part.slice(lastIndex, match.index));
      result.push(
        <em key={match.index} className="italic text-cyan-300">
          {match[1]}
        </em>
      );
      lastIndex = regex.lastIndex;
    }
    result.push(part.slice(lastIndex));
    return result;
  });

  // Parse Links
  parts = parts.flatMap((part) => {
    if (typeof part !== "string") return part;
    const regex = /(\/[a-zA-Z0-9\-\#\/]+)/g;
    const result: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(part)) !== null) {
      const link = match[1];
      if (link.length > 1) {
        result.push(part.slice(lastIndex, match.index));
        result.push(
          <Link
            key={match.index}
            to={link}
            className="text-cyan-400 font-bold underline decoration-cyan-500/30 hover:decoration-cyan-400 transition-all px-1.5 py-0.5 rounded-md bg-cyan-400/10 inline-flex items-center gap-1 group"
          >
            {link === "/quote-request" ? t("chatbot.quoteLabel") : link}
            <Sparkles size={10} className="group-hover:animate-pulse" />
          </Link>
        );
        lastIndex = regex.lastIndex;
      }
    }
    result.push(part.slice(lastIndex));
    return result;
  });

  return <>{parts}</>;
}
