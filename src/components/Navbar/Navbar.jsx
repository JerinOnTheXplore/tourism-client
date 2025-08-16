import { useState, useEffect } from "react";
import { FaBars, FaSearch, FaMoon, FaSun, FaHome, FaUsers, FaInfoCircle, FaSuitcaseRolling, FaSignInAlt, FaUserPlus, FaTachometerAlt, FaTags, FaSignOutAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logoImg.jpg";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeProvider";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const { darkMode, toggleTheme } = useTheme();
  const { user, logOut } = useAuth();

  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [isDrawerOpen]);

  const navLinkStyle =
    " hover:text-blue-300  dark:hover:text-blue-400 font-bold text-lg font-sans";
  const activeStyle = "border-b-2 border-blue-200 dark:border-blue-400";

  const handleLogout = () => logOut();

  const leftNavItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ""}`}
          onClick={() => setIsDrawerOpen(false)}
        >
          <FaHome className="inline mr-2" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/community"
          className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ""}`}
          onClick={() => setIsDrawerOpen(false)}
        >
          <FaUsers className="inline mr-2" /> Community
        </NavLink>
      </li>
    </>
  );

  const rightNavItems = (
    <>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ""}`}
          onClick={() => setIsDrawerOpen(false)}
        >
          <FaInfoCircle className="inline mr-2" /> About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/trips"
          className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ""}`}
          onClick={() => setIsDrawerOpen(false)}
        >
          <FaSuitcaseRolling className="inline mr-2" /> Trips
        </NavLink>
      </li>
      <li>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full  transition"
          aria-label="Toggle theme"
        >
          {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-yellow-300" />}
        </button>
      </li>
      {!user ? (
        <>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ""}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              <FaSignInAlt className="inline mr-2" /> Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ""}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              <FaUserPlus className="inline mr-2" /> Register
            </NavLink>
          </li>
        </>
      ) : (
        <li className="relative">
          <details className="dropdown">
            <summary className="cursor-pointer">
              <div className="avatar">
                <div className="w-9 rounded-full ring ring-blue-500 ring-offset-2">
                  <img src={user.photoURL} alt="User" />
                </div>
              </div>
            </summary>
            <ul className="p-3 mt-3 shadow-lg menu dropdown-content z-[1]  rounded-box w-56 text-sm">
              <li>
                <span className="text-sm font-bold">{user.displayName}</span>
              </li>
              <li>
                <span className="text-sm  font-bold">{user.email}</span>
              </li>
              <li className="text-base font-bold ">
                <Link to="/dashboard" onClick={() => setIsDrawerOpen(false)}>
                  <FaTachometerAlt className="inline mr-2" /> Dashboard
                </Link>
              </li>
              <li className="text-base font-bold ">
                <Link to="/offers" onClick={() => setIsDrawerOpen(false)}>
                  <FaTags className="inline mr-2" /> Offer Announcements
                </Link>
              </li>
              <li className="text-base font-bold ">
                <button onClick={handleLogout}>
                  <FaSignOutAlt className="inline mr-2" /> Logout
                </button>
              </li>
            </ul>
          </details>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 w-full backdrop-blur-sm  shadow-md border-b border-gray-400 border-dashed">
      {/* Top Row */}
      <div className=" container px-4 md:px-16 lg:px-36 py-3 flex items-center justify-between max-w-full border-b border-gray-400 border-dashed">
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsDrawerOpen(false)}>
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold font-sans">TOURISM FLOW</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center mx-6 flex-1 max-w-md">
          <div className="relative w-full font-sans">
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full pl-10 pr-4 py-2 border  dark:border-gray-500 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="navbar px-4 md:px-16 lg:px-36 py-2 flex items-center justify-between relative">
        {/* Hamburger Icon */}
        <div className="lg:hidden px-4">
          <button onClick={toggleDrawer} className="">
            <FaBars size={24} />
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-1 justify-between">
          <ul className="menu menu-horizontal gap-6 px-1">{leftNavItems}</ul>
          <ul className="menu menu-horizontal items-center gap-6 px-1">{rightNavItems}</ul>
        </div>

        {/* Mobile Drawer */}
        {isDrawerOpen && (
          <div className="fixed inset-0  z-40">
            {/* Glassy overlay */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-md"
              onClick={toggleDrawer}
            ></div>

            <div className="fixed top-0 left-0 w-72 h-160 p-6 overflow-y-auto shadow-lg z-50 bg-base-100 backdrop-blur-md rounded-r-lg">
              <div className="flex justify-between items-center mb-6">
                <button onClick={toggleDrawer}>
                  <IoClose size={28} className="text-navbar-text " />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mb-4 md:hidden">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border  border-gray-300 rounded focus:outline-none"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
                </div>
              </div>

              <ul className="space-y-3 mb-4 pb-4 border-b border-gray-300 dark:border-gray-500">{leftNavItems}</ul>
              <ul className="space-y-4">{rightNavItems}</ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
