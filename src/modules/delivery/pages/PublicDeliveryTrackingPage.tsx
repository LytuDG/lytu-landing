import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, AlertCircle, Loader2, MapPin, Clock } from "lucide-react";
import { getPedidoByTrackingCode, getRepartidorUbicacionActual, subscribeToRepartidorUbicacion, getRouteAndDistance, calculateDistance } from "../services/pedidoService";
import DeliveryMap from "../components/DeliveryMap";
import type { Pedido, RepartidorLocation } from "../types";
import { ENV } from "../../../env/env";
import { Link } from "react-router-dom";

const statusTranslations: Record<string, { label: string; color: string }> = {
  cocinando: { label: "Preparando", color: "bg-yellow-500" },
  listo: { label: "Listo para recoger", color: "bg-orange-500" },
  recogido: { label: "Recogido", color: "bg-blue-500" },
  en_ruta: { label: "En ruta", color: "bg-indigo-500" },
  entregado: { label: "Entregado", color: "bg-green-500" },
  cancelado: { label: "Cancelado", color: "bg-red-500" },
};

export default function PublicDeliveryTrackingPage() {
  const { trackingCode } = useParams<{ trackingCode: string }>();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [repartidorUbicacion, setRepartidorUbicacion] = useState<RepartidorLocation | null>(null);
  const [distancia, setDistancia] = useState<number | null>(null);
  const [routeGeometry, setRouteGeometry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          if (ENV.MAPTILER_API_KEY) {
            const routeResult = await getRouteAndDistance(
              ubicacionResult.data.lat,
              ubicacionResult.data.lng,
              result.data.destino_lat,
              result.data.destino_lng,
              ENV.MAPTILER_API_KEY
            );

            if (routeResult.success && routeResult.route) {
              setRouteGeometry(routeResult.route);
            }
          }
        }
      } else {
        setError(result.error || "Pedido no encontrado");
      }

      setLoading(false);
    };

    fetchPedido();
  }, [trackingCode]);

  // Subscribe to location updates
  useEffect(() => {
    if (!pedido) return;

    const unsubscribe = subscribeToRepartidorUbicacion(
      pedido.repartidor_id,
      (ubicacion: RepartidorLocation | null) => {
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
          if (ENV.MAPTILER_API_KEY) {
            getRouteAndDistance(
              ubicacion.lat,
              ubicacion.lng,
              pedido.destino_lat,
              pedido.destino_lng,
              ENV.MAPTILER_API_KEY
            ).then((routeResult) => {
              if (routeResult.success && routeResult.route) {
                setRouteGeometry(routeResult.route);
              }
            });
          }
        }
      }
    );

    return unsubscribe;
  }, [pedido]);

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
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Volver
          </Link>

          <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Seguimiento de Pedido
                </h1>
                <p className="text-slate-400">
                  Código: <span className="font-mono text-cyan-400">{pedido.codigo_seguimiento}</span>
                </p>
              </div>
              <div className={`${status?.color} px-4 py-2 rounded-lg text-white font-semibold`}>
                {status?.label}
              </div>
            </div>

            {/* Pedido Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                <div className="text-slate-400 mb-1">Referencia</div>
                <div className="font-semibold text-white">{pedido.referencia || "-"}</div>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                <div className="text-slate-400 mb-1">Código de Pedido</div>
                <div className="font-semibold text-white font-mono">{pedido.codigo}</div>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                <div className="text-slate-400 mb-1">Creado</div>
                <div className="font-semibold text-white">
                  {new Date(pedido.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden h-[600px] mb-6">
          <DeliveryMap
            pedido={pedido}
            repartidorUbicacion={repartidorUbicacion}
            distancia={distancia}
            maptilerApiKey={ENV.MAPTILER_API_KEY || ""}
            routeGeometry={routeGeometry}
            isLoading={loading}
          />
        </div>

        {/* Status Timeline */}
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Información del Repartidor</h2>

          {pedido.repartidores ? (
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="text-blue-400 w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{pedido.repartidores.nombre}</div>
                  <div className="text-slate-400 text-sm mt-1">
                    {pedido.repartidores.vehiculo_descripcion}
                  </div>
                </div>
              </div>

              {distancia !== null && (
                <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="text-indigo-400 w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">
                      {distancia < 1000
                        ? `${Math.round(distancia)} metros`
                        : `${(distancia / 1000).toFixed(1)} km`}
                    </div>
                    <div className="text-slate-400 text-sm mt-1">
                      Distancia restante hasta el destino
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-slate-400 text-center py-8">
              Información del repartidor no disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
