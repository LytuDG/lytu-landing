import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  ArrowRight,
  ClipboardCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getPublicIdByTrackingCode } from "../../lib/quoteService";

export default function TrackingSearchPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const codeParam = params.get("code");
    if (codeParam) {
      const cleanCode = codeParam.toUpperCase();
      setCode(cleanCode);
      performTrack(cleanCode);
    }
  }, [location.search]);

  const performTrack = async (trackingCode: string) => {
    if (!trackingCode.trim()) return;

    setIsSearching(true);
    setError(null);

    const result = await getPublicIdByTrackingCode(trackingCode.trim());

    if (result.success && result.publicId) {
      navigate(`/track/${result.publicId}`);
    } else {
      setError(result.error || t("trackingInput.error"));
    }
    setIsSearching(false);
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    performTrack(code);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-size-[32px_32px] bg-[linear-gradient(to_right,#0891b20a_1px,transparent_1px),linear-gradient(to_bottom,#0891b20a_1px,transparent_1px)] opacity-20" />
      </div>

      <div className="max-w-4xl w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-8 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-8 backdrop-blur-sm">
              <ClipboardCheck size={16} className="text-indigo-400 mr-2" />
              <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">
                {t("tracking.title")}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              {t("trackingInput.title")}
            </h1>
            <p className="text-slate-400 mb-12 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t("trackingInput.subtitle")}
            </p>

            <div className="max-w-2xl mx-auto">
              <form
                onSubmit={handleTrack}
                className="flex flex-col md:flex-row gap-4"
              >
                <div className="relative flex-1 group/input">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-cyan-400 transition-colors">
                    <Search size={22} />
                  </div>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder={t("trackingInput.placeholder")}
                    className="w-full bg-slate-950/80 border border-slate-700/50 text-white pl-14 pr-6 py-5 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all text-xl placeholder:text-slate-700 font-mono uppercase"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!code.trim() || isSearching}
                  className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 px-10 py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 group/btn shadow-xl shadow-cyan-500/20 active:scale-95 text-lg min-w-[180px]"
                >
                  {isSearching ? (
                    <Loader2 size={22} className="animate-spin" />
                  ) : (
                    <>
                      {t("trackingInput.cta")}
                      <ArrowRight
                        size={22}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>

              {error && (
                <div className="mt-6 flex items-center justify-center gap-2 text-red-400 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle size={18} />
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <p className="text-slate-600 text-sm mt-8 font-medium uppercase tracking-widest">
                Secure • Real-time • Lytu Cloud Tracking
              </p>
            </div>
          </div>

          {/* Subtle glow on hover */}
          <div className="absolute -inset-x-20 -top-20 h-64 bg-cyan-500/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
