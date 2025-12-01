import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Send,
  Edit,
  Printer,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building,
} from "lucide-react";

export default function QuoteView() {
  const { id } = useParams();
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );

  // Mock data
  const quote = {
    id: id || "1",
    number: "QT-2024-001",
    status: "sent" as const,
    date: "2024-11-28",
    expiryDate: "2024-12-28",
    client: {
      name: "Acme Corporation",
      email: "contact@acme.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Corp",
      address: "123 Business Ave, Suite 100, New York, NY 10001",
    },
    items: [
      {
        id: "1",
        description: "Web Development - Custom E-commerce Platform",
        quantity: 1,
        unitPrice: 8500,
        discount: 10,
        tax: 8,
      },
      {
        id: "2",
        description: "UI/UX Design Services",
        quantity: 40,
        unitPrice: 120,
        discount: 5,
        tax: 8,
      },
      {
        id: "3",
        description: "SEO Optimization Package",
        quantity: 1,
        unitPrice: 1200,
        discount: 0,
        tax: 8,
      },
    ],
    notes:
      "This quote includes all development, design, and optimization services as discussed in our meeting.",
    terms:
      "Payment due within 30 days. All prices in USD. 50% deposit required to begin work.",
  };

  const calculateItemTotal = (item: any) => {
    const subtotal = item.quantity * item.unitPrice;
    const afterDiscount = subtotal - (subtotal * item.discount) / 100;
    const total = afterDiscount + (afterDiscount * item.tax) / 100;
    return total;
  };

  const calculateSubtotal = () => {
    return quote.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
  };

  const calculateTotalDiscount = () => {
    return quote.items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      return sum + (subtotal * item.discount) / 100;
    }, 0);
  };

  const calculateTotalTax = () => {
    return quote.items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      const afterDiscount = subtotal - (subtotal * item.discount) / 100;
      return sum + (afterDiscount * item.tax) / 100;
    }, 0);
  };

  const calculateGrandTotal = () => {
    return quote.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: "bg-slate-500/10 text-slate-400 border-slate-500/20",
      sent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      approved: "bg-green-500/10 text-green-400 border-green-500/20",
      rejected: "bg-red-500/10 text-red-400 border-red-500/20",
      expired: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    };
    return colors[status as keyof typeof colors];
  };

  const handleAction = (type: "approve" | "reject") => {
    setActionType(type);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    console.log(`Quote ${actionType}d`);
    setShowActionModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/demos/quote"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{quote.number}</h1>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  quote.status
                )}`}
              >
                {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
              </span>
            </div>
            <p className="text-slate-400">
              Created on {new Date(quote.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all">
            <Printer size={18} />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all">
            <Download size={18} />
            Download PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all">
            <Send size={18} />
            Resend
          </button>
          <Link
            to={`/demos/quote/edit/${id}`}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
          >
            <Edit size={18} />
            Edit
          </Link>
        </div>
      </div>

      {/* Quote Actions */}
      {quote.status === "sent" && (
        <div className="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                Quote Pending Response
              </h3>
              <p className="text-slate-400 text-sm">
                This quote is awaiting client approval
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleAction("reject")}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-semibold hover:bg-red-500/20 transition-all"
              >
                <XCircle size={20} />
                Reject
              </button>
              <button
                onClick={() => handleAction("approve")}
                className="flex items-center gap-2 px-6 py-3 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl font-semibold hover:bg-green-500/20 transition-all"
              >
                <CheckCircle size={20} />
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              Client Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="text-indigo-400 mt-1" size={20} />
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Company</div>
                    <div className="text-white font-semibold">
                      {quote.client.company}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-indigo-400 mt-1" size={20} />
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Email</div>
                    <div className="text-white font-semibold">
                      {quote.client.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="text-indigo-400 mt-1" size={20} />
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Phone</div>
                    <div className="text-white font-semibold">
                      {quote.client.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-indigo-400 mt-1" size={20} />
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Address</div>
                    <div className="text-white font-semibold">
                      {quote.client.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">Items</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Tax
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {quote.items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30">
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">
                          {item.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400">
                        ${item.unitPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right text-red-400">
                        {item.discount}%
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400">
                        {item.tax}%
                      </td>
                      <td className="px-6 py-4 text-right text-white font-semibold">
                        ${calculateItemTotal(item).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes and Terms */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Notes</h2>
            <p className="text-slate-400 mb-6">{quote.notes}</p>

            <h2 className="text-xl font-bold text-white mb-4">
              Terms & Conditions
            </h2>
            <p className="text-slate-400">{quote.terms}</p>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sticky top-24 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white font-semibold">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <span className="text-slate-400">Discount</span>
                  <span className="text-red-400 font-semibold">
                    -${calculateTotalDiscount().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <span className="text-slate-400">Tax</span>
                  <span className="text-white font-semibold">
                    ${calculateTotalTax().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    ${calculateGrandTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar size={16} />
                <span className="text-xs">Quote Date</span>
              </div>
              <div className="text-white font-semibold">
                {new Date(quote.date).toLocaleDateString()}
              </div>
            </div>

            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-orange-400">
                <Clock size={16} />
                <span className="text-xs">Valid Until</span>
              </div>
              <div className="text-white font-semibold">
                {new Date(quote.expiryDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-white mb-4">
              {actionType === "approve" ? "Approve Quote" : "Reject Quote"}
            </h3>
            <p className="text-slate-400 mb-6">
              Are you sure you want to {actionType} this quote? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowActionModal(false)}
                className="flex-1 px-6 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                  actionType === "approve"
                    ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                }`}
              >
                {actionType === "approve" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
