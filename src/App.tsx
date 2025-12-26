import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/Admin/LoginPage";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./pages/Admin/DashboardPage";
import QuotesPage from "./pages/Admin/QuotesPage";
import ClientsPage from "./pages/Admin/ClientsPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home/Home";
import QuoteRequest from "./pages/QuoteRequest/QuoteRequest";
import TrackingPage from "./pages/Tracking/TrackingPage";
import TrackingSearchPage from "./pages/Tracking/TrackingSearchPage";
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
import CRMDashboard from "./pages/Demos/CRM/CRMDashboard";
import CRMContacts from "./pages/Demos/CRM/CRMContacts";
import CRMDeals from "./pages/Demos/CRM/CRMDeals";
import CRMTasks from "./pages/Demos/CRM/CRMTasks";
import CRMSettings from "./pages/Demos/CRM/CRMSettings";
import CRMReports from "./pages/Demos/CRM/CRMReports";
import CRMActivityLog from "./pages/Demos/CRM/CRMActivityLog";

import BookingServices from "./pages/Demos/Booking/BookingServices";
import BookingReviews from "./pages/Demos/Booking/BookingReviews";
import QuoteCatalog from "./pages/Demos/Quote/QuoteCatalog";
import QuoteInvoices from "./pages/Demos/Quote/QuoteInvoices";

import InventoryDashboard from "./pages/Demos/Inventory/InventoryDashboard";
import InventoryProducts from "./pages/Demos/Inventory/InventoryProducts";
import InventoryMovements from "./pages/Demos/Inventory/InventoryMovements";
import InventoryOrders from "./pages/Demos/Inventory/InventoryOrders";
import InventorySuppliers from "./pages/Demos/Inventory/InventorySuppliers";
import InventoryWarehouses from "./pages/Demos/Inventory/InventoryWarehouses";
import InventorySettings from "./pages/Demos/Inventory/InventorySettings";

import EcommerceDashboard from "./pages/Demos/Ecommerce/EcommerceDashboard";
import EcommerceProducts from "./pages/Demos/Ecommerce/EcommerceProducts";
import EcommerceOrders from "./pages/Demos/Ecommerce/EcommerceOrders";
import EcommerceCustomers from "./pages/Demos/Ecommerce/EcommerceCustomers";
import EcommerceAnalytics from "./pages/Demos/Ecommerce/EcommerceAnalytics";
import EcommerceSettings from "./pages/Demos/Ecommerce/EcommerceSettings";
import EcommerceCart from "./pages/Demos/Ecommerce/EcommerceCart";
import EcommerceCheckout from "./pages/Demos/Ecommerce/EcommerceCheckout";
import EcommerceOrderConfirmation from "./pages/Demos/Ecommerce/EcommerceOrderConfirmation";
import { EcommerceProvider } from "./contexts/EcommerceContext";

import BlogDashboard from "./pages/Demos/Blog/BlogDashboard";
import BlogPosts from "./pages/Demos/Blog/BlogPosts";
import BlogEditor from "./pages/Demos/Blog/BlogEditor";
import BlogComments from "./pages/Demos/Blog/BlogComments";
import BlogSettings from "./pages/Demos/Blog/BlogSettings";

import { BlogProvider } from "./contexts/BlogContext";
import AIChatbotDemo from "./pages/Demos/AIChatbot/AIChatbotDemo";

// IMPORTANTE: Este componente usa clases de Tailwind CSS.
// Para que los estilos funcionen, debes tener Tailwind CSS instalado y configurado
// en tu proyecto React (por ejemplo, en tu archivo index.css o global.css).

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="quotes" element={<QuotesPage />} />
          <Route path="clients" element={<ClientsPage />} />
          {/* Add more admin routes here */}
        </Route>

        {/* Main Landing Page Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quote-request" element={<QuoteRequest />} />
          <Route path="/track-quote" element={<TrackingSearchPage />} />
          <Route path="/track/:trackingId" element={<TrackingPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Demo Dashboard Routes */}
        <Route path="/demos" element={<DashboardLayout />}>
          {/* Booking System */}
          <Route path="booking" element={<BookingDashboard />} />
          <Route path="booking/calendar" element={<BookingCalendar />} />
          <Route path="booking/services" element={<BookingServices />} />
          <Route path="booking/customers" element={<BookingCustomers />} />
          <Route path="booking/reviews" element={<BookingReviews />} />
          <Route path="booking/stats" element={<BookingStats />} />
          <Route path="booking/settings" element={<BookingSettings />} />

          {/* Quote System */}
          <Route path="quote" element={<QuoteDashboard />} />
          <Route path="quote/list" element={<QuoteList />} />
          <Route path="quote/create" element={<QuoteCreate />} />
          <Route path="quote/view/:id" element={<QuoteView />} />
          <Route path="quote/edit/:id" element={<QuoteCreate />} />
          <Route path="quote/catalog" element={<QuoteCatalog />} />
          <Route path="quote/invoices" element={<QuoteInvoices />} />
          <Route path="quote/clients" element={<QuoteClients />} />
          <Route path="quote/analytics" element={<QuoteAnalytics />} />
          <Route path="quote/settings" element={<QuoteSettings />} />

          {/* CRM System */}
          <Route path="crm" element={<CRMDashboard />} />
          <Route path="crm/contacts" element={<CRMContacts />} />
          <Route path="crm/deals" element={<CRMDeals />} />
          <Route path="crm/tasks" element={<CRMTasks />} />
          <Route path="crm/reports" element={<CRMReports />} />
          <Route path="crm/activity" element={<CRMActivityLog />} />
          <Route path="crm/settings" element={<CRMSettings />} />

          {/* Inventory System */}
          <Route path="inventory" element={<InventoryDashboard />} />
          <Route path="inventory/products" element={<InventoryProducts />} />
          <Route path="inventory/movements" element={<InventoryMovements />} />
          <Route path="inventory/orders" element={<InventoryOrders />} />
          <Route path="inventory/suppliers" element={<InventorySuppliers />} />
          <Route
            path="inventory/warehouses"
            element={<InventoryWarehouses />}
          />
          <Route path="inventory/settings" element={<InventorySettings />} />

          {/* Ecommerce System */}
          <Route
            path="ecommerce/*"
            element={
              <EcommerceProvider>
                <Routes>
                  <Route index element={<EcommerceDashboard />} />
                  <Route path="products" element={<EcommerceProducts />} />
                  <Route path="orders" element={<EcommerceOrders />} />
                  <Route path="customers" element={<EcommerceCustomers />} />
                  <Route path="analytics" element={<EcommerceAnalytics />} />
                  <Route path="settings" element={<EcommerceSettings />} />
                  <Route path="cart" element={<EcommerceCart />} />
                  <Route path="checkout" element={<EcommerceCheckout />} />
                  <Route
                    path="confirmation"
                    element={<EcommerceOrderConfirmation />}
                  />
                </Routes>
              </EcommerceProvider>
            }
          />

          {/* Blog System */}
          <Route
            path="blog/*"
            element={
              <BlogProvider>
                <Routes>
                  <Route index element={<BlogDashboard />} />
                  <Route path="posts" element={<BlogPosts />} />
                  <Route path="editor" element={<BlogEditor />} />
                  <Route path="comments" element={<BlogComments />} />
                  <Route path="settings" element={<BlogSettings />} />
                </Routes>
              </BlogProvider>
            }
          />
        </Route>

        {/* AI Chatbot System - Standalone */}
        <Route path="/demos/ai-chatbot" element={<AIChatbotDemo />} />
      </Routes>
    </AuthProvider>
  );
}
