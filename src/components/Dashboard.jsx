import { useState, useEffect } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { FiSettings, FiUser, FiBell, FiChevronDown } from "react-icons/fi";
import { RiWallet3Line } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import logo from "../assets/logo2.png";

const Dashboard = () => {
  const [walletDropdown, setWalletDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Dashboard Data from API
  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dashboard");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setDashboardData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch data every 5 seconds for real-time updates
  useEffect(() => {
    fetchDashboardData(); // Fetch data when the component mounts
    const interval = setInterval(fetchDashboardData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="cPocket Logo" className="logo" />
        </div>

        {/* Sidebar Links */}
        <nav className="nav-links">
          <Link to="" className="nav-item">
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
                <Link to="/wallet/user-wallet">User Wallet</Link>
                <Link to="/wallet/pending">Pending Transactions</Link>
                <Link to="/wallet/all">All Transactions</Link>
              </div>
            )}
          </div>

          <Link to="/profile" className="nav-item">
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
              <FiChevronDown />
            </button>
            {userDropdown && (
              <div className="dropdown-menu">
                <Link to="/users/manage">Manage Users</Link>
              </div>
            )}
          </div>

          <Link to="/settings" className="nav-item">
            <FiSettings size={20} />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="topbar">
          <h2>Dashboard</h2>
          <div className="topbar-icons">
            <FiBell size={20} className="icon" />
            <div className="user-profile">
              <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" className="iko" />
              <span className="spol">Viral B. Baker</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {loading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : (
            <div className="stats-grid">
              <div className="stats-card blue">
                <h4>Today's Fee</h4>
                <p>{dashboardData.todays_fee || "0.00000000"}</p>
              </div>
              <div className="stats-card green">
                <h4>Total Fee</h4>
                <p>{dashboardData.total_fee || "0.00000000"}</p>
              </div>
              <div className="stats-card red">
                <h4>Total Users</h4>
                <p>{dashboardData.total_users || "0"}</p>
              </div>
            </div>
          )}

          {/* Graph Placeholder */}
          <div className="graph-placeholder">
            <p>User Analytics Graph</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
