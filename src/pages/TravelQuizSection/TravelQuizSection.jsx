import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaGlobeAsia } from "react-icons/fa";
import TypingHeading from "../../components/TypingHeading";


const TravelQuizSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center bg-gradient-to-br from-[#63aedc] via-[#4194cc] to-[#2a75b3] rounded">
        <motion.div
          className="inline-block"
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-br from-[#e0f4ff] via-[#f7fbff] to-[#e0f4ff] p-8 rounded-xl shadow-xl border border-blue-200 max-w-xl mx-auto">
            <FaGlobeAsia className="text-5xl text-[#2a75b3] mx-auto mb-4" />
            
            <TypingHeading />

            <p className="text-gray-600 mb-6">
              Not sure where to go next? Take a quick quiz and we’ll match you with the perfect place.
            </p>
            <Link
              to="/quiz"
              className="bg-[#2a75b3] hover:bg-[#4194cc] text-white px-6 py-2 rounded font-semibold transition"
            >
              Take the Quiz
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelQuizSection;
