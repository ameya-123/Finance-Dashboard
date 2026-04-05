import React from 'react';

export default function Analytics() {
  // Simplified CSS representation of a chart
  const data = [
    { month: 'Jan', value: 120 }, { month: 'Feb', value: 90 }, 
    { month: 'Mar', value: 150 }, { month: 'Apr', value: 110 }, 
    { month: 'May', value: 130 }, { month: 'Jun', value: 100 }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Spending Analytics</h2>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border border-gray-200 dark:border-slate-700 h-64 flex items-end justify-around">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="bg-blue-500 dark:bg-blue-600 w-12 rounded-t-sm" 
              style={{ height: `${item.value}px` }}
            ></div>
            <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}