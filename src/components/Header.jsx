import { useFinanceStore } from '../store/useFinanceStore';
import { Moon, Sun, Globe } from 'lucide-react';

export default function Header({ isDarkMode, setIsDarkMode, currency, setCurrency }) {
  const { userRole, setRole } = useFinanceStore();

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between transition-colors duration-200 sticky top-0 z-30">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Welcome Back, Ameya!
      </h2>

      <div className="flex items-center gap-4">
        {/* Currency Switcher */}
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-slate-700">
          <Globe size={16} className="text-blue-500" />
          <select 
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-transparent text-sm font-bold outline-none dark:text-white cursor-pointer"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 transition-colors"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* RBAC Toggle */}
        <div className="hidden md:flex items-center gap-2 text-sm ml-2">
          <span className="text-gray-400 dark:text-gray-500 font-medium">Role:</span>
          <select 
            value={userRole}
            onChange={(e) => setRole(e.target.value)}
            className="bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md px-2 py-1 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-colors"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        {/* User Avatar removed from here to reduce redundancy with Sidebar profile */}
      </div>
    </header>
  );
}