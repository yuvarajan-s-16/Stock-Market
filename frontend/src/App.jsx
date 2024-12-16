import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard/Dashboard";
import './App.css';
import Stock from "./Dashboard/Stock";
import Portfolio from "./Dashboard/Portfolio";
import Learn from "./Dashboard/Learn";

const App = () => {
  return (
    <Router>
      <div className="div1">
        <Header />
      </div>
      <div className="div2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stock" element={<Stock symbol="AAPL" />}/>
          <Route path="/portfolio" element={<Portfolio />}/>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
