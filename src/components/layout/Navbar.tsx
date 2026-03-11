import { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/scroll";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
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
      setTimeout(() => {
        if (id) scrollToSection(id);
      }, 100);
    } else {
      if (id) scrollToSection(id);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const menuItems = [
    { id: "", label: "Inicio" },
    { id: "planes", label: "Planes" },
    { id: "modulos", label: "Módulos" },
    { id: "contacto", label: "Contacto" }
  ];

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
          onClick={() => handleNavClick("")}
        >
          <div className="w-8 h-8 bg-linear-to-tr from-indigo-500 to-cyan-400 rounded-lg flex items-center justify-center transform rotate-3">
            <span className="font-bold text-white text-lg">L</span>
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">
            ytu
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className="text-slate-300 hover:text-cyan-400 transition-colors font-medium"
            >
              {item.label}
            </button>
          ))}
          
          {user ? (
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
            >
              <LayoutDashboard size={16} />
              Admin
            </button>
          ) : (
            <button
              onClick={() => navigate("/admin/login")}
              className="px-4 py-2 rounded-full text-sm font-medium border border-slate-700 text-white hover:border-cyan-400 transition-colors"
            >
              Login
            </button>
          )}
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
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className="text-left text-slate-300 hover:text-cyan-400 text-lg font-medium"
            >
              {item.label}
            </button>
          ))}
          
          {user ? (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/admin/dashboard");
              }}
              className="flex items-center gap-2 text-left text-white font-bold bg-indigo-600/80 px-4 py-2 rounded-full mt-4"
            >
              <LayoutDashboard size={18} />
              Admin Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate("/admin/login")}
              className="text-left text-white font-bold bg-indigo-600/80 px-4 py-2 rounded-full mt-4"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
