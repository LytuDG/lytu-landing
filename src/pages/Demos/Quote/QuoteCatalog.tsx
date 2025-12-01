import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Package,
  Tag,
  MoreVertical,
  Image as ImageIcon,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Web Development Basic",
    sku: "WEB-001",
    price: 1500,
    type: "Service",
    category: "Development",
    stock: null,
  },
  {
    id: 2,
    name: "SEO Audit",
    sku: "SEO-002",
    price: 500,
    type: "Service",
    category: "Marketing",
    stock: null,
  },
  {
    id: 3,
    name: "Hosting Plan (Annual)",
    sku: "HST-003",
    price: 120,
    type: "Subscription",
    category: "Infrastructure",
    stock: null,
  },
  {
    id: 4,
    name: "Logo Design",
    sku: "DSN-004",
    price: 300,
    type: "Service",
    category: "Design",
    stock: null,
  },
  {
    id: 5,
    name: "Dedicated Server",
    sku: "SRV-005",
    price: 2500,
    type: "Physical",
    category: "Hardware",
    stock: 5,
  },
];

export default function QuoteCatalog() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Catalog</h1>
          <p className="text-slate-400">
            Manage products and services for your quotes.
          </p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-cyan-500/20 flex items-center gap-2">
          <Plus size={18} />
          Add Item
        </button>
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
              placeholder="Search products by name or SKU..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-2">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all group"
            >
              <div className="h-32 bg-slate-800 flex items-center justify-center relative">
                <Package size={48} className="text-slate-600" />
                <button className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white bg-slate-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical size={16} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3
                      className="font-bold text-white truncate"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      {product.sku}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300">
                    {product.type}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300">
                    {product.category}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <span className="text-lg font-bold text-cyan-400">
                    ${product.price}
                  </span>
                  {product.stock !== null && (
                    <span className="text-xs text-slate-400">
                      {product.stock} in stock
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add New Card Placeholder */}
          <button className="border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center p-6 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-cyan-500/10">
              <Plus size={24} />
            </div>
            <span className="font-medium">Add New Product</span>
          </button>
        </div>
      </div>
    </div>
  );
}
