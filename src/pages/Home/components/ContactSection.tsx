export default function ContactSection() {
  return (
    <section id="contacto" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-900/20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-10 md:p-16 text-center shadow-2xl border border-white/10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Tienes una idea ambiciosa?
          </h2>
          <p className="text-indigo-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Somos el equipo técnico que necesitas para hacerla realidad. Sin
            intermediarios, sin burocracia, solo código excelente.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="tu@email.com"
              className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-indigo-200 focus:outline-none focus:bg-white/20 w-full sm:w-auto min-w-[300px]"
            />
            <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:bg-cyan-50 transition-colors shadow-lg">
              Iniciar Proyecto
            </button>
          </div>
          <p className="mt-4 text-sm text-indigo-200">
            O escríbenos a{" "}
            <a
              href="mailto:hola@lytu.tech"
              className="underline hover:text-white"
            >
              hola@lytu.tech
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
