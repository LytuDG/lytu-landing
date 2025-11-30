import { useState } from "react";
import {
  Calendar,
  Clock,
  DollarSign,
  MoreVertical,
  Users,
  Bell,
  Search,
  Filter,
  X,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

export default function BookingDashboard() {
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  // Mock Data
  const stats = [
    {
      label: "Total Bookings",
      value: "1,248",
      change: "+12.5%",
      icon: Calendar,
      color: "indigo",
    },
    {
      label: "Total Revenue",
      value: "$48,200",
      change: "+8.2%",
      icon: DollarSign,
      color: "emerald",
    },
    {
      label: "Active Customers",
      value: "854",
      change: "+5.4%",
      icon: Users,
      color: "blue",
    },
    {
      label: "Pending Requests",
      value: "24",
      change: "-2.1%",
      icon: Clock,
      color: "amber",
    },
  ];

  const recentBookings = [
    {
      id: "#BK-7829",
      customer: "Sarah Johnson",
      service: "Consultation",
      date: "Oct 24, 2023",
      time: "10:00 AM",
      amount: "$150.00",
      status: "Confirmed",
    },
    {
      id: "#BK-7830",
      customer: "Michael Chen",
      service: "Development",
      date: "Oct 24, 2023",
      time: "02:30 PM",
      amount: "$450.00",
      status: "Pending",
    },
    {
      id: "#BK-7831",
      customer: "Emma Wilson",
      service: "Design Review",
      date: "Oct 25, 2023",
      time: "11:15 AM",
      amount: "$200.00",
      status: "Confirmed",
    },
    {
      id: "#BK-7832",
      customer: "James Brown",
      service: "Maintenance",
      date: "Oct 26, 2023",
      time: "09:00 AM",
      amount: "$120.00",
      status: "Cancelled",
    },
    {
      id: "#BK-7833",
      customer: "Lisa Davis",
      service: "Consultation",
      date: "Oct 26, 2023",
      time: "04:45 PM",
      amount: "$150.00",
      status: "Pending",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      indigo: "bg-indigo-500/10 text-indigo-400",
      emerald: "bg-emerald-500/10 text-emerald-400",
      blue: "bg-blue-500/10 text-blue-400",
      amber: "bg-amber-500/10 text-amber-400",
    };
    return colors[color] || colors.indigo;
  };

  const handleActionClick = (id: string) => {
    setActiveActionId(activeActionId === id ? null : id);
  };

  return (
    <div className="space-y-6 relative" onClick={() => setActiveActionId(null)}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-slate-400">
            Welcome back, here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2">
            <Filter size={16} /> Filter
          </button>
          <button
            onClick={() => setIsNewBookingOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors text-sm font-medium shadow-lg shadow-indigo-500/20"
          >
            + New Booking
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon size={24} />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.change.startsWith("+")
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Bookings</h2>
            <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950/50 text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Booking ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      {booking.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">
                          {booking.customer}
                        </span>
                        <span className="text-slate-500 text-xs">
                          {booking.service}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      <div className="flex flex-col">
                        <span>{booking.date}</span>
                        <span className="text-xs">{booking.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white font-medium">
                      {booking.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActionClick(booking.id);
                        }}
                        className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {activeActionId === booking.id && (
                        <div className="absolute right-8 top-8 w-32 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-20 overflow-hidden animate-fade-in-up">
                          <button className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2">
                            <Eye size={14} /> View
                          </button>
                          <button className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2">
                            <Edit size={14} /> Edit
                          </button>
                          <button className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2">
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats / Activity */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">
            Today's Schedule
          </h2>
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-white">10:00</span>
                  <span className="text-xs text-slate-500">AM</span>
                  <div className="h-full w-px bg-slate-800 mt-2"></div>
                </div>
                <div className="flex-1 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                      Strategy Meeting
                    </h4>
                    <span className="bg-indigo-500/10 text-indigo-400 text-xs px-2 py-0.5 rounded">
                      30m
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">
                    Discussing Q4 roadmap with the marketing team.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-xs">
                        A
                      </div>
                      <div className="w-6 h-6 rounded-full bg-slate-600 border-2 border-slate-800 flex items-center justify-center text-xs">
                        B
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">+3 others</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Booking Modal */}
      {isNewBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">New Booking</h3>
              <button
                onClick={() => setIsNewBookingOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <form className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">
                  Service Type
                </label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors">
                  <option>Consultation</option>
                  <option>Development</option>
                  <option>Design Review</option>
                  <option>Maintenance</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewBookingOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsNewBookingOpen(false);
                    alert("Booking created! (Mock)");
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/20"
                >
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
