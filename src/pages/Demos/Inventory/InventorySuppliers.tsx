import { useState } from "react";
import {
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  X,
} from "lucide-react";

const initialSuppliers = [
  {
    id: 1,
    name: "Tech Distributors Inc.",
    contact: "Michael Scott",
    email: "michael@techdist.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Office Supplies Co.",
    contact: "Pam Beesly",
    email: "pam@officesupplies.com",
    phone: "+1 (555) 987-6543",
    location: "Scranton, PA",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Global Electronics",
    contact: "Jim Halpert",
    email: "jim@globalelec.com",
    phone: "+1 (555) 456-7890",
    location: "Shenzhen, CN",
    rating: 4.2,
  },
  {
    id: 4,
    name: "Furniture Mart",
    contact: "Dwight Schrute",
    email: "dwight@furnituremart.com",
    phone: "+1 (555) 234-5678",
    location: "Berlin, DE",
    rating: 4.9,
  },
];

export default function InventorySuppliers() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    location: "",
  });

  const handleAddSupplier = () => {
    if (!newSupplier.name) return;

    const supplier = {
      id: suppliers.length + 1,
      ...newSupplier,
      rating: 5.0,
    };

    setSuppliers([...suppliers, supplier]);
    setIsAddModalOpen(false);
    setNewSupplier({
      name: "",
      contact: "",
      email: "",
      phone: "",
      location: "",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Suppliers</h1>
          <p className="text-slate-400">Manage your vendor relationships.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-orange-500/20 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-xl">
                {supplier.name[0]}
              </div>
              <button className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={20} />
              </button>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              {supplier.name}
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Contact: {supplier.contact}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Mail size={16} className="text-slate-500" />
                {supplier.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Phone size={16} className="text-slate-500" />
                {supplier.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <MapPin size={16} className="text-slate-500" />
                {supplier.location}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500">Supplier Rating</span>
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded">
                {supplier.rating} / 5.0
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Supplier Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Add New Supplier</h2>
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
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Acme Corp"
                  value={newSupplier.name}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="John Doe"
                    value={newSupplier.contact}
                    onChange={(e) =>
                      setNewSupplier({
                        ...newSupplier,
                        contact: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="+1 (555) ..."
                    value={newSupplier.phone}
                    onChange={(e) =>
                      setNewSupplier({ ...newSupplier, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="contact@company.com"
                    value={newSupplier.email}
                    onChange={(e) =>
                      setNewSupplier({ ...newSupplier, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="City, Country"
                    value={newSupplier.location}
                    onChange={(e) =>
                      setNewSupplier({
                        ...newSupplier,
                        location: e.target.value,
                      })
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
                onClick={handleAddSupplier}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-medium"
              >
                Add Supplier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
