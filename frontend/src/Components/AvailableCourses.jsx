import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode, faInfoCircle, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import './AvailableCourses.css';

const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="available-courses-wrapper">
      <h2>Available Courses</h2>
      <div className="courses-list">
        {courses.map(course => (
          <Link to={`/courses/${course.courseId}`} key={course.courseId} className="course-card">
            <div className="course-icon">
              <FontAwesomeIcon icon={faFileCode} className="course-icon-style" />
            </div>
            <div className="course-info">
              <span className="course-title">{course.courseName}</span>
              <div className="course-details">
                {/* <FontAwesomeIcon icon={faInfoCircle} className="course-detail-icon" title="Course details" /> */}
                <FontAwesomeIcon icon={faBookOpen} className="course-detail-icon" title="Course contents" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AvailableCourses;
