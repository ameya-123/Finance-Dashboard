import React, { useState, useRef, useEffect } from 'react';
import { Plus, Send, Download, Receipt } from 'lucide-react';

export default function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const actions = [
    { icon: <Receipt size={18} />, label: 'Add Expense', color: 'bg-red-500' },
    { icon: <Send size={18} />, label: 'Transfer', color: 'bg-emerald-500' },
    { icon: <Download size={18} />, label: 'Export PDF', color: 'bg-blue-500' },
  ];

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3 z-[100]" ref={menuRef}>
      {/* Action Buttons Pop-up */}
      {isOpen && (
        <div className="flex flex-col items-end gap-3 mb-2 animate-in slide-in-from-bottom-5 fade-in duration-200">
          {actions.map((action, index) => (
            <div key={index} className="flex items-center gap-3 group">
              <span className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-slate-700">
                {action.label}
              </span>
              <button className={`${action.color} text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all`}>
                {action.icon}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`shadow-2xl p-4 rounded-full transition-all duration-300 active:scale-90 ${
          isOpen 
            ? 'bg-slate-800 text-white rotate-45' 
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/20'
        }`}
      >
        <Plus size={28} strokeWidth={3} />
      </button>
    </div>
  );
}