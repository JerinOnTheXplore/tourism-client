import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../loading/Loading";

const AssignedTours = () => {
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 10;

  // Fetch assigned tours
  const fetchAssignedTours = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://tourism-server-delta.vercel.app/api/assigned-tours/${user.email}`
      );
      setTours(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch assigned tours", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchAssignedTours();
    }
  }, [user]);

  // Accept or reject handler
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        `https://tourism-server-delta.vercel.app/api/assigned-tours/${id}/status`,
        { status: newStatus }
      );
      Swal.fire("Success", `Tour ${newStatus}`, "success");
      fetchAssignedTours();
    } catch (err) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this tour assignment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateStatus(id, "rejected");
      }
    });
  };

  // Pagination logic
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(tours.length / toursPerPage);

  if (loading) return <p className="text-center py-10"><Loading /></p>;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">My Assigned Tours</h2>

      {tours.length === 0 ? (
        <p className="text-center text-gray-600">No assigned tours found.</p>
      ) : (
        <>
          <div className="w-full overflow-x-auto">
            <table className="min-w-[700px] w-full table-auto border border-gray-300">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-4 py-2 text-left whitespace-nowrap">Package Name</th>
                  <th className="px-4 py-2 text-left whitespace-nowrap">Tourist Name</th>
                  <th className="px-4 py-2 text-left whitespace-nowrap">Tour Date</th>
                  <th className="px-4 py-2 text-left whitespace-nowrap">Price</th>
                  <th className="px-4 py-2 text-left whitespace-nowrap">Status</th>
                  <th className="px-4 py-2 text-left whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTours.map((tour) => (
                  <tr key={tour._id} className="border-t">
                    <td className="px-4 py-2">{tour.packageName}</td>
                    <td className="px-4 py-2">{tour.touristName || "N/A"}</td>
                    <td className="px-4 py-2">
                      {new Date(tour.tourDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{tour.price} BDT</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        tour.status === "accepted"
                          ? "text-green-600"
                          : tour.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {tour.status}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        className="btn btn-success btn-sm"
                        disabled={tour.status !== "pending"}
                        onClick={() => handleUpdateStatus(tour._id, "accepted")}
                      >
                        Accept
                      </button>
                      {tour.status === "pending" && (
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => handleReject(tour._id)}
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded border ${
                  currentPage === pageNum
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 border-blue-500"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AssignedTours;
