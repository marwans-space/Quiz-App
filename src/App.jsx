import Home from "./components/Home";
import { ContextProvider } from "./components/QuizContext";
import Quiz from "./components/Quiz";
import { BrowserRouter, Route, Routes } from "react-router";
import Answer from "./components/Answer";
import NotFound from "./components/NotFound";
export default function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-screen">
      <h1 className="font-bold font-sans text-4xl my-8 mx-auto border-b w-screen text-center pb-4">
        Quiz App
      </h1>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/answers" element={<Answer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}
