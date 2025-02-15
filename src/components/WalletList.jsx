import React, { useEffect, useState } from "react";
import WalletCard from "./WalletCard";
import WithdrawModal from "./WithdrawModal";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiBinance, SiDogecoin, SiLitecoin, SiTether } from "react-icons/si";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const WalletList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wallets, setWallets] = useState([
    {
      name: "Bitcoin",
      shortSymbol: "BTC",
      icon: <FaBitcoin size={40} color="#F7931A" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "97,048.42",
      sellingAmount: "54,634",
      buyingAmount: "534,263",
      balance: 0,
      balanceUSD: 0,
    },
    {
      name: "Ethereum",
      shortSymbol: "ETH",
      icon: <FaEthereum size={40} color="#5A9" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "2,709.23",
      sellingAmount: "92,761",
      buyingAmount: "600,451",
      balance: 0,
      balanceUSD: 0,
    },
    {
      name: "BNB",
      shortSymbol: "BNB",
      icon: <SiBinance size={40} color="#F0B90B" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "573.81",
      sellingAmount: "102,347",
      buyingAmount: "459,783",
      balance: 0,
      balanceUSD: 0,
    },
    {
      name: "Dogecoin",
      shortSymbol: "DOGE",
      icon: <SiDogecoin size={40} color="#C2A633" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "0.25",
      sellingAmount: "10,500",
      buyingAmount: "320,000",
      balance: 0,
      balanceUSD: 0,
    },
    {
      name: "Litecoin",
      shortSymbol: "LTC",
      icon: <SiLitecoin size={40} color="#345D9D" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "100.54",
      sellingAmount: "79,634",
      buyingAmount: "534,263",
      balance: 0,
      balanceUSD: 0,
    },
    {
      name: "Tether",
      shortSymbol: "USDT",
      icon: <SiTether size={40} color="#26A17B" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "1.00",
      sellingAmount: "500,000",
      buyingAmount: "2,000,000",
      balance: 0,
      balanceUSD: 0,
    },
  ]);

  // Fetch wallet data from Firestore in real-time
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const walletRef = doc(db, "wallets", user.uid);

    const unsubscribe = onSnapshot(walletRef, (walletSnap) => {
      if (walletSnap.exists()) {
        const walletData = walletSnap.data();
        console.log("Fetched Wallet Data from Firestore:", walletData); // Debugging

        setWallets((prevWallets) =>
          prevWallets.map((wallet) => ({
            ...wallet,
            balance: walletData[wallet.shortSymbol]?.balance ?? wallet.balance, // Preserve balance
            balanceUSD: walletData[wallet.shortSymbol]?.balanceUSD ?? wallet.balanceUSD, // Preserve balanceUSD
          }))
        );
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div className="wallet-list-container">
      <h1 className="wallet-heading">My Wallet</h1>
      <div className="wallet-list">
        {wallets.map((wallet, index) => (
          <WalletCard key={index} crypto={wallet} />
        ))}
      </div>

      <button className="withdraw-button" onClick={() => setIsModalOpen(true)}>
        Withdraw
      </button>

      <WithdrawModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        wallets={wallets}
        setWallets={setWallets}
      />
    </div>
  );
};

export default WalletList;
