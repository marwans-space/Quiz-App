import { useState, useEffect } from "react";
import data from "../data/quiz.json";
import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router";

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
    setAnswers,
  } = useQuiz();

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) {
      setIsRunning(false);
      navigate("/answers");
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  if (selectedId === null || selectedId === undefined) return null;
  const questions = data["quizzes"][selectedId]["questions"][current];

  function handleNext() {
    setCurrent((prev) => prev + 1);
    setAnswers((prev) => ({ ...prev, [current]: selected }));
    setSelected(null);
  }

  function handleSubmit() {
    setIsRunning(false);
    setAnswers((prev) => ({ ...prev, [current]: selected }));
    navigate("/answers");
  }
  return (
    <div>
      <div className="bg-white py-4 px-6 rounded-md border text-black flex flex-col gap-6">
        <div className="bg-mist-500 text-white text-2xl font-display py-2 px-4 rounded-md text-center">
          Time: {minutes}:{seconds}
        </div>
        <h1 className="font-display font-semibold text-2xl">
          Q: {questions.question}
        </h1>
        <div key={current} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {questions["options"].map((val, ind) => (
            <label
              key={ind}
              htmlFor={ind + "-radio"}
              className={`text-xl font-sans text-center rounded-md text-white bg-mist-500 hover:bg-mist-300 hover:cursor-pointer ${selected === val ? "border-2 border-black" : "border"}`}
            >
              <input
                type="radio"
                value={val}
                id={ind + "-radio"}
                name="options"
                checked={selected === val}
                onChange={() => {
                  setSelected(val);
                }}
                className="hidden"
              />
              {val}
            </label>
          ))}
        </div>
        <div className="flex justify-between items-center ">
          {current > 0 ? (
            <button
              onClick={() => {
                setCurrent((prev) => prev - 1);
              }}
              className="font-sans text-xl font-semibold bg-mist-500 text-white py-2 px-6 rounded-md shadow-2xl cursor-pointer hover:bg-mist-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              Prev
            </button>
          ) : (
            ""
          )}

          {current < 9 && selected ? (
            <button
              onClick={handleNext}
              className="font-sans text-xl font-semibold bg-mist-500 text-white py-2 px-6 rounded-md shadow-2xl cursor-pointer hover:bg-mist-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              Next
            </button>
          ) : (
            ""
          )}
          {current === 9 && selected ? (
            <button
              onClick={handleSubmit}
              className="font-sans text-xl font-semibold bg-mist-500 text-white py-2 px-6 rounded-md shadow-2xl cursor-pointer hover:bg-mist-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              Submit
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
