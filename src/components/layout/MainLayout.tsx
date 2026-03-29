import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  const location = useLocation();
  const isTrackingPage = location.pathname.startsWith("/track/");

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {!isTrackingPage && <Navbar />}

      <Outlet />

      {!isTrackingPage && <Footer />}
    </div>
  );
}
