import { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Package,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "MacBook Pro 16",
    sku: "APP-MBP-16",
    category: "Electronics",
    stock: 45,
    price: 2499,
    status: "In Stock",
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    sku: "APP-IP15-P",
    category: "Electronics",
    stock: 12,
    price: 999,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Ergonomic Chair",
    sku: "FUR-CHR-01",
    category: "Furniture",
    stock: 0,
    price: 299,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Standing Desk",
    sku: "FUR-DSK-02",
    category: "Furniture",
    stock: 8,
    price: 499,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    sku: "ACC-KEY-01",
    category: "Accessories",
    stock: 150,
    price: 129,
    status: "In Stock",
  },
  {
    id: 6,
    name: "4K Monitor 27",
    sku: "ELE-MON-27",
    category: "Electronics",
    stock: 32,
    price: 399,
    status: "In Stock",
  },
  {
    id: 7,
    name: "USB-C Hub",
    sku: "ACC-HUB-01",
    category: "Accessories",
    stock: 200,
    price: 49,
    status: "In Stock",
  },
  {
    id: 8,
    name: "Laptop Sleeve",
    sku: "ACC-SLV-16",
    category: "Accessories",
    stock: 5,
    price: 29,
    status: "Low Stock",
  },
];

export default function InventoryProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "Electronics",
    price: "",
    stock: "",
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.sku) return;

    const stock = parseInt(newProduct.stock) || 0;
    let status = "In Stock";
    if (stock === 0) status = "Out of Stock";
    else if (stock < 10) status = "Low Stock";

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      sku: newProduct.sku,
      category: newProduct.category,
      price: parseFloat(newProduct.price) || 0,
      stock: stock,
      status: status,
    };

    setProducts([product, ...products]);
    setIsAddModalOpen(false);
    setNewProduct({
      name: "",
      sku: "",
      category: "Electronics",
      price: "",
      stock: "",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-slate-400">
            Manage your product catalog and stock levels.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-orange-500/20 flex items-center gap-2"
        >
          <Package size={18} />
          Add Product
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
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {["All", "In Stock", "Low Stock", "Out of Stock"].map((status) => (
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
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Product Name</th>
                <th className="p-4 font-semibold">SKU</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="p-4">
                    <div className="font-medium text-white">{product.name}</div>
                  </td>
                  <td className="p-4 text-slate-400 font-mono text-sm">
                    {product.sku}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 text-white font-medium">
                    ${product.price}
                  </td>
                  <td className="p-4 text-white">{product.stock}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
                        product.status === "In Stock"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : product.status === "Low Stock"
                          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {product.status === "In Stock" && (
                        <CheckCircle size={12} />
                      )}
                      {product.status === "Low Stock" && (
                        <AlertTriangle size={12} />
                      )}
                      {product.status === "Out of Stock" && (
                        <AlertTriangle size={12} />
                      )}
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Add New Product</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Wireless Mouse"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="e.g. ACC-001"
                    value={newProduct.sku}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, sku: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                  >
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Accessories</option>
                    <option>Clothing</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="0"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-medium"
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
