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
  X,
} from "lucide-react";
import { useDeliveryAuth } from "../context/DeliveryAuthContext";

type NavItem = {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
};

function getNavItems(role: ReturnType<typeof useDeliveryAuth>["role"]): NavItem[] {
  if (role === "admin") {
    return [
      { label: "Agencias", path: "/ops/agencias", icon: Building2 },
      { label: "Repartidores", path: "/ops/repartidores", icon: Truck },
    ];
  }

  if (role === "agencia") {
    return [{ label: "Repartidores", path: "/ops/repartidores", icon: Truck }];
  }

  return [{ label: "Dashboard", path: "/ops/repartidores", icon: LayoutDashboard }];
}

export default function OpsLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, profile, role, signOut } = useDeliveryAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const navItems = React.useMemo(() => getNavItems(role), [role]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/ops/login");
  };

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
          Gestión de agencias y repartidores
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
          className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <Home size={20} />
          <span>Volver al sitio</span>
        </button>

        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className="hidden w-72 shrink-0 flex-col bg-slate-900 md:flex">
        {sidebarContent}
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 transition-transform duration-300 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80">
              LYTU
            </p>
            <h1 className="mt-2 bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
              Operaciones
            </h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-slate-400 transition-colors hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        {sidebarContent}
      </aside>

      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
        <header className="flex items-center border-b border-slate-800 bg-slate-900/80 px-4 py-4 backdrop-blur md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-slate-300 transition-colors hover:text-white"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
            Operaciones
          </span>
        </header>

        <main className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.14),_transparent_30%),linear-gradient(to_bottom,_#020617,_#0f172a)] p-4 md:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}