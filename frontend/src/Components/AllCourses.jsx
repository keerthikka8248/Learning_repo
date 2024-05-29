import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink} from 'react-scroll';
import html from '../images/HTML5.jpg';
import css from '../images/CSS3.jpg';
import js from '../images/JavaScript_logo_PNG5.png';
import c from '../images/C.png';
import cpp from '../images/c++.png';
import python from '../images/python.jpg';
import java from '../images/java.png';
import dsa from '../images/DSA_Logo.png';
import './AllCourses.css';

export const AllCourse
 = () => {
  return (
  <div>
  <section id="availablecourses" className="available-courses">
  <h2>Available Courses</h2>
  <div className="course-tabs">
  <RouterLink to="/html-concepts" className="course-tab">
    <div className="course-tab">
      <img src={html} alt="HTML" />
      <p>HTML</p>
    </div>
    </RouterLink>
    <RouterLink to="/c-concepts-page" className="course-tab">
    <div className="course-tab">
      <img src={css} alt="CSS" />
      <p>CSS</p>
    </div>
    </RouterLink>
    <RouterLink to="/c-concepts-page" className="course-tab">
    <div className="course-tab">
      <img src={js} alt="JavaScript" />
      <p>JavaScript</p>
    </div>
    </RouterLink>
    <RouterLink to="/c-concepts-page" className="course-tab">
    <div className="course-tab">
      <img src={dsa} alt="DSA" />
      <p>DSA</p>
    </div>
    </RouterLink>
    <RouterLink to="/c-concepts-page" className="course-tab">
    <div className="course-tab">
      <img src={c} alt="C" />
      <p>C</p>
    </div>
    </RouterLink>
    <RouterLink to="/c-concepts-page" className="course-tab">
    <div className="course-tab">
      <img src={cpp} alt="C++" />
      <p>C++</p>
    </div>
    </RouterLink>
    <RouterLink to="/c-concepts-page" className="course-tab">
    <div className="course-tab">
      <img src={python} alt="Python" />
      <p>Python</p>
    </div>
    </RouterLink>
    <RouterLink to="/c-concepts-page" className="course-tab">
    <div className="course-tab">
      <img src={java} alt="Java" />
      <p>Java</p>
    </div>
    </RouterLink>
    
  </div>
</section>
    </div>
  )
}
