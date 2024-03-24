import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWallet, faGift, faHandPointRight}  from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <div className="footerr">
      <div className="footer-secontion">
        <FontAwesomeIcon icon={faWallet} className="icon"/>
      </div>
      <div className="footer-secontion">
        <FontAwesomeIcon icon={faGift} className="icon"/>
      </div>
      <div className="footer-secontion">
        <FontAwesomeIcon icon={faHandPointRight} className="icon"/>
      </div>
      <div className="footer-secontion">
        <FontAwesomeIcon icon={faHandPointRight} className="icon"/>
      </div>
    </div>
  );
};

export default Footer;
