import React from "react";
import WalletCard from "./WalletCard";
import { FaBitcoin } from "react-icons/fa";
import { SiLitecoin, SiRipple } from "react-icons/si";

const WalletList = () => {
  // Wallet Data
  const wallets = [
    {
      name: "Bitcoin",
      shortSymbol: "BTC",
      icon: <FaBitcoin size={40} color="#F7931A" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "12.734",
      sellingAmount: "54,634",
      buyingAmount: "534,263",
      balance: "1.5238237",
      balanceUSD: "$15,238,237",
    },
    {
      name: "Litecoin",
      shortSymbol: "LTC",
      icon: <SiLitecoin size={40} color="#345D9D" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "273",
      sellingAmount: "79,634",
      buyingAmount: "534,263",
      balance: "1.5238237",
      balanceUSD: "$20,275,237",
    },
    {
      name: "Ripple",
      shortSymbol: "XRP",
      icon: <SiRipple size={40} color="#E48E00" />,
      address: "OxsD12F32xvW3deG5...",
      rate: "2.730",
      sellingAmount: "79,634",
      buyingAmount: "162,364",
      balance: "2,523.8237",
      balanceUSD: "$275,237",
    },
  ];

  return (
    <div className="wallet-list-container"> {/* Added a new wrapper */}
      <h1 className="wallet-heading">My Wallet</h1> {/* Placed outside of the grid */}
      <div className="wallet-list">
        {wallets.map((wallet, index) => (
          <WalletCard key={index} crypto={wallet} />
        ))}
      </div>
    </div>
  );
};

export default WalletList;
