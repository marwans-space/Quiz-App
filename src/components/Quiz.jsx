import { useState } from "react";
import data from "../data/quiz.json";
import { useQuiz } from "./QuizContext";
const answers = [];

export default function Quiz() {
  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);
  const [seeFullAnswers, setSeeFullAnswers] = useState(false);
  const { selectedId } = useQuiz();
  if (selectedId === null || selectedId === undefined) return null;
  const questions = data["quizzes"][selectedId]["questions"][current];

  const correctAns = data.quizzes[selectedId].questions;

  function checkAnswers() {
    for (let ans of answers) {
      for (let i = 0; i < answers.size; i++) {
        if (ans === correctAns[i].answer) {
          setScore((prev) => prev + 1);
        }
      }
    }
    return score;
  }

  function handleNext() {
    setCurrent((prev) => prev + 1);
    answers.push(selected);
    console.log(answers);
    setSelected(null);
  }

  function handleSubmit() {
    answers.push(selected);
    const answers = new Set(answers);
    setHasFinished(true);
  }
  return (
    <div>
      {!hasFinished ? (
        <div className="bg-white py-4 px-6 rounded-md border text-black flex flex-col gap-6">
          <div className="bg-mist-500 text-white text-2xl font-display py-2 px-4 rounded-md text-center">
            Time: {}
          </div>
          <h1 className="font-display font-semibold text-2xl">
            Q: {questions.question}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                  selected={selected === val}
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
      ) : !seeFullAnswers ? (
        <div className="bg-white py-4 px-6 rounded-md border text-black flex flex-col gap-3 text-center">
          <h1 className="font-sans font-semibold text-4xl uppercase">
            Great job!
          </h1>
          <p className="text-2xl font-sans">Score: {checkAnswers()}/10</p>
          <a
            className="text-lg underline text-mist-700 hover:text-mist-500 cursor-pointer"
            onClick={() => {
              setSeeFullAnswers(true);
            }}
          >
            See full answers..?
          </a>
        </div>
      ) : (
        data["quizzes"][selectedId]["questions"].map((value, index) => (
          <div
            key={index}
            className="bg-white py-4 px-6 rounded-md border text-black flex flex-col gap-6"
          >
            <h1 className="font-display font-semibold text-2xl">
              Q: {value.question}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {value["options"].map((val, ind) => (
                <label
                  key={ind}
                  className={`text-xl font-sans text-center rounded-md border-4 text-white bg-mist-500 hover:bg-mist-300 hover:cursor-pointer ${val === value.answer ? "border-2 border-green-400" : ""}`}
                >
                  {val}
                </label>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
