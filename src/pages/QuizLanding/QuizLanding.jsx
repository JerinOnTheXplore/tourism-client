import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkedAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const questions = [
  {
    id: 1,
    question: "What's your preferred climate?",
    options: ["Sunny & Warm", "Cool & Misty", "Snowy Mountains", "Tropical Rainforest"],
  },
  {
    id: 2,
    question: "What's your travel style?",
    options: ["Relax & Chill", "Adventure & Hiking", "Cultural Tours", "Luxury Experience"],
  },
  {
    id: 3,
    question: "Pick your ideal destination type:",
    options: ["Beach", "Mountain", "City", "Countryside"],
  },
];

const QuizLanding = () => {
    const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
  if (Object.keys(answers).length !== questions.length) {
    Swal.fire({
      icon: "warning",
      title: "Oops!",
      text: "Please answer all the questions before submitting.",
      confirmButtonColor: "#2563EB", // Tailwind blue-600
    });
    return;
  }

  // Submission success
  Swal.fire({
    icon: "success",
    title: "Submitted!",
    text: "We’ve found some perfect destinations for you ✈️",
    confirmButtonColor: "#2563EB",
  }).then(() => {
    setSubmitted(true);
  });
};


  return (
    <section className="min-h-screen  flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full text-center space-y-6 ">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <FaMapMarkedAlt className="text-6xl text-blue-600 mx-auto mb-2 animate-bounce" />
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
            Discover Your Ideal Travel Spot!
          </h1>
          <p className=" mb-4">Answer a few quick questions and find your perfect match ✈️</p>
        </motion.div>

        {!submitted ? (
          <form className="space-y-8 ">
            {questions.map((q) => (
              <div key={q.id} className=" p-6 rounded-xl shadow border text-left">
                <h3 className="text-lg font-semibold mb-3">{q.question}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {q.options.map((opt) => (
                    <label
                      key={opt}
                      className={`cursor-pointer px-4 py-2 rounded-md border transition
                      ${
                        answers[q.id] === opt
                          ? "bg-blue-600  border-blue-600"
                          : "  hover:border-blue-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={() => handleOptionSelect(q.id, opt)}
                        className="hidden"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              type="button"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition"
            >
              Submit & Show Result
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Your Travel Vibe Suggests:</h2>
            <p className="text-lg text-gray-700">
              Based on your answers, we recommend visiting{" "}
              <span className="font-semibold text-blue-600">Bali, Switzerland, or Kyoto</span>! 🌍
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default QuizLanding;
