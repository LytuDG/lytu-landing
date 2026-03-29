import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import {
  getPedidoByTrackingCode,
  getRepartidorUbicacionActual,
  subscribeToRepartidorUbicacion,
  getRouteAndDistance,
  calculateDistance,
} from "../services/pedidoService";
import DeliveryMap from "../components/DeliveryMap";
import type { Pedido, RepartidorLocation } from "../types";
import { ENV } from "../../../env/env";
import { Link } from "react-router-dom";

const statusTranslations: Record<string, { label: string; color: string; icon: string }> = {
  cocinando: { label: "Preparando", color: "bg-yellow-500", icon: "🍳" },
  listo: { label: "Listo para recoger", color: "bg-orange-500", icon: "📦" },
  recogido: { label: "Recogido", color: "bg-blue-500", icon: "🚗" },
  en_ruta: { label: "En ruta", color: "bg-indigo-500", icon: "🗺️" },
  entregado: { label: "Entregado", color: "bg-green-500", icon: "✅" },
  cancelado: { label: "Cancelado", color: "bg-red-500", icon: "❌" },
};

export default function PublicDeliveryTrackingPage() {
  const { trackingCode } = useParams<{ trackingCode: string }>();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [repartidorUbicacion, setRepartidorUbicacion] = useState<RepartidorLocation | null>(null);
  const [distancia, setDistancia] = useState<number | null>(null);
  const [routeGeometry, setRouteGeometry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);

  const fetchRouteData = useCallback(
    async (ubicacion: RepartidorLocation, ped: Pedido) => {
      if (!ENV.MAPTILER_API_KEY) return;

      const routeResult = await getRouteAndDistance(
        ubicacion.lat,
        ubicacion.lng,
        ped.destino_lat,
        ped.destino_lng,
        ENV.MAPTILER_API_KEY
      );

      if (routeResult.success && routeResult.route) {
        setRouteGeometry(routeResult.route);
        if (routeResult.duration) {
          setEstimatedTime(Math.ceil(routeResult.duration / 60)); // Convert to minutes
        }
      }
    },
    []
  );

  // Initial fetch
  useEffect(() => {
    const fetchPedido = async () => {
      if (!trackingCode) return;

      setLoading(true);
      setError(null);

      const result = await getPedidoByTrackingCode(trackingCode);

      if (result.success && result.data) {
        setPedido(result.data);

        // Get initial repartidor location
        const ubicacionResult = await getRepartidorUbicacionActual(result.data.repartidor_id);
        if (ubicacionResult.success && ubicacionResult.data) {
          setRepartidorUbicacion(ubicacionResult.data);

          // Calculate distance
          const dist = calculateDistance(
            ubicacionResult.data.lat,
            ubicacionResult.data.lng,
            result.data.destino_lat,
            result.data.destino_lng
          );
          setDistancia(dist);

          // Get route
          await fetchRouteData(ubicacionResult.data, result.data);
        }
      } else {
        setError(result.error || "Pedido no encontrado");
      }

      setLoading(false);
    };

    fetchPedido();
  }, [trackingCode, fetchRouteData]);

  // Subscribe to location updates
  useEffect(() => {
    if (!pedido) return;

    const unsubscribe = subscribeToRepartidorUbicacion(
      pedido.repartidor_id,
      async (ubicacion: RepartidorLocation | null) => {
        if (ubicacion) {
          setRepartidorUbicacion(ubicacion);

          // Recalculate distance
          const dist = calculateDistance(
            ubicacion.lat,
            ubicacion.lng,
            pedido.destino_lat,
            pedido.destino_lng
          );
          setDistancia(dist);

          // Get updated route
          await fetchRouteData(ubicacion, pedido);
        }
      }
    );

    return unsubscribe;
  }, [pedido, fetchRouteData]);

  const status = pedido ? statusTranslations[pedido.estado] : null;

  if (!trackingCode) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">Código inválido</h1>
          <p className="text-slate-400 mb-8">El código de seguimiento es requerido</p>
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-6">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
          <p className="text-slate-300 font-medium">Cargando información del pedido...</p>
        </div>
      </div>
    );
  }

  if (error || !pedido) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">Pedido no encontrado</h1>
          <p className="text-slate-400 mb-8">{error || "No se pudo encontrar el pedido con este código"}</p>
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

  return (
    <div className="min-h-screen bg-slate-950 p-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <div className="w-10 h-10 bg-linear-to-tr from-indigo-500 to-cyan-400 rounded-xl flex items-center justify-center transform rotate-3 shadow-lg group-hover:rotate-6 transition-transform">
              <span className="font-bold text-white text-xl">L</span>
            </div>
            <span className="text-3xl font-bold tracking-tighter text-white">
              ytu
            </span>
          </Link>
          <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl shadow-xl">
            <span className="text-slate-400 text-xs uppercase font-bold tracking-widest mr-2">Código</span>
            <span className="font-mono font-bold text-cyan-400 text-lg">{pedido.codigo_seguimiento}</span>
          </div>
        </div>

        {/* Map Section - Now on Top and taller */}
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden h-[500px] md:h-[600px] mb-8 shadow-2xl relative">
          <DeliveryMap
            pedido={pedido}
            repartidorUbicacion={repartidorUbicacion}
            distancia={distancia}
            maptilerApiKey={ENV.MAPTILER_API_KEY || ""}
            routeGeometry={routeGeometry}
            isLoading={loading}
            estimatedTime={estimatedTime}
            estadoPedido={pedido.estado} 
          />
        </div>

        {/* Info Section - Now below the Map */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-8 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between gap-6 flex-wrap mb-8">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Detalles del Envío
                </h1>
                <p className="text-slate-400">
                  Sigue en tiempo real la ubicación de tu pedido
                </p>
              </div>
              {status && (
                <div className={`${status.color} px-6 py-3 rounded-2xl text-white font-bold flex items-center gap-3 text-lg shadow-lg`}>
                  <span className="text-2xl">{status.icon}</span>
                  {status.label}
                </div>
              )}
            </div>

            {/* Pedido Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-white/5 transition-colors hover:bg-slate-800/60">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Referencia</div>
                <div className="font-semibold text-white">{pedido.referencia || "Sin referencia"}</div>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-white/5 transition-colors hover:bg-slate-800/60">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Código Interno</div>
                <div className="font-mono font-semibold text-cyan-400">{pedido.codigo}</div>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-white/5 transition-colors hover:bg-slate-800/60">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Fecha de Pedido</div>
                <div className="font-semibold text-white">
                  {new Date(pedido.created_at).toLocaleDateString()} {new Date(pedido.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-white/5 transition-colors hover:bg-slate-800/60">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Agencia</div>
                <div className="font-semibold text-white">{pedido.agencias?.nombre || "Lytu Delivery"}</div>
              </div>
            </div>
          </div>

          {/* Status Specific Messages */}
          {pedido.estado === "entregado" && (
            <div className="bg-green-500/10 border border-green-500/30 p-8 rounded-3xl text-center shadow-lg transform hover:scale-[1.01] transition-transform">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">¡Pedido Entregado!</h2>
              <p className="text-slate-300">Tu pedido ha llegado a su destino. ¡Gracias por confiar en nosotros!</p>
            </div>
          )}

          {pedido.estado === "cancelado" && (
            <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-3xl text-center shadow-lg">
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-red-400 mb-2">Pedido Cancelado</h2>
              <p className="text-slate-300">Lo sentimos, este pedido ha sido cancelado. Contacta a soporte para más detalles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
