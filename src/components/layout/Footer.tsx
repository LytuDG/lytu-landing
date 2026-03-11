import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-16 pb-8 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-linear-to-tr from-indigo-500 to-cyan-400 rounded flex items-center justify-center transform rotate-3">
                <span className="font-bold text-white text-xs">L</span>
              </div>
              <span className="text-xl font-bold text-white">ytu.tech</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mt-4">
              Especialistas en crear páginas web, menús digitales y aplicaciones móviles para restaurantes y bares en Cuba.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Nuestros Planes</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                <a href="#planes" className="block">Plan Básico</a>
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                <a href="#planes" className="block">Plan Profesional</a>
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                <a href="#planes" className="block">Plan Premium</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contáctanos</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="transition-colors">
                +53 54081085
              </li>
              <li className="transition-colors">
                La Habana, Cuba
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>
            &copy; {new Date().getFullYear()} lytu.tech. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 items-center">
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="Instagram" target="_blank" rel="noreferrer">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-500 hover:text-indigo-500 transition-colors" aria-label="Facebook" target="_blank" rel="noreferrer">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
