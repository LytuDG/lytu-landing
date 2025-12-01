import {
  Save,
  Bell,
  Lock,
  User,
  Globe,
  Database,
  Layout,
  Mail,
} from "lucide-react";

export default function CRMSettings() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">CRM Settings</h1>
          <p className="text-slate-400">
            Configure your CRM preferences and system.
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20 flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-1">
          {[
            { label: "General", icon: Globe, active: true },
            { label: "Profile", icon: User, active: false },
            { label: "Notifications", icon: Bell, active: false },
            { label: "Pipeline", icon: Layout, active: false },
            { label: "Data & Import", icon: Database, active: false },
            { label: "Email Integration", icon: Mail, active: false },
            { label: "Security", icon: Lock, active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              General Preferences
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Currency
                  </label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Time Zone
                  </label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                    <option>UTC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Date Format
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dateFormat"
                      className="text-indigo-500 focus:ring-indigo-500"
                      defaultChecked
                    />
                    <span className="text-slate-300">MM/DD/YYYY</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dateFormat"
                      className="text-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="text-slate-300">DD/MM/YYYY</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline Settings */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              Pipeline Stages
            </h2>
            <div className="space-y-3">
              {[
                { name: "Lead", color: "blue" },
                { name: "Qualified", color: "indigo" },
                { name: "Proposal", color: "purple" },
                { name: "Negotiation", color: "orange" },
                { name: "Closed Won", color: "emerald" },
              ].map((stage, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700"
                >
                  <div className="cursor-move text-slate-500 hover:text-white">
                    <Layout size={16} />
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full bg-${stage.color}-500`}
                  ></div>
                  <input
                    type="text"
                    defaultValue={stage.name}
                    className="flex-1 bg-transparent border-none text-white focus:ring-0 p-0"
                  />
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 border border-dashed border-slate-700 rounded-lg text-slate-500 hover:text-indigo-400 hover:border-indigo-500/50 transition-all text-sm font-medium flex items-center justify-center gap-2">
                <Plus size={16} />
                Add New Stage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Plus } from "lucide-react";
