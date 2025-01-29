import { useState, useEffect } from "react";
import "./Dashboard.css";
import { FiBell } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "./SideBar"; // Import Sidebar Component

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const data = [
    { date: "Feb '12", value: 10 },
    { date: "Mar '12", value: 20 },
    { date: "Apr '12", value: 50 },
    { date: "May '12", value: 10 },
    { date: "Jun '12", value: 70 },
    { date: "Jul '12", value: 90 },
    { date: "Aug '12", value: 85 },
  ];

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dashboard");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setDashboardData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar /> {/* Sidebar Component */}

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

          {/* Graph */}
          <div className="graph-container">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#665af0" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#665af0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#a0a0a0" />
                <YAxis stroke="#a0a0a0" />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#665af0" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
