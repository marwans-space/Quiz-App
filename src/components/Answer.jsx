import { useQuiz } from "./QuizContext";
import data from "../data/quiz.json";
import { useState, useMemo } from "react";

export default function Answer() {
  const [seeFullAnswers, setSeeFullAnswers] = useState(false);
  const { selectedId, answers } = useQuiz();

  const score = useMemo(() => {
    const correctAns = data.quizzes[selectedId].questions;
    return Object.entries(answers).reduce((count, [index, ans]) => {
      return ans === correctAns[index]?.answer ? count + 1 : count;
    }, 0);
  }, [answers, selectedId]);
  return !seeFullAnswers ? (
    <div className="bg-white py-4 px-6 rounded-md border text-black flex flex-col gap-3 text-center">
      <h1 className="font-sans font-semibold text-4xl uppercase">Great job!</h1>
      <p className="text-2xl font-sans">Score: {score}/10</p>
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
    <div className="grid grid-rows-10">
      {data["quizzes"][selectedId]["questions"].map((value, index) => (
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
      ))}
    </div>
  );
}
