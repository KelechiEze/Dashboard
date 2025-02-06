import { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../firebase"; // Import Firestore instance
import "./Dashboard.css";
import { FiBell } from "react-icons/fi";
import TransactionHistory from "./TransactionHistory";
import Sidebar from "./SideBar"; // Import Sidebar Component

// Import Crypto Icons
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiBinance, SiDogecoin } from "react-icons/si";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    todays_fee: "0.00000000",
    total_fee: "0.00000000",
    total_users: "0",
  });

  // Crypto Balance Data (Dummy Values)
  const cryptoBalances = [
    { name: "Bitcoin", balance: "$168,331.09", icon: <FaBitcoin size={30} color="#F7931A" />, growth: "+45%" },
    { name: "Ethereum", balance: "$12,098", icon: <FaEthereum size={30} color="#00D4D5" />, growth: "+45%" },
    { name: "BNB", balance: "$67,224", icon: <SiBinance size={30} color="#F0B90B" />, growth: "-48%" },
    { name: "Dogecoin", balance: "$8,783.33", icon: <SiDogecoin size={30} color="#C2A633" />, growth: "+45%" },
  ];

  // Fetch Dashboard Data from Firestore
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const docRef = doc(db, "dashboard", "stats"); // Reference the 'stats' document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDashboardData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
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

        {/* Welcome Message */}
        <h1 className="welcome-message">Welcome to PayCoin Dashboard</h1>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Balance Cards */}
          <div className="stats-grid">
            <div className="stats-card blue">
              <h4>Total Balance</h4>
              <h1>$256,436.00</h1>
            </div>
            <div className="stats-card green">
              <h4>Wallet Balance</h4>
              <h1>$252,080.00</h1>
            </div>
            <div className="stats-card red">
              <h4>Investment Balance</h4>
              <h1>$4,356.67</h1>
            </div>
          </div>

         <TransactionHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
