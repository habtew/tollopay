import React from "react";
import axios from "axios";
import BACKEND_URL from "../config"; 
import { useNavigate } from "react-router-dom";

import TransferMoneySection from "../components/TransferMoneySection";
import WalletSection from "../components/WalletSection";
import PayBillsSection from '../components/PayBillsSection'
import Footer from "./Footer";
import "./HomePage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faQrcode, faGreaterThan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const HomePage = () => {

  const [successMessage, setSuccessMessage] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate()
  async function handleLogout() {
    try {
      const response = await axios.get(`${BACKEND_URL}/logout`, { withCredentials: true });

      if (response.status === 200) {
        setSuccessMessage("Logout successful");
        document.cookie = "cookie_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure=true; samesite=none";
        setError(null);
        alert("Loggout successful")
        navigate('/login')
      }
    } catch (error) {
      setError(error.message);
    }
  }
  
  return (
    <div className="home-page">
      <div className="sign-up-screen-child" />
      <nav className="navbar">
        <img className="profile-icon" alt="" src="/profile-icon.svg" />
        <div className="address">
          <b className="add-adress">Add Adress</b>
          <b className="addis-ababa">Addis Ababa</b>
        </div>
        <div className="icon-container">
          <FontAwesomeIcon icon={faQrcode} className="icon-box qr-1-icon"/>
          <FontAwesomeIcon icon={faBell} className="icon-box notification-1-icon"/>
          <div onClick={handleLogout}>
            <FontAwesomeIcon icon={faXmark} className="icon-box notification-1-icon"/>
          </div>
        </div>
      </nav>     
      <div className="good-morning">Welcome to <span>TolloPay</span></div>
      <TransferMoneySection />
      
      <div className="recieve-container">
        <div>
          <div className="recieve-money">Recieve Money</div>
          <div className="recieve-account">myemail@account.com</div>
        </div>
        <FontAwesomeIcon icon={faGreaterThan} className="icon-box greator-icon" />
      </div>
      
      <WalletSection />
      <PayBillsSection />

      <Footer />
    </div>
  );
};

export default HomePage;
