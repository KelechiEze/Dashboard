import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./ProfilePage.css";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiRipple, SiLitecoin } from "react-icons/si";

const ProfilePage = () => {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const user = auth.currentUser;

  const [userData, setUserData] = useState({
    firstName: "User",
    email: user ? user.email : "email@example.com",
    profileImage: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  });

  const [cryptoBalances, setCryptoBalances] = useState({
    BTC: 0,
    ETH: 0,
    USDT: 0,
    LTC: 0,
  });

  // Fetch user data from Firestore
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        // Get user data
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData({
            firstName: data.firstName || "User",
            email: user.email,
            profileImage: data.profileImage || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
          });
        }

        // Get wallet balances
        const walletRef = doc(db, "wallets", user.uid);
        const walletSnap = await getDoc(walletRef);

        if (walletSnap.exists()) {
          const walletData = walletSnap.data();

          // Update crypto balances (fallback to 0 if not present)
          setCryptoBalances({
            BTC: walletData.BTC?.balance || 0,
            ETH: walletData.ETH?.balance || 0,
            USDT: walletData.USDT?.balance || 0,
            LTC: walletData.LTC?.balance || 0,
          });
        }
      };

      fetchUserData();
    }
  }, [user, db]);

  // Handle Profile Image Upload
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file && user) {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      setUserData((prev) => ({ ...prev, profileImage: downloadURL }));

      // Update Firestore with the new profile image URL
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { profileImage: downloadURL });
    }
  };

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
        <label htmlFor="imageUpload">
          <img
            src={userData.profileImage}
            alt="Profile"
            className="profile-img clickable"
          />
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        <div className="profile-info">
          <h2>{userData.firstName}</h2>
          <p className="username">@{userData.email}</p>
        </div>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      {/* Coin Holding Section */}
      <div className="coin-holding">
        <h3>Coin Holding</h3>
        <div className="coins">
          <div className="coin-card btc">
            <FaBitcoin className="crypto-icon" />
            <h2>{cryptoBalances.BTC}</h2>
            <p>BTC</p>
          </div>
          <div className="coin-card eth">
            <FaEthereum className="crypto-icon" />
            <h2>{cryptoBalances.ETH}</h2>
            <p>ETH</p>
          </div>
          <div className="coin-card rpl">
            <SiRipple className="crypto-icon" />
            <h2>{cryptoBalances.USDT}</h2>
            <p>USDT</p>
          </div>
          <div className="coin-card ltc">
            <SiLitecoin className="crypto-icon" />
            <h2>{cryptoBalances.LTC}</h2>
            <p>LTC</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
