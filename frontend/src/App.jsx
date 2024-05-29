//App.jsx
import React, { useState } from 'react';
import Homepage from './Components/Homepage'
import {  Routes, Route } from 'react-router-dom';
import Login from './Components/Login'
import Admin from './Components/Admin';
import CConceptsPage from './Components/CConceptsPage';
import './Components/AllCourses.css'
import './App.css'
import CPPConceptsPage from './Components/CppConceptsPage';
import Signup from './Components/Signup';
import HtmlConceptsPage from './Components/HtmlConceptsPage';
import AddQuiz from './Components/AddQuiz';
import Quiz from './Components/Quiz';
import ViewUsers from './Components/ViewUsers';

function App() {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateUserData = (userData) => {
    setUserData(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({});
    console.log("Logged out");
  };
  return (
    <>
      <Routes>
          <Route path="/" element={<Homepage isLoggedIn={isLoggedIn} userData={userData} handleLogout={handleLogout} />} />
          <Route path="/login" element={<Login updateUserData={updateUserData} />} />
          <Route path="/admin-dashboard" element={<Admin />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/c-concepts" element={<CConceptsPage />} />
          <Route path="/cpp-concepts" element={<CPPConceptsPage />} />
          <Route path="/html-concepts" element={<HtmlConceptsPage />} />
          <Route path="/add-quiz" element={<AddQuiz />} />
          <Route path="/view-users" element={<ViewUsers />} />
          <Route path="/quiz/:conceptId" element={<Quiz />} /> 
      </Routes>
      
    </>
  )
}

export default App
