export default function ContactSection() {
  const WHATSAPP_NUMBER = "5354081085";
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20tengo%20un%20proyecto%20para%20mi%20restaurante.%20%C2%BFPodemos%20hablar?`;

  return (
    <section id="contacto" className="py-32 relative overflow-hidden bg-slate-950">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse,rgba(79,70,229,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse,rgba(147,51,234,0.1)_0%,transparent_70%)] pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
            ¿Listo para llevar tu restaurante al siguiente nivel?
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Cuéntame tu proyecto y te envío un presupuesto personalizado sin compromiso. Respondo en menos de 24 horas.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-indigo-500/20 text-lg uppercase tracking-wider"
          >
            ESCRÍBENOS POR WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
