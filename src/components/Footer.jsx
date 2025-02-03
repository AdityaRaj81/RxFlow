import { motion } from 'framer-motion'
import { useState, useEffect } from 'react';

function Footer() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const formattedDateTime = new Intl.DateTimeFormat('en-US', {
    weekday: 'long', // Options: 'short', 'narrow', 'long'
    year: 'numeric', // Options: '2-digit', 'numeric'
    month: 'long',   // Options: 'numeric', '2-digit', 'short', 'long', 'narrow'
    day: '2-digit',  // Options: 'numeric', '2-digit'
    hour: '2-digit', // Options: 'numeric', '2-digit'
    minute: '2-digit',
    second: '2-digit',
    hour12: true,    // Use 12-hour format; set to false for 24-hour format
  }).format(currentDateTime);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
        <div className="logo">
        <a href="src\App.jsx">
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
        <p>{formattedDateTime}</p>
      </div>
    </footer>
  )
}

export default Footer