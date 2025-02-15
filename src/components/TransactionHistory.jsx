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

    const transactionsRef = collection(db, "transactions");
    const q = query(transactionsRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txnList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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

      {loading ? (
        <p className="loading-text">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="no-transactions">No transactions yet.</p>
      ) : (
        <div className="transaction-list">
          {transactions.map((txn) => (
            <div key={txn.id} className="transaction-item">
              <div className="icon">
                {txn.type === "Deposit" ? (
                  <FaArrowUp color="green" />
                ) : (
                  <FaArrowDown color="red" />
                )}
              </div>
              <span className="txn-type">{txn.type}</span>
              <span className="txn-time">{txn.time}</span>
              <div className="txn-amount">
                <FaBitcoin className="btc-icon" /> {txn.amount}
              </div>
              <span className={`txn-status ${txn.status.toLowerCase()}`}>{txn.status}</span>
            </div>
          ))}
        </div>
      )}

      <button className="expand-btn">▼</button>
    </div>
  );
};

export default TransactionHistory;
