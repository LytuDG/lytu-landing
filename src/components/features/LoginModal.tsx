import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-gradient-to-br from-indigo-900/90 to-cyan-800/80 p-8 rounded-2xl shadow-2xl text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white"
          >
            <X size={20} />
          </button>

          <div className="mb-4">
            <h3 className="text-2xl font-bold">Bienvenido de vuelta</h3>
            <p className="text-slate-300 text-sm">
              Accede a tu panel y gestiona tus proyectos.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <input
              type="email"
              placeholder="correo@empresa.com"
              className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/10 placeholder-slate-300 text-white focus:outline-none"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/10 placeholder-slate-300 text-white focus:outline-none"
            />

            <button className="w-full py-3 rounded-full bg-white text-indigo-700 font-bold">
              Entrar
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-300">
            ¿No tienes cuenta?{" "}
            <a href="#" className="text-white font-semibold">
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
