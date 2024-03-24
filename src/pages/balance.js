import React, { useState } from "react";
import axios from "axios";

export default function Check() {
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  function handleChange(event) {
    setEmail(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://tollopay-benyas.koyeb.app/balance",
        { email }
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={email}
        />
        <button>Check Balance</button>
      </form>
      {balance !== null && (
        <div>
          <p>Balance: {balance}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
