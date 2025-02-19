import React, { useState, useEffect } from "react";
import "./TransactionHistory.css";
import { FaArrowDown, FaArrowUp, FaBitcoin } from "react-icons/fa";
import { auth, db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const TransactionHistory = ({ fullWidth }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Reference to the transactions collection
    const transactionsRef = collection(db, "transactions");

    // Query to get transactions for the logged-in user
    const q = query(transactionsRef, where("userId", "==", user.uid));

    // Real-time listener for transactions
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txnList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort transactions by time (latest first)
      txnList.sort((a, b) => b.time.toMillis() - a.time.toMillis());
      setTransactions(txnList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className={`transaction-container ${fullWidth ? "full-width" : ""}`}>
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

      {/* Loading State */}
      {loading ? (
        <p className="loading-text">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="no-transactions">No transactions yet.</p>
      ) : (
        <div className="transaction-list">
          {transactions.map((txn) => (
            <div key={txn.id} className="transaction-item">
              {/* Transaction Type Icon */}
              <div className="icon">
                {txn.type === "Deposit" ? (
                  <FaArrowUp color="green" />
                ) : (
                  <FaArrowDown color="red" />
                )}
              </div>

              {/* Transaction Type */}
              <span className="txn-type">{txn.type}</span>

              {/* Transaction Time */}
              <span className="txn-time">
                {txn.time?.toMillis
                  ? new Date(txn.time.toMillis()).toLocaleString()
                  : "N/A"}
              </span>

              {/* Transaction Amount */}
              <div className="txn-amount">
                <FaBitcoin className="btc-icon" /> {txn.amount}
              </div>

              {/* Transaction Status */}
              <span
                className={`txn-status ${
                  txn.status === "Completed"
                    ? "green"
                    : txn.status === "Pending"
                    ? "gray"
                    : "red"
                }`}
              >
                {txn.status}
              </span>
            </div>
          ))}
        </div>
      )}

      <button className="expand-btn">▼</button>
    </div>
  );
};

export default TransactionHistory;
