import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import {
  FaMapSigns,
  FaUserTie,
  FaDollarSign,
  FaGlobe,
  FaRegCalendarAlt,
  FaSuitcaseRolling
} from "react-icons/fa";
import { Link } from "react-router";

const PackagesAndGuides = () => {
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/packages")
      .then(res => setPackages(res.data))
      .catch(err => console.error("Failed to load packages", err));

    axios.get("http://localhost:5000/api/guides")
      .then(res => setGuides(res.data))
      .catch(err => console.error("Failed to load guides", err));
  }, []);

  return (
    <section className="py-10 px-6 md:px-20 bg-gradient-to-br from-[#e0f4ff] via-[#f7fbff] to-[#e0f4ff]">
      <h2 className="text-4xl font-bold text-center mb-12 tracking-wide 
             bg-gradient-to-r from-gray-700 via-gray-500 to-gray-400 
             text-transparent bg-clip-text" data-aos="zoom-in">
        <FaSuitcaseRolling className="inline-block text-4xl mr-3" /> Tourism and Travel Guide
      </h2>

      <Tabs selectedTabClassName="!text-slate-500 !border-b-4  !border-slate-500 font-bold">
        <TabList className="flex justify-center gap-10 font-bold text-lg text-gray-600 border-b border-dashed border-gray-400 pb-5 mb-8">
          <Tab className="cursor-pointer hover:text-blue-300 px-4">Tour Packages</Tab>
          <Tab className="cursor-pointer hover:text-slate-500 px-4">Top Tour Guides</Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.map(pkg => (
              <div
                key={pkg._id}
                className="relative bg-gradient-to-br from-[#cceeff] via-[#e8f4ff] to-[#fdf7f4] p-6 shadow-xl border border-white border-opacity-20 transform hover:scale-105 transition duration-500"
                data-aos="fade-up"
              >
                <div className="absolute -top-6 -left-6 bg-slate-500 text-white p-3 rounded-full shadow-lg">
                  <FaMapSigns className="text-xl" />
                </div>
                <img
                  src={pkg.photo}
                  alt={pkg.title}
                  className="rounded-xl h-52 w-full object-cover mb-4 shadow-md border-2 border-white"
                />
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-600">{pkg.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaSuitcaseRolling className="text-gray-400 font-semibold" /> Type: {pkg.type}
                  </p>
                  <p className="text-lg text-slate-600 font-semibold flex items-center gap-2">
                    <FaDollarSign /> {pkg.price} BDT
                  </p>
                  <Link
                    to={`/packages/${pkg._id}`}
                    className="inline-block mt-3 bg-slate-500 hover:bg-blue-400 text-white text-sm px-5 py-2 rounded-sm transition"
                  >
                    View Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 gap-10">
            {guides.map(guide => (
              <div
                key={guide._id}
                className="relative text-center bg-gradient-to-br from-[#cceeff] via-[#e8f4ff] to-[#fdf7f4] backdrop-blur-md border border-white border-opacity-20  p-8 shadow-xl hover:scale-[1.02] transition-all duration-300"
                data-aos="fade-up"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-300 p-3 rounded-full shadow-lg">
                  <FaUserTie className="text-white text-xl" />
                </div>
                <img
                  src={guide.photo}
                  alt={guide.name}
                  className="w-28 h-28 object-cover rounded-full mx-auto mt-6 border-4 border-gray-500 shadow-lg"
                />
                <h4 className="text-xl font-semibold mt-4 text-slate-600">{guide.name}</h4>
                <p className="text-sm text-gray-500 flex justify-center items-center gap-2 mt-1">
                  <FaRegCalendarAlt className="text-slate-500 font-medium" /> {guide.experience} years experience
                </p>
                <p className="text-sm text-gray-600 mt-1 flex justify-center items-center gap-2">
                  <FaGlobe className="text-gray-400" /> {guide.language}
                </p>
                <Link
                  to={`/guides/${guide._id}`}
                  className="inline-block mt-4 bg-slate-600 hover:bg-gray-500 text-white text-sm px-5 py-2  transition"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default PackagesAndGuides;
