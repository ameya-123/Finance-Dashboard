#  ZorvynFinance - Financial Dashboard

**ZorvynFinance** is a high performance Financial Intelligence Dashboard built with **React** and **Tailwind CSS**. It moves beyond simple expense tracking by implementing **Agile inspired velocity charts**, **automated budget auditing**, and **multi format data portability**.

##  Dashboard Previews

### 1. Main Dashboard Overview
The central intelligence hub. It aggregates global state from the **Zustand Store** to provide a real-time snapshot of the user's financial position.

<img width="1915" height="857" alt="Screenshot 2026-04-06 094426" src="https://github.com/user-attachments/assets/1afc403f-7ca4-4585-bea1-5195605a5c9c" />

### 2. Advanced Transactions Ledger
A robust data management system designed for high-volume financial logs with professional-grade portability.

<img width="1906" height="871" alt="image" src="https://github.com/user-attachments/assets/9e15b681-b1e8-49e4-a72c-307d5d1ebc63" />

### 3. Multi-Account Management
A liquidity-focused module that tracks assets across fragmented financial silos like Bank, Cash, and Savings.

<img width="1903" height="866" alt="image" src="https://github.com/user-attachments/assets/fbdba3f0-386d-4f05-bb4a-3b2cd96224d4" />


### 4. Smart Savings Goals
A target-oriented planning module that synchronizes the user's total balance with long-term financial objectives.

<img width="1910" height="861" alt="image" src="https://github.com/user-attachments/assets/d8b8aa77-d30f-48a9-8d6a-9be069d52912" />


## Core Features

###  Financial Summary and Interactive Charts
- **Summary KPI Cards:** Real-time calculation of Total Balance, Income, and Expenses with smart INR formatting.
- **Daily Cash Flow:** A high-fidelity `AreaChart` (via Recharts) visualizing daily liquidity fluctuations.
- **Categorical Breakdown:** A specialized `PieChart` that groups expenses by category to identify major budget "leaks."

### Transaction Management
- **Search & Filter Engine:** Instant filtering by description, type (Income/Expense), and categories.
- **Pagination:** Handles large datasets gracefully with a seamless navigation system and "Empty State" UI.

### Role Based UI (RBAC) Simulation
- **Admin Role:** Full access to state-mutating actions like "Add Transaction" and "Delete."
- **Viewer Role:** Read-only interface where data-entry tools are conditionally removed from the DOM to demonstrate front-end security principles.

---

## Advanced Extra Features 

### 1. Monthly Spending Sprint (Velocity Graph)
A specialized "Burn-up" chart that calculates if your current spending pace is sustainable.
- **The Logic:** It calculates a daily spending limit ($Total \: Limit \div 30 \times Current \: Day$).
- **Visual Feedback:** The UI signals **"Over Pacing"** if you exceed the ideal path, acting as a real-time early warning system.

### 2. Multi-Account Management
Unlike a single balance tracker, this module manages fragmented assets across Bank, Cash, and Savings.
- **Liquidity Ratio:** Automatically identifies how much of your total net worth is "Liquid" vs. "Banked."

### 3. Smart Savings Goals
A goal-oriented planning module with real-time mathematical synchronization.
- **Progress Tracking:** Tracks percentage completion for targets like an "Emergency Fund" or "New Laptop."
- **Live Sync:** Progress bars react instantly as your total balance fluctuates from new transactions.

### 4. Intelligent Insight Engine
A rule-based auditing system that performs background analysis on spending behavior:
- **80% Threshold Warnings:** Triggers a high-priority UI alert when monthly expenses hit 80% of total earnings.
- **Savings Retention:** Analyzes the ratio of income saved vs. spent to categorize financial health as "Excellent" or "Stable."

### 5. Multi-Format Export Engine (PDF/CSV/JSON)
A professional data portability tool built into the transaction ledger:
- **PDF:** High-fidelity, print-ready reports via browser stream.
- **CSV:** Standard spreadsheet export for Excel and Google Sheets.
- **JSON:** A direct state-to-schema dump for data migration or API testing.

### 6. Budget Pulse Monitoring
- **Visual Feedback:** Progress bars for categories feature a **Pulse Animation** and color-shift (Blue to Red) when a limit is breached.


## Tech Stack

- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS (Dark mode ready)
- **State Management:** **Zustand** (Clean, Store based architecture)
- **Data Visualization:** Recharts
- **Iconography:** Lucide React
- **UI Components:** Framer Motion and Tailwind animate


## Installation and  Setup

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/finance-dashboard.git](https://github.com/your-username/finance-dashboard.git)

# 2. Navigate into the project directory
cd finance-dashboard

# 3. Install Core Dependencies
# (Required to download React, Tailwind, and Zustand)
npm install

# 4. Start the Development Server
npm run dev

## Project Structure

<img width="847" height="308" alt="image" src="https://github.com/user-attachments/assets/8c1a5875-b0b7-4d71-91af-486079edc931" />

