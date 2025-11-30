import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginModal from "../features/LoginModal";

export default function MainLayout() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />

      <Outlet />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <Footer />
    </div>
  );
}
