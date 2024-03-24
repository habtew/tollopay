import "./PayBillsSection.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWallet, faGift, faHandPointRight, faGreaterThan}  from '@fortawesome/free-solid-svg-icons'

const PayBillsSection = () => {
  return (
    <div className="pay-bills-container">
      <div className="pay-bill-section">
        <FontAwesomeIcon icon={faWallet} className="bill-icon-box notification-1-icon"/>
        <p>Mobile Reacharge</p>
      </div>
      <div className="pay-bill-section">
        <FontAwesomeIcon icon={faGift} className="bill-icon-box notification-1-icon"/>
        <p>Electricty</p>
      </div>
      <div className="pay-bill-section">
        <FontAwesomeIcon icon={faHandPointRight} className="bill-icon-box notification-1-icon"/>
        <p>DTH</p>
      </div>
      <div className="pay-bill-section">
        <FontAwesomeIcon icon={faHandPointRight} className="bill-icon-box notification-1-icon"/>
        <p>Book uber</p>
      </div>
      <div className="pay-bill-section">
        <FontAwesomeIcon icon={faHandPointRight} className="bill-icon-box notification-1-icon"/>
        <p>Rent Repayment</p>
      </div>
      <div className="pay-bill-section">
        <FontAwesomeIcon icon={faHandPointRight} className="bill-icon-box notification-1-icon"/>
        <p>Loan Repayment</p>
      </div>
      <div className="pay-bill-section">
        <FontAwesomeIcon icon={faHandPointRight} className="bill-icon-box notification-1-icon"/>
        <p>Others</p>
      </div>
      <div className="pay-bill-section">
        <FontAwesomeIcon icon={faGreaterThan} className="bill-icon-box greator-icon" />
        <p>see all</p>
      </div>
    </div>
  );
};

export default PayBillsSection;
