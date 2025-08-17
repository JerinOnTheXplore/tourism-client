import { useState } from "react";
import Swal from "sweetalert2";

const UpcomingEvents = () => {
  const [events] = useState([
    {
      id: 1,
      title: "Cox’s Bazar Beach Festival",
      date: "20 December 2025",
      location: "Cox’s Bazar Sea Beach",
      description:
        "A vibrant festival with music, food, and beach activities for tourists and locals alike.",
      image: "https://i.ibb.co.com/KphngHqQ/cosx.jpg",
    },
    {
      id: 2,
      title: "Dhaka International Trade Fair",
      date: "1 January 2026",
      location: "Dhaka, Bangladesh-China Friendship Exhibition Center",
      description:
        "A grand exhibition featuring products, crafts, and innovations from Bangladesh and around the world.",
      image: "https://i.ibb.co.com/Y7SwrYXS/trade.jpg",
    },
    {
      id: 3,
      title: "Pohela Boishakh Festival",
      date: "14 April 2026",
      location: "Dhaka, Ramna Park",
      description:
        "Celebrate the Bengali New Year with traditional fairs, music, and colorful processions.",
      image: "https://i.ibb.co.com/gLGvMc67/pohela.jpg",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null); 
  const handleBookNow = (eventTitle) => {
    Swal.fire({
      icon: "success",
      title: "Booked!",
      text: `You have successfully booked for ${eventTitle}`,
      confirmButtonColor: "#2a75b3",
    });
    setSelectedEvent(null); 
  };

  return (
    <section className="py-16 md:py-24 ">
      <div className="max-w-9xl  px-4 md:px-16 lg:px-36">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10  drop-shadow">
          🌏 Upcoming Events & Festivals
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className=" backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 ">
                  {event.title}
                </h3>
                <p className=" text-sm mb-3">
                  {event.description}
                </p>

                <div className="flex items-center text-sm  gap-3 mb-4">
                  <span className="flex items-center gap-1">📅 {event.date}</span>
                  <span className="flex items-center gap-1">📍 {event.location}</span>
                </div>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="w-full bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-lg shadow-md  transition"
                >
                  Plan Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 text-xl font-bold"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              {selectedEvent.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {selectedEvent.description}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-1">📅 {selectedEvent.date}</p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">📍 {selectedEvent.location}</p>
            <button
              className="w-full bg-[#2a75b3] dark:bg-[#60a5fa] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#245e90] dark:hover:bg-[#3b82f6] transition"
              onClick={() => handleBookNow(selectedEvent.title)}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
