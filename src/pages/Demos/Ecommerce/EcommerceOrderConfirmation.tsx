import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function EcommerceOrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
          <CheckCircle2 size={48} className="text-emerald-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h1>
        <p className="text-slate-400 mb-8">
          Thank you for your purchase. Your order has been received and is being
          processed. You will receive an email confirmation shortly.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/demos/ecommerce/orders")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
          >
            View My Orders
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate("/demos/ecommerce/products")}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
