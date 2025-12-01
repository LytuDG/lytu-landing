import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const data = [
  { name: "Jan", value: 4000, deals: 24 },
  { name: "Feb", value: 3000, deals: 18 },
  { name: "Mar", value: 2000, deals: 12 },
  { name: "Apr", value: 2780, deals: 20 },
  { name: "May", value: 1890, deals: 15 },
  { name: "Jun", value: 2390, deals: 18 },
  { name: "Jul", value: 3490, deals: 25 },
];

const pipelineData = [
  { name: "Lead", value: 45 },
  { name: "Qualified", value: 32 },
  { name: "Proposal", value: 24 },
  { name: "Negotiation", value: 18 },
  { name: "Closed", value: 12 },
];

export default function CRMDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">CRM Overview</h1>
          <p className="text-slate-400">
            Welcome back, here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium">
            Download Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20">
            Add Deal
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Revenue",
            value: "$124,500",
            change: "+12.5%",
            trend: "up",
            icon: DollarSign,
            color: "emerald",
          },
          {
            label: "Active Deals",
            value: "45",
            change: "+5.2%",
            trend: "up",
            icon: Activity,
            color: "blue",
          },
          {
            label: "Win Rate",
            value: "64%",
            change: "-2.4%",
            trend: "down",
            icon: TrendingUp,
            color: "indigo",
          },
          {
            label: "New Clients",
            value: "12",
            change: "+8.1%",
            trend: "up",
            icon: Users,
            color: "purple",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-3 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:bg-${stat.color}-500/20 transition-colors`}
              >
                <stat.icon size={24} />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
                {stat.change}
              </div>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 p-6 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Revenue Forecast</h3>
            <select className="bg-slate-800 border-none text-slate-400 text-sm rounded-lg focus:ring-0 cursor-pointer">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#64748b"
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    color: "#f8fafc",
                  }}
                  itemStyle={{ color: "#f8fafc" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Chart */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-6">Deal Pipeline</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={pipelineData}
                layout="vertical"
                margin={{ left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#64748b"
                  width={80}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    color: "#f8fafc",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deals */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Deals</h3>
            <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                company: "TechCorp Inc.",
                deal: "Enterprise License",
                value: "$24,000",
                status: "Negotiation",
                date: "2h ago",
              },
              {
                company: "Global Solutions",
                deal: "Consulting Package",
                value: "$12,500",
                status: "Proposal",
                date: "5h ago",
              },
              {
                company: "StartUp Labs",
                deal: "Basic Plan",
                value: "$3,000",
                status: "Qualified",
                date: "1d ago",
              },
              {
                company: "Media Group",
                deal: "Custom Development",
                value: "$45,000",
                status: "Lead",
                date: "2d ago",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 hover:bg-slate-800/50 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                    {item.company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{item.company}</h4>
                    <p className="text-xs text-slate-400">{item.deal}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{item.value}</p>
                  <p className="text-xs text-slate-500">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Upcoming Tasks</h3>
            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Client Meeting with TechCorp",
                type: "Meeting",
                time: "10:00 AM",
                color: "blue",
              },
              {
                title: "Send proposal to Global Solutions",
                type: "Email",
                time: "2:00 PM",
                color: "purple",
              },
              {
                title: "Follow up with StartUp Labs",
                type: "Call",
                time: "4:30 PM",
                color: "emerald",
              },
              {
                title: "Update Q3 Sales Report",
                type: "Task",
                time: "Tomorrow",
                color: "orange",
              },
            ].map((task, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-3 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
              >
                <div
                  className={`mt-1 w-2 h-2 rounded-full bg-${task.color}-500 shadow-[0_0_8px] shadow-${task.color}-500/50`}
                ></div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar size={12} />
                      {task.time}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full bg-${task.color}-500/10 text-${task.color}-400 border border-${task.color}-500/20`}
                    >
                      {task.type}
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="mt-1 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-indigo-500/20"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
