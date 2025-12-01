import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Send,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MoreVertical,
  ChevronDown,
} from "lucide-react";

interface Quote {
  id: string;
  number: string;
  client: string;
  email: string;
  total: number;
  status: "draft" | "sent" | "approved" | "rejected" | "expired";
  date: string;
  expiryDate: string;
  items: number;
}

export default function QuoteList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);

  // Mock data - Extended list
  const allQuotes: Quote[] = [
    {
      id: "1",
      number: "QT-2024-001",
      client: "Acme Corporation",
      email: "contact@acme.com",
      total: 15420,
      status: "sent",
      date: "2024-11-28",
      expiryDate: "2024-12-28",
      items: 5,
    },
    {
      id: "2",
      number: "QT-2024-002",
      client: "Tech Solutions Inc",
      email: "info@techsolutions.com",
      total: 8750,
      status: "approved",
      date: "2024-11-27",
      expiryDate: "2024-12-27",
      items: 3,
    },
    {
      id: "3",
      number: "QT-2024-003",
      client: "Global Enterprises",
      email: "sales@global.com",
      total: 22100,
      status: "draft",
      date: "2024-11-26",
      expiryDate: "2024-12-26",
      items: 8,
    },
    {
      id: "4",
      number: "QT-2024-004",
      client: "Innovate Labs",
      email: "hello@innovatelabs.com",
      total: 12300,
      status: "rejected",
      date: "2024-11-25",
      expiryDate: "2024-12-25",
      items: 4,
    },
    {
      id: "5",
      number: "QT-2024-005",
      client: "Digital Dynamics",
      email: "contact@digitaldynamics.com",
      total: 18900,
      status: "sent",
      date: "2024-11-24",
      expiryDate: "2024-12-24",
      items: 6,
    },
    {
      id: "6",
      number: "QT-2024-006",
      client: "Future Tech Co",
      email: "info@futuretech.com",
      total: 9500,
      status: "approved",
      date: "2024-11-23",
      expiryDate: "2024-12-23",
      items: 2,
    },
    {
      id: "7",
      number: "QT-2024-007",
      client: "Smart Systems",
      email: "contact@smartsystems.com",
      total: 16800,
      status: "sent",
      date: "2024-11-22",
      expiryDate: "2024-12-22",
      items: 7,
    },
    {
      id: "8",
      number: "QT-2024-008",
      client: "Cloud Innovations",
      email: "hello@cloudinnovations.com",
      total: 11200,
      status: "expired",
      date: "2024-10-15",
      expiryDate: "2024-11-15",
      items: 4,
    },
    {
      id: "9",
      number: "QT-2024-009",
      client: "Data Masters",
      email: "info@datamasters.com",
      total: 24500,
      status: "approved",
      date: "2024-11-21",
      expiryDate: "2024-12-21",
      items: 9,
    },
    {
      id: "10",
      number: "QT-2024-010",
      client: "Web Wizards",
      email: "contact@webwizards.com",
      total: 7800,
      status: "draft",
      date: "2024-11-20",
      expiryDate: "2024-12-20",
      items: 3,
    },
  ];

  const getStatusColor = (status: Quote["status"]) => {
    const colors = {
      draft: "bg-slate-500/10 text-slate-400 border-slate-500/20",
      sent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      approved: "bg-green-500/10 text-green-400 border-green-500/20",
      rejected: "bg-red-500/10 text-red-400 border-red-500/20",
      expired: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    };
    return colors[status];
  };

  const getStatusIcon = (status: Quote["status"]) => {
    const icons = {
      draft: Clock,
      sent: Send,
      approved: CheckCircle,
      rejected: XCircle,
      expired: Calendar,
    };
    const Icon = icons[status];
    return <Icon size={14} />;
  };

  const toggleQuoteSelection = (id: string) => {
    setSelectedQuotes((prev) =>
      prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedQuotes.length === allQuotes.length) {
      setSelectedQuotes([]);
    } else {
      setSelectedQuotes(allQuotes.map((q) => q.id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on quotes:`, selectedQuotes);
    setSelectedQuotes([]);
  };

  // Filter and sort quotes
  const filteredQuotes = allQuotes
    .filter((quote) => {
      const matchesSearch =
        quote.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || quote.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-desc":
          return b.total - a.total;
        case "amount-asc":
          return a.total - b.total;
        case "client-asc":
          return a.client.localeCompare(b.client);
        default:
          return 0;
      }
    });

  const handleExport = () => {
    // Generate CSV content
    const headers = [
      "Quote #",
      "Client",
      "Email",
      "Items",
      "Total",
      "Status",
      "Date",
      "Expiry",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredQuotes.map((q) =>
        [
          q.number,
          `"${q.client}"`,
          q.email,
          q.items,
          q.total,
          q.status,
          q.date,
          q.expiryDate,
        ].join(",")
      ),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "quotes_export.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">All Quotes</h1>
          <p className="text-slate-400">
            Manage and track all your business quotes
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all border border-slate-700"
          >
            <Download size={20} />
            Export CSV
          </button>
          <Link
            to="/demos/quote/create"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
          >
            <Plus size={20} />
            New Quote
          </Link>
        </div>
      </div>

      {/* Filters and Actions Bar */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by quote number, client name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="expired">Expired</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
              <option value="client-asc">Client A-Z</option>
            </select>

            <button className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-indigo-500 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedQuotes.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-sm text-slate-400">
              {selectedQuotes.length} quote
              {selectedQuotes.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("send")}
                className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-sm font-semibold hover:bg-blue-500/20 transition-all"
              >
                <Send size={16} className="inline mr-2" />
                Send
              </button>
              <button
                onClick={() => handleBulkAction("download")}
                className="px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-sm font-semibold hover:bg-indigo-500/20 transition-all"
              >
                <Download size={16} className="inline mr-2" />
                Download
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm font-semibold hover:bg-red-500/20 transition-all"
              >
                <Trash2 size={16} className="inline mr-2" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quotes Table */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedQuotes.length === filteredQuotes.length &&
                      filteredQuotes.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Quote #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Expiry
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      selectedQuotes.includes(quote.id) ? "bg-slate-800/20" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedQuotes.includes(quote.id)}
                        onChange={() => toggleQuoteSelection(quote.id)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FileText className="text-indigo-400" size={16} />
                        <span className="text-white font-medium">
                          {quote.number}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-white font-medium">
                          {quote.client}
                        </div>
                        <div className="text-slate-500 text-sm">
                          {quote.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-slate-400">
                        {quote.items} items
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-white font-semibold">
                        ${quote.total.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          quote.status
                        )}`}
                      >
                        {getStatusIcon(quote.status)}
                        {quote.status.charAt(0).toUpperCase() +
                          quote.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                      {new Date(quote.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-slate-400">
                        {new Date(quote.expiryDate).toLocaleDateString()}
                      </div>
                      {quote.status === "sent" &&
                        new Date(quote.expiryDate) < new Date() && (
                          <div className="text-xs text-orange-400 mt-1">
                            Expiring soon
                          </div>
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/demos/quote/view/${quote.id}`}
                          className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
                          title="View"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          to={`/demos/quote/edit/${quote.id}`}
                          className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
                          title="More"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Search size={48} className="text-slate-600" />
                      <p className="text-lg font-medium text-white">
                        No quotes found
                      </p>
                      <p className="text-sm">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Showing <span className="font-semibold text-white">1-10</span> of{" "}
            <span className="font-semibold text-white">10</span> quotes
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
              1
            </button>
            <button className="px-4 py-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
