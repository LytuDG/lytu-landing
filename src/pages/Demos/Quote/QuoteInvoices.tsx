import {
  FileText,
  Download,
  Send,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const invoices = [
  {
    id: "INV-2024-001",
    client: "TechCorp Inc.",
    amount: "$2,400.00",
    date: "Oct 24, 2024",
    dueDate: "Nov 24, 2024",
    status: "Paid",
  },
  {
    id: "INV-2024-002",
    client: "Global Solutions",
    amount: "$1,250.00",
    date: "Oct 25, 2024",
    dueDate: "Nov 25, 2024",
    status: "Pending",
  },
  {
    id: "INV-2024-003",
    client: "StartUp Labs",
    amount: "$300.00",
    date: "Oct 26, 2024",
    dueDate: "Nov 26, 2024",
    status: "Overdue",
  },
  {
    id: "INV-2024-004",
    client: "Media Group",
    amount: "$4,500.00",
    date: "Oct 28, 2024",
    dueDate: "Nov 28, 2024",
    status: "Pending",
  },
  {
    id: "INV-2024-005",
    client: "Future Systems",
    amount: "$800.00",
    date: "Oct 30, 2024",
    dueDate: "Nov 30, 2024",
    status: "Paid",
  },
];

export default function QuoteInvoices() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Invoices</h1>
          <p className="text-slate-400">Track payments and manage billing.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Paid: $3,200
          </div>
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            Pending: $5,750
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Invoice ID</th>
                <th className="p-4 font-semibold">Client</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Due Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="p-4 font-mono text-cyan-400 font-medium">
                    {invoice.id}
                  </td>
                  <td className="p-4 font-medium text-white">
                    {invoice.client}
                  </td>
                  <td className="p-4 text-white font-bold">{invoice.amount}</td>
                  <td className="p-4 text-slate-400">{invoice.date}</td>
                  <td className="p-4 text-slate-400">{invoice.dueDate}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        invoice.status === "Paid"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : invoice.status === "Pending"
                          ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {invoice.status === "Paid" && <CheckCircle size={12} />}
                      {invoice.status === "Pending" && <Clock size={12} />}
                      {invoice.status === "Overdue" && (
                        <AlertCircle size={12} />
                      )}
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                        title="Download PDF"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                        title="Send Email"
                      >
                        <Send size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
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
