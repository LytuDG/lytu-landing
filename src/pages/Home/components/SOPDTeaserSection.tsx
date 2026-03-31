import { Zap, Clock, BarChart3, ArrowRight } from "lucide-react";

export default function SOPDTeaserSection() {
  return (
    <section id="sopd-teaser" className="py-24 bg-slate-900 border-b border-indigo-900/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
              <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">SOPD: Sistema de Optimización</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
              Tu Centro de Mando Logístico
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Olvídate de llamadas, chats confusos y mensajeros perdidos. SOPD es la inteligencia que coordina tu flota como si fuera un enjambre perfectamente sincronizado.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Algoritmos de Ruta Inteligente</h3>
                  <p className="text-slate-400 text-sm">IA que agrupa pedidos por zona geográfica, minimiza distancias y ahorra combustible de verdad.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                  <Clock className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">ETA Dinámico en Tiempo Real</h3>
                  <p className="text-slate-400 text-sm">Calcula tiempos exactos de llegada basado en tráfico, entregas múltiples y contexto real.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                  <BarChart3 className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Dashboard Inteligente</h3>
                  <p className="text-slate-400 text-sm">Decisiones basadas en datos: pedidos/hora, rentabilidad por ruta, efectividad de mensajeros.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/sopd" 
                className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-full transition-all duration-300"
              >
                Explorar SOPD en Detalle
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a 
                href="/tienda-online" 
                className="inline-flex items-center justify-center px-6 py-3 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 font-bold rounded-full transition-colors"
              >
                Ver Tienda Online
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          {/* Imagen: dashboard-sopd */}
          <div className="relative">
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/dashboard-sopd.png" 
                alt="Dashboard SOPD - Centro de Mando Logístico" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
