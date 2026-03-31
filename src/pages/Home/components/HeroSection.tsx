import { ShoppingBag, MapPin, ArrowRight } from "lucide-react";

export default function HeroSection() {

  return (
    <header className="relative py-20 md:py-32 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenido */}
          <div className="animate-fade-in-right">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
              <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">
                Ecosistema Lytu
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white">
              Venta & Logística <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-500">
                Inteligente
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
              Tienda Online Premium &bull; Optimización de Rutas &bull; Tracking en Tiempo Real
              <br />
              <span className="text-slate-300 font-semibold inline-block mt-4">La solución integral para escalar tu negocio en Cuba: gestiona todo tu flujo desde la orden hasta la entrega.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/tienda-online" 
                className="group inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-indigo-600/20 hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Tienda Online
              </a>
              <a 
                href="#tracking" 
                className="group inline-flex items-center justify-center px-8 py-4 border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 font-bold rounded-full transition-all duration-300 hover:scale-105"
              >
                <MapPin className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Seguimiento de Domicilios
              </a>
            </div>
          </div>

          {/* Imagen */}
          <div className="relative animate-fade-in-up">
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-slate-800">
              <img 
                src="/images/hero-new.png" 
                alt="Lytu Tech: Ecosistema Completo de Venta y Logística" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Pequeño badge informativo opcional */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl animate-float hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">+35% Eficiencia</div>
                  <div className="text-slate-500 text-xs">en logística diaria</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
