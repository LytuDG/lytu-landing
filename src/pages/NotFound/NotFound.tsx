import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-900/10" />
      <div className="absolute top-0 left-0 w-1/3 h-full bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400 mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Página no encontrada
        </h2>
        <p className="text-slate-400 text-lg max-w-lg mx-auto mb-10">
          Parece que te has perdido en el ciberespacio. La página que buscas no
          existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-8 py-4 bg-indigo-600 rounded-full font-bold text-white hover:bg-indigo-700 transition-colors shadow-lg group"
        >
          <ArrowLeft
            className="mr-2 group-hover:-translate-x-1 transition-transform"
            size={20}
          />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
