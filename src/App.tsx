import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import BookingDashboard from "./pages/Demos/Booking/BookingDashboard";
import BookingCalendar from "./pages/Demos/Booking/BookingCalendar";
import BookingCustomers from "./pages/Demos/Booking/BookingCustomers";
import BookingSettings from "./pages/Demos/Booking/BookingSettings";
import BookingStats from "./pages/Demos/Booking/BookingStats";

// IMPORTANTE: Este componente usa clases de Tailwind CSS.
// Para que los estilos funcionen, debes tener Tailwind CSS instalado y configurado
// en tu proyecto React (por ejemplo, en tu archivo index.css o global.css).

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Landing Page Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Demo Dashboard Routes */}
        <Route path="/demos" element={<DashboardLayout />}>
          <Route path="booking" element={<BookingDashboard />} />
          <Route path="booking/calendar" element={<BookingCalendar />} />
          <Route path="booking/customers" element={<BookingCustomers />} />
          <Route path="booking/stats" element={<BookingStats />} />
          <Route path="booking/settings" element={<BookingSettings />} />
          {/* Add more demo routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
