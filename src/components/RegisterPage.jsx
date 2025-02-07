import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Import Firebase auth & Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./RegisterPage.css";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
];

const RegisterPage = () => {
  const [loading, setLoading] = useState(false); // Show loading indicator
  const navigate = useNavigate();

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

  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = (field) => {
    setIsPasswordVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Handle Register Submission (Firebase Integration)
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true); // Start loading

    try {
      // Step 1: Register User in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      const user = userCredential.user;
      console.log("User registered:", user);

      // Step 2: Store Additional User Info in Firestore
      await setDoc(doc(collection(db, "users"), user.uid), {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        gender: formValues.gender,
        country: formValues.country,
        phone: formValues.phone,
        password: formValues.password,
        userId: user.uid,
      });
      console.log("User information stored in Firestore");

      // Registration successful: Alert and redirect to login page
      alert("Registration Successful! You can now log in to your dashboard.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
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
        
        {/* Password and Confirm Password with Visibility Toggle */}
        <div className="form-group">
          <div className="password-wrapper">
            <input
              type={isPasswordVisible.password ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="form-input"
              value={formValues.password}
              onChange={handleInputChange}
              required
            />
            <span className="eye-icon2" onClick={() => togglePasswordVisibility("password")}>
              {isPasswordVisible.password ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          <div className="password-wrapper">
            <input
              type={isPasswordVisible.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-input"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <span className="eye-icon2" onClick={() => togglePasswordVisibility("confirmPassword")}>
              {isPasswordVisible.confirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
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
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="texting">
          Already have an account?{" "}
          <NavLink to="/login" className="login-link">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
