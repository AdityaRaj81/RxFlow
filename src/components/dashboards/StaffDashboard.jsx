import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../styles/StaffDashboard.css'; // Import the CSS file

function StaffDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  
  const staffDetails = {
    totalWorkingDays: 240,
    leavesAvailable: 12,
    leavesUsed: 3,
    upcomingShifts: [
      { date: '2024-01-15', shift: 'Morning' },
      { date: '2024-01-16', shift: 'Evening' },
    ],
  };

  const [headerMessage, setHeaderMessage] = useState("");

  // Function to update the header message dynamically
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setHeaderMessage(`Good Morning, ${user.name}`);
    } else if (hour < 18) {
      setHeaderMessage(`Good Afternoon, ${user.name}`);
    } else {
      setHeaderMessage(`Good Evening, ${user.name}`);
    }
  }, [user.name]);

  return (
    <div className="dashboard-container">
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          {/* Staff Profile Image */}
          <img src={user.profilePicture} alt="Profile" className="profile-image" />
          <div className="greeting">
            <h1>{headerMessage}</h1>
            <p className="role">Role: {user.role}</p>
          </div>
        </div>
      </motion.div>

      <div className="staff-actions-grid">
        <motion.div className="action-card" whileHover={{ scale: 1.05 }}>
          <Link to="/billing" className="action-link">
            <h3>Billing Dashboard</h3>
            <p>Manage customer bills and transactions</p>
          </Link>
        </motion.div>
        <motion.div className="action-card" whileHover={{ scale: 1.05 }}>
          <Link to="/inventory" className="action-link">
            <h3>Inventory Management</h3>
            <p>Manage medicine stock and inventory</p>
          </Link>
        </motion.div>
      </div>

      <div className="dashboard-content">
        <div className="staff-stats-grid">
          <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
            <h3>Total Working Days</h3>
            <p>{staffDetails.totalWorkingDays}</p>
          </motion.div>
          <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
            <h3>Leaves Available</h3>
            <p>{staffDetails.leavesAvailable}</p>
          </motion.div>
          <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
            <h3>Leaves Used</h3>
            <p>{staffDetails.leavesUsed}</p>
          </motion.div>
        </div>

        <div className="upcoming-shifts">
          <h3>Upcoming Shifts</h3>
          <div className="shifts-list">
            {staffDetails.upcomingShifts.map((shift, index) => (
              <div key={index} className="shift-item">
                <span>{shift.date}</span>
                <span>{shift.shift} Shift</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
