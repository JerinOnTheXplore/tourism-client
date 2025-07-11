import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logoImg.jpg";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const { user, logOut } = useAuth();

  const navLinkStyle = "text-lg font-bold text-gray-600 font-sans hover:text-blue-600";
  const activeStyle = "border-b-2 border-gray-500";

  const handleLogout = () => {
    logOut();
  };

  const leftNavItems = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ""}`}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/community" className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ""}`}>
          Community
        </NavLink>
      </li>
    </>
  );

  const rightNavItems = (
    <>
      <li>
        <NavLink to="/about" className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ""}`}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/trips" className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ""}`}>
          Trips
        </NavLink>
      </li>
      {!user ? (
        <>
          <li>
            <NavLink to="/login" className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ""}`}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ""}`}>
              Register
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
            <ul className="p-3 mt-3 shadow-lg menu dropdown-content z-[1] bg-white rounded-box w-56 text-sm">
              <li><span className="font-bold">{user.displayName}</span></li>
              <li><span className="text-sm text-gray-500 font-semibold font-sans">{user.email}</span></li>
              <li className="text-base text-gray-600 font-semibold font-sans"><Link to="/dashboard">Dashboard</Link></li>
              <li className="text-base text-gray-600 font-semibold font-sans"><Link to="/offers">Offer Announcements</Link></li>
              <li className="text-base text-gray-600 font-semibold font-sans"><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </details>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-gradient-to-br from-[#e0f4ff] via-[#f7fbff] to-[#fefcfb] shadow-sm sticky top-0 z-50 font-[Inter]">
      <div className="navbar max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* 🔹 Hamburger Icon (left side on mobile) */}
        <div className="lg:hidden absolute left-4 top-3.5">
          <button onClick={toggleDrawer} className="text-gray-600">
            <FaBars size={22} />
          </button>
        </div>

        {/* 🔹 Left Nav (Desktop) */}
        <div className="hidden lg:flex flex-1 justify-start">
          <ul className="menu menu-horizontal gap-5">{leftNavItems}</ul>
        </div>

        {/* Logo Center */}
        <div className="flex justify-center flex-1">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gray-700">
            <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
            <span className="tracking-wider text-2xl md:text-3xl font-sans">TOURISM FLOW</span>
          </Link>
        </div>

        {/* 🔹 Right Nav (Desktop) */}
        <div className="hidden lg:flex flex-1 justify-end">
          <ul className="menu menu-horizontal items-center gap-5">
            {rightNavItems}
          </ul>
        </div>
      </div>

      {/* 🔹 Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-opacity-20 backdrop-brightness-50" onClick={toggleDrawer}></div>

          <div className="fixed top-0 left-0 w-72 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <Link to="/" onClick={toggleDrawer} className="text-lg font-bold text-gray-700">
                ＴｏｕｒｉｓｍＦｌｏｗ
              </Link>
              <button onClick={toggleDrawer}>
                <IoClose size={28} className="text-gray-600" />
              </button>
            </div>

            <ul className="space-y-3 mb-4 pb-4">{leftNavItems}</ul>
            <ul className="space-y-4">
              {rightNavItems}
              {user && (
                <div className="mt-4 space-y-2 text-sm border-t border-dashed border-gray-300 pt-4">
                  <li><span className="font-semibold font-sans">{user.displayName}</span></li>
                  <li><span className="text-base font-semibold font-sans text-gray-600">{user.email}</span></li>
                  <li className="text-base font-semibold font-sans text-gray-600"><Link to="/dashboard">Dashboard</Link></li>
                  <li className="text-base font-semibold font-sans text-gray-600"><Link to="/offers">Offer Announcements</Link></li>
                  <li className="text-base font-semibold font-sans text-gray-600"><button onClick={handleLogout}>Logout</button></li>
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
