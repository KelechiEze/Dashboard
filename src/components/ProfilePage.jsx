import React from "react";
import "./ProfilePage.css";
import { FaPhone, FaEnvelope, FaFacebookF } from "react-icons/fa";
import { FaBitcoin, FaEthereum } from "react-icons/fa"; // Crypto Icons
import { SiRipple, SiLitecoin } from "react-icons/si";  // More Crypto Icons

const ProfilePage = () => {
  return (
    <div className="settings-container">
      {/* Profile Section */}
      <div className="profile-header">
        <div className="profile-text">
          <h3>My Profile</h3>
          <p>Edit your profile</p>
        </div>
        <div className="profile-options">⋮</div>
      </div>

      <div className="profile-card">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="User Profile"
          className="profile-img"
        />
        <div className="profile-info">
          <h2>Thomas Aldox</h2>
          <p className="username">@thomasdox</p>
          <p className="join-date">Join on 24 March 2017</p>
          <div className="contact-icons">
            <FaPhone className="icon" />
            <FaEnvelope className="icon" />
            <FaFacebookF className="icon" />
          </div>
        </div>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      {/* Coin Holding Section */}
      <div className="coin-holding">
        <h3>Coin Holding</h3>
        <div className="coins">
          <div className="coin-card btc">
            <FaBitcoin className="crypto-icon" />
            <h2>$65,123</h2>
            <p>BTC</p>
          </div>
          <div className="coin-card eth">
            <FaEthereum className="crypto-icon" />
            <h2>$2,551</h2>
            <p>ETH</p>
          </div>
          <div className="coin-card rpl">
            <SiRipple className="crypto-icon" />
            <h2>$0,55</h2>
            <p>USDT</p>
          </div>
          <div className="coin-card ltc">
            <SiLitecoin className="crypto-icon" />
            <h2>$65,123</h2>
            <p>LTC</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
