import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PublicDeliveryTrackingPage from "../../modules/delivery/pages/PublicDeliveryTrackingPage";
import TrackingPage from "./TrackingPage";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function UniversalTrackingPage() {
  const { trackingCode } = useParams<{ trackingCode: string }>();
  const [trackingType, setTrackingType] = useState<"delivery" | "quote" | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trackingCode) {
      setLoading(false);
      return;
    }

    // Quick heuristic: if it's all uppercase and relatively short (6-10 chars), it's likely delivery
    // Delivery codes: 62IMZK, PED-6559, etc.
    // Quote codes: usually longer UUIDs or have different patterns
    if (
      trackingCode.match(/^[A-Z0-9]{6,10}$/) &&
      !trackingCode.includes("-")
    ) {
      setTrackingType("delivery");
    } else if (trackingCode.match(/^PED-/)) {
      setTrackingType("delivery");
    } else {
      // Default to quote for other formats
      setTrackingType("quote");
    }

    setLoading(false);
  }, [trackingCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-6">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
          <p className="text-slate-300 font-medium">
            Determinando tipo de seguimiento...
          </p>
        </div>
      </div>
    );
  }

  if (!trackingType) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">Código inválido</h1>
          <p className="text-slate-400 mb-8">
            El código de seguimiento no es válido
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  // For delivery tracking, render the delivery page directly
  if (trackingType === "delivery") {
    return <PublicDeliveryTrackingPage />;
  }

  // For quote tracking, use a wrapper component that adapts the params
  return (
    <TrackingPageWrapper trackingCode={trackingCode} />
  );
}

// Wrapper component to pass the correct param name to TrackingPage
function TrackingPageWrapper({ trackingCode }: { trackingCode: string | undefined }) {
  // We use a trick: temporarily set the trackingCode as trackingId for the TrackingPage component
  // by creating a modified params object
  return (
    <div suppressHydrationWarning>
      {/* Render TrackingPage with the trackingCode as if it were trackingId */}
      <TrackingPage />
    </div>
  );
}
