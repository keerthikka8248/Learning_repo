// Admin.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import admin_bk from '../../images/admin_bk.jpg';
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-background-image">
        <img src={admin_bk} alt="Background" />
      </div>

      <h1 className="admin-title">Welcome Admin!!!</h1>
      <div className="admin-buttons">
        <RouterLink to="/add-quiz">
          <button className="admin-button">Add Quiz</button>
        </RouterLink>
        <RouterLink to="/view-users">
          <button className="admin-button">View Users</button>
        </RouterLink>
        <RouterLink to="/add-course">
          <button className="admin-button">Add Course</button>
        </RouterLink>
      </div>
    </div>
  );
};

export default Admin;
