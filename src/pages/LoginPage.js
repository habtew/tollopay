import React from 'react'
import { faHandPeace } from "@fortawesome/free-regular-svg-icons";
import Property1Default from "../components/Property1Default";
import "./LoginPage.css";
import { Link, useHistory, useNavigate } from 'react-router-dom';
import axios from "axios";
import BACKEND_URL from "../config"; 

const LoginPage = ({ history }) => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  });
  const [successMessage, setSuccessMessage] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        BACKEND_URL+"/login",
        formData,{ withCredentials: true }
      );

      if (response.status === 200) {
        setSuccessMessage("Login successful");
        document.cookie = "cookie_name=cookie_value; secure=true; samesite=none";
        setError(null); // Clear any previous errors
        navigate('/home')
      }
    } catch (error) {
      setError(error.message);
    }
  }
  
  return (
    <div className="login-page">
      <div className="welcome-message">Welcome <span className="back">Back</span></div>
      <img className="login-page-child" alt="" src="/group-17.svg" />
      <div className="login-text"><span className='back'>Login</span> to <span className='back'>TolloPay</span></div>
      <form className="login-form" onSubmit={handleSubmit}>
          <input
              type="email"
              placeholder="johndoe@gmail.com"
              onChange={handleChange}
              name="email"
              value={formData.email}
              required
          />
          <input
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              required
          />
          <button className='btn'>Submit</button>
      </form>
      <Link to="/signup" className="forgot-password">forgot password</Link>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default LoginPage;
