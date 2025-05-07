import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import { QuestionsProvider } from './context/QuestionsContext';
import './App.css';

function App() {
  return (
    <QuestionsProvider>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>PDF Question Generator</h1>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QuestionsProvider>
  );
}

export default App;