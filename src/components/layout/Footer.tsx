export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-16 pb-8 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded flex items-center justify-center">
                <span className="font-bold text-white text-xs">L</span>
              </div>
              <span className="text-xl font-bold text-white">lytu.</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Desarrollo de software con pasión y precisión. Ayudamos a startups
              y empresas a escalar sus productos digitales.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                Desarrollo Web
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                Aplicaciones Móviles
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                UI/UX Design
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                Consultoría Técnica
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                Privacidad
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                Términos
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>
            &copy; {new Date().getFullYear()} Lytu Software Development. Todos
            los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social placeholders */}
            <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-indigo-500 transition-colors cursor-pointer"></div>
            <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-indigo-500 transition-colors cursor-pointer"></div>
            <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-indigo-500 transition-colors cursor-pointer"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
