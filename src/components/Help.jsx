import React, { useState } from 'react';
import { Search, MessageSquare, Mail, BookOpen, ChevronDown } from 'lucide-react';

const HelpCard = ({ icon: Icon, title, desc, color }) => (
  <button className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
    <div className={`p-4 rounded-full mb-4 group-hover:scale-110 transition-transform ${color}`}>
      <Icon size={24} />
    </div>
    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h3>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
  </button>
);

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    { q: "How do I link a new bank account?", a: "Go to the 'Accounts' tab, click 'Add New Account', and follow the secure login steps for your bank." },
    { q: "Is my data shared with third parties?", a: "No. Zorvyn Finance uses end-to-end encryption and we never sell your financial data." },
    { q: "How can I export my transaction history?", a: "In the 'Transactions' tab, you'll find an 'Export' button at the top right to download CSV or PDF reports." }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Search Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">How can we help?</h2>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for articles, guides, and more..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <HelpCard icon={BookOpen} title="Documentation" desc="Read our full system guide" color="bg-blue-50 text-blue-600 dark:bg-blue-900/20" />
        <HelpCard icon={MessageSquare} title="Live Chat" desc="Average wait: 2 mins" color="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" />
        <HelpCard icon={Mail} title="Email Support" desc="Response within 24 hours" color="bg-purple-50 text-purple-600 dark:bg-purple-900/20" />
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm p-8">
        <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
        <div className="divide-y dark:divide-slate-700">
          {faqs.map((faq, i) => (
            <div key={i} className="py-4">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left group"
              >
                <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition-colors">{faq.q}</span>
                <ChevronDown className={`text-gray-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} size={20} />
              </button>
              {openIndex === i && (
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed animate-in fade-in duration-300">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}