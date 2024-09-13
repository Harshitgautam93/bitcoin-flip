// src/App.js

import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BitcoinFlip from './BitcoinFlip'; // Import from the new file
import AboutUs from './AboutUs'; // Add the AboutUs component
import Blog from './Blog'; // Add the Blog component
import HelpDesk from './HelpDesk'; // Add the HelpDesk component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BitcoinFlip />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/helpdesk" element={<HelpDesk />} />
      </Routes>
    </Router>
  );
}

export default App;
