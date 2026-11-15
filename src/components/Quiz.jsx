import { useState, useEffect } from "react";
import data from "../data/quiz.json";
import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const {
    selectedId,
    isRunning,
    setIsRunning,
    timeLeft,
    setTimeLeft,
    answers,
    setAnswers,
    questionCount,
  } = useQuiz();

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) {
      setIsRunning(false);
      navigate("/answers");
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, navigate, setIsRunning, setTimeLeft, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  if (selectedId === null || selectedId === undefined) return null;
  const questionList = data.quizzes[selectedId]?.questions ?? [];
  const questions = questionList[current];
  if (!questions) return null;

  const answerForCurrent = answers[current] ?? selected;

  function handleNext() {
    setAnswers((prev) => ({ ...prev, [current]: selected }));
    setCurrent((prev) => prev + 1);
    setSelected(null);
  }

  function handleSubmit() {
    setIsRunning(false);
    setAnswers((prev) => ({ ...prev, [current]: selected }));
    navigate("/answers");
  }
  return (
    <div>
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">Question {current + 1} of {questionList.length}</p>
            <div className="mt-3 h-2 w-40 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 sm:w-64">
              <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${((current + 1) / questionList.length) * 100}%` }} />
            </div>
          </div>
          <div className={`rounded-2xl px-4 py-3 text-center font-mono text-lg font-bold ${timeLeft < 60 ? "bg-rose-100 text-rose-600" : "bg-indigo-100 text-indigo-700"}`}>
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
        <h1 className="text-2xl font-black leading-snug text-slate-900 dark:text-white sm:text-3xl">
          {questions.question}
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-3">
          {questions["options"].map((val, ind) => (
            <label
              key={ind}
              htmlFor={ind + "-radio"}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 text-base font-semibold transition sm:text-lg ${answerForCurrent === val ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : "border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"}`}
            >
              <input
                type="radio"
                value={val}
                id={ind + "-radio"}
                name="options"
                checked={answerForCurrent === val}
                onChange={() => {
                  setSelected(val);
                }}
                className="hidden"
              />
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${answerForCurrent === val ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>{String.fromCharCode(65 + ind)}</span>
              {val}
            </label>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between">
          {current > 0 ? (
            <button
              className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              onClick={() => {
                const previous = current - 1;
                setCurrent(previous);
                setSelected(answers[previous] ?? null);
              }}
            >
              Prev
            </button>
          ) : (
            ""
          )}

          {current < questionCount - 1 && selected ? (
            <button
              onClick={handleNext}
              className="rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Next
            </button>
          ) : (
            ""
          )}
          {current === questionCount - 1 && selected ? (
            <button
              onClick={handleSubmit}
              className="rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Submit
            </button>
          ) : (
            ""
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
