import { ArrowRight } from "lucide-react";

export default function TiendaOnlineHero() {
  return (
    <header className="relative py-20 md:py-32 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenido */}
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6 backdrop-blur-sm animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
              <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">
                TIENDA ONLINE PREMIUM
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Tu Menú Digital <br />
              <span className="text-cyan-400">
                al Alcance de Todos
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
              Cero comisiones. Cero fricciones. Tus clientes ordenan directo, y tú vendes sin intermediarios.
              <br />
              <span className="text-slate-300 font-semibold inline-block mt-4">Diseño profesional + Menú Digital + Pedidos por WhatsApp</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#planes" 
                className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all duration-300"
              >
                VER PLANES Y PRECIOS
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-4 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 font-bold rounded-full transition-colors"
              >
                Consultar Demo
              </a>
            </div>
          </div>

          {/* Imagen */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20">
              <img 
                src="/images/menu-digital.png" 
                alt="Menú Digital - Tienda Online Premium" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
