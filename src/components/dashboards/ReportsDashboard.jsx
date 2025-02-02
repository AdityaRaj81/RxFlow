import { motion } from 'framer-motion';
import { useState } from 'react';
import { format } from 'date-fns';

function ReportsDashboard() {
  const [dateRange, setDateRange] = useState('today');
  const [reportType, setReportType] = useState('sales');

  return (
    <div className="dashboard-container">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Reports Dashboard</h1>
        <div className="quick-actions">
          <select 
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="date-select"
          >
            <option value="sales">Sales Report</option>
            <option value="inventory">Inventory Report</option>
            <option value="expiry">Expiry Report</option>
          </select>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="date-select"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </motion.div>

      <div className="dashboard-content">
        <div className="report-summary">
          <h3>Report Summary - {reportType.charAt(0).toUpperCase() + reportType.slice(1)}</h3>
          <p>Period: {dateRange}</p>
          <p>Generated on: {format(new Date(), 'dd/MM/yyyy HH:mm')}</p>
        </div>

        <div className="report-data">
          {/* Report data will be displayed here based on the selected type and range */}
          <p>Report data will be displayed here...</p>
        </div>

        <div className="report-actions">
          <button className="action-button">Download PDF</button>
          <button className="action-button">Export Excel</button>
          <button className="action-button">Print Report</button>
        </div>
      </div>
    </div>
  );
}

export default ReportsDashboard;