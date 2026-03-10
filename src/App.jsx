import Home from "./components/Home";
import { ContextProvider } from "./components/QuizContext";
import Quiz from "./components/Quiz";
import { BrowserRouter, Route, Routes } from "react-router";
import Answer from "./components/Answer";
import NotFound from "./components/NotFound";
export default function App() {
  return (
    <>
      <main className="flex flex-col justify-center items-center gap-8 w-screen">
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
      </main>
      <footer className="flex flex-col gap-6 items-center justify-center border-t pt-2 mt-8 h-fit">
        <p className="font-display text-white text-lg">
          &copy; Made by Marwan.
        </p>
        <nav className="flex justify-around items-center gap-4">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/marwannasser"
            className="font-sans underline hover:text-gray-300 active:text-gray-500"
          >
            LinkedIn
          </a>
          <a
            target="_blank"
            href="https://github.com/marwans-space"
            className="font-sans underline hover:text-gray-300 active:text-gray-500"
          >
            GitHub
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/marwannasser_"
            className="font-sans underline hover:text-gray-300 active:text-gray-500"
          >
            Instagram
          </a>
        </nav>
      </footer>
    </>
  );
}
