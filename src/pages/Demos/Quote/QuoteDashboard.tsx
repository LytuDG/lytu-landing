import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Send,
  DollarSign,
  Users,
  Calendar,
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

export default function QuoteDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showNewQuoteModal, setShowNewQuoteModal] = useState(false);

  // Mock data
  const stats = [
    {
      label: "Total Quotes",
      value: "156",
      change: "+12%",
      icon: FileText,
      color: "indigo",
    },
    {
      label: "Approved",
      value: "89",
      change: "+8%",
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Pending",
      value: "42",
      change: "+5%",
      icon: Clock,
      color: "yellow",
    },
    {
      label: "Total Value",
      value: "$284K",
      change: "+15%",
      icon: DollarSign,
      color: "cyan",
    },
  ];

  const recentQuotes: Quote[] = [
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Quote Management
          </h1>
          <p className="text-slate-400">
            Create, manage, and track your business quotes
          </p>
        </div>
        <button
          onClick={() => setShowNewQuoteModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
        >
          <Plus size={20} />
          New Quote
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-${stat.color}-500/10 group-hover:bg-${stat.color}-500/20 transition-colors`}
                >
                  <Icon className={`text-${stat.color}-400`} size={24} />
                </div>
                <span className="text-green-400 text-sm font-semibold">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Quotes */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-xl font-bold text-white">Recent Quotes</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search quotes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors w-full sm:w-64"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recentQuotes.map((quote) => (
                <tr
                  key={quote.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
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
                    <span className="text-slate-400">{quote.items} items</span>
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Quote Modal */}
      {showNewQuoteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-white mb-6">
              Create New Quote
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Client Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="client@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Quote Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewQuoteModal(false)}
                className="flex-1 px-6 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <Link
                to="/demos/quote/create"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all text-center"
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
