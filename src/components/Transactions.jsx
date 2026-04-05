import { useState, useMemo, useRef, useEffect } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Search, Filter, Plus, Trash2, Download, ChevronLeft, ChevronRight, Inbox, ReceiptText, FileText, FileJson, Table } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Transactions() {
  const { filters, setSearchQuery, setFilterType, getFilteredTransactions, isAdmin, deleteTransaction, addTransaction, transactions } = useFinanceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const exportMenuRef = useRef(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = useMemo(() => 
    ['all', ...new Set(transactions.map(t => t.category))], 
  [transactions]);

  const allFilteredTx = useMemo(() => {
    return getFilteredTransactions().filter(t => 
      filterCategory === 'all' || t.category === filterCategory
    );
  }, [getFilteredTransactions, filterCategory]);

  const totalPages = Math.ceil(allFilteredTx.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = allFilteredTx.slice(startIndex, startIndex + itemsPerPage);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTx = {
      id: `tx-${Date.now()}`,
      date: formData.get('date'),
      description: formData.get('description'),
      amount: parseFloat(formData.get('amount')),
      category: formData.get('category'),
      type: formData.get('type')
    };
    
    addTransaction(newTx);
    setIsModalOpen(false);
    toast.success('Transaction added successfully!');
  };

  // --- EXPORT LOGIC ---
  const exportAsCSV = () => {
    const headers = ['Date,Description,Category,Type,Amount'];
    const rows = allFilteredTx.map(tx => `${tx.date},"${tx.description}",${tx.category},${tx.type},${tx.amount}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    downloadFile(encodedUri, "transactions.csv");
    toast.success('CSV Exported!');
  };

  const exportAsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allFilteredTx, null, 2));
    downloadFile(dataStr, "transactions.json");
    toast.success('JSON Exported!');
  };

  const exportAsPDF = () => {
    window.print(); // Browser's print dialog handles PDF conversion cleanly
    toast.success('Print dialog opened');
  };

  const downloadFile = (uri, fileName) => {
    const link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ReceiptText className="text-blue-500" size={28} />
            Transactions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Detailed log of your financial activities</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-200">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 flex-1">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={filters.searchQuery} 
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center gap-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700">
              <Filter size={16} className="text-gray-500 dark:text-gray-400"/>
              <select 
                value={filters.type} 
                onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }} 
                className="bg-transparent outline-none dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700">
              <select 
                value={filterCategory} 
                onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }} 
                className="bg-transparent outline-none dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* MULTI-FORMAT EXPORT BUTTON */}
            <div className="relative" ref={exportMenuRef}>
              <button 
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg transition-colors"
              >
                <Download size={16} /> Export
              </button>

              {showExportMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg shadow-xl z-10 overflow-hidden">
                  <button onClick={exportAsPDF} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                    <FileText size={16} className="text-red-500" /> Export as PDF
                  </button>
                  <button onClick={exportAsCSV} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                    <Table size={16} className="text-emerald-500" /> Export as CSV
                  </button>
                  <button onClick={exportAsJSON} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                    <FileJson size={16} className="text-amber-500" /> Export as JSON
                  </button>
                </div>
              )}
            </div>
          </div>

          {isAdmin() && (
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shrink-0">
              <Plus size={18} /> Add Transaction
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-900/50 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider border-b border-gray-200 dark:border-slate-700">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
                {isAdmin() && <th className="px-6 py-4 font-medium text-center">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {currentTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">
                    <Inbox className="mx-auto h-12 w-12 text-gray-300 dark:text-slate-600 mb-3" />
                    <p className="text-lg font-medium">No transactions found</p>
                  </td>
                </tr>
              ) : (
                currentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">{formatDate(tx.date)}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{tx.description}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                        {tx.category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-semibold whitespace-nowrap ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                    {isAdmin() && (
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => deleteTransaction(tx.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 size={18} className="mx-auto"/>
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-200 dark:border-slate-700 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, allFilteredTx.length)} of {allFilteredTx.length} results
            </div>
            <div className="flex gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && isAdmin() && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 w-full max-w-md border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Add Transaction</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <select name="type" required className="border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white p-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                <input type="date" name="date" required className="border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white p-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <input type="text" name="description" required placeholder="Description" className="border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white p-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" name="amount" step="0.01" min="0" required placeholder="Amount" className="border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white p-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" name="category" required placeholder="Category" className="border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white p-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}