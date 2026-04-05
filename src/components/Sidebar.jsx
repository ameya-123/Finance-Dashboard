import { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  ReceiptText, 
  Wallet, 
  Settings, 
  HelpCircle, 
  User, 
  LogOut, 
  ChevronUp,
  Target 
} from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'accounts', label: 'Accounts', icon: Wallet },
    { id: 'goals', label: 'Savings Goals', icon: Target },
  ];

  // Removed Settings from here as requested
  const systemNavItems = [
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen relative">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-blue-400">
          Zorvyn<span className="text-white">Finance</span>
        </h1>
      </div>
      
      <div className="flex-1 flex flex-col justify-between overflow-y-auto pb-6">
        {/* Navigation Groups */}
        <div>
          <nav className="px-4 space-y-2 mt-4">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Menu</p>
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <nav className="px-4 space-y-2 mt-8">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">System</p>
            {systemNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* --- Interactive Profile Section --- */}
        <div className="px-4 mt-auto relative" ref={menuRef}>
          {/* Popover Menu */}
          {showProfileMenu && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                <User size={16} />
                <span>My Profile</span>
              </button>
              <button 
                onClick={() => { setCurrentView('settings'); setShowProfileMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Settings size={16} />
                <span>Account Settings</span>
              </button>
              <div className="h-px bg-slate-700 mx-2 my-1" />
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-medium">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}

          {/* Profile Toggle Button */}
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`w-full flex items-center justify-between p-2 rounded-xl transition-all border border-transparent ${
              showProfileMenu ? 'bg-slate-800 border-slate-700' : 'hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center font-bold text-white">
                A
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white leading-none">Ameya</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">Pro Plan</p>
              </div>
            </div>
            <ChevronUp 
              size={16} 
              className={`text-slate-500 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>
      </div>
    </aside>
  );
}