import { Clock, TrendingDown, MapPin } from "lucide-react";

export default function SOPDETASection() {
  return (
    <section className="py-24 bg-slate-900 border-b border-indigo-900/30">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            ETA Dinámico: Promesas que Cumples
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            No adivines cuándo llega la entrega. Calcula con precisión basado en contexto real en vivo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Cómo Funciona */}
          <div className="flex flex-col gap-6">
            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">Datos en Tiempo Real</h3>
                  <p className="text-slate-400 text-sm">Tráfico actual, velocidad del repartidor, entregas pendientes, construcciones, eventos locales.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">Cálculos Adaptativos</h3>
                  <p className="text-slate-400 text-sm">No es un ETA genérico. Cada minuto recalcula con la información más fresca.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">Predicción Inteligente</h3>
                  <p className="text-slate-400 text-sm">Aprende de entregas pasadas. Si lleve, sabe que el tráfico es más lento. Si es viernes, espera congestión.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Impacto Visual */}
          <div className="flex flex-col justify-center">
            <div className="p-8 bg-gradient-to-br from-cyan-900/30 to-slate-900 rounded-2xl border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-white mb-6">Impacto Comprobado</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-end gap-4 mb-2">
                    <span className="text-3xl font-bold text-cyan-400">±2min</span>
                    <span className="text-slate-400 text-sm mb-1">De margen de error</span>
                  </div>
                  <p className="text-slate-400 text-sm">Tus clientes saben exactamente cuándo comer. Sin sorpresas.</p>
                </div>

                <div className="border-t border-cyan-500/20 pt-6">
                  <div className="flex items-end gap-4 mb-2">
                    <span className="text-3xl font-bold text-cyan-400">↓68%</span>
                    <span className="text-slate-400 text-sm mb-1">Llamadas "¿Dónde está?"</span>
                  </div>
                  <p className="text-slate-400 text-sm">Transparencia = Menos soporte = Menos headaches.</p>
                </div>

                <div className="border-t border-cyan-500/20 pt-6">
                  <div className="flex items-end gap-4 mb-2">
                    <span className="text-3xl font-bold text-cyan-400">↑42%</span>
                    <span className="text-slate-400 text-sm mb-1">Recompra de clientes</span>
                  </div>
                  <p className="text-slate-400 text-sm">Confiabilidad es lo que genera lealtad.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Detail */}
        <div className="text-center p-6 bg-slate-950 rounded-xl border border-slate-800">
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            <span className="text-cyan-300 font-semibold">API de Tráfico Integrada:</span> Integramos con datos de Google Maps, Waze y sensores locales. El ETA no es una adivina, es ciencia.
          </p>
        </div>
      </div>
    </section>
  );
}
