import { Save } from "lucide-react";

export default function EcommerceSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Store Settings</h1>
          <p className="text-slate-400">
            Configure your store preferences and options.
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">
            General Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Store Name
              </label>
              <input
                type="text"
                defaultValue="My Awesome Store"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Support Email
              </label>
              <input
                type="email"
                defaultValue="support@store.com"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Currency
              </label>
              <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Timezone
              </label>
              <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                <option>UTC</option>
                <option>EST</option>
                <option>PST</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">
            Payment & Shipping
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-800">
              <div>
                <h3 className="font-medium text-white">Accept Credit Cards</h3>
                <p className="text-sm text-slate-400">
                  Enable Stripe integration for card payments
                </p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle-stripe"
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  defaultChecked
                />
                <label
                  htmlFor="toggle-stripe"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-indigo-600 cursor-pointer"
                ></label>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-800">
              <div>
                <h3 className="font-medium text-white">Free Shipping</h3>
                <p className="text-sm text-slate-400">
                  Enable free shipping for orders over $100
                </p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle-shipping"
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="toggle-shipping"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer"
                ></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
