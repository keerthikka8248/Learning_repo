import React, { useState } from 'react';
import './Signup.css';
import SignupImage from '../images/log_bk.jpg';
import { useNavigate } from 'react-router-dom';
import tickmark from '../images/tick.gif';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to store specific error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, emailid, password })
      });
      
      if (!response.ok) {
        // Handle potential error from backend
        const errorData = await response.json(); // Assuming backend sends error data in JSON format
        throw new Error(errorData.error || 'An error occurred during signup.'); // Use backend error message if available, otherwise provide a generic message
      }
      else{
        const data = await response.json();
        console.log('Signup Successful:', data); // Assuming you don't need to use 'data' here
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
      }
  
      
    } catch (error) {
      console.error('Signup Error:', error.message);
      setShowError(true);
      // Access specific error message from backend response (if available)
      setErrorMessage(error.message);
    } finally {
      // Clear input fields after successful or failed submission
      setUsername('');
      setEmailid('');
      setPassword('');
    }
  };
  
  return (
    <div className="signup-page">
      <div className={showSuccess ? "signup-success" : "signup-container"}>
        {showSuccess ? (
          <>
            <img src={tickmark} alt="Success" />
            <p>Account created successfully</p>
          </>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="emailid">Email ID</label>
              <input
                type="text"
                id="emailid"
                name="emailid"
                value={emailid}
                onChange={(e) => setEmailid(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="log_but" type="submit">Create Account</button>
            {showError && (
              <div className="error-message">
                <p>{errorMessage}</p>
              </div>
            )}
          </form>
        )}
      </div>
      <div className="signup-image-container">
        <img src={SignupImage} alt="Signup" className="signup-image" />
      </div>
    </div>
  );
};

export default Signup;
