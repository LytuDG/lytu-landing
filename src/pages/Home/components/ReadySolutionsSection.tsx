import {
  CalendarCheck,
  FileText,
  Package,
  ArrowRight,
  Zap,
  Users,
  ShoppingBag,
  PenTool,
} from "lucide-react";

export default function ReadySolutionsSection() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6 backdrop-blur-sm animate-fade-in-up">
            <Zap size={14} className="text-cyan-400 mr-2" />
            <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">
              Aceleradores de Desarrollo
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Tecnología lista para{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-500">
              integrar
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Aprovecha nuestros módulos pre-construidos para reducir tiempos y
            costos. Los adaptamos al 100% a tu flujo de trabajo y marca.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SolutionCard
            icon={<CalendarCheck className="text-cyan-400" size={32} />}
            title="Sistema de Reservas"
            description="Motor de agendamiento completo con gestión de disponibilidad, notificaciones automáticas y sincronización de calendarios."
          />
          <SolutionCard
            icon={<FileText className="text-violet-400" size={32} />}
            title="Sistema de Cotizaciones"
            description="Generación de presupuestos dinámicos en PDF, cálculo de impuestos y seguimiento de estados para cerrar más ventas."
          />
          <SolutionCard
            icon={<Users className="text-pink-400" size={32} />}
            title="CRM"
            description="Gestión centralizada de clientes. Seguimiento de leads, historial de interacciones y pipeline de ventas visual."
          />
          <SolutionCard
            icon={<Package className="text-orange-400" size={32} />}
            title="Sistema de Inventario"
            description="Control de stock en tiempo real. Gestión de almacenes, alertas de bajo stock, movimientos y reportes de valoración."
          />
          <SolutionCard
            icon={<ShoppingBag className="text-blue-400" size={32} />}
            title="E-commerce"
            description="Tiendas online de alto rendimiento. Carrito de compras, pasarelas de pago integradas, gestión de pedidos y panel administrativo."
          />
          <SolutionCard
            icon={<PenTool className="text-emerald-400" size={32} />}
            title="Blogs y Contenidos"
            description="CMS optimizado para SEO. Publica artículos, noticias y novedades con un editor intuitivo y estructura amigable."
          />
        </div>
      </div>
    </section>
  );
}

function SolutionCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative p-[1px] rounded-2xl bg-linear-to-b from-slate-800 to-slate-900 hover:from-cyan-500 hover:to-indigo-600 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
      <div className="bg-slate-950 rounded-2xl p-8 h-full relative overflow-hidden flex flex-col">
        {/* Hover Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500 -mr-10 -mt-10 pointer-events-none" />

        <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-300 shadow-lg">
          {icon}
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
          {description}
        </p>

        <div className="flex items-center text-indigo-400 text-sm font-bold group-hover:text-cyan-300 transition-colors cursor-pointer mt-auto">
          Ver demo{" "}
          <ArrowRight
            size={16}
            className="ml-2 group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </div>
  );
}
