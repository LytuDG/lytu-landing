import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Settings,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  BarChart2,
} from "lucide-react";
import ScrollToTop from "../common/ScrollToTop";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  // Mock navigation items for the Booking Demo
  const navItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/demos/booking" },
    { icon: Calendar, label: "Bookings", path: "/demos/booking/calendar" },
    { icon: User, label: "Customers", path: "/demos/booking/customers" },
    { icon: BarChart2, label: "Statistics", path: "/demos/booking/stats" },
    { icon: Settings, label: "Settings", path: "/demos/booking/settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 selection:text-white flex">
      <ScrollToTop />
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-linear-to-tr from-indigo-500 to-cyan-400 rounded-lg flex items-center justify-center transform rotate-3">
                <span className="font-bold text-white text-lg">L</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white">
                ytu
              </span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 py-6 px-3 space-y-1">
            <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Booking System
            </div>
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/demos/booking" &&
                  location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={`transition-colors ${
                      isActive
                        ? "text-indigo-400"
                        : "text-slate-500 group-hover:text-white"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-800 space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group w-full"
            >
              <LogOut
                size={20}
                className="text-slate-500 group-hover:text-red-400 transition-colors"
              />
              <span className="font-medium">Exit Demo</span>
            </Link>

            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                AD
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  Admin Demo
                </p>
                <p className="text-xs text-slate-400 truncate">
                  admin@lytu.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-slate-400 hover:text-white relative transition-colors"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-slate-900"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 animate-fade-in-up">
                  <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-white">Notifications</h3>
                    <span className="text-xs text-indigo-400 cursor-pointer hover:text-indigo-300">
                      Mark all as read
                    </span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                      >
                        <div className="flex gap-3">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                          <div>
                            <p className="text-sm text-white mb-1">
                              New booking request from{" "}
                              <span className="font-bold">Sarah Johnson</span>
                            </p>
                            <p className="text-xs text-slate-500">2 mins ago</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-slate-800">
                    <button className="text-xs text-slate-400 hover:text-white font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
