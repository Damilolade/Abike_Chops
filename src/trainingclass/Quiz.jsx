import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();

  // Quiz state
  const [quizData] = useState([
    {
      question: "What is a finger food?",
      options: [
        "Food eaten with utensils",
        "Food eaten with hands",
        "Food only for dessert",
        "Food served cold",
      ],
      answer: 1,
    },
    {
      question: "Which of these is a savory finger food?",
      options: ["Mini quiche", "Cake", "Ice cream", "Pasta"],
      answer: 0,
    },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [registeredData, setRegisteredData] = useState(null);

  useEffect(() => {
    // Load registration info
    const data = JSON.parse(localStorage.getItem("ourclass"));

    if (!data || !data.registered) {
      alert("❌ You must register before taking the quiz!");
      navigate("/training/classform");
      return;
    }

    // Check expiry
    const now = new Date();
    if (new Date(data.expiresAt) < now) {
      alert("❌ Your registration has expired!");
      navigate("/training/expired");
      return;
    }

    setRegisteredData(data);
  }, [navigate]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      alert("Please select an answer!");
      return;
    }

    // Check answer
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }

    setSelectedOption(null);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(
        `🎉 Quiz completed! Your score: ${score + (selectedOption === quizData[currentQuestion].answer ? 1 : 0)} / ${quizData.length}`,
      );
      // Optionally, mark lesson as completed
      const updatedData = {
        ...registeredData,
        completedLessons: [
          ...(registeredData.completedLessons || []),
          registeredData.currentLesson,
        ],
        currentLesson: registeredData.currentLesson + 1,
      };
      localStorage.setItem("ourclass", JSON.stringify(updatedData));
      navigate("/training/ourclass"); // redirect after quiz
    }
  };

  if (!registeredData) return null; // prevents flash before redirect

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-50 via-white to-pink-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Lesson {registeredData.currentLesson} Quiz
        </h2>
        <p className="mb-6 text-gray-700">
          Question {currentQuestion + 1} of {quizData.length}
        </p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            {quizData[currentQuestion].question}
          </h3>
          <ul className="mt-3 space-y-2">
            {quizData[currentQuestion].options.map((opt, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full text-left px-4 py-2 rounded-lg border ${
                    selectedOption === idx
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleNext}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold"
        >
          {currentQuestion + 1 === quizData.length
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
