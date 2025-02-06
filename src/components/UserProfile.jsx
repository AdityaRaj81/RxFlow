import { useState } from 'react';
import { motion } from 'framer-motion';
import './../styles/UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || {
      name: '',
      email: '',
      phone: '',
      address: '',
      dob: '',
      gender: '',
      profilePic: '',
      role: 'User',
      joiningDate: '2023-01-01',
    }
  );
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(user.profilePic || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...formData, profilePic };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setProfilePic(reader.result);
    if (file) reader.readAsDataURL(file);
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
        {/* Left Panel: Non-editable details */}
        <motion.div
          className="left-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          
          <div className="profile-avatar">
            {profilePic ? <img src={profilePic} alt="Profile" /> : user.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-title">
            <h2>{user.name}</h2>
            <span className="role-badge">{user.role}</span>
          </div>
          <div className="profile-details">
            <div className="detail-item">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="detail-item">
              <label>Joining Date:</label>
              <span>{user.joiningDate}</span>
            </div>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>

          <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          
        </motion.div>

        {/* Right Panel: Editable form */}
        <motion.div
          className="right-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isEditing ? (
            <motion.form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Profile Picture</label>
                <input type="file" accept="image/*" onChange={handleFileUpload} />
                {profilePic && <img src={profilePic} alt="Preview" className="preview-pic" />}
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Change Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-button">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.form>
        ) : null}
        </motion.div>
      </div>
    </div>
  );
}

export default UserProfile;
