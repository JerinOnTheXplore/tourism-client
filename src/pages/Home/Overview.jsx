import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCampground, FaMapMarkedAlt, FaPeopleCarry, FaUmbrellaBeach, FaUtensils, FaVideo } from "react-icons/fa";


const Overview = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className=" py-36 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Title */}
        <div data-aos="zoom-in" className="text-center">
          <h2 className="text-4xl font-bold mb-4 flex justify-center items-center gap-3">
            <FaMapMarkedAlt className="text-blue-500" />
            Overview of Our Journey
          </h2>
          <p className=" max-w-3xl mx-auto text-lg">
            We are dedicated to bringing you the heart of Bangladesh through immersive videos, expert travel guidance, and the hidden beauty most miss.
          </p>
        </div>

        {/* First Row */}
        <div
          className="flex flex-col lg:flex-row items-center gap-10"
          data-aos="flip-right"
        >
          {/* Text */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-4">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <FaUmbrellaBeach className="text-blue-500" />
              Explore Unseen Destinations
            </h3>
            <p className=" text-lg">
              From the misty hills of Sylhet to the golden sands of Cox’s Bazar, discover iconic landmarks and hidden gems with ease.
            </p>
            <ul className="space-y-2  text-base mt-4">
              <li className="flex items-center gap-2">
                <FaCampground className="text-blue-400" />
                50+ Natural Spots Covered
              </li>
              <li className="flex items-center gap-2">
                <FaPeopleCarry className="text-blue-400" />
                Local Community Insights
              </li>
            </ul>
          </div>

          {/* Video */}
          <div className="lg:w-1/2 shadow-lg transform hover:scale-105 transition duration-500 rounded-xl overflow-hidden">
            <iframe
              className="w-full h-64 sm:h-80 md:h-96 rounded-xl"
              src="https://www.youtube.com/embed/k8C949_CZUo"
              title="Discover Bangladesh"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Second Row */}
        <div
          className="flex flex-col-reverse lg:flex-row items-center gap-10"
          data-aos="flip-left"
        >
          {/* Video */}
          <div className="lg:w-1/2 shadow-lg transform hover:scale-105 transition duration-500 rounded-xl overflow-hidden">
            <iframe
              className="w-full h-64 sm:h-80 md:h-96 rounded-xl"
              src="https://www.youtube.com/embed/iIMJ_GHCr2Q"
              title="Cultural Tour of Bangladesh"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Text */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-4">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <FaUtensils className="text-blue-500" />
              Dive into Culture & Cuisine
            </h3>
            <p className=" text-lg">
              Taste the flavors of Bangladesh while learning about the unique traditions, music, and lifestyle of its diverse communities.
            </p>
            <ul className="space-y-2  text-base mt-4">
              <li className="flex items-center gap-2">
                <FaVideo className="text-blue-400" />
                Curated Travel Documentaries
              </li>
              <li className="flex items-center gap-2">
                <FaUtensils className="text-blue-400" />
                Authentic Food Guides
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
