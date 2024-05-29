import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Quiz.css'; // Import the CSS file

const Quiz = () => {
  const { conceptId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(null); // State to hold the score

  useEffect(() => {
    if (!conceptId) {
      setError('Concept ID is not provided');
      setLoading(false);
      return;
    }

    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:8000/quiz/${conceptId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching quiz data');
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [conceptId]);

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedOption,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/quiz/${conceptId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'someUserId', // Replace with actual user ID
          answers: selectedAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      const result = await response.json();
      setScore(result.score); // Set the score after submission
      console.log('Quiz submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!questions || questions.length === 0) return <div className="no-questions">No quiz questions available.</div>;

  return (
    <div className="quiz-container">
      <h1 className="quiz-header">{conceptId} Quiz</h1>
      {questions.map((question) => (
        <div className="question" key={question._id}>
          <h3>{question.questionText}</h3>
          <div className="options">
            {question.questionType === 'multipleChoice' && question.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={question._id}
                  value={option}
                  checked={selectedAnswers[question._id] === option}
                  onChange={() => handleOptionChange(question._id, option)}
                />
                {option}
              </label>
            ))}
            {question.questionType === 'trueFalse' && ['True', 'False'].map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={question._id}
                  value={option}
                  checked={selectedAnswers[question._id] === option}
                  onChange={() => handleOptionChange(question._id, option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button className="quiz-submit-button" onClick={handleSubmit}>Submit</button>
      {score !== null && <div className="quiz-score">Your score: {score}</div>}
    </div>
  );
};

export default Quiz;
