import { ShoppingBag, Truck, Grid3x3, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function SistemasNavigationSection() {
  const [activeTab, setActiveTab] = useState<"seller" | "delivery" | "both">("both");

  const tabs = [
    {
      id: "seller",
      label: "Soy Vendedor",
      icon: ShoppingBag,
      title: "Amplifica tus ventas",
      description: "Necesitas una tienda online que convierta. Que sea tan fácil comprar en ti como por cualquier otra app.",
      features: ["Menú Digital Optimizado", "Carrito sin fricciones", "Integración con redes", "Reporte de ventas"],
      color: "indigo"
    },
    {
      id: "delivery",
      label: "Soy Repartidor",
      icon: Truck,
      title: "Optimiza tu flota",
      description: "Gestiona entregas sin caos. Rutas inteligentes, menos combustible, más entregas en menos tiempo.",
      features: ["Rutas Optimizadas por IA", "Navegación por Voz", "Chat en Vivo", "Reportes de desempeño"],
      color: "cyan"
    },
    {
      id: "both",
      label: "Quiero Ambos",
      icon: Grid3x3,
      title: "El Ecosistema Completo",
      description: "Eres el dueño. Vendes en línea, entregas con precisión, clientes ven su pedido en vivo. Todo integrado.",
      features: ["Todo lo anterior", "Tracking en tiempo real", "Sincronización automática", "Dashboard unificado"],
      color: "emerald"
    }
  ];

  const activeTabData = tabs.find(t => t.id === activeTab)!;
  const colorClasses = {
    indigo: { bg: "bg-indigo-600 hover:bg-indigo-700", border: "border-indigo-500", text: "text-indigo-400" },
    cyan: { bg: "bg-cyan-600 hover:bg-cyan-700", border: "border-cyan-500", text: "text-cyan-400" },
    emerald: { bg: "bg-emerald-600 hover:bg-emerald-700", border: "border-emerald-500", text: "text-emerald-400" }
  };

  const currentColor = colorClasses[activeTabData.color as keyof typeof colorClasses];

  return (
    <section className="py-24 bg-slate-900 border-b border-indigo-900/30">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            ¿Cuál es tu rol en el ecosistema?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Selecciona tu caso de uso y te mostramos exactamente lo que necesitas.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const tabColor = colorClasses[tab.color as keyof typeof colorClasses];
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                  isActive
                    ? `${tabColor.bg} text-white shadow-lg shadow-${tab.color}-600/30`
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Card */}
        <div className={`border-2 ${currentColor.border} rounded-2xl p-8 md:p-12 bg-slate-950 shadow-xl`}>
          <h3 className={`text-3xl font-bold mb-4 text-white`}>
            {activeTabData.title}
          </h3>
          
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            {activeTabData.description}
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {activeTabData.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className={`w-5 h-5 ${currentColor.text} shrink-0 mt-0.5`} />
                <span className="text-slate-300 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#planes"
            className={`${currentColor.bg} text-white px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 transition-all duration-300 transform hover:scale-105`}
          >
            Ver Planes para {activeTabData.label === "Quiero Ambos" ? "Este Caso" : "Mi Rol"}
            <span>→</span>
          </a>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 p-6 bg-slate-950/50 border border-slate-800 rounded-xl text-center">
          <p className="text-slate-400 text-sm md:text-base">
            <span className="font-semibold text-white">💡 Nota:</span> Si necesitas múltiples años, volumen especial o customización, hablemos directamente.
          </p>
        </div>
      </div>
    </section>
  );
}
