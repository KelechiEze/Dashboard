import { useState, useEffect } from "react";
import "./Dashboard.css";
import { FiBell } from "react-icons/fi";
import { FaEye, FaEyeSlash, FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiRipple, SiLitecoin } from "react-icons/si";
import TransactionHistory from "./TransactionHistory";
import Sidebar from "./SideBar";

const Dashboard = () => {
  const balances = {
    totalBalance: 446685.0,
    walletBalance: 252080.0,
    investmentBalance: 4356.67,
  };

  const [displayedBalance, setDisplayedBalance] = useState({
    totalBalance: 0,
    walletBalance: 0,
    investmentBalance: 0,
  });

  const [isBalanceVisible, setIsBalanceVisible] = useState({
    totalBalance: false,
    walletBalance: false,
    investmentBalance: false,
  });

  const [userImage, setUserImage] = useState(
    localStorage.getItem("userImage") || "https://randomuser.me/api/portraits/men/75.jpg"
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "Viral B. Baker");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("userImage", userImage);
    localStorage.setItem("userName", userName);
  }, [userImage, userName]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleBalanceVisibility = (key) => {
    if (!isBalanceVisible[key]) {
      let count = 0;
      const target = balances[key];
      const increment = target / 100;

      const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        setDisplayedBalance((prev) => ({ ...prev, [key]: count }));
      }, 50);

      setIsBalanceVisible((prevState) => ({
        ...prevState,
        [key]: true,
      }));
    } else {
      setIsBalanceVisible((prevState) => ({
        ...prevState,
        [key]: false,
      }));
      setDisplayedBalance((prev) => ({ ...prev, [key]: 0 }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear user session data
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <div className="topbar">
          <div className="topbar-icons">
            <FiBell size={20} className="icon" />
            <div className="user-profile">
              <label htmlFor="imageUpload">
                <img src={userImage} alt="User" className="iko clickable" />
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <input
                type="text"
                className="username-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>

          {/* Logout Button */}
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            Logout
          </button>
        </div>

        <h1 className="welcome-message">Welcome to PayCoin Dashboard</h1>

        {/* Logout Confirmation Modal with Overlay */}
{showLogoutModal && (
  <div className="logout-overlay">
    <div className="logout-modal">
      <div className="logout-content">
        <h3>Are you sure you want to logout?</h3>
        <div className="logout-actions">
          <button className="confirm-logout" onClick={handleLogout}>Yes</button>
          <button className="cancel-logout" onClick={() => setShowLogoutModal(false)}>No</button>
        </div>
      </div>
    </div>
  </div>
)}


        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stats-card blue">
              <h4>Total Balance</h4>
              <div className="balance-container">
                <h1>
                  {isBalanceVisible.totalBalance
                    ? `$${displayedBalance.totalBalance.toFixed(2)}`
                    : "****"}
                </h1>
                <button className="eye-icon" onClick={() => toggleBalanceVisibility("totalBalance")}>
                  {isBalanceVisible.totalBalance ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                </button>
              </div>
            </div>

            <div className="stats-card green">
              <h4>Wallet Balance</h4>
              <div className="balance-container">
                <h1>
                  {isBalanceVisible.walletBalance
                    ? `$${displayedBalance.walletBalance.toFixed(2)}`
                    : "****"}
                </h1>
                <button className="eye-icon" onClick={() => toggleBalanceVisibility("walletBalance")}>
                  {isBalanceVisible.walletBalance ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                </button>
              </div>
            </div>

            <div className="stats-card red">
              <h4>Investment Balance</h4>
              <div className="balance-container">
                <h1>
                  {isBalanceVisible.investmentBalance
                    ? `$${displayedBalance.investmentBalance.toFixed(2)}`
                    : "****"}
                </h1>
                <button className="eye-icon" onClick={() => toggleBalanceVisibility("investmentBalance")}>
                  {isBalanceVisible.investmentBalance ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                </button>
              </div>
            </div>
          </div>

          <TransactionHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
