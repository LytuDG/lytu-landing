export default function HeroSection() {

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
                SISTEMAS PREMIUM
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Sistemas Premium <br />
              <span className="text-cyan-400">
                para Restaurantes
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
              Diseño profesional &bull; Menú digital &bull; Pedidos por WhatsApp &bull; App Móvil
              <br />
              <span className="text-slate-300 font-semibold inline-block mt-4">Plataformas de venta premium para bares y restaurantes en Cuba</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/tienda-online" 
                className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all duration-300"
              >
                Tienda Online
              </a>
              <a 
                href="#tracking" 
                className="inline-flex items-center justify-center px-8 py-4 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 font-bold rounded-full transition-colors"
              >
                Seguimiento de Domicilios
              </a>
            </div>
          </div>

          {/* Imagen */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20">
              <img 
                src="/images/hero-new.png" 
                alt="Lytu Tech: Ecosistema Completo de Venta y Logística" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
