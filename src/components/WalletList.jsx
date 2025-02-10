import React, { useState } from "react";
import WalletCard from "./WalletCard";
import WithdrawModal from "./WithdrawModal"; // Import WithdrawModal
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiBinance, SiDogecoin, SiLitecoin, SiTether } from "react-icons/si";

const WalletList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Wallet Data
  const wallets = [
    {
      name: "Bitcoin",
      shortSymbol: "BTC",
      icon: <FaBitcoin size={40} color="#F7931A" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "97,048.42",
      sellingAmount: "54,634",
      buyingAmount: "534,263",
      balance: "1.5238237",
      balanceUSD: "$147,466.86",
    },
    {
      name: "Ethereum",
      shortSymbol: "ETH",
      icon: <FaEthereum size={40} color="#5A9" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "2,709.23",
      sellingAmount: "92,761",
      buyingAmount: "600,451",
      balance: "3.098273",
      balanceUSD: "$8,388.28",
    },
    {
      name: "BNB",
      shortSymbol: "BNB",
      icon: <SiBinance size={40} color="#F0B90B" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "573.81",
      sellingAmount: "102,347",
      buyingAmount: "459,783",
      balance: "5.238723",
      balanceUSD: "$1,147.18",
    },
    {
      name: "Dogecoin",
      shortSymbol: "DOGE",
      icon: <SiDogecoin size={40} color="#C2A633" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "0.25",
      sellingAmount: "10,500",
      buyingAmount: "320,000",
      balance: "78,234.23",
      balanceUSD: "$19,361.02",
    },
    {
      name: "Litecoin",
      shortSymbol: "LTC",
      icon: <SiLitecoin size={40} color="#345D9D" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "100.54",
      sellingAmount: "79,634",
      buyingAmount: "534,263",
      balance: "1.5238237",
      balanceUSD: "$20,275.23",
    },
    {
      name: "Tether",
      shortSymbol: "USDT",
      icon: <SiTether size={40} color="#26A17B" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "1.00",
      sellingAmount: "500,000",
      buyingAmount: "2,000,000",
      balance: "250,000",
      balanceUSD: "$250,048.75",
    },
  ];

  return (
    <div className="wallet-list-container">
      <h1 className="wallet-heading">My Wallet</h1>
      <div className="wallet-list">
        {wallets.map((wallet, index) => (
          <WalletCard key={index} crypto={wallet} />
        ))}
      </div>

      {/* Withdraw Button */}
      <button className="withdraw-button" onClick={() => setIsModalOpen(true)}>
        Withdraw
      </button>

      {/* Withdraw Modal - Pass the wallets data */}
      <WithdrawModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} wallets={wallets} />
    </div>
  );
};

export default WalletList;
