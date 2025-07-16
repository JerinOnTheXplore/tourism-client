import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TypingHeading = () => {
  const headings = [
    { text: "Find Your Ideal Destination", color: "text-blue-700" },
    { text: "Explore Hidden Gems", color: "text-sky-600" },
    { text: "Discover Local Cultures", color: "text-cyan-700" },
    { text: "Plan Memorable Journeys", color: "text-blue-800" },
    { text: "Travel with Confidence", color: "text-indigo-600" },
    { text: "Your Adventure Starts Here", color: "text-teal-700" },
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = headings[textIndex].text;
    let timeout;

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText.charAt(charIndex));
        setCharIndex(charIndex + 1);
      }, 80);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex(charIndex - 1);
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(!isDeleting);
        if (!isDeleting) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else {
          setTextIndex((prev) => (prev + 1) % headings.length);
          setCharIndex(0);
        }
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <motion.h2
      className={`text-3xl font-bold mb-4 min-h-[48px] ${
        headings[textIndex].color
      }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {displayedText}
      <motion.span
        className="inline-block w-[2px] h-6 bg-current ml-1 align-middle"
        animate={{ opacity: [0, 1] }}
        transition={{ repeat: Infinity, duration: 0.6 }}
      />
    </motion.h2>
  );
};

export default TypingHeading;
