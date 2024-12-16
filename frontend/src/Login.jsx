import React, { useRef, useState } from "react";
import axios from "axios";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Dashboard from "./Dashboard/Dashboard";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [res, setRes] = useState({});
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email) {
      setError('Please enter an email address or phone number');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    // Additional validation for email format (if email is used)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Clear any existing errors if validation passes
    setError('');
    // Proceed with login logic here
  };

  const post_data = async () => {
    try {
      const res = await axios.post("http://localhost:7000/login", {
        "email": ref1.current.value,
        "password": ref2.current.value,
      });
      const { data } = res;
      setRes(data);

      // Check if login was successful
      if (data.success) {
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  }

  return (
    <>
      <div className="content">
        <h1>Login Form</h1>
        <form onSubmit={handleLogin}>
          <div className="field">
            <span><FaUser /></span>
            <input type="text" ref={ref1} placeholder="Email or Phone" value={email}
              onChange={(e) => setEmail(e.target.value)} required></input>
          </div>
          <div className="field space">
            <span><RiLockPasswordFill /></span>
            <input type="password" className="pass-key" value={password}
              onChange={(e) => setPassword(e.target.value)} ref={ref2} placeholder="Password" required></input>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="field space">
            <input type="submit" onClick={post_data} value="LOGIN"></input>
          </div>
          <p ></p>
        </form>
        <div className="signup">Don't have account?
          <a href="/register">Signup Now</a>
        </div>

      </div>
    </>
  );
}

export default Login;
