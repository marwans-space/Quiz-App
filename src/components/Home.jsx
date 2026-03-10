import { useNavigate } from "react-router";
import data from "../data/quiz.json";
import { useQuiz } from "./QuizContext";
export default function Home() {
  const categories = data["quizzes"];
  const { setSelectedId, setIsRunning, setTimeLeft } = useQuiz();
  const navigate = useNavigate();
  const handleClick = (e) => {
    setSelectedId(parseInt(e.currentTarget.id));
    navigate("/quiz");
    setTimeLeft(300);
    setIsRunning(true);
  };

  return (
    <div className="rounded-md grid grid-cols lg:grid-cols-3 gap-20 mb-6">
      {categories.map((value, index) => (
        <div key={index}>
          <div
            className="w-75 h-75 relative group"
            id={index + value.category}
            onClick={handleClick}
          >
            <div>
              <img
                src={value.img}
                alt={value.category}
                className="absolute z-1 rounded-md object-cover"
              />
              <div className="absolute bg-black/50 w-full h-full flex items-center justify-center rounded-md group-hover:z-2 cursor-pointer">
                <button className="font-semibold text-white text-3xl bg-mist-700 py-2 px-6 rounded-md cursor-pointer">
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
          <p className="font-display font-semibold text-xl text-center">
            {value["title"]}
          </p>
        </div>
      ))}
    </div>
  );
}
