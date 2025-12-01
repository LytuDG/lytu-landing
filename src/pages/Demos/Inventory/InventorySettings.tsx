import { useState } from "react";
import {
  Save,
  Bell,
  Lock,
  Globe,
  Database,
  Mail,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function InventorySettings() {
  const [settings, setSettings] = useState({
    currency: "USD",
    timezone: "UTC-5",
    weightUnit: "kg",
    lowStockAlert: true,
    emailNotifications: true,
    autoReorder: false,
    apiKey: "sk_test_51Mz...",
    webhookUrl: "https://api.example.com/hooks/inventory",
  });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">(
    "idle"
  );

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-slate-400">
            Configure your inventory system preferences.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saveStatus !== "idle"}
          className={`px-4 py-2 rounded-lg transition-all font-medium shadow-lg flex items-center gap-2 ${
            saveStatus === "success"
              ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20"
              : "bg-orange-600 hover:bg-orange-500 text-white shadow-orange-500/20"
          }`}
        >
          {saveStatus === "saving" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : saveStatus === "success" ? (
            <>
              <CheckCircle2 size={18} />
              Saved!
            </>
          ) : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Globe size={20} />
            </div>
            <h2 className="text-lg font-bold text-white">
              General Preferences
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Time Zone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => handleChange("timezone", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
              >
                <option value="UTC-5">Eastern Time (US & Canada)</option>
                <option value="UTC-8">Pacific Time (US & Canada)</option>
                <option value="UTC+0">London</option>
                <option value="UTC+1">Paris</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Weight Unit
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="weight"
                    checked={settings.weightUnit === "kg"}
                    onChange={() => handleChange("weightUnit", "kg")}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  Kilograms (kg)
                </label>
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="weight"
                    checked={settings.weightUnit === "lb"}
                    onChange={() => handleChange("weightUnit", "lb")}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  Pounds (lb)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
              <Bell size={20} />
            </div>
            <h2 className="text-lg font-bold text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Low Stock Alerts</p>
                <p className="text-xs text-slate-400">
                  Get notified when stock is running low
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.lowStockAlert}
                  onChange={(e) =>
                    handleChange("lowStockAlert", e.target.checked)
                  }
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-xs text-slate-400">
                  Receive daily summary reports
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    handleChange("emailNotifications", e.target.checked)
                  }
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Auto-Reorder</p>
                <p className="text-xs text-slate-400">
                  Automatically order when stock is critical
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.autoReorder}
                  onChange={(e) =>
                    handleChange("autoReorder", e.target.checked)
                  }
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* API & Integrations */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <Database size={20} />
            </div>
            <h2 className="text-lg font-bold text-white">API & Integrations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                API Key
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    size={16}
                  />
                  <input
                    type="password"
                    value={settings.apiKey}
                    readOnly
                    className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 font-mono text-sm focus:outline-none"
                  />
                </div>
                <button className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700">
                  Regenerate
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Webhook URL
              </label>
              <input
                type="text"
                value={settings.webhookUrl}
                onChange={(e) => handleChange("webhookUrl", e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
