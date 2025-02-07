import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Import Firebase Authentication
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Eye icons
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Manage password visibility

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle Firebase Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    console.log("Attempting to log in with:", formValues.email); // Log email input

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formValues.email, formValues.password);
      const user = userCredential.user;

      console.log("✅ User logged in successfully:", user);
      console.log("🔑 User UID:", user.uid); // Log UID for debugging

      localStorage.setItem("user", JSON.stringify(user)); // Store user data
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (err) {
      console.error("❌ Login Error:", err); // Log full error in the console

      // Handle specific Firebase Auth errors
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email. Please register.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed login attempts. Please try again later.");
      } else {
        setError("Login failed. Please check your details and try again.");
      }
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
        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-input"
            value={formValues.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group password-container">
          <input
            type={showPassword ? "text" : "password"} // Toggle input type
            name="password"
            placeholder="Password"
            className="form-input"
            value={formValues.password}
            onChange={handleInputChange}
            required
          />
          <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
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
        <button type="submit" className="submit-button1">
          Login <span className="arrow">↗</span>
        </button>
        <p className="register-prompt">
          Not a Member?{" "}
          <NavLink to="/" className="register-link">
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
