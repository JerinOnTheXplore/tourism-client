import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyBookings = () => {
  const {user} = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return; // Wait until user is available

    const fetchBookings = async () => {
  try {
    const res = await axios.get(`https://tourism-server-delta.vercel.app/api/bookings?email=${user.email}`);
    console.log(" API response:", res.data);

    if (Array.isArray(res.data)) {
      setBookings(res.data);
    } else {
      console.warn(" Unexpected bookings data:", res.data);
      setBookings([]); // Fallback to empty array
    }
  } catch (error) {
    console.error(" Failed to fetch bookings:", error);
    setBookings([]); // Fallback on network error
  } finally {
    setLoading(false);
  }
};

    fetchBookings();
  }, [user]);

  const handleCancel = async (bookingId) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to cancel this booking?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, cancel it!",
  });

  if (!result.isConfirmed) return;

  try {
    await axios.delete(`https://tourism-server-delta.vercel.app/api/bookings/${bookingId}`);
    setBookings(prev => prev.filter(b => b._id !== bookingId));

    // Success alert
    Swal.fire({
      icon: "success",
      title: "Cancelled!",
      text: "Your booking has been cancelled.",
    });
  } catch (error) {
    console.error("Failed to cancel booking:", error);
    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: "Something went wrong while cancelling the booking.",
    });
  }
};

  const handlePay = (bookingId) => {
    navigate(`/dashboard/payment/${bookingId}`);
  };

  if (!user?.email) return <div>Loading user info...</div>;
  if (loading) return <div>Loading your bookings...</div>;
  if (bookings.length === 0) return <div className="text-center">No bookings found.</div>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Package</th>
            <th className="border px-4 py-2 text-left">Tour Guide</th>
            <th className="border px-4 py-2 text-left">Tour Date</th>
            <th className="border px-4 py-2 text-left">Price ($)</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const isPending = booking.status?.toLowerCase() === "pending";
            return (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{booking.packageName}</td>
                <td className="border px-4 py-2">{booking.guideName || "N/A"}</td>
                <td className="border px-4 py-2">
                  {new Date(booking.tourDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">${booking.price?.toFixed(2)}</td>
                <td className="border px-4 py-2 capitalize">{booking.status}</td>
                <td className="border px-4 py-2 space-x-2">
                  {isPending ? (
                    <>
                      <button
                        onClick={() => handlePay(booking._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Pay
                      </button>
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span className="italic text-gray-500">No actions</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
