import { useState } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  Download,
  CheckCircle2,
} from "lucide-react";

const orders = [
  {
    id: "#ORD-7352",
    customer: "Alex Thompson",
    date: "Oct 24, 2023",
    total: "$299.00",
    status: "Completed",
    items: 2,
  },
  {
    id: "#ORD-7351",
    customer: "Sarah Miller",
    date: "Oct 24, 2023",
    total: "$450.00",
    status: "Processing",
    items: 1,
  },
  {
    id: "#ORD-7350",
    customer: "James Wilson",
    date: "Oct 23, 2023",
    total: "$129.00",
    status: "Shipped",
    items: 3,
  },
  {
    id: "#ORD-7349",
    customer: "Emily Davis",
    date: "Oct 23, 2023",
    total: "$399.00",
    status: "Completed",
    items: 1,
  },
  {
    id: "#ORD-7348",
    customer: "Michael Brown",
    date: "Oct 22, 2023",
    total: "$89.00",
    status: "Pending",
    items: 4,
  },
  {
    id: "#ORD-7347",
    customer: "Lisa Anderson",
    date: "Oct 22, 2023",
    total: "$599.00",
    status: "Cancelled",
    items: 1,
  },
];

export default function EcommerceOrders() {
  const [exportStatus, setExportStatus] = useState<
    "idle" | "exporting" | "success"
  >("idle");

  const handleExport = () => {
    setExportStatus("exporting");
    setTimeout(() => {
      setExportStatus("success");
      setTimeout(() => setExportStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-slate-400">Manage and track customer orders.</p>
        </div>
        <button
          onClick={handleExport}
          disabled={exportStatus !== "idle"}
          className={`px-4 py-2 rounded-lg transition-all text-sm font-medium flex items-center gap-2 ${
            exportStatus === "success"
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
              : "bg-slate-800 hover:bg-slate-700 text-white"
          }`}
        >
          {exportStatus === "exporting" ? (
            <>Exporting...</>
          ) : exportStatus === "success" ? (
            <>
              <CheckCircle2 size={16} />
              Orders Exported
            </>
          ) : (
            <>
              <Download size={16} />
              Export Orders
            </>
          )}
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500">
              <option>All Statuses</option>
              <option>Completed</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-400">{order.date}</td>
                  <td className="px-6 py-4 text-slate-400">{order.items}</td>
                  <td className="px-6 py-4 text-white font-medium">
                    {order.total}
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
                          : order.status === "Pending"
                          ? "bg-orange-500/10 text-orange-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-400 transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white transition-colors">
                        <MoreHorizontal size={18} />
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
