import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoginModal from "./components/features/LoginModal";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

// IMPORTANTE: Este componente usa clases de Tailwind CSS.
// Para que los estilos funcionen, debes tener Tailwind CSS instalado y configurado
// en tu proyecto React (por ejemplo, en tu archivo index.css o global.css).

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
        <Navbar onLoginClick={() => setIsLoginOpen(true)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />

        <Footer />
      </div>
    </BrowserRouter>
  );
}
