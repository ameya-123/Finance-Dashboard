import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

// Component Imports
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Accounts from './components/Accounts';
import Goals from './components/Goals'; // New Import
import Settings from './components/Settings';
import Help from './components/Help';
import QuickActions from './components/QuickActions';

function App() {
  const [currentView, setCurrentView] = useState('dashboard'); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState('INR');

  // Apply dark mode class to the root HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Router logic
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard currency={currency} />;
      case 'transactions': return <Transactions currency={currency} />;
      case 'accounts': return <Accounts currency={currency} />;
      case 'goals': return <Goals currency={currency} />; // Added case for Goals
      case 'settings': return <Settings />;
      case 'help': return <Help />;
      default: return <Dashboard currency={currency} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white font-sans transition-colors duration-200">
      
      <Toaster position="bottom-right" />
      
      {/* Floating Action Button */}
      <QuickActions />
      
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          currency={currency} 
          setCurrency={setCurrency} 
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-slate-900 p-6 transition-colors duration-200">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;