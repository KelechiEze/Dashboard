import { useState } from "react";
import "./UserWallet.css";
import Sidebar from "./SideBar";
import WalletList from "./WalletList"; 

// Import Crypto Icons
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiBinance, SiDogecoin } from "react-icons/si";

const UserWallet = () => {

  // Crypto Balance Data (Dummy Values)
  const cryptoBalances = [
    { name: "Bitcoin", balance: "$168,331.09", icon: <FaBitcoin size={30} color="#F7931A" />, growth: "+25%" },
    { name: "Ethereum", balance: "$12,098", icon: <FaEthereum size={30} color="#00D4D5" />, growth: "+13%" },
    { name: "BNB", balance: "$67,224", icon: <SiBinance size={30} color="#F0B90B" />, growth: "-28%" },
    { name: "Dogecoin", balance: "$8,783.33", icon: <SiDogecoin size={30} color="#C2A633" />, growth: "+4%" },
  ];

  return (
    <div className="userwallet-container">
      <Sidebar /> {/* Sidebar Component */}
      <WalletList />
    
      {/* Crypto Balance Cards */}
      <div className="userwallet-crypto-grid">
        {cryptoBalances.map((crypto, index) => (
          <div key={index} className="userwallet-crypto-card">
            <div className="userwallet-crypto-icon">{crypto.icon}</div>
            <h3>{crypto.balance}</h3>
            <p className={`userwallet-growth ${crypto.growth.startsWith("+") ? "userwallet-positive" : "userwallet-negative"}`}>
              {crypto.growth} This week
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserWallet;
