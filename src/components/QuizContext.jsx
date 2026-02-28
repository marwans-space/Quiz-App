import { useState, useContext, createContext } from "react";
const QuizContext = createContext();

export function ContextProvider({ children }) {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <QuizContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </QuizContext.Provider>
  );
}
export function useQuiz() {
  return useContext(QuizContext);
}
