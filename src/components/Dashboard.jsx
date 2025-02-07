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

  const toggleBalanceVisibility = (key) => {
    if (!isBalanceVisible[key]) {
      let count = 0;
      const target = balances[key];
      const increment = target / 100; // Adjust this for slower/faster speed

      const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        setDisplayedBalance((prev) => ({ ...prev, [key]: count }));
      }, 50); // Adjust this for slower/faster speed (higher value = slower)

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

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <div className="topbar">
          <div className="topbar-icons">
            <FiBell size={20} className="icon" />
            <div className="user-profile">
              <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" className="iko" />
              <span className="spol">Viral B. Baker</span>
            </div>
          </div>
        </div>

        <h1 className="welcome-message">Welcome to PayCoin Dashboard</h1>

        <div className="dashboard-content">
          <div className="stats-grid">
            {/* Total Balance */}
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

            {/* Wallet Balance */}
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

            {/* Investment Balance */}
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

          <div className="coin-holding">
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
                <h2>$0.55</h2>
                <p>USDT</p>
              </div>
              <div className="coin-card ltc">
                <SiLitecoin className="crypto-icon" />
                <h2>$65,123</h2>
                <p>LTC</p>
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
