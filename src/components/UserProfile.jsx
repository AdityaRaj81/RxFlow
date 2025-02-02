import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function UserProfile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="dashboard-container">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>User Profile</h1>
      </motion.div>

      <div className="dashboard-content">
        <div className="profile-container">
          {!isEditing ? (
            <motion.div 
              className="profile-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="profile-header">
                <div className="profile-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="profile-title">
                  <h2>{user.name}</h2>
                  <span className="role-badge">{user.role}</span>
                </div>
              </div>
              <div className="profile-details">
                <div className="detail-item">
                  <label>Email:</label>
                  <span>{user.email}</span>
                </div>
                <div className="detail-item">
                  <label>Phone:</label>
                  <span>{user.phone || 'Not set'}</span>
                </div>
                <div className="detail-item">
                  <label>Address:</label>
                  <span>{user.address || 'Not set'}</span>
                </div>
              </div>
              <button 
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </motion.div>
          ) : (
            <motion.form 
              className="profile-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-button">Save Changes</button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;