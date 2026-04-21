import { Eye, Heart, Phone, ArrowRight } from "lucide-react";

export default function TrackingTeaserSection() {
  return (
    <section className="py-24 bg-slate-950 border-b border-indigo-900/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagen: tracking-app */}
          <div className="relative order-2 lg:order-1 flex justify-center">
            <div className="w-full max-w-xs rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/images/tracking-app.png" 
                alt="Tracking App - Seguimiento en Vivo" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Contenido */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
              <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest">Tracking: Experiencia del Cliente</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
              Fideliza con Transparencia
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Tu cliente ve la moto acercarse en el mapa. No es solo información, es dopamina. Reduce ansiedad, aumenta confianza, multiplica recompras.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                  <Eye className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Mapa Interactivo en Vivo</h3>
                  <p className="text-slate-400 text-sm">El cliente ve exactamente dónde está su pedido. Cada segundo actualizado, sin sorpresas.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                  <Heart className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Reduce Ansiedad = Aumenta Recompras</h3>
                  <p className="text-slate-400 text-sm">La incertidumbre mata la satisfacción. La visibilidad la restaura. Clientes satisfechos vuelven.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                  <Phone className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Menos Llamadas de Soporte</h3>
                  <p className="text-slate-400 text-sm">El cliente no necesita llamar si ve exactamente dónde está su pedido. Soporte automático.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#planes" 
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Ver Planes con Tracking
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a 
                href="#contacto" 
                className="inline-flex items-center justify-center px-6 py-3 border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-bold rounded-full transition-colors"
              >
                Consultar Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
