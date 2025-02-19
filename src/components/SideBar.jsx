import { useState } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { FiSettings, FiUser, FiChevronDown, FiMenu } from "react-icons/fi";
import { RiWallet3Line } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import logo from "../assets/logo2.png";

const Sidebar = () => {
  const [walletDropdown, setWalletDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Hamburger Icon */}
      <button className="hamburger-icon" onClick={toggleSidebar}>
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
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
            <button
              onClick={() => setWalletDropdown(!walletDropdown)}
              className="dropdown-btn"
            >
              <span className="dropdown-title">
                <RiWallet3Line size={20} />
                <span>My Wallet</span>
              </span>
              <FiChevronDown />
            </button>
            {walletDropdown && (
              <div className="dropdown-menu">
                <Link to="/dashboard/UserWallet">User Wallet</Link>
              </div>
            )}
          </div>

          <Link to="/dashboard/profile" className="nav-item">
            <FiUser size={20} />
            <span>Profile</span>
          </Link>
        </nav>
      </div>

      {/* Overlay for closing sidebar when clicking outside */}
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
