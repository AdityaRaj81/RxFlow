import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';
import Auth from './components/Auth';
import Footer from './components/Footer';
import BillingDashboard from './components/dashboards/BillingDashboard';
import InventoryDashboard from './components/dashboards/InventoryDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import ReportsDashboard from './components/dashboards/ReportsDashboard';
import UserProfile from './components/UserProfile';
import StaffManagement from './components/StaffManagement';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <nav className="nav">
            <motion.div
              className="logo"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              RxFlow
            </motion.div>
            <div className="nav-buttons">
              <Link to="/" className="nav-button">Home</Link>
              {!user && (
                <>
                  <button onClick={() => scrollToSection('features')} className="nav-button">Features</button>
                  <button onClick={() => scrollToSection('products')} className="nav-button">Products</button>
                  <button onClick={() => scrollToSection('pricing')} className="nav-button">Pricing</button>
                  <button onClick={() => scrollToSection('about')} className="nav-button">About</button>
                  <button onClick={() => scrollToSection('contact')} className="nav-button">Contact</button>
                  <Link to="/auth" className="nav-button primary">Sign In</Link>
                </>
              )}
              {user && (
                <>
                  {['staff', 'admin'].includes(user.role) && (
                    <>
                      <Link to="/billing" className="nav-button">Billing</Link>
                      <Link to="/inventory" className="nav-button">Inventory</Link>
                    </>
                  )}
                  {['auditor', 'admin'].includes(user.role) && (
                    <Link to="/reports" className="nav-button">Reports</Link>
                  )}
                  {user.role === 'admin' && (
                    <>
                      <Link to="/admin" className="nav-button">Admin</Link>
                      <Link to="/staff-management" className="nav-button">Staff</Link>
                    </>
                  )}
                  <Link to="/profile" className="nav-button">Profile</Link>
                  <button onClick={handleLogout} className="nav-button">Logout</button>
                </>
              )}
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute allowedRoles={['staff', 'auditor', 'admin']}>
                <UserProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/staff-management" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <StaffManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/billing" 
            element={
              <ProtectedRoute allowedRoles={['staff', 'admin']}>
                <BillingDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventory" 
            element={
              <ProtectedRoute allowedRoles={['staff', 'admin']}>
                <InventoryDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <ProtectedRoute allowedRoles={['auditor', 'admin']}>
                <ReportsDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <main className="home-container">
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            {...fadeInUp}
          >
            Welcome to RxFlow
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Streamline Your Medical Shop Operations
          </motion.p>
          <motion.div 
            className="hero-buttons"
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <Link to="/auth" className="cta-button">Get Started</Link>
            <a href="#features" className="secondary-button">Learn More</a>
          </motion.div>
        </div>
      </motion.section>

      <section id="features" className="features-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why Choose RxFlow?
        </motion.h2>
        <div className="features-grid">
          {[
            {
              icon: '💊',
              title: 'Smart Inventory',
              description: 'Automated tracking and alerts for stock management'
            },
            {
              icon: '📊',
              title: 'Easy Billing',
              description: 'Streamlined billing process with instant invoice generation'
            },
            {
              icon: '📱',
              title: 'Mobile Ready',
              description: 'Access your dashboard from any device, anywhere'
            },
            {
              icon: '📈',
              title: 'Analytics',
              description: 'Detailed insights into your business performance'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="products" className="products-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Products
        </motion.h2>
        <div className="products-grid">
          <motion.div 
            className="product-card"
            whileHover={{ scale: 1.05 }}
          >
            <h3>RxFlow Basic</h3>
            <p>Perfect for small pharmacies</p>
            <ul>
              <li>Basic inventory management</li>
              <li>Simple billing system</li>
              <li>Basic reporting</li>
            </ul>
          </motion.div>
          <motion.div 
            className="product-card featured"
            whileHover={{ scale: 1.05 }}
          >
            <h3>RxFlow Pro</h3>
            <p>For growing businesses</p>
            <ul>
              <li>Advanced inventory management</li>
              <li>Multi-user support</li>
              <li>Advanced analytics</li>
              <li>Customer management</li>
            </ul>
          </motion.div>
          <motion.div 
            className="product-card"
            whileHover={{ scale: 1.05 }}
          >
            <h3>RxFlow Enterprise</h3>
            <p>For large pharmacy chains</p>
            <ul>
              <li>Multi-store management</li>
              <li>Advanced security features</li>
              <li>Custom integrations</li>
              <li>24/7 support</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="pricing-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Pricing Plans
        </motion.h2>
        <div className="pricing-grid">
          <motion.div 
            className="pricing-card"
            whileHover={{ scale: 1.05 }}
          >
            <h3>Basic</h3>
            <div className="price">₹999<span>/month</span></div>
            <ul>
              <li>Up to 1000 products</li>
              <li>2 user accounts</li>
              <li>Basic support</li>
              <li>Daily backups</li>
            </ul>
            <button className="pricing-button">Get Started</button>
          </motion.div>
          <motion.div 
            className="pricing-card featured"
            whileHover={{ scale: 1.05 }}
          >
            <h3>Pro</h3>
            <div className="price">₹1999<span>/month</span></div>
            <ul>
              <li>Unlimited products</li>
              <li>5 user accounts</li>
              <li>Priority support</li>
              <li>Real-time backups</li>
              <li>Advanced analytics</li>
            </ul>
            <button className="pricing-button">Get Started</button>
          </motion.div>
          <motion.div 
            className="pricing-card"
            whileHover={{ scale: 1.05 }}
          >
            <h3>Enterprise</h3>
            <div className="price">Custom</div>
            <ul>
              <li>Unlimited everything</li>
              <li>Custom user roles</li>
              <li>24/7 premium support</li>
              <li>Custom features</li>
              <li>Dedicated account manager</li>
            </ul>
            <button className="pricing-button">Contact Us</button>
          </motion.div>
        </div>
      </section>

      <section id="about" className="about-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About Us
        </motion.h2>
        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Our Mission</h3>
            <p>To revolutionize pharmacy management through innovative technology solutions that enhance efficiency and patient care.</p>
            
            <h3>Our Vision</h3>
            <p>To be the leading provider of pharmacy management solutions, empowering pharmacists to focus on what matters most - their patients.</p>
            
            <h3>Our Values</h3>
            <ul>
              <li>Innovation in healthcare</li>
              <li>Customer-first approach</li>
              <li>Data security and privacy</li>
              <li>Continuous improvement</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Contact Us
        </motion.h2>
        <div className="contact-content">
          <motion.form 
            className="contact-form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Your email" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Your message"></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </motion.form>
          <div className="contact-info">
            <div className="info-item">
              <h3>Email</h3>
              <p>support@rxflow.com</p>
            </div>
            <div className="info-item">
              <h3>Phone</h3>
              <p>+91 86510 65233</p>
            </div>
            <div className="info-item">
              <h3>Address</h3>
              <p>123 Business Street<br />Tech City, State 12345</p>
            </div>
          </div>
        </div>
      </section>

      <motion.section 
        className="stats-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="stats-grid">
          <div className="stat-item">
            <h3>1000+</h3>
            <p>Medical Shops</p>
          </div>
          <div className="stat-item">
            <h3>10M+</h3>
            <p>Prescriptions</p>
          </div>
          <div className="stat-item">
            <h3>99.9%</h3>
            <p>Uptime</p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

export default App;