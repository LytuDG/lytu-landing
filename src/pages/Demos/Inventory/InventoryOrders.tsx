import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const orders = [
  {
    id: "PO-001",
    type: "Purchase",
    supplier: "Tech Distributors Inc.",
    items: 12,
    total: "$4,500",
    status: "Completed",
    date: "Oct 20, 2024",
  },
  {
    id: "SO-123",
    type: "Sales",
    customer: "Acme Corp",
    items: 5,
    total: "$1,200",
    status: "Pending",
    date: "Oct 24, 2024",
  },
  {
    id: "PO-002",
    type: "Purchase",
    supplier: "Office Supplies Co.",
    items: 50,
    total: "$850",
    status: "Processing",
    date: "Oct 25, 2024",
  },
  {
    id: "SO-124",
    type: "Sales",
    customer: "John Smith",
    items: 1,
    total: "$399",
    status: "Completed",
    date: "Oct 22, 2024",
  },
  {
    id: "PO-003",
    type: "Purchase",
    supplier: "Global Electronics",
    items: 8,
    total: "$12,400",
    status: "Cancelled",
    date: "Oct 18, 2024",
  },
];

export default function InventoryOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newOrder, setNewOrder] = useState({
    type: "Sales",
    partner: "",
    items: "",
    total: "",
  });

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.supplier &&
        order.supplier.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.customer &&
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter =
      filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateOrder = () => {
    if (!newOrder.partner) return;

    // In a real app, we would update the orders list here
    // For this demo, we'll just close the modal and show success
    setIsCreateModalOpen(false);
    setNewOrder({ type: "Sales", partner: "", items: "", total: "" });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {showSuccess && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-fade-in-down">
          <CheckCircle size={20} />
          <span className="font-medium">Order created successfully!</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-slate-400">Manage purchase and sales orders.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setNewOrder({ ...newOrder, type: "Sales" });
              setIsCreateModalOpen(true);
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
          >
            New Sales Order
          </button>
          <button
            onClick={() => {
              setNewOrder({ ...newOrder, type: "Purchase" });
              setIsCreateModalOpen(true);
            }}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-orange-500/20 flex items-center gap-2"
          >
            <Plus size={18} />
            New Purchase Order
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {["All", "Completed", "Pending", "Processing", "Cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    filterStatus === status
                      ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                      : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Partner</th>
                <th className="p-4 font-semibold">Items</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="p-4 font-mono text-orange-400 font-medium">
                    {order.id}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.type === "Purchase"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-purple-500/10 text-purple-400"
                      }`}
                    >
                      {order.type}
                    </span>
                  </td>
                  <td className="p-4 text-white">
                    {order.supplier || order.customer}
                  </td>
                  <td className="p-4 text-slate-400">{order.items} items</td>
                  <td className="p-4 font-bold text-white">{order.total}</td>
                  <td className="p-4 text-slate-400 text-sm">{order.date}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
                        order.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : order.status === "Processing" ||
                            order.status === "Pending"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {order.status === "Completed" && (
                        <CheckCircle size={12} />
                      )}
                      {(order.status === "Processing" ||
                        order.status === "Pending") && <Clock size={12} />}
                      {order.status === "Cancelled" && <XCircle size={12} />}
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Order Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                New {newOrder.type} Order
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  {newOrder.type === "Sales" ? "Customer" : "Supplier"} Name
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder={
                    newOrder.type === "Sales"
                      ? "e.g. Acme Corp"
                      : "e.g. Tech Distributors"
                  }
                  value={newOrder.partner}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, partner: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Number of Items
                  </label>
                  <input
                    type="number"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="0"
                    value={newOrder.items}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, items: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Total Amount ($)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="0.00"
                    value={newOrder.total}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, total: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrder}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-medium"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
