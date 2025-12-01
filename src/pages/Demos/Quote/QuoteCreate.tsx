import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Trash2, Save, Send, ArrowLeft, Calculator } from "lucide-react";

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  tax: number;
}

export default function QuoteCreate() {
  const navigate = useNavigate();
  const [items, setItems] = useState<QuoteItem[]>([
    {
      id: "1",
      description: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      tax: 0,
    },
  ]);

  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  });

  const [quoteInfo, setQuoteInfo] = useState({
    number: `QT-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 1000)
    ).padStart(3, "0")}`,
    date: new Date().toISOString().split("T")[0],
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    notes: "",
    terms: "Payment due within 30 days. All prices in USD.",
  });

  const addItem = () => {
    setItems([
      ...items,
      {
        id: String(items.length + 1),
        description: "",
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        tax: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof QuoteItem, value: any) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const calculateItemTotal = (item: QuoteItem) => {
    const subtotal = item.quantity * item.unitPrice;
    const afterDiscount = subtotal - (subtotal * item.discount) / 100;
    const total = afterDiscount + (afterDiscount * item.tax) / 100;
    return total;
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const calculateTotalDiscount = () => {
    return items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      return sum + (subtotal * item.discount) / 100;
    }, 0);
  };

  const calculateTotalTax = () => {
    return items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      const afterDiscount = subtotal - (subtotal * item.discount) / 100;
      return sum + (afterDiscount * item.tax) / 100;
    }, 0);
  };

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const handleSaveDraft = () => {
    console.log("Saving draft...", { clientInfo, quoteInfo, items });
    navigate("/demos/quote");
  };

  const handleSendQuote = () => {
    console.log("Sending quote...", { clientInfo, quoteInfo, items });
    navigate("/demos/quote");
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
            <h1 className="text-3xl font-bold text-white mb-2">
              Create New Quote
            </h1>
            <p className="text-slate-400">
              Fill in the details to generate a professional quote
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all"
          >
            <Save size={20} />
            Save Draft
          </button>
          <button
            onClick={handleSendQuote}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
          >
            <Send size={20} />
            Send Quote
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              Client Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={clientInfo.name}
                  onChange={(e) =>
                    setClientInfo({ ...clientInfo, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={clientInfo.email}
                  onChange={(e) =>
                    setClientInfo({ ...clientInfo, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={clientInfo.phone}
                  onChange={(e) =>
                    setClientInfo({ ...clientInfo, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={clientInfo.company}
                  onChange={(e) =>
                    setClientInfo({ ...clientInfo, company: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Acme Corporation"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={clientInfo.address}
                  onChange={(e) =>
                    setClientInfo({ ...clientInfo, address: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="123 Main St, City, State, ZIP"
                />
              </div>
            </div>
          </div>

          {/* Quote Details */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Quote Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Quote Number
                </label>
                <input
                  type="text"
                  value={quoteInfo.number}
                  onChange={(e) =>
                    setQuoteInfo({ ...quoteInfo, number: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Quote Date
                </label>
                <input
                  type="date"
                  value={quoteInfo.date}
                  onChange={(e) =>
                    setQuoteInfo({ ...quoteInfo, date: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={quoteInfo.expiryDate}
                  onChange={(e) =>
                    setQuoteInfo({ ...quoteInfo, expiryDate: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Items</h2>
              <button
                onClick={addItem}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg font-semibold hover:bg-indigo-500/20 transition-all"
              >
                <Plus size={18} />
                Add Item
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-slate-400 font-semibold">
                      Item #{index + 1}
                    </span>
                    {items.length > 1 && (
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                    <div className="lg:col-span-2">
                      <label className="block text-xs font-medium text-slate-500 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, "description", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="Service or product description"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">
                        Unit Price ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "unitPrice",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.discount}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "discount",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">
                          Tax (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={item.tax}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "tax",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-24 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 mb-1">
                        Item Total
                      </div>
                      <div className="text-xl font-bold text-white">
                        ${calculateItemTotal(item).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              Additional Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Notes
                </label>
                <textarea
                  value={quoteInfo.notes}
                  onChange={(e) =>
                    setQuoteInfo({ ...quoteInfo, notes: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  placeholder="Any additional notes or comments..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Terms & Conditions
                </label>
                <textarea
                  value={quoteInfo.terms}
                  onChange={(e) =>
                    setQuoteInfo({ ...quoteInfo, terms: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  placeholder="Payment terms, conditions, etc..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="text-indigo-400" size={24} />
              <h2 className="text-xl font-bold text-white">Summary</h2>
            </div>

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

            <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <div className="text-xs text-slate-400 mb-1">Quote Number</div>
              <div className="text-white font-semibold">{quoteInfo.number}</div>
              <div className="text-xs text-slate-400 mt-3 mb-1">
                Valid Until
              </div>
              <div className="text-white font-semibold">
                {new Date(quoteInfo.expiryDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
