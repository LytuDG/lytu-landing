import { Smartphone, ShoppingBag, MessageCircle, ArrowRight } from "lucide-react";

export default function SolutionSection() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Un flujo de ventas simple y sin comisiones
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Eliminamos la fricción entre el hambre de tu cliente y tu cocina. Así es como funciona el sistema que construimos para ti.
          </p>
        </div>

        <div className="relative">
          {/* Línea conectora (se oculta en móviles, visible en md en adelante) */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {/* Paso 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all duration-300 relative">
                <Smartphone className="w-10 h-10" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold border-4 border-slate-950">1</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Escanea o Visita</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                A través de un código QR en la mesa o un enlace en tu Instagram, el cliente entra directamente a tu menú optimizado.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300 relative">
                <ShoppingBag className="w-10 h-10" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-bold border-4 border-slate-950">2</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Elige a su gusto</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Ve fotos reales, selecciona acompañantes, notas especiales y añade todo a su carrito sin necesidad de llamar por teléfono.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300 relative">
                <MessageCircle className="w-10 h-10" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold border-4 border-slate-950">3</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Pedido a tu WhatsApp</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Recibes un mensaje estructurado con el nombre, dirección, total en CUP y desglose del pedido, listo para confirmar.
              </p>
            </div>
          </div>
        </div>
        
        {/* Enlace orgánico hacia los precios */}
        <div className="mt-20 flex justify-center animate-fade-in-up">
            <a href="#planes" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-300 font-medium group">
                Descubre cómo configurarlo para tu negocio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
        </div>

      </div>
    </section>
  );
}
