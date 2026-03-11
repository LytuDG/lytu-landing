export default function PricingSection() {
  const WHATSAPP_NUMBER = "5354081085";
  
  const getWhatsAppLink = (planName: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20interesa%20el%20plan%20${planName}.%20%C2%BFPodemos%20hablar?`;
  };

  return (
    <section id="planes" className="py-24 bg-slate-900 border-t border-indigo-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Planes hechos para tu negocio. Elige el que mejor se ajuste.
          </h2>
          <p className="text-xl text-slate-400">
            Todos incluyen diseño profesional, hosting y soporte. Sin letra chica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Plan Básico */}
          <div className="flex flex-col p-8 bg-slate-950 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-all">
            <h3 className="text-2xl font-bold text-white mb-2">BÁSICO</h3>
            <p className="text-slate-400 mb-6">"Presencia Digital"</p>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-white">180</span>
              <span className="text-xl text-slate-400"> USD</span>
            </div>
            <p className="text-sm text-cyan-400 font-semibold mb-8 uppercase tracking-wide">Pago único</p>

            <ul className="mb-10 space-y-4 grow">
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> Página web de una página (landing page)
              </li>
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> Menú digital con fotos y precios (hasta 30 platos)
              </li>
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> Botón directo a WhatsApp para pedidos
              </li>
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> Ubicación en Google Maps
              </li>
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> Enlaces a Instagram y Facebook
              </li>
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> Diseño adaptable a celulares
              </li>
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> SEO básico (apareces en Google)
              </li>
              <li className="flex items-start text-white font-bold">
                <span className="text-indigo-400 mr-3">✓</span> 1 mes de soporte gratis
              </li>
            </ul>

            <div className="mb-8 pt-6 border-t border-slate-800">
              <p className="text-slate-400 text-sm">Mantenimiento mensual después del primer mes:</p>
              <p className="text-white font-bold text-lg mt-1">20 USD/mes</p>
            </div>

            <a
              href={getWhatsAppLink("Básico")}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 px-6 border border-indigo-500 rounded-full text-center text-indigo-400 font-bold hover:bg-indigo-500 hover:text-white transition-colors uppercase tracking-wider text-sm"
            >
              SOLICITAR ESTE PLAN
            </a>
          </div>

          {/* Plan Profesional (Destacado) */}
          <div className="flex flex-col p-8 bg-indigo-900/20 border-2 border-indigo-500 rounded-2xl relative transform md:-translate-y-4 shadow-2xl shadow-indigo-500/20">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              EL MÁS POPULAR
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">PROFESIONAL</h3>
            <p className="text-indigo-200 mb-6">"Restaurante Online"</p>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-white">340</span>
              <span className="text-xl text-indigo-300"> USD</span>
            </div>
            <p className="text-sm text-cyan-400 font-semibold mb-8 uppercase tracking-wide">Pago único</p>

            <ul className="mb-10 space-y-4 grow">
              <li className="flex items-start text-white opacity-80 pb-4 border-b border-indigo-500/30">
                <span className="text-indigo-400 mr-3">✓</span> Todo lo del plan Básico, más:
              </li>
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> Web de hasta 5 páginas
              </li>
              <li className="flex items-start text-white font-semibold">
                <span className="text-indigo-400 mr-3">✓</span> Sistema de pedidos por carrito a WhatsApp
              </li>
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> Catálogo ampliado (hasta 100 productos)
              </li>
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> Panel autogestionable (actualiza precios sin programar)
              </li>
              <li className="flex items-start text-white font-bold">
                <span className="text-indigo-400 mr-3">✓</span> 2 meses de soporte gratis
              </li>
            </ul>

            <div className="mb-8 pt-6 border-t border-indigo-500/30">
              <p className="text-indigo-200 text-sm">Mantenimiento mensual después del segundo mes:</p>
              <p className="text-white font-bold text-lg mt-1">30 USD/mes</p>
            </div>

            <a
              href={getWhatsAppLink("Profesional")}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 px-6 bg-indigo-500 rounded-full text-center text-white font-bold hover:bg-indigo-600 transition-colors uppercase tracking-wider text-sm shadow-lg shadow-indigo-500/30"
            >
              SOLICITAR ESTE PLAN
            </a>
          </div>

          {/* Plan Premium */}
          <div className="flex flex-col p-8 bg-slate-950 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-all">
            <h3 className="text-2xl font-bold text-white mb-2">PREMIUM</h3>
            <p className="text-slate-400 mb-6">"Experiencia Completa"</p>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-white">800</span>
              <span className="text-xl text-slate-400"> USD</span>
            </div>
            <p className="text-sm text-cyan-400 font-semibold mb-8 uppercase tracking-wide">Pago único</p>

            <ul className="mb-10 space-y-4 grow">
              <li className="flex items-start text-slate-300 pb-4 border-b border-slate-800">
                <span className="text-indigo-400 mr-3">✓</span> Todo lo del plan Profesional, más:
              </li>
              <li className="flex items-start text-white font-semibold">
                <span className="text-indigo-400 mr-3">✓</span> App nativa para Android
              </li>
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> Formulario de reservas de mesas por WhatsApp
              </li>
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> Notificaciones Push (avisos de pedidos listos)
              </li>
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> Sistema de puntos y cupones de descuento
              </li>
              <li className="flex items-start text-slate-300">
                <span className="text-indigo-400 mr-3">✓</span> Estadísticas de ventas
              </li>
              <li className="flex items-start text-white font-bold">
                <span className="text-indigo-400 mr-3">✓</span> 3 meses de soporte gratis
              </li>
            </ul>

            <div className="mb-8 pt-6 border-t border-slate-800">
              <p className="text-slate-400 text-sm">Mantenimiento mensual después del tercer mes:</p>
              <p className="text-white font-bold text-lg mt-1">50 USD/mes</p>
            </div>

            <a
              href={getWhatsAppLink("Premium")}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 px-6 border border-indigo-500 rounded-full text-center text-indigo-400 font-bold hover:bg-indigo-500 hover:text-white transition-colors uppercase tracking-wider text-sm"
            >
              SOLICITAR ESTE PLAN
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
