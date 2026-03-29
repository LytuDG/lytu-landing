import { useEffect, useRef, useState } from "react";
import { Map, Marker } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { MapPin, Truck, ChevronUp, Info } from "lucide-react";
import { createRoot } from "react-dom/client";
import type { Pedido, RepartidorLocation } from "../types";

interface DeliveryMapProps {
  pedido: Pedido;
  repartidorUbicacion: RepartidorLocation | null;
  distancia: number | null;
  maptilerApiKey: string;
  routeGeometry?: any;
  isLoading?: boolean;
  estimatedTime?: number | null;
  estadoPedido?: string;
  onMapReady?: (map: Map) => void;
}

export default function DeliveryMap({
  pedido,
  repartidorUbicacion,
  distancia,
  maptilerApiKey,
  routeGeometry,
  isLoading = false,
  estimatedTime,
  estadoPedido,
  onMapReady,
}: DeliveryMapProps) {
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const destinyMarker = useRef<Marker | null>(null);
  const repartidorMarker = useRef<Marker | null>(null);
  const routeSource = useRef<boolean>(false);
  const styleLoaded = useRef<boolean>(false);

  // Ensure component only renders on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize map - only on client side
  useEffect(() => {
    if (!mounted || !mapContainer.current || !maptilerApiKey) return;

    map.current = new Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${maptilerApiKey}`,
      center: [pedido.destino_lng, pedido.destino_lat],
      zoom: 15,
      pitch: 45,
      bearing: 0,
    });

    const handleStyleLoad = () => {
      if (!map.current) return;

      styleLoaded.current = true;

      // Add route source
      if (!map.current.getSource("route")) {
        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: routeGeometry || {
              type: "LineString",
              coordinates: [],
            },
          },
        });
      }

      // Add route layer
      if (!map.current.getLayer("route")) {
        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3b82f6",
            "line-width": 4,
            "line-opacity": 0.8,
          },
        });
      }

      routeSource.current = true;
      onMapReady?.(map.current);
    };

    map.current.on("style.load", handleStyleLoad);

    return () => {
      map.current?.off("style.load", handleStyleLoad);
      destinyMarker.current?.remove();
      repartidorMarker.current?.remove();
      map.current?.remove();
    };
  }, [mounted, maptilerApiKey, pedido.destino_lat, pedido.destino_lng, onMapReady, routeGeometry]);

  // Update route geometry
  useEffect(() => {
    if (map.current && routeSource.current && map.current.getSource("route") && routeGeometry) {
      (map.current.getSource("route") as any).setData({
        type: "Feature",
        properties: {},
        geometry: routeGeometry,
      });
    }
  }, [routeGeometry]);

  // Create/Update destiny marker (pin location)
  useEffect(() => {
    if (!map.current || !styleLoaded.current) return;

    if (!destinyMarker.current) {
      const el = document.createElement("div");
      el.className = "relative flex items-center justify-center";
      
      // Marker container with pulse
      const container = document.createElement("div");
      container.className = "relative flex items-center justify-center";
      
      // Pulse animation
      const pulse = document.createElement("div");
      pulse.className = "absolute w-12 h-12 bg-red-500/30 rounded-full animate-ping";
      container.appendChild(pulse);
      
      // Pin icon container
      const pinContainer = document.createElement("div");
      pinContainer.className = "relative z-10 bg-red-500 p-2 rounded-full shadow-lg border-2 border-white text-white transform -translate-y-1 transition-transform";
      
      const root = createRoot(pinContainer);
      root.render(<MapPin size={24} fill="currentColor" />);
      
      container.appendChild(pinContainer);
      el.appendChild(container);

      destinyMarker.current = new Marker({ element: el })
        .setLngLat([pedido.destino_lng, pedido.destino_lat])
        .addTo(map.current);
    } else {
      destinyMarker.current.setLngLat([pedido.destino_lng, pedido.destino_lat]);
    }
  }, [pedido.destino_lat, pedido.destino_lng, styleLoaded.current]);

  // Create/Update repartidor marker (delivery driver)
  useEffect(() => {
    if (!map.current || !repartidorUbicacion || !styleLoaded.current) return;

    if (!repartidorMarker.current) {
      const el = document.createElement("div");
      el.className = "relative flex flex-col items-center justify-center";
      
      // Label "Mensajero"
      const label = document.createElement("div");
      label.className = "mb-1 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap uppercase tracking-wider border border-white/20";
      label.innerText = "Mensajero";
      el.appendChild(label);

      // Marker container
      const container = document.createElement("div");
      container.className = "relative flex items-center justify-center";
      
      // Subtle pulse for active messenger
      const pulse = document.createElement("div");
      pulse.className = "absolute w-10 h-10 bg-blue-500/30 rounded-full animate-pulse";
      container.appendChild(pulse);
      
      // Driver icon container
      const driverContainer = document.createElement("div");
      driverContainer.className = "relative z-10 bg-blue-600 p-2 rounded-full shadow-xl border-2 border-white text-white transform transition-all duration-500 hover:scale-110";
      
      const root = createRoot(driverContainer);
      root.render(<Truck size={24} fill="currentColor" />);
      
      container.appendChild(driverContainer);
      el.appendChild(container);

      repartidorMarker.current = new Marker({ element: el })
        .setLngLat([repartidorUbicacion.lng, repartidorUbicacion.lat])
        .addTo(map.current);
    } else {
      repartidorMarker.current.setLngLat([repartidorUbicacion.lng, repartidorUbicacion.lat]);
    }

    // Fit bounds to show both markers if we have enough distance
    if (map.current) {
      map.current.fitBounds(
        [
          [Math.min(repartidorUbicacion.lng, pedido.destino_lng), Math.min(repartidorUbicacion.lat, pedido.destino_lat)],
          [Math.max(repartidorUbicacion.lng, pedido.destino_lng), Math.max(repartidorUbicacion.lat, pedido.destino_lat)]
        ],
        { padding: 80, maxZoom: 16, linear: true, duration: 2000 }
      );
    }
  }, [repartidorUbicacion, pedido.destino_lat, pedido.destino_lng, styleLoaded.current]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900">
      {!mounted ? (
        // Loading skeleton for SSR
        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-slate-800 to-slate-900">
          <div className="text-slate-400">
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-slate-700 rounded mb-4"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="w-full h-full" />

          {/* Compact Info Badges on Map */}
          <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-10 max-w-[200px]">
            {/* Toggle Button */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-2.5 rounded-2xl text-white shadow-2xl hover:bg-slate-800 transition-all group flex items-center gap-2"
            >
              {isExpanded ? (
                <>
                  <span className="text-[10px] font-bold uppercase tracking-wider pl-1 group-hover:text-cyan-400 transition-colors">Ocultar Info</span>
                  <ChevronUp size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                </>
              ) : (
                <>
                  <span className="text-[10px] font-bold uppercase tracking-wider pl-1 group-hover:text-cyan-400 transition-colors">Ver Detalles</span>
                  <Info size={16} className="text-cyan-400 group-hover:text-white transition-colors animate-pulse" />
                </>
              )}
            </button>

            {/* Badges Container */}
            <div className={`flex flex-col gap-2 transition-all duration-300 origin-top transform ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute'}`}>
              {/* Status Badge */}
              {estadoPedido && !isLoading && (() => {
                const getStatusConfig = () => {
                  const s = estadoPedido.toLowerCase();
                  if (s.includes("cocinando")) return { label: "Cocinando", color: "bg-orange-500", icon: "🍳" };
                  if (s.includes("camino") || s.includes("ruta") || s.includes("recogido")) return { label: "En camino", color: "bg-blue-500", icon: "🛵" };
                  if (s.includes("entregado")) return { label: "Entregado", color: "bg-green-500", icon: "✅" };
                  return { label: s, color: "bg-slate-700", icon: "📦" };
                };
                const config = getStatusConfig();
                return (
                  <div className={`${config.color} text-white backdrop-blur-md rounded-2xl shadow-xl px-4 py-2 flex items-center gap-2 border border-white/20`}>
                    <span className="text-xl">{config.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold opacity-80 leading-none">Estado</span>
                      <span className="text-sm font-bold leading-tight">{config.label}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Distance Badge */}
              {distancia !== null && !isLoading && (
                <div className="bg-slate-950/80 backdrop-blur-md rounded-2xl shadow-xl px-4 py-2 border border-white/10 flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 12 20 10-10-20L2 12Z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-bold leading-none">Distancia</span>
                    <span className="text-base font-bold text-white leading-tight">
                      {distancia < 1000 ? `${Math.round(distancia)} m` : `${(distancia / 1000).toFixed(1)} km`}
                    </span>
                  </div>
                </div>
              )}

              {/* Time Badge */}
              {estimatedTime !== null && estimatedTime !== undefined && !isLoading && (
                <div className="bg-slate-950/80 backdrop-blur-md rounded-2xl shadow-xl px-4 py-2 border border-white/10 flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-bold leading-none">Tiempo est.</span>
                    <span className="text-base font-bold text-white leading-tight">
                      {estimatedTime < 1 ? "< 1" : estimatedTime} min
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <div className="animate-spin">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}


