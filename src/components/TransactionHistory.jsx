import React from "react";
import "./TransactionHistory.css";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FaBitcoin } from "react-icons/fa"; // Import Bitcoin Icon

const TransactionHistory = () => {
  const transactions = [
    { type: "Topup", time: "06:24:45 AM", amount: "+$5,553", status: "Completed", icon: <FaArrowUp />, color: "green" },
    { type: "Withdraw", time: "06:24:45 AM", amount: "-$542", status: "Completed", icon: <FaArrowDown />, color: "green" },
    { type: "Withdraw", time: "06:24:45 AM", amount: "-$912", status: "Completed", icon: <FaArrowDown />, color: "green" },
    { type: "Topup", time: "06:24:45 AM", amount: "+$7,762", status: "Completed", icon: <FaArrowUp />, color: "green" },
    { type: "Topup", time: "06:24:45 AM", amount: "+$5,553", status: "Completed", icon: <FaArrowUp />, color: "green" },
    { type: "Withdraw", time: "06:24:45 AM", amount: "-$912", status: "Completed", icon: <FaArrowDown />, color: "green" },
  ];

  return (
    <div className="transaction-container">
      {/* Updated Transaction Header with Flexbox */}
      <div className="transaction-header">
        <div className="transaction-text">
          <h2>Transaction History</h2>
          <p>Your recent transactions</p>
        </div>
        <div className="filter-buttons">
          <button className="filter-btn active">Today</button>
          <button className="filter-btn">Weekly</button>
          <button className="filter-btn">Monthly</button>
        </div>
      </div>

      <div className="transaction-list">
        {transactions.map((txn, index) => (
          <div key={index} className="transaction-item">
            <div className="icon">{txn.icon}</div>
            <span className="txn-type">{txn.type}</span>
            <span className="txn-time">{txn.time}</span>
            {/* Amount with Bitcoin Icon */}
            <div className="txn-amount">
              <FaBitcoin className="btc-icon" /> {txn.amount}
            </div>
            <span className={`txn-status ${txn.color}`}>{txn.status}</span>
          </div>
        ))}
      </div>

      <button className="expand-btn">▼</button>
    </div>
  );
};

export default TransactionHistory;
