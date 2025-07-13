import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";


const AssignedTours = () => {
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignedTours = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://tourism-server-delta.vercel.app/api/assigned-tours/${user.email}`);
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

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`https://tourism-server-delta.vercel.app/api/assigned-tours/${id}/status`, { status: newStatus });
      Swal.fire("Success", `Tour ${newStatus}`, "success");
      fetchAssignedTours();
    } catch (err) {
      Swal.fire(err, `Failed to update status`, "error");
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

  if (loading) return <p>Loading assigned tours...</p>;

  return (
    <div className="w-full">
  <h2 className="text-2xl font-bold mb-4 text-center text-gray-600">My Assigned Tours</h2>

  {tours.length === 0 ? (
    <p>No assigned tours found.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="table table-zebra min-w-[900px]">
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Tourist Name</th>
            <th>Tour Date</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour._id}>
              <td>{tour.packageName}</td>
              <td>{tour.touristName}</td>
              <td>{new Date(tour.tourDate).toLocaleDateString()}</td>
              <td>${tour.price}</td>
              <td className={`font-semibold ${tour.status === "accepted" ? "text-green-600" : tour.status === "rejected" ? "text-red-600" : "text-yellow-600"}`}>
                {tour.status}
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm mr-2"
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
  )}
</div>


  );
};

export default AssignedTours;
