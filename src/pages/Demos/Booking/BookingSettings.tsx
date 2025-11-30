import { useState } from "react";
import { Save, Bell, Lock, Globe, CreditCard } from "lucide-react";

export default function BookingSettings() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">
          Manage your account preferences and system settings.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-2 ${
                  activeTab === tab.id
                    ? "bg-indigo-500/10 text-indigo-400 border-indigo-500"
                    : "text-slate-400 hover:text-white hover:bg-slate-800 border-transparent"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">
                    Profile Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">
                        Company Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Acme Corp"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="admin@lytu.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 000-0000"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">
                        Timezone
                      </label>
                      <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors">
                        <option>UTC-05:00 Eastern Time</option>
                        <option>UTC-08:00 Pacific Time</option>
                        <option>UTC+00:00 London</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Booking Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-800">
                      <div>
                        <div className="font-medium text-white">
                          Auto-confirm Bookings
                        </div>
                        <div className="text-xs text-slate-500">
                          Automatically confirm bookings when slots are
                          available.
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-800">
                      <div>
                        <div className="font-medium text-white">
                          Allow Cancellations
                        </div>
                        <div className="text-xs text-slate-500">
                          Customers can cancel up to 24 hours before.
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="text-center py-12">
                <Bell size={48} className="mx-auto text-slate-700 mb-4" />
                <h3 className="text-lg font-medium text-white">
                  Notification Settings
                </h3>
                <p className="text-slate-500">
                  Configure how you receive alerts and updates.
                </p>
              </div>
            )}

            {activeTab === "security" && (
              <div className="text-center py-12">
                <Lock size={48} className="mx-auto text-slate-700 mb-4" />
                <h3 className="text-lg font-medium text-white">
                  Security Settings
                </h3>
                <p className="text-slate-500">
                  Manage password and 2FA settings.
                </p>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="text-center py-12">
                <CreditCard size={48} className="mx-auto text-slate-700 mb-4" />
                <h3 className="text-lg font-medium text-white">
                  Billing & Plans
                </h3>
                <p className="text-slate-500">
                  Manage your subscription and payment methods.
                </p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
              <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
