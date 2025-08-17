// Trips.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Loading from "../loading/Loading";

const Trips = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center mt-20"><Loading></Loading></p>;

  return (
    <div className=" px-4 md:px-16 lg:px-36 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">All Trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="border rounded-lg shadow p-5 space-y-3 bg-base-300">
            <img
              src={pkg.photo}
              alt={pkg.title}
              className="w-full h-52 object-cover rounded"
            />
            <h3 className="text-xl font-semibold">{pkg.title}</h3>
            <p className="">{pkg.about?.slice(0, 80)}...</p>
            <p><strong>Type:</strong> {pkg.type}</p>
            <p><strong>Price:</strong> ৳{pkg.price}</p>
            <Link
              to={`/packages/${pkg._id}`}
              className="inline-block bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded mt-3"
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
