import { createContext, useState, useContext } from 'react';

const QuestionsContext = createContext();

export function useQuestions() {
  return useContext(QuestionsContext);
}

export function QuestionsProvider({ children }) {
  const [generatedQuestions, setGeneratedQuestions] = useState('');

  const value = {
    generatedQuestions,
    setGeneratedQuestions
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
}