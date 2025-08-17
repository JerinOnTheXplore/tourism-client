import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaGlobeAsia } from "react-icons/fa";
import TypingHeading from "../../components/TypingHeading";


const TravelQuizSection = () => {
  return (
    <section className=" py-20 px-4 md:px-16 lg:px-36">
      <div className="max-w-7xl mx-auto text-center bg-[#2a75b3]/60 dark:bg-[#1a4f73]/60 rounded">
        <motion.div
          className="inline-block"
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className=" p-8 rounded-xl backdrop-blur-lg shadow-xl border border-blue-200 max-w-xl mx-auto">
            <FaGlobeAsia className="text-5xl  mx-auto mb-4" />
            
            <TypingHeading />

            <p className=" mb-6">
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
