import React, { useState } from "react";
import { FaTimes, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import "./WithdrawModal.css";

const WithdrawModal = ({ isOpen, onClose, wallets, setWallets }) => {
  const [selectedToken, setSelectedToken] = useState(null);
  const [usdAmount, setUsdAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  // Convert USD to Crypto
  const handleUsdChange = (e) => {
    const usdValue = e.target.value;
    setUsdAmount(usdValue);

    if (selectedToken && selectedToken.rate) {
      const rate = parseFloat(selectedToken.rate.replace(/,/g, ""));
      if (!isNaN(rate) && rate > 0) {
        const cryptoValue = usdValue / rate;
        setCryptoAmount(cryptoValue.toFixed(8));
      }
    }
  };

  // Convert Crypto to USD
  const handleCryptoChange = (e) => {
    const cryptoValue = e.target.value;
    setCryptoAmount(cryptoValue);

    if (selectedToken && selectedToken.rate) {
      const rate = parseFloat(selectedToken.rate.replace(/,/g, ""));
      if (!isNaN(rate) && rate > 0) {
        const usdValue = cryptoValue * rate;
        setUsdAmount(usdValue.toFixed(2));
      }
    }
  };

  // Handle MAX button
  const handleMaxClick = () => {
    if (selectedToken) {
      setCryptoAmount(selectedToken.balance);
      const rate = parseFloat(selectedToken.rate.replace(/,/g, ""));
      setUsdAmount((selectedToken.balance * rate).toFixed(2));
    }
  };

  // Handle Withdraw Click
  const handleWithdraw = () => {
    const withdrawCrypto = parseFloat(cryptoAmount);
    const withdrawUSD = parseFloat(usdAmount);

    if (withdrawCrypto > selectedToken.balance) {
      setErrorMessage("You do not have enough balance.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      // Deduct balance from selected token
      setWallets((prevWallets) =>
        prevWallets.map((wallet) =>
          wallet.name === selectedToken.name
            ? {
                ...wallet,
                balance: wallet.balance - withdrawCrypto,
                balanceUSD: wallet.balanceUSD - withdrawUSD,
              }
            : wallet
        )
      );

      setTimeout(() => {
        setIsSuccess(false);
        setSelectedToken(null);
        setUsdAmount("");
        setCryptoAmount("");
        onClose();
      }, 2000);
    }, 4000);
  };

  return (
    <div className="modal-overlay">
      <div className="withdraw-modal">
        {/* Header */}
        <div className="modal-header">
          {selectedToken ? (
            <>
              <button className="back-btn" onClick={() => setSelectedToken(null)}>
                <FaArrowLeft size={18} />
              </button>
              <h3>Withdraw {selectedToken.name}</h3>
            </>
          ) : (
            <h3>Select Token To Withdraw</h3>
          )}
          <button className="close-btn" onClick={onClose}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* Success Message */}
        {isSuccess ? (
          <div className="success-message">
            <FaCheckCircle size={50} color="green" />
            <h3>Transaction Successful!</h3>
          </div>
        ) : (
          <>
            {/* Token Selection Screen */}
            {!selectedToken ? (
              <div className="token-list">
                {wallets.map((wallet, index) => (
                  <div className="token-item67" key={index} onClick={() => setSelectedToken(wallet)}>
                    {wallet.icon}
                    <div className="token-info7">
                      <span className="token-name3">{wallet.name} ({wallet.shortSymbol})</span>
                      <span className="token-balance9">Balance: {wallet.balance} {wallet.shortSymbol}</span>
                      <span className="usd-balance">${wallet.balanceUSD.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="send-crypto-screen">
                <div className="crypto-icon">{selectedToken.icon}</div>
                <p className="network-text">on {selectedToken.name} Network</p>

                {/* Recipient Address Input */}
                <div className="input-field">
                  <label>Recipient Address</label>
                  <input type="text" placeholder="Type or paste a valid address" />
                </div>

                {/* USD Amount Input */}
                <div className="input-field">
                  <label>Amount in USD ($)</label>
                  <input
                    type="number"
                    placeholder="Enter amount in USD"
                    value={usdAmount}
                    onChange={handleUsdChange}
                  />
                </div>

                {/* Crypto Amount Input */}
                <div className="input-field">
                  <label>Amount in {selectedToken.shortSymbol}</label>
                  <div className="amount-input">
                    <input
                      type="number"
                      placeholder="Crypto amount"
                      value={cryptoAmount}
                      onChange={handleCryptoChange}
                    />
                    <span className="max-btn" onClick={handleMaxClick}>MAX</span>
                  </div>
                  <p className="balance-text">Balance: {selectedToken.balance} {selectedToken.shortSymbol}</p>
                </div>

                {/* Error Message */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {/* Withdraw Button */}
                <button className="preview-btn" onClick={handleWithdraw} disabled={isLoading}>
                  {isLoading ? <div className="spinner"></div> : "Withdraw"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WithdrawModal;
