import PaymentMethodsSection from "../components/PaymentMethodsSection";
import "./CheckBalance.css";
import React, { useState } from "react";
import axios from "axios";
import BACKEND_URL from "../config";
import { Link } from 'react-router-dom';


const CheckBalance = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.get(
        BACKEND_URL+"/balance",{ withCredentials: true }
      );

      if (response.status === 200) {
        setBalance(response.data.balance);
        setError(null); // Clear any previous errors
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="check-balance">
      <div className="header">
        <img className="header icon" alt="" src="/profile-icon.svg" />
        <h1>Check Balance</h1>
      </div>
      <div className="container-bank">
        <h1 className="payment-title">Bank accounts</h1>
        <form onSubmit={handleSubmit}>
          <button className="btn-check">
            <PaymentMethodsSection
              accountName="Canara Bank -7465"
              bankAccountName="Canara Bank -7465"
            />
          </button>
        </form>
      </div>

      <div className="balance">
          {balance !== null && (
            <div>
              <p>Balance: {balance}</p>
            </div>
          )}
          {error && <p>Error: {error}</p>}
      </div>
      <button className="go-back"><Link to="/home">Go back</Link></button>
    </div>
  );
};

export default CheckBalance;
