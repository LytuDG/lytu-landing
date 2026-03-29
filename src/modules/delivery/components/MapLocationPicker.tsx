import { useEffect, useRef, useState } from "react";
import * as maptiler from "@maptiler/sdk";
import { MapPin, Loader2 } from "lucide-react";
import { ENV } from "../../../env/env";

interface MapLocationPickerProps {
  initialLat?: number | null;
  initialLng?: number | null;
  onChange: (lat: number, lng: number) => void;
  height?: string;
}

export default function MapLocationPicker({
  initialLat,
  initialLng,
  onChange,
  height = "h-96",
}: MapLocationPickerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptiler.Map | null>(null);
  const marker = useRef<maptiler.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Coordenadas por defecto (La Habana, Cuba)
  const defaultLat = 23.1136;
  const defaultLng = -82.3666;

  useEffect(() => {
    if (!ENV.MAPTILER_API_KEY) {
      setError("MapTiler API key no está configurada");
      setIsLoading(false);
      return;
    }

    // Inicializar MapTiler SDK
    maptiler.config.apiKey = ENV.MAPTILER_API_KEY;

    if (!mapContainer.current) return;

    // Crear el mapa
    map.current = new maptiler.Map({
      container: mapContainer.current,
      style: "https://api.maptiler.com/maps/dark/style.json?key=" + ENV.MAPTILER_API_KEY,
      center: [initialLng ?? defaultLng, initialLat ?? defaultLat],
      zoom: 13,
    });

    // Esperar a que el mapa esté listo
    map.current.on("load", () => {
      // Agregar marcador inicial si hay coordenadas
      if (initialLat !== null && initialLng !== null && initialLat !== undefined && initialLng !== undefined) {
        marker.current = new maptiler.Marker()
          .setLngLat([initialLng, initialLat])
          .addTo(map.current!);
      }

      setIsLoading(false);
    });

    // Manejar clics en el mapa
    map.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;

      // Remover marcador anterior si existe
      if (marker.current) {
        marker.current.remove();
      }

      // Crear nuevo marcador
      marker.current = new maptiler.Marker({ color: "#00d9ff" })
        .setLngLat([lng, lat])
        .addTo(map.current!);

      // Actualizar coordenadas
      onChange(lat, lng);
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-cyan-400" />
        <label className="text-sm font-medium text-slate-200">
          Ubicación (Haz clic en el mapa para seleccionar)
        </label>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className={`relative overflow-hidden rounded-xl border border-slate-700 bg-slate-950 ${height}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="animate-spin text-cyan-400" size={24} />
              <p className="text-sm text-slate-400">Cargando mapa...</p>
            </div>
          </div>
        )}
        <div ref={mapContainer} className="h-full w-full" />
      </div>

      <p className="text-xs text-slate-400">
        💡 Selecciona una ubicación haciendo clic en el mapa. Las coordenadas se actualizarán automáticamente.
      </p>
    </div>
  );
}
