import { Mic, Navigation, AlertCircle } from "lucide-react";

export default function SOPDNavigationSection() {
  return (
    <section className="py-24 bg-slate-950 border-b border-indigo-900/30">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
              <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest">Premium Feature</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
              Navegación por Voz: El Copiloto Inteligente
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Tu repartidor no necesita mirar el teléfono. Las instrucciones vienen por audio, paso a paso, con audífonos integrados. Más seguro, más rápido, más entregas.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                  <Mic className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Instrucciones Audibles Paso a Paso</h3>
                  <p className="text-slate-400 text-sm">"En 150 metros gira a la derecha. Edificio azul. Apto 5B." — Sin necesidad de mirar.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                  <Navigation className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Integración con Mapas de Moto</h3>
                  <p className="text-slate-400 text-sm">Rutas optimizadas para motos. Evita autopistas innecesarias, prioriza vías rápidas.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                  <AlertCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Información de Rutas</h3>
                  <p className="text-slate-400 text-sm">Avisos sobre zonas de congestionamiento, incidentes viales, y construcciones activas.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <p className="text-emerald-300 text-sm">
                <span className="font-bold">Resultado:</span> Tus mensajeros llegan +15% más rápido sin el estrés de navegar en vías congestionadas.
              </p>
            </div>
          </div>

          {/* Placeholder visual */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex items-center justify-center">
              <div className="text-center z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 mb-4">
                  <Mic className="w-8 h-8 text-emerald-400" />
                </div>
                <p className="text-slate-400 font-medium">Navegación por Voz</p>
                <p className="text-slate-500 text-sm">Repartidor en Ruta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
