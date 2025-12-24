import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  Filter,
  RefreshCw,
  Eye,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Copy,
} from "lucide-react";
import {
  fetchQuoteRequests,
  updateQuoteStatus,
  subscribeToQuotes,
} from "../../lib/adminQuoteService";
import type { QuoteRequest, QuoteStatus } from "../../interfaces/quotes";

const statusColors: Record<QuoteStatus, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  viewed: "bg-purple-100 text-purple-800 border-purple-200",
  analyzing: "bg-yellow-100 text-yellow-800 border-yellow-200",
  contacted: "bg-indigo-100 text-indigo-800 border-indigo-200",
  quoted: "bg-cyan-100 text-cyan-800 border-cyan-200",
  won: "bg-green-100 text-green-800 border-green-200",
  lost: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels: Record<QuoteStatus, string> = {
  new: "New",
  viewed: "Viewed",
  analyzing: "Analyzing",
  contacted: "Contacted",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
};

export default function QuotesPage() {
  const { t } = useTranslation();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "all">("all");
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadQuotes();

    // Subscribe to real-time updates
    const subscription = subscribeToQuotes((payload) => {
      console.log("Quote updated:", payload);
      loadQuotes();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [statusFilter, searchTerm]);

  const loadQuotes = async () => {
    setLoading(true);
    const result = await fetchQuoteRequests({
      status: statusFilter !== "all" ? statusFilter : undefined,
      search: searchTerm || undefined,
    });

    if (result.success) {
      setQuotes(result.data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (
    quoteId: string,
    newStatus: QuoteStatus
  ) => {
    const result = await updateQuoteStatus(quoteId, newStatus);
    if (result.success) {
      loadQuotes();
      if (selectedQuote?.id === quoteId) {
        setSelectedQuote(result.data as any);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 40) return "text-green-600 bg-green-50";
    if (score >= 20) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const copyPublicLink = (publicTrackingId: string) => {
    const publicUrl = `${window.location.origin}/track/${publicTrackingId}`;
    navigator.clipboard.writeText(publicUrl);
    setCopiedId(publicTrackingId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openPublicLink = (publicTrackingId: string) => {
    const publicUrl = `${window.location.origin}/track/${publicTrackingId}`;
    window.open(publicUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
          <p className="text-gray-500">Manage and track all quote requests</p>
        </div>
        <button
          onClick={loadQuotes}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by email, company, or tracking code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as QuoteStatus | "all")
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quotes List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
      ) : quotes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No quotes found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {quotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-medium text-gray-900">
                        {quote.tracking_code}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {quote.company_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {quote.business_type}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Mail size={14} />
                        {quote.email}
                      </div>
                      {quote.contact_preference === "whatsapp" &&
                        quote.whatsapp_number && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Phone size={14} />
                            {quote.whatsapp_number}
                          </div>
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <DollarSign size={14} />
                        {t(`quoteRequest.options.budget.${quote.budget_range}`)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLeadScoreColor(
                          quote.lead_score
                        )}`}
                      >
                        {quote.lead_score}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={quote.status}
                        onChange={(e) =>
                          handleStatusChange(
                            quote.id,
                            e.target.value as QuoteStatus
                          )
                        }
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border cursor-pointer ${
                          statusColors[quote.status]
                        }`}
                      >
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(quote.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedQuote(quote);
                            setIsDetailOpen(true);
                          }}
                          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-900 font-medium"
                        >
                          <Eye size={16} />
                          View
                        </button>
                        <button
                          onClick={() =>
                            openPublicLink(quote.public_tracking_id)
                          }
                          className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                          title="Open public tracking page"
                        >
                          <ExternalLink size={16} />
                        </button>
                        <button
                          onClick={() =>
                            copyPublicLink(quote.public_tracking_id)
                          }
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          title="Copy public link"
                        >
                          {copiedId === quote.public_tracking_id ? (
                            <CheckCircle size={16} className="text-green-600" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isDetailOpen && selectedQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">
                  Quote Details
                </h2>
                <p className="text-sm text-gray-500 font-mono">
                  {selectedQuote.tracking_code}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      openPublicLink(selectedQuote.public_tracking_id)
                    }
                    className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    <ExternalLink size={14} />
                    Open Public Page
                  </button>
                  <button
                    onClick={() =>
                      copyPublicLink(selectedQuote.public_tracking_id)
                    }
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 font-medium"
                  >
                    {copiedId === selectedQuote.public_tracking_id ? (
                      <>
                        <CheckCircle size={14} className="text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Company Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Company Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Company Name
                    </label>
                    <p className="text-gray-900">
                      {selectedQuote.company_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Business Type
                    </label>
                    <p className="text-gray-900">
                      {selectedQuote.business_type}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedQuote.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Contact Preference
                    </label>
                    <p className="text-gray-900 capitalize">
                      {selectedQuote.contact_preference}
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Project Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Main Problem
                    </label>
                    <p className="text-gray-900">
                      {selectedQuote.main_problem}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Selected Systems
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedQuote.selected_systems.map((system) => (
                        <span
                          key={system}
                          className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                        >
                          {system}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Budget Range
                      </label>
                      <p className="text-gray-900">
                        {t(
                          `quoteRequest.options.budget.${selectedQuote.budget_range}`
                        )}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Timeline
                      </label>
                      <p className="text-gray-900">
                        {t(
                          `quoteRequest.options.timeline.${selectedQuote.timeline}`
                        )}
                      </p>
                    </div>
                  </div>
                  {selectedQuote.extra_details && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Additional Details
                      </label>
                      <p className="text-gray-900">
                        {selectedQuote.extra_details}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Tracking & Metadata
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Lead Score
                    </label>
                    <p
                      className={`font-semibold ${getLeadScoreColor(
                        selectedQuote.lead_score
                      )}`}
                    >
                      {selectedQuote.lead_score}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <p className="text-gray-900 capitalize">
                      {selectedQuote.status}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Created At
                    </label>
                    <p className="text-gray-900">
                      {formatDate(selectedQuote.created_at)}
                    </p>
                  </div>
                  {selectedQuote.utm_source && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        UTM Source
                      </label>
                      <p className="text-gray-900">
                        {selectedQuote.utm_source}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
