import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="navbar-logo" />
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/aboutus" className="navbar-link">About Us</Link>
          <Link to="/blog" className="navbar-link">Blog</Link>
          <Link to="/helpdesk" className="navbar-link">Help Desk</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
