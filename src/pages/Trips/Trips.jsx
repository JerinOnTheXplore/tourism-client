// Trips.jsx 
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Loading from "../loading/Loading";

const Trips = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState(""); // 🔹 sorting state

  useEffect(() => {
    axios
      .get("https://tourism-server-delta.vercel.app/api/packages/all")
      .then((res) => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch packages", err);
        setLoading(false);
      });
  }, []);

  // 🔹 Handle sorting
  const handleSort = (order) => {
    setSortOrder(order);
    let sortedPackages = [...packages];
    if (order === "asc") {
      sortedPackages.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      sortedPackages.sort((a, b) => b.price - a.price);
    }
    setPackages(sortedPackages);
  };

  if (loading) return <p className="text-center mt-20"><Loading /></p>;

  return (
    <div className="px-4 md:px-16 lg:px-36 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-center md:text-left">All Trips</h2>

        {/* 🔹 Sorting Navbar */}
        <div className="flex gap-3 items-center">
          <span className="font-semibold">Sort by Price:</span>
          <button
            onClick={() => handleSort("asc")}
            className={`px-4 py-2 rounded bg-slate-500 text-white hover:bg-slate-600 transition ${
              sortOrder === "asc" ? "ring-2 ring-yellow-400" : ""
            }`}
          >
            Low to High
          </button>
          <button
            onClick={() => handleSort("desc")}
            className={`px-4 py-2 rounded bg-slate-500 text-white hover:bg-slate-600 transition ${
              sortOrder === "desc" ? "ring-2 ring-yellow-400" : ""
            }`}
          >
            High to Low
          </button>
        </div>
      </div>

      {/* 🔹 Equal Size Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="border rounded-lg shadow p-5 flex flex-col bg-base-300 h-full"
          >
            <img
              src={pkg.photo}
              alt={pkg.title}
              className="w-full h-52 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold">{pkg.title}</h3>
            <p className="flex-grow">{pkg.about?.slice(0, 80)}...</p>
            <p><strong>Type:</strong> {pkg.type}</p>
            <p><strong>Price:</strong> ৳{pkg.price}</p>
            <Link
              to={`/packages/${pkg._id}`}
              className="mt-3 inline-block bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded text-center"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
