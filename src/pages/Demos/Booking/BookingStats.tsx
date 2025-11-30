import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
} from "lucide-react";

export default function BookingStats() {
  const [timeRange, setTimeRange] = useState("30d");

  // Mock Data
  // Mock Data Generators
  const getRevenueData = (range: string) => {
    const baseData = [
      { name: "Mon", value: 4000 },
      { name: "Tue", value: 3000 },
      { name: "Wed", value: 2000 },
      { name: "Thu", value: 2780 },
      { name: "Fri", value: 1890 },
      { name: "Sat", value: 2390 },
      { name: "Sun", value: 3490 },
    ];

    if (range === "7d") return baseData;
    if (range === "30d")
      return baseData.map((d) => ({ ...d, value: d.value * 4 }));
    if (range === "90d")
      return baseData.map((d) => ({ ...d, value: d.value * 12 }));
    return baseData.map((d) => ({ ...d, value: d.value * 52 }));
  };

  const getBookingsData = (range: string) => {
    const base = [
      { name: "Consultation", value: 45 },
      { name: "Development", value: 30 },
      { name: "Design", value: 25 },
      { name: "Marketing", value: 15 },
    ];

    const multiplier =
      range === "7d" ? 1 : range === "30d" ? 4 : range === "90d" ? 12 : 48;
    return base.map((item) => ({ ...item, value: item.value * multiplier }));
  };

  const revenueData = getRevenueData(timeRange);
  const bookingsData = getBookingsData(timeRange);

  const customerStatusData = [
    { name: "Active", value: 850, color: "#6366f1" }, // Indigo
    { name: "Inactive", value: 120, color: "#94a3b8" }, // Slate
    { name: "New", value: 230, color: "#10b981" }, // Emerald
  ];

  const StatCard = ({
    title,
    value,
    change,
    isPositive,
    icon: Icon,
    color,
  }: any) => (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg bg-${color}-500/10 text-${color}-400`}>
          <Icon size={24} />
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {change}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-slate-400 text-sm">{title}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics & Reports</h1>
          <p className="text-slate-400">
            Track your business performance and growth.
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 3 Months</option>
          <option value="1y">Last Year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$48,200"
          change="+12.5%"
          isPositive={true}
          icon={DollarSign}
          color="indigo"
        />
        <StatCard
          title="Total Bookings"
          value="1,248"
          change="+8.2%"
          isPositive={true}
          icon={Calendar}
          color="emerald"
        />
        <StatCard
          title="New Customers"
          value="142"
          change="-2.1%"
          isPositive={false}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Avg. Order Value"
          value="$350"
          change="+5.4%"
          isPositive={true}
          icon={TrendingUp}
          color="amber"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Revenue Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#6366f1" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings by Service */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">
            Bookings by Service
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    color: "#fff",
                  }}
                  cursor={{ fill: "#1e293b" }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Status Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">
            Customer Distribution
          </h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderColor: "#334155",
                    color: "#f8fafc",
                    borderRadius: "8px",
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ color: "#f8fafc" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {customerStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-slate-400">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
                  {i !== 3 && (
                    <div className="h-full w-px bg-slate-800 my-1"></div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-white">
                    <span className="font-bold">Sarah Johnson</span> booked a
                    consultation.
                  </p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
