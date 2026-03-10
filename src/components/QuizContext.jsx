import { useState, useContext, createContext } from "react";
const QuizContext = createContext();

export function ContextProvider({ children }) {
  const [selectedId, setSelectedId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [answers, setAnswers] = useState({});
  return (
    <QuizContext.Provider
      value={{
        selectedId,
        setSelectedId,
        timeLeft,
        isRunning,
        setTimeLeft,
        setIsRunning,
        answers,
        setAnswers,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
export function useQuiz() {
  return useContext(QuizContext);
}
