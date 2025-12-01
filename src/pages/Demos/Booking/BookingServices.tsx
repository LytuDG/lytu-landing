import { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Clock,
  DollarSign,
  Users,
  Edit,
  Trash2,
} from "lucide-react";

const services = [
  {
    id: 1,
    name: "Consultation",
    duration: "30 min",
    price: 50,
    category: "General",
    staff: 3,
    active: true,
  },
  {
    id: 2,
    name: "Standard Service",
    duration: "1 hour",
    price: 100,
    category: "General",
    staff: 5,
    active: true,
  },
  {
    id: 3,
    name: "Premium Package",
    duration: "2 hours",
    price: 250,
    category: "VIP",
    staff: 2,
    active: true,
  },
  {
    id: 4,
    name: "Follow-up",
    duration: "15 min",
    price: 30,
    category: "General",
    staff: 4,
    active: true,
  },
  {
    id: 5,
    name: "Emergency Call",
    duration: "45 min",
    price: 150,
    category: "Urgent",
    staff: 2,
    active: false,
  },
];

export default function BookingServices() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-slate-400">
            Manage your service offerings and pricing.
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20 flex items-center gap-2">
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Service Name</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Duration</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Staff</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {services.map((service) => (
                <tr
                  key={service.id}
                  className="hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="p-4">
                    <div className="font-medium text-white">{service.name}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
                      {service.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {service.duration}
                    </div>
                  </td>
                  <td className="p-4 text-emerald-400 font-medium">
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} />
                      {service.price}
                    </div>
                  </td>
                  <td className="p-4 text-slate-400">
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      {service.staff} members
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
                        service.active
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          service.active ? "bg-emerald-500" : "bg-slate-500"
                        }`}
                      ></span>
                      {service.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
