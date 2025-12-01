import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Activity,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 4500 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 5890 },
  { name: "Sat", value: 4390 },
  { name: "Sun", value: 6490 },
];

const salesByCategory = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Home", value: 300 },
  { name: "Beauty", value: 200 },
];

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"];

const recentOrders = [
  {
    id: "#ORD-7352",
    customer: "Alex Thompson",
    product: "Premium Wireless Headphones",
    amount: "$299.00",
    status: "Completed",
    date: "2 mins ago",
    avatar: "AT",
    color: "bg-blue-500",
  },
  {
    id: "#ORD-7351",
    customer: "Sarah Miller",
    product: "Ergonomic Office Chair",
    amount: "$450.00",
    status: "Processing",
    date: "15 mins ago",
    avatar: "SM",
    color: "bg-purple-500",
  },
  {
    id: "#ORD-7350",
    customer: "James Wilson",
    product: "Mechanical Keyboard",
    amount: "$129.00",
    status: "Shipped",
    date: "1 hour ago",
    avatar: "JW",
    color: "bg-green-500",
  },
  {
    id: "#ORD-7349",
    customer: "Emily Davis",
    product: "4K Monitor 27inch",
    amount: "$399.00",
    status: "Completed",
    date: "3 hours ago",
    avatar: "ED",
    color: "bg-pink-500",
  },
  {
    id: "#ORD-7348",
    customer: "Michael Brown",
    product: "USB-C Docking Station",
    amount: "$89.00",
    status: "Pending",
    date: "5 hours ago",
    avatar: "MB",
    color: "bg-orange-500",
  },
];

export default function EcommerceDashboard() {
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Store Overview</h1>
          <p className="text-slate-400">
            Monitor your sales, orders, and customer activity.
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
                Report Saved
              </>
            ) : (
              <>
                <Download size={16} />
                Export Report
              </>
            )}
          </button>
          <button
            onClick={() => navigate("/demos/ecommerce/products")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20 flex items-center gap-2"
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
            <div className="p-3 bg-indigo-500/10 rounded-lg">
              <DollarSign className="text-indigo-400" size={24} />
            </div>
            <span className="flex items-center text-emerald-400 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" />
              +15.3%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Total Revenue</h3>
          <p className="text-2xl font-bold text-white mt-1">$48,295.00</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <ShoppingBag className="text-purple-400" size={24} />
            </div>
            <span className="flex items-center text-emerald-400 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" />
              +8.2%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Total Orders</h3>
          <p className="text-2xl font-bold text-white mt-1">1,482</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-pink-500/10 rounded-lg">
              <Users className="text-pink-400" size={24} />
            </div>
            <span className="flex items-center text-red-400 text-sm font-medium bg-red-500/10 px-2 py-1 rounded">
              <ArrowDownRight size={14} className="mr-1" />
              -2.1%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">New Customers</h3>
          <p className="text-2xl font-bold text-white mt-1">342</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Activity className="text-orange-400" size={24} />
            </div>
            <span className="flex items-center text-emerald-400 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" />
              +4.5%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Conversion Rate</h3>
          <p className="text-2xl font-bold text-white mt-1">3.24%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Revenue Analytics</h3>
            <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
                />
                <YAxis
                  stroke="#64748b"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
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
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">
            Sales by Category
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {salesByCategory.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    color: "#f8fafc",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {salesByCategory.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm text-slate-300">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-white">
                  {item.value} sales
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Recent Orders</h3>
            <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full ${order.color} flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {order.avatar}
                        </div>
                        <span className="text-sm text-slate-300">
                          {order.customer}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : order.status === "Processing"
                            ? "bg-blue-500/10 text-blue-400"
                            : order.status === "Shipped"
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-orange-500/10 text-orange-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Top Products</h3>
          <div className="space-y-6">
            {[
              {
                name: "Wireless Headphones",
                sales: "1,234",
                revenue: "$123.4k",
                trend: "+12%",
              },
              {
                name: "Smart Watch Series 7",
                sales: "856",
                revenue: "$234.1k",
                trend: "+8%",
              },
              {
                name: "Mechanical Keyboard",
                sales: "645",
                revenue: "$89.5k",
                trend: "+24%",
              },
              {
                name: "Gaming Mouse",
                sales: "432",
                revenue: "$34.2k",
                trend: "+5%",
              },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">
                      {product.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {product.sales} sales
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    {product.revenue}
                  </p>
                  <p className="text-xs text-emerald-400">{product.trend}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
}
