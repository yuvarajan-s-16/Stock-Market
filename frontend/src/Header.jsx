import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isnotDashboard = location.pathname === "/" || location.pathname === "/contact" || location.pathname === "/login" || location.pathname === "/register" || location.pathname ==="/about";
  
  return (
    <header>
      <nav>
        {isnotDashboard ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/contact">Contact</Link>
            
          </>
        ) : (
          <>
          
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/Stock">Data</Link>
            <Link to="/portfolio">portfolio</Link>
            <Link to="/learn">Learn</Link>
            <Link to="/" className="log">Logout</Link>
            
 
            
          </>
        )}
      </nav>
      <span className="springboard">Springboard</span>
    </header>
  );
}

export default Header;
