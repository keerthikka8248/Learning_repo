import React, { useState } from 'react';
import './Signup.css';
import SignupImage from '../images/log_bk.jpg';
import { useNavigate } from 'react-router-dom';
import tickmark from '../images/tick.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setShowError(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, emailid, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred during signup.');
      } else {
        const data = await response.json();
        console.log('Signup Successful:', data);
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Signup Error:', error.message);
      setShowError(true);
      setErrorMessage(error.message);
    } finally {
      setUsername('');
      setEmailid('');
      setPassword('');
      setConfirmPassword('');
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
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="password-icon"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  className="password-icon"
                  onClick={toggleConfirmPasswordVisibility}
                />
              </div>
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
