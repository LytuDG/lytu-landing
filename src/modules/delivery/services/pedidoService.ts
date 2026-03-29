import { supabase } from "../../../lib/supabase";
import type { Pedido, RepartidorLocation } from "../types";

export async function getPedidoByTrackingCode(
  codigoSeguimiento: string
): Promise<{ success: boolean; data?: Pedido; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("pedidos")
      .select(
        `
        id,
        codigo,
        codigo_seguimiento,
        agencia_id,
        repartidor_id,
        destino_lat,
        destino_lng,
        referencia,
        estado,
        created_at,
        repartidores(id, nombre, vehiculo_descripcion),
        agencias(id, nombre, direccion, ubicacion_lat, ubicacion_lng)
      `
      )
      .eq("codigo_seguimiento", codigoSeguimiento.toUpperCase())
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data) {
      return { success: false, error: "Pedido no encontrado" };
    }

    return { success: true, data: data as Pedido };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return { success: false, error: message };
  }
}

export async function getRepartidorUbicacionActual(
  repartidorId: string
): Promise<{ success: boolean; data?: RepartidorLocation; error?: string }> {
  try {
    // Obtener ubicación actual directamente de la tabla repartidores
    const { data: repartidor, error: repartidorError } = await supabase
      .from("repartidores")
      .select("id, ubicacion_actual_lat, ubicacion_actual_lng")
      .eq("id", repartidorId)
      .single();

    if (repartidorError) {
      return { success: false, error: repartidorError.message };
    }

    if (
      repartidor &&
      repartidor.ubicacion_actual_lat &&
      repartidor.ubicacion_actual_lng
    ) {
      return {
        success: true,
        data: {
          id: repartidor.id,
          repartidor_id: repartidor.id,
          lat: repartidor.ubicacion_actual_lat,
          lng: repartidor.ubicacion_actual_lng,
          timestamp: new Date().toISOString(),
        },
      };
    }

    return {
      success: false,
      error: "Ubicación del repartidor no disponible",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return { success: false, error: message };
  }
}

export function subscribeToRepartidorUbicacion(
  repartidorId: string,
  callback: (ubicacion: RepartidorLocation | null) => void
) {
  try {
    const channel = supabase
      .channel(`repartidor_ubicacion:${repartidorId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "repartidores",
          filter: `id=eq.${repartidorId}`,
        },
        (payload: any) => {
          if (payload.new) {
            const { id, ubicacion_actual_lat, ubicacion_actual_lng } = payload.new;
            if (ubicacion_actual_lat && ubicacion_actual_lng) {
              const ubicacion: RepartidorLocation = {
                id: id,
                repartidor_id: id,
                lat: ubicacion_actual_lat,
                lng: ubicacion_actual_lng,
                timestamp: new Date().toISOString(),
              };
              callback(ubicacion);
            }
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  } catch (err) {
    console.error("Error subscribing to repartidor ubicación:", err);
    return () => {};
  }
}

export async function getRouteAndDistance(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  maptilerApiKey: string
): Promise<{
  success: boolean;
  route?: any;
  distance?: number;
  duration?: number;
  error?: string;
}> {
  try {
    // Usar OSRM (más simple y no requiere autenticación)
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?geometries=geojson`
    );

    if (!response.ok) {
      return { success: false, error: "Error al obtener la ruta" };
    }

    const data = await response.json();

    if (data.code === "Ok" && data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      return {
        success: true,
        route: route.geometry, // GeoJSON LineString
        distance: route.distance, // en metros
        duration: route.duration, // en segundos
      };
    }

    return { success: false, error: "No se encontró ruta" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return { success: false, error: message };
  }
}

/**
 * Calcula la distancia entre dos puntos en metros usando la fórmula de Haversine
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // Radio de la Tierra en metros
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
