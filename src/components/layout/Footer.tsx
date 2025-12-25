import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-950 pt-16 pb-8 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded flex items-center justify-center">
                <span className="font-bold text-white text-xs">L</span>
              </div>
              <span className="text-xl font-bold text-white">ytu</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">
              {t("footer.services.title")}
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                {t("footer.services.web")}
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                {t("footer.services.mobile")}
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                {t("footer.services.ai")}
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                {t("footer.services.software")}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">
              {t("footer.legal.title")}
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                {t("footer.legal.privacy")}
              </li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                {t("footer.legal.terms")}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>
            &copy; {new Date().getFullYear()} {t("footer.rights")}
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
