import "./TransferMoneySection.css";
import { Link, useHistory, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClockRotateLeft, faEnvelope, faMoneyCheckDollar, faBuildingColumns}  from '@fortawesome/free-solid-svg-icons'

const TransferMoneySection = () => {
  return (
    <div className="transfer-money-container">
      <div className="transfer-money">Transfer Money</div>
      
      <div className="transer-content-container">
          <div className="user-section">
            <FontAwesomeIcon className="user-section-icon" alt="" icon={faClockRotateLeft} />
            <div className="text">Transaction History</div>
          </div>
          <Link to="/sendmoney" className="user-section">
            <FontAwesomeIcon className="user-section-icon" alt="" icon={faEnvelope} />
            <div className="text">To Email</div>
          </Link>
          <div className="user-section">
            <FontAwesomeIcon className="user-section-icon" alt="" icon={faBuildingColumns} />
            <div className="text">To Bank</div>
          </div>
          <Link to="/check-balance" className="user-section">
            <FontAwesomeIcon className="user-section-icon" alt="" icon={faMoneyCheckDollar} />
            <div className="text">check balance</div>
          </Link>
      </div>
    </div>
  );
};

export default TransferMoneySection;
