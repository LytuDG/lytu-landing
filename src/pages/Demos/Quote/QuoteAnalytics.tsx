import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  CheckCircle,
  BarChart3,
  PieChart,
} from "lucide-react";

export default function QuoteAnalytics() {
  const [timeRange, setTimeRange] = useState("month");

  // Mock data
  const stats = [
    {
      label: "Total Revenue",
      value: "$284,500",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      label: "Quotes Sent",
      value: "156",
      change: "+12.5%",
      trend: "up",
      icon: FileText,
      color: "indigo",
    },
    {
      label: "Approval Rate",
      value: "57.1%",
      change: "+3.2%",
      trend: "up",
      icon: CheckCircle,
      color: "cyan",
    },
    {
      label: "Avg. Quote Value",
      value: "$1,824",
      change: "-2.1%",
      trend: "down",
      icon: BarChart3,
      color: "yellow",
    },
  ];

  const monthlyData = [
    { month: "Jan", quotes: 12, revenue: 18500, approved: 7 },
    { month: "Feb", quotes: 15, revenue: 22000, approved: 9 },
    { month: "Mar", quotes: 18, revenue: 28500, approved: 11 },
    { month: "Apr", quotes: 14, revenue: 21000, approved: 8 },
    { month: "May", quotes: 20, revenue: 32000, approved: 12 },
    { month: "Jun", quotes: 22, revenue: 35500, approved: 13 },
    { month: "Jul", quotes: 19, revenue: 29500, approved: 11 },
    { month: "Aug", quotes: 24, revenue: 38000, approved: 14 },
    { month: "Sep", quotes: 21, revenue: 33500, approved: 12 },
    { month: "Oct", quotes: 25, revenue: 40000, approved: 15 },
    { month: "Nov", quotes: 23, revenue: 36500, approved: 13 },
    { month: "Dec", quotes: 18, revenue: 28000, approved: 10 },
  ];

  const statusBreakdown = [
    { status: "Approved", count: 89, percentage: 57, color: "green" },
    { status: "Pending", count: 42, percentage: 27, color: "blue" },
    { status: "Rejected", count: 18, percentage: 12, color: "red" },
    { status: "Expired", count: 7, percentage: 4, color: "orange" },
  ];

  const topClients = [
    { name: "Global Enterprises", quotes: 15, value: 220000 },
    { name: "Acme Corporation", quotes: 12, value: 145000 },
    { name: "Digital Dynamics", quotes: 10, value: 125000 },
    { name: "Tech Solutions Inc", quotes: 8, value: 98000 },
    { name: "Innovate Labs", quotes: 5, value: 62000 },
  ];

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Analytics & Reports
          </h1>
          <p className="text-slate-400">
            Track your quote performance and insights
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
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
                <div
                  className={`flex items-center gap-1 ${
                    stat.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <TrendIcon size={16} />
                  <span className="text-sm font-semibold">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Monthly Revenue</h2>
            <BarChart3 className="text-indigo-400" size={24} />
          </div>
          <div className="space-y-3">
            {monthlyData.slice(-6).map((data, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">{data.month}</span>
                  <span className="text-sm font-semibold text-white">
                    ${data.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${(data.revenue / maxRevenue) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Quote Status</h2>
            <PieChart className="text-indigo-400" size={24} />
          </div>
          <div className="space-y-4">
            {statusBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full bg-${item.color}-500`}
                    />
                    <span className="text-sm text-slate-400">
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-white">
                      {item.count}
                    </span>
                    <span className="text-xs text-slate-500 w-12 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-${item.color}-500 rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Clients */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Top Clients</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Total Quotes
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {topClients.map((client, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{client.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="text-indigo-400" size={16} />
                      <span className="text-white font-medium">
                        {client.quotes}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-semibold">
                      ${client.value.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                        style={{
                          width: `${
                            (client.value / topClients[0].value) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Activity Timeline */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          Quote Activity Over Time
        </h2>
        <div className="grid grid-cols-12 gap-2">
          {monthlyData.map((data, index) => {
            const height =
              (data.quotes / Math.max(...monthlyData.map((d) => d.quotes))) *
              100;
            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="w-full h-32 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-500 to-cyan-500 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer group relative"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {data.quotes} quotes
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-500">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
