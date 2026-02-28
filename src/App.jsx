import Home from "./components/Home";
import { ContextProvider } from "./components/QuizContext";
import Quiz from "./components/Quiz";

export default function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-screen">
      <h1 className="font-bold font-sans text-4xl my-8 mx-auto border-b w-screen text-center pb-4">
        Quiz App
      </h1>
      <ContextProvider>
        <Home />
        <Quiz />
      </ContextProvider>
    </div>
  );
}
