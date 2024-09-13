import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BitcoinFlip from './BitcoinFlip';
import AboutUs from './AboutUs';
import Blog from './Blog';
import HelpDesk from './HelpDesk';
import Preloader from './Preloader'; // Import the Preloader component
import './App.css'; // Adjust the path if necessary


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust time based on preloader duration

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <Router>
      {loading ? (
        <Preloader /> // Show the preloader while loading
      ) : (
        <>
          <Navbar /> {/* Fixed navbar */}
          <div className="scrollable-container"> {/* Wrapper for routing content */}
            <Routes>
              <Route path="/" element={<BitcoinFlip />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/helpdesk" element={<HelpDesk />} />
            </Routes>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
