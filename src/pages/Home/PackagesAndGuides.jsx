import { useQuery } from "@tanstack/react-query";
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
  FaSuitcaseRolling,
} from "react-icons/fa";
import { Link } from "react-router";
import Marquee from "react-fast-marquee";
import { MdTravelExplore } from "react-icons/md";
import { useEffect } from "react";
import Loading from "../loading/Loading";

const fetchPackages = async () => {
  const res = await axios.get("https://tourism-server-delta.vercel.app/api/packages");
  return res.data;
};

const fetchGuides = async () => {
  const res = await axios.get("https://tourism-server-delta.vercel.app/api/guides");
  return res.data;
};

const PackagesAndGuides = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const {
    data: packages = [],
    isLoading: loadingPackages,
    isError: errorPackages,
  } = useQuery({ queryKey: ["packages"], queryFn: fetchPackages });

  const {
    data: guides = [],
    isLoading: loadingGuides,
    isError: errorGuides,
  } = useQuery({ queryKey: ["guides"], queryFn: fetchGuides });

  if (loadingPackages || loadingGuides) return <p className="text-center py-10"><Loading/></p>;
  if (errorPackages || errorGuides) return <p className="text-center py-10 text-red-500">Failed to load data</p>;

  return (
    <section className="py-10 md:16 px-4 md:px-16 lg:px-36">
      <h2
        className="text-4xl font-bold text-center mb-12 tracking-wide 
             bg-gradient-to-r from-gray-700 via-gray-500 to-gray-400 
              bg-clip-text"
        data-aos="zoom-in"
      >
        <FaSuitcaseRolling className="inline-block text-4xl mr-3" /> Tourism and Travel Guide
      </h2>

      <Tabs selectedTabClassName="!text-base-500 !border-b-4  !border-slate-500 font-bold">
        <TabList className="flex justify-center gap-10 font-bold text-lg  border-b border-dashed pb-5 mb-8">
          <Tab className="cursor-pointer px-4">Tour Packages</Tab>
          <Tab className="cursor-pointer px-4">Top Tour Guides</Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="relative bg-base-300 p-6 shadow-xl border border-white border-opacity-20 transform hover:scale-105 transition duration-500"
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
                  <h3 className="text-2xl font-bold text-clip">{pkg.title}</h3>
                  <p className="text-sm  flex items-center gap-2">
                    <FaSuitcaseRolling className=" font-semibold" /> Type: {pkg.type}
                  </p>
                  <p className="text-lg  font-semibold flex items-center gap-2">
                    <FaDollarSign /> {pkg.price} BDT
                  </p>
                  <Link
                    to={`/packages/${pkg._id}`}
                    className="inline-block mt-3 bg-slate-500 hover:bg-slate-600 text-white text-sm px-5 py-2 rounded-sm transition"
                  >
                    View Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className=" px-4 md:px-16 lg:px-36 py-10">
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <MdTravelExplore className=" text-3xl" />
              Meet Our Tour Guides
            </h2>

            <div className=" rounded-xl shadow-inner py-6">
              <Marquee pauseOnHover speed={50} gradient={true} gradientColor="#e0f4ff">
                {guides.map((guide, idx) => (
                  <div
                    key={idx}
                    className="w-48 mx-4 bg-[#2a75b3]/60 dark:bg-[#1a4f73]/60 p-4 rounded-lg shadow hover:shadow-lg transition-transform duration-300 text-center"
                  >
                    <img
                      src={guide.photo}
                      alt={guide.name}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <h3 className="text-base font-semibold ">
                      {guide.name}
                    </h3>
                    <p className="text-sm ">
                      {guide.experience} yrs experience
                    </p>
                    <Link
                      to={`/guides/${guide._id}`}
                      className="inline-block mt-4 bg-slate-600 hover:bg-gray-500 text-white text-sm px-5 py-2 transition"
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default PackagesAndGuides;
