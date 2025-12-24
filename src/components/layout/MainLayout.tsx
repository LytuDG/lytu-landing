import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AICommandCenter from "../common/AICommandCenter";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <Navbar />

      <Outlet />

      <Footer />
      <AICommandCenter />
    </div>
  );
}
