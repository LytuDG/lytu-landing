import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Download,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Send,
  Trash2,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  totalQuotes: number;
  totalValue: number;
  lastQuote: string;
  status: "active" | "inactive";
}

export default function QuoteClients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data
  const stats = [
    {
      label: "Total Clients",
      value: "48",
      change: "+6%",
      icon: Users,
      color: "indigo",
    },
    {
      label: "Active Clients",
      value: "42",
      change: "+8%",
      icon: TrendingUp,
      color: "green",
    },
    {
      label: "Total Quotes",
      value: "156",
      change: "+12%",
      icon: FileText,
      color: "cyan",
    },
    {
      label: "Total Revenue",
      value: "$284K",
      change: "+15%",
      icon: DollarSign,
      color: "yellow",
    },
  ];

  const clients: Client[] = [
    {
      id: "1",
      name: "Acme Corporation",
      email: "contact@acme.com",
      company: "Acme Corp",
      totalQuotes: 12,
      totalValue: 145000,
      lastQuote: "2024-11-28",
      status: "active",
    },
    {
      id: "2",
      name: "Tech Solutions Inc",
      email: "info@techsolutions.com",
      company: "Tech Solutions",
      totalQuotes: 8,
      totalValue: 98000,
      lastQuote: "2024-11-27",
      status: "active",
    },
    {
      id: "3",
      name: "Global Enterprises",
      email: "sales@global.com",
      company: "Global Ent.",
      totalQuotes: 15,
      totalValue: 220000,
      lastQuote: "2024-11-26",
      status: "active",
    },
    {
      id: "4",
      name: "Innovate Labs",
      email: "hello@innovatelabs.com",
      company: "Innovate Labs",
      totalQuotes: 5,
      totalValue: 62000,
      lastQuote: "2024-11-20",
      status: "inactive",
    },
    {
      id: "5",
      name: "Digital Dynamics",
      email: "contact@digitaldynamics.com",
      company: "Digital Dynamics",
      totalQuotes: 10,
      totalValue: 125000,
      lastQuote: "2024-11-24",
      status: "active",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Clients</h1>
          <p className="text-slate-400">
            Manage your clients and their quote history
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105">
          <Download size={20} />
          Export Report
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

      {/* Clients Table */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-xl font-bold text-white">All Clients</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search clients..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Total Quotes
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Last Quote
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">
                        {client.name}
                      </div>
                      <div className="text-slate-500 text-sm">
                        {client.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{client.company}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="text-indigo-400" size={16} />
                      <span className="text-white font-medium">
                        {client.totalQuotes}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-semibold">
                      ${client.totalValue.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(client.lastQuote).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                        client.status === "active"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                      }`}
                    >
                      {client.status.charAt(0).toUpperCase() +
                        client.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/demos/quote/client/${client.id}`}
                        className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all"
                        title="Send Quote"
                      >
                        <Send size={16} />
                      </button>
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
    </div>
  );
}
