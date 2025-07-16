
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import logo from "../../assets/logoImg.jpg"; 
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0e2a47] via-[#143d5c] to-[#1b5072] text-white py-10 px-6  shadow-inner relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left">
        {/* Logo + Name */}
        <div className="flex items-center justify-center md:justify-start gap-3">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full shadow-md border" />
          <div>
            <h3 className="text-xl font-semibold tracking-wide">Tourism Flow</h3>
            <p className="text-sm text-gray-300">Explore Bangladesh with us</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold mb-2">Developer Links</h4>
          <div className="flex justify-center md:justify-start gap-5 text-2xl">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              <FaGlobe />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:underline hover:text-yellow-300 transition">Home</Link>
            </li>
            <li>
              <Link to="/trips" className="hover:underline hover:text-yellow-300 transition">Trips</Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline hover:text-yellow-300 transition">About Us</Link>
            </li>
            <li>
              <Link to="/community" className="hover:underline hover:text-yellow-300 transition">Community</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-10 text-sm text-gray-400 border-t pt-4 border-white/20">
        &copy; {new Date().getFullYear()} Tourism Flow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
