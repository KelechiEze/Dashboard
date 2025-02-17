import React, { useState } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiLitecoin, SiRipple } from "react-icons/si";
import { FiCopy } from "react-icons/fi";
import WithdrawModal from "./WithdrawModal"; // Import WithdrawModal
import DepositModal from "./DepositModal"; // Import DepositModal
import "./WalletCard.css";

const WalletCard = ({ crypto }) => {
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);

  // Function to copy wallet address
  const copyToClipboard = () => {
    navigator.clipboard.writeText(crypto.address);
    alert("Wallet address copied!"); // Optional feedback
  };

  return (
    <div className="wallet-card">
      {/* Wallet Header */}
      <div className="wallet-header">
        <h3>{crypto.name} Wallet</h3>
      </div>

      {/* Crypto Logo */}
      <div className="wallet-icon">{crypto.icon}</div>

      {/* Crypto Name */}
      <h4 className="crypto-name">{crypto.name}</h4>

      {/* Wallet Address */}
      <div className="wallet-address">
        <span className="crypto-symbol">{crypto.shortSymbol}</span>
        <input type="text" value={crypto.address} readOnly />
        <button className="copy-btn" onClick={copyToClipboard}>
          <FiCopy size={18} />
        </button>
      </div>

      {/* Conversion Rate */}
      <p className="conversion-rate">1 {crypto.shortSymbol} = {crypto.rate} USD</p>

      {/* Balance */}
      <div className="balance-section">
        <p className="crypto-balance">
          Balance: <span>{crypto.balance} {crypto.shortSymbol}</span>
        </p>
        <p className="usd-balance">
          Balance in USD: <span>{crypto.balanceUSD}</span>
        </p>
      </div>

      {/* Withdraw & Deposit Buttons */}
      <div className="wallet-actions">
        <button className="deposit-btn" onClick={() => setDepositModalOpen(true)}>
          Deposit
        </button>
      </div>

      {/* Modals */}
      <DepositModal crypto={crypto} isOpen={isDepositModalOpen} onClose={() => setDepositModalOpen(false)} />
      <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setWithdrawModalOpen(false)} />
    </div>
  );
};

export default WalletCard;
