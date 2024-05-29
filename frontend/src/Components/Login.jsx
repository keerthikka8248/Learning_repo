import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import loginImage from '../images/log_bk.jpg';
import './Login.css';
import checkmark from '../images/check.gif';

function Login({ updateUserData }) {
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailid, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred during login.'); // Re-throw error with user-friendly message
      }
      else{
        const data = await response.json();
        console.log('Login Successful:', data);
        setShowSuccess(true);
        setTimeout(() => {
          if (emailid === 'admin@sece.in') {
            navigate('/admin-dashboard');
          } else {
            updateUserData({ username: data.username, email: data.emailid });
            navigate('/'); // Redirect to the homepage for regular users
          }
        }, 2000);
      }
      

    } catch (error) {
      console.error('Login Error:', error.message);
      setShowError(true);
      setErrorMessage(error.message);
    } finally {
      // Optionally clear input fields after submission
      setEmailid('');
      setPassword('');
    }
  };

  return (
    <div className="login-page">
      <div className="login-image-container">
        <img src={loginImage} alt="Login" className="login-image" />
      </div>
      <div className={showSuccess ? "login-success" : "login-container"}>
       {showSuccess ? (
        <>
        <img src={checkmark} alt="Success" />
        <p>Login successfully</p>
        </>
       ): (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="emailid">Email</label>
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
          <button className="log_but" type="submit">
            LOGIN
          </button>
          <RouterLink to="/signup">
            <p className="create-account">Create a Account?</p>
          </RouterLink>
          {showError && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
        </form>
      )}
      </div>
      
    </div>
  );
};

export default Login;
