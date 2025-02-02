import { motion } from 'framer-motion';
import { useState } from 'react';
import { format } from 'date-fns';

function AdminDashboard() {
  const [dateRange, setDateRange] = useState('today');
  const [activeSection, setActiveSection] = useState('overview');

  const salesData = {
    today: {
      total: 25000,
      transactions: 45,
      averageOrder: 555.56
    },
    month: {
      total: 525000,
      transactions: 850,
      averageOrder: 617.65
    }
  };

  const inventoryStats = {
    totalItems: 1234,
    lowStock: 15,
    expiringSoon: 8,
    totalValue: 1000000
  };

  const recentTransactions = [
    {
      id: 1,
      time: '10:30 AM',
      type: 'sale',
      amount: 2500,
      customer: 'John Doe'
    },
    {
      id: 2,
      time: '09:45 AM',
      type: 'restock',
      items: 500,
      medicine: 'Paracetamol'
    },
    {
      id: 3,
      time: '09:15 AM',
      type: 'return',
      amount: 750,
      customer: 'Jane Smith'
    }
  ];

  return (
    <div className="dashboard-container">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Admin Dashboard</h1>
        <div className="date-filter">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="date-select"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </motion.div>

      <div className="dashboard-content">
        <div className="admin-grid">
          <motion.div 
            className="admin-card sales"
            whileHover={{ scale: 1.05 }}
          >
            <h3>Sales Overview</h3>
            <div className="admin-stats">
              <div className="stat">
                <span>Total Sales</span>
                <span>₹{salesData[dateRange].total.toLocaleString()}</span>
              </div>
              <div className="stat">
                <span>Transactions</span>
                <span>{salesData[dateRange].transactions}</span>
              </div>
              <div className="stat">
                <span>Average Order</span>
                <span>₹{salesData[dateRange].averageOrder.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="admin-card inventory"
            whileHover={{ scale: 1.05 }}
          >
            <h3>Inventory Status</h3>
            <div className="admin-stats">
              <div className="stat">
                <span>Total Items</span>
                <span>{inventoryStats.totalItems}</span>
              </div>
              <div className="stat warning">
                <span>Low Stock Items</span>
                <span>{inventoryStats.lowStock}</span>
              </div>
              <div className="stat danger">
                <span>Expiring Soon</span>
                <span>{inventoryStats.expiringSoon}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="admin-card financial"
            whileHover={{ scale: 1.05 }}
          >
            <h3>Financial Overview</h3>
            <div className="admin-stats">
              <div className="stat">
                <span>Revenue</span>
                <span>₹{salesData.month.total.toLocaleString()}</span>
              </div>
              <div className="stat">
                <span>Inventory Value</span>
                <span>₹{inventoryStats.totalValue.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="activity-item">
                <span className="activity-time">{transaction.time}</span>
                <span className="activity-description">
                  {transaction.type === 'sale' && 
                    `Sale completed - ₹${transaction.amount} by ${transaction.customer}`}
                  {transaction.type === 'restock' && 
                    `Inventory updated - Added ${transaction.items} units of ${transaction.medicine}`}
                  {transaction.type === 'return' && 
                    `Return processed - ₹${transaction.amount} for ${transaction.customer}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions-panel">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-button">Generate Reports</button>
            <button className="action-button">Manage Users</button>
            <button className="action-button">View All Transactions</button>
            <button className="action-button">System Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;