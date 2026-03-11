import { Eye, Zap, TrendingUp } from "lucide-react";

export default function SolutionSection() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
          Por eso creamos la web perfecta para tu restaurante
        </h2>
        <p className="text-lg text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed">
          En lytu.tech diseñamos páginas web y aplicaciones a la medida de negocios de comida. Rápidas, bonitas y fáciles de actualizar. Para que tus clientes te encuentren, vean tu menú y te hagan pedidos directo por WhatsApp.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Beneficio 1 */}
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors duration-300">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Más clientes</h3>
            <p className="text-slate-400 leading-relaxed">
              Aparece en Google con toda tu información actualizada y visible en segundos.
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors duration-300">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-400">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Menos trabajo</h3>
            <p className="text-slate-400 leading-relaxed">
              Los pedidos llegan automáticamente a tu WhatsApp de forma organizada.
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors duration-300">
            <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-400">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Más ventas</h3>
            <p className="text-slate-400 leading-relaxed">
              El cliente ve fotos y precios, elige lo que le gusta y pide sin necesidad de llamar.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
