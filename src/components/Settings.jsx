import React, { useState } from 'react';
import { User, Bell, Shield, Moon, Globe, CreditCard } from 'lucide-react';

const SettingItem = ({ icon: Icon, title, desc, children }) => (
  <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-lg">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white leading-none">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
      </div>
    </div>
    <div>{children}</div>
  </div>
);

export default function Settings() {
  const [enabled, setEnabled] = useState({ nodes: true, privacy: false });

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">System Settings</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account preferences and security configuration.</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Section */}
        <section>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Account & Profile</h4>
          <div className="grid gap-3">
            <SettingItem icon={User} title="Personal Information" desc="Update your name, email, and profile photo.">
              <button className="text-sm font-bold text-blue-600 hover:underline">Edit</button>
            </SettingItem>
            <SettingItem icon={Globe} title="Language & Region" desc="Set your preferred language and local currency.">
              <span className="text-sm text-gray-400">English (IN)</span>
            </SettingItem>
          </div>
        </section>

        {/* Security & Notifications */}
        <section>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Security & Alerts</h4>
          <div className="grid gap-3">
            <SettingItem icon={Shield} title="Two-Factor Authentication" desc="Add an extra layer of security to your account.">
              <button 
                onClick={() => setEnabled({...enabled, privacy: !enabled.privacy})}
                className={`w-10 h-5 rounded-full transition-colors ${enabled.privacy ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'} relative`}
              >
                <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${enabled.privacy ? 'translate-x-5' : ''}`} />
              </button>
            </SettingItem>
            <SettingItem icon={Bell} title="Push Notifications" desc="Get real-time alerts for large transactions.">
              <button 
                onClick={() => setEnabled({...enabled, nodes: !enabled.nodes})}
                className={`w-10 h-5 rounded-full transition-colors ${enabled.nodes ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'} relative`}
              >
                <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${enabled.nodes ? 'translate-x-5' : ''}`} />
              </button>
            </SettingItem>
          </div>
        </section>
      </div>
    </div>
  );
}