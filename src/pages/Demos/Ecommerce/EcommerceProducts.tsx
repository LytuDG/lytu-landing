import { useState } from "react";
import {
  Package,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  X,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299.0,
    stock: 45,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 450.0,
    stock: 12,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 129.0,
    stock: 120,
    status: "In Stock",
  },
  {
    id: 4,
    name: "4K Monitor 27inch",
    category: "Electronics",
    price: 399.0,
    stock: 8,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "USB-C Docking Station",
    category: "Electronics",
    price: 89.0,
    stock: 0,
    status: "Out of Stock",
  },
];

export default function EcommerceProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Electronics",
    price: "",
    stock: "",
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name) return;

    const stock = parseInt(newProduct.stock) || 0;
    let status = "In Stock";
    if (stock === 0) status = "Out of Stock";
    else if (stock < 10) status = "Low Stock";

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price) || 0,
      stock: stock,
      status: status,
    };

    setProducts([product, ...products]);
    setIsAddModalOpen(false);
    setNewProduct({
      name: "",
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
          <p className="text-slate-400">Manage your product catalog.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
        >
          <Plus size={18} />
          Add Product
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
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white flex items-center gap-2">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                        <Package size={20} />
                      </div>
                      <span className="font-medium text-white">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-white font-medium">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === "In Stock"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : product.status === "Low Stock"
                          ? "bg-orange-500/10 text-orange-400"
                          : "bg-red-500/10 text-red-400"
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
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-800 flex justify-between items-center text-sm text-slate-400">
          <span>
            Showing 1-{Math.min(5, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-800 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-800">
              Next
            </button>
          </div>
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
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Wireless Headphones"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
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
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Initial Stock
                </label>
                <input
                  type="number"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="0"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                />
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
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
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
