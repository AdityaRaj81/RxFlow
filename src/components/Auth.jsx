import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Auth.css';

const USERS = {
  staff: { email: 'staff@rxflow.com', password: '123', role: 'staff' },
  auditor: { email: 'auditor@rxflow.com', password: '123', role: 'auditor' },
  admin: { email: 'admin@rxflow.com', password: '123', role: 'admin' }
};

function Auth() {
  const [activeForm, setActiveForm] = useState('login');
  const [role, setRole] = useState('staff');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const user = Object.values(USERS).find(u => u.email === email);
    
    if (!user || user.password !== password) {
      setError('Invalid email or password');
      return;
    }

    // Store user info in localStorage
    localStorage.setItem('user', JSON.stringify({
      email: user.email,
      role: user.role,
      name: user.email.split('@')[0]
    }));

    // Redirect based on role
    switch (user.role) {
      case 'staff':
        navigate('/staff');
        break;
      case 'auditor':
        navigate('/reports');
        break;
      case 'admin':
        navigate('/admin');
        break;
    }
  };

  return (
    <div className="auth-container">
      <AnimatePresence mode="wait">
        {activeForm === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="auth-form"
          >
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required 
                />
              </div>
              <div className="form-group">
                {/* <label>Role:</label> */}
                <div className="role-options" style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
              <label>
                <input 
                  type="radio" 
                  name="role" 
                  value="staff" 
                  checked={role === 'staff'} 
                  onChange={(e) => setRole(e.target.value)} 
                />
                Staff
              </label>
    <label>
      <input 
        type="radio" 
        name="role" 
        value="auditor" 
        checked={role === 'auditor'} 
        onChange={(e) => setRole(e.target.value)} 
      />
      Auditor
    </label>
    <label>
      <input 
        type="radio" 
        name="role" 
        value="admin" 
        checked={role === 'admin'} 
        onChange={(e) => setRole(e.target.value)} 
      />
      Admin
    </label>
  </div>
</div>



              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="submit-button">Login</button>
            </form>
            <div className="auth-links">
              <p className="helper-text">
                Demo Credentials:<br />
                Staff: staff@rxflow.com / 123<br />
                Auditor: auditor@rxflow.com / 123<br />
                Admin: admin@rxflow.com / 123
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Auth;