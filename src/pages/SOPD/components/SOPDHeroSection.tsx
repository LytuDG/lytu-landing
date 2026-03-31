export default function SOPDHeroSection() {
  return (
    <header className="relative py-20 md:py-32 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenido */}
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6 backdrop-blur-sm animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
              <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">
                SOPD: SISTEMA DE OPTIMIZACIÓN
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Tu Centro de Mando <br />
              <span className="text-cyan-400">
                Logístico Inteligente
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
              Olvídate de coordinar manualmente. IA que agrupa pedidos, optimiza rutas, reduce combustible y multiplica entregas.
              <br />
              <span className="text-slate-300 font-semibold inline-block mt-4">Tecnología probada en TuViaja con millones de entregas</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href="#sopd-planes" 
                className="inline-flex items-center justify-center px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-cyan-600/20"
              >
                VER PLANES SOPD
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold rounded-full transition-all duration-300"
              >
                SCHEDULE DEMO
              </a>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold text-cyan-400 mb-1">-30%</div>
                <p className="text-slate-400 text-sm">Reducción en Combustible</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold text-cyan-400 mb-1">+45%</div>
                <p className="text-slate-400 text-sm">Más Entregas/Día</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold text-cyan-400 mb-1">5min</div>
                <p className="text-slate-400 text-sm">Setup Inicial</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold text-cyan-400 mb-1">24/7</div>
                <p className="text-slate-400 text-sm">Soporte Dedicado</p>
              </div>
            </div>
          </div>

          {/* Imagen */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20">
              <img 
                src="/images/dashboard-sopd.png" 
                alt="Dashboard SOPD - Centro de Mando Logístico" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
