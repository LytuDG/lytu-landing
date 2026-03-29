export type DeliveryUserRole = "admin" | "agencia" | "repartidor";
export type PedidoStatus = "cocinando" | "listo" | "recogido" | "en_ruta" | "entregado" | "cancelado";

export interface DeliveryUserProfile {
  id: string;
  email: string;
  rol: DeliveryUserRole;
  agencia_id: string | null;
  repartidor_id: string | null;
  created_at: string;
}

export interface Agencia {
  id: string;
  nombre: string;
  direccion: string | null;
  ubicacion_lat: number | null;
  ubicacion_lng: number | null;
  telefono: string | null;
  created_at: string | null;
}

export interface Repartidor {
  id: string;
  agencia_id: string | null;
  nombre: string;
  vehiculo_descripcion: string | null;
  telefono: string | null;
  activo: boolean | null;
  ubicacion_actual_lat: number | null;
  ubicacion_actual_lng: number | null;
  created_at: string | null;
  agencia?: Agencia | null;
}

export interface AgenciaFormValues {
  nombre: string;
  direccion: string;
  ubicacion_lat: string;
  ubicacion_lng: string;
  telefono: string;
}

export interface RepartidorFormValues {
  agencia_id: string;
  nombre: string;
  vehiculo_descripcion: string;
  telefono: string;
  activo: boolean;
}

export interface DeliveryAuthContextType {
  loading: boolean;
  userId: string | null;
  email: string | null;
  profile: DeliveryUserProfile | null;
  role: DeliveryUserRole | null;
  agencyId: string | null;
  courierId: string | null;
  signInWithPassword: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const EMPTY_AGENCIA_FORM: AgenciaFormValues = {
  nombre: "",
  direccion: "",
  ubicacion_lat: "",
  ubicacion_lng: "",
  telefono: "",
};

export const EMPTY_REPARTIDOR_FORM: RepartidorFormValues = {
  agencia_id: "",
  nombre: "",
  vehiculo_descripcion: "",
  telefono: "",
  activo: true,
};

// Pedido related types
export interface Pedido {
  id: string;
  codigo: string;
  codigo_seguimiento: string;
  agencia_id: string;
  repartidor_id: string;
  destino_lat: number;
  destino_lng: number;
  referencia: string | null;
  estado: PedidoStatus;
  created_at: string;
  repartidores?: {
    id: string;
    nombre: string;
    vehiculo_descripcion: string | null;
  } | null;
  agencias?: Agencia | null;
}

export interface RepartidorLocation {
  id: string;
  repartidor_id: string;
  lat: number;
  lng: number;
  timestamp: string;
}

export interface TrackingData {
  pedido: Pedido;
  repartidorUbicacion: RepartidorLocation | null;
  distancia: number | null; // en metros
}
