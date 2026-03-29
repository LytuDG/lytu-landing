import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PublicDeliveryTrackingPage from "../modules/delivery/pages/PublicDeliveryTrackingPage";
import TrackingPage from "./Tracking/TrackingPage";
import { Loader2 } from "lucide-react";

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

    // Try to determine if this is a delivery tracking code or a quote tracking code
    // Delivery codes are typically shorter and alphanumeric (e.g., "62IMZK")
    // Quote tracking codes might be longer or have different patterns
    // For now, we'll try delivery first, if it fails we'll mark as quote

    // Quick heuristic: if it's all uppercase and relatively short (6-10 chars), it's likely delivery
    if (
      trackingCode.match(/^[A-Z0-9]{6,10}$/) &&
      !trackingCode.includes("-")
    ) {
      setTrackingType("delivery");
    } else {
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
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Código inválido</h1>
          <p className="text-slate-400">
            El código de seguimiento no es válido
          </p>
        </div>
      </div>
    );
  }

  // Use the trackingCode as trackingId for compatibility with both pages
  return trackingType === "delivery" ? (
    <PublicDeliveryTrackingPage />
  ) : (
    <TrackingPage />
  );
}
