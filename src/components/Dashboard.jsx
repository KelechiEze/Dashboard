import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { FiBell } from "react-icons/fi";
import { FaEye, FaEyeSlash, FaWallet } from "react-icons/fa";
import BankDashboard from "./BankDashboard";
import Sidebar from "./SideBar";
import "./Dashboard.css";

const Dashboard = () => {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  const [userData, setUserData] = useState({
    profileImage: "",
    username: "User",
    totalBalance: 0,
    walletBalance: 0,
    investmentBalance: 0,
  });

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

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const defaultProfileImage =
       "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";


  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      };
      fetchUserData();
    }
  }, [userId, db]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const newImage = e.target.result;
        setUserData((prev) => ({ ...prev, profileImage: newImage }));

        if (userId) {
          const userRef = doc(db, "users", userId);
          await updateDoc(userRef, { profileImage: newImage });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameChange = async (e) => {
    const newUsername = e.target.value;
    setUserData((prev) => ({ ...prev, username: newUsername }));

    if (userId) {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { username: newUsername });
    }
  };

  const toggleBalanceVisibility = (key) => {
    if (!isBalanceVisible[key]) {
      let count = 0;
      const target = userData[key];
      const increment = target / 100;

      const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        setDisplayedBalance((prev) => ({ ...prev, [key]: count }));
      }, 50);

      setIsBalanceVisible((prevState) => ({ ...prevState, [key]: true }));
    } else {
      setIsBalanceVisible((prevState) => ({ ...prevState, [key]: false }));
      setDisplayedBalance((prev) => ({ ...prev, [key]: 0 }));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
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
                <img
                  src={userData.profileImage || defaultProfileImage}
                  alt="User"
                  className="iko clickable"
                />
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
                value={userData.username}
                onChange={handleUsernameChange}
              />
            </div>
          </div>

          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            Logout
          </button>
        </div>

        <h1 className="welcome-message">Welcome to PayCoin Dashboard</h1>

        {showLogoutModal && (
          <div className="logout-overlay">
            <div className="logout-modal">
              <div className="logout-content">
                <h3>Are you sure you want to logout?</h3>
                <div className="logout-actions">
                  <button className="confirm-logout" onClick={handleLogout}>
                    Yes
                  </button>
                  <button className="cancel-logout" onClick={() => setShowLogoutModal(false)}>
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="dashboard-content">
          <div className="stats-grid">
            {["totalBalance", "walletBalance", "investmentBalance"].map((key) => (
              <div key={key} className="stats-card">
                <h4>{key.replace("Balance", " Balance")}</h4>
                <div className="balance-container">
                  <h1>
                    {isBalanceVisible[key]
                      ? `$${displayedBalance[key]
                          .toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                      : "****"}
                  </h1>
                  <button className="eye-icon" onClick={() => toggleBalanceVisibility(key)}>
                    {isBalanceVisible[key] ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                  </button>
                </div>

                {/* Withdraw Button */}
                <Link to="/dashboard/UserWallet" className="withdraw-button">
                  <FaWallet className="wallet-icon" /> Withdraw
                </Link>
              </div>
            ))}
          </div>

          <BankDashboard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
