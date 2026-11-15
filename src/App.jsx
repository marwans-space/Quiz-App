import Home from "./components/Home";
import { ContextProvider } from "./components/QuizContext";
import Quiz from "./components/Quiz";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Answer from "./components/Answer";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";

export default function App() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("quizly-theme") === "dark");

  useEffect(() => {
    localStorage.setItem("quizly-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ContextProvider>
      <BrowserRouter>
        <div className={isDark ? "dark min-h-screen" : "min-h-screen"}>
          <div className="min-h-screen bg-[#f7f8fc] text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
          <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-colors dark:border-slate-800 dark:bg-slate-950/80">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
              <Link to="/" className="flex items-center gap-3" aria-label="Quizly home">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-black text-white shadow-lg shadow-indigo-200">
                  Q
                </span>
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Quizly
                </span>
              </Link>
              <div className="flex items-center gap-3">
                <span className="hidden rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 sm:block">
                  Learn something new
                </span>
                <button
                  type="button"
                  aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                  title={isDark ? "Switch to light theme" : "Switch to dark theme"}
                  onClick={() => setIsDark((current) => !current)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-300 dark:focus:ring-indigo-950"
                >
                  {isDark ? (
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                      <circle cx="12" cy="12" r="4" />
                      <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                    </svg>
                  ) : (
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </header>
          <main className="mx-auto flex w-full max-w-7xl flex-col px-5 py-10 sm:px-8 sm:py-14">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/answers" element={<Answer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p>&copy; {new Date().getFullYear()} Quizly. Built by Marwan.</p>
              <nav className="flex gap-5">
                <a target="_blank" rel="noreferrer" href="https://github.com/marwans-space" className="font-semibold transition hover:text-indigo-600">GitHub</a>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/marwannasser" className="font-semibold transition hover:text-indigo-600">LinkedIn</a>
              </nav>
            </div>
          </footer>
          </div>
        </div>
      </BrowserRouter>
    </ContextProvider>
  );
}
