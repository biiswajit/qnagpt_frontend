import { useQuestions } from '../context/QuestionsContext';
import { useNavigate } from 'react-router-dom';
import './QuestionResults.css';

function QuestionResults() {
  const { generatedQuestions } = useQuestions();
  const navigate = useNavigate();
  
  // If no questions have been generated, redirect to home
  if (!generatedQuestions) {
    navigate('/');
    return null;
  }
  
  return (
    <div className="question-results-container">
      <div className="results-header">
        <h2>Generated Questions</h2>
        <button className="back-button" onClick={() => navigate('/')}>
          Generate New Questions
        </button>
      </div>
      
      <div className="results-content">
        <pre className="questions-text">{generatedQuestions}</pre>
      </div>
    </div>
  );
}

export default QuestionResults;