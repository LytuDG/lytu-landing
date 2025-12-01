import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Download,
  CheckCircle2,
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

const stockValueData = [
  { name: "Mon", value: 45000 },
  { name: "Tue", value: 47000 },
  { name: "Wed", value: 46500 },
  { name: "Thu", value: 48000 },
  { name: "Fri", value: 49500 },
  { name: "Sat", value: 51000 },
  { name: "Sun", value: 50500 },
];

const categoryData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Home", value: 300 },
  { name: "Sports", value: 200 },
];

export default function InventoryDashboard() {
  const navigate = useNavigate();
  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "downloading" | "success"
  >("idle");

  const handleDownloadReport = () => {
    setDownloadStatus("downloading");
    setTimeout(() => {
      setDownloadStatus("success");
      setTimeout(() => setDownloadStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Inventory Overview</h1>
          <p className="text-slate-400">
            Real-time snapshot of your stock and operations.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadReport}
            disabled={downloadStatus !== "idle"}
            className={`px-4 py-2 rounded-lg transition-all text-sm font-medium flex items-center gap-2 ${
              downloadStatus === "success"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                : "bg-slate-800 hover:bg-slate-700 text-white"
            }`}
          >
            {downloadStatus === "downloading" ? (
              <>Downloading...</>
            ) : downloadStatus === "success" ? (
              <>
                <CheckCircle2 size={16} />
                Report Downloaded
              </>
            ) : (
              <>
                <Download size={16} />
                Download Report
              </>
            )}
          </button>
          <button
            onClick={() => navigate("/demos/inventory/products")}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-orange-500/20 flex items-center gap-2"
          >
            <Package size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Package className="text-blue-400" size={24} />
            </div>
            <span className="flex items-center text-emerald-400 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" />
              +12%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Total Products</h3>
          <p className="text-2xl font-bold text-white mt-1">1,245</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg">
              <DollarSign className="text-emerald-400" size={24} />
            </div>
            <span className="flex items-center text-emerald-400 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" />
              +5.4%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">
            Total Stock Value
          </h3>
          <p className="text-2xl font-bold text-white mt-1">$524,890</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <AlertTriangle className="text-red-400" size={24} />
            </div>
            <span className="flex items-center text-red-400 text-sm font-medium bg-red-500/10 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" />
              +3
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">
            Low Stock Items
          </h3>
          <p className="text-2xl font-bold text-white mt-1">24</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <ShoppingCart className="text-purple-400" size={24} />
            </div>
            <span className="flex items-center text-emerald-400 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" />
              +8%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Pending Orders</h3>
          <p className="text-2xl font-bold text-white mt-1">18</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">
            Stock Value Trend
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stockValueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
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
                />
                <YAxis
                  stroke="#64748b"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    color: "#f8fafc",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#f97316"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">
            Stock by Category
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  horizontal={false}
                />
                <XAxis type="number" stroke="#64748b" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#64748b"
                  width={80}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    color: "#f8fafc",
                  }}
                  cursor={{ fill: "transparent" }}
                />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          Recent Stock Movements
        </h3>
        <div className="space-y-4">
          {[
            {
              item: "MacBook Pro M3",
              type: "out",
              qty: 2,
              time: "10 mins ago",
              user: "John Doe",
            },
            {
              item: "Samsung Galaxy S24",
              type: "in",
              qty: 50,
              time: "1 hour ago",
              user: "Jane Smith",
            },
            {
              item: "Office Chair Ergonomic",
              type: "out",
              qty: 5,
              time: "2 hours ago",
              user: "Mike Johnson",
            },
            {
              item: "Wireless Mouse",
              type: "in",
              qty: 100,
              time: "4 hours ago",
              user: "Sarah Williams",
            },
          ].map((move, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-800"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    move.type === "in"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {move.type === "in" ? (
                    <ArrowDownRight size={20} />
                  ) : (
                    <ArrowUpRight size={20} />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-white">{move.item}</h4>
                  <p className="text-sm text-slate-400">by {move.user}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    move.type === "in" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {move.type === "in" ? "+" : "-"}
                  {move.qty}
                </p>
                <p className="text-xs text-slate-500">{move.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
