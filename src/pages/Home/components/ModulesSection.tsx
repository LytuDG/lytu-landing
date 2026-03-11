import { Salad, CalendarDays, Star, Globe2, Gift, Calculator, Bike, Building2 } from "lucide-react";

export default function ModulesSection() {
  const modules = [
    {
      title: "Menú interactivo avanzado",
      description: "Filtros, búsqueda, opciones personalizadas (sin gluten, vegano, etc.)",
      price: "+70 USD",
      icon: <Salad className="w-8 h-8 text-indigo-400" />
    },
    {
      title: "Sistema de reservas",
      description: "Gestión simple de mesas y notificaciones",
      price: "+90 USD",
      icon: <CalendarDays className="w-8 h-8 text-pink-400" />
    },
    {
      title: "Programa de fidelidad",
      description: "Sistema de puntos y recompensas para clientes frecuentes",
      price: "+90 USD",
      icon: <Gift className="w-8 h-8 text-purple-400" />
    },
    {
      title: "Cálculo de envíos",
      description: "Tarifas dinámicas de delivery según zona o distancia",
      price: "+80 USD",
      icon: <Bike className="w-8 h-8 text-cyan-400" />
    },
    {
      title: "Múltiples sucursales",
      description: "Gestiona varios locales desde un solo panel administrativo",
      price: "+150 USD",
      icon: <Building2 className="w-8 h-8 text-orange-400" />
    },
    {
      title: "Integración POS",
      description: "Conexión directa con tu sistema de punto de venta actual",
      price: "A cotizar",
      icon: <Calculator className="w-8 h-8 text-emerald-400" />
    },
    {
      title: "Sistema de reviews",
      description: "Clientes califican platos y servicio",
      price: "+70 USD",
      icon: <Star className="w-8 h-8 text-yellow-400" />
    },
    {
      title: "Multi-idioma",
      description: "Web/app en inglés, francés, etc. (ideal para turismo)",
      price: "+90 USD",
      icon: <Globe2 className="w-8 h-8 text-blue-400" />
    }
  ];

  return (
    <section id="modulos" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            ¿Necesitas algo más? Añádelo a cualquier plan
          </h2>
          <p className="text-xl text-slate-400">
            Personaliza la experiencia para tus clientes con funciones extra diseñadas para subir tus ventas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod, i) => (
            <div 
              key={i} 
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-500/50 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="bg-slate-800 p-3 rounded-xl shrink-0">
                  {mod.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{mod.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{mod.description}</p>
                </div>
              </div>
              <div className="shrink-0 text-left sm:text-right mt-2 sm:mt-0">
                <span className="inline-block px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg font-bold">
                  {mod.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
