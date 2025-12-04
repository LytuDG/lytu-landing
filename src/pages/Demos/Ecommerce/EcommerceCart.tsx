import { useNavigate } from "react-router-dom";
import { useEcommerce } from "../../../contexts/EcommerceContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function EcommerceCart() {
  const { cart, removeFromCart, updateQuantity } = useEcommerce();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-slate-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-slate-400 mb-8">
          Looks like you haven't added any products yet.
        </p>
        <button
          onClick={() => navigate("/demos/ecommerce/products")}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-white">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 items-center"
            >
              <div className="w-24 h-24 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <ShoppingBag size={32} className="text-slate-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-white truncate">
                  {item.name}
                </h3>
                <p className="text-slate-400 text-sm">{item.category}</p>
                <div className="mt-2 font-medium text-indigo-400">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              <div className="flex flex-col items-end gap-4">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
                
                <div className="flex items-center gap-3 bg-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:text-white text-slate-400 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-white w-4 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:text-white text-slate-400 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sticky top-6">
            <h2 className="text-lg font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tax (8%)</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-emerald-400">Free</span>
              </div>
              <div className="border-t border-slate-800 pt-4 flex justify-between font-bold text-lg">
                <span className="text-white">Total</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/demos/ecommerce/checkout")}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
