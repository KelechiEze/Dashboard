import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import "./RegisterPage.css";

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria"
];

const RegisterPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  // State to hold form input values
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    country: "",
    phone: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent default form submission
    setModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Hide the modal
    // Reset form values
    setFormValues({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      country: "",
      phone: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    });
  };

  return (
    <div className="register-page">
      <div className="register-header">
        <span className="account-create">ACCOUNT CREATE</span>
        <h1 className="register-title">Register to PayCoin</h1>
      </div>
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="form-heading">Create Your Account</h2>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="form-input"
            value={formValues.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="form-input"
            value={formValues.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
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
          <select
            name="gender"
            className="form-input"
            value={formValues.gender}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled hidden>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <select
            name="country"
            className="form-input"
            value={formValues.country}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="form-input"
            value={formValues.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
            value={formValues.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Password Confirm"
            className="form-input"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-footer">
          <label className="remember-me">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formValues.rememberMe}
              onChange={handleInputChange}
              required
            />
            Remember me
          </label>
          <a href="/" className="forgot-password">
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="submit-button">Register</button>
        <p className="texting">
          Already have an account?{" "}
          <NavLink to="/login" className="login-link">
            Login
          </NavLink>
        </p>
      </form>

      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <p>
              Registration Successful! You can now Login to your dashboard using
              your Details.
            </p>
            <div className="modal-buttons">
              {/* Close button */}
              <button className="modal-close-button" onClick={closeModal}>
                Close
              </button>

              {/* Login button */}
              <NavLink to="/login" className="modal-login-button">
                Login
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
