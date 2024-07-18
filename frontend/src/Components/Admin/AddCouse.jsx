import React, { useState } from 'react';
import axios from 'axios';
import './AddCourse.css';

const AddCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [sections, setSections] = useState([
    { name: 'Basic', commonHeading: '', subtopics: [{ heading: '', explanation: '' }] },
    { name: 'Intermediate', commonHeading: '', subtopics: [{ heading: '', explanation: '' }] },
    { name: 'Advanced', commonHeading: '', subtopics: [{ heading: '', explanation: '' }] }
  ]);
  const [interviewQuestions, setInterviewQuestions] = useState(['']);
  const [learningResources, setLearningResources] = useState(['']);
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(null);
  const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(null);

  const handleAddCourse = async () => {
    const course = {
      courseId,
      courseName,
      sections,
      interviewQuestions,
      learningResources
    };
  
    try {
      const response = await fetch('http://localhost:8000/add-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add course');
      }
  
      alert('Course added successfully');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course');
    }
  };
  
  const handleSectionChange = (sectionIndex, key, value) => {
    const newSections = [...sections];
    newSections[sectionIndex][key] = value;
    setSections(newSections);
  };

  const handleSubtopicChange = (sectionIndex, subtopicIndex, key, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].subtopics[subtopicIndex][key] = value;
    setSections(newSections);
  };

  const addSubtopic = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].subtopics.push({ heading: '', explanation: '' });
    setSections(newSections);
  };

  const showCodeFormModal = (sectionIndex, subtopicIndex) => {
    setShowCodeForm(true);
    setCurrentSectionIndex(sectionIndex);
    setCurrentSubtopicIndex(subtopicIndex);
  };

  const showImageFormModal = (sectionIndex, subtopicIndex) => {
    setShowImageForm(true);
    setCurrentSectionIndex(sectionIndex);
    setCurrentSubtopicIndex(subtopicIndex);
  };

  const handleAddCode = (code) => {
    const newSections = [...sections];
    newSections[currentSectionIndex].subtopics[currentSubtopicIndex].code = code;
    setSections(newSections);
    setShowCodeForm(false);
  };

  const handleAddImage = (imageUrl) => {
    const newSections = [...sections];
    newSections[currentSectionIndex].subtopics[currentSubtopicIndex].image = imageUrl;
    setSections(newSections);
    setShowImageForm(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    // Example using axios for file upload
    axios.post('http://localhost:8000/upload-image', formData)
      .then(response => {
        const imageUrl = response.data.imageUrl;
        handleAddImage(imageUrl);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <div className="add-course-container">
      <h2>Add New Course</h2>
      <div>
        <label>Course ID:</label>
        <input type="text" value={courseId} onChange={(e) => setCourseId(e.target.value)} />
      </div>
      <div>
        <label>Course Name:</label>
        <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
      </div>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section-container">
          <h3>{section.name} Section</h3>
          <div>
            <label>Common Heading:</label>
            <input
              type="text"
              value={section.commonHeading}
              onChange={(e) => handleSectionChange(sectionIndex, 'commonHeading', e.target.value)}
            />
          </div>
          {section.subtopics.map((subtopic, subtopicIndex) => (
            <div key={subtopicIndex} className="subtopic-container">
              <h4>Subtopic {subtopicIndex + 1}</h4>
              <div>
                <label>Heading:</label>
                <input
                  type="text"
                  value={subtopic.heading}
                  onChange={(e) => handleSubtopicChange(sectionIndex, subtopicIndex, 'heading', e.target.value)}
                />
              </div>
              <div>
                <label>Explanation:</label>
                <textarea
                  value={subtopic.explanation}
                  onChange={(e) => handleSubtopicChange(sectionIndex, subtopicIndex, 'explanation', e.target.value)}
                  required
                />
              </div>
              {subtopic.code && (
                <div>
                  <label>Code:</label>
                  <pre>{subtopic.code}</pre>
                </div>
              )}
              {subtopic.image && (
                <div>
                  <label>Image URL:</label>
                  <img src={subtopic.image} alt="Subtopic Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </div>
              )}
              <div className="action-buttons">
                <button onClick={() => showCodeFormModal(sectionIndex, subtopicIndex)}>Add Code</button>
                <label className="upload-button">
                  Add Image
                  <input type="file" onChange={handleImageUpload} accept="image/*" />
                </label>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addSubtopic(sectionIndex)}>Add Subtopic</button>
        </div>
      ))}
      <div>
        <label>Interview Questions:</label>
        <textarea
          value={interviewQuestions.join('\n')}
          onChange={(e) => setInterviewQuestions(e.target.value.split('\n'))}
        />
      </div>
      <div>
        <label>Learning Resources:</label>
        <textarea
          value={learningResources.join('\n')}
          onChange={(e) => setLearningResources(e.target.value.split('\n'))}
        />
      </div>
      <button onClick={handleAddCourse}>Add Course</button>

      {/* Modal for Code Input */}
      {showCodeForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Code</h3>
            <textarea
              placeholder="Enter code snippet here"
              onChange={(e) => handleAddCode(e.target.value)}
            />
            <button onClick={() => setShowCodeForm(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Modal for Image URL Input */}
      {showImageForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Image URL</h3>
            <input
              type="text"
              placeholder="Enter image URL"
              onChange={(e) => handleAddImage(e.target.value)}
            />
            <button onClick={() => setShowImageForm(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
