import { useState } from "react";
import data from "../data/quiz.json";
import { useQuiz } from "./QuizContext";

export default function Quiz() {
  const [selected, setSelected] = useState(null);
  const { selectedId } = useQuiz();
  if (selectedId === null || selectedId === undefined) return null;
  const questions = data["quizzes"][selectedId]["questions"];
  return (
    <div>
      {questions.map((value, index) => (
        <div
          key={index}
          className="bg-white py-4 px-6 rounded-md border text-black flex flex-col gap-6"
        >
          <h1 className="font-display font-semibold text-2xl">
            Q: {value["question"]}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {value["options"].map((val, ind) => (
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
        </div>
      ))}
    </div>
  );
}
