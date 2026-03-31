import { ShoppingBag, Clock, Zap, ArrowRight } from "lucide-react";

export default function TiendaOnlineSection() {
  return (
    <section className="py-24 bg-slate-900 border-b border-indigo-900/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
            <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">Tienda Online</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Vende Sin Intermediarios
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Tu menú digital. Cero comisiones. Tus clientes ordenan directo por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col p-8 bg-slate-950 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-all">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-6">
              <ShoppingBag className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Menú Interactivo</h3>
            <p className="text-slate-400">Fotos reales, precios actualizados, opciones personalizables. Tus clientes ven lo que realmente necesitan.</p>
          </div>

          <div className="flex flex-col p-8 bg-slate-950 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-all">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Disponibilidad 24/7</h3>
            <p className="text-slate-400">Tu tienda online siempre abierta. Tus clientes compran cuando les conviene, no solo en horario presencial.</p>
          </div>

          <div className="flex flex-col p-8 bg-slate-950 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-all">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Sin Comisiones</h3>
            <p className="text-slate-400">No pagas nada por transacción. Tus ingresos íntegros. Plataformas de terceros no ganan de ti.</p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="/tienda-online" 
            className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all duration-300"
          >
            Explorar Tienda Online
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
