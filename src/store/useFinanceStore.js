import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 1. Imported persist middleware
import { mockTransactions } from '../data/mockTransactions';

export const useFinanceStore = create(
  // 2. Wrapped your exact existing logic inside persist()
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      userRole: 'viewer', // 'viewer' | 'admin'
      filters: {
        searchQuery: '',
        type: 'all', 
      },

      setRole: (role) => set({ userRole: role }),
      isAdmin: () => get().userRole === 'admin',

      addTransaction: (newTx) => set((state) => ({ 
        transactions: [newTx, ...state.transactions] 
      })),
      
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(tx => tx.id !== id)
      })),

      setSearchQuery: (query) => set((state) => ({ 
        filters: { ...state.filters, searchQuery: query } 
      })),

      setFilterType: (type) => set((state) => ({ 
        filters: { ...state.filters, type: type } 
      })),

      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        return transactions.filter(tx => {
          const matchesSearch = tx.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                                tx.category.toLowerCase().includes(filters.searchQuery.toLowerCase());
          const matchesType = filters.type === 'all' || tx.type === filters.type;
          return matchesSearch && matchesType;
        });
      }
    }),
    {
      name: 'finance-dashboard-storage', 
    }
  )
);