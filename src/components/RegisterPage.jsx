import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Import Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./RegisterPage.css";

// List of countries
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
  "Argentina", "Armenia", "Australia", "Austria"
];

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    coupleEmail: "", // New field for couple's email
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

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (formValues.password !== formValues.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    setLoading(true);
  
    try {
      // Register User in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formValues.email, formValues.password);
      const user = userCredential.user;
      console.log("User registered:", user);
  
      // Store User Info in Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        coupleEmail: formValues.coupleEmail, // Storing couple's email
        gender: formValues.gender,
        country: formValues.country,
        phone: formValues.phone,
        password: formValues.password, // Consider removing this for security
        userId: user.uid,
        profileImage: "https://randomuser.me/api/portraits/men/75.jpg",
        username: `${formValues.firstName} ${formValues.lastName}`,
        totalBalance: 0,
        walletBalance: 0,
        investmentBalance: 0,
      });
  
      // Create Wallet Entry for the User
      const walletRef = doc(db, "wallets", user.uid);
      await setDoc(walletRef, {
        BTC: { balance: 0, balanceUSD: 0 },
        ETH: { balance: 0, balanceUSD: 0 },
        BNB: { balance: 0, balanceUSD: 0 },
        DOGE: { balance: 0, balanceUSD: 0 },
        LTC: { balance: 0, balanceUSD: 0 },
        USDT: { balance: 0, balanceUSD: 0 },
      });
  
      console.log("User information & wallet stored in Firestore");

      // Send confirmation email to both the user's email and couple's email
      await fetch("http://localhost:5000/api/sendConfirmationEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formValues.email,
          coupleEmail: formValues.coupleEmail,
          password: formValues.password,
        }),
      });
      
      alert("Registration Successful! Confirmation email sent.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false);
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
            placeholder="Your Email"
            className="form-input"
            value={formValues.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="coupleEmail"
            placeholder="Couple's Email"
            className="form-input"
            value={formValues.coupleEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <select
            name="gender"
            className="form-input"
            value={formValues.gender}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled hidden>Select Gender</option>
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
              <option key={index} value={country}>{country}</option>
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
        {/* Password Fields */}
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

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="texting">Already have an account? <NavLink to="/login" className="login-link">Login</NavLink></p>
      </form>
    </div>
  );
};

export default RegisterPage;
