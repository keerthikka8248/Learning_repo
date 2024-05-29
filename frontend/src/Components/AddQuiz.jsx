import React, { useState } from 'react';
import './AddQuiz.css';

const AddQuiz = () => {
  const [conceptId, setConceptId] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', questionType: 'multipleChoice', options: [], correctAnswer: '' }]);
  const [message, setMessage] = useState('');

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', questionType: 'multipleChoice', options: [], correctAnswer: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push('');
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/add-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conceptId, questions })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Quiz questions added successfully');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error adding quiz questions:', error);
      setMessage('Error adding quiz questions');
    }
  };

  return (
    <div className="admin-add-quiz">
      <h2>Add Quiz Questions</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="conceptId">Concept ID</label>
          <input
            type="text"
            id="conceptId"
            value={conceptId}
            onChange={(e) => setConceptId(e.target.value)}
            required
          />
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="question-block">
            <div className="input-group">
              <label htmlFor={`question-${qIndex}`}>Question Text</label>
              <input
                type="text"
                id={`question-${qIndex}`}
                value={question.questionText}
                onChange={(e) => handleInputChange(qIndex, 'questionText', e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor={`questionType-${qIndex}`}>Question Type</label>
              <select
                id={`questionType-${qIndex}`}
                value={question.questionType}
                onChange={(e) => handleInputChange(qIndex, 'questionType', e.target.value)}
                required
              >
                <option value="multipleChoice">Multiple Choice</option>
                <option value="trueFalse">True/False</option>
                <option value="shortAnswer">Short Answer</option>
              </select>
            </div>
            {question.questionType === 'multipleChoice' && (
              <>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="input-group">
                    <label htmlFor={`option-${qIndex}-${oIndex}`}>Option {oIndex + 1}</label>
                    <input
                      type="text"
                      id={`option-${qIndex}-${oIndex}`}
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      required
                    />
                  </div>
                ))}
                <button type="button" onClick={() => handleAddOption(qIndex)} className='addOption'>Add Option</button>
              </>
            )}
            <div className="input-group">
              <label htmlFor={`correctAnswer-${qIndex}`}>Correct Answer</label>
              <input
                type="text"
                id={`correctAnswer-${qIndex}`}
                value={question.correctAnswer}
                onChange={(e) => handleInputChange(qIndex, 'correctAnswer', e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion} className='addQuiz-submit'>Add Another Question</button>
        <button type="submit" className='addQuiz-submit'>Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddQuiz;
