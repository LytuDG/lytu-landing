import { ArrowRight } from "lucide-react";

export default function SOPDPricingSection() {
  const WHATSAPP_NUMBER = "5354081085";
  
  const getWhatsAppLink = (planName: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20interesa%20el%20plan%20SOPD%20${planName}.%20%C2%BFPodemos%20hablar?`;
  };

  const plans = [
    {
      name: "BÁSICO",
      subtitle: "Optimización Esencial",
      price: "3.800",
      period: "CUP/mes",
      highlight: false,
      description: "Perfecto si tienes 4-5 entregas diarias",
      pedidosIncluidos: 140,
      precioEfectivo: "27,1 CUP",
      features: [
        "Agrupación automática de pedidos",
        "Asignación inteligente de repartidor",
        "Seguimiento de entregas en mapa",
        "Panel básico de operaciones",
        "140 entregas/mes incluidas",
        "Soporte por email"
      ],
      overage: "45 CUP por entrega adicional"
    },
    {
      name: "PROFESIONAL",
      subtitle: "Centro Completo de Mando",
      price: "8.200",
      period: "CUP/mes",
      highlight: true,
      description: "La opción más popular para negocios en crecimiento",
      pedidosIncluidos: 380,
      precioEfectivo: "21,6 CUP",
      features: [
        "Algoritmos de ruta avanzados",
        "ETA dinámico en tiempo real",
        "Dashboard analítico completo",
        "Reportes personalizados",
        "380 entregas/mes incluidas",
        "Soporte dedicado"
      ],
      overage: "38 CUP por entrega adicional"
    },
    {
      name: "PREMIUM",
      subtitle: "Logística de Nivel Enterprise",
      price: "14.800",
      period: "CUP/mes",
      highlight: false,
      description: "Para operaciones de 25+ entregas diarias",
      pedidosIncluidos: 850,
      precioEfectivo: "17,4 CUP",
      features: [
        "Todo lo del Profesional",
        "Navegación por Voz para repartidores",
        "Guía paso a paso audible",
        "850 entregas/mes incluidas",
        "Soporte dedicado 24/7",
        "SLA de 99.9% uptime"
      ],
      overage: "32 CUP por entrega adicional"
    }
  ];

  return (
    <section id="sopd-planes" className="py-24 bg-slate-900 border-t border-indigo-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Planes SOPD: Escalables con Tu Negocio
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Elige según tu volumen. Crece sin penalización. Solo pagas por extras cuando superas el límite.
          </p>
          <div className="mt-8 inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <p className="text-cyan-300 text-sm font-semibold">
              🚀 Todos los planes incluyen: configuración, training & soporte técnico
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`flex flex-col p-8 rounded-2xl transition-all ${
                plan.highlight
                  ? "bg-cyan-900/20 border-2 border-cyan-500 relative transform md:-translate-y-4 shadow-2xl shadow-cyan-500/20"
                  : "bg-slate-950 border border-slate-800 hover:border-cyan-500/30"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  MÁS POPULAR
                </div>
              )}

              <div className="mb-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Entregas/mes</p>
                    <p className="text-cyan-300 font-bold text-lg">{plan.pedidosIncluidos}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Precio Efectivo</p>
                    <p className="text-cyan-300 font-bold text-lg">{plan.precioEfectivo}</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-cyan-300 mb-6 text-sm font-semibold">{plan.subtitle}</p>

              <div className="mb-2">
                <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                <span className="text-xl text-slate-400 ml-2">{plan.period}</span>
              </div>

              <p className="text-slate-400 mb-8 text-sm italic">{plan.description}</p>

              <ul className="mb-10 space-y-3 grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className={`flex items-start ${feature.startsWith("Todo lo") ? "text-white opacity-90 pb-3 border-b border-cyan-500/30" : "text-slate-300"}`}>
                    <span className="text-cyan-400 mr-3 shrink-0">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-8 pt-6 border-t border-slate-800 bg-slate-950/50 -mx-8 px-8 py-6">
                <p className="text-slate-400 text-xs mb-2">Entregas adicionales:</p>
                <p className="text-white font-bold">{plan.overage}</p>
              </div>

              <a
                href={getWhatsAppLink(plan.name)}
                target="_blank"
                rel="noreferrer"
                className={`w-full py-4 px-6 rounded-full font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 uppercase tracking-wider text-sm ${
                  plan.highlight
                    ? "bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/30"
                    : "border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                }`}
              >
                CONTRATAR PLAN
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Comparación de Características</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-700">
                  <th className="text-left py-4 px-4 text-white font-bold">Característica</th>
                  <th className="text-center py-4 px-4 text-cyan-300 font-bold">Básico</th>
                  <th className="text-center py-4 px-4 text-cyan-400 font-bold">Profesional</th>
                  <th className="text-center py-4 px-4 text-cyan-300 font-bold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Agrupación de Pedidos", starter: "✓", pro: "✓", premium: "✓" },
                  { feature: "ETA Dinámico", starter: "-", pro: "✓", premium: "✓" },
                  { feature: "Dashboard Completo", starter: "Básico", pro: "✓", premium: "✓ Avanzado" },
                  { feature: "Navegación por Voz", starter: "-", pro: "-", premium: "✓" },
                  { feature: "Guía Audible Paso a Paso", starter: "-", pro: "-", premium: "✓" },
                  { feature: "API Customizable", starter: "-", pro: "-", premium: "✓" },
                  { feature: "Soporte Dedicado", starter: "Email", pro: "Chat", premium: "24/7 Premium" }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-800 hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-4 text-slate-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-slate-400">{row.starter}</td>
                    <td className="py-4 px-4 text-center text-cyan-400 font-semibold">{row.pro}</td>
                    <td className="py-4 px-4 text-center text-slate-300">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-8 bg-cyan-900/10 border border-cyan-500/30 rounded-xl">
          <p className="text-slate-400 mb-6">
            ¿Necesitas escala enterprise o customización? Hablemos de soluciones personalizadas.
          </p>
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-full transition-all duration-300">
            Contactar Equipo de Ventas
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
