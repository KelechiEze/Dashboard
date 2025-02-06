import React from "react";
import { FiCopy } from "react-icons/fi";
import "./DepositModal.css";

const DepositModal = ({ crypto, isOpen, onClose }) => {
  if (!isOpen || !crypto) return null;

  // Function to copy address to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(crypto.address);
    alert("Wallet address copied!"); // Optional: Add better UI feedback
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <h3>Receive {crypto.name}</h3>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {/* Warning Message */}
        <p className="warning">
          ⚠️ Send only {crypto.name} ({crypto.shortSymbol}) to this address.
          Sending any other coins may result in loss.
        </p>

        {/* QR Code (Placeholder for now) */}
        <div className="qr-code">
          <img src="/qr-placeholder.png" alt="QR Code" />
        </div>

        {/* Wallet Address */}
        <div className="wallet-address-box">
          <input type="text" value={crypto.address} readOnly />
          <button className="copy-btn" onClick={copyToClipboard}>
            <FiCopy size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
