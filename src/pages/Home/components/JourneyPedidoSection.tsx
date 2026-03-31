import { ShoppingBag, Truck, MapPin, ArrowRight } from "lucide-react";

export default function JourneyPedidoSection() {
  return (
    <section className="py-24 bg-slate-950 border-b border-indigo-900/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            El Ecosistema Completo: Vende, Optimiza, Entrega
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            No son herramientas separadas. Es un sistema integrado donde cada componente habla con el siguiente. Sin fricciones. Sin sorpresas.
          </p>
        </div>

        <div className="relative">
          {/* Línea conectora visual */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {/* Paso 1: Tienda */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-8 relative">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-indigo-600/20">
                  <ShoppingBag className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -right-2 -bottom-2 w-7 h-7 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-sm border-4 border-slate-950">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Tienda Online</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                Tu cliente escanea un QR, abre tu menú, elige, paga. La experiencia es tan fluida que vuelve.
              </p>
              <div className="text-sm text-cyan-400 font-semibold">
                → El carrito se sincroniza automáticamente
              </div>
            </div>

            {/* Flecha en mobile */}
            <div className="lg:hidden flex justify-center my-4">
              <ArrowRight className="w-6 h-6 text-indigo-500 rotate-90" />
            </div>

            {/* Paso 2: SOPD */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-8 relative">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-cyan-600/20">
                  <Truck className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -right-2 -bottom-2 w-7 h-7 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold text-sm border-4 border-slate-950">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">SOPD: Optimización</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                IA agrupa pedidos por zona, optimiza rutas, asigna al mensajero más cercano. Todo en segundos.
              </p>
              <div className="text-sm text-cyan-400 font-semibold">
                → Menos combustible. Más ganancias.
              </div>
            </div>

            {/* Flecha en mobile */}
            <div className="lg:hidden flex justify-center my-4">
              <ArrowRight className="w-6 h-6 text-indigo-500 rotate-90" />
            </div>

            {/* Paso 3: Tracking */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-8 relative">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-emerald-600/20">
                  <MapPin className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -right-2 -bottom-2 w-7 h-7 rounded-full bg-indigo-400 text-white flex items-center justify-center font-bold text-sm border-4 border-slate-950">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Tracking: Tranquilidad</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                Tu cliente ve la moto acercarse en vivo. La ansiedad baja. Las recompras suben. Soporte desciende.
              </p>
              <div className="text-sm text-cyan-400 font-semibold">
                → Fidelidad a través de transparencia
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Estos tres sistemas hablan entre sí. No necesitas integrar APIs con 5 herramientas diferentes. Todo está dentro del mismo ecosistema Lytu.
          </p>
          <div className="inline-block px-6 py-3 bg-indigo-500/10 border border-indigo-500/30 rounded-full">
            <span className="text-indigo-300 font-semibold">🔗 Un sistema. Infinitas posibilidades.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
