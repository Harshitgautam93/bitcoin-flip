// src/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/helpdesk">Help Desk</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
