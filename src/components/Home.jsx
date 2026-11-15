import { useNavigate } from "react-router-dom";
import data from "../data/quiz.json";
import { useQuiz } from "./QuizContext";

export default function Home() {
  const categories = data.quizzes;
  const { startQuiz } = useQuiz();
  const navigate = useNavigate();

  const handleStart = (index) => {
    startQuiz(index, categories[index].questions.length);
    navigate("/quiz");
  };

  return (
    <div className="space-y-12">
      <section className="max-w-3xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Pick your challenge</p>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
          A smarter way to <span className="text-indigo-600">test yourself.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
          Choose a topic, settle in, and see how much you know. Every quiz has 10 questions and five minutes on the clock.
        </p>
      </section>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((value, index) => (
          <article key={value.category} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-indigo-950">
            <div className="relative h-52 overflow-hidden">
              <img src={value.img} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
              <span className="absolute bottom-4 left-5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {value.category}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 p-5">
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white">{value.title}</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{value.questions.length} questions - 5 min</p>
              </div>
              <button onClick={() => handleStart(index)} className="shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100">
                Start
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
