import { Mail, RefreshCw, Loader2, X } from "lucide-react";
import { useState } from "react";

interface CreateUserModalProps {
  isOpen: boolean;
  agenciaName: string;
  isCreating?: boolean;
  onSubmit: (email: string, password: string) => Promise<void>;
  onCancel: () => void;
}

export default function CreateUserModal({
  isOpen,
  agenciaName,
  isCreating = false,
  onSubmit,
  onCancel,
}: CreateUserModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const generateEmail = () => {
    const sanitized = agenciaName
      .toLowerCase()
      .replace(/[^\w.-]/g, "")
      .replace(/\s+/g, ".")
      .substring(0, 30);
    const timestamp = Date.now();
    setEmail(`agencia.${sanitized}.${timestamp}@lytuapp.com`);
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pwd = "";
    for (let i = 0; i < 16; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pwd);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("El email es requerido");
      return;
    }

    if (!password.trim()) {
      setError("La contraseña es requerida");
      return;
    }

    try {
      await onSubmit(email, password);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al crear el usuario";
      setError(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-linear-to-b from-slate-900 to-slate-950 shadow-2xl shadow-slate-950/60 max-h-[90vh] overflow-y-auto">
        <div className="border-b border-slate-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-cyan-400">
                Paso 2
              </p>
              <h2 className="mt-1 text-lg font-semibold text-white">
                Crear usuario admin
              </h2>
            </div>
            <button
              onClick={onCancel}
              disabled={isCreating}
              className="rounded-lg p-1 hover:bg-slate-800 disabled:opacity-50"
            >
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-sm text-slate-300">
              Se creó la agencia <strong className="text-cyan-300">{agenciaName}</strong> exitosamente.
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Ahora crea las credenciales para el usuario administrador.
            </p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isCreating}
                    placeholder="usuario@example.com"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50"
                  />
                </div>
                <button
                  type="button"
                  onClick={generateEmail}
                  disabled={isCreating}
                  className="rounded-lg border border-slate-700 bg-slate-800/50 p-2.5 text-slate-300 transition hover:border-slate-600 hover:bg-slate-700 disabled:opacity-50"
                  title="Generar email automático"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Contraseña <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isCreating}
                    placeholder="••••••••••••••••"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-sm text-white placeholder-slate-500 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isCreating}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 disabled:opacity-50"
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={generatePassword}
                  disabled={isCreating}
                  className="rounded-lg border border-slate-700 bg-slate-800/50 p-2.5 text-slate-300 transition hover:border-slate-600 hover:bg-slate-700 disabled:opacity-50"
                  title="Generar contraseña aleatoria"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Mínimo 8 caracteres. Se recomienda usar la opción de generar.
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isCreating}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-700 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700 disabled:opacity-50"
            >
              {isCreating && <Loader2 className="h-4 w-4 animate-spin" />}
              {isCreating ? "Creando..." : "Crear usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
