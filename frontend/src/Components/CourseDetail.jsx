import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetail.css';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentSection, setCurrentSection] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:8000/courses/${courseId}`);
        if (!response.ok) {
          const errorText = await response.json();
          throw new Error(errorText.error);
        }
        const data = await response.json();
        setCourse(data);
        setCurrentSection('basic');  // Default to the basic section
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCourse();
  }, [courseId]);

  const renderSectionContent = () => {
    if (!course || !currentSection) return null;

    switch (currentSection) {
      case 'basic':
        return renderSubtopics(course.sections[0].subtopics);
      case 'intermediate':
        return renderSubtopics(course.sections[1].subtopics);
      case 'advanced':
        return renderSubtopics(course.sections[2].subtopics);
      case 'resources':
        return (
          <div>
            <h3>Learning Resources</h3>
            {course.learningResources.map((resource, index) => (
              <p key={index}>{resource}</p>
            ))}
          </div>
        );
      case 'interview':
        return (
          <div>
            <h3>Interview Questions</h3>
            {course.interviewQuestions.map((question, index) => (
              <div key={index}>
                <p>{question}</p>
              </div>
            ))}
          </div>
        );
      default:
        return <p>Select a section from the navbar.</p>;
    }
  };

  const renderSubtopics = (subtopics) => {
    return subtopics.map((subtopic, index) => (
      <div key={index}>
        <h4>{subtopic.heading}</h4>
        <p>{subtopic.explanation}</p>
        {subtopic.code && (
          <pre>
            <code>{subtopic.code}</code>
          </pre>
        )}
      </div>
    ));
  };

  const handleSectionClick = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className="course-detail-container">
      <div className="vertical-navbar">
        <h3>{course?.courseName}</h3>
        <button
          className={currentSection === 'basic' ? 'active' : ''}
          onClick={() => handleSectionClick('basic')}
        >
          Basics
        </button>
        <button
          className={currentSection === 'intermediate' ? 'active' : ''}
          onClick={() => handleSectionClick('intermediate')}
        >
          Intermediate
        </button>
        <button
          className={currentSection === 'advanced' ? 'active' : ''}
          onClick={() => handleSectionClick('advanced')}
        >
          Advanced
        </button>
        <button
          className={currentSection === 'resources' ? 'active' : ''}
          onClick={() => handleSectionClick('resources')}
        >
          Learning Resources
        </button>
        <button
          className={currentSection === 'interview' ? 'active' : ''}
          onClick={() => handleSectionClick('interview')}
        >
          Interview Questions
        </button>
      </div>
      <div className="section-content">
        {error ? <p>{error}</p> : renderSectionContent()}
      </div>
    </div>
  );
};

export default CourseDetail;
