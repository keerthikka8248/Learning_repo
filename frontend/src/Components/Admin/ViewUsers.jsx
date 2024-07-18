import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './ViewUsers.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:8000/fetchusers');
        if (!response.ok) {
          const errorDetail = await response.text(); // Read the response as text
          throw new Error(`Network response was not ok: ${errorDetail}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message); // Set the error state
      }
    }
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/deleteusers/${userId}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorDetail = await response.text(); // Read the response as text
        throw new Error(`Network response was not ok: ${errorDetail}`);
      }
      // Update the user list after successful deletion
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.message); // Set the error state
    }
  };

  return (
    <div className="view-users-container">
      <h1 className="view-users-title">Users of Our Website</h1>
      {error && <p className="view-users-error">Error: {error}</p>}
      <ul className="view-users-list">
        {users.map(user => (
          <li key={user._id} className="view-users-item">
            <span className="view-users-username">{user.username}</span>
            <span className="view-users-email">{user.emailid}</span>
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="delete-icon"
              onClick={() => handleDeleteUser(user._id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewUsers;
