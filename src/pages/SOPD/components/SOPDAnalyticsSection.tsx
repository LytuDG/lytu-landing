import { BarChart3, PieChart, TrendingUp, Filter } from "lucide-react";

export default function SOPDAnalyticsSection() {
  const metrics = [
    {
      icon: BarChart3,
      label: "Pedidos/Hora",
      description: "Visualiza picos de demanda. Planifica staffing con anticipación.",
      color: "indigo"
    },
    {
      icon: PieChart,
      label: "Rentabilidad por Ruta",
      description: "¿Qué zonas generan más ganancias? Invierte en las rentables.",
      color: "cyan"
    },
    {
      icon: TrendingUp,
      label: "Efectividad de Repartidores",
      description: "Score de desempeño: entregas/hora, customer feedback, seguridad.",
      color: "emerald"
    },
    {
      icon: Filter,
      label: "Filtros Avanzados",
      description: "Segmenta por: hora, zona, repartidor, criterio que necesites.",
      color: "amber"
    }
  ];

  return (
    <section className="py-24 bg-slate-950 border-b border-indigo-900/30">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Dashboard de Analítica: Tu Business Intelligence
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Cada métrica cuenta una historia. Aquí ves cada capítulo de tu operación logística.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            const colorMap = {
              indigo: "from-indigo-600 to-indigo-800",
              cyan: "from-cyan-600 to-cyan-800",
              emerald: "from-emerald-600 to-emerald-800",
              amber: "from-amber-600 to-amber-800"
            };
            
            return (
              <div key={idx} className="flex flex-col p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all group">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorMap[metric.color as keyof typeof colorMap]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-white">{metric.label}</h3>
                <p className="text-slate-400 leading-relaxed">{metric.description}</p>
              </div>
            );
          })}
        </div>

        {/* Dashboard Preview */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
          <img 
            src="/images/panel-admin.png" 
            alt="Dashboard de Analítica SOPD" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Decisiones basadas en datos, no en intuición. Cada cierre de mes tienes claridad total de: qué funcionó, qué no, y dónde invertir en el siguiente período.
          </p>
          <a href="#sopd-planes" className="inline-flex items-center justify-center px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105">
            Ver Planes con Analytics Completo
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
