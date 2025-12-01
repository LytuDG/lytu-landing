import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  RefreshCw,
  Search,
  Download,
  CheckCircle2,
} from "lucide-react";

const movements = [
  {
    id: 1,
    type: "in",
    product: "MacBook Pro 16",
    qty: 10,
    reason: "Purchase Order #PO-001",
    date: "Oct 24, 2024 10:30 AM",
    user: "John Doe",
  },
  {
    id: 2,
    type: "out",
    product: "iPhone 15 Pro",
    qty: 2,
    reason: "Sales Order #SO-123",
    date: "Oct 24, 2024 11:15 AM",
    user: "Jane Smith",
  },
  {
    id: 3,
    type: "adj",
    product: "Ergonomic Chair",
    qty: -1,
    reason: "Damaged Stock",
    date: "Oct 23, 2024 04:45 PM",
    user: "Mike Johnson",
  },
  {
    id: 4,
    type: "in",
    product: "USB-C Hub",
    qty: 50,
    reason: "Restock",
    date: "Oct 23, 2024 09:00 AM",
    user: "Sarah Williams",
  },
  {
    id: 5,
    type: "out",
    product: "4K Monitor 27",
    qty: 1,
    reason: "Sales Order #SO-124",
    date: "Oct 22, 2024 02:20 PM",
    user: "Jane Smith",
  },
  {
    id: 6,
    type: "in",
    product: "Mechanical Keyboard",
    qty: 20,
    reason: "Purchase Order #PO-002",
    date: "Oct 22, 2024 11:00 AM",
    user: "John Doe",
  },
];

export default function InventoryMovements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [exportStatus, setExportStatus] = useState<
    "idle" | "exporting" | "success"
  >("idle");

  const filteredMovements = movements.filter(
    (move) =>
      move.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      move.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      move.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-white">Stock Movements</h1>
          <p className="text-slate-400">
            Track history of all inventory changes.
          </p>
        </div>
        <div className="flex gap-2">
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
                Exported
              </>
            ) : (
              <>
                <Download size={16} />
                Export History
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search movements..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold">Quantity</th>
                <th className="p-4 font-semibold">Reason</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredMovements.map((move) => (
                <tr
                  key={move.id}
                  className="hover:bg-slate-800/50 transition-colors"
                >
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
                        move.type === "in"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : move.type === "out"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      }`}
                    >
                      {move.type === "in" && <ArrowDownRight size={12} />}
                      {move.type === "out" && <ArrowUpRight size={12} />}
                      {move.type === "adj" && <RefreshCw size={12} />}
                      {move.type === "in"
                        ? "Inbound"
                        : move.type === "out"
                        ? "Outbound"
                        : "Adjustment"}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-white">{move.product}</td>
                  <td
                    className={`p-4 font-bold ${
                      move.type === "in"
                        ? "text-emerald-400"
                        : move.type === "out"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {move.type === "in" ? "+" : ""}
                    {move.qty}
                  </td>
                  <td className="p-4 text-slate-400">{move.reason}</td>
                  <td className="p-4 text-slate-400 text-sm">{move.date}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">
                        {move.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm text-slate-300">
                        {move.user}
                      </span>
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
