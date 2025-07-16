
import { FaStar, FaShieldAlt, FaHeadset } from "react-icons/fa";

const WhyChooseUsSection = () => {
  const benefits = [
    {
      icon: <FaStar />,
      title: "Top Rated Tours",
      desc: "4.9+ average ratings by real travelers across all packages.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Booking",
      desc: "Safe and encrypted payment systems with flexible refunds.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Our travel experts are available anytime you need help.",
    },
  ];

  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="text-4xl text-blue-600 mb-4">{item.icon}</div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
