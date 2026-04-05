import React from 'react';
import { Target, Plus, TrendingUp, Laptop, Palmtree, MoreVertical, Calendar } from 'lucide-react';

const GoalCard = ({ title, icon: Icon, current, target, color, deadline }) => {
  const progress = Math.min((current / target) * 100, 100);
  
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
      {/* Subtle Glow - Background depth */}
      <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 dark:opacity-20 blur-2xl transition-opacity ${color.bar}`} />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`p-3 rounded-2xl ${color.bg} ${color.text} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={24} />
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="space-y-4 relative z-10">
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-slate-100 tracking-tight">{title}</h4>
          <div className="flex items-center gap-1.5 mt-1">
            <Calendar size={12} className="text-gray-400 dark:text-slate-500" />
            <p className="text-[11px] font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Due {deadline}
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tighter">Saved</span>
              <span className="text-2xl font-black text-gray-900 dark:text-white">
                ₹{current.toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tighter">Target</span>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">₹{target.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="relative w-full bg-gray-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
            <div 
              className={`h-full ${color.bar} transition-all duration-1000 ease-out rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)]`} 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <p className={`text-xs font-black ${color.text} text-right mt-1`}>{progress.toFixed(0)}% Complete</p>
        </div>
      </div>
    </div>
  );
};

export default function Goals() {
  const goals = [
    { 
      id: 1, title: "New MacBook Pro", icon: Laptop, 
      current: 45000, target: 120000, deadline: "Dec 2026",
      color: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", bar: "bg-blue-500" } 
    },
    { 
      id: 2, title: "Emergency Fund", icon: Target, 
      current: 85000, target: 100000, deadline: "Ongoing",
      color: { bg: "bg-emerald-50 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500" } 
    },
    { 
      id: 3, title: "Europe Trip 2027", icon: Palmtree, 
      current: 120000, target: 400000, deadline: "May 2027",
      color: { bg: "bg-purple-50 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400", bar: "bg-purple-500" } 
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Savings Goals</h2>
        <p className="text-gray-500 dark:text-slate-400 mt-1 font-medium">Strategic planning for your future milestones.</p>
      </div>

      {/* Modern Royal Blue & Indigo Band */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 p-6 rounded-[1.5rem] text-white shadow-xl border border-white/10">
        {/* Animated Glow Particles (Simulated with static divs) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-blue-400/20 blur-[50px] rounded-full" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-1">
            <p className="text-blue-100/70 text-[10px] font-bold uppercase tracking-[0.2em]">Total Accumulated</p>
            <h3 className="text-4xl font-black tracking-tighter">₹2,50,000</h3>
          </div>
          
          <div className="md:border-l border-white/10 md:pl-8 space-y-1">
            <p className="text-blue-100/70 text-[10px] font-bold uppercase tracking-[0.2em]">Portfolio Progress</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black tracking-tighter">40.3%</h3>
              <span className="text-emerald-300 text-xs font-bold flex items-center gap-0.5 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <TrendingUp size={12} /> +2.4%
              </span>
            </div>
          </div>

          <div className="flex justify-end hidden md:flex">
             <div className="h-12 w-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
                <Target size={24} className="text-blue-100" strokeWidth={2} />
             </div>
          </div>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => (
          <GoalCard key={goal.id} {...goal} />
        ))}
        
        <button className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-3xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-all group min-h-[250px]">
          <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
            <Plus size={32} />
          </div>
          <span className="font-bold tracking-tight">Create Custom Goal</span>
        </button>
      </div>
    </div>
  );
}