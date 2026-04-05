import React, { useState } from 'react';
import { Plus, CreditCard, Banknote, MoreVertical } from 'lucide-react';

const AccountCard = ({ name, balance, type, lastDigits, color, trend }) => (
  <div className="relative overflow-hidden p-6 rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group">
    {/* Decorative background glow */}
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${color}`} />
    
    <div className="flex justify-between items-start mb-8">
      <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-700 group-hover:scale-110 transition-transform duration-300">
        {type === 'Credit' ? <CreditCard className="text-purple-500" size={24} /> : <Banknote className="text-emerald-500" size={24} />}
      </div>
      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
        <MoreVertical size={20} />
      </button>
    </div>

    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{name}</p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1 tracking-tight">{balance}</h3>
    </div>

    <div className="mt-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-600 border-2 border-white dark:border-slate-800" />
          <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-500 border-2 border-white dark:border-slate-800" />
        </div>
        <span className="text-xs text-gray-400 font-mono">**** {lastDigits}</span>
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
          {trend}
        </span>
      )}
    </div>
  </div>
);

export default function Accounts() {
  const [activeFilter, setActiveFilter] = useState('All');

  const accounts = [
    { id: 1, name: 'HDFC Salary Account', balance: '₹84,250.00', type: 'Savings', lastDigits: '4291', color: 'bg-emerald-500', trend: '+2.4%' },
    { id: 2, name: 'ICICI Platinum Credit', balance: '₹12,400.00', type: 'Credit', lastDigits: '8832', color: 'bg-purple-500', trend: '-1.2%' },
    { id: 3, name: 'Emergency Savings', balance: '₹2,05,000.00', type: 'Savings', lastDigits: '1029', color: 'bg-blue-500', trend: '+5.0%' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Accounts & Cards</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your connected bank accounts and credit cards.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95">
          <Plus size={20} />
          <span>Add New Account</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 p-1 bg-gray-100 dark:bg-slate-800 w-fit rounded-xl">
        {['All', 'Savings', 'Credit'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeFilter === tab 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts
          .filter(acc => activeFilter === 'All' || acc.type === activeFilter)
          .map(acc => (
            <AccountCard key={acc.id} {...acc} />
          ))}
      </div>
    </div>
  );
}