import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Truck,
  UserCircle2,
  Users,
  X,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useDeliveryAuth } from "../../modules/delivery/context/DeliveryAuthContext";

type NavItem = {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
};

function getNavItems(role: ReturnType<typeof useDeliveryAuth>["role"]): NavItem[] {
  // Admin puede ver todo
  if (role === "admin") {
    return [
      { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Agencias", path: "/admin/agencias", icon: Building2 },
      { label: "Repartidores", path: "/admin/repartidores", icon: Truck },
      { label: "Usuarios", path: "/admin/usuarios", icon: Users },
    ];
  }

  // Agencia solo ve sus repartidores
  if (role === "agencia") {
    return [
      { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Repartidores", path: "/admin/repartidores", icon: Truck },
    ];
  }

  return [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  ];
}

export default function TrackingAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, profile, role, signOut, loading } = useDeliveryAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // ✅ TODOS los hooks ANTES de cualquier condicional de rendering
  const navItems = React.useMemo(() => getNavItems(role), [role]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  // ✅ Los condicionales de rendering vienen DESPUÉS de todos los hooks
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <Loader2 className="animate-spin text-cyan-400 mx-auto mb-4" size={48} />
          <p className="text-slate-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <AlertCircle className="text-red-400 mx-auto mb-4" size={48} />
          <p className="text-slate-400 mb-4">No autorizado acceso a operaciones</p>
          <button
            onClick={() => navigate("/admin/login")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          >
            Volver a login
          </button>
        </div>
      </div>
    );
  }

  const sidebarContent = (
    <>
      <div className="border-b border-slate-800 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80">
          LYTU
        </p>
        <h1 className="mt-2 bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
          Operaciones
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Gestión de agencias y entregas
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-800/60 px-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
            <UserCircle2 size={22} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{email}</p>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {profile?.rol ?? "sin rol"}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2 mb-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <Home size={20} />
          <span>Volver al sitio</span>
        </button>

        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 shrink-0 flex-col overflow-hidden bg-slate-900 md:flex">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 flex-col overflow-y-auto bg-slate-900 md:hidden flex">
        {sidebarContent}
      </aside>

      {/* Main Content */}
      <div className="flex max-h-screen w-full flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="border-b border-gray-200 bg-white p-4 md:hidden">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">LYTU Operaciones</h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
