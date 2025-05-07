import UploadForm from '../components/UploadForm';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-content">
        <div className="intro-section">
          <h2>Generate Questions from PDF Documents</h2>
          <p>
            Upload a PDF document, enter your query, and select a difficulty level.
            Our system will analyze the document and generate relevant questions.
          </p>
        </div>
        
        <UploadForm />
      </div>
    </div>
  );
}

export default HomePage;