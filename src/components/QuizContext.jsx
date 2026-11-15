import { useState, useContext, createContext } from "react";
const QuizContext = createContext(null);

export function ContextProvider({ children }) {
  const [selectedId, setSelectedId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [answers, setAnswers] = useState({});
  const [questionCount, setQuestionCount] = useState(0);
  const startQuiz = (id, questionCount) => {
    setSelectedId(id);
    setTimeLeft(300);
    setIsRunning(true);
    setAnswers({});
    setQuestionCount(questionCount);
  };
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
        questionCount,
        startQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
export function useQuiz() {
  return useContext(QuizContext);
}
