import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Pedido, RepartidorLocation } from "../types";

interface DeliveryMapProps {
  pedido: Pedido;
  repartidorUbicacion: RepartidorLocation | null;
  distancia: number | null;
  maptilerApiKey: string;
  routeGeometry?: any;
  isLoading?: boolean;
  onMapReady?: (map: mapboxgl.Map) => void;
}

export default function DeliveryMap({
  pedido,
  repartidorUbicacion,
  distancia,
  maptilerApiKey,
  routeGeometry,
  isLoading = false,
  onMapReady,
}: DeliveryMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const destinyMarker = useRef<mapboxgl.Marker | null>(null);
  const repartidorMarker = useRef<mapboxgl.Marker | null>(null);
  const routeSource = useRef<boolean>(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = maptilerApiKey;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "https://api.maptiler.com/maps/streets/style.json?key=" + maptilerApiKey,
      center: [pedido.destino_lng, pedido.destino_lat],
      zoom: 15,
      pitch: 45,
      bearing: 0,
      interactive: true,
    });

    map.current.on("load", () => {
      if (!map.current) return;

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
    });

    return () => {
      map.current?.remove();
    };
  }, [maptilerApiKey, pedido.destino_lat, pedido.destino_lng, onMapReady, routeGeometry]);

  // Update route geometry
  useEffect(() => {
    if (
      map.current &&
      routeSource.current &&
      map.current.getSource("route") &&
      routeGeometry
    ) {
      (map.current.getSource("route") as any).setData({
        type: "Feature",
        properties: {},
        geometry: routeGeometry,
      });
    }
  }, [routeGeometry]);

  // Update destiny marker
  useEffect(() => {
    if (!map.current) return;

    // Remove old marker
    if (destinyMarker.current) {
      destinyMarker.current.remove();
    }

    // Create destiny marker
    const el = document.createElement("div");
    el.className = "w-10 h-10 bg-red-500 rounded-full border-4 border-red-600 flex items-center justify-center shadow-lg";
    el.innerHTML =
      '<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>';

    destinyMarker.current = new mapboxgl.Marker({
      element: el,
      anchor: "center",
    })
      .setLngLat([pedido.destino_lng, pedido.destino_lat])
      .addTo(map.current);
  }, [pedido.destino_lat, pedido.destino_lng]);

  // Update repartidor marker
  useEffect(() => {
    if (!map.current || !repartidorUbicacion) return;

    // Remove old marker
    if (repartidorMarker.current) {
      repartidorMarker.current.remove();
    }

    // Create repartidor marker
    const el = document.createElement("div");
    el.className = "w-10 h-10 bg-blue-500 rounded-full border-4 border-blue-600 flex items-center justify-center shadow-lg";
    el.innerHTML =
      '<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9m-15-3h12m-12 6h12m-12 3h6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    repartidorMarker.current = new mapboxgl.Marker({
      element: el,
      anchor: "center",
    })
      .setLngLat([repartidorUbicacion.lng, repartidorUbicacion.lat])
      .addTo(map.current);

    // Fit bounds to show both markers
    if (map.current) {
      const bounds = new mapboxgl.LngLatBounds(
        [
          Math.min(repartidorUbicacion.lng, pedido.destino_lng),
          Math.min(repartidorUbicacion.lat, pedido.destino_lat),
        ],
        [
          Math.max(repartidorUbicacion.lng, pedido.destino_lng),
          Math.max(repartidorUbicacion.lat, pedido.destino_lat),
        ]
      );
      map.current.fitBounds(bounds, { padding: 80, maxZoom: 16 });
    }
  }, [repartidorUbicacion, pedido.destino_lat, pedido.destino_lng]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />

      {/* Distance Badge */}
      {distancia !== null && !isLoading && (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-4 py-3 border border-white/20">
          <div className="text-sm text-slate-600 font-medium">Distancia restante</div>
          <div className="text-2xl font-bold text-blue-600">
            {distancia < 1000 ? `${Math.round(distancia)} m` : `${(distancia / 1000).toFixed(1)} km`}
          </div>
        </div>
      )}

      {/* Courier Info */}
      {pedido.repartidores && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-4 py-3 border border-white/20 max-w-xs">
          <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Repartidor</div>
          <div className="font-bold text-slate-900">{pedido.repartidores.nombre}</div>
          <div className="text-sm text-slate-600 mt-1">{pedido.repartidores.vehiculo_descripcion}</div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center rounded-2xl">
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
    </div>
  );
}
