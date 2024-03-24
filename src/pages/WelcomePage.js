import "./WelcomePage.css";
import { Link } from "react-router-dom";


const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <img src="./group-girl.svg" className="welcome-logo"/>
      <div className="title">Welcome to <span>TolloPay</span>!</div>
      <ul className="features">
        <li>Your Fast and Secure Online Payment Solution in Ethiopia</li>
        <li>Explore the convenience of ToloPay, your one-stop solution for quick and secure online payments. Send money, receive funds, and manage your finances effortlessly.</li>
        <li>easy, fast and secure transfer</li>
      </ul>
      <Link className="get_started" to="/signup"> Get Started </Link>
    </div>
  );
};

export default WelcomePage;
