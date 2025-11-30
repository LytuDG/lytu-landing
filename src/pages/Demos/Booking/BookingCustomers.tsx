import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  UserPlus,
  Edit,
  Trash2,
  History,
  X,
} from "lucide-react";

export default function BookingCustomers() {
  const [activeActionId, setActiveActionId] = useState<number | null>(null);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  // Mock Customers Data
  const customers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      status: "Active",
      lastBooking: "Oct 24, 2023",
      totalSpend: "$1,250",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@tech.co",
      phone: "+1 (555) 987-6543",
      location: "San Francisco, CA",
      status: "Active",
      lastBooking: "Oct 24, 2023",
      totalSpend: "$3,400",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@design.studio",
      phone: "+1 (555) 456-7890",
      location: "London, UK",
      status: "Inactive",
      lastBooking: "Sep 15, 2023",
      totalSpend: "$850",
    },
    {
      id: 4,
      name: "James Brown",
      email: "j.brown@consulting.net",
      phone: "+1 (555) 234-5678",
      location: "Chicago, IL",
      status: "Active",
      lastBooking: "Oct 26, 2023",
      totalSpend: "$2,100",
    },
    {
      id: 5,
      name: "Lisa Davis",
      email: "lisa.d@creative.agency",
      phone: "+1 (555) 876-5432",
      location: "Austin, TX",
      status: "Active",
      lastBooking: "Oct 20, 2023",
      totalSpend: "$1,800",
    },
    {
      id: 6,
      name: "Robert Taylor",
      email: "rob.t@enterprise.com",
      phone: "+1 (555) 345-6789",
      location: "Seattle, WA",
      status: "Blocked",
      lastBooking: "Aug 10, 2023",
      totalSpend: "$0",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleActionClick = (id: number) => {
    setActiveActionId(activeActionId === id ? null : id);
  };

  return (
    <div className="space-y-6" onClick={() => setActiveActionId(null)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <p className="text-slate-400">
            Manage your customer base and history.
          </p>
        </div>
        <button
          onClick={() => setIsAddCustomerOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors text-sm font-medium shadow-lg shadow-indigo-500/20 flex items-center gap-2"
        >
          <UserPlus size={16} /> Add Customer
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Search customers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 border border-slate-700">
              <Filter size={16} /> Filter
            </button>
            <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm font-medium border border-slate-700">
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/50 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Booking</th>
                <th className="px-6 py-4 font-medium">Total Spend</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {customer.name}
                        </div>
                        <div className="text-slate-500 text-xs">
                          ID: #{customer.id.toString().padStart(4, "0")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-300 text-xs">
                        <Mail size={12} className="text-slate-500" />{" "}
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 text-xs">
                        <Phone size={12} className="text-slate-500" />{" "}
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-600" />{" "}
                      {customer.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        customer.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : customer.status === "Inactive"
                          ? "bg-slate-500/10 text-slate-400 border-slate-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {customer.lastBooking}
                  </td>
                  <td className="px-6 py-4 text-white font-medium">
                    {customer.totalSpend}
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActionClick(customer.id);
                      }}
                      className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {activeActionId === customer.id && (
                      <div className="absolute right-8 top-8 w-32 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-20 overflow-hidden animate-fade-in-up">
                        <button className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2">
                          <Edit size={14} /> Edit
                        </button>
                        <button className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2">
                          <History size={14} /> History
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
          {filteredCustomers.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No customers found matching "{searchTerm}"
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between text-sm text-slate-400">
          <div>
            Showing 1 to {filteredCustomers.length} of {customers.length}{" "}
            entries
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 transition-colors disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddCustomerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Add New Customer</h3>
              <button
                onClick={() => setIsAddCustomerOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <form className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, State"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddCustomerOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddCustomerOpen(false);
                    alert("Customer added! (Mock)");
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/20"
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
