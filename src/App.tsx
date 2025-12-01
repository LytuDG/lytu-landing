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
import QuoteDashboard from "./pages/Demos/Quote/QuoteDashboard";
import QuoteList from "./pages/Demos/Quote/QuoteList";
import QuoteCreate from "./pages/Demos/Quote/QuoteCreate";
import QuoteView from "./pages/Demos/Quote/QuoteView";
import QuoteClients from "./pages/Demos/Quote/QuoteClients";
import QuoteAnalytics from "./pages/Demos/Quote/QuoteAnalytics";
import QuoteSettings from "./pages/Demos/Quote/QuoteSettings";

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
          {/* Booking System */}
          <Route path="booking" element={<BookingDashboard />} />
          <Route path="booking/calendar" element={<BookingCalendar />} />
          <Route path="booking/customers" element={<BookingCustomers />} />
          <Route path="booking/stats" element={<BookingStats />} />
          <Route path="booking/settings" element={<BookingSettings />} />

          {/* Quote System */}
          <Route path="quote" element={<QuoteDashboard />} />
          <Route path="quote/list" element={<QuoteList />} />
          <Route path="quote/create" element={<QuoteCreate />} />
          <Route path="quote/view/:id" element={<QuoteView />} />
          <Route path="quote/edit/:id" element={<QuoteCreate />} />
          <Route path="quote/clients" element={<QuoteClients />} />
          <Route path="quote/analytics" element={<QuoteAnalytics />} />
          <Route path="quote/settings" element={<QuoteSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
