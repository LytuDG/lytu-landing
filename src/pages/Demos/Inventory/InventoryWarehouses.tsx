import { useState } from "react";
import { MapPin, Package, Users, Plus, MoreVertical, X } from "lucide-react";

const initialWarehouses = [
  {
    id: 1,
    name: "Central Distribution Center",
    location: "New York, NY",
    capacity: "85%",
    items: 12500,
    manager: "Robert Fox",
    status: "Active",
  },
  {
    id: 2,
    name: "West Coast Hub",
    location: "Los Angeles, CA",
    capacity: "45%",
    items: 5200,
    manager: "Jenny Wilson",
    status: "Active",
  },
  {
    id: 3,
    name: "European Branch",
    location: "Berlin, Germany",
    capacity: "60%",
    items: 8900,
    manager: "Albert Flores",
    status: "Maintenance",
  },
];

export default function InventoryWarehouses() {
  const [warehouses, setWarehouses] = useState(initialWarehouses);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    location: "",
    manager: "",
    capacity: "0%",
  });

  const handleAddWarehouse = () => {
    if (!newWarehouse.name) return;

    const warehouse = {
      id: warehouses.length + 1,
      ...newWarehouse,
      items: 0,
      status: "Active",
    };

    setWarehouses([...warehouses, warehouse]);
    setIsAddModalOpen(false);
    setNewWarehouse({ name: "", location: "", manager: "", capacity: "0%" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Warehouses</h1>
          <p className="text-slate-400">
            Manage your storage locations and capacity.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-orange-500/20 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Warehouse
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {warehouses.map((warehouse) => (
          <div
            key={warehouse.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {warehouse.name}
                  </h3>
                  <p className="text-slate-400 text-sm">{warehouse.location}</p>
                </div>
              </div>
              <button className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Capacity Usage</span>
                  <span
                    className={`font-bold ${
                      parseInt(warehouse.capacity) > 80
                        ? "text-red-400"
                        : parseInt(warehouse.capacity) > 50
                        ? "text-yellow-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {warehouse.capacity}
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      parseInt(warehouse.capacity) > 80
                        ? "bg-red-500"
                        : parseInt(warehouse.capacity) > 50
                        ? "bg-yellow-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: warehouse.capacity }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded text-slate-400">
                    <Package size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Total Items</p>
                    <p className="font-bold text-white">
                      {warehouse.items.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded text-slate-400">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Manager</p>
                    <p className="font-bold text-white">{warehouse.manager}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Warehouse Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                Add New Warehouse
              </h2>
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
                  Warehouse Name
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. North Hub"
                  value={newWarehouse.name}
                  onChange={(e) =>
                    setNewWarehouse({ ...newWarehouse, name: e.target.value })
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
                  value={newWarehouse.location}
                  onChange={(e) =>
                    setNewWarehouse({
                      ...newWarehouse,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Manager
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="Manager Name"
                  value={newWarehouse.manager}
                  onChange={(e) =>
                    setNewWarehouse({
                      ...newWarehouse,
                      manager: e.target.value,
                    })
                  }
                />
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
                onClick={handleAddWarehouse}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-medium"
              >
                Add Warehouse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
