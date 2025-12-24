import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Building2,
  FileText,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { getQuoteByTrackingId } from "../../lib/quoteService";
import type { QuoteStatus } from "../../interfaces/quotes";

const statusSteps: { status: QuoteStatus; key: string }[] = [
  { status: "new", key: "received" },
  { status: "viewed", key: "review" },
  { status: "analyzing", key: "analysis" },
  { status: "quoted", key: "proposal" },
  { status: "won", key: "finalized" },
];

export default function TrackingPage() {
  const { trackingId } = useParams<{ trackingId: string }>();
  const { t } = useTranslation();
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (trackingId) {
      fetchQuote();
    }
  }, [trackingId]);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    const result = await getQuoteByTrackingId(trackingId!);
    if (result.success) {
      setQuote(result.data);
    } else {
      setError(result.error || "Quote not found");
    }
    setLoading(false);
  };

  const currentStatusIndex = statusSteps.findIndex(
    (s) => s.status === quote?.status
  );

  // If status is 'lost' or 'contacted', we map them to appropriate steps or just show current state
  const effectiveIndex =
    quote?.status === "lost"
      ? -1
      : quote?.status === "contacted"
      ? 2 // Between analysis and proposal
      : currentStatusIndex;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">
            {t("tracking.notFound")}
          </h1>
          <p className="text-slate-400 mb-8">{t("tracking.notFoundDesc")}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            {t("quoteRequest.backToHome")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-4">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              {t("quoteRequest.backToHome")}
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">
              {t("tracking.title")}
            </h1>
            <p className="text-slate-400">{t("tracking.subtitle")}</p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-sm text-slate-500 block mb-1">
              {t("tracking.details.code")}
            </span>
            <span className="text-xl font-mono font-bold text-cyan-400 bg-cyan-400/5 px-4 py-2 rounded-xl border border-cyan-400/20">
              {quote.tracking_code}
            </span>
          </div>
        </div>

        {/* Progress Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Status Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Status Timeline */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl">
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-800" />

                <div className="space-y-12">
                  {statusSteps.map((step, idx) => {
                    const isCompleted =
                      idx <= (effectiveIndex === -1 ? -1 : effectiveIndex);
                    const isCurrent = idx === effectiveIndex;

                    return (
                      <div key={idx} className="relative flex gap-6">
                        <div
                          className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg ${
                            isCompleted
                              ? "bg-cyan-400 text-slate-950 scale-110 shadow-cyan-400/20"
                              : isCurrent
                              ? "bg-slate-800 text-cyan-400 border border-cyan-400/50"
                              : "bg-slate-900 text-slate-600 border border-slate-800"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={18} />
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>

                        <div>
                          <h3
                            className={`font-bold transition-colors ${
                              isCompleted
                                ? "text-white"
                                : isCurrent
                                ? "text-cyan-400"
                                : "text-slate-500"
                            }`}
                          >
                            {t(`tracking.steps.${step.key}`)}
                          </h3>
                          <p className="text-sm text-slate-400 mt-1">
                            {isCompleted
                              ? t(`tracking.status.${step.status}`)
                              : isCurrent
                              ? "In progress..."
                              : "Pending"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Current Status Badge (Mobile Only Quote Header) */}
            <div className="md:hidden bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl flex justify-between items-center">
              <span className="text-sm text-slate-500">
                {t("tracking.details.code")}
              </span>
              <span className="text-lg font-mono font-bold text-cyan-400">
                {quote.tracking_code}
              </span>
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FileText size={20} className="text-cyan-400" />
                {t("quoteRequest.sections.project")}
              </h3>

              <div className="space-y-6">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">
                    {t("tracking.details.company")}
                  </span>
                  <div className="flex items-center gap-2 text-white">
                    <Building2 size={16} className="text-slate-400" />
                    {quote.company_name}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">
                    {t("tracking.details.systems")}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {quote.selected_systems?.map((system: string) => (
                      <span
                        key={system}
                        className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-md border border-slate-700"
                      >
                        {system}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">
                      {t("tracking.details.budget")}
                    </span>
                    <p className="text-slate-200 text-sm">
                      {t(`quoteRequest.options.budget.${quote.budget_range}`)}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">
                      {t("tracking.details.timeline")}
                    </span>
                    <p className="text-slate-200 text-sm">
                      {t(`quoteRequest.options.timeline.${quote.timeline}`)}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      {t("tracking.details.createdAt")}
                    </span>
                    <span className="text-slate-300">
                      {new Date(quote.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-slate-500">
                      {t("tracking.details.updatedAt")}
                    </span>
                    <span className="text-slate-300">
                      {new Date(quote.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-linear-to-br from-indigo-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <ShieldCheck size={80} />
              </div>
              <h4 className="text-white font-bold mb-2 relative z-10">
                Need Assistance?
              </h4>
              <p className="text-sm text-slate-300 mb-4 relative z-10">
                If you have any questions about the current status or need to
                update your requirements, contact our team.
              </p>
              <a
                href="https://wa.me/yournumber"
                target="_blank"
                className="inline-flex items-center justify-center w-full py-3 bg-white text-slate-950 rounded-xl font-bold text-sm hover:bg-cyan-400 transition-colors relative z-10 shadow-lg shadow-white/5"
              >
                Contact via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
