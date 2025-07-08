import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import logo from "../../assets/logoImg.jpg";
import { Link, NavLink } from "react-router";

const user = null;
// const user = {
//   displayName: "Jerin",
//   email: "jerin@example.com",
//   photoURL: "https://i.ibb.co/album/default-avatar.png",
// };

const logoutUser = () => {
  alert("Logged out!");
};

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const navLinkStyle = "text-xl font-bold text-gray-600 hover:text-blue-600 transition duration-200";

  const activeStyle = "border p-1 border-blue-500 ";

  const leftNavItems = (
    <>
      <li className="pb-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navLinkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          Home
        </NavLink>
      </li>
      <li className="pb-2">
        <NavLink
          to="/community"
          className={({ isActive }) =>
            `${navLinkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          Community
        </NavLink>
      </li>
    </>
  );

  const rightNavItems = (
    <>
      <li className="pb-2">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${navLinkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          About Us
        </NavLink>
      </li>
      <li className="pb-2">
        <NavLink
          to="/trips"
          className={({ isActive }) =>
            `${navLinkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          Trips
        </NavLink>
      </li>
      {!user && (
        <>
          <li className="pb-2">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${navLinkStyle} ${isActive ? activeStyle : ""}`
              }
            >
              Login
            </NavLink>
          </li>
          <li className="pb-2">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `${navLinkStyle} ${isActive ? activeStyle : ""}`
              }
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50 font-[Inter]">
      <div className="navbar max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Mobile Hamburger - LEFT */}
        <div className="lg:hidden text-gray-600">
          <button onClick={toggleDrawer} className="btn btn-ghost btn-sm">
            <FaBars size={22} />
          </button>
        </div>

        {/* Left Nav - Desktop */}
        <div className="hidden lg:flex flex-1 justify-start">
          <ul className="menu menu-horizontal items-center gap-4">
            {leftNavItems}
          </ul>
        </div>

        {/* Center Logo */}
        <div className="flex justify-center flex-1">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold tracking-wide text-grey-600"
          >
            <img src={logo} alt="logo" className="w-10 h-10" />
            <span className="text-gray-600">ＴｏｕｒｉｓｍＦｌｏｗ
</span>
          </Link>
        </div>

        {/* Right Nav - Desktop */}
        <div className="hidden lg:flex flex-1 justify-end">
          <ul className="menu menu-horizontal items-center gap-4">
            {rightNavItems}
            {user && (
              <li tabIndex={0}>
                <details>
                  <summary className="cursor-pointer">
                    <div className="avatar">
                      <div className="w-8 rounded-full ring ring-indigo-500 ring-offset-2">
                        <img src={user.photoURL} alt="User" />
                      </div>
                    </div>
                  </summary>
                  <ul className="p-2 bg-white rounded-box w-48 shadow text-sm">
                    <li><span>{user.displayName}</span></li>
                    <li><span className="text-xs">{user.email}</span></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/offers">Offer Announcements</Link></li>
                    <li><button onClick={logoutUser}>Logout</button></li>
                  </ul>
                </details>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-opacity-10 backdrop-brightness-50"
            onClick={toggleDrawer}
          ></div>

          {/* Left Drawer */}
          <div className="fixed top-0 left-0 w-72 h-full bg-white shadow-xl p-6 z-50 animate-slideInLeft border-r border-gray-200">
            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-6">
              <Link
                to="/"
                onClick={toggleDrawer}
                className="text-lg font-bold text-gray-600"
              >
                ＴｏｕｒｉｓｍＦｌｏｗ
              </Link>
              <button
                onClick={toggleDrawer}
                className="text-gray-600 hover:text-gray-900"
              >
                <IoClose size={36} />
              </button>
            </div>

            {/* Nav Items */}
            <ul className="space-y-4   pb-4 mb-4">
              {leftNavItems}
              {rightNavItems}
            </ul>

            {user && (
              <ul className="space-y-2 mt-4 border-t pt-4 text-sm">
                <li><span>{user.displayName}</span></li>
                <li><span className="text-xs">{user.email}</span></li>
                <li>
                  <Link to="/dashboard" className={navLinkStyle}>Dashboard</Link>
                </li>
                <li>
                  <Link to="/offers" className={navLinkStyle}>Offer Announcements</Link>
                </li>
                <li>
                  <button onClick={logoutUser} className="text-slate-600">Logout</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
