import { useState } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { FiSettings, FiUser, FiChevronDown } from "react-icons/fi";
import { RiWallet3Line } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import logo from "../assets/logo2.png";

const Sidebar = () => {
  const [walletDropdown, setWalletDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="cPocket Logo" className="logo" />
      </div>

      <nav className="nav-links">
        <Link to="/dashboard" className="nav-item">
          <MdDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        {/* Wallet Dropdown */}
        <div className="dropdown">
          <button onClick={() => setWalletDropdown(!walletDropdown)} className="dropdown-btn">
            <span className="dropdown-title">
              <RiWallet3Line size={20} />
              <span>My Wallet</span>
            </span>
            <FiChevronDown />
          </button>
          {walletDropdown && (
            <div className="dropdown-menu">
              <Link to="/dashboard/UserWallet">User Wallet</Link>
              <Link to="/dashboard/wallet/pending">Pending Transactions</Link>
              <Link to="/dashboard/wallet/all">All Transactions</Link>
            </div>
          )}
        </div>

        <Link to="/dashboard/profile" className="nav-item">
          <FiUser size={20} />
          <span>Profile</span>
        </Link>

        {/* User Management Dropdown */}
        <div className="dropdown">
          <button onClick={() => setUserDropdown(!userDropdown)} className="dropdown-btn">
            <span className="dropdown-title">
              <FiUser size={20} />
              <span>User Management</span>
            </span>
            <FiChevronDown className={`dropdown-icon ${userDropdown ? "open" : ""}`} />
          </button>
          {userDropdown && (
            <div className="dropdown-menu">
              <Link to="/dashboard/users/manage" className="dropdown-link">
                Manage Users
              </Link>
            </div>
          )}
        </div>

        <Link to="/dashboard/settings" className="nav-item">
          <FiSettings size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
