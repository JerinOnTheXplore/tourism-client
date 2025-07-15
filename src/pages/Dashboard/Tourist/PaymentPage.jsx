import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key); // Replaced with Stripe public key

const CheckoutForm = ({ booking, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) return;

    try {
      // Create payment intent
      const { data } = await axios.post("https://tourism-server-delta.vercel.app/api/create-payment-intent", {
        price: booking.price,
      });

      const clientSecret = data.clientSecret;

      // Confirm card payment
      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: booking.touristName || "Tourist",
            email: booking.touristEmail,
          },
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
        setProcessing(false);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        // Update booking status on backend
        await axios.patch(`https://tourism-server-delta.vercel.app/api/bookings/${booking._id}/pay`, {
          paymentId: paymentResult.paymentIntent.id,
        });

        onSuccess();
      }
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Pay for {booking.packageName}</h2>
      <p className="mb-2">Amount: ${booking.price.toFixed(2)}</p>
      <CardElement
        options={{
          style: {
            base: { fontSize: "16px" },
            invalid: { color: "#fa755a" },
          },
        }}
      />
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`https://tourism-server-delta.vercel.app/api/bookings/${bookingId}`);
        setBooking(res.data);
      } catch (err) {
        console.error("Failed to fetch booking:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (loading) return <div>Loading booking details...</div>;

  if (!booking) return <div>Booking not found</div>;

  const handleSuccess = () => {
  Swal.fire({
    icon: "success",
    title: "Payment Successful!",
    text: "Your booking is now under review.",
    confirmButtonText: "Go to My Bookings",
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/dashboard/my-bookings");
    }
  });
};


  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm booking={booking} onSuccess={handleSuccess} />
    </Elements>
  );
};

export default PaymentPage;
