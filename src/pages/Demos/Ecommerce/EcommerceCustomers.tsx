import { useState } from "react";
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  X,
} from "lucide-react";

const initialCustomers = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex.t@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    orders: 12,
    spent: "$1,245.00",
    status: "Active",
    avatar: "AT",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Sarah Miller",
    email: "sarah.m@example.com",
    phone: "+1 (555) 987-6543",
    location: "London, UK",
    orders: 5,
    spent: "$850.00",
    status: "Active",
    avatar: "SM",
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james.w@example.com",
    phone: "+1 (555) 456-7890",
    location: "Toronto, Canada",
    orders: 3,
    spent: "$320.00",
    status: "Inactive",
    avatar: "JW",
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 234-5678",
    location: "Sydney, Australia",
    orders: 8,
    spent: "$2,100.00",
    status: "Active",
    avatar: "ED",
    color: "bg-pink-500",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 876-5432",
    location: "Berlin, Germany",
    orders: 1,
    spent: "$89.00",
    status: "New",
    avatar: "MB",
    color: "bg-orange-500",
  },
];

export default function EcommerceCustomers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) return;

    const customer = {
      id: customers.length + 1,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone || "N/A",
      location: newCustomer.location || "Unknown",
      orders: 0,
      spent: "$0.00",
      status: "New",
      avatar: newCustomer.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2),
      color: "bg-indigo-500",
    };

    setCustomers([customer, ...customers]);
    setIsAddModalOpen(false);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      location: "",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <p className="text-slate-400">View and manage your customer base.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
        >
          <Users size={18} />
          Add Customer
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Orders</th>
                <th className="px-6 py-4 font-medium">Total Spent</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${customer.color} flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {customer.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {customer.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          ID: #{customer.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Mail size={14} className="text-slate-500" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Phone size={14} className="text-slate-500" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {customer.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{customer.orders}</td>
                  <td className="px-6 py-4 font-medium text-white">
                    {customer.spent}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        customer.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : customer.status === "New"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Add New Customer</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. John Doe"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. john@example.com"
                  value={newCustomer.email}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, email: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="+1 (555) 000-0000"
                    value={newCustomer.phone}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="City, Country"
                    value={newCustomer.location}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, location: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomer}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
