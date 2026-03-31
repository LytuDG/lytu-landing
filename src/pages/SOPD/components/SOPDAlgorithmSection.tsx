import { BarChart3, GitBranch, Zap } from "lucide-react";

export default function SOPDAlgorithmSection() {
  const features = [
    {
      icon: GitBranch,
      title: "Agrupación Inteligente de Zonas",
      desc: "Analiza en tiempo real la ubicación de cada pedido y agrupa automáticamente entregas en rutas geográficas óptimas.",
      details: [
        "Detecta clusters geográficos automáticamente",
        "Rebalancéa rutas cuando llegan nuevos pedidos",
        "Considera patrones de tráfico históricos"
      ]
    },
    {
      icon: Zap,
      title: "Minimización de Distancias",
      desc: "Calcula la ruta más eficiente usando algoritmos de optimización combinatoria. Menos km = Menos combustible = Más ganancia.",
      details: [
        "Algoritmo TSP (Traveling Salesman Problem)",
        "Ajustes dinámicos en tiempo real",
        "Predicción de tiempo de viaje por ruta"
      ]
    },
    {
      icon: BarChart3,
      title: "Asignación Basada en Contexto",
      desc: "No solo asigna al mensajero más cercano. Considera capacidad, horario, historial y zona de especialidad.",
      details: [
        "Score de eficiencia del repartidor",
        "Historial de entregas completadas",
        "Especialización por ruta (centro, periferia, etc)"
      ]
    }
  ];

  return (
    <section className="py-24 bg-slate-900 border-b border-indigo-900/30">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Algoritmos que Trabajan para Tu Negocio
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            La magia detrás de SOPD: tecnología que aprende y se adapta cada segundo para maximizar tu rentabilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="flex flex-col p-8 bg-slate-950 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-6 group-hover:bg-cyan-500/30 transition-colors">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6 flex-grow">{feature.desc}</p>
                
                <ul className="space-y-2 pt-6 border-t border-slate-800">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold text-sm mt-0.5">✓</span>
                      <span className="text-sm text-slate-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Result Box */}
        <div className="mt-16 p-8 bg-gradient-to-r from-cyan-900/20 to-slate-900 rounded-2xl border border-cyan-500/30">
          <h3 className="text-2xl font-bold text-white mb-4">Lo que significa para ti:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-cyan-400 font-bold text-lg mb-1">ROI Instantáneo</p>
              <p className="text-slate-300 text-sm">La primera semana ya ves la reducción en combustible.</p>
            </div>
            <div>
              <p className="text-cyan-400 font-bold text-lg mb-1">Escalabilidad</p>
              <p className="text-slate-300 text-sm">De 5 a 500 entregas/día, el sistema mantiene la eficiencia.</p>
            </div>
            <div>
              <p className="text-cyan-400 font-bold text-lg mb-1">Zero Overhead</p>
              <p className="text-slate-300 text-sm">Tus repartidores trabajan más inteligentemente, no más duro.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
