import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    // Simulate authentication (replace with real authentication logic)
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (email && password) {
      // Redirect to Dashboard after login
      navigate("/dashboard");
    } else {
      alert("Please enter valid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <span className="account-login">ACCOUNT LOGIN</span>
        <h1 className="login-title">Login to PayCoin</h1>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="form-heading">Login Your Account</h2>
        <div className="form-group">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
            required
          />
        </div>
        <div className="form-footer">
          <label className="remember-me">
            <input type="checkbox" />
            Remember me
          </label>
          <NavLink to="/forgot-password" className="forgot-password">
            Forgot Password?
          </NavLink>
        </div>
        <button type="submit" className="submit-button">
          Login <span className="arrow">↗</span>
        </button>
        <p className="register-prompt">
          Not a Member?{" "}
          <NavLink to="/register" className="register-link">
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
