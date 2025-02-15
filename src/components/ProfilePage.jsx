import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./ProfilePage.css";
import { FaPhone, FaEnvelope, FaFacebookF } from "react-icons/fa";
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

  // Fetch user data from Firestore
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
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

      // Update Firestore
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
          <img src={userData.profileImage} alt="Profile" className="profile-img clickable" />
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
          <p className="join-date">Joined on 24 March 2017</p>
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
