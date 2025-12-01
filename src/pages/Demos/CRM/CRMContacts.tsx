import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Star,
  Download,
} from "lucide-react";

const contacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechCorp Inc.",
    email: "sarah@techcorp.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    status: "Active",
    lastContact: "2 days ago",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "VP of Engineering",
    company: "Global Solutions",
    email: "m.chen@globalsol.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    status: "Lead",
    lastContact: "5 hours ago",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Product Manager",
    company: "StartUp Labs",
    email: "emma@startuplabs.io",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    status: "Inactive",
    lastContact: "1 week ago",
    avatar: "EW",
  },
  {
    id: 4,
    name: "James Rodriguez",
    role: "Director",
    company: "Media Group",
    email: "james@mediagroup.com",
    phone: "+1 (555) 234-5678",
    location: "Miami, FL",
    status: "Active",
    lastContact: "Yesterday",
    avatar: "JR",
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "CEO",
    company: "Future Systems",
    email: "lisa@futuresys.com",
    phone: "+1 (555) 876-5432",
    location: "Seattle, WA",
    status: "Active",
    lastContact: "3 days ago",
    avatar: "LP",
  },
  {
    id: 6,
    name: "David Kim",
    role: "Head of Sales",
    company: "Cloud Nine",
    email: "david@cloudnine.net",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    status: "Lead",
    lastContact: "Just now",
    avatar: "DK",
  },
];

export default function CRMContacts() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Contacts</h1>
          <p className="text-slate-400">Manage your relationships and leads.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-2">
            <Download size={18} />
            Export
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20 flex items-center gap-2">
            <Plus size={18} />
            Add Contact
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <select className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Lead</option>
            <option>Inactive</option>
          </select>
          <select className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500">
            <option>All Companies</option>
            <option>TechCorp Inc.</option>
            <option>Global Solutions</option>
          </select>
          <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all group relative"
          >
            <button className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
              <MoreVertical size={20} />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                {contact.avatar}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {contact.name}
                </h3>
                <p className="text-slate-400">{contact.role}</p>
                <p className="text-sm text-indigo-400 font-medium">
                  {contact.company}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail size={16} className="text-slate-500" />
                <span className="truncate">{contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone size={16} className="text-slate-500" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <MapPin size={16} className="text-slate-500" />
                <span>{contact.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  contact.status === "Active"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : contact.status === "Lead"
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                }`}
              >
                {contact.status}
              </span>
              <span className="text-xs text-slate-500">
                Last contact: {contact.lastContact}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
