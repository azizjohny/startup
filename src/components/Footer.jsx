// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <div className="contact">
          <p>
            <Link to="/contact">Contact Us</Link>
          </p>
          {/* Add contact information or links */}
        </div>
        <div className="about">
          <p>
            <Link to="/about">About Us</Link>
          </p>
          {/* Add information about your website */}
        </div>
        <div className="copyright">
          <p>&copy; {currentYear} xnarx</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
