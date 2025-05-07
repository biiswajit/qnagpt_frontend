import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadPDFAndQuery } from '../utils/api';
import { useQuestions } from '../context/QuestionsContext';
import './UploadForm.css';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setGeneratedQuestions } = useQuestions();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please select a valid PDF file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a PDF file');
      return;
    }
    
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      console.log('Submitting form with:', {
        file: file.name,
        query,
        difficulty
      });
      
      const result = await uploadPDFAndQuery(file, query, difficulty);
      console.log('API response received');
      setGeneratedQuestions(result);
      
      // Redirect to results page
      navigate('/results');
    } catch (err) {
      console.error('Error details:', err);
      setError(`Failed to generate questions: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="pdf-upload">Upload PDF</label>
          <input
            type="file"
            id="pdf-upload"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={isLoading}
          />
          {file && <p className="file-name">Selected: {file.name}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="query-input">Your Query</label>
          <textarea
            id="query-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your question or topic of interest..."
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="difficulty-select">Difficulty Level</label>
          <select
            id="difficulty-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={isLoading}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Questions'}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;