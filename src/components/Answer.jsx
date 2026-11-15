import { useQuiz } from "./QuizContext";
import data from "../data/quiz.json";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function Answer() {
  const [seeFullAnswers, setSeeFullAnswers] = useState(false);
  const { selectedId, answers } = useQuiz();

  const quiz = selectedId === null ? null : data.quizzes[selectedId];
  const score = useMemo(() => {
    if (!quiz) return 0;
    const correctAns = quiz.questions;
    return Object.entries(answers).reduce((count, [index, ans]) => {
      return ans === correctAns[index]?.answer ? count + 1 : count;
    }, 0);
  }, [answers, quiz]);
  if (!quiz) return <Link to="/" className="font-bold text-indigo-600">Choose a quiz to begin.</Link>;
  return !seeFullAnswers ? (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-12">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl">✓</span>
      <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Quiz complete</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white">Nice work!</h1>
      <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">You scored <strong className="text-slate-900 dark:text-white">{score}/{quiz.questions.length}</strong></p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
      <Link to="/" className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-600 transition hover:bg-slate-50">
        Try another
      </Link>
      <button
        className="rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
        onClick={() => {
          setSeeFullAnswers(true);
        }}
      >
        Review answers
      </button>
      </div>
    </div>
  ) : (
    <div className="space-y-4">
      <div className="mb-8 flex items-end justify-between">
        <div><p className="text-sm font-bold uppercase tracking-wider text-indigo-600">Answer key</p><h1 className="mt-2 text-3xl font-black text-slate-900">Review your answers</h1></div>
        <Link to="/" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">New quiz</Link>
      </div>
      {quiz.questions.map((value, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        >
          <p className="text-sm font-bold text-slate-400">Question {index + 1}</p>
          <h2 className="mt-2 font-bold">{value.question}</h2>
          <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">Correct answer: {value.answer}</p>
        </div>
      ))}
    </div>
  );
}
