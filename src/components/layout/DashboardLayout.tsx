import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
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
  FileText,
  Users,
  Grid3x3,
  ChevronDown,
  Search,
  HelpCircle,
  CheckCircle,
  Briefcase,
  CheckSquare,
  Clock,
  MessageSquare,
  Package,
  ShoppingBag,
  FileText as BlogIcon,
  PenTool,
} from "lucide-react";
import ScrollToTop from "../common/ScrollToTop";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isModuleSwitcherOpen, setIsModuleSwitcherOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current demo system
  let currentDemo = "booking";
  if (location.pathname.includes("/quote")) {
    currentDemo = "quote";
  } else if (location.pathname.includes("/crm")) {
    currentDemo = "crm";
  } else if (location.pathname.includes("/inventory")) {
    currentDemo = "inventory";
  } else if (location.pathname.includes("/ecommerce")) {
    currentDemo = "ecommerce";
  } else if (location.pathname.includes("/blog")) {
    currentDemo = "blog";
  }

  // Available demo modules
  const modules = [
    {
      id: "booking",
      name: "Booking System",
      icon: Calendar,
      path: "/demos/booking",
      color: "indigo",
    },
    {
      id: "quote",
      name: "Quote System",
      icon: FileText,
      path: "/demos/quote",
      color: "cyan",
    },
    {
      id: "crm",
      name: "CRM System",
      icon: Briefcase,
      path: "/demos/crm",
      color: "emerald",
    },
    {
      id: "inventory",
      name: "Inventory System",
      icon: Package,
      path: "/demos/inventory",
      color: "orange",
    },
    {
      id: "ecommerce",
      name: "E-commerce System",
      icon: ShoppingBag,
      path: "/demos/ecommerce",
      color: "pink",
    },
    {
      id: "blog",
      name: "Blog & Content",
      icon: BlogIcon,
      path: "/demos/blog",
      color: "teal",
    },
  ];

  const currentModule = modules.find((m) => m.id === currentDemo) || modules[0];

  // Navigation items based on current demo
  const navigationConfig = {
    booking: [
      { icon: LayoutDashboard, label: "Overview", path: "/demos/booking" },
      { icon: Calendar, label: "Bookings", path: "/demos/booking/calendar" },
      { icon: Briefcase, label: "Services", path: "/demos/booking/services" },
      { icon: User, label: "Customers", path: "/demos/booking/customers" },
      { icon: MessageSquare, label: "Reviews", path: "/demos/booking/reviews" },
      { icon: BarChart2, label: "Statistics", path: "/demos/booking/stats" },
      { icon: Settings, label: "Settings", path: "/demos/booking/settings" },
    ],
    quote: [
      { icon: LayoutDashboard, label: "Overview", path: "/demos/quote" },
      { icon: FileText, label: "Quotes", path: "/demos/quote/list" },
      { icon: Package, label: "Catalog", path: "/demos/quote/catalog" },
      { icon: FileText, label: "Invoices", path: "/demos/quote/invoices" },
      { icon: Users, label: "Clients", path: "/demos/quote/clients" },
      { icon: BarChart2, label: "Analytics", path: "/demos/quote/analytics" },
      { icon: Settings, label: "Settings", path: "/demos/quote/settings" },
    ],
    crm: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/demos/crm" },
      { icon: Users, label: "Contacts", path: "/demos/crm/contacts" },
      { icon: Briefcase, label: "Deals", path: "/demos/crm/deals" },
      { icon: CheckSquare, label: "Tasks", path: "/demos/crm/tasks" },
      { icon: BarChart2, label: "Reports", path: "/demos/crm/reports" },
      { icon: Clock, label: "Activity", path: "/demos/crm/activity" },
      { icon: Settings, label: "Settings", path: "/demos/crm/settings" },
    ],
    inventory: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/demos/inventory" },
      { icon: Package, label: "Products", path: "/demos/inventory/products" },
      {
        icon: Briefcase,
        label: "Movements",
        path: "/demos/inventory/movements",
      },
      { icon: Package, label: "Orders", path: "/demos/inventory/orders" },
      { icon: Users, label: "Suppliers", path: "/demos/inventory/suppliers" },
      {
        icon: Package,
        label: "Warehouses",
        path: "/demos/inventory/warehouses",
      },
      { icon: Settings, label: "Settings", path: "/demos/inventory/settings" },
    ],
    ecommerce: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/demos/ecommerce" },
      { icon: Package, label: "Products", path: "/demos/ecommerce/products" },
      { icon: ShoppingBag, label: "Orders", path: "/demos/ecommerce/orders" },
      { icon: Users, label: "Customers", path: "/demos/ecommerce/customers" },
      { icon: BarChart2, label: "Analytics", path: "/demos/ecommerce/analytics" },
      { icon: Settings, label: "Settings", path: "/demos/ecommerce/settings" },
    ],
    blog: [
      { icon: LayoutDashboard, label: "Overview", path: "/demos/blog" },
      { icon: BlogIcon, label: "Posts", path: "/demos/blog/posts" },
      { icon: PenTool, label: "Editor", path: "/demos/blog/editor" },
      { icon: MessageSquare, label: "Comments", path: "/demos/blog/comments" },
      { icon: Settings, label: "Settings", path: "/demos/blog/settings" },
    ],
  };

  const navItems =
    navigationConfig[currentDemo as keyof typeof navigationConfig];

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
              {currentModule.name}
            </div>
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/demos/booking" &&
                  item.path !== "/demos/quote" &&
                  item.path !== "/demos/crm" &&
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

          <div className="flex items-center gap-3 ml-auto">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <Search size={20} />
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 animate-fade-in-up">
                  <div className="p-4">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="Search quotes, clients, analytics..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        autoFocus
                      />
                    </div>
                    <div className="mt-3 text-xs text-slate-500">
                      <kbd className="px-2 py-1 bg-slate-800 rounded">Ctrl</kbd>{" "}
                      + <kbd className="px-2 py-1 bg-slate-800 rounded">K</kbd>{" "}
                      for quick search
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Help */}
            <button
              className="p-2 text-slate-400 hover:text-white transition-colors"
              title="Help & Documentation"
            >
              <HelpCircle size={20} />
            </button>

            {/* Module Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsModuleSwitcherOpen(!isModuleSwitcherOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all group"
              >
                <div
                  className={`p-1.5 rounded-md ${
                    currentDemo === "quote"
                      ? "bg-cyan-500/20 text-cyan-400"
                      : currentDemo === "crm"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-indigo-500/20 text-indigo-400"
                  }`}
                >
                  <currentModule.icon size={16} />
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs text-slate-500">Module</div>
                  <div className="text-sm text-white font-semibold">
                    {currentModule.name.replace(" System", "")}
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className="text-slate-400 group-hover:text-white transition-colors"
                />
              </button>

              {isModuleSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 animate-fade-in-up">
                  <div className="p-3 border-b border-slate-800">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Module
                    </h3>
                  </div>
                  <div className="p-2">
                    {modules.map((module) => {
                      const Icon = module.icon;
                      const isActive = module.id === currentDemo;
                      return (
                        <button
                          key={module.id}
                          onClick={() => {
                            navigate(module.path);
                            setIsModuleSwitcherOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all relative ${
                            isActive
                              ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                              : "text-slate-400 hover:text-white hover:bg-slate-800"
                          }`}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r"></div>
                          )}
                          <div
                            className={`p-2 rounded-lg ${
                              isActive ? "bg-indigo-500/20" : "bg-slate-800"
                            }`}
                          >
                            <Icon
                              size={18}
                              className={
                                isActive ? "text-indigo-400" : "text-slate-400"
                              }
                            />
                          </div>
                          <div className="text-left flex-1">
                            <div className="font-medium text-sm flex items-center justify-between">
                              {module.name}
                              {isActive && (
                                <CheckCircle
                                  size={16}
                                  className="text-indigo-400"
                                />
                              )}
                            </div>
                            <div className="text-xs text-slate-500">
                              View demo
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
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

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 hover:bg-slate-800 rounded-lg transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-linear-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  AD
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 animate-fade-in-up">
                  <div className="p-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-linear-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
                        AD
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          Admin Demo
                        </div>
                        <div className="text-slate-400 text-sm">
                          admin@lytu.com
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/demos/quote/settings"
                      className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                    >
                      <Settings size={18} />
                      <span>Settings</span>
                    </Link>
                    <Link
                      to="/"
                      className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <LogOut size={18} />
                      <span>Exit Demo</span>
                    </Link>
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
