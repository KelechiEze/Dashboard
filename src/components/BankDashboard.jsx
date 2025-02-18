import React from "react";
import { FaWallet } from "react-icons/fa"; // Importing wallet icon
import { Link } from "react-router-dom"; // Importing Link for navigation
import "./BankDashboard.css";

const BankDashboard = () => {
  return (
    <div className="banking-container">
      <h2 className="title">Your Card</h2>

      <div className="dashboard">
        {/* Credit Card Section */}
        <div className="card-container">
          <div className="card-shadow"></div>
          <div className="card-shadow second"></div>
          <div className="bank-card">
            <div className="chip-icon">💳</div>
            <div className="card-number">1234 5678 9012 3456</div>
            <div className="card-details">
              <div>
                <span className="label">Card Holder</span>
                <span className="value">Nella Vita</span>
              </div>
              <div>
                <span className="label">Valid Thru</span>
                <span className="value">03/21</span>
              </div>
            </div>
            <div className="card-logo">
              <span className="circle red"></span>
              <span className="circle yellow"></span>
            </div>
          </div>
        </div>

        {/* Withdraw Button Section */}
        <Link to="/dashboard/UserWallet" className="withdraw-button">
          <FaWallet className="wallet-icon" /> Withdraw
        </Link>
      </div>
    </div>
  );
};

export default BankDashboard;
