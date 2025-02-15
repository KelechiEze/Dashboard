import React from "react";
import "./UserWallet.css";
import Sidebar from "./SideBar";
import WalletList from "./WalletList";
import TransactionHistory from "./TransactionHistory";

// Import Crypto Icons
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiBinance } from "react-icons/si";

const UserWallet = () => {
  // Crypto Balance Data (Dummy Values)
  const cryptoBalances = [
    { name: "Bitcoin", balance: "$168,331.09", icon: <FaBitcoin size={30} color="#F7931A" />, growth: "+25%" },
    { name: "Ethereum", balance: "$12,098", icon: <FaEthereum size={30} color="#00D4D5" />, growth: "+13%" },
    { name: "BNB", balance: "$67,224", icon: <SiBinance size={30} color="#F0B90B" />, growth: "-28%" },
  ];

  return (
    <div className="userwallet-container">
      {/* Sidebar Component */}
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>

      {/* Wallet List */}
      <div className="wallet-list-wrapper">
        <WalletList />
      </div>

      {/* Transaction History (Wrapped in a div for styling) */}
      <div className="transaction-wrapper">
        <TransactionHistory fullWidth={true} />
      </div>
    </div>
  );
};

export default UserWallet;
