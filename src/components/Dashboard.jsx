import { useMemo } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency } from '../utils/formatters';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Lightbulb, Calendar, Clock, Activity } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Dashboard() {
  const { transactions } = useFinanceStore();

  const { totalIncome, totalExpense, balance, categoryData, trendData, topCategory, recentActivity } = useMemo(() => {
    let income = 0; let expense = 0;
    const categoryTotals = {}; const dailyTotals = {};

    transactions.forEach((tx) => {
      if (tx.type === 'income') { income += tx.amount; } 
      else {
        expense += tx.amount;
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
      }
      const day = tx.date.split('-')[2];
      if (!dailyTotals[day]) dailyTotals[day] = { day, balanceChange: 0 };
      dailyTotals[day].balanceChange += tx.type === 'income' ? tx.amount : -tx.amount;
    });

    const catData = Object.keys(categoryTotals).map((key) => ({ name: key, value: categoryTotals[key] })).sort((a, b) => b.value - a.value);
    const topCat = catData.length > 0 ? catData[0] : { name: 'N/A', value: 0 };
    const trend = Object.values(dailyTotals).sort((a, b) => a.day - b.day);
    const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

    return { 
      totalIncome: income, 
      totalExpense: expense, 
      balance: income - expense, 
      categoryData: catData, 
      trendData: trend, 
      topCategory: topCat,
      recentActivity: recent 
    };
  }, [transactions]);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" amount={balance} icon={<DollarSign size={24} />} color="text-blue-600 dark:text-blue-400" bg="bg-blue-100 dark:bg-blue-900/20" />
        <SummaryCard title="Total Income" amount={totalIncome} icon={<TrendingUp size={24} />} color="text-emerald-600 dark:text-emerald-400" bg="bg-emerald-100 dark:bg-emerald-900/20" />
        <SummaryCard title="Total Expenses" amount={totalExpense} icon={<TrendingDown size={24} />} color="text-red-600 dark:text-red-400" bg="bg-red-100 dark:bg-red-900/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Chart & Budget Health */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Daily Cash Flow</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="balanceChange" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <BudgetHealth title="Food & Groceries" spent={8500} limit={12000} />
             <BudgetHealth title="Entertainment" spent={5200} limit={5000} />
          </div>
        </div>

        {/* Right Column: Expanded Smart Insights & Recent Activity */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl shadow-lg text-white transition-transform hover:scale-[1.02]">
            <div className="flex items-start gap-4">
              <Lightbulb size={28} className="text-yellow-300 shrink-0" />
              <div>
                <h3 className="font-semibold text-lg leading-none">Smart Insights</h3>
                <div className="mt-4 space-y-4">
                  <div className="border-l-2 border-indigo-300/30 pl-3">
                    <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Top Spending</p>
                    <p className="text-sm text-white leading-relaxed mt-0.5">
                      <strong>{topCategory.name}</strong> is your highest expense at <strong>{formatCurrency(topCategory.value)}</strong>.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-indigo-300/30 pl-3">
                    <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Savings Status</p>
                    <p className="text-sm text-white leading-relaxed mt-0.5">
                      Your current savings rate is <strong>{totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(0) : 0}%</strong>. 
                      You are in <span className="text-emerald-300 font-bold">{balance > (totalIncome * 0.2) ? 'Excellent' : 'Stable'}</span> standing.
                    </p>
                  </div>

                  <div className="border-l-2 border-indigo-300/30 pl-3">
                    <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Budget Alert</p>
                    <p className="text-sm text-white leading-relaxed mt-0.5 italic">
                      {totalExpense > (totalIncome * 0.8) 
                        ? "Expenses are reaching 80% of income. Consider reviewing non-essentials." 
                        : "Great job! Your spending is well within your monthly earnings."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <RecentActivityQuickView transactions={recentActivity} />
        </div>
      </div>

      {/* Bottom Row: 3-Column Grid for Aligned Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Spending Breakdown */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
              <Activity size={18} className="text-blue-500"/> Breakdown
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Bills */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-4 text-gray-800 dark:text-white uppercase tracking-wider">
              <Calendar size={16} className="text-blue-500"/> Upcoming Bills
            </h3>
            <div className="space-y-3">
              <BillItem name="Netflix" date="In 2 days" amount="₹649" />
              <BillItem name="Electricity" date="In 5 days" amount="₹2,450" />
            </div>
          </div>

          {/* Sprint Visualizer */}
          <SprintVisualizer transactions={transactions} limit={totalIncome > 0 ? totalIncome * 0.8 : 30000} />
      </div>
    </div>
  );
}

// --- Helper Components ---

function SummaryCard({ title, amount, icon, color, bg }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1 tracking-tight">{formatCurrency(amount)}</p>
      </div>
      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${bg} ${color}`}>{icon}</div>
    </div>
  );
}

function BudgetHealth({ title, spent, limit }) {
  const percentage = Math.min((spent / limit) * 100, 100);
  const isOverBudget = spent > limit;

  return (
    <div className={`p-5 rounded-xl border transition-all duration-300 ${
      isOverBudget ? 'bg-red-50 border-red-100 dark:bg-red-950/20 dark:border-red-900' : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700'
    }`}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-gray-700 dark:text-slate-200">{title}</span>
        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
          isOverBudget ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-500 text-white'
        }`}>
          {isOverBudget ? 'Exceeded' : `${percentage.toFixed(0)}% Used`}
        </span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-1000 ${isOverBudget ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${percentage}%` }} />
      </div>
      <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
        <span>Spent: ₹{spent.toLocaleString()}</span>
        <span>Limit: ₹{limit.toLocaleString()}</span>
      </div>
    </div>
  );
}

function RecentActivityQuickView({ transactions }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider mb-4">Recent Logs</h3>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500 dark:bg-slate-700'}`}>
                {tx.type === 'income' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-800 dark:text-slate-200">{tx.description}</span>
                <span className="text-[10px] text-gray-400">{tx.date}</span>
              </div>
            </div>
            <span className={`text-xs font-black ${tx.type === 'income' ? 'text-emerald-500' : 'text-gray-900 dark:text-white'}`}>
              {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SprintVisualizer({ transactions, limit }) {
  const today = new Date().getDate();
  
  const sprintData = useMemo(() => {
    const dailyMap = {};
    transactions.forEach(tx => {
      if (tx.type === 'expense') {
        const day = parseInt(tx.date.split('-')[2]);
        dailyMap[day] = (dailyMap[day] || 0) + tx.amount;
      }
    });

    let cumulative = 0;
    return Array.from({ length: today }, (_, i) => {
      const day = i + 1;
      cumulative += dailyMap[day] || 0;
      return { day, spent: cumulative, ideal: (limit / 30) * day };
    });
  }, [transactions, limit, today]);

  const currentSpent = sprintData.length > 0 ? sprintData[sprintData.length - 1].spent : 0;
  const isOverSprint = currentSpent > (limit / 30) * today;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm relative">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider">Monthly Sprint</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase">Spending Velocity</p>
        </div>
        <Activity size={18} className={isOverSprint ? "text-red-500" : "text-emerald-500"} />
      </div>

      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sprintData}>
            <Line type="monotone" dataKey="ideal" stroke="#94a3b8" strokeDasharray="3 3" dot={false} strokeWidth={1} />
            <Line type="stepAfter" dataKey="spent" stroke={isOverSprint ? "#ef4444" : "#3b82f6"} strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-between items-center border-t border-gray-50 dark:border-slate-700 pt-3">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Status</span>
          <span className={`text-xs font-bold ${isOverSprint ? 'text-red-500' : 'text-emerald-500'}`}>
            {isOverSprint ? 'Over Pacing' : 'Under Control'}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Avg/Day</span>
          <p className="text-xs font-bold dark:text-white">₹{(currentSpent / today || 0).toFixed(0)}</p>
        </div>
      </div>
    </div>
  );
}

function BillItem({ name, date, amount }) {
  return (
    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-800 dark:text-slate-200">{name}</span>
        <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock size={10}/> {date}</span>
      </div>
      <span className="text-sm font-bold text-gray-900 dark:text-white">{amount}</span>
    </div>
  );
}