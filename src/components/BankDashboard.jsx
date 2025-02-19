import React, { useState } from "react";
import "./BankDashboard.css";

const BankDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  // Card state for both form and display
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "0000 0000 0000 0000",
    cardHolder: "xxxx xxxxx",
    expiryDate: "00/00",
    cvv: "",
  });

  // Handle input change with formatting
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Format card number to have spaces after every 4 digits
    if (name === "cardNumber") {
      let formattedCardNumber = value.replace(/\D/g, ""); // Remove non-numeric characters
      formattedCardNumber = formattedCardNumber.replace(/(.{4})/g, "$1 ").trim(); // Add a space every 4 digits
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        cardNumber: formattedCardNumber,
      }));
    } 
    // Format expiry date to MM/YY with a slash
    else if (name === "expiryDate") {
      let formattedExpiryDate = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (formattedExpiryDate.length > 2) {
        formattedExpiryDate = `${formattedExpiryDate.slice(0, 2)}/${formattedExpiryDate.slice(2, 4)}`;
      }
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        expiryDate: formattedExpiryDate,
      }));
    } 
    // Handle other fields
    else {
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Card Details:", cardDetails);
    setShowModal(false);
  };

  return (
    <div className="banking-container">
      <h2 className="title">Add Your Card Details Below</h2>

      <div className="dashboard">
        {/* Credit Card Section */}
        <div className="card-container">
          <div className="card-shadow"></div>
          <div className="card-shadow second"></div>
          <div className="bank-card">
            <div className="chip-icon">💳</div>
            <div className="card-number">{cardDetails.cardNumber}</div>
            <div className="card-details">
              <div>
                <span className="label">Card Holder</span>
                <span className="value">{cardDetails.cardHolder}</span>
              </div>
              <div>
                <span className="label">Valid Thru</span>
                <span className="value">{cardDetails.expiryDate}</span>
              </div>
            </div>
            <div className="card-logo">
              <span className="circle red"></span>
              <span className="circle yellow"></span>
            </div>

            {/* Add Card Button */}
            <button className="add-card-button" onClick={() => setShowModal(true)}>
              + Add Card Details
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Adding Card Details */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Card Details</h3>
            <form onSubmit={handleSubmit}>
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="Enter card number"
                value={cardDetails.cardNumber}
                onChange={handleChange}
                maxLength="19" // 16 digits + 3 spaces
                required
              />
              <label>Card Holder</label>
              <input
                type="text"
                name="cardHolder"
                placeholder="Enter card holder name"
                value={cardDetails.cardHolder}
                onChange={handleChange}
                required
              />
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={handleChange}
                maxLength="5" // MM/YY format
                required
              />
              <label>CVV</label>
              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                maxLength="3"
                value={cardDetails.cvv}
                onChange={handleChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="save-button">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankDashboard;
