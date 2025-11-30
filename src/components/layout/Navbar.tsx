import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "../../utils/scroll";
import LanguageSelector from "../features/LanguageSelector";

interface NavbarProps {
  onLoginClick: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      // Small delay to allow navigation to complete before scrolling
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else {
      scrollToSection(id);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-lg flex items-center justify-center transform rotate-3">
            <span className="font-bold text-white text-lg">L</span>
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">
            ytu
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleNavClick("servicios")}
            className="text-slate-300 hover:text-cyan-400 transition-colors font-medium"
          >
            {t("nav.services")}
          </button>
          <button
            onClick={() => handleNavClick("filosofía")}
            className="text-slate-300 hover:text-cyan-400 transition-colors font-medium"
          >
            {t("nav.philosophy")}
          </button>
          <button
            onClick={() => handleNavClick("soluciones")}
            className="text-slate-300 hover:text-cyan-400 transition-colors font-medium"
          >
            {t("nav.solutions")}
          </button>
          <button
            onClick={() => handleNavClick("proyectos")}
            className="text-slate-300 hover:text-cyan-400 transition-colors font-medium"
          >
            {t("nav.portfolio")}
          </button>
          <LanguageSelector />
          <button
            onClick={onLoginClick}
            className="px-4 py-2 rounded-full text-sm font-medium border border-slate-700 text-white hover:border-cyan-400 transition-colors"
          >
            {t("nav.login")}
          </button>
          <button
            onClick={() => handleNavClick("contacto")}
            className="bg-white text-slate-950 px-5 py-2 rounded-full font-bold text-sm hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            {t("nav.contact")}
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col space-y-4 shadow-2xl">
          {[
            { key: "servicios", label: t("nav.services") },
            { key: "filosofía", label: t("nav.philosophy") },
            { key: "soluciones", label: t("nav.solutions") },
            { key: "proyectos", label: t("nav.portfolio") },
            { key: "contacto", label: t("nav.contact") },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              className="text-left text-slate-300 hover:text-cyan-400 text-lg font-medium"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <LanguageSelector />
          </div>
          <button
            onClick={onLoginClick}
            className="text-left text-white font-bold bg-indigo-600/80 px-4 py-2 rounded-full"
          >
            {t("nav.login")}
          </button>
        </div>
      )}
    </nav>
  );
}
