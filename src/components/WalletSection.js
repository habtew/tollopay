import "./WalletSection.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWallet, faGift, faHandPointRight}  from '@fortawesome/free-solid-svg-icons'
const WalletSection = () => {
  return (
    <div className="wallet-section-container">
      <div className="wallet-secontion">
        <FontAwesomeIcon icon={faWallet} className="wallet-icon-box notification-1-icon"/>
        <p>Phonepe wallet</p>
      </div>
      <div className="wallet-secontion">
        <FontAwesomeIcon icon={faGift} className="wallet-icon-box notification-1-icon"/>
        <p>Rewards</p>
      </div>
      <div className="wallet-secontion">
        <FontAwesomeIcon icon={faHandPointRight} className="wallet-icon-box notification-1-icon"/>
        <p>Refer and Get 50</p>
      </div>
    </div>
  );
};

export default WalletSection;
