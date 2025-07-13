import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import {
  FaMapMarkedAlt,
  FaDollarSign,
  FaClock,
  FaSuitcaseRolling,
  FaRegCalendarAlt,
} from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { MdTravelExplore } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useQuery } from "@tanstack/react-query";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState("");

  //  Get single package
  const {
    data: pkg,
    isLoading: isPackageLoading,
    isError: isPackageError,
  } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://tourism-server-delta.vercel.app/api/packages/${id}`
      );
      return res.data;
    },
    enabled: !!id,
  });

  //  Get all guides
  const {
    data: guides = [],
    isLoading: isGuidesLoading,
    isError: isGuidesError,
  } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await axios.get(
        "https://tourism-server-delta.vercel.app/api/guides"
      );
      return res.data;
    },
  });

  // Handle Booking Submit
  const handleBooking = () => {
    if (!user) return navigate("/login");
  const guide = guides.find(g => g.email === selectedGuide);

    const bookingData = {
      packageId: pkg._id,
      packageName: pkg.title,
      touristName: user.displayName || "Tourist",
      touristEmail: user.email,
      touristImage: user.photoURL,
      price: pkg.price,
      tourDate: selectedDate,
      guideEmail: guide.email,
      guideName: guide.name,
      status: "pending",
    };

    axios
      .post(
        "https://tourism-server-delta.vercel.app/api/bookings",
        bookingData
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Confirm your Booking",
          html: `<a href='/my-bookings' class='text-blue-600 underline'>Go to My Bookings</a>`,
        });
      })
      .catch(() => {
        Swal.fire("Error", "Booking failed", "error");
      });
  };

  // Loading/Error States
  if (isPackageLoading || isGuidesLoading)
    return (
      <p className="text-center text-gray-600 text-lg py-20">
        Loading data...
      </p>
    );
  if (isPackageError || isGuidesError)
    return (
      <p className="text-center text-red-500 text-lg py-20">
        Failed to load data
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f4ff] via-[#f7fbff] to-[#e0f4ff] text-gray-600">
      {/*  Hero Section  */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <img
          src={pkg.photo}
          alt={pkg.title}
          className="w-full h-full object-cover brightness-75 blur-[1px]"
        />
        <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center text-white text-center">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-bold">{pkg.title}</h1>
            <p className="text-lg font-light flex justify-center items-center gap-2">
              <FaMapMarkedAlt className="text-stone-100 font-bold" />{" "}
              <span className="text-xl font-semibold">{pkg.type}</span>
            </p>
            <p className="text-2xl font-semibold text-stone-100 flex items-center justify-center gap-2">
              <FaDollarSign /> {pkg.price} BDT
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {pkg.photos?.length > 0 && (
        <div className="px-6 md:px-20 py-10">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4 text-slate-700 flex items-center gap-2">
              <FaRegCalendarAlt className="text-blue-500" /> Tour Gallery
            </h2>
            <button
              onClick={() => navigate(-1)}
              className="bg-white text-[#2a75b3] font-bold px-5 py-2 rounded-full shadow-md hover:bg-blue-100 transition mb-4"
            >
              ← Go Back
            </button>
          </div>
          <div className="bg-[#cbe7f4] p-4 sm:p-6 md:p-10 shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 h-auto lg:h-[500px]">
              <div className="lg:col-span-2 lg:row-span-2 overflow-hidden shadow-lg">
                <img
                  src={pkg.photos[0]}
                  alt="Main"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="overflow-hidden shadow-md h-48 sm:h-40 lg:h-60">
                  <img
                    src={pkg.photos[1]}
                    alt="Gallery 2"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="overflow-hidden shadow-md h-48 sm:h-40 lg:h-60">
                  <img
                    src={pkg.photos[2]}
                    alt="Gallery 3"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
              <div className="hidden lg:block overflow-hidden shadow-md h-full">
                <img
                  src={pkg.photos[3]}
                  alt="Gallery 4"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="lg:hidden overflow-hidden shadow-md h-48 sm:h-40">
                <img
                  src={pkg.photos[3]}
                  alt="Gallery 4"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  About Section */}
      <div className="bg-[#cbe7f4] px-6 md:px-20 py-10 border-2 border-dashed border-gray-100 my-6 mx-4 md:mx-20">
        <h2 className="text-2xl font-bold text-slate-700 mb-4 flex items-center gap-2">
          <FaSuitcaseRolling className="text-blue-500" /> About The Tour
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {pkg.about ||
            "Explore the breathtaking beauty of Bangladesh through this tour. Enjoy scenic views, local culture, and thrilling experiences tailored just for you."}
        </p>
      </div>

      {/*  Tour Plan Section  */}
      <div className="px-6 md:px-20 py-10">
        <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center gap-2">
          <FaClock className="text-blue-400" /> Tour Plan
        </h2>
        <div className="space-y-6 border-l-4 border-blue-400 pl-6 relative">
          {pkg.plan?.map((step, idx) => (
            <div
              key={idx}
              className="relative pl-4 border-gray-300 border-2 border-dashed p-2 bg-[#cbe7f4]"
            >
              <div className="absolute -left-6 top-1.5 w-4 h-4 bg-blue-400 rounded-full shadow "></div>
              <h4 className="text-blue-700 font-semibold flex items-center gap-2">
                Day {step.day}
              </h4>
              <p className="text-gray-600">{step.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/*  Tour Guides Section */}
      <div className="px-6 md:px-20 py-10">
        <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center flex items-center justify-center gap-2">
          <MdTravelExplore className="text-blue-500 text-3xl" />
          Meet Our Tour Guides
        </h2>
        <div className="bg-white rounded-xl shadow-inner py-6 px-3">
          <Marquee pauseOnHover speed={50} gradient={true} gradientColor="#e0f4ff">
            {guides.map((guide, idx) => (
              <div
                key={idx}
                className="w-48 mx-4 bg-[#f5faff] p-4 rounded-lg shadow hover:shadow-lg transition-transform duration-300 text-center"
              >
                <img
                  src={guide.photo}
                  alt={guide.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-base font-semibold text-gray-800">{guide.name}</h3>
                <p className="text-sm text-gray-500">{guide.experience} yrs experience</p>
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

      {/*  Booking Form Section  */}
      <div className="px-6 md:px-20 py-10">
        <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center">📝 Book This Tour</h2>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={pkg.title} readOnly className="input input-bordered w-full" />
            <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered w-full" />
            <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full" />
            <input type="text" value={user?.photoURL || ""} readOnly className="input input-bordered w-full" />
            <input type="number" value={pkg.price} readOnly className="input input-bordered w-full" />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Select Tour Date"
              className="input input-bordered w-full"
            />
            <select
              value={selectedGuide}
              onChange={(e) => setSelectedGuide(e.target.value)}
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Select Tour Guide
              </option>
              {guides.map((g, i) => (
                <option key={i} value={g.email}>
                  {g.email}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center">
            <button
              className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg mt-4"
              onClick={handleBooking}
              disabled={!user || !selectedGuide || !selectedDate}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
