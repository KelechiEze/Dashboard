import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "./ForgotPassword.css"; // Import styles

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // Store user email
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSendResetEmail = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required!");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Reset link sent! Check your email.");
      
      // Redirect after 5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setError("Failed to send reset email. Please try again.");
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password?</h2>
      <p className="forgot-password-instruction">
        Enter your email to receive a password reset link.
      </p>

      <div className="form-group">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="password-input"
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <button className="set-password-button" onClick={handleSendResetEmail}>
        Send Reset Link
      </button>
    </div>
  );
};

export default ForgotPassword;
