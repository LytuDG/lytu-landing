export default function ProblemSection() {
  return (
    <section className="py-20 bg-slate-900 border-b border-indigo-900/30">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
              ¿Tus clientes te buscan en internet y no te encuentran?
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Hoy en día, antes de visitar un restaurante, la gente busca en Google: el menú, los precios, la ubicación. 
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              Si no apareces, estás perdiendo clientes todos los días. Y si apareces pero tu información está desactualizada, das mala imagen.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            {/* Placeholder for an image or illustration */}
            <div className="relative w-full max-w-md aspect-video bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-2xl flex items-center justify-center">
               <div className="absolute inset-0 bg-linear-to-br from-indigo-900/40 to-slate-900 z-0"></div>
               <div className="text-slate-400 z-10 flex flex-col items-center">
                  <span className="text-5xl mb-4">🔍</span>
                  <p className="font-medium text-lg">Búsqueda sin resultados</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
