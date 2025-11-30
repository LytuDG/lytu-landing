import { ChevronRight, Smartphone, ArrowRight } from "lucide-react";

export default function PortfolioSection() {
  return (
    <section id="proyectos" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Nuestro Trabajo
            </h2>
            <p className="text-slate-400 max-w-xl">
              Proyectos que estamos desarrollando y casos que ya hemos lanzado.
            </p>
          </div>
          <div className="hidden md:block">
            <button className="text-indigo-400 font-bold hover:text-white transition-colors flex items-center">
              Ver Github <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Project 1 - TuViaje (CORRECTED) */}
          <div className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-500">
            <div className="h-64 bg-slate-800 relative overflow-hidden">
              {/* Mockup visual */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900 to-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                <Smartphone size={80} className="text-cyan-400/50" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="absolute top-4 left-4 bg-cyan-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                Lanzado
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2">TuViaje</h3>
              <p className="text-slate-400 mb-6">
                Aplicación móvil para viajeros. Gestión de itinerarios, reservas
                y recomendaciones locales en una sola app.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Ionic", "Angular", "Capacitor", "Node.js"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="#"
                className="inline-flex items-center text-white font-bold hover:text-cyan-400 transition-colors"
              >
                Ver caso de estudio <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>

          {/* Project 2 - Nova Corp */}
          <div className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-purple-500 transition-all duration-500">
            <div className="h-64 bg-gradient-to-br from-purple-900 via-slate-800 to-slate-900 relative overflow-hidden">
              {/* Mockup visual */}
              <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                <div className="text-center">
                  <div className="text-6xl font-bold text-purple-400 mb-2">
                    N
                  </div>
                  <p className="text-purple-300 font-semibold text-lg">
                    Nova Corp
                  </p>
                </div>
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="absolute top-4 left-4 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Próximo Lanzamiento
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Nova Corp</h3>
              <p className="text-slate-400 mb-6">
                Plataforma de gestión financiera para empresas. Dashboard
                intuitivo con análisis de datos y reportes automatizados.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-purple-400 bg-purple-900/20 px-2 py-1 rounded border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
              <a
                href="#"
                className="inline-flex items-center text-white font-bold hover:text-purple-400 transition-colors"
              >
                Ver caso de estudio <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>

          {/* Project 3 - Imago Creations */}
          <div className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-orange-500 transition-all duration-500">
            <div className="h-64 bg-gradient-to-br from-orange-900 via-slate-800 to-slate-900 relative overflow-hidden">
              {/* Mockup visual */}
              <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                <div className="text-center">
                  <div className="text-5xl font-bold text-orange-400 mb-2">
                    I
                  </div>
                  <p className="text-orange-300 font-semibold text-lg">Imago</p>
                </div>
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                En Desarrollo
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Imago Creations
              </h3>
              <p className="text-slate-400 mb-6">
                Plataforma para solicitar y personalizar ropa corporativa.
                Diseño intuitivo, gestión de pedidos y seguimiento en tiempo
                real.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Vue.js", "Express", "MongoDB", "Stripe", "Tailwind"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-orange-400 bg-orange-900/20 px-2 py-1 rounded border border-orange-500/20"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
              <a
                href="#"
                className="inline-flex items-center text-white font-bold hover:text-orange-400 transition-colors"
              >
                Conoce más <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
