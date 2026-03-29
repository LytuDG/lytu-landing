import { Copy, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";

interface CredentialsModalProps {
  isOpen: boolean;
  email: string;
  password: string;
  userName: string;
  userType: "agencia" | "repartidor";
  onClose: () => void;
}

export default function CredentialsModal({
  isOpen,
  email,
  password,
  userName,
  userType,
  onClose,
}: CredentialsModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const userTypeLabel =
    userType === "agencia" ? "Agencia" : "Repartidor";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-green-500/30 bg-slate-900 shadow-2xl shadow-green-500/20">
        {/* Header */}
        <div className="border-b border-green-500/20 bg-green-500/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-green-400">
                ✓ Éxito
              </p>
              <h2 className="mt-1 text-lg font-semibold text-white">
                {userTypeLabel} creado correctamente
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg border border-green-500/30 p-2 text-green-400 transition hover:border-green-400 hover:bg-green-500/10"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-4">
          {/* User Name */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
              {userTypeLabel}
            </p>
            <div className="rounded-lg bg-slate-950/50 px-3 py-2 text-slate-100 font-medium">
              {userName}
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
              Email de acceso
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-lg bg-slate-950/50 px-3 py-2 text-sm text-slate-100 break-all">
                {email}
              </div>
              <button
                onClick={() => copyToClipboard(email, "email")}
                className={`rounded-lg p-2 transition ${
                  copiedField === "email"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          {/* Password */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
              Contraseña temporal
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-lg bg-slate-950/50 px-3 py-2 text-sm text-slate-100 font-mono break-all">
                {showPassword ? password : "•".repeat(password.length)}
              </div>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="rounded-lg bg-slate-800 p-2 text-slate-400 transition hover:text-slate-200"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button
                onClick={() => copyToClipboard(password, "password")}
                className={`rounded-lg p-2 transition ${
                  copiedField === "password"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-3">
            <p className="text-xs text-yellow-100">
              <strong>⚠️ Importante:</strong> Esta contraseña es temporal. El {userTypeLabel.toLowerCase()} debe cambiarla en su primer acceso.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-500"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
