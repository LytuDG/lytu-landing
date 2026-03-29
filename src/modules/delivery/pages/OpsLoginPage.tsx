import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Loader2,
  Lock,
  Mail,
  Truck,
} from "lucide-react";
import { useDeliveryAuth } from "../context/DeliveryAuthContext";

function getDefaultRoute(role: ReturnType<typeof useDeliveryAuth>["role"]) {
  return role === "admin" ? "/ops/agencias" : "/ops/repartidores";
}

export default function OpsLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loading, profile, role, signInWithPassword } = useDeliveryAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fallbackRoute = useMemo(() => getDefaultRoute(role), [role]);
  const from = location.state?.from?.pathname;

  useEffect(() => {
    if (!loading && profile) {
      navigate(from || fallbackRoute, { replace: true });
    }
  }, [fallbackRoute, from, loading, navigate, profile]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await signInWithPassword(email, password);

      if (result.error) {
        throw result.error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-cyan-400" size={48} />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/2 -top-1/2 h-full w-full animate-pulse bg-gradient-radial from-indigo-900/20 via-transparent to-transparent blur-3xl" />
        <div
          className="absolute -bottom-1/2 -right-1/2 h-full w-full animate-pulse bg-gradient-radial from-cyan-900/20 via-transparent to-transparent blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div
        className="absolute left-8 top-8 flex cursor-pointer items-center space-x-2"
        onClick={() => navigate("/")}
      >
        <div className="flex h-10 w-10 rotate-3 items-center justify-center rounded-lg bg-linear-to-tr from-indigo-500 to-cyan-400 shadow-lg shadow-cyan-500/50">
          <span className="text-xl font-bold text-white">L</span>
        </div>
        <span className="text-2xl font-bold tracking-tighter text-white">
          ytu
        </span>
      </div>

      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-indigo-500 to-cyan-400 opacity-20 blur-xl" />

        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-500 to-cyan-400 shadow-lg shadow-cyan-500/30">
              <Truck className="text-white" size={28} />
            </div>
            <h2 className="mb-2 text-3xl font-extrabold text-white">
              Acceso Operativo
            </h2>
            <p className="text-sm text-slate-400">
              Ingresa para administrar agencias y repartidores
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 backdrop-blur-sm">
              <AlertCircle size={20} className="shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300"
              >
                Correo electrónico
              </label>
              <div className="group relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-cyan-400"
                  size={20}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="operaciones@lytu.dev"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3.5 pl-12 pr-4 text-white placeholder-slate-500 transition-all focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300"
              >
                Contraseña
              </label>
              <div className="group relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-cyan-400"
                  size={20}
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3.5 pl-12 pr-4 text-white placeholder-slate-500 transition-all focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-cyan-400 px-4 py-3.5 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Ingresando...</span>
                </>
              ) : (
                <>
                  <span>Iniciar sesión</span>
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-slate-800 pt-6">
            <p className="text-center text-sm text-slate-500">
              Módulo protegido · Solo personal autorizado
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
    </div>
  );
}