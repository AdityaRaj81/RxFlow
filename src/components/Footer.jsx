import { motion } from 'framer-motion'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
        <div className="logo">
        <a href="../index.html">
          <img src="src\assets\Logo.jpg" alt="Logo" />
        </a>
      </div>

          <p>Your trusted partner in digital innovation and business solutions.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@RxFlow.com</p>
          <p>Phone: +91 86510 65233</p>
          <p>Address: India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 RxFlow. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer