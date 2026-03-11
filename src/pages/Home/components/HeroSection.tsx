export default function HeroSection() {

  return (
    <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950"></div>

      <div className="container mx-auto px-6 relative z-20 pt-20 flex justify-center">
        <div className="max-w-4xl text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6 backdrop-blur-sm animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
            <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">
              ESPECIALISTAS EN RESTAURANTES
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-8">
            Tu Web de Restaurante, <br />
            <span className="text-cyan-400">
              Hecha Para Vender
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-4xl leading-relaxed mx-auto animate-fade-in-up delay-200">
            Diseño profesional &bull; Menú digital &bull; Pedidos por WhatsApp &bull; App Móvil
            <br />
            <span className="text-slate-300 font-semibold inline-block mt-4">Especialistas en bares y restaurantes en Cuba</span>
          </p>

            <div
              className="flex justify-center items-center gap-4 animate-fade-in-up delay-300 mb-16"
            >
              <a 
                href="#planes" 
                className="inline-flex items-center justify-center px-8 lg:px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-indigo-600/20"
              >
                VER PLANES Y PRECIOS
              </a>
            </div>

            <div className="relative mx-auto mt-12 max-w-5xl animate-fade-in-up delay-500 px-4 sm:px-0">
              <img 
                src="/images/menu-digital.png" 
                alt="Demo App Menú Digital" 
                className="w-full mb-2 h-auto object-contain rounded-2xl hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </header>
  );
}
