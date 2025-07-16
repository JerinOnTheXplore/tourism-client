
import { FaSun, FaMountain, FaLeaf, FaUmbrellaBeach, FaGift } from "react-icons/fa";

const offers = [
  {
    icon: <FaSun className="text-yellow-500 text-2xl" />,
    title: "Summer Special: Cox's Bazar Beach Escape",
    description:
      "Enjoy a 4-day beach escape to Cox's Bazar with a 20% discount. Includes hotel, breakfast, and beachside activities!",
    validity: "Valid till August 31, 2025",
  },
  {
    icon: <FaMountain className="text-green-600 text-2xl" />,
    title: "Bandarban Adventure Deal",
    description:
      "Book your Bandarban trekking package and get 15% off plus a free guide map & trekking pole rental.",
    validity: "Offer valid for trips before September 15, 2025",
  },
  {
    icon: <FaLeaf className="text-emerald-500 text-2xl" />,
    title: "Srimangal Tea Tour – BOGO Offer",
    description:
      "Buy one, get one free! Perfect for couples or friends. Explore tea gardens, tribal villages, and Lawachara forest.",
    validity: "Limited to first 100 bookings only",
  },
  {
    icon: <FaUmbrellaBeach className="text-blue-500 text-2xl" />,
    title: "Saint Martin's Island Weekend Sale",
    description:
      "Flat ৳1,000 off on all Saint Martin's Island weekend packages. Includes ferry ticket and 2-night stay.",
    validity: "Book before July 31, 2025",
  },
  {
    icon: <FaGift className="text-pink-500 text-2xl" />,
    title: "Refer a Friend & Earn ৳500 Credit",
    description:
      "Refer a friend to book any tour and earn ৳500 credit for your next trip!",
    validity: "No expiration — keep referring!",
  },
];

const OfferAnnouncements = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
        Offer Announcements 🎉
      </h2>
      <div className="space-y-6">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-400 hover:border-blue-600 transition"
          >
            <div className="flex items-center gap-3 mb-2">
              {offer.icon}
              <h3 className="text-xl font-semibold text-blue-800">
                {offer.title}
              </h3>
            </div>
            <p className="text-gray-700">{offer.description}</p>
            <p className="text-sm text-gray-500 mt-2 italic">{offer.validity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferAnnouncements;
