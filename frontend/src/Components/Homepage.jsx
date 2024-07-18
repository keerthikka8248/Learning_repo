import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.jpg';
import './Homepage.css';
import html from '../images/HTML5.jpg';
import css from '../images/CSS3.jpg';
import js from '../images/JavaScript_logo_PNG5.png';
import c from '../images/C.png';
import cpp from '../images/c++.png';
import python from '../images/python.jpg';
import java from '../images/java.png';
import dsa from '../images/DSA_Logo.png';
import bk from '../images/background.jpg';
import logo1 from '../images/bird.jpg';
import user from '../images/user.png';

const courses = [
  { id: 'html-concepts', name: 'HTML', image: html },
  { id: 'css-concepts', name: 'CSS', image: css },
  { id: 'js-concepts', name: 'JavaScript', image: js },
  { id: 'dsa-concepts', name: 'DSA', image: dsa },
  { id: 'c-concepts', name: 'C', image: c },
  { id: 'cpp-concepts', name: 'C++', image: cpp },
  { id: 'python-concepts', name: 'Python', image: python },
  { id: 'java-concepts', name: 'Java', image: java }
];

const features = [
  { id: 'topic-specific-modules', name: 'Topic-Specific Modules', description: 'Deep dives into specific subjects.' },
  { id: 'adaptive-learning', name: 'Adaptive Learning', description: 'Personalized learning paths.' },
  { id: 'structured-learning-paths', name: 'Structured Learning Paths', description: 'Organized sequences of courses.' },
  { id: 'interactive-content', name: 'Interactive Content', description: 'Engaging and participative learning.' },
  { id: 'integrated-quizzes', name: 'Integrated Quizzes', description: 'Assess knowledge with quizzes.' }
];

const popularCourses = [
  { id: 'c-concepts', name: 'C', icon: faChalkboardUser },
  { id: 'cpp-concepts', name: 'C++', icon: faChalkboardUser },
  { id: 'html-concepts', name: 'HTML', icon: faChalkboardUser },
  { id: 'dsa-concepts', name: 'DSA', icon: faChalkboardUser }
];

function Homepage({ isLoggedIn, userData, handleLogout }) {
  const [showCourses, setShowCourses] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleToggleCourses = () => {
    setShowCourses(!showCourses);
  };

  const handleToggleUserDetail = () => {
    setShowUserDetail(!showUserDetail);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleLogoutClick = () => {
    console.log("Logout button clicked");
    handleLogout(); 
    setShowUserDetail(false); 
  };

  return (
    <div className="homepage-container">
       <section className="background-section" >  {/*style={{ backgroundImage: `url(${bk})` }} */}
        <header className="header">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" style={{ width: '80px' }} />
            <p className="logo-text">SkillSpring</p>
          </div>
          <nav className="nav-links">
            <button onClick={handleToggleCourses} className={showCourses ? "nav-links hover-effect" : "nav-links"}>All Courses</button>
            <RouterLink to="/available-courses">
                <button className="login-button">AvailCourses</button>
            </RouterLink>
            <input
              type="text"
              placeholder="Search courses..."
              className="search-bar"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            
            {isLoggedIn ? (
              <div className="user-info" onClick={handleToggleUserDetail}>
                <img src={user} alt="User" className="user-icon" style={{ width: '60px' }} />
                {showUserDetail && (
                  <div className="user-details">
                    <p>{userData.username}</p>
                    <p>{userData.email}</p>
                    <button onClick={handleLogoutClick}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <RouterLink to="/login">
                <button className="login-button">Login</button>
              </RouterLink>
            )}
          </nav>
        </header>

        {showCourses && (
          <div className="course-container">
            <section id="availablecourses" className="available-courses">
              <h2>Available Courses</h2>
              <div className="course-tabs">
                {filteredCourses.map(course => (
                  <RouterLink to={`/${course.id}`} className="course-tab" key={course.id}>
                    <div className="course-tab">
                      <img src={course.image} alt={course.name} />
                      <p>{course.name}</p>
                    </div>
                  </RouterLink>
                ))}
              </div>
            </section>
          </div>
        )}

        <div className="landing-content">
          <div className="landing-text">
            <h1>Welcome to SkillSpring</h1>
            <p>Empowering individuals to reach their full potential in the world of technology.</p>
            <p>Explore our diverse range of courses designed to foster innovation and ignite a passion for lifelong learning.</p>
          </div>
          <div className="hero-image-container">
            <img src={logo1} alt="Hero" className="hero-image" />
          </div>
        </div>
      </section>
      <section className="background-section">
  <div className="about-content">
    <div className="features-popular-layout">
    <section className="features-section">
              <h2 className="features-heading">Our Features</h2>
              <div className="features-tabs">
                {features.map((feature, index) => (
                  <div className="feature-tab" key={feature.id}>
                    <h3>{feature.name}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

      <section className="popular-courses-section">
        <h2 className="popular-courses-heading">Popular Courses</h2>
        <div className="popular-courses-tabs">
          {popularCourses.map((course) => (
            <RouterLink to={`/${course.id}`} className="popular-course-tab" key={course.id}>
              <div className="popular-course-tab">
                <FontAwesomeIcon icon={course.icon} className="course-icon" />
                <p>{course.name}</p>
              </div>
            </RouterLink>
          ))}
        </div>
      </section>
    </div>
  </div>
</section>

      {/* <footer className="footer">
        <p>&copy; 2024 Learning Platform. All rights reserved.</p>
        <p>Contact us: support@example.com</p>
      </footer> */}
    </div>
  );
}

export default Homepage;
