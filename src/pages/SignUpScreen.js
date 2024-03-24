import "./SignUpScreen.css";
import React from 'react'
import { Link } from 'react-router-dom'
import BACKEND_URL from "../config";
import axios from "axios";

const SignUpScreen = () => {
    const [formData, setFormData] = React.useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: ""
      });
      const [successMessage, setSuccessMessage] = React.useState("");
      const [error, setError] = React.useState(null);
    
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
            BACKEND_URL+"/signup",
            formData
          );
    
          if (response.status === 200) {
            setSuccessMessage("User signed up successfully");
            alert("User signed up successfully")
            setError(null); // Clear any previous errors
            
          }
        } catch (error) {
          setError(error.message);
        }
      }

  return (
    <div className="sign-up">
        <img src="./group-2.svg" className="signup-logo"/>
        <div className="info-container">
            <div className="sign-up-screen-child" />
            <h1>tolloPay</h1>
            <div className="info">
                <p><span className="span">Register</span> with us</p>
                <p>your information is safe with us</p>
            </div>
        </div>
        <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                    name="first_name"
                    value={formData.first_name}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    onChange={handleChange}
                    name="last_name"
                    value={formData.last_name}
                    required
                />
                <input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    name="phone_number"
                    value={formData.phone_number}
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
                <button className="btn">Submit</button>
            </form>
        <p className="already-member">Already have an account? <Link to="/login" className="sign-in">Sign in</Link></p>
        {successMessage && <p>{successMessage}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default SignUpScreen;
