import React from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiLitecoin, SiRipple } from "react-icons/si";
import { FiCopy } from "react-icons/fi";
import "./WalletCard.css";

const WalletCard = ({ crypto }) => {
  return (
    <div className="wallet-card">
        <h1>My Wallet</h1>
      {/* Wallet Header */}
      <div className="wallet-header">
        <h3>{crypto.name} wallet</h3>
      </div>

      {/* Crypto Logo */}
      <div className="wallet-icon">{crypto.icon}</div>

      {/* Crypto Name */}
      <h4 className="crypto-name">{crypto.name}</h4>

      {/* Wallet Address */}
      <div className="wallet-address">
        <span className="crypto-symbol">{crypto.shortSymbol}</span>
        <input type="text" value={crypto.address} readOnly />
        <button className="copy-btn">
          <FiCopy size={18} />
        </button>
      </div>

      {/* Conversion Rate */}
      <p className="conversion-rate">1 {crypto.shortSymbol} = {crypto.rate} USD</p>

      {/* Selling & Buying Amount */}
      <p className="selling-buying">
        Total selling amount <span>{crypto.sellingAmount} $</span>
      </p>
      <p className="selling-buying">
        Total buying buy <span>{crypto.buyingAmount} $</span>
      </p>

      {/* Balance */}
      <div className="balance-section">
        <p className="crypto-balance">
          Balance: <span>{crypto.balance} {crypto.shortSymbol}</span>
        </p>
        <p className="usd-balance">
          Balance in USD: <span>{crypto.balanceUSD} USD</span>
        </p>
      </div>

      {/* Withdraw & Deposit Buttons */}
      <div className="wallet-actions">
        <button className="withdraw-btn">Withdraw</button>
        <button className="deposit-btn">Deposit</button>
      </div>
    </div>
  );
};

export default WalletCard;
