import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  Building2,
  Truck,
  Package,
  TrendingUp,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useDeliveryAuth } from "../../modules/delivery/context/DeliveryAuthContext";

interface DashboardStats {
  total_agencias: number;
  total_repartidores: number;
  pedidos_activos: number;
  pedidos_entregados: number;
}

export default function TrackingDashboardPage() {
  const { profile, role } = useDeliveryAuth();
  const [stats, setStats] = useState<DashboardStats>({
    total_agencias: 0,
    total_repartidores: 0,
    pedidos_activos: 0,
    pedidos_entregados: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, [role, profile]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      let total_agencias = 0;
      let total_repartidores = 0;
      let pedidos_activos = 0;
      let pedidos_entregados = 0;

      // Admin ve todo
      if (role === "admin") {
        // Total agencias
        const { count: agenciasCount } = await supabase
          .from("agencias")
          .select("id", { count: "exact" });
        total_agencias = agenciasCount || 0;

        // Total repartidores
        const { count: repartidoresCount } = await supabase
          .from("repartidores")
          .select("id", { count: "exact" });
        total_repartidores = repartidoresCount || 0;

        // Pedidos activos
        const { count: activosCount } = await supabase
          .from("pedidos")
          .select("id", { count: "exact" })
          .in("estado", ["cocinando", "en_camino"]);
        pedidos_activos = activosCount || 0;

        // Pedidos entregados
        const { count: entregadosCount } = await supabase
          .from("pedidos")
          .select("id", { count: "exact" })
          .eq("estado", "entregado");
        pedidos_entregados = entregadosCount || 0;
      } else if (role === "agencia" && profile?.agencia_id) {
        // Agencia solo ve sus datos
        total_agencias = 1; // Su propia agencia

        // Sus repartidores
        const { count: repartidoresCount } = await supabase
          .from("repartidores")
          .select("id", { count: "exact" })
          .eq("agencia_id", profile.agencia_id);
        total_repartidores = repartidoresCount || 0;

        // Sus pedidos activos
        const { count: activosCount } = await supabase
          .from("pedidos")
          .select("id", { count: "exact" })
          .eq("agencia_id", profile.agencia_id)
          .in("estado", ["cocinando", "en_camino"]);
        pedidos_activos = activosCount || 0;

        // Sus pedidos entregados
        const { count: entregadosCount } = await supabase
          .from("pedidos")
          .select("id", { count: "exact" })
          .eq("agencia_id", profile.agencia_id)
          .eq("estado", "entregado");
        pedidos_entregados = entregadosCount || 0;
      }

      setStats({
        total_agencias,
        total_repartidores,
        pedidos_activos,
        pedidos_entregados,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError("Error al cargar estadísticas");
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    subtitle,
  }: {
    title: string;
    value: number;
    icon: any;
    color: string;
    subtitle?: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Panel de Operaciones
        </h1>
        <p className="text-gray-500 mt-2">
          Bienvenido{" "}
          {role === "admin"
            ? "al panel de administración"
            : role === "agencia"
              ? " a tu agencia"
              : " a tu perfil"}{" "}
          de tracking
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-red-900 font-medium">Error</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {role === "admin" && (
            <StatCard
              title="Agencias Registradas"
              value={stats.total_agencias}
              icon={Building2}
              color="bg-blue-500"
            />
          )}

          <StatCard
            title={role === "admin" ? "Repartidores" : "Mis Repartidores"}
            value={stats.total_repartidores}
            icon={Truck}
            color="bg-purple-500"
          />

          <StatCard
            title="Entregas en Progreso"
            value={stats.pedidos_activos}
            icon={Package}
            color="bg-orange-500"
            subtitle="Cocinando + En camino"
          />

          <StatCard
            title="Entregas Completadas"
            value={stats.pedidos_entregados}
            icon={TrendingUp}
            color="bg-green-500"
          />
        </div>
      )}

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {role === "admin" && (
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Building2 className="text-white" size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">Gestionar Agencias</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Crear, editar y eliminar agencias, ver su ubicación en mapa
                </p>
              </div>
              <a
                href="/admin/agencias"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Ir →
              </a>
            </div>
          </div>
        )}

        <div
          className={`bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200`}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500 rounded-lg">
              <Truck className="text-white" size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">
                Gestionar Repartidores
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Ver ubicaciones en tiempo real, crear repartidores, ver historial
              </p>
            </div>
            <a
              href="/admin/repartidores"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Ir →
            </a>
          </div>
        </div>
      </div>

      {/* Quick Stats Info */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mt-8">
        <h4 className="font-semibold text-indigo-900 mb-2">💡 Información</h4>
        <p className="text-sm text-indigo-800">
          Este panel te permite gestionar agencias y repartidores del sistema de
          tracking. Desde aquí puedes crear nuevas entregas, asignar repartidores y
          ver el estado de todas las entregas en tiempo real.
        </p>
      </div>
    </div>
  );
}
