import React, { useState } from "react";
import axios from "axios";
import BACKEND_URL from "../config"; 
import { Link } from "react-router-dom";
import "./sendmoney.css";

export default function SendMoney() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        BACKEND_URL+"/send-money",
        { recipient_email: recipientEmail, amount },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="send-money-container">
      <h2>Send Money</h2>
      <form onSubmit={handleSubmit} className="send-money-form">
        <input
          type="email"
          placeholder="Recipient Email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="input-field"
        />
        <button className="send-money-button">Send Money</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">Error: {error}</p>}
      <button className="go-back"><Link to="/home">Go back</Link></button>
    </div>
  );
}
