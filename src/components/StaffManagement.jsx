import { useState } from 'react';
import { motion } from 'framer-motion';

function StaffManagement() {
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'John Doe', email: 'staff@gmail.com', role: 'staff', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'auditor@gmail.com', role: 'auditor', status: 'active' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    role: 'staff',
    password: ''
  });

  const handleAddStaff = (e) => {
    e.preventDefault();
    setStaffList([
      ...staffList,
      {
        id: staffList.length + 1,
        ...newStaff,
        status: 'active'
      }
    ]);
    setShowAddForm(false);
    setNewStaff({ name: '', email: '', role: 'staff', password: '' });
  };

  return (
    <div className="dashboard-container">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Staff Management</h1>
        <button 
          className="action-button"
          onClick={() => setShowAddForm(true)}
        >
          Add New Staff
        </button>
      </motion.div>

      <div className="dashboard-content">
        {showAddForm && (
          <motion.div 
            className="add-staff-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>Add New Staff Member</h2>
            <form onSubmit={handleAddStaff}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                >
                  <option value="staff">Staff</option>
                  <option value="auditor">Auditor</option>
                </select>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={newStaff.password}
                  onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-button">Add Staff</button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="staff-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map(staff => (
                <motion.tr 
                  key={staff.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td>{staff.name}</td>
                  <td>{staff.email}</td>
                  <td>{staff.role}</td>
                  <td>
                    <span className={`status-badge ${staff.status}`}>
                      {staff.status}
                    </span>
                  </td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StaffManagement;